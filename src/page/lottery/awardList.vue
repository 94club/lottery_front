<template>
  <div class="lottery-page">
    <ali-head :pageTitle="translate(12, lang)" :showDrawer="true"></ali-head>
    <scroller :on-refresh="refresh">
      <!-- <div class="time" v-if="status === 'ing'">{{translate(13, lang)}}:{{filterTime}}</div> -->
      <div class="award-list">
        <div class="award-item" v-for="(item, index) in awardList" :key="index">
          <div class="des top-center">
            <p>奖项{{index + 1}}</p>
            <p class="ellipsis">{{item.des}}</p>
          </div>
          <div class="button top-center" v-if="userInfo && userInfo.role === 0" @click="goLottery(item, index)">{{translate(26, lang)}}</div>
          <div class="button top-center" v-if="userInfo && userInfo.role === 1" @click="openLottery(item, index)">{{translate(27, lang)}}</div>
        </div>
      </div>
    </scroller>
    <ali-loading v-if="loadingStatus" :position="'fixed'"></ali-loading>
  </div>
</template>
<script>
import Scroller from '../../components/scroll/components/Scroller'
import AliHead from '../../components/aliHead'
import {translate} from '../../config/util.js'
import urls from '../../config/urls.js'
import AliLoading from '../../components/aliLoading'
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      time: '',
      status: 'ing',
      timer: '',
      annaulBoom: false,
      filp: false,
      giftShow: false,
      awardList: []
    }
  },
  computed: {
    lang () {
      return this.$store.state.lang
    },
    filterTime () {
      // 把时间转换成天，小时，分钟
      let str = ''
      let day = parseInt(this.time / 86400000)
      let hour = parseInt(this.time % 86400000 / 3600000)
      let minute = parseInt(this.time % 86400000 % 3600000 / 60000)
      if (day > 0) {
        if (this.lang === 'cn') {
          str += day + '天'
        } else {
          str += day + 'D'
        }
      }
      if (hour > 0) {
        if (this.lang === 'cn') {
          str += hour + '时'
        } else {
          str += hour + 'h'
        }
      }
      if (minute > 0) {
        if (this.lang === 'cn') {
          str += minute + '分'
        } else {
          str += minute + 'M'
        }
      }
      return str
    },
    userInfo () {
      return this.$store.state.userInfo
    },
    awardItemInfo () {
      return this.$store.state.moduleAward.awardItemInfo
    },
    loadingStatus () {
      return this.$store.state.loadingStatus
    }
  },
  created () {
    // this.getRemainTime()
    this.getAwardList()
    this.getUserInfo()
  },
  destroyed () {
    clearInterval(this.timer)
  },
  components: {
    AliHead,
    Scroller,
    AliLoading
  },
  methods: {
    ...mapActions([
      'changeLoadingStatus',
      'updateAwardItemInfo',
      'updateUserInfo'
    ]),
    getUserInfo () {
      this.$axios.get(urls.userInfo).then((res) => {
        this.updateUserInfo(res.data)
      })
    },
    refresh (fn) {
      this.getAwardList(fn)
    },
    translate (key, lang) {
      return translate(key, lang)
    },
    getRemainTime () {
      this.timer = setInterval(() => {
        this.$axios.get(urls.remain).then((res) => {
          if (res.data.time) {
            this.time = res.data.time
            if (this.time < 1000 * 60) {
              this.annaulBoom = true
            }
          }
          this.status = res.data.status
        })
      }, 1000 * 60)
      this.$axios.get(urls.remain).then((res) => {
        if (res.data.time) {
          this.time = res.data.time
        }
      })
    },
    getAwardList (fn) {
      setTimeout(() => {
        if (fn) fn() // 取消loading
      }, 2000)
      this.changeLoadingStatus(true)
      this.$axios.get(urls.awardList).then((res) => {
        this.awardList = res.data
        this.changeLoadingStatus(false)
      })
    },
    // 去抽奖
    goLottery (item, index) {
      this.changeLoadingStatus(true)
      // 获取最新状态
      this.$axios.get(urls.awardList).then((res) => {
        this.awardList = res.data
        this.changeLoadingStatus(false)
        // 判断有没有中奖
        if (this.userInfo.hadPrize) {
          this.$toast({msg: this.translate(45, this.lang)})
          return
        }
        // 开奖是否结束
        if (this.awardList[index].isOpenResultOver) {
          this.$toast({msg: this.translate(29, this.lang)})
          return
        }
        // 抽奖是否开启
        if (!this.awardList[index].isOpen) {
          this.$toast({msg: this.translate(28, this.lang)})
          return
        }
        // 统计参加的人数
        this.$axios.post(urls.joinAward, {awardIndex: index}).then(() => {
          // 进入抽奖界面
          this.updateAwardItemInfo(item)
          this.$router.push({path: `/getLottery/${index}`})
        })
      })
    },
    // 去开奖
    openLottery (item, index) {
      if (this.awardList[index].isOpenResultOver) {
        this.$toast({msg: this.translate(34, this.lang)})
        return
      }
      this.changeLoadingStatus(true)
      this.updateAwardItemInfo(item)
      this.$axios.post(urls.updateAwardInfo, {awardIndex: item.awardIndex, isOpen: true}).then((res) => {
        // 进入开奖界面
        this.changeLoadingStatus(false)
        this.$router.push({path: `/openLottery/${index}`})
      })
    }
  }
}
</script>
<style lang="scss">
@import '../../style/px2rem.scss';
.lottery-page {
  .time {
    height: px2rem(160);
    padding-top: px2rem(88);
    font-size: px2rem(28);
  }
  .award-list {
    width: px2rem(700);
    margin: 0 auto;
    .award-item {
      position: relative;
      width: 100%;
      height: px2rem(160);
      margin-bottom: px2rem(20);
      border: 1px solid #666;
      .des {
        left: px2rem(120);
        font-size: px2rem(28);
        line-height: px2rem(60)
      }
      .button {
        right: px2rem(20);
        font-size: px2rem(28);
      }
    }
  }
}
.flip-container {
  perspective: 1000px;
  position: fixed;
  z-index: 3;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  width: px2rem(320);
  height: px2rem(480);
  animation: show 0.7s ease;
  button {
    position: absolute;
    bottom: 0;
    width: px2rem(200);
    height: px2rem(100);
  }
  .flipper {
    transition: 0.6s;
    transform-style: preserve-3d;
    position: relative;
    height: 100%;
    .front, .back {
      backface-visibility: hidden;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    .front {
      z-index: 2;
      /* for firefox 31 */
      transform: rotateY(0deg);
      background: #666
    }

    /* back, initially hidden pane */
    .back {
      transform: rotateY(180deg);
      background: #222
    }
  }
}
/* flip the pane when hovered */
.flip-change{
  transform: rotateY(180deg);
}
@keyframes show {
  0% {
    top: 20%;
    opacity: 0.6;
  }
  100% {
    top: 30%;
    opacity: 1;
  }
}
</style>
