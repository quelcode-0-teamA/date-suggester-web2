<template>
  <div>
    <button
      v-bind="$attrs"
      class="button"
      :class="buttonClass"
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
    buttonClass: {
      type: String,
      default: null
    }
  }
}
</script>

<style lang="scss">
.button {
  width: 308px;
  max-width: 100%;
  $height: 52px;
  height: $height;
  border-radius: $height / 2;
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
}
.button:hover {
  background-color: rgba($color: white, $alpha: 0.34);
  border: transparent;
  // transform: scale(1.02);
  // box-shadow: 0 7px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.button:active {
  -webkit-transform: scale(1);
  transform: scale(1);
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
.button + .button {
  margin-left: 1em;
}
.button.-fill-gray {
  background: rgba(0, 0, 0, 0.5);
  color: #ffffff;
}
.button.-size-small {
  height: 32px;
}
.button.-icon-right {
  text-align: left;
  padding: 0 20px;
}
.button.-icon-right > .icon {
  margin-left: 10px;
}
.button.-icon-left {
  text-align: right;
  padding: 0 20px;
}
.button.-icon-left > .icon {
  margin-right: 10px;
}
.button.-icon-center {
  padding: 0 20px;
}
</style>
