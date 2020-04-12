<template>
  <div>
    <the-header></the-header>
    <transition name="slide-fade" mode="out-in">
      <nuxt />
    </transition>
  </div>
</template>
<script>
import TheHeader from '@/components/TheHeader.vue'
export default {
  components: {
    TheHeader
  },
  data() {
    return {}
  },
  asyncData() {}
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

.slide-fade-enter {
  opacity: 0;
  transform: translateX(10px);
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
