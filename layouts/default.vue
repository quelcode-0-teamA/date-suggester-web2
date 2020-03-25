<template>
  <div>
    <the-header></the-header>
    <nuxt />
  </div>
</template>
<script>
import TheHeader from '@/components/TheHeader.vue'
export default {
  components: {
    TheHeader
  },
  data() {}
}
</script>
<style>
html {
  font-family: 'Hiragino Kaku Gothic Pro';
  font-size: 16px;
  word-spacing: 1px;
  box-sizing: border-box;
}

body {
  background: linear-gradient(to bottom, #ff5f85, #ff8355);
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

a {
  text-decoration: none;
}
</style>
