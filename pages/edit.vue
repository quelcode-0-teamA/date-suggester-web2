<template>
  <div class="container">
    <div v-if="step === 1" class="edit">
      <h2 class="edit__text">あなたの名前は？</h2>
      <form>
        <input v-model="user.name" class="name-input edit__input" type="text" />
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
      </form>
    </div>
    <div v-else-if="step === 3" class="edit">
      <h2 class="edit__text">あなたの生まれた年は？</h2>
      <form class="edit__input">
        <select v-model="user.birth_year" class="year-select" name="birth-year">
          <font-awesome-icon icon="sort-down"></font-awesome-icon>
          <option v-for="year in getYears" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
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
      </form>
    </div>

    <base-button
      v-if="step < 4"
      buttonclass="button-edit"
      @click="updateAnswers"
      >next</base-button
    >
    <base-button v-else buttonclass="button-edit" @click="updateAnswers"
      >決定</base-button
    >
  </div>
</template>

<script>
import BaseButton from '~/components/BaseButton.vue'
export default {
  components: {
    BaseButton
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
        email: '',
        birth_year: 2000,
        gender: 'male',
        area_id: 1
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
            console.log(response)
          })
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
  margin-bottom: 64px;
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
</style>
