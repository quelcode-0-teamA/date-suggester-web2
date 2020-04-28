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
          @blur="$v.formal_user.email.$touch()"
        />
        <div v-if="$v.formal_user.email.$error" class="error">
          <span v-if="!$v.formal_user.email.email" class="error-text">
            メールアドレスの形式が正しくありません。
          </span>
          <span v-if="!$v.formal_user.email.required" class="error-text">
            メールアドレスが入力されていません。
          </span>
          <span v-if="!$v.formal_user.email.maxLength" class="error-text">
            メールアドレスは255文字以内にしてください。
          </span>
        </div>
        <input
          v-model="formal_user.password"
          class="signin__input"
          type="password"
          placeholder="pass"
          @blur="$v.formal_user.password.$touch()"
        />
        <div v-if="$v.formal_user.password.$error" class="error">
          <span v-if="!$v.formal_user.password.required" class="error-text">
            パスワードが入力されていません。
          </span>
          <span v-if="!$v.formal_user.password.minLength" class="error-text">
            パスワードは8文字以上にしてください。
          </span>
          <span v-if="!$v.formal_user.password.alphaNum" class="error-text">
            パスワードは英数字で入力してください。
          </span>
        </div>
        <input
          v-model="formal_user.password_confirmation"
          class="signin__input"
          type="password"
          placeholder="pass確認"
          @input="$v.formal_user.password_confirmation.$touch()"
        />
        <div v-if="$v.formal_user.password_confirmation.$error" class="error">
          <span
            v-if="!$v.formal_user.password_confirmation.sameAsPassword"
            class="error-text"
          >
            パスワードが一致していません。
          </span>
        </div>
        <base-button
          :disabled="$v.$invalid"
          buttonclass="button-signin"
          @click.prevent="signUp"
          >sign up</base-button
        >
      </form>
      <nuxt-link class="url" to="/sign-in">サインインはこちら</nuxt-link>
      <p class="to-agreement">
        アプリを一度使用することで新規登録が可能になります。
      </p>
      <p class="to-agreement">
        <span @click="$router.push('/privacy-policy')"
          >プライバシーポリシー</span
        >を確認した上でご登録ください。
      </p>
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
  sameAs,
  minLength,
  alphaNum
} from 'vuelidate/lib/validators'
import BaseButton from '~/components/BaseButton.vue'
export default {
  components: {
    BaseButton
  },
  validations: {
    formal_user: {
      email: {
        required,
        maxLength: maxLength(255),
        email
      },
      password: {
        required,
        alphaNum,
        minLength: minLength(8)
      },
      password_confirmation: {
        required,
        alphaNum,
        sameAsPassword: sameAs(function() {
          return this.formal_user.password
        })
      }
    }
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
  methods: {},
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
        // id, token を別の値にして保存した方が良いか？
        this.$cookies.set('dsid', response.id, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        })
        this.$cookies.set('dstoken', response.token, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        })
        this.$cookies.set('email', response.email, {
          path: '/',
          maxAge: 60 * 60 * 24 * 7
        })
        this.$router.push('/gallery')
      })
      .catch(() => {
        window.alert('一度アプリをお試ししてから新規登録をしてください。')
      })
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
.to-agreement {
  font-size: 13px;
  margin-top: 15px;
  span {
    color: #de436a;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>
