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
          @blur="$v.user.email.$touch()"
        />
        <div v-if="$v.user.email.$error" class="error">
          <span v-if="!v$.user.email.email" class="error-text"
            >メールアドレスの形式が正しくありません。
          </span>
          <span v-if="!v$.user.email.required" class="error-text"
            >メールアドレスが入力されていません。
          </span>
          <span v-if="!v$.user.email.maxLength" class="error-text"
            >メールアドレスは255字以内です。
          </span>
        </div>
        <input
          v-model="user.password"
          class="signin__input"
          type="password"
          placeholder="pass"
          @blur="$v.user.password.touch()"
        />
        <div v-if="$v.user.password.$error" class="error">
          <span v-if="!$v.user.password.required" class="error-text">
            パスワードが入力されていません。
          </span>
          <span v-if="!$v.user.password.alphaNum" class="error-text">
            パスワードは英数字で入力してください。
          </span>
          <span v-if="!$v.user.password.minLength" class="error-text">
            パスワードは8字以上にしてください。
          </span>
        </div>
        <base-button
          :disabled="$v.$invalid"
          buttonclass="button-signin"
          @click.prevent="signIn"
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
import {
  required,
  email,
  maxLength,
  minLength,
  alphaNum
} from 'vuelidate/lib/validators'
import BaseButton from '~/components/BaseButton.vue'
export default {
  validations: {
    user: {
      email: {
        required,
        email,
        maxLength: maxLength(255)
      },
      password: {
        required,
        alphaNum,
        minLength: minLength(8)
      }
    }
  },
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
.error {
  text-align: left;
  padding-left: 5px;
}
.error-text {
  color: red;
  font-size: 10px;
  // text-align: left;
}
.error-input {
  color: #8a0421;
  border-color: #dd0f3b;
  background-color: #ffd9d9;
}
</style>
