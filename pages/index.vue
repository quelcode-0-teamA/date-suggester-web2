<template>
  <div class="container">
    <div class="top-page">
      <nuxt-link class="top-page__button" to="questions">
        <button class="button">早速デートプランを探す</button>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
// import BaseButton from '@/components/BaseButton.vue'
export default {
  components: {
    // BaseButton
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  max-width: 100%;
  min-height: calc(100vh - 57px);
  display: flex;
  justify-content: center;
  text-align: center;
}
.top-page {
  width: 770px;
  text-align: center;
  background-image: url('../assets/topimage.svg');
  background-repeat: no-repeat;
  background-position: bottom;
  &__button {
    margin-top: 200px;
    display: inline-block;
  }
}
.-start {
  width: 308px;
  max-width: 100%;
  $height: 52px;
  height: $height;
  border-radius: $height / 2;
}
</style>
