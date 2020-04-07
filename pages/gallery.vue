<template>
  <div class="gallery">
    <h2 class="gallery__title">デートプラン一覧</h2>
    <div class="gallery__list">
      <figure
        v-for="(item, index) in galleryItems"
        :key="index"
        class="gallery__figure"
      >
        <img
          class="gallery__img"
          :src="item.plan.thumb"
          alt="ギャラリー内のデートプランの項目タイトルです"
        />
        <figcaption class="gallery__figcaption">
          {{ item.plan.title }}
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ app, $axios }) {
    const dateToken = app.$cookies.get('dstoken')
    return $axios
      .$get('/v1/my_plans', {
        headers: {
          Authorization: `Bearer ` + dateToken
        }
      })
      .then((response) => {
        console.log(response)
        return {
          galleryItems: response,
          dateToken
        }
      })
  }
}
</script>

<style lang="scss">
.gallery {
  background-color: #fff;
  min-height: calc(100vh - 57px);
  &__title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 104px;
    color: #ff5492;
    font-size: 19px;
  }
  &__list {
    width: 720px;
    display: flex;
    flex-wrap: wrap;
    margin: 0 auto;
    justify-content: space-between;
  }
  &__figure {
    position: relative;
    margin-bottom: 35px;
  }
  &__img {
    width: 336px;
    height: 232px;
    object-fit: cover;
  }
  &__figcaption {
    width: 100%;
    height: 40px;
    color: white;
    font-size: 18px;
    background-color: rgba($color: #ff5492, $alpha: 0.67);
    position: absolute;
    bottom: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
