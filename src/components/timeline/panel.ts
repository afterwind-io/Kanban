import Vue from 'vue'
import Component from 'vue-class-component'
import { mapGetter } from '~/utils/vuex-ts'
import Timeline from '~/models/timeline'
import Member from '~/models/member'

import MemberSpan from './memberSpan.vue'

@Component({
  components: {
    MemberSpan
  }
})
export default class TimelinePanel extends Vue {
  private isDragOverBin: boolean = false

  @mapGetter('getTimeline')
  get timeline(): Timeline { return }

  @mapGetter('getMembers')
  get members(): Member[] { return }

  intoTheBin(event: DragEvent) {
    this.isDragOverBin = true

    event.preventDefault()
  }

  outTheBin(event: DragEvent) {
    this.isDragOverBin = false
  }

  toss(event: DragEvent) {
    this.isDragOverBin = false
  }
}