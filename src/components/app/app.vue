<template src="./app.html"></template>

<script lang="ts">
import Vue from 'vue';

import IssuePanel from '../issue/panel.vue'
import TimelinePanel from '../timeline/panel.vue'
import MemberPanel from '../member/panel.vue'

export default Vue.extend({
  components: {
    IssuePanel,
    TimelinePanel,
    MemberPanel
  }
})
</script>

<style scoped lang="scss" src="./app.scss"></style>