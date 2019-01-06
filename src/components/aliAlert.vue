
<template>
  <section class="alert" :class="[alertObj.visible ? '': 'hide']">
    <div class="alert-content">
      <h5 class="alert-content-title">{{translate(30, lang)}}</h5>
      <div class="alert-content-msg" v-if="alertObj.msg">{{translate(31, lang)}}{{ translate(alertObj.msg, lang) }}</div>
      <div class="alert-content-btns">
        <div class="btn" @click="cancel">{{translate(33, lang)}}</div>
        <div class="btn" @click="confirm">{{translate(32, lang)}}</div>
      </div>
    </div>
  </section>
</template>
<script>
import {translate} from '../config/util.js'
export default {
  props: {
    alertObj: {
      type: Object,
      default () {
        return {
          msg: '',
          visible: false
        }
      }
    }
  },
  computed: {
    lang () {
      return this.$store.state.lang
    }
  },
  methods: {
    translate (key, lang) {
      return translate(key, lang)
    },
    confirm () {
      this.alertObj.visible = false
      this.$emit('onConfirm')
    },
    cancel () {
      this.alertObj.visible = false
      this.$emit('onCancel')
    },
    // 标题有个x
    close () {
      this.alertObj.visible = false
      this.$emit('onClose')
    }
  }
}
</script>

<style lang="scss">
@import '../style/px2rem.scss';
.alert {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9998;
  background-color: rgba(0, 0, 0, 0.8);
  .alert-content {
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    width: px2rem(692);
    height: px2rem(360);
    border-radius: 4px;
    background: #4A4A4A;
    animation: show 1s ease;
    text-align: center;
    .alert-content-title {
      margin-top: px2rem(24);
      height: px2rem(40);
      line-height: px2rem(40);
      color: #c5c5c5;
      font-size: px2rem(28);
    }
    .alert-content-msg {
      margin-top: px2rem(56);
      font-size: px2rem(28);
      color: #fff;
      p {
        line-height: px2rem(40);
      }
    }
    .alert-content-btns {
      position: absolute;
      bottom: px2rem(32);
      display: flex;
      justify-content: space-around;
      flex-direction: row;
      width: 100%;
      .btn {
        width: px2rem(288);
        height: px2rem(68);
        line-height: px2rem(68);
        border: px2rem(2) solid;
        border-radius: 4px;
        font-size: px2rem(28);
      }
    }
  }
}
@keyframes show {
  0% {
    top: 10%;
    opacity: 0.6;
  }
  100% {
    top: 20%;
    opacity: 1;
  }
}
.hide {
  display: none;
}
</style>
