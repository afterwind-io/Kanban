import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class KbInput extends Vue {
  @Prop({ default: 'I am a label' })
  label: string

  @Prop({ default: 'I am a placeholder' })
  placeholder: string

  @Prop({ default: '' })
  hint: string

  @Prop({ default: '' })
  value: string

  get hasValue() {
    return this.value !== ''
  }

  onchange(value: string) {
    this.$emit('input', value)
  }
}
