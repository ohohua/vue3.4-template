/**
 * 获取本地图片地址
 * @param url
 * @returns
 */
export function getAssetsFile(url: string) {
  return new URL(`../assets/images/${url}`, import.meta.url).href
}
