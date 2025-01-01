import type { JSX } from 'vue/jsx-runtime'
import { CloseBold } from '@element-plus/icons-vue'
import { ElDialog } from 'element-plus'
import { upperFirst } from 'lodash-es'
import { type ComponentInternalInstance, h, render } from 'vue'

type Content = Parameters<typeof h>[0] | string | JSX.Element
// 使用 InstanceType 获取 ElDialog 组件实例的类型
type ElDialogInstance = InstanceType<typeof ElDialog>

// 从组件实例中提取 Props 类型
type DialogProps = ElDialogInstance['$props'] & { onBeforeOpen?: () => boolean | void }

interface ElDialogSlots {
  header?: (...args: any[]) => Content
  footer?: (...args: any[]) => Content
}

interface Options<P> {
  dialogProps?: DialogProps
  dialogSlots?: ElDialogSlots
  contentProps?: P
  closeEventName?: string // 在内容组件中抛出特定事件支持关闭dialog
}
/**
 * @param content string | 异步组件（组件props可传beforeCloseDialog回调）
 * @param options
 * @returns [openDialog, closeDialog]
 */
function useDialog<P = any>(content: Content, options: Options<P> = {}) {
  let dialogInstance: ComponentInternalInstance | null = null
  let fragment: Element | null = null
  const isFull = ref(false)

  if (options && !options?.dialogSlots) {
    options.dialogSlots = {}
  }

  if (options.dialogSlots) {
    options.dialogSlots.header = () =>
      h('div', { class: 'flex items-center font-bold text-xl h-[40px] px-4' }, [
        h(
          'span',
          {
            class: 'mr-auto',
            style: { color: '#fff' },
          },
          options?.dialogProps?.title || 'title',
        ),
        [
          h(
            'div',
            {
              class: 'cursor-pointer ',
              onClick: (event) => {
                event.stopPropagation()
                closeDialog()
              },
            },
            h(CloseBold, { style: { width: '1em', height: '1em', color: '#fff' } }),
          ),
        ],
      ])
  }
  // 关闭卸载组件
  const closeAfter = () => {
    if (fragment) {
      render(null, fragment as unknown as Element) // 卸载组件
      fragment.textContent = '' // 清空文档片段
      fragment = null
    }
    dialogInstance = null
  }

  function closeDialog() {
    if (dialogInstance) {
      dialogInstance.props.modelValue = false
    }
  }

  // 创建并挂载组件
  function openDialog(data?: any) {
    if (dialogInstance) {
      closeDialog()
      closeAfter()
    }

    const { dialogProps, contentProps = {} } = options
    // 调用before钩子，如果为false则不打开
    if (dialogProps?.onBeforeOpen?.() === false) {
      return
    }
    // 定义当前块关闭前钩子变量
    let onBeforeClose: (() => Promise<boolean | void> | void | boolean) | null

    fragment = document.createDocumentFragment() as unknown as Element

    const closeEventName = `on${upperFirst(options?.closeEventName || 'close')}`
    const vNode = h(
      ElDialog,
      {
        ...dialogProps,
        modelValue: true,
        showClose: false,
        draggable: true,
        alignCenter: true,
        closeOnClickModal: false,
        width: 800,
        fullscreen: isFull.value,
        beforeClose: async (done: () => void) => {
          const result = await onBeforeClose?.()
          if (result === false) {
            return
          }
          done()
        },
        onClosed: () => {
          if (typeof dialogProps?.onClosed === 'function') {
            dialogProps.onClosed()
          }
          closeAfter()
          // 关闭后回收当前变量
          onBeforeClose = null
        },
      },
      {
        default: () => [
          typeof content === 'string'
            ? content
            : h(content as any, {
                ...contentProps,
                ...data,
                [closeEventName]: closeDialog, // 监听自定义关闭事件，并执行关闭
                beforeCloseDialog: (fn: () => boolean | void) => {
                  onBeforeClose = fn
                },
              }),
        ],

        ...options.dialogSlots,
      },
    )

    render(vNode, fragment)
    dialogInstance = vNode.component

    document.body.appendChild(fragment)
  }

  onUnmounted(() => {
    closeDialog()
  })

  return [openDialog, closeDialog]
}

export default useDialog

/**
  使用
 const { openDialog, closeDialog } = useDialog("hello", {
  dialogProps: {
    title: "测试",
  },
  contentProps: {
    componentProps: someValue,
  },
  dialogSlots: {
    footer: () => [
      h(
        Button,
        {
          plain: true,
          onClick: () => {
            closeDialog();
          },
        },
        "取消",
      ),
      h(
        Button,
        {
          onClick: () => {
            closeDialog();
          },
        },
        "确定",
      ),
    ],
  },
});
 */
