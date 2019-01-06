<template>
  <div class="ali-loading" :style="{'position': position}">
    <div class="loading" :style="{'top': top}">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    position: {
      type: String,
      default () {
        return 'absolute'
      }
    },
    top: {
      type: String,
      default () {
        return '50%'
      }
    }
  }
}
</script>

<style lang="scss">
@import '../style/px2rem.scss';
.ali-loading {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.6);
  .loading {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    width: px2rem(80);
    height: px2rem(40);
    span {
      display: inline-block;
      width: px2rem(8);
      height: 100%;
      border-radius: px2rem(4);
      background: #7c6297;
      animation: load 1.04s ease infinite;
      &:nth-child(2) {
        animation-delay: 0.13s;
      }
      &:nth-child(3) {
        animation-delay: 0.26s;
      }
      &:nth-child(4) {
        animation-delay: 0.39s;
      }
      &:nth-child(5) {
        animation-delay: 0.52s;
      }
    }
  }
  @keyframes load {
    0%,
    100% {
      height: px2rem(40);
    }
    50% {
      height: px2rem(60);
      margin-top: -px2rem(20);
    }
  }
}
</style>
