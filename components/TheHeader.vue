<template>
  <div class="header">
    <h1 class="header__title" @click="$router.push('/')">
      Date Suggester
    </h1>
    <div class="avatar">
      <nuxt-link class="nav-link" to="gallery">ギャラリー</nuxt-link>
      <nuxt-link class="nav-link" to="sign-in">サインイン</nuxt-link>
      <nuxt-link class="nav-link nav-signup" to="sign-up">新規登録</nuxt-link>
      <div class="header__sign-in dropdown" to="sign-in">
        <img src="@/assets/avatar.png" alt="あなたのアバターです" />
        <ul class="dropdown__content">
          <li>{{ user.name }}さん</li>
          <li @click="$router.push('edit')">登録情報の編集</li>
          <li @click="signOut">サインアウト</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// import BaseButton from '~/components/BaseButton.vue'
export default {
  components: {
    // BaseButton
  },
  data() {
    return {
      user: {
        id: null,
        avatar: null,
        name: '名もなき恋の達人'
      }
      // avatar: {
      //   type: String,
      //   default: require('@/assets/avatar.png')
      // }
    }
  },
  methods: {
    signOut() {
      this.$axios
        .$delete(`/v1/users/${this.user.id}`, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('dstoken')
          }
        })
        .then((response) => {
          console.log(response)
          this.$router.push('/')
        })
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
    display: inline-block;
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
.nav-signup {
  color: white;
  // border-bottom: 1px solid blue;
}
.dropdown {
  position: relative;
  text-align: center;
  &__content {
    // display: none;
    position: absolute;
    top: 44px;
    right: -32px;
    background-color: #eee;
    border-radius: 5px;
    min-width: 160px;
    box-shadow: 0 8px 16px 0 rgba($color: #000000, $alpha: 0.2);
    z-index: 1;
    list-style: none;
    padding-left: 0;
  }
  &__content > li {
    padding: 5px 10px;
  }
  &__content > li + li {
    border-top: 1px solid rgba($color: #707070, $alpha: 1);
  }
}
</style>
