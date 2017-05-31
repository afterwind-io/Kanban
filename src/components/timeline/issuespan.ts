import Vue from 'vue'
import Component from 'vue-class-component'
import * as moment from 'moment'
import { throttle } from '~/utils/common'
import Issue from '~/models/issue'
import Point from '~/models/point'

@Component({
  props: {
    context: Issue,
    onDragStart: Function,
    onDragMove: Function,
    onExpandStart: Function,
    onExpandMove: Function
  }
})
export default class IssueSpan extends Vue {
  private origin: Point = new Point()
  private dragMoveWithThrottle: Function
  private expandMoveWithThrottle: Function

  get spanStyle(): Array<string> {
    let context: Issue = this.$props.context

    return [
      `span`,
      `span-start-${context.viewOffset}`,
      `span-range-${context.duration}`,
      `span-${context.color}`
    ]
  }

  dragStart(event: DragEvent) {
    // 隐藏拖动时光标处默认复制的元素copy
    event.dataTransfer.setDragImage(
      window.document.createElement('div'), 0, 0);

    this.origin.x = event.x
    this.origin.y = event.y

    this.$props.onDragStart(this.$props.context)
  }

  dragMove(event: DragEvent) {
    // FIXME: event的鼠标位置偶尔会错误的为(0, 0)
    if (event.x === 0 && event.y === 0) return

    let offset = new Point(
      event.x - this.origin.x,
      event.y - this.origin.y
    )

    this.dragMoveWithThrottle({
      targetIssue: this.$props.context,
      dragOffset: offset
    })
  }

  dragEnd(event: DragEvent) {

  }

  expandStart(event: DragEvent) {
    event.stopPropagation()

    // 隐藏拖动时光标处默认复制的元素copy
    event.dataTransfer.setDragImage(
      window.document.createElement('div'), 0, 0);

    console.dir(event.target)

    this.origin.x = event.x
    this.origin.y = event.y

    this.$props.onExpandStart(this.$props.context)
  }

  expandMove(event: DragEvent, direction: string) {
    // FIXME: event的鼠标位置偶尔会错误的为(0, 0)
    if (event.x === 0 && event.y === 0) return

    let offset = new Point(
      event.x - this.origin.x,
      event.y - this.origin.y
    )

    let report = params => this.$props.onExpandMove(params)
    this.expandMoveWithThrottle({
      targetIssue: this.$props.context,
      dragOffset: offset,
      direction
    })
  }

  expandEnd(event: DragEvent) {

  }

  mounted() {
    let context: Issue = this.$props.context
    let viewStart: moment.Moment = context.viewStart

    context.viewOffset = context.getTimespanDiff(viewStart)

    this.dragMoveWithThrottle = throttle(this.$props.onDragMove, 50)
    this.expandMoveWithThrottle = throttle(this.$props.onExpandMove, 50)
  }
}