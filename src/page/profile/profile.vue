<template>
  <div class="profile">
    <ali-head :showBack="true" :pageTitle="translate(14, lang)" :showDrawer="true"></ali-head>
    <div class="avatar-data pt54">
      <input type="file" class="avatar-input" @change="uploadAvatar">
      <p>{{translate(55, lang)}}</p>
      <img :src="baseUrl + userInfo.avatar" alt="我的头像">
    </div>
    <div class="username-data">
      <p>{{translate(56, lang)}}</p>
      <p>{{userInfo.username}}</p>
    </div>
    <!-- <div class="username-data">
      <p>{{translate(57, lang)}}</p>
      <p>{{userInfo.hadPrize ? translate(59, lang): translate(60, lang)}}</p>
    </div>
    <div class="lottery-data">
      <p>{{translate(58, lang)}}</p>
    </div> -->
    <!-- <div class="lottery-list" v-for="(item, index) in lotteryList" :key="index">
      <div class="lottery-list-item">
        <p>{{translate(62, lang)}}</p>
        <p>{{translate(43, lang)}}{{index + 1}}</p>
      </div>
      <div class="lottery-list-item">
        <p>{{translate(63, lang)}}</p>
        <p>{{item.luckyNum}}</p>
      </div>
      <div class="lottery-list-item">
        <p>{{translate(64, lang)}}</p>
        <p>{{item.redeemNum}}</p>
      </div>
      <div class="lottery-list-item">
        <p>{{translate(65, lang)}}</p>
        <p>{{item.overTime}}</p>
      </div>
    </div> -->
    <ali-loading v-if="loadingStatus" :position="'fixed'"></ali-loading>
  </div>
</template>
<script>
import AliHead from '../../components/aliHead'
import {translate, reverseArr} from '../../config/util.js'
import urls from '../../config/urls.js'
import AliLoading from '../../components/aliLoading'
export default {
  data () {
    return {
      lotteryList: []
    }
  },
  components: {
    AliHead,
    AliLoading
  },
  created () {
    if (!this.userInfo) {
      this.$router.replace({path: '/'})
    } else {
      this.getAwardList()
    }
  },
  computed: {
    lang () {
      return this.$store.state.lang
    },
    userInfo () {
      return this.$store.state.userInfo
    },
    loadingStatus () {
      return this.$store.state.loadingStatus
    },
    baseUrl () {
      return this.$store.state.baseUrl
    }
  },
  methods: {
    translate (key, lang) {
      return translate(key, lang)
    },
    uploadAvatar () {
      let input = document.querySelector('.avatar-input')
      let formdata = new FormData()
      formdata.append('imgFile', input.files[0])
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.$axios.post(urls.uploadAvatar, formdata, config).then((res) => {
        this.imgSrc = this.baseUrl + res.data
        this.$toast({msg: translate(61, this.lang)})
        this.$axios.get(urls.userInfo).then((res) => {
          this.$store.dispatch('updateUserInfo', res.data)
        })
      })
    },
    getAwardList () {
      this.$store.dispatch('changeLoadingStatus', true)
      this.$axios.get(urls.awardList).then((res) => {
        let arr = reverseArr(res.data)
        arr.map((ele) => {
          let newObj = {}
          newObj.awardIndex = ele.awardIndex
          newObj.redeemNum = ele.redeemNum
          newObj.overTime = ele.overTime
          ele.luckyNumList.map((item) => {
            if (item.username === this.userInfo.username) {
              newObj.luckyNum = item.luckyNum
              this.lotteryList.push(newObj)
            }
          })
        })
        this.$store.dispatch('changeLoadingStatus', false)
      })
    }
  }
}
</script>
<style lang="scss">
@import '../../style/px2rem.scss';
.avatar-data {
  position: relative;
  width: px2rem(700);
  height: px2rem(200);
  margin: 0 auto;
  border-bottom: 1px solid #666;
  p {
    position: absolute;
    left: px2rem(10);
    height: px2rem(200);
    line-height: px2rem(200);
    font-size: px2rem(32)
  }
  img {
    position: absolute;
    right: px2rem(10);
    height: px2rem(180);
    width: px2rem(180);
  }
  input {
    position: absolute;
    left: 0;
    width: 100%;
    height: px2rem(200);
    opacity: 0;
    z-index: 1;
  }
}
.username-data {
  position: relative;
  width: px2rem(700);
  height: px2rem(100);
  line-height: px2rem(100);
  margin: 0 auto;
  border-bottom: 1px solid #666;
  p:nth-of-type(1) {
    position: absolute;
    left: px2rem(10);
    font-size: px2rem(32)
  }
  p:nth-of-type(2) {
    position: absolute;
    right: px2rem(10);
    font-size: px2rem(32)
  }
}
.lottery-data {
  position: relative;
  width: px2rem(700);
  height: px2rem(100);
  line-height: px2rem(100);
  margin: 0 auto;
  p:nth-of-type(1) {
    position: absolute;
    left: px2rem(10);
    font-size: px2rem(32)
  }
}
.profile {
  height: 100%;
}
</style>
