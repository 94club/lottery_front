<template>
  <div class="fashionset-page">
    <ali-head :showBack="true" :pageTitle="translate(71, lang)" :showDrawer="true"></ali-head>
    <div class="input-div pt54">
      <ali-input
        v-model="id"
        width="32rem"
        :placeholder="translate(72, lang)"
        :clearable="clearable">
      </ali-input>
      <ali-input
        v-model="status"
        width="32rem"
        :placeholder="'结束添加,1可以评论,2不可以评论'"
        :clearable="clearable">
      </ali-input>
      <div class="submit-btn" @click="action">{{translate(79, lang)}}</div>
    </div>
    <ali-loading v-if="loadingStatus" :position="'fixed'"></ali-loading>
  </div>
</template>
<script>
import urls from '../../config/urls.js'
import AliHead from '../../components/aliHead'
import AliInput from '../../components/aliInput'
import AliLoading from '../../components/aliLoading'
import {translate} from '../../config/util.js'
export default {
  data () {
    return {
      id: '',
      status: 2, // 1代表结束  2代表开启
      clearable: {
        visible: true,
        blurHidden: true,
        isOk: false,
        firstInfo: ''
      }
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
      // if (!this.id) {
      //   this.$toast({msg: '序号不能为空'})
      //   return
      // }
      if (this.id) {
        this.$store.dispatch('changeLoadingStatus', true)
        this.$axios.post(urls.fashionImgAdd, {id: parseInt(this.id)}).then((res) => {
          this.$store.dispatch('changeLoadingStatus', false)
          this.$router.go(-1)
        })
      } else {
        this.$store.dispatch('changeLoadingStatus', true)
        this.$axios.post(urls.changeCommentStatus, {status: this.status, id: 1}).then((res) => {
          this.$store.dispatch('changeLoadingStatus', false)
          this.$router.go(-1)
        })
      }
    }
  },
  components: {
    AliHead,
    AliLoading,
    AliInput
  }
}
</script>
<style>
