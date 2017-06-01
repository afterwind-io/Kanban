import Vue from 'vue'
import Component from 'vue-class-component'
import * as moment from 'moment'
import Timeline from '~/models/timeline'
import Member from '~/models/member'
import Issue from '~/models/issue'
import Color from '~/models/color'
import Point from '~/models/point'
import IssueSpan from './issuespan.vue'

moment.locale('zh-cn')

const tl = new Timeline({
  from: moment.utc().weekday(0).hour(0),
  span: 14,
  members: [
    new Member({
      name: 'Doge',
      issues: [
        new Issue({
          title: '增加账套名称点击触发切换账套功能',
          initiator: 'God',
          start: moment.utc().weekday(0).hour(0),
          duration: 5,
          viewStart: moment.utc().weekday(0).hour(0),
          viewUnit: 0.5
        }),
        new Issue({
          title: '我是来搅局的',
          initiator: 'God',
          start: moment.utc().weekday(5).hour(0),
          duration: 3,
          viewStart: moment.utc().weekday(0).hour(0),
          viewUnit: 0.5,
          color: 'blue'
        })
      ]
    }),
    new Member({
      name: 'Kitten',
      issues: [
        new Issue({
          title: '行为检测，前后端埋点统计用户使用行为',
          initiator: 'God',
          start: moment.utc().weekday(2).hour(0),
          duration: 7,
          color: Color.green,
          viewStart: moment.utc().weekday(0).hour(0),
          viewUnit: 0.5
        })
      ]
    })
  ]
})

@Component({
  components: {
    IssueSpan
  }
})
export default class TimelinePanel extends Vue {
  private issueSpaceWidth: number = 0
  private timeline: Timeline = tl
  private issueOnDrag: Issue

  issueDragStart(targetIssue: Issue) {
    let el: Element = document.querySelector('#timeTable .col-content')
    this.issueSpaceWidth = el.clientWidth

    this.issueOnDrag = new Issue(targetIssue)
  }

  issueDragMove({ targetIssue, dragOffset }: { targetIssue: Issue, dragOffset: Point }): void {
    let unit: number = this.issueSpaceWidth / 14
    let delta: number = Math.round(dragOffset.x / unit)
    let offset: number = this.issueOnDrag.viewOffset + delta

    if (offset < 0 || offset + targetIssue.duration > this.timeline.span) return

    targetIssue.setStart(this.issueOnDrag.start)
    targetIssue.shiftStartBy(delta)
    targetIssue.setViewOffset(offset)
  }

  issueExpandStart(targetIssue: Issue) {
    let el: Element = document.querySelector('#timeTable .col-content')
    this.issueSpaceWidth = el.clientWidth

    this.issueOnDrag = new Issue(targetIssue)
  }

  issueExpandMove({ targetIssue, dragOffset, direction }: { targetIssue: Issue, dragOffset: Point, direction: String }): void {
    let unit: number = this.issueSpaceWidth / 14
    let delta: number = Math.round(dragOffset.x / unit)
    let offset: number = this.issueOnDrag.viewOffset + delta

    let factor = direction === 'forward' ? 1 : -1
    if (this.issueOnDrag.duration + delta * factor < 1) return
    if (this.issueOnDrag.duration + delta * factor > 14) return
    if ((direction === 'forward') && (this.issueOnDrag.viewOffset + this.issueOnDrag.duration + delta > 14)) return
    if ((direction === 'backward') && (this.issueOnDrag.viewOffset + delta < 0)) return

    targetIssue.setStart(this.issueOnDrag.start)
    targetIssue.setDuration(this.issueOnDrag.duration)

    if (direction === 'forward') {
      targetIssue.shiftDurationBy(delta)
    } else {
      targetIssue.shiftStartBy(delta)
      targetIssue.shiftDurationBy(-delta)
      targetIssue.setViewOffset(offset)
    }
  }
}