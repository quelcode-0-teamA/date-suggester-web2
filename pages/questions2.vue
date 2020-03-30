<template>
  <div class="container">
    <transition name="slide-fade-fast" mode="out-in">
      <template v-for="(icon, index) in icons">
        <div v-if="step === index" :key="index">
          <img class="questions__icon" :src="icon.src" :alt="icon.alt" />
          <h2 class="questions__ask">{{ icon.ask }}</h2>
          <form v-if="index === 0" class="questions__form">
            <base-button buttonclass="button-option" @click.prevent="step += 1"
              >ちかく</base-button
            >
            <base-button buttonclass="button-option" @click.prevent="step += 1"
              >とおく</base-button
            >
          </form>
          <form v-else-if="index === 1" class="questions__form">
            <base-button buttonclass="button-option" @click.prevent="step += 1"
              >せつやく</base-button
            >
            <base-button buttonclass="button-option" @click.prevent="step += 1"
              >ふつう</base-button
            >
            <base-button buttonclass="button-option" @click.prevent="step += 1"
              >ちょいリッチ</base-button
            >
          </form>
          <form v-else-if="index === 2" class="questions__form">
            <base-button buttonclass="button-option" @click.prevent="step += 1"
              >いちにち</base-button
            >
            <base-button buttonclass="button-option" @click.prevent="step += 1"
              >おひる</base-button
            >
            <base-button buttonclass="button-option" @click.prevent="step += 1"
              >よる</base-button
            >
          </form>
          <form v-else-if="index === 3" class="questions__form">
            <base-button buttonclass="button-option" @click.prevent=""
              >ごはん</base-button
            >
            <base-button buttonclass="button-option" @click.prevent=""
              >動きたい</base-button
            >
            <base-button buttonclass="button-option" @click.prevent=""
              >まったり</base-button
            >
          </form>
        </div>
      </template>
    </transition>
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
  data() {
    return {
      step: 0,
      icons: [
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
  computed: {}
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
