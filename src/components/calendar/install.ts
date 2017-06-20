import Vue from 'vue'
import KbCalendar from './calendar.vue'

interface CalendarOptions {

}

const installer: Vue.PluginObject<CalendarOptions> = {
  install(vue: typeof Vue, options?: CalendarOptions): void {
    vue.component('kb-calendar', KbCalendar)
  }
}

export default installer