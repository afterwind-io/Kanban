import * as moment from 'moment'
import Issue from '~/models/issue'
import Timeline from "~/models/timeline";
import Member from "~/models/member";
import Color from "~/models/color";

const store = {
  issueOnDrag: new Issue({ title: '', initiator: '', viewStart: void 0 }),
  timeline: new Timeline({
    from: moment.utc().weekday(0).hour(0),
    to: moment.utc().weekday(7).hour(0),
    unit: 0.5
  }),
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
}

export default store