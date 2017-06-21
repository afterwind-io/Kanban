import Vue from 'vue'
import * as moment from 'moment'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { padLeft } from '~/utils/common'

class Day {
  public value: moment.Moment
  public index: number

  constructor({ index, value }: { index: number, value: moment.Moment }) {
    this.index = index
    this.value = value
  }

  get date() {
    return this.value.date()
  }
}

function fetchMonthCalendar(anchorDay: moment.Moment): Day[] {
  let firstDayOfMonth = moment(anchorDay).date(1)
  let daysCount = firstDayOfMonth.daysInMonth()
  let weekDay = firstDayOfMonth.weekday()

  return [...Array(42)].map(
    (day, i) => new Day({
      index: i,
      value: moment(anchorDay).date(i - weekDay + 1)
    })
  )
}

function monthBackward(day: moment.Moment): moment.Moment {
  return moment(day).month(day.month() - 1)
}

function monthForward(day: moment.Moment): moment.Moment {
  return moment(day).month(day.month() + 1)
}

@Component
export default class Calendar extends Vue {
  @Prop()
  initDay: moment.Moment

  @Prop()
  dateSelected: (day: moment.Moment) => void

  private weekdays: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sta', 'Sun']
  private anchorDay: moment.Moment = moment()

  private board1: Day[] = []
  private board2: Day[] = []
  private boardFlip: boolean = false

  get title() {
    return `${this.currentYear} - ${this.currentMonth}`
  }

  get currentYear() {
    return this.anchorDay.year()
  }

  get currentMonth() {
    return padLeft(this.anchorDay.month() + 1, 2, '0')
  }

  getDayStyle(day: Day): any {
    return {
      'day--highlight': this.isToday(day.value),
      'day--disable': !this.isCurrentMonth(day.value)
    }
  }

  isToday(day: moment.Moment): boolean {
    return day.year() === this.initDay.year() &&
      day.month() === this.initDay.month() &&
      day.date() === this.initDay.date()
  }

  isCurrentMonth(day: moment.Moment): boolean {
    return day.month() === this.anchorDay.month()
  }

  lastMonth() {
    this.anchorDay = monthBackward(this.anchorDay)
  }
  nextMonth() {
    this.anchorDay = monthForward(this.anchorDay)
  }

  selectDay(day: Day) {
    // day.selected = !day.selected
    this.dateSelected && this.dateSelected(day.value)
  }

  @Watch('initDay')
  refresh(initDay: moment.Moment) {
    this.anchorDay = moment(this.initDay)
  }

  @Watch('anchorDay')
  init(anchorDay: moment.Moment) {
    let board = fetchMonthCalendar(anchorDay)
    this.boardFlip ? (this.board1 = board) : (this.board2 = board)
    this.boardFlip = !this.boardFlip
  }

  mounted() {
    if (this.initDay !== void 0) this.init(this.initDay)
  }
}