<template>
  <div class="kb-shade" :style="style">
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export default class KbShade extends Vue {
  @Prop({ default: 0.25 })
  opacity: number

  get style(): any {
    return {
      'opacity': `${this.opacity}`
    }
  }
}
</script>

<style lang="sass">
.kb-shade {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at top left, rgba(255, 255, 255, 1) 0%, rgba(0, 0, 0, 1) 100%);
  z-index: 10;
  pointer-events: none;
}
</style>
