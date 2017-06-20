import Vuex from 'vuex'
import { RootState } from './root'
import Schedule from '~/models/schedule'

interface ScheduleState {
  schedules: Schedule[]
}

const state: ScheduleState = {
  schedules: []
}

const getSchedules: Vuex.Getter<ScheduleState, RootState> =
  state => (predicate: Predicate<Schedule>) => state.schedules.filter(predicate)

const store: Vuex.StoreOptions<ScheduleState> = {
  state,
  getters: {
    getSchedules
  }
}

export default store