import Vue from 'vue'
import Vuex from 'vuex'
import * as VuexHelper from '~/utils/vuex-ts'

import { root } from './root'
import temp from './temp'
import user from './user'

Vue.use(Vuex)

let store = new Vuex.Store({
  ...root,
  modules: {
    temp,
    user
  }
})

VuexHelper.open(store)

export default store