import Vue from 'vue'
import { mapGetter } from '~/utils/vuex-ts'
import Component from 'vue-class-component'
import * as moment from 'moment'
import Timeline from '~/models/timeline'
import Member from '~/models/member'
import Issue from '~/models/issue'
import Point from '~/models/point'

import IssueSpan from './issuespan.vue'

@Component({
  components: {
    IssueSpan
  },
  props: {
    member: Member,
  }
})
export default class MemberSpan extends Vue {
  private isDragover: Boolean = false
  private issueSpaceWidth: number = 0

  @mapGetter('getTimeline')
  get timeline(): Timeline { return }

  @mapGetter('getIssueOnDrag')
  get issueOnDrag(): Issue { return }

  issueDragStart(targetIssue: Issue) {
    let el: Element = document.querySelector('#timeTable .col-content')
    this.issueSpaceWidth = el.clientWidth
  }

  issueDragMove({ targetIssue, dragOffset }: { targetIssue: Issue, dragOffset: Point }): void {
    let unit: number = this.issueSpaceWidth / this.timeline.span
    let delta: number = Math.round(dragOffset.x / unit)
    let offset: number = this.issueOnDrag.viewOffset + delta

    if (offset < 0 || offset + targetIssue.duration > this.timeline.span) return

    targetIssue.setStart(this.issueOnDrag.start)
    targetIssue.shiftStartBy(delta)
    targetIssue.setViewOffset(offset)
  }

  issueDragEnd({ targetIssue, isValid }: { targetIssue: Issue, isValid: Boolean }): void {
    if (isValid) {
      let issues: Issue[] = this.$props.member.issues
      let index = issues.findIndex(issue => issue._id === targetIssue._id)
      index !== -1 && issues.splice(index, 1)
    }
  }

  issueExpandStart(targetIssue: Issue) {
    let el: Element = document.querySelector('#timeTable .col-content')
    this.issueSpaceWidth = el.clientWidth
  }

  issueExpandMove({ targetIssue, dragOffset, direction }: { targetIssue: Issue, dragOffset: Point, direction: String }): void {
    let unit: number = this.issueSpaceWidth / this.timeline.span
    let delta: number = Math.round(dragOffset.x / unit)
    let offset: number = this.issueOnDrag.viewOffset + delta

    let factor = direction === 'forward' ? 1 : -1
    if (this.issueOnDrag.duration + delta * factor < 1) return
    if (this.issueOnDrag.duration + delta * factor > this.timeline.span) return
    if ((direction === 'forward') && (this.issueOnDrag.viewOffset + this.issueOnDrag.duration + delta > this.timeline.span)) return
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

  onDragOver(event: DragEvent) {
    let issues: Issue[] = this.$props.member.issues
    if (issues.find(issue => issue._id === this.issueOnDrag._id) !== void 0) return

    this.isDragover = true
    event.preventDefault()
  }

  onDragLeave(event: DragEvent) {
    this.isDragover = false
  }

  onDrop(event: DragEvent) {
    this.$props.member.issues.push(this.issueOnDrag)

    this.isDragover = false
  }
}