<template>
  <div class="header">
    <h1 class="header__title" @click="$router.push('/')">
      Date Suggester
    </h1>
    <div v-if="login.dateToken" class="nav-links">
      <nav>
        <nuxt-link class="nav-link" to="questions">プランを探す</nuxt-link>
        <nuxt-link class="nav-link" to="gallery">保存したプラン</nuxt-link>
        <nuxt-link v-if="!loggedIn" class="nav-link" to="sign-in"
          >サインイン</nuxt-link
        >
        <nuxt-link v-if="!loggedIn" class="nav-link nav-signup" to="sign-up"
          >新規登録</nuxt-link
        >
      </nav>
      <div class="header__sign-in dropdown" to="sign-in">
        <img
          class="avatar"
          src="@/assets/avatar.png"
          alt="あなたのアバターです"
        />
        <ul class="dropdown__content">
          <li dropdown__name>
            {{ user.name }}
            <small>
              さん
            </small>
          </li>
          <li class="dropdown__edit" @click="$router.push('edit')">
            登録情報の編集
          </li>
          <li v-if="loggedIn" class="dropdown__signout" @click="signOut">
            サインアウト
          </li>
          <!-- <li @click="log"></li> -->
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
        avatar: null,
        name: '名もなき恋の達人'
      },
      login: {
        id: '',
        dateToken: '',
        email: 'null'
      }
      // avatar: {
      //   type: String,
      //   default: require('@/assets/avatar.png')
      // }
    }
  },
  computed: {
    loggedIn() {
      if (this.login.dateToken && this.login.email !== 'null') {
        return true
      } else {
        return false
      }
    }
  },
  mounted() {
    this.login.id = this.$cookies.get('dsid')
    this.login.dateToken = this.$cookies.get('dstoken')
    this.login.email = this.$cookies.get('email')
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
          console.log(response)
          this.$router.push('/')
        })
    },
    log() {
      console.log(this.login)
      console.log(this.login.dateToken !== '' && this.login.email !== 'null')
      console.log(typeof this.login.email)
      console.log('asdf' && 'asdga')
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
  display: flex;
  vertical-align: middle;
  align-items: center;
  justify-content: flex-end;
  position: relative;
}
.nav-link {
  color: white;
  font-size: 13px;
  display: inline-block;
  vertical-align: middle;
  height: 57px;
  line-height: 57px;
  padding: 0 8px 0;
  &:hover {
    background-color: rgba(white, 0.3);
  }
}
.nav-signup {
  color: white;
  // font-weight: bold;
  // border-bottom: 1px solid blue;
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
