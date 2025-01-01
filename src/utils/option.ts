const statusOptions = [
  { dictLabel: '启用', dictValue: 1, id: 1 },
  { dictLabel: '停用', dictValue: 0, id: 0 },
]

//  table根据状态渲染不同样式的状态 启用-停用
const formatter = ({ status }: { status: number | undefined }) => (status === 1 ? h('span', { class: 'text-[#06bb9a]' }, '启用') : h('span', { class: 'text-[#FFB402]' }, '停用'))

//   table根据状态渲染不同样式的状态 正常-冻结
const formatterFreeze = ({ status }: { status: number | undefined }) => (status === 1 ? h('span', { class: 'text-[#06bb9a]' }, '启用') : h('span', { class: 'text-[#FFB402]' }, '停用'))

// table根据状态渲染不同样式的状态 成功-失败
const formatterSuccess = ({ status }: { status: number | undefined }) => (status === 0 ? h('span', { class: 'text-[#06bb9a]' }, '成功') : h('span', { class: 'text-[#FFB402]' }, '失败'))

/**
 * select, option别名
 * @returns any
 */
const optionsAlias = { labelField: 'dictLabel', valueField: 'id' }

export { formatter, formatterFreeze, formatterSuccess, optionsAlias, statusOptions }
