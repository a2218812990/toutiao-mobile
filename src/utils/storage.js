// 操作本地存储的方法封装
// 存储token
export const setItem = (name, value) => {
  let data = typeof value === 'object' ? JSON.stringify(value) : value
  window.localStorage.setItem(name, data)
}
// 取出token
export const getItem = name => {
  let data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
// 删除token

export const removeItem = name => window.localStorage.removeItem(name)
