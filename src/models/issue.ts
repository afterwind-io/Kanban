import * as moment from 'moment'
import { idGen } from '~/utils/common'
import Color from '~/models/color'

/**
 * 事项
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
   * @type {moment.Moment}
   * @memberof Issue
   */
  public readonly createdAt: moment.Moment

  /**
   * 开工时间
   * 
   * @type {moment.Moment}
   * @memberof Issue
   */
  public start: moment.Moment

  /**
   * 持续时间
   * 
   * @type {number}
   * @memberof Issue
   */
  public duration: number

  /**
   * 颜色标签
   * 
   * @type {Color}
   * @memberof Issue
   */
  public color: Color

  constructor({
    title,
    initiator,
    detail,
    createdAt = moment(),
    start,
    duration = 0.5,
    color = Color.red
  }: {
      title: string,
      initiator: string,
      detail?: string,
      createdAt?: string | moment.Moment,
      start?: string | moment.Moment,
      duration: number,
      color?: Color
    }) {
    this.title = title
    this.initiator = initiator
    this.detail = detail
    this.createdAt = moment(createdAt)
    this.color = color

    this.start = Issue.roundTime(moment(start))
    this.duration = Issue.roundTimespan(duration)
  }

  /**
   * 将时间舍入至最接近的12小时的倍数
   * 
   * @static
   * @param {moment.Moment} time 需要进行舍入的时间
   * @returns {moment.Moment} 舍入后的时间
   * 
   * @memberof Issue
   */
  static roundTime(time: moment.Moment): moment.Moment {
    const unit = moment.duration(12, 'hours').asSeconds()
    const secs = time.unix()

    return moment.unix(Math.round(secs / unit) * unit).utc()
  }

  /**
   * 将时间间隔舍入至最接近的0.5的倍数，最小值为0.5
   * 
   * @static
   * @param {number} timespan 需要进行舍入的时间间隔
   * @returns {number} 舍入后的时间间隔
   * 
   * @memberof Issue
   */
  static roundTimespan(timespan: number): number {
    if (timespan < 0.5) return 0.5
    return Math.round(timespan * 2) / 2
  }

  /**
   * 设置事项的开工时间
   * 
   * @param {moment.Moment} start 
   * @param {number} offset 
   * 
   * @memberof Issue
   */
  setStart(start: moment.Moment, offset: number): void {
    this.start = start
    this.shiftStartBy(offset)
  }

  /**
   * 将事项的开工时间偏移指定的时间间隔
   * 
   * @param {number} offset 偏移量，以天为单位，0.5天为步长，
   *                        不为0.5倍数的会被舍入到最接近的数字
   * 
   * @memberof Issue
   */
  shiftStartBy(offset: number): void {
    let hours = Issue.roundTimespan(offset) * 12
    let duration = moment.duration(hours, 'hours')
    this.start.add(duration)
  }

  /**
   * 设置事项的持续时间
   * 
   * @param {number} duration 持续时间，以天为单位，0.5天为步长，
   *                          不为0.5倍数的会被舍入到最接近的数字
   * 
   * @memberof Issue
   */
  setDuration(duration: number): void {
    this.duration = Issue.roundTimespan(duration)
  }

  /**
   * 将事项的持续时间偏移指定的时间间隔
   * 
   * @param {number} offset 偏移量，以天为单位，0.5天为步长，
   *                        不为0.5倍数的会被舍入到最接近的数字
   * 
   * @memberof Issue
   */
  shiftDurationBy(offset: number): void {
    this.duration += Issue.roundTimespan(offset)
  }

  /**
   * 计算指定时间与事项开工时间之间相差0.5天的倍数
   * 
   * @param {moment.Moment} time 指定的时间
   * @returns {number} 差值为0.5天的多少倍，结果取整数部分
   * 
   * @memberof Issue
   */
  getTimespanDiff(time: moment.Moment): number {
    const unit = moment.duration(12, 'hours').asSeconds()
    const diff = this.start.unix() - time.unix()

    return ~~(diff / unit)
  }
}