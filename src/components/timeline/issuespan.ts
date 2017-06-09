import Vue from 'vue'
import Component from 'vue-class-component'
import * as moment from 'moment'
import { throttle } from '~/utils/common'
import Timeline from "~/models/timeline";
import Issue from '~/models/issue'
import Point from '~/models/point'
import Store from '~/stores/global'

@Component({
  props: {
    issue: Issue,
    onDragStart: Function,
    onDragMove: Function,
    onDragEnd: Function,
    onExpandStart: Function,
    onExpandMove: Function
  }
})
export default class IssueSpan extends Vue {
  private timeline: Timeline = Store.timeline
  private origin: Point = new Point()
  private dragMoveWithThrottle: Function
  private expandMoveWithThrottle: Function

  get spanClass(): Array<string> {
    let context: Issue = this.$props.issue

    return [
      `span`,
      `span-${context.color}`
    ]
  }

  get spanStyle(): Object {
    let timeline: Timeline = this.timeline
    let issue: Issue = this.$props.issue

    return {
      width: `${(100 / timeline.span * issue.duration).toFixed(5)}%`,
      left: `${(100 / timeline.span * issue.viewOffset).toFixed(5)}%`
    }
  }

  dragStart(event: DragEvent) {
    // 隐藏拖动时光标处默认复制的元素copy
    // event.dataTransfer.setDragImage(
    //   window.document.createElement('div'), 0, 0);

    this.origin.x = event.clientX
    this.origin.y = event.clientY

    this.$props.onDragStart(this.$props.issue)
    Store.issueOnDrag = new Issue(this.$props.issue)
  }

  dragMove(event: DragEvent) {
    // FIXME: event的鼠标位置偶尔会错误的为(0, 0)
    if (event.clientX === 0 && event.clientY === 0) return

    let offset = new Point(
      event.clientX - this.origin.x,
      event.clientY - this.origin.y
    )

    let el = <Element>(event.target)
    console.log(Math.abs(offset.y) > el.clientHeight / 2);

    if (Math.abs(offset.y) > el.clientHeight / 2) {
      offset.x = 0
    }

    this.dragMoveWithThrottle({
      targetIssue: this.$props.issue,
      dragOffset: offset
    })
  }

  dragEnd(event: DragEvent) {
    let isValid = event.dataTransfer.dropEffect !== 'none'
    if (!isValid) return

    this.$props.onDragEnd({
      targetIssue: this.$props.issue,
      isValid
    })
  }

  expandStart(event: DragEvent) {
    event.stopPropagation()

    // 隐藏拖动时光标处默认复制的元素copy
    event.dataTransfer.setDragImage(
      window.document.createElement('div'), 0, 0);

    console.dir(event.target)

    this.origin.x = event.clientX
    this.origin.y = event.clientY

    this.$props.onExpandStart(this.$props.issue)
    Store.issueOnDrag = new Issue(this.$props.issue)
  }

  expandMove(event: DragEvent, direction: string) {
    // FIXME: event的鼠标位置偶尔会错误的为(0, 0)
    if (event.x === 0 && event.y === 0) return

    let offset = new Point(
      event.clientX - this.origin.x,
      event.clientY - this.origin.y
    )

    this.expandMoveWithThrottle({
      targetIssue: this.$props.issue,
      dragOffset: offset,
      direction
    })
  }

  expandEnd(event: DragEvent) {

  }

  mounted() {
    let issue: Issue = this.$props.issue
    issue.viewOffset = issue.getTimespanDiff(this.timeline.from)

    this.dragMoveWithThrottle = throttle(this.$props.onDragMove, 50)
    this.expandMoveWithThrottle = throttle(this.$props.onExpandMove, 50)
  }
}