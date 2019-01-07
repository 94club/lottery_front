<template>
  <div class="login-page">
    <ali-head :showBack="true" :pageTitle="translate(104, lang)"></ali-head>
    <div class="pt54" :style="{textAlign: 'center'}">
      <!-- <img src="../../../static/img/2019.png" alt=""> -->
    </div>
    <div class="danmu">
      <input class="danmu-text" type="text" placeholder="say something" v-model="danmu">
      <span class="danmu-btn" @click="sendBarrage">{{translate(88, lang)}}</span>
    </div>
  </div>
</template>
<script>
import AliHead from '../../components/aliHead'
import AliLoading from '../../components/aliLoading'
import AliInput from '../../components/aliInput'
import {translate} from '../../config/util.js'
import urls from '../../config/urls.js'
export default {
  data () {
    return {
      value: '',
      clearable: {
        visible: true,
        blurHidden: true,
        isOk: false,
        firstInfo: ''
      }
    }
  },
  components: {
    AliHead,
    AliLoading,
    AliInput
  },
  computed: {
    lang () {
      return this.$store.state.lang
    },
    prePath () {
      return this.$store.state.actionFromPath
    },
    loadingStatus () {
      return this.$store.state.loadingStatus
    }
  },
  methods: {
    translate (key, lang) {
      return translate(key, lang)
    },
    sendBarrage () {
      if (this.canDanmu) {
        this.$axios.post(urls.addDanmu, {msg: this.danmu}).then((res) => {
          this.canDanmu = false
          this.danmu = ''
          this.lastId = res.data
          setTimeout(() => {
            this.canDanmu = true
          }, 1000 * 10)
        })
      } else {
        this.$toast({msg: translate(100, this.lang)})
      }
    },
    getBarrage () {
      this.$axios.get(urls.getDanmuList).then((res) => {
        let newInfo = res.data
        if (newInfo.length > 0) {
          newInfo.map((item) => {
            if (item.status === 0) {
              this.barrageList.unshift(item)
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import '../../style/px2rem.scss';
.danmu-out-btn {
  position: fixed;
  top: 9rem;
  width: 9rem;
  z-index: 8;
  right: px2rem(20);
  transition: right 1s;
}
.danmu {
  position: fixed;
  top: 4.4rem;
  z-index: 6;
  display: flex;
  width: 100%;
  background: #fff;
  padding: px2rem(20) 0;
  margin: 0 auto;
  justify-content: space-around;
  transition: left 1s;
  &-text {
    flex: 1;
    height: px2rem(88);
    font-size: px2rem(32);
    padding-left: px2rem(20);
    margin-left: px2rem(10);
    border-radius: px2rem(8);
    border: 1px solid #666;
    box-sizing: border-box;
  }
  &-btn {
    width: px2rem(100);
    height: px2rem(88);
    line-height: px2rem(88);
    margin: 0 px2rem(10);
    text-align: center;
    border-radius: px2rem(8);
    border: 1px solid #999;
    box-sizing: border-box;
  }
}
</style>
