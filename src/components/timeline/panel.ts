import Vue from 'vue'
import Component from 'vue-class-component'
import Timeline from '~/models/timeline'
import Member from '~/models/member'

import MemberSpan from './memberSpan.vue'
import Store from '~/stores/global'

@Component({
  components: {
    MemberSpan
  }
})
export default class TimelinePanel extends Vue {
  private timeline: Timeline = Store.timeline
  private members: Array<Member> = Store.members
}