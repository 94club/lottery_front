<template>
  <div class="award-page">
    <ali-head :showBack="true" :pageTitle="translate(20, lang)" :showDrawer="true"></ali-head>
    <div class="input-div">
      <cube-input
        v-model="awardObj.awardName"
        :clearable="true">
        <div slot="prepend">{{translate(21, lang)}}:</div>
      </cube-input>
      <cube-input
        v-model="awardObj.amount"
        :clearable="clearable">
        <div slot="prepend">{{translate(22, lang)}}:</div>
      </cube-input>
      <cube-input
        v-model="awardObj.des"
        :clearable="clearable">
        <div slot="prepend">{{translate(67, lang)}}：</div>
      </cube-input>
      <cube-button :inline="true"  :primary="true" @click="action">{{translate(23, lang)}}</cube-button>
    </div>
    <ali-loading v-if="loadingStatus" :position="'fixed'"></ali-loading>
  </div>
</template>
<script>
import urls from '../../config/urls.js'
import AliHead from '../../components/aliHead'
import AliLoading from '../../components/aliLoading'
import {translate} from '../../config/util.js'
export default {
  data () {
    return {
      awardObj: {},
      clearable: {
        visible: true,
        blurHidden: true,
        isOk: false,
        firstInfo: ''
      },
      imgFile: ''
    }
  },
  computed: {
    loadingStatus () {
      return this.$store.state.loadingStatus
    },
    lang () {
      return this.$store.state.lang
    }
  },
  methods: {
    translate (key, lang) {
      return translate(key, this.lang)
    },
    action (event) {
      if (!this.awardObj.awardName) {
        this.$toast({msg: translate(24, this.lang)})
        return
      }
      if (!this.awardObj.amount) {
        this.$toast({msg: translate(25, this.lang)})
        return
      }
      if (!this.awardObj.des) {
        this.$toast({msg: translate(68, this.lang)})
        return
      }
      this.$store.dispatch('changeLoadingStatus', true)
      this.$axios.post(urls.awardsAdd, this.awardObj).then((res) => {
        this.$store.dispatch('changeLoadingStatus', false)
        this.awardObj = {}
        this.$router.push({path: '/awardList'})
      })
    }
  },
  components: {
    AliHead,
    AliLoading
  }
}
</script>
<style>
@import '../../style/px2rem.scss';
.img-input {
  width: px2rem(700);
  height: px2rem(88);
}
</style>
