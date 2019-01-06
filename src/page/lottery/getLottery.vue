<template>
  <div class="lottery-page">
    <ali-head :showBack="true" :pageTitle="translate(35, lang)" :showDrawer="true"></ali-head>
    <div class="circle-container">
      <div class="circle-item" :class="flip ? 'flip-change': ''">
        <div class="circle front" @click="getLuckyNum"><span v-show="!flip">{{translate(46, lang)}}</span></div>
        <div class="circle back">{{luckyNum}}
        </div>
      </div>
    </div>
    <div class="statistic">
      <p>{{translate(48, lang)}}{{statisticList.length}}</p>
      <p v-for="(item, index) in statisticList" :key="index">
        {{item.username}}{{translate(47, lang)}}{{item.createTime}}{{translate(44, lang)}}
      </p>
    </div>
    <ali-loading v-if="loadingStatus" :position="'fixed'"></ali-loading>
  </div>
</template>
<script>
import AliHead from '../../components/aliHead'
import AliLoading from '../../components/aliLoading'
import {translate, reverseArr} from '../../config/util.js'
import urls from '../../config/urls.js'
export default {
  data () {
    return {
      luckyNum: '',
      lotteryShowIndex: 0,
      awardList: [],
      flip: false,
      statisticList: [],
      timer: null
    }
  },
  components: {
    AliHead,
    AliLoading
  },
  created () {
    if (this.awardItemInfo) {
      this.getAwardItem()
    } else {
      this.$router.replace({path: '/'})
    }
  },
  computed: {
    awardItemInfo () {
      return this.$store.state.moduleAward.awardItemInfo
    },
    lang () {
      return this.$store.state.lang
    },
    loadingStatus () {
      return this.$store.state.loadingStatus
    },
    awardIndex () {
      let urlArr = this.$route.path.split('/')
      return urlArr[urlArr.length - 1]
    },
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    translate (key, lang) {
      return translate(key, lang)
    },
    getLuckyNum () {
      this.$store.dispatch('changeLoadingStatus', true)
      this.$axios.get(urls.getLucyNum + '?awardIndex=' + parseInt(this.awardIndex) + '&lang=' + this.lang).then((res) => {
        this.$store.dispatch('changeLoadingStatus', false)
        this.flip = true
        this.luckyNum = res.data
      })
    },
    getAwardItem () {
      this.$store.dispatch('changeLoadingStatus', true)
      this.timer = setInterval(() => {
        this.$axios.get(urls.awardItem + '?awardIndex=' + this.awardItemInfo.awardIndex).then((res) => {
          if (res.data) {
            this.statisticList = reverseArr(res.data.lotteryJoinList)
          }
        })
      }, 1000 * 5)
      this.$axios.get(urls.awardItem + '?awardIndex=' + this.awardItemInfo.awardIndex).then((res) => {
        if (res.data) {
          this.$store.dispatch('changeLoadingStatus', false)
          this.statisticList = reverseArr(res.data.lotteryJoinList)
          res.data.luckyNumList.map((ele) => {
            if (ele.username === this.userInfo.username) {
              this.flip = true
              this.luckyNum = ele.luckyNum
            }
          })
        }
      })
    },
    updateUserInfo () {
      this.$axios.post(urls.updateUserInfo, {awardIndex: this.awardIndex, luckyNum: this.luckyNum}).then(() => {
        this.$toast({msg: translate(49, this.lang)})
      })
    }
  }
}
</script>
<style lang="scss">
@import '../../style/px2rem.scss';
.circle-container {
  padding-top: px2rem(88);
  width: px2rem(400);
  height: px2rem(400);
  perspective:1000;
  transform-style:preserve-3d;
  .circle-item {
    position: relative;
    transition:0.6s;
    transform-style:preserve-3d;
    .circle {
      width: px2rem(400);
      height: px2rem(400);
      position: absolute;
      top: 0;
      left: 0;
      backface-visibility:hidden;
      border-radius: 50%;
      text-align: center;
      line-height: px2rem(400);
      font-size: px2rem(36);
      color:#fff;
    }
    .front {
      z-index: 2;
      background: #666;
    }
    .back {
      transform:rotateY(-180deg);
      background: #000;
    }
  }
}
.statistic {
  p {
    line-height: px2rem(44);
    font-size: px2rem(24);
  }
}
</style>
