import * as moment from 'moment'
import Issue from "~/models/issue";
import Timeline from "~/models/timeline";
import Member from "~/models/member";
import Color from "~/models/color";

const state = {
  issueOnDrag: new Issue({ title: '', initiator: '' }),
  timeline: new Timeline({
    from: moment.utc().weekday(0).hour(0),
    to: moment.utc().weekday(7).hour(0),
    unit: 0.5
  }),
  issues: [
    new Issue({
      _id: '1',
      title: '增加账套名称点击触发切换账套功能',
      initiator: 'God',
      start: moment.utc().weekday(0).hour(0),
      duration: 5,
      viewUnit: 0.5
    }),
    new Issue({
      _id: '2',
      title: '我是来搅局的',
      initiator: 'God',
      start: moment.utc().weekday(5).hour(0),
      duration: 3,
      viewUnit: 0.5,
      color: 'blue'
    }),
    new Issue({
      _id: '3',
      title: '行为检测，前后端埋点统计用户使用行为',
      initiator: 'God',
      start: moment.utc().weekday(2).hour(0),
      duration: 7,
      color: Color.green,
      viewUnit: 0.5
    })
  ],
  members: [
    new Member({
      name: 'Doge',
      issues: []
    }),
    new Member({
      name: 'Kitten',
      issues: []
    }),
    new Member({
      name: 'Unicorn',
      issues: []
    })
  ]
}

const getters = {
  getTimeline: state => state.timeline,
  getIssues: state => state.issues,
  getMembers: state => state.members,
  getIssueOnDrag: state => state.issueOnDrag
}

const mutations = {
  setIssueOnDrag(state, issue: Issue) {
    state.issueOnDrag = issue
  }
}

const actions = {
  cacheDragIssue({ commit }, issue: Issue) {
    commit('setIssueOnDrag', issue)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}