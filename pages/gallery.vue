<template>
  <div class="gallery">
    <h2 class="gallery__title">デートプラン一覧</h2>
    <div class="gallery__list">
      <figure v-for="(item, index) in galleryItems" :key="index">
        <img
          :src="item.thumb"
          alt="ギャラリー内のデートプランの項目タイトルです"
        />
        <figcaption>{{ item.title }}</figcaption>
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
          Authorizaiton: 'Bearer ' + dateToken
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
  height: 100vh;
  &__title {
    text-align: center;
    color: #ff5492;
    font-size: 19px;
  }
  &__list {
    width: 720px;
    display: flex;
  }
}
</style>
