import Vue from 'vue'
import app from './components/app/app.vue'
import store from './stores'
import router from './routes'

import KbInput from '~/components/input/install'
import KbSpinner from '~/components/spinner/install'

import './font/flaticon.scss'
import './styles/global.scss'

import * as moment from 'moment'
moment.locale('zh-cn')

Vue.use(KbInput)
Vue.use(KbSpinner)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(app)
})