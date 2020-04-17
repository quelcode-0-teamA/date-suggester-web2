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
    },
    value: {
      type: [Number, String],
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
  &:hover,
  &:active,
  &:focus {
    outline: none;
  }
  &::-moz-focus-inner {
    border: none;
  }
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
  border: none;
  color: #222;
  &:hover {
    background-color: #ffce00;
  }
}
.button-option {
  width: 332px;
  height: 56px;
  border-radius: 28px;
  background-color: #ffe691;
  box-shadow: 0 4px #d9c47d;
  border: none;
  color: #222;
  margin-bottom: 21px;
  &:hover {
    background-color: #ffce00;
  }
}
.button-back {
  width: 152px;
  height: 56px;
  color: #a2a2a2;
  background: transparent;
  border-color: #a2a2a2;
  border-radius: 28px;
  &:hover {
    color: white;
    background-color: #a2a2a2;
    opacity: 0.67;
  }
}
.button-pick {
  width: 160px;
  height: 56px;
  background-color: #ff5492;
  border-radius: 28px;
  &:hover {
    background-color: #ff5492;
    opacity: 0.67;
  }
}
.button-delete {
  padding: 0 32px;
  height: 56px;
  border-radius: 28px;
  background-color: rgba($color: #a2a2a2, $alpha: 0.67);
  color: white;
  &:hover {
    background-color: #222;
    opacity: 0.67;
  }
}
.button-popup-back {
  width: 152px;
  height: 48px;
  border-radius: 24px;
  border: 1px solid #a2a2a2;
  color: #5d5d5d;
  padding: 0 32px;
  &:hover {
    background-color: #ff5492;
    color: white;
  }
}
.button-popup-delete {
  width: 152px;
  height: 48px;
  border-radius: 24px;
  border: 1px solid #a2a2a2;
  color: #dd3a3a;
  &:hover {
    background-color: rgba($color: #222, $alpha: 0.67);
    color: white;
  }
}
.button-signin {
  display: block;
  margin: 120px auto 0;
  width: 176px;
  height: 48px;
  border: none;
  border-radius: 24px;
  background: linear-gradient(to bottom, #ff5f85, #ff8355);
  &:hover {
    transform: scale(1.1);
  }
}
.button-edit {
  width: 176px;
  height: 40px;
}
.button-gallery {
  max-width: 308px;
  height: 58px;
  border-radius: 29px;
  background-color: #ff5492;
  margin-bottom: 70px;
  &:hover {
    background-color: #ff5492;
    opacity: 0.67;
  }
}
.button:active {
  // -webkit-transform: scale(1);
  transform: translateY(4px);
  box-shadow: none;
}
</style>
