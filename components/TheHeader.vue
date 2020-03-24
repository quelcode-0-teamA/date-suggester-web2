<template>
  <div class="header">
    <h1 class="header__title">Date Suggester</h1>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.header {
  width: 100%;
  background-color: #de436a;
  height: 57px;
  text-align: center;
  z-index: 5;
  position: fixed;
  top: 0;
  left: 0;
  &__title {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
      sans-serif;
    font-size: 23px;
    color: white;
    line-height: 57px;
    font-weight: 400;
    font-style: italic;
  }
}
</style>
