import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import Workflow from '~/plugins/workflow'

@Component
export default class Spinner extends Vue {
  private on: boolean = false
  private msg: string = 'wow'

  constructor() {
    super()

    Workflow.define('spinner.show', this.show)
    Workflow.define('spinner.hide', this.hide)
  }

  show() {
    this.on = true
  }

  hide() {
    this.on = false
  }
}
