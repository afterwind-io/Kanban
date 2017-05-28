import Vue from 'vue'
import app from './components/app/app.vue'
// import router from './route'

import './styles/global.scss'

new Vue({
  el: '#app',
  // router,
  render: h => h(app)
})