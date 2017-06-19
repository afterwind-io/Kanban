import Vue from 'vue'
import VueRouter from 'vue-router'

import p404 from '~/pages/404/404.vue'
import landing from '~/pages/landing/landing.vue'
import home from '~/pages/home/home.vue'
import person from '~/pages/person/person.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'landing', component: landing },
  { path: '/404', name: '404', component: p404 },
  {
    path: '/home', name: 'home', component: home, children: [
      { path: 'person/:id', name: 'person', component: person },
      { path: 'group/:id', name: 'group' },
      { path: 'config', name: 'config' },
    ]
  },
  { path: '*', redirect: '/404' }
]

export default new VueRouter({ routes })