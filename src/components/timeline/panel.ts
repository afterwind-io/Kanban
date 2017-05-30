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
          duration: 5
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
          color: Color.green
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
    let offset: number = this.issueOnDrag.offset + delta

    if (offset < 0 || offset + targetIssue.duration > this.timeline.span) return

    targetIssue.setStart(this.issueOnDrag.start, delta)
    targetIssue.setOffset(offset)
  }
}