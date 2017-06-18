import Vue from 'vue'
import KbInput from './input.vue'

interface InputOptions {

}

const installer: Vue.PluginObject<InputOptions> = {
  install(vue: typeof Vue, options?: InputOptions): void {
    vue.component('kb-input', KbInput)
  }
}

export default installer