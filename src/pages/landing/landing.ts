import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { mapAction } from '~/utils/vuex-ts'

@Component({
  components: {}
})
export default class Landing extends Vue {
  private hint: string = ''
  private username: string = ''
  private password: string = ''
  private email: string = ''
  private mode: 'signin' | 'signup' = 'signin'

  switchMode(mode: 'signin' | 'signup') {
    this.mode = mode
  }

  @mapAction('loginAsync')
  loginAsync(...p: any[]): Promise<string> { return }

  async login() {
    this.$spinner.show()

    try {
      let id = await this.loginAsync({
        username: this.username,
        password: this.password
      })

      this.$router.push({ name: 'person', params: { id } })
    } catch (e) {
      // TODO
    } finally {
      this.$spinner.hide()
    }
  }
}