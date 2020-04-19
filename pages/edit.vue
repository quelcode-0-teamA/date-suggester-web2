<template>
  <div class="container">
    <transition name="slide-fade" mode="out-in">
      <div v-if="step === 1" class="edit">
        <h2 class="edit__text">あなたの名前は？</h2>
        <form>
          <input
            v-model="user.name"
            class="name-input edit__input"
            type="text"
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
        <form class="edit__input">
          <select
            v-model="user.birth_year"
            class="year-select"
            name="birth-year"
          >
            <font-awesome-icon icon="sort-down"></font-awesome-icon>
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
      <div v-else class="edit">
        <h2 class="edit__text">よく行く場所はどこですか？</h2>
        <form class="edit__input">
          <select v-model="user.area_id" class="year-select" name="areas">
            <option v-for="area in areas" :key="area.id" :value="area">
              {{ area.name }}
            </option>
          </select>
          <base-button
            v-if="step === 4"
            buttonclass="button-edit"
            :disabled="user.area_id"
            @click.prevent="updateAnswers"
            >決定</base-button
          >
        </form>
      </div>
    </transition>

    <!-- <base-button
      v-if="step < 4"
      buttonclass="button-edit"
      :disabled="disabled"
      @click="updateAnswers"
      >next</base-button
    > -->
    <!-- <base-button v-else buttonclass="button-edit" @click="updateAnswers"
      >決定</base-button
    > -->
  </div>
</template>

<script>
import { email, required, maxLength } from 'vuelidate/lib/validators'
import BaseButton from '~/components/BaseButton.vue'
export default {
  components: {
    BaseButton
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
      user: {
        name: '',
        email: 'null',
        birth_year: null,
        gender: 'male',
        area_id: null
      },
      step: 1
    }
  },
  computed: {
    getYears() {
      const years = []
      for (let i = 2000; i > 1959; i--) {
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
</style>
