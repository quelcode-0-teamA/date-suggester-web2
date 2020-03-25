<template>
  <div class="container">
    <div class="top-page">
      <nuxt-link class="top-page__button" to="questions">
        <base-button>早速デートプランを探す</base-button>
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
import BaseButton from '@/components/BaseButton.vue'
export default {
  components: {
    BaseButton
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
    width: 860px;
    max-width: 100%;
    display: block;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
