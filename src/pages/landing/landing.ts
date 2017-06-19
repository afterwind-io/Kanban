import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { mapGetter, mapAction } from '~/utils/vuex-ts'

@Component({
  components: {}
})
export default class Landing extends Vue {
  private hint: string = ''
  private username: string = ''
  private password: string = ''
  private email: string = ''
  private mode: 'signin' | 'signup' = 'signin'

  @mapGetter('getUser')
  get user(): string { return }

  @mapAction('loginAsync')
  async loginAsync(p: any) { }

  switchMode(mode: 'signin' | 'signup') {
    this.mode = mode
  }

  async login() {
    this.$spinner.show()

    try {
      await this.loginAsync({
        username: this.username,
        password: this.password
      })

      this.$router.push('home')
    } catch (e) {
      // TODO
    } finally {
      this.$spinner.hide()
    }
  }
}