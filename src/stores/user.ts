import Vuex from 'vuex'
import { RootState } from './root'
import User from '~/models/user'

interface UserState {
  user: User
}

const state: UserState = {
  user: new User({ name: 'doge' })
}

const getUser: Vuex.Getter<UserState, RootState> = state => state.user


const setUsername: Vuex.Mutation<UserState> = (state, name) => {
  state.user.name = name
}

const changeUsername: Vuex.Action<UserState, RootState> =
  async ({ commit }, name) => {
    await new Promise((resolve) => {
      setTimeout(function () {
        resolve()
      }, 3000);
    })
    commit('setUsername', name)
  }

const store: Vuex.StoreOptions<UserState> = {
  state,
  getters: {
    getUser
  },
  mutations: {
    setUsername
  },
  actions: {
    changeUsername
  }
}

export default store