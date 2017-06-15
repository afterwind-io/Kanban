import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class Landing extends Vue {
  private hint: string = ''
  private username: string = ''
  private password: string = ''
}