import { idGen } from '~/utils/common'

/**
 * Issue Class
 * 
 * @export
 * @class Issue
 */
export default class Issue {

  /**
   * id
   * 
   * @type {string}
   * @memberof Issue
   */
  public _key: string = idGen()

  /**
   * 标题
   * 
   * @type {string}
   * @memberof Issue
   */
  public title: string = ''

  /**
   * 发起者
   * 
   * @type {string}
   * @memberof Issue
   */
  public initiator: string = ''

  /**
   * 详情
   * 
   * @type {string}
   * @memberof Issue
   */
  public detail: string = ''

  /**
   * 创建时间
   * 
   * @type {Date}
   * @memberof Issue
   */
  public readonly createdAt: Date

  // public title: string = '';
  // public title: string = '';
  // public title: string = '';
  // public title: string = '';


  constructor({
    title,
    initiator,
    detail
  }: {
      title: string,
      initiator: string,
      detail?: string
    }) {
    this.title = title
    this.initiator = initiator
    this.detail = detail
    this.createdAt = new Date()
  }
}