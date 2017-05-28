<template>
  <div class="ui-panel issue-panel">
    <com-issue v-for="issue in issues" :key="issue._key" :issue="issue"></com-issue>
  </div>
</template>

<script lang="ts" src="./panel.ts"></script>

<style lang="scss" src="./panel.scss"></style>