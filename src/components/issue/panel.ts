import Vue from 'vue'
import Issue from '~/models/issue'
import ComIssue from './issue.vue'
import Store from '~/stores/global'

export default Vue.extend({
  components: {
    ComIssue
  },
  data() {
    return {
      issues: Store.issues
    }
  }
})