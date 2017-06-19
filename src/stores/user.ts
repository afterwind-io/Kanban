import Vuex from 'vuex'
import { RootState } from './root'
import User from '~/models/user'

interface UserState {
  user: User
}

const state: UserState = {
  user: new User({ name: 'doge' })
}


const getUser: Vuex.Getter<UserState, RootState> =
  state => state.user


const setUser: Vuex.Mutation<UserState> =
  (state, raw) => {
    state.user = new User(raw)
  }
const setUsername: Vuex.Mutation<UserState> =
  (state, name) => {
    state.user.name = name
  }

const loginAsync: Vuex.Action<UserState, RootState> =
  async ({ commit, state }, { username, password }) => {
    await new Promise((resolve) => {
      setTimeout(function () {
        resolve()
      }, 1000);
    })
    commit('setUser', { name: username })

    return state.user._id
  }

const store: Vuex.StoreOptions<UserState> = {
  state,
  getters: {
    getUser
  },
  mutations: {
    setUser
  },
  actions: {
    loginAsync
  }
}

export default store