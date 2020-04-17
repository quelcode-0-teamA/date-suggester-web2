<template>
  <div class="signin">
    <div class="signin__form-side">
      <h2 class="signin__welcome">Welcome!</h2>
      <form class="signin__form">
        <input
          v-model="formal_user.email"
          class="signin__input"
          type="email"
          placeholder="mail"
          @blur="validateEmail"
        />
        <span v-if="emailError" class="error"
          ><small>
            有効なemailを入力してください
          </small>
        </span>
        <input
          v-model="formal_user.password"
          class="signin__input"
          type="password"
          placeholder="pass"
        />
        <input
          v-model="formal_user.password_confirmation"
          class="signin__input"
          type="password"
          placeholder="pass確認"
        />
        <base-button buttonclass="button-signin" @click.prevent="signUp"
          >sign up</base-button
        >
      </form>
      <nuxt-link class="url" to="sign-in">サインインはこちら</nuxt-link>
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
      formal_user: {
        email: '',
        password: '',
        password_confirmation: ''
      },
      emailError: false,
      errors: {
        email: '有効なパスワードではありません',
        password: []
      }
    }
  },
  methods: {
    validateEmail() {
      const mailFormat = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
      if (this.email === mailFormat) {
        this.emailError = false
      } else {
        this.emailError = true
      }
    },
    signUp() {
      this.$axios
        .$post(
          '/v1/formal_user/sign_up',
          {
            formal_user: this.formal_user
          },
          {
            headers: {
              Authorization: 'Bearer ' + this.$cookies.get('dstoken')
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
    // log() {
    //   console.log(this.$cookies.get('dstoken'))
    // }
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
.error {
  color: red;
}
</style>
