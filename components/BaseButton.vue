<template>
  <div>
    <button
      v-bind="$attrs"
      class="button"
      :class="buttonclass"
      v-on="$listeners"
    >
      <!-- inheriting event listeners -->
      <slot />
    </button>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    buttonclass: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss">
.button {
  border: 1px white solid;
  color: white;
  // display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
  background: transparent;
  text-align: center;
  font-size: 100%;
  font-weight: bold;
  transition: all 0.2s linear;
  cursor: pointer;
  width: 308px;
  max-width: 100%;
  $height: 52px;
  height: $height;
  border-radius: $height / 2;
}
.-start {
  width: 308px;
  max-width: 100%;
  $height: 52px;
  height: $height;
  border-radius: $height / 2;
}
.button:hover {
  background-color: rgba($color: white, $alpha: 0.34);
  border: transparent;
  // transform: scale(1.02);
  // box-shadow: 0 7px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.button-step {
  width: 228px;
  height: 40px;
  border-radius: 20px;
  background-color: #ffe691;
  box-shadow: 0 4px #d9c47d;
  border-radius: 20px;
  border: none;
  color: #222;
  &:hover {
    background-color: rgba($color: #ffe691, $alpha: 0.8);
  }
}
.button:active {
  // -webkit-transform: scale(1);
  transform: translateY(4px);
  box-shadow: none;
}
.button:focus {
  outline: 0;
}
.button.-fill-gradient {
  background: linear-gradient(to right, #16c0b0, #84cf6a);
  color: #ffffff;
}
.button:disabled {
  -webkit-transform: scale(1);
  transform: scale(1);
  box-shadow: none;
  background: #eeeeee;
}
</style>
