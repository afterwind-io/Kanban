import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class Calendar extends Vue {
  private days = Array(35).fill(0).map((day, i) => ({ value: i + 1, selected: false }))

  selectDay(day: any) {
    day.selected = !day.selected
  }
}