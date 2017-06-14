import Vue from 'vue'
import Component from 'vue-class-component'
import { mapAction } from '~/utils/vuex-ts'
import Issue from '~/models/issue'

@Component({
  props: {
    issue: Issue,
    // onDragStart: Function,
    // onDragMove: Function,
    // onDragEnd: Function,
    // onExpandStart: Function,
    // onExpandMove: Function
  }
})
export default class IssueComponent extends Vue {

  @mapAction('cacheDragIssue')
  cacheDragIssue(issue: Issue) { }

  onDragStart(event: DragEvent): void {
    this.cacheDragIssue(Issue.clone(this.$props.issue))
  }
  onDrag(event: DragEvent): void {
    // Store.issueOnDrag = Issue.clone(this.$props.issue)
  }
  onDragEnd(event: DragEvent): void {
    // Store.issueOnDrag = Issue.clone(this.$props.issue)
  }
}