<template>
  <div class="container">
    <transition name="slide-fade-fast" mode="out-in">
      <template v-for="(icon, index) in icons">
        <div v-if="step === index" :key="index">
          <img class="questions__icon" :src="icon.src" :alt="icon.alt" />
          <h2 class="questions__ask">{{ icon.ask }}</h2>
          <form v-if="index === 0" class="questions__form">
            <select id="birth-year" class="year-select" name="birth-year">
              <font-awesome-icon icon="sort-down"></font-awesome-icon>
              <option v-for="year in getYears" :key="year" value="year">
                {{ year }}
              </option>
            </select>
          </form>
        </div>
      </template>
    </transition>
    <button @click="step += 1">ここだお</button>

    <!-- <select id="areas" name="areas">
      <option v-for="area in areas" :key="area.id" value="area">
        {{ area.name }}
      </option>
    </select> -->
  </div>
</template>

<script>
export default {
  asyncData({ $axios }) {
    return $axios.$get('areas').then((response) => {
      return { areas: response }
    })
  },
  data() {
    return {
      step: 0,
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
        },
        {
          src: require('@/assets/location.png'),
          alt: '代表的な観光地のアイコンです',
          ask: 'どこでデートする？'
        },
        {
          src: require('@/assets/money.png'),
          alt: 'お金のアイコンです',
          ask: '予算はどのくらい？'
        },
        {
          src: require('@/assets/time.png'),
          alt: '時計のアイコンです',
          ask: 'デートの時間帯は？'
        },
        {
          src: require('@/assets/feeling.png'),
          alt: 'ハートのアイコンです',
          ask: 'どんなデートの気分？'
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
  width: 100%;
  height: 40px;
  background-color: white;
  border-radius: 5px;
  border-color: #707070;
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
