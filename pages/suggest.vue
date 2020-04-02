<template>
  <div>
    <h2>{{ suggest }}</h2>
    <!-- <div class="headline-container">
      <div>
        <h2>{{ suggest.title }}</h2>
        <p>{{ suggest.description }}</p>
        <span>
          <font-awesome-icon icon="yen-sign"></font-awesome-icon>
          {{ suggest.total_budget }} 円
        </span>
        <span>
          <font-awesome-icon icon="map-marker-alt"></font-awesome-icon>
          {{ suggest.area }}
        </span>
      </div>
      <div>
        <img :src="suggest.thumb" alt="デートのメインコンテンツの画像です" />
      </div>
    </div>
    <div class="spot-table"></div> -->
  </div>
</template>

<script>
export default {
  asyncData({ store, $axios, app }) {
    const dateToken = app.$cookies.get('dstoken')
    $axios
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
}
</style>
