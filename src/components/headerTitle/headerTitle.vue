<template>
  <div class="headerTitle_wrapper">
    <header class="title_nav">
      <router-link to="/" class="index_page" tag="span">主页</router-link>
      <span> / </span>
      <slot name="isShowLoginBox"></slot>
      <slot name="isShowGitHub"></slot>
      <slot name="newInfo"></slot>
      <slot name="setting"></slot>
      <slot name="sendTopic"></slot>
    </header>
  </div>
</template>
<script>
  export default {
    data () {
      return {}
    }
  }
</script>
<style scoped>
  @import './headerTitle.css';
</style>
