<template>
  <div>
    <div class="headline-container">
      <div class="headline-container__text">
        <h2 class="headline-container__title">{{ suggest.title }}</h2>
        <p class="headline-container__description">{{ suggest.description }}</p>
        <div class="headline-container__info">
          <span class="headline-container__info-text">
            <font-awesome-icon
              class="headline-container__icon"
              icon="yen-sign"
            ></font-awesome-icon>
            {{ suggest.total_budget }}
          </span>
          <span>
            <font-awesome-icon
              class="headline-container__icon"
              icon="map-marker-alt"
            ></font-awesome-icon>
            {{ suggest.area }}
          </span>
        </div>
      </div>
      <div>
        <img
          class="headline-container__photo"
          :src="suggest.thumb"
          alt="デートのメインコンテンツの画像です"
        />
      </div>
    </div>
    <div class="spots-container"></div>
  </div>
</template>

<script>
export default {
  asyncData({ store, $axios, app }) {
    const dateToken = app.$cookies.get('dstoken')
    return $axios
      .$get(`/v1/plans/suggest?${store.getters.qParams}`, {
        headers: {
          Authorization: 'Bearer ' + dateToken
        }
      })
      .then((response) => {
        console.log(response)
        return {
          suggest: response,
          dateToken
        }
      })
  },
  data() {
    return {}
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

.spots-container {
  background-color: #f5f5f5;
}
</style>
