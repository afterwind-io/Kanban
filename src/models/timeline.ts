import Member from './member'
import * as moment from 'moment'

/**
 * 时间线
 * 
 * @export
 * @class Timeline
 */
export default class Timeline {

  /**
   * 时间线开始日期
   * 
   * @type {moment.Moment}
   * @memberof Timeline
   */
  public from: moment.Moment

  /**
   * 时间线跨度
   * 
   * @type {number}
   * @memberof Timeline
   */
  public span: number

  /**
   * 时间线包含的成员列表
   * 
   * @type {Array<Member>}
   * @memberof Timeline
   */
  public members: Array<Member>

  constructor({
    from = moment(),
    span = 7,
    members = []
  }: {
      from: moment.Moment,
      span: number,
      members: Array<Member>
    }) {
    this.from = from
    this.span = span
    this.members = members
  }

  /**
   * 获取时间线标注的时间节点集合
   * 
   * @readonly
   * @type {Array<string>}
   * @memberof Timeline
   */
  get timeNodes(): Array<string> {
    let nodes: Array<string> = []

    for (let i = 0; i < this.span / 2; i++) {
      nodes.push(this.from.clone().add(i, 'days').format('MM/DD'))
    }

    return nodes
  }
}