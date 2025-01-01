import type { Recordable } from '@/types/form'

type Fn<T = any> = (item: T, index: number, array: T[]) => boolean

/**
 *
 * @param component 需要注册的组件
 * @param alias 组件别名
 * @returns any
 */
export function withInstall<T>(component: T, alias?: string) {
  const comp = component as any
  comp.install = (app: any) => {
    app.component(comp.name || comp.displayName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as T & Plugin
}

/**
 * @param str 需要转下划线的驼峰字符串
 * @returns 字符串下划线
 */
export function humpToUnderline(str: string): string {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

/**
 * @param str 需要转驼峰的下划线字符串
 * @returns 字符串驼峰
 */
export function underlineToHump(str: string): string {
  if (!str) {
    return ''
  }
  return str.replace(/-(\w)/g, (_, letter: string) => {
    return letter.toUpperCase()
  })
}

export function setCssVar(prop: string, val: any, dom = document.documentElement) {
  dom.style.setProperty(prop, val)
}

/**
 * 查找数组对象的某个下标
 * @param {Array} ary 查找的数组
 * @param {Functon} fn 判断的方法
 */
export function findIndex<T = Recordable>(ary: Array<T>, fn: Fn): number {
  if (ary.findIndex) {
    return ary.findIndex(fn)
  }
  let index = -1
  ary.some((item: T, i: number, ary: Array<T>) => {
    const ret: boolean = fn(item, i, ary)
    if (ret) {
      index = i
    }
    return ret
  })
  return index
}

export function trim(str: string) {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}

/**
 * 生成随机字符串
 */
export function toAnyString() {
  const str: string = 'xxxxx-xxxxx-4xxxx-yxxxx-xxxxx'.replace(/[xy]/g, (c: string) => {
    const r: number = (Math.random() * 16) | 0
    const v: number = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString()
  })
  return str
}

/**
 * 获取本地图片地址
 * @param url
 * @returns string
 */
export function getAssetsFile(url: string) {
  return new URL(`../assets/images/${url}`, import.meta.url).href
}
