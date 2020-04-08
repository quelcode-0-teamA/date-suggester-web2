<template>
  <div>
    <div class="headline-container">
      <div class="headline-container__text">
        <h2 class="headline-container__title">{{ stored.plan.title }}</h2>
        <p class="headline-container__description">
          {{ stored.plan.description }}
        </p>
        <div class="headline-container__info">
          <span class="headline-container__info-text">
            <font-awesome-icon
              class="headline-container__icon"
              icon="yen-sign"
            ></font-awesome-icon>
            {{ stored.plan.total_budget }}
          </span>
          <span>
            <font-awesome-icon
              class="headline-container__icon"
              icon="map-marker-alt"
            ></font-awesome-icon>
            {{ stored.plan.area }}
          </span>
        </div>
      </div>
      <div>
        <img
          class="headline-container__photo"
          :src="stored.plan.thumb"
          alt="デートのメインコンテンツの画像です"
        />
      </div>
    </div>
    <div class="background">
      <h3 class="courses">コース詳細</h3>
      <div class="spots-container">
        <div class="spots-container__timeline">
          <div>
            <font-awesome-icon class="icon" icon="coffee"></font-awesome-icon>
          </div>
          <div class="spots-container__dash"></div>
          <div>
            <font-awesome-icon class="icon" icon="sun"></font-awesome-icon>
          </div>
          <div class="spots-container__dash"></div>
          <div>
            <font-awesome-icon class="icon" icon="moon"></font-awesome-icon>
          </div>
        </div>
        <div class="spots-container__spots">
          <div
            v-for="(spot, index) in stored.plan.spots"
            :key="index"
            class="spots-container__spot"
          >
            <div>
              <img
                class="spots-container__spot-photo"
                :src="spot.thumb"
                alt="デートスポット毎の写真です"
              />
            </div>
            <div class="spots-container__spot-text">
              <h4>{{ spot.name }}</h4>
              <p>
                <font-awesome-icon icon="yen-sign"></font-awesome-icon>
                {{ spot.budget }}
              </p>
              <p>
                <font-awesome-icon icon="link"></font-awesome-icon>
                {{ spot.url }}
              </p>
            </div>
          </div>
          <div class="button-container">
            <nuxt-link to="pages/gallery">
              <base-button buttonclass="button-back">戻る</base-button>
            </nuxt-link>
            <base-button buttonclass="button-delete" @click="deletePlan"
              >このプランを削除する</base-button
            >
          </div>
        </div>
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
  asyncData({ app, $axios, params }) {
    const dateToken = app.$cookies.get('dstoken')
    return $axios
      .$get(`/v1/my_plans/${params.id}`, {
        headers: {
          Authorization: 'Bearer ' + dateToken
        }
      })
      .then((response) => {
        console.log(response)
        return {
          stored: response,
          dateToken
        }
      })
  }
}
</script>

<style lang="scss">
.headline-container {
  width: 720px;
  height: 240px;
  display: flex;
  margin: 0 auto;
  padding: 32px 0 24px;
  position: relative;
  &__text {
    color: white;
    padding-right: 70px;
  }
  &__title {
    padding: 16px 0 22px;
    font-size: 26px;
  }
  &__description {
    font-size: 14px;
  }
  &__info {
    position: absolute;
    bottom: 24px;
  }
  &__icon {
    opacity: 0.5;
  }
  &__info-text {
    margin-right: 36px;
  }
  &__photo {
    width: 312px;
    height: 184px;
  }
}
.background {
  background-color: #f5f5f5;
  min-height: 100vh;
}
.courses {
  width: 720px;
  padding: 32px 0 15px;
  margin: 0 auto;
  font-size: 15px;
  color: #a2a2a2;
}
.spots-container {
  display: flex;
  width: 720px;
  margin: 0 auto;
  &__timeline {
    width: 56px;
    min-height: 100%;
    display: flex;
    flex-flow: column;
    // text-align: center;
    justify-content: space-between;
  }
  &__dash {
    border: 1px dash #a5a5a5;
    height: 100%;
  }
  &__spots {
    width: 664px;
  }
  &__spot {
    height: 144px;
    display: flex;
    background-color: white;
    margin-bottom: 42px;
  }
  &__spot-photo {
    width: 208px;
    height: 144px;
    object-fit: cover;
  }
  &__spot-text {
    padding: 16px 24px;
    color: #5d5d5d;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
  }
}
.icon {
  color: #a2a2a2;
}
.button-container {
  display: flex;
  justify-content: space-between;
}
</style>
