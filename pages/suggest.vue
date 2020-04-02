<template>
  <div></div>
</template>

<script>
export default {
  asyncData({ store, $axios, app }) {
    const dateToken = app.$cookies.get('dstoken')
    $axios
      .$get(`${store.getters.qParams}`, {
        headers: {
          Authorization: 'Bearer ' + dateToken
        }
      })
      .then((response) => {
        console.log(response)
        return {
          dateToken,
          suggest: response
        }
      })
  },
  data() {
    return {}
  }
}
</script>

<style></style>
