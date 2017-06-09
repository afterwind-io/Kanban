import Member from './member'
import * as moment from 'moment'

interface TimelineOptions {
  from: moment.Moment,
  to: moment.Moment,
  unit: number
}

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
   * 时间线结束日期
   * 
   * @type {moment.Moment}
   * @memberof Timeline
   */
  public to: moment.Moment

  /**
   * 时间线显示的日期间隔单位，单位为天
   * 
   * @type {number}
   * @memberof Timeline
   */
  public unit: number

  constructor({
    from = moment(),
    to = moment(),
    unit = 1
  }: TimelineOptions) {
    this.from = from
    this.to = to
    this.unit = unit
  }

  /**
   * 获取时间线包含的刻度数量
   * 
   * @readonly
   * @type {number}
   * @memberof Timeline
   */
  get span(): number {
    let diff = this.to.diff(this.from, 'days', true)
    return Math.round(diff / this.unit)
  }

  /**
   * 获取时间线标注的时间节点集合
   * 
   * @readonly
   * @type {Array<string>}
   * @memberof Timeline
   */
  get timeNodes(): Array<string> {
    return [...Array(this.span).keys()].map(i => {
      if (!Number.isInteger(i * this.unit)) {
        return ''
      } else {
        return this.from.clone().add(i * this.unit, 'days').format('MM/DD')
      }
    })
  }
}