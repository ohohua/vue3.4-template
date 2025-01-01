/**
 * @param blob Blob文件
 * @param name 文件名字
 * @param suffix 文件后缀名
 */
export default (blob: Blob, name: string, suffix: string) => {
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${name}.${suffix}`
  link.click()
  document.body.appendChild(link)
  document.body.removeChild(link) // 下载完成移除元素
  window.URL.revokeObjectURL(link.href) // 释放掉blob对象
}
