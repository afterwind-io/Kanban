import Vue from 'vue'
import Component from 'vue-class-component'
import * as moment from 'moment'
import Timeline from '~/models/timeline'
import Member from '~/models/member'
import Issue from '~/models/issue'
import Color from "~/models/color";

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
          start: moment.utc().weekday(0),
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
          start: moment.utc().weekday(2),
          duration: 7,
          color: Color.green
        })
      ]
    })
  ]
})

@Component({})
export default class TimelinePanel extends Vue {

  timeline: Timeline = tl

  getIssueStyle(issue: Issue): Array<string> {
    return [
      `span-start-${issue.getTimespanDiff(this.timeline.from)}`,
      `span-range-${issue.duration}`,
      `span-${issue.color}`
    ]
  }
}