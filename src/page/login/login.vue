<template>
  <div class="login-page">
    <ali-head :showBack="true" :pageTitle="translate(3, lang)"></ali-head>
    <div class="pt54" :style="{textAlign: 'center'}">
      <!-- <img src="../../../static/img/2019.png" alt=""> -->
    </div>
    <div class="fix-img">
      <img src="../../../static/img/bg.jpg" alt="">
    </div>
    <div class="input-div">
      <ali-input
        v-model="value"
        width="32rem"
        :placeholder="translate(6, lang)"
        :clearable="clearable">
        <span slot="prepend" class="prepend-span">{{translate(5, lang)}}</span>
      </ali-input>
      <div class="note">{{translate(7, lang)}}</div>
      <div class="submit-btn" @click="action">{{translate(8, lang)}}</div>
      <ali-loading v-if="loadingStatus" :position="'fixed'"></ali-loading>
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
  created () {
    if (!this.prePath) {
      this.$router.replace({path: '/'})
    }
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
    action () {
      if (!this.value) {
        this.$toast({msg: this.translate(9, this.lang)})
        return
      }
      // 登录，跳转
      if (this.value) {
        this.$store.dispatch('changeLoadingStatus', true)
        this.$axios.post(urls.login, {username: this.value.trim()}).then((res) => {
          if (res.data) {
            this.$store.dispatch('changeLoadingStatus', false)
            localStorage.setItem('aliToken', res.data)
            this.getUserInfo()
          }
        })
      } else {
        this.$toast({msg: this.translate(10, this.lang)})
      }
    },
    getUserInfo () {
      this.$axios.get(urls.userInfo).then((res) => {
        this.$store.dispatch('updateUserInfo', res.data)
        this.$router.replace({path: this.prePath})
      })
    }
  }
}
</script>
<style lang="scss">
@import '../../style/px2rem.scss';
.input-div {
  .note {
    width: px2rem(600);
    margin: 0 auto;
    color:#fff;;
    font-size: px2rem(24);
    height: px2rem(48);
    line-height: px2rem(48);
  }
}
</style>
