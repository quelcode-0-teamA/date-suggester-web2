<template>
  <div class="container">
    <h2>{{ error.StatusCode }}</h2>
    <h3 v-if="error.StatusCode === 404">
      ページが見つかりませんでした。
      <nuxt-link to="/">
        ホーム画面
      </nuxt-link>
      から再度お試しください。
    </h3>
    <h3 v-else>エラーが発生しました。</h3>
    <nuxt-link class="error-link" to="/">ホーム画面に戻る</nuxt-link>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss">
.error-link {
  text-decoration: underline;
}
</style>
