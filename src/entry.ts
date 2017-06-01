import Vue from 'vue'
import * as moment from 'moment'
import app from './components/app/app.vue'
// import router from './route'

import './styles/global.scss'

moment.locale('zh-cn')

new Vue({
  el: '#app',
  // router,
  render: h => h(app)
})