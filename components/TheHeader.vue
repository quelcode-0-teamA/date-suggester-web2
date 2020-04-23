<template>
  <header class="header">
    <h1 class="header__title" @click="$router.push('/')">
      Date Suggester
    </h1>
    <div v-if="$store.state.login.dateToken && !vw" class="nav-links">
      <ul>
        <li>
          <nuxt-link class="nav-link" to="/questions">プランを探す</nuxt-link>
        </li>
        <li>
          <nuxt-link class="nav-link" to="/gallery">保存したプラン</nuxt-link>
        </li>
        <li>
          <nuxt-link class="nav-link" to="/edit">登録情報の編集</nuxt-link>
        </li>
        <li>
          <nuxt-link v-if="!loggedIn" class="nav-link" to="/sign-in"
            >サインイン</nuxt-link
          >
        </li>
        <li>
          <nuxt-link v-if="!loggedIn" class="nav-link" to="/sign-up"
            >新規登録</nuxt-link
          >
        </li>
      </ul>
    </div>
    <div v-if="$store.state.login.dateToken && vw" class="menu-dropdown">
      <div class="menu-dropdown__icon">
        <font-awesome-icon icon="bars"></font-awesome-icon>
      </div>
      <ul id="show" class="menu-dropdown__items">
        <li class="menu-dropdown__item">
          <span class="" @click="$router.push('/questions')">プランを探す</span>
        </li>
        <li class="menu-dropdown__item">
          <span class="" @click="$router.push('/gallery')">保存したプラン</span>
        </li>
        <li class="menu-dropdown__item">
          <span class="" @click="$router.push('/edit')">登録情報の編集</span>
        </li>
        <li class="menu-dropdown__item">
          <span v-if="!loggedIn" class="" @click="$router.push('/sign-in')"
            >サインイン</span
          >
        </li>
        <li class="menu-dropdown__item">
          <span v-if="!loggedIn" class="" @click="$router.push('/sign-up')"
            >新規登録</span
          >
        </li>
        <li
          v-if="loggedIn"
          class="menu-dropdown__item menu-dropdown__signout"
          @click="signOut"
        >
          <span>サインアウト</span>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      windowWidth: window.innerWidth
    }
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn
    },
    vw() {
      if (this.windowWidth < 990) {
        return true
      } else {
        return false
      }
    }
  },
  created() {
    this.UPDATE_LOGIN({
      id: this.$cookies.get('dsid'),
      dateToken: this.$cookies.get('dstoken'),
      email: this.$cookies.get('email')
    })
  },
  mounted() {
    window.addEventListener('resize', this.calculateWindowWidth)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.calculateWindowWidth)
  },
  methods: {
    signOut() {
      this.$axios
        .delete(`/v1/users/${this.login.id}`, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('dstoken')
          }
        })
        .then((response) => {
          this.login.email = 'null'
          this.$router.push('/')
        })
    },
    calculateWindowWidth() {
      this.windowWidth = window.innerWidth
    },
    ...mapMutations(['UPDATE_LOGIN']),
    addShow() {
      document.getElementById('show').classList.add('show')
    }
  }
}
</script>

<style lang="scss">
.header {
  background-color: #de436a;
  height: 57px;
  display: grid;
  grid-template-columns: 1fr 190px 1fr;
  &__title {
    cursor: pointer;
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
.nav-links {
  vertical-align: middle;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  margin-left: auto;
  ul {
    display: flex;
    padding: 0;
    margin: 0;
    list-style: none;
  }
}
.nav-link {
  color: white;
  font-size: 11px;
  display: inline-block;
  vertical-align: middle;
  height: 57px;
  line-height: 57px;
  padding: 0 8px 0;
  &:hover {
    background-color: rgba(white, 0.3);
  }
}
.menu-dropdown {
  // grid-template-columns: 3 / 4;
  position: relative;
  display: flex;
  &__icon {
    height: 100%;
    line-height: 57px;
    display: block;
    color: white;
    font-size: 20px;
    padding: 0 16px;
    margin-left: auto;
    cursor: pointer;
    z-index: 1;
  }
  &__items {
    display: none;
    background-color: #eee;
    position: absolute;
    top: 57px;
    right: 0;
    list-style: none;
    padding: 0;
    box-shadow: 0 8px 16px 0 rgba($color: #000000, $alpha: 0.2);
  }
  &__icon:hover + &__items {
    display: block;
  }
  &__items .show {
    display: block;
    animation: show 1s linear 0s;
  }
  &__item {
    padding: 5px 16px;
    font-size: 14px;
  }
  &__item:hover {
    background-color: rgba($color: white, $alpha: 0.67);
  }
  &__items li + li {
    border-top: 1px solid rgba($color: #707070, $alpha: 1);
    cursor: pointer;
  }
  &__signout {
    color: #de436a;
  }
}
@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
