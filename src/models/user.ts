/**
 * 用于初始化User类型的构造对象定义
 * 
 * @interface UserOption
 */
interface UserOption {
  _id?: string
  name: string
}

/**
 * 用户类型
 * 
 * @export
 * @class User
 */
export default class User {
  /**
   * 用户唯一标识
   * 
   * @type {string}
   * @memberof User
   */
  _id: string

  /**
   * 用户名称
   * 
   * @type {string}
   * @memberof User
   */
  name: string

  constructor({
    _id,
    name
  }: UserOption) {
    this._id = _id
    this.name = name
  }
}