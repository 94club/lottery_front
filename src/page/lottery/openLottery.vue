<template>
  <div class="open-result">
    <ali-head :showBack="true" :pageTitle="translate(36, lang)" :showDrawer="true"></ali-head>
    <div class="btn-act pt44">
      <div class="btn" @click="closeLuckyNum">{{translate(37, lang)}}</div>
      <div class="btn" @click="resetRedeemNum">{{translate(38, lang)}}</div>
      <div class="btn" @click="overRedeemNum">{{translate(51, lang)}}</div>
    </div>
    <div class="members">
    </div>
    <div class="result-box" v-show="boxShow">
      <div class="mask" @click="boxShow=false"></div>
      <div class="result-box-content">
        <div class="result-box-redeem">
          <p>{{translate(41, lang)}}</p>
          <p>{{resultObj.redeemNum}}</p>
        </div>
        <div class="result-box-owner">
          <p>{{translate(42, lang)}}</p>
          <p>{{resultObj.owner}}</p>
        </div>
        <div class="result-box-award">
          <p>{{translate(43, lang)}}</p>
          <p>{{resultObj.award}}</p>
        </div>
        <div class="result-box-btns">
          <div class="btn" :style="{background: actFlag!=='start'?'#333':''}" @click="startRedeemNum">{{translate(39, lang)}}</div>
          <div class="btn" :style="{background: actFlag!=='ing'?'#333':''}" @click="stopRedeemNum">{{translate(40, lang)}}</div>
          <!-- <div class="btn" :style="{background: actFlag!=='start'?'#333':''}" @click="startRedeemNum2">{{translate(39, lang)}}222</div>
          <div class="btn" :style="{background: actFlag!=='ing'?'#333':''}" @click="stopRedeemNum2">{{translate(40, lang)}}2222</div> -->
        </div>
      </div>
    </div>
    <ali-loading v-if="loadingStatus" :position="'fixed'"></ali-loading>
    <ali-alert  v-if="alertObj" :alertObj="alertObj" @onConfirm="onConfirm"></ali-alert>
  </div>
</template>
<script>
import AliHead from '../../components/aliHead'
import AliLoading from '../../components/aliLoading'
import AliAlert from '../../components/aliAlert'
// import {translate, mockLuckyList} from '../../config/util.js'
import {translate} from '../../config/util.js'
import urls from '../../config/urls.js'
export default {
  data () {
    return {
      boxShow: false,
      alertObj: '',
      resultObj: {
        redeemNum: '??',
        owner: '??',
        award: 'ihonx'
      },
      actFlag: 'start',
      timer: '',
      maxIndex: '',
      luckyNumList: []
    }
  },
  created () {
    if (!this.awardItemInfo) {
      this.$router.replace({path: '/'})
    } else {
      this.resultObj.award = this.awardItemInfo.awardName
    }
  },
  components: {
    AliHead,
    AliLoading,
    AliAlert
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
    }
  },
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    translate (key, lang) {
      return translate(key, lang)
    },
    getAwardItem () {
      this.$store.dispatch('changeLoadingStatus', true)
      this.$axios.get(urls.awardItem + '?awardIndex=' + this.awardItemInfo.awardIndex).then((res) => {
        if (res.data) {
          this.$store.dispatch('changeLoadingStatus', false)
          this.$store.dispatch('updateAwardItemInfo', res.data)
          // this.luckyNumList = mockLuckyList 测试
          this.luckyNumList = res.data.luckyNumList
          this.maxIndex = this.luckyNumList.length
        }
      })
    },
    // 关闭抽奖
    closeLuckyNum (item) {
      this.alertObj = {
        visible: true,
        msg: 37
      }
      this.getAwardItem()
    },
    onConfirm () {
      this.boxShow = true
      // 更新奖项的状态
      this.$axios.post(urls.updateAwardInfo, {isLotteryOver: true, awardIndex: this.awardItemInfo.awardIndex}).then(() => {
        this.$toast({msg: translate(50, this.lang)})
      })
    },
    stopRedeemNum2 () {
      clearInterval(this.timer)
      if (this.awardItemInfo.des.indexOf('超级') > -1) {
        this.changeRedeem()
      } else {
        this.getOwner()
      }
    },
    startRedeemNum2 (item) {
      this.resetRedeemNum()
      this.timer = setInterval(() => {
        if (this.resultObj.redeemNum === this.maxIndex) {
          this.resultObj.redeemNum = 1
        } else {
          this.resultObj.redeemNum++
        }
      }, 1000 * 1)
      this.resultObj.redeemNum = 1
    },
    // 开始开奖
    startRedeemNum (item) {
      if (this.actFlag === 'start') {
        this.actFlag = 'ing'
        this.timer = setInterval(() => {
          if (this.resultObj.redeemNum === this.maxIndex) {
            this.resultObj.redeemNum = 1
          } else {
            this.resultObj.redeemNum++
          }
        }, 10 * 2)
        this.resultObj.redeemNum = 1
      } else {
        this.$toast({msg: translate(52, this.lang)})
      }
    },
    changeRedeem () {
      if (this.luckyNumList[this.resultObj.redeemNum - 1].lang === 'en') {
        this.resultObj.redeemNum++
        if (this.resultObj.redeemNum === this.maxIndex) {
          this.resultObj.redeemNum = 1
        }
        this.changeRedeem()
      } else {
        this.getOwner()
      }
    },
    getOwner () {
      this.luckyNumList.map((ele) => {
        if (ele.luckyNum === this.resultObj.redeemNum) {
          this.resultObj.owner = ele.username
        }
      })
    },
    // 停止开奖
    stopRedeemNum () {
      if (this.actFlag === 'ing') {
        this.actFlag = 'end'
        clearInterval(this.timer)
        if (this.awardItemInfo.des.indexOf('超级') > -1) {
          this.changeRedeem()
        } else {
          this.getOwner()
        }
      } else {
        this.$toast({msg: translate(52, this.lang)})
      }
    },
    // 结束开奖
    overRedeemNum () {
      this.$store.dispatch('changeLoadingStatus', true)
      this.$axios.post(urls.updateAwardInfo, Object.assign({awardIndex: this.awardItemInfo.awardIndex, isOpenResultOver: true}, this.resultObj)).then(() => {
        this.$axios.post(urls.updateUserInfo, {hadPrize: true, awardIndex: this.awardItemInfo.awardIndex, prizeName: this.resultObj.owner}).then(() => {
          this.$toast({msg: translate(53, this.lang)})
          this.resetRedeemNum()
          this.$store.dispatch('changeLoadingStatus', false)
          this.$router.go(-1)
        })
      })
    },
    // 重置开奖
    resetRedeemNum () {
      this.actFlag = 'start'
      this.resultObj.redeemNum = '??'
      this.resultObj.owner = '??'
    }
  }
}
</script>
<style lang="scss">
@import '../../style/px2rem.scss';
.btn-act {
  width: 100%;
  .btn {
    width: px2rem(200);
    height: px2rem(88);
    line-height: px2rem(88);
    margin: 0 auto;
    text-align: center;
    font-size: px2rem(28);
    background: #fc9153;
    color: #fff;
  }
}
.result-box {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9998;
  background-color: rgba(0, 0, 0, 0.8);
  &-content {
    position: fixed;
    top: 20%;
    left: 50%;
    z-index: 9999;
    transform: translateX(-50%);
    width: px2rem(700);
    height: px2rem(800);
    background: #000;
    animation: show 0.7s ease;
  }
  &-redeem {
    p {
      color:#fff;
      font-size: px2rem(28);
      text-align: center;
      line-height: px2rem(32)
    }
  }
  &-owner {
    p {
      color:#fff;
      font-size: px2rem(28);
      text-align: center;
      line-height: px2rem(32)
    }
  }
  &-award {
    p {
      color:#fff;
      font-size: px2rem(28);
      text-align: center;
      line-height: px2rem(32)
    }
  }
  &-btns {
    display: flex;
    justify-content: space-around;
    .btn {
      width: px2rem(200);
      height: px2rem(88);
      line-height: px2rem(88);
      text-align: center;
      font-size: px2rem(28);
      background: #fc9153;
      color: #fff;
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
</style>
