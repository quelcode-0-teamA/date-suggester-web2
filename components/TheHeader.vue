<template>
  <header class="header">
    <p v-if="!loggedIn" class="test">
      {{ reverse }}
      <input v-model="text" />
    </p>
    <h1 class="header__title" @click="$router.push('/')">
      Date Suggester
    </h1>
    <div v-if="!$store.state.login.dateToken" class="nav-links">
      <ul>
        <li>
          <nuxt-link class="nav-link" to="/questions">プランを探す</nuxt-link>
        </li>
        <li>
          <nuxt-link class="nav-link" to="/gallery">保存したプラン</nuxt-link>
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
        <li>
          <nuxt-link class="nav-link" to="/edit">登録情報の編集</nuxt-link>
        </li>
      </ul>
      <div class="header__sign-in dropdown" to="sign-in">
        <img
          class="avatar"
          src="@/assets/avatar.png"
          alt="あなたのアバターです"
        />
        <ul class="dropdown__content">
          <li v-if="user.name" dropdown__name>
            {{ user.name }}
            <small>
              さん
            </small>
          </li>
          <li v-else dropdown__name>
            名もなき恋の達人
            <small>さんの</small>
          </li>
          <li class="dropdown__edit" @click="$router.push('/edit')">
            登録情報の編集
          </li>
          <li v-if="loggedIn" class="dropdown__signout" @click="signOut">
            サインアウト
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  components: {},
  // asyncData({ $axios, app }) {
  //   const id = app.$cookies.get('dsid')
  //   const dateToken = app.$cookies.get('dstoken')
  //   const email = app.$cookies.get('email')
  //   return {
  //     login: {
  //       id,
  //       dateToken,
  //       email
  //     }
  //   }
  // if (id) {
  //   $axios
  //     .$get(`/v1/users/${id}`, {
  //       headers: {
  //         Authorization: 'Bearer ' + dateToken
  //       }
  //     })
  //     .then((response) => {
  //       return {
  //         login: {
  //           id,
  //           dateToken,
  //           email
  //         }
  //       }
  //     })
  // }
  // },
  data() {
    return {
      user: {
        avatar: null,
        name: '名もなき恋の達人'
      },
      login: {
        id: '',
        dateToken: '',
        email: 'null'
      },
      text: ''
    }
  },
  computed: {
    loggedIn() {
      if (
        this.$store.state.login.dateToken &&
        this.$store.state.login.email !== 'null'
      ) {
        return true
      } else {
        return false
      }
    },
    windowWidth() {
      return document.body.clientWidth
    },
    reverse() {
      return this.text
        .split('')
        .reverse()
        .join('')
    },
    loginState() {
      return this.$store.getters.loginState
    }
  },
  watch: {
    loginState: {
      immediate: false,
      deep: true,
      handler() {
        this.$router.go({ path: this.$router.currentRoute.path, force: true })
      }
    }
  },
  mount() {
    // 引数の渡し方合っているか？
    const login = {
      id: this.$cookies.get('dsid'),
      dateToken: this.$cookies.get('dstoken'),
      email: this.$cookies.get('email')
    }
    this.UPDATE_LOGIN_ID(login)
    // this.login.id = this.$cookies.get('dsid')
    // this.login.dateToken = this.$cookies.get('dstoken')
    // this.login.email = this.$cookies.get('email')
    // if (this.login.id) {
    //   this.$axios
    //     .$get(`/v1/users/${this.login.id}`, {
    //       headers: {
    //         Authorization: 'Bearer ' + this.login.dateToken
    //       }
    //     })
    //     .then((response) => {
    //       this.user.name = response.name
    //     })
    // }
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
    ...mapMutations(['UPDATE_LOGIN'])
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
.test {
  grid-template-columns: 1 / 2;
}
.nav-links {
  vertical-align: middle;
  align-items: center;
  justify-content: flex-end;
  position: relative;
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
.dropdown {
  height: 57px;
  margin: 0 16px 0 8px;
  text-align: center;
  vertical-align: middle;
  display: flex;
  cursor: pointer;
  &__content {
    display: none;
    position: absolute;
    top: 57px;
    right: 0px;
    background-color: #eee;
    // border-radius: 5px;
    min-width: 160px;
    box-shadow: 0 8px 16px 0 rgba($color: #000000, $alpha: 0.2);
    z-index: 1;
    list-style: none;
    padding-left: 0;
  }
  &:hover &__content {
    display: block;
  }
  &__content:hover {
    display: block;
  }
  &__content > li {
    padding: 5px 10px;
  }
  &__content > li:hover {
    background-color: rgba($color: white, $alpha: 0.67);
  }
  &__content > li + li {
    border-top: 1px solid rgba($color: #707070, $alpha: 1);
    cursor: pointer;
  }
  &__name {
    font-size: 14px;
  }
  &__edit {
    font-size: 13px;
  }
  &__signout {
    font-size: 11px;
    color: #de436a;
  }
}
.avatar {
  display: inline-block;
  align-self: center;
}
</style>
