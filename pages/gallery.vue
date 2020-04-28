<template>
  <div class="gallery">
    <h2 class="gallery__title">デートプラン一覧</h2>
    <div class="gallery__list">
      <figure
        v-for="(item, index) in galleryItems"
        :key="index"
        class="gallery__figure"
      >
        <nuxt-link :to="{ name: 'stored-id', params: { id: item.id } }">
          <img
            class="gallery__img"
            :src="item.plan.thumb"
            alt="ギャラリー内のデートプランの項目タイトルです"
          />
          <figcaption class="gallery__figcaption">
            {{ item.plan.title }}
          </figcaption>
        </nuxt-link>
      </figure>
    </div>
    <div v-once id="snackbar">
      <font-awesome-icon
        icon="times"
        class="icon"
        @click="hideBar"
      ></font-awesome-icon>
      &nbsp; サインインしないとプランは一週間しか保存されません
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
        return {
          galleryItems: response,
          dateToken
        }
      })
  },
  data() {
    return {}
  },
  mounted() {
    const x = document.getElementById('snackbar')
    x.className = 'show'
    const bar = localStorage.getItem('confirmed')
    if (bar) {
      document.getElementById('snackbar').className = 'hidden'
    }
  },
  methods: {
    hideBar() {
      localStorage.setItem('confirmed', 'true')
      document.getElementById('snackbar').className = 'hidden'
    }
  }
}
</script>

<style lang="scss">
.gallery {
  background-color: #fff;
  min-height: calc(100vh - 57px);
  text-align: center;
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
    cursor: pointer;
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
  &__topimage {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0.37;
  }
}
.empty-list {
  text-align: center;
  position: relative;
}
#snackbar {
  visibility: hidden;
  min-width: 250px;
  background-color: #a2a2a2;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 50%;
  transform: translateX(-50%);
  bottom: 30px;
}
#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s;
  animation: fadein 0.5s;
}
.hidden {
  visibility: hidden;
}
#snackbar .icon {
  cursor: pointer;
  color: white;
}
@-webkit-keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@keyframes fadein {
  from {
    bottom: 0;
    opacity: 0;
  }
  to {
    bottom: 30px;
    opacity: 1;
  }
}

@-webkit-keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}

@keyframes fadeout {
  from {
    bottom: 30px;
    opacity: 1;
  }
  to {
    bottom: 0;
    opacity: 0;
  }
}
</style>
