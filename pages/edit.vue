<template>
  <div class="container">
    <popup v-if="showModal" @toggle-modal="showModal = false">
      <template>
        <h4 class="popup-text">
          本当にアカウントを削除しますか？
        </h4>
        <div class="popup-buttons">
          <base-button
            buttonclass="button-popup-back"
            @click.prevent="toggleModal"
            >削除しない</base-button
          >
          <base-button
            buttonclass="button-popup-delete"
            @click.prevent="userDelete"
            >削除する</base-button
          >
        </div>
      </template>
    </popup>
    <transition name="slide-fade" mode="out-in">
      <div v-if="step === 1" class="edit">
        <h2 class="edit__text">あなたの名前は？</h2>
        <form>
          <input
            v-model="user.name"
            class="name-input edit__input"
            type="text"
            autofocus
            @blur="$v.user.name.$touch()"
          />
          <div v-if="$v.user.name.$error" class="error">
            <span v-if="!$v.user.name.required" class="error-text">
              名前が入力されていません。
            </span>
            <span v-if="!$v.user.name.maxLength" class="error-text">
              名前は8文字以内にしてください。
            </span>
          </div>
          <base-button
            v-if="step < 4"
            buttonclass="button-edit"
            :disabled="$v.user.name.$invalid"
            @click.prevent="updateAnswers"
            >next</base-button
          >
        </form>
      </div>
      <div v-else-if="step === 2" class="edit">
        <h2 class="edit__text">あなたのメールアドレスは？</h2>
        <form>
          <input
            v-model="user.email"
            class="name-input edit__input"
            type="email"
          />
          <div v-if="$v.user.email.$error" class="error">
            <span v-if="!$v.user.email.required" class="error-text">
              メールアドレスが入力されていません。
            </span>
            <span v-if="!$v.user.email.maxLength" class="error-text">
              メールアドレスは255文字以内にしてください。
            </span>
            <span v-if="!$v.user.email.email" class="error-text">
              有効なメールアドレスを入力してください。
            </span>
          </div>
          <base-button
            v-if="step < 4"
            buttonclass="button-edit"
            :disabled="$v.user.email.$invalid"
            @click.prevent="updateAnswers"
            >next</base-button
          >
        </form>
      </div>
      <div v-else-if="step === 3" class="edit">
        <h2 class="edit__text">あなたの生まれた年は？</h2>
        <div class="select-wrapper">
          <font-awesome-icon
            class="sort-icon"
            icon="sort-down"
          ></font-awesome-icon>
          <form class="edit__input">
            <select
              v-model="user.birth_year"
              class="year-select"
              name="birth-year"
            >
              <option v-for="year in getYears" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
            <base-button
              v-if="step < 4"
              buttonclass="button-edit"
              :disabled="!user.birth_year"
              @click.prevent="updateAnswers"
              >next</base-button
            >
          </form>
        </div>
      </div>
      <div v-else class="edit">
        <h2 class="edit__text">よく行く場所はどこですか？</h2>
        <div class="select-wrapper">
          <font-awesome-icon
            class="sort-icon"
            icon="sort-down"
          ></font-awesome-icon>
          <form class="edit__input">
            <select v-model="selectedArea" class="year-select" name="areas">
              <option v-for="area in areas" :key="area.id" :value="area">
                {{ area.name }}
              </option>
            </select>
            <base-button
              v-if="step === 4"
              buttonclass="button-edit"
              :disabled="!selectedArea"
              @click.prevent="updateAnswers"
              >決定</base-button
            >
          </form>
        </div>
      </div>
    </transition>
    <p class="user-delete" @click="toggleModal">
      アカウント削除はこちらをクリック
    </p>
  </div>
</template>

<script>
import { email, required, maxLength } from 'vuelidate/lib/validators'
import BaseButton from '~/components/BaseButton.vue'
import Popup from '~/components/Popup.vue'
export default {
  components: {
    BaseButton,
    Popup
  },
  validations: {
    user: {
      name: {
        required,
        maxLength: maxLength(8)
      },
      email: {
        required,
        maxLength: maxLength(255),
        email
      }
    }
  },
  asyncData({ $axios }) {
    return $axios.$get('/v1/areas').then((response) => {
      return { areas: response }
    })
  },
  data() {
    return {
      selectedArea: '', // 文字列避けたい
      user: {
        name: '',
        email: 'null',
        birth_year: 1994,
        gender: 'male',
        area_id: 1
      },
      step: 1,
      showModal: false
    }
  },
  computed: {
    getYears() {
      const years = []
      for (let i = 2002; i > 1959; i--) {
        years.push(i)
      }
      return years
    }
  },
  mounted() {
    this.user.email = this.$cookies.get('email')
  },
  methods: {
    updateAnswers() {
      this.user.area_id = this.selectedArea.id
      if (this.step === 4) {
        this.$axios
          .$put(
            `/v1/users/${this.$cookies.get('dsid')}`,
            {
              user: this.user
            },
            {
              headers: {
                Authorization: 'Bearer ' + this.$cookies.get('dstoken')
              }
            }
          )
          .then((response) => {
            this.$router.push('gallery')
          })
      } else if (this.step === 1 && this.user.email === 'null') {
        this.step += 2
      } else {
        this.step++
      }
    },
    userDelete() {
      this.$axios
        .delete(`/v1/users/${this.login.id}`, {
          headers: {
            Authorization: 'Bearer ' + this.$cookies.get('dstoken')
          }
        })
        .then((response) => {
          this.$cookies.removeAll()
          localStorage.removeItem('confirmed')
          window.alert('アカウントを削除しました。')
          this.$router.push('/')
        })
    },
    toggleModal() {
      this.showModal = !this.showModal
    }
  }
}
</script>

<style lang="scss">
.container {
  height: calc(100vh - 57px);
  text-align: center;
}
.edit {
  height: 392px;
  padding: 50px;
  &__text {
    color: white;
    font-family: 'Noto sans';
    font-size: 24px;
    margin-top: 94px;
  }
  &__input {
    margin-top: 48px;
  }
}
.name-input {
  width: 272px;
  height: 40px;
  border: none;
  border-radius: 5px;
  padding: 0 10px;
  font-size: 100%;
}
.year-select {
  &::-ms-expand {
    display: none;
  }
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 272px;
  height: 40px;
  background-color: white;
  border-radius: 5px;
  font-size: 100%;
  padding: 0 10px;
}
.slide-fade-fast-enter {
  opacity: 0;
  transform: translateX(10px);
}
.slide-fade-fast-enter-active,
.slide-fade-fast-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-fast-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
.error {
  text-align: center;
  width: 272px;
  margin: 0 auto;
  text-align: left;
}
.error-text {
  color: white;
  font-size: 10px;
  // text-align: left;
}
.user-delete {
  position: absolute;
  cursor: pointer;
  padding: 15px;
  right: 32px;
  bottom: 32px;
  text-decoration: underline;
}
.popup-text {
  text-align: center;
  color: #5d5d5d;
  font-size: 15px;
  width: 548px;
  margin-bottom: 32px;
}
.popup-buttons {
  display: flex;
  justify-content: space-around;
}
.select-wrapper {
  position: relative;
  & > .sort-icon {
    position: absolute;
    top: 10px;
    left: calc(50% + 110px);
    pointer-events: none;
  }
}
</style>
