<template>
  <div class="container">
    <div class="signup-block">
      <h2>あなたの名前は？</h2>
      <form>
        <input type="text" />
      </form>
    </div>
    <base-button @click="updateAnswers">next</base-button>
  </div>
</template>

<script>
import BaseButton from '~/components/BaseButton.vue'
export default {
  components: {
    BaseButton
  }
}
</script>

<style lang="scss">
.container {
  height: calc(100vh - 57px);
}
.signup-block {
  height: 392px;
  padding: 50px;
}
</style>
