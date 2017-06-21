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
 * 向字符串右侧填充指定长度的内容
 * 
 * @export
 * @param {any} source 需要填充的字符串
 * @param {number} num 填充后的长度
 * @param {string} [fill=' '] 填充的内容，默认为空格
 * @returns {string}  填充后的字符串
 */
export function padRight(source: any, num: number, fill: string = ' '): string {
  if (typeof source !== 'string') source = source.toString()
  if (source.length >= num) return source

  return source.concat(fill.repeat(num - source.length))
}

/**
 * 向字符串左侧填充指定长度的内容
 * 
 * @export
 * @param {any} source 需要填充的字符串
 * @param {number} num 填充后的长度
 * @param {string} [fill=' '] 填充的内容，默认为空格
 * @returns 填充后的字符串
 */
export function padLeft(source: any, num: number, fill: string = ' ') {
  if (typeof source !== 'string') source = source.toString()
  if (source.length >= num) return source

  return fill.repeat(num - source.length).concat(source)
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