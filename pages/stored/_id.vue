<template>
  <div>
    <popup v-if="showModal" @toggle-modal="showModal = false">
      <template>
        <h4 class="popup-text">
          本当にこのデートプランを一覧から削除しますか？
        </h4>
        <div class="popup-buttons">
          <base-button
            buttonclass="button-popup-back"
            @click.prevent="toggleModal"
            >削除しない</base-button
          >
          <base-button
            buttonclass="button-popup-delete"
            @click.prevent="deletePlan"
            >削除する</base-button
          >
        </div>
      </template>
    </popup>
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
          <div class="vertical-line"></div>
          <div>
            <font-awesome-icon class="icon" icon="sun"></font-awesome-icon>
          </div>
          <div class="vertical-line"></div>
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
              <div>
                <p>
                  <font-awesome-icon icon="yen-sign"></font-awesome-icon>
                  {{ spot.budget }}
                </p>
                <p>
                  <font-awesome-icon icon="link"></font-awesome-icon>
                  <a class="url" :href="spot.url">
                    {{ spot.url }}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="button-container">
        <nuxt-link to="../gallery">
          <base-button buttonclass="button-back">戻る</base-button>
        </nuxt-link>
        <base-button buttonclass="button-delete" @click="toggleModal"
          >このプランを削除する</base-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import BaseButton from '@/components/BaseButton.vue'
import Popup from '@/components/Popup.vue'
export default {
  components: {
    BaseButton,
    Popup
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
  },
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal
    },
    deletePlan() {
      this.$axios
        .$delete(`/v1/my_plans/${this.$route.params.id}`, {
          headers: {
            Authorization: 'Bearer ' + this.dateToken
          }
        })
        .then((response) => {
          console.log(response)
          this.$router.push('../gallery')
        })
    }
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
  }
  &__spot + &__spot {
    margin-top: 42px;
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
.vertical-line {
  border-left: 1px dotted #a2a2a2;
  height: 1000%;
  margin-left: 8px;
}
.button-container {
  width: 720px;
  display: flex;
  justify-content: space-between;
  margin: 62px auto 32px;
}
.popup-text {
  text-align: center;
  color: #5d5d5d;
  font-size: 15px;
  width: 548px;
  margin-bottom: 32px;
}
.popup-buttons {
  display: flex;
  justify-content: space-around;
}
.url {
  color: #de436a;
  text-overflow: ellipsis;
}
</style>
