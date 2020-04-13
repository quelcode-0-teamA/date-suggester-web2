<template>
  <div class="header">
    <h1 class="header__title" @click="$router.push('/')">
      Date Suggester
    </h1>
    <div class="avatar">
      <nuxt-link class="nav-link" to="sign-in">サインイン</nuxt-link>
      <nuxt-link class="nav-link" to="sign-up">新規登録</nuxt-link>
      <nuxt-link class="header__sign-in" to="sign-in">
        <img src="@/assets/avatar.png" alt="あなたのアバターです" />
      </nuxt-link>
    </div>
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
  cursor: pointer;
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
  margin: 12px 32px auto;
  text-align: right;
}
.nav-link {
  color: white;
  font-size: 13px;
  display: inline-block;
  vertical-align: middle;
  height: 57px;
  line-height: 42px;
  margin-right: 8px;
}
</style>
