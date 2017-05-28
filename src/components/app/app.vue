<template>
  <div>
    <issue-panel></issue-panel>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import IssuePanel from '../issue/panel.vue'

export default Vue.extend({
  components: {
    IssuePanel
  }
})
</script>

<style lang="scss" src="./app.scss"></style>