import Vue from 'vue'
import Issue from '~/models/issue'
import ComIssue from './issue.vue'

const issues = [
  new Issue({
    title: '增加账套名称点击触发切换账套功能',
    initiator: 'Doge'
  }),
  new Issue({
    title: '行为检测，前后端埋点统计用户使用行为',
    initiator: 'Kitty'
  }),
]

export default Vue.extend({
  components: {
    ComIssue
  },
  data() {
    return {
      issues
    }
  }
})