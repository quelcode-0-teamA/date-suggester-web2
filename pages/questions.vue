<template>
  <div class="container">
    <transition name="slide-fade-fast" mode="out-in">
      <template v-for="(icon, index) in icons">
        <div v-if="step === index" :key="index">
          <img class="questions__icon" :src="icon.src" :alt="icon.alt" />
          <h2 class="questions__ask">{{ icon.ask }}</h2>
          <form v-if="index === 0" class="questions__form">
            <select
              v-model="selectedYear"
              class="year-select"
              name="birth-year"
            >
              <option v-for="year in getYears" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
            <base-button buttonclass="button-step" @click.prevent="step += 1"
              >次へ</base-button
            >
          </form>
          <form v-else-if="index === 1" class="questions__form">
            <select v-model="selectedArea" class="year-select" name="areas">
              <option v-for="area in areas" :key="area.id" :value="area">
                {{ area.name }}
              </option>
            </select>
            <base-button buttonclass="button-step" @click.prevent="setToken"
              >次へ</base-button
            >
          </form>
        </div>
      </template>
    </transition>
    <!-- <p>{{ selectedYear }}</p>
    <p>{{ selectedArea.id }}</p> -->
    <div class="progress">
      <div class="progress__inner">
        <div class="progress__inner-0"></div>
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'
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
      step: 0,
      selectedYear: null,
      selectedArea: {},
      icons: [
        {
          src: require('@/assets/cake.png'),
          alt: '誕生日ケーキのアイコンです',
          ask: 'あなたの生まれた年は？'
        },
        {
          src: require('@/assets/drive.png'),
          alt: 'ドライブのアイコンです',
          ask: 'よく行く場所は？'
        }
      ]
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
    setToken() {
      this.$axios
        .$post('/v1/temp_user/sign_up', {
          temp_user: {
            birth_year: this.selectedYear,
            area_id: this.selectedArea.id
          }
        })
        .then((response) => {
          console.log(response)
          this.$cookies.set('dstoken', response.token, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
          })
          this.$cookeis.set('email', response.email, {
            path: '/',
            maxAge: 60 * 60 * 24 * 7
          })
          this.$router.push('questions2')
        })
    }
  },
  middleware({ app }) {
    const dateToken = app.$cookies.get('dstoken')
    if (dateToken) {
      return app.context.redirect('/questions2')
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: #fafafa;
  width: 715px;
  margin: 0 auto;
  padding: 50px 110px 57px;
  max-width: 100%;
  min-height: calc(100vh - 57px);
  // display: flex;
  // justify-content: center;
  // align-items: center;
  text-align: center;
  position: relative;
}
.questions {
  &__icon {
    margin-bottom: 29px;
  }
  &__ask {
    color: #fe5492;
  }
  &__form {
    width: 272px;
    padding: 80px 0 84px;
    margin: 0 auto;
  }
}
.year-select {
  &::-ms-expand {
    display: none;
  }
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  width: 100%;
  height: 40px;
  background-color: white;
  border-radius: 5px;
  border-color: #707070;
  font-size: 100%;
  padding: 0 10px;
  margin-bottom: 64px;
  // position: relative;
  // &::before {
  //   content: '';
  //   position: absolute;
  //   top: 50%;
  //   right: 10px;
  //   display: block;
  //   width: 0;
  //   height: 0;
  //   margin: -2px 0 0 0;
  //   border: 5px solid transparent;
  //   border-top: 7px solid #f69;
  // }
}

.progress {
  width: 480px;
  height: 12px;
  padding: 2px;
  // margin-top: 10px;
  border-radius: 6px;
  background-color: #e5e5e5;
  display: flex;
  position: absolute;
  bottom: 60px;
  &__inner {
    height: 8px;
    border-radius: 4px;
    background-color: #ff5d89;
    &-0 {
      width: 62px;
    }
    &-1 {
      width: 171px;
    }
    &-2 {
      width: 246px;
    }
    &-3 {
      width: 476px;
    }
  }
}
.bar-enter {
  width: 62px;
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
