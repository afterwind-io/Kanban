import Vue from 'vue'
import { mapGetter } from '~/utils/vuex-ts'
import Component from 'vue-class-component'
import Issue from '~/models/issue'
import ComIssue from './issue.vue'

@Component({
  components: {
    ComIssue
  }
})
export default class IssuePanel extends Vue {

  @mapGetter('getIssues')
  get issues(): Issue[] { return }
}
