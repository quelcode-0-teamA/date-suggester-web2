<template>
  <div class="signin">
    <div class="signin__form-side">
      <h2 class="signin__welcome">Welcome Back!</h2>
      <form class="signin__form">
        <input
          v-model="user.email"
          class="signin__input"
          type="email"
          placeholder="mail"
        />
        <input
          v-model="user.password"
          class="signin__input"
          type="password"
          placeholder="pass"
        />
        <base-button buttonclass="button-signin" @click="signIn"
          >sign in</base-button
        >
      </form>
      <nuxt-link class="url" to="sign-up">新規登録はこちら</nuxt-link>
    </div>
    <div class="signin__img-box">
      <img
        class="signin__img"
        src="@/assets/topimage.png"
        alt="男性が女性を抱き抱えてるイメージです"
      />
    </div>
  </div>
</template>

<script>
import BaseButton from '~/components/BaseButton.vue'
export default {
  components: {
    BaseButton
  },
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    signIn() {
      this.$axios
        .$post(
          '/v1/sign_in',
          {
            user: {
              email: this.user.email,
              password: this.user.password
            }
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        .then((response) => {
          console.log(response)
          this.$cookies.set('email', response.email, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
          })
          this.$router.push('gallery')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.signin {
  display: flex;
  text-align: center;
  &__form-side {
    width: 40%;
    padding: 16px;
    background-color: #fff;
    height: calc(100vh - 57px);
  }
  &__welcome {
    text-align: center;
    margin-top: 138px;
    font-family: 'Noto Sans';
    font-size: 34px;
    font-weight: normal;
  }
  &__form {
    width: 248px;
    margin: 104px auto 24px;
  }
  &__input {
    width: 100%;
    padding: 5px;
    display: block;
    border: none;
    border-bottom: 1px solid #adadad;
    font-size: 100%;
    margin-top: 24px;
    &::placeholder {
      font-family: 'Noto sans';
      font-size: 21px;
      opacity: 0.2;
    }
  }
  &__img-box {
    width: 100%;
    position: relative;
    height: calc(100vh - 57px);
  }
  &__img {
    max-width: 100%;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
.url {
  color: #de436a;
}
</style>
