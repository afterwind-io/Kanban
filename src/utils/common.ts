/**
 * 生成指定位数的随机字母标识
 * 
 * @export
 * @param {number} [length=8] 标识长度，默认8位
 * @returns {string} 生成结果
 */
export function idGen(length: number = 8): string {
  let s = ''
  while (length-- > 0) {
    var r = Math.floor(Math.random() * 26) + 97
    s = s + String.fromCharCode(r)
  }
  return s
}

/**
 * 节流函数
 * 
 * @export
 * @param {Function} func 需要节流的函数
 * @param {number} interval 调用频率
 * @returns {Function} 带有节流控制的封装函数
 */
export function throttle(func: Function, interval: number): Function {
  let isWaiting = false

  return (...args: any[]) => {
    if (isWaiting) return

    isWaiting = true

    setTimeout(() => {
      func(...args)
      isWaiting = false
    }, interval);
  }
}