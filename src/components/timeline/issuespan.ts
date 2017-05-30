import Vue from 'vue'
import Component from 'vue-class-component'
import * as moment from 'moment'
import Issue from '~/models/issue'
import Point from '~/models/point'

@Component({
  props: {
    context: Issue,
    viewStart: Object,
    onDragStart: Function,
    onDragMove: Function
  }
})
export default class IssueSpan extends Vue {
  private origin: Point = new Point()

  get spanStyle(): Array<string> {
    let context: Issue = this.$props.context

    return [
      `span`,
      `span-start-${context.offset}`,
      `span-range-${context.duration}`,
      `span-${context.color}`
    ]
  }

  dragMove(event: DragEvent) {
    // FIXME: event的鼠标位置偶尔会错误的为(0, 0)
    if (event.x === 0 && event.y === 0) return

    (<Element>event.target).classList.add('span-dragging')

    let offset = new Point(
      event.x - this.origin.x,
      event.y - this.origin.y
    )

    this.$props.onDragMove({
      targetIssue: this.$props.context,
      dragOffset: offset
    })
  }

  dragStart(event: DragEvent) {
    (<Element>event.target).classList.add('span-dragging')

    this.origin.x = event.x
    this.origin.y = event.y

    this.$props.onDragStart(this.$props.context)
  }

  dragEnd(event: DragEvent) {
    (<Element>event.target).classList.remove('span-dragging')
  }

  mounted() {
    let context: Issue = this.$props.context
    let viewStart: moment.Moment = this.$props.viewStart

    context.offset = context.getTimespanDiff(viewStart)
  }
}