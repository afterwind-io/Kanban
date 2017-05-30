/**
 * 点
 * 
 * @export
 * @class Point
 */
export default class Point {
  /**
   * 横坐标
   * 
   * @type {number}
   * @memberof Point
   */
  public x: number

  /**
   * 纵坐标
   * 
   * @type {number}
   * @memberof Point
   */
  public y: number

  constructor(x: number = 0, y: number = 0) {
    this.x = x
    this.y = y
  }
}