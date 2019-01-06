<template>
  <div class="ali-drawer">
    <div class="mask" v-show="aliDrawerShow" @click="aliDrawerShow = !aliDrawerShow"></div>
    <div class="ali-drawer-content" :class="aliDrawerShow ? 'r0': ''"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: {
    aliDrawerShow: {
      type: Boolean,
      default () {
        return false
      }
    }
  }
}
</script>
<style lang="scss">
@import '../style/px2rem.scss';
.ali-drawer {
  .mask {
    position: fixed;
    top: px2rem(88);
    z-index: 99;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
  }
  &-content {
    position: fixed;
    top: px2rem(88);
    z-index: 100;
    right: - px2rem(200);
    width: px2rem(200);
    height: 100%;
    background: red;
    transition: right 1s;
  }
  .r0 {
    right: 0
  }
}
</style>
