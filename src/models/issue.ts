import * as moment from 'moment'
import { idGen } from '~/utils/common'
import Color from '~/models/color'

interface IssueOptions {
  _id?: string
  _key?: string
  title: string
  initiator: string
  detail?: string
  createdAt?: string | moment.Moment
  start?: string | moment.Moment
  duration?: number
  viewOffset?: number
  viewUnit?: number
  color?: Color
}

/**
 * 事项
 * 
 * @export
 * @class Issue
 */
export default class Issue {

  /**
   * 数据标识
   * 
   * @type {string}
   * @memberof Issue
   */
  public _id: string = ''

  /**
   * UI层索引标识
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
   * 时间线显示起始日期到开工日期的偏移量，以viewUnit天为单位
   * 
   * @type {number}
   * @memberof Issue
   */
  public viewOffset: number = 0

  /**
   * 时间线日期刻度的单位，以天为单位
   * 
   * @type {number}
   * @memberof Issue
   */
  public viewUnit: number = 1

  /**
   * 颜色标签
   * 
   * @type {Color}
   * @memberof Issue
   */
  public color: Color

  constructor({
    _id,
    _key = idGen(),
    title,
    initiator,
    detail,
    createdAt = moment(),
    start,
    duration = 0.5,
    viewOffset = 0,
    viewUnit = 1,
    color = Color.red,
  }: IssueOptions) {
    this._id = _id
    this._key = _key
    this.title = title
    this.initiator = initiator
    this.detail = detail
    this.createdAt = moment(createdAt)
    this.color = color
    this.start = Issue.roundTime(moment(start), viewUnit)
    this.duration = Issue.roundTimespan(duration, viewUnit)

    this.viewOffset = viewOffset
    this.viewUnit = viewUnit
  }

  /**
   * 获得一份包含新_key的浅拷贝，
   * 
   * @static
   * @param {Issue} issue 需要拷贝的数据
   * @returns {Issue} 数据的浅拷贝，_key被替换为新值
   * 
   * @memberof Issue
   */
  static clone(issue: Issue): Issue {
    delete issue._key
    return new Issue(issue)
  }

  /**
   * 将时间舍入至最接近的指定时间间隔的倍数
   * 
   * @static
   * @param {moment.Moment} time 需要进行舍入的时间
   * @param {number} unit 时间间隔，单位为天
   * @returns {moment.Moment} 舍入后的时间
   * 
   * @memberof Issue
   */
  static roundTime(time: moment.Moment, unit: number): moment.Moment {
    const unitSecs = moment.duration(24 * unit, 'hours').asSeconds()
    const secs = time.unix()

    return moment.unix(Math.round(secs / unitSecs) * unitSecs).utc()
  }

  /**
   * 将时间间隔舍入至最接近的时间间隔的倍数
   * 
   * @static
   * @param {number} timespan 需要进行舍入的时间间隔
   * @param {number} unit 时间间隔，单位为天
   * @returns {number} 舍入后的时间间隔
   * 
   * @memberof Issue
   */
  static roundTimespan(timespan: number, unit: number): number {
    let factor = 1 / unit
    return Math.round(timespan * factor) / factor
  }

  setViewOffset(viewOffset: number) {
    this.viewOffset = Issue.roundTimespan(viewOffset, this.viewUnit)
  }

  /**
   * 设置事项的开工时间
   * 
   * @param {moment.Moment} start 开工时间
   * 
   * @memberof Issue
   */
  setStart(start: moment.Moment): void {
    this.start = moment(start)
  }

  /**
   * 将事项的开工时间偏移指定的时间间隔
   * 
   * @param {number} offset 偏移量，以this.viewUnit天为单位，单位天为步长，
   *                        不为单位天倍数的会被舍入到最接近的数字
   * 
   * @memberof Issue
   */
  shiftStartBy(offset: number): void {
    let hours = Issue.roundTimespan(offset, this.viewUnit)
    let duration = moment.duration(24 * hours * this.viewUnit, 'hours')

    this.start.add(duration)
  }

  /**
   * 设置事项的持续时间
   * 
   * @param {number} duration 持续时间，以this.viewUnit天为单位，单位天为步长，
   *                          不为单位天倍数的会被舍入到最接近的数字
   * 
   * @memberof Issue
   */
  setDuration(duration: number): void {
    this.duration = Issue.roundTimespan(duration, this.viewUnit)
  }

  /**
   * 将事项的持续时间偏移指定的时间间隔
   * 
   * @param {number} offset 偏移量，以this.viewUnit天为单位，单位天为步长，
   *                        不为单位天倍数的会被舍入到最接近的数字
   * 
   * @memberof Issue
   */
  shiftDurationBy(offset: number): void {
    this.duration += Issue.roundTimespan(offset, this.viewUnit)
  }

  /**
   * 计算指定时间与事项开工时间之间相差this.viewUnit天的倍数
   * 
   * @param {moment.Moment} time 指定的时间
   * @returns {number} 差值为this.viewUnit天的多少倍，结果取最接近的整数
   * 
   * @memberof Issue
   */
  getTimespanDiff(time: moment.Moment): number {
    const unit = moment.duration(24 * this.viewUnit, 'hours').asSeconds()
    const diff = this.start.unix() - time.unix()

    return Math.round(diff / unit)
  }
}