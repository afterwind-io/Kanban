import Vue from 'vue'
import KbShade from './shade.vue'

interface ShadeOptions {

}

const installer: Vue.PluginObject<ShadeOptions> = {
  install(vue: typeof Vue, options?: ShadeOptions): void {
    vue.component('kb-shade', KbShade)
  }
}

export default installer