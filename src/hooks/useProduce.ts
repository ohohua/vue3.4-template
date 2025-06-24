/**
 * 利用 Promise 实现简单的发布订阅
 * @returns produce 生产函数  addCustomer 添加消费函数
 */
export default function () {
  let produce: any
  const customers: any[] = []
  const addCustomer = (fn: () => void) => {
    if (typeof fn !== 'function') {
      return console.warn('add customer is not a function')
    }
    customers.push(fn)
  }

  const promise = new Promise((resolve) => {
    produce = (message?: any) => {
      resolve(message)
    }
  })

  promise.then((message) => {
    customers.forEach((fn) => {
      fn(message)
    })
  })

  onUnmounted(() => {
    produce = undefined
    customers.length = 0
  })

  return { produce, addCustomer }
}
