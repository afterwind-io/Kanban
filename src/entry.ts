import Vue from 'vue'
import * as moment from 'moment'
import app from './components/app/app.vue'
import store from './stores/index'
// import router from './route'

import './font/flaticon.scss'
import './styles/global.scss'

moment.locale('zh-cn')


new Vue({
  el: '#app',
  // router,
  store,
  render: h => h(app)
})