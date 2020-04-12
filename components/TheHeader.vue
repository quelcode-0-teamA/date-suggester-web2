<template>
  <div class="header">
    <h1 class="header__title">
      Date Suggester
    </h1>
    <nuxt-link class="header__sign-in" to="sign-in">
      <div class="avatar">
        <img src="@/assets/avatar.png" alt="あなたのアバターです" />
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // avatar: {
      //   type: String,
      //   default: require('@/assets/avatar.png')
      // }
    }
  }
}
</script>

<style lang="scss">
.header {
  background-color: #de436a;
  height: 57px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  &__title {
    grid-column: 2 / 3;
    text-align: center;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
      sans-serif;
    font-size: 23px;
    color: white;
    line-height: 57px;
    font-weight: 400;
    font-style: italic;
  }
  &__sign-in {
    grid-column: 3 / 4;
  }
}
.avatar {
  margin: 16px 32px auto;
  text-align: right;
}
</style>
