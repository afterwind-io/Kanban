import Vue from 'vue'
import Component from 'vue-class-component'
import * as moment from 'moment'
import Timeline from '~/models/timeline'
import Member from '~/models/member'
import Issue from '~/models/issue'
import Point from '~/models/point'

import IssueSpan from './issuespan.vue'
import Store from '~/stores/global'

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
  private timeline: Timeline = Store.timeline

  issueDragStart(targetIssue: Issue) {
    let el: Element = document.querySelector('#timeTable .col-content')
    this.issueSpaceWidth = el.clientWidth
  }

  issueDragMove({ targetIssue, dragOffset }: { targetIssue: Issue, dragOffset: Point }): void {
    let unit: number = this.issueSpaceWidth / this.timeline.span
    let delta: number = Math.round(dragOffset.x / unit)
    let offset: number = Store.issueOnDrag.viewOffset + delta

    if (offset < 0 || offset + targetIssue.duration > this.timeline.span) return

    targetIssue.setStart(Store.issueOnDrag.start)
    targetIssue.shiftStartBy(delta)
    targetIssue.setViewOffset(offset)
  }

  issueDragEnd({ targetIssue, isValid }: { targetIssue: Issue, isValid: Boolean }): void {
    if (isValid) {
      let issues: Issue[] = this.$props.member.issues
      let index = issues.findIndex(issue => issue._key === targetIssue._key)
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
    let offset: number = Store.issueOnDrag.viewOffset + delta

    let factor = direction === 'forward' ? 1 : -1
    if (Store.issueOnDrag.duration + delta * factor < 1) return
    if (Store.issueOnDrag.duration + delta * factor > this.timeline.span) return
    if ((direction === 'forward') && (Store.issueOnDrag.viewOffset + Store.issueOnDrag.duration + delta > this.timeline.span)) return
    if ((direction === 'backward') && (Store.issueOnDrag.viewOffset + delta < 0)) return

    targetIssue.setStart(Store.issueOnDrag.start)
    targetIssue.setDuration(Store.issueOnDrag.duration)

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
    if (issues.find(issue => issue._key === Store.issueOnDrag._key) !== void 0) return

    this.isDragover = true
    event.preventDefault()
  }

  onDragLeave(event: DragEvent) {
    this.isDragover = false
  }

  onDrop(event: DragEvent) {
    this.$props.member.issues.push(Store.issueOnDrag)

    this.isDragover = false
  }
}