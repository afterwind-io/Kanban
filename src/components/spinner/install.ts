import Vue from 'vue'
import Workflow from '~/plugins/workflow'
import KbSpinner from './spinner.vue'

declare module "vue/types/vue" {
  interface Vue {
    $spinner: Spinner
  }
}

interface Spinner {
  /**
   * 
   * Show loading spinner
   * 
   * @memberof Spinner
   */
  show: () => void,

  /**
   * 
   * Hide loading spinner
   * 
   * @memberof Spinner
   */
  hide: () => void
}

interface SpinnerOptions {

}

const spinner: Spinner = {
  show() {
    Workflow.start('spinner.show')
  },
  hide() {
    Workflow.start('spinner.hide')
  }
}

const installer: Vue.PluginObject<SpinnerOptions> = {
  install(vue: typeof Vue, options?: SpinnerOptions): void {
    vue.component('kb-spinner', KbSpinner)

    vue.prototype.$spinner = spinner
  }
}

export default installer