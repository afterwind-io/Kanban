import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { mapGetter, mapAction } from '~/utils/vuex-ts'

import KbInput from '~/components/input/input.vue'

@Component({
  components: {
    KbInput
  }
})
export default class Landing extends Vue {
  private hint: string = ''
  private username: string = ''
  private password: string = ''
  private email: string = ''
  private mode: 'signin' | 'signup' = 'signin'

  @mapGetter('getUser')
  get user(): string { return }

  @mapAction('changeUsername')
  woof(name: string) { }

  switchMode(mode: 'signin' | 'signup') {
    this.mode = mode
  }

  async login() {
    this.$router.push('home')
  }

  async change() {
    await this.woof('kitty')
    alert('wow')
  }
}