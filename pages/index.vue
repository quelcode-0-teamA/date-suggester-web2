<template>
  <div class="container">
    <div class="top-page">
      <nuxt-link class="top-page__button" to="questions">
        <button class="button">早速デートプランを探す</button>
      </nuxt-link>
      <img
        class="top-page__image"
        src="../assets/topimage.png"
        alt="男性が女性を抱き抱えてるイメージです"
      />
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
  &__button {
    margin-top: 200px;
    display: block;
  }
  &__image {
    width: 1100px;
    max-width: 100%;
    display: block;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
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
