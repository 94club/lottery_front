<template>
  <div id="app" :style="{ position: appPosition, width: '100%', height: '100%'}">
    <router-view/>
  </div>
</template>
<script>
import urls from './config/urls.js'
export default {
  mounted () {
    let lang = window.localStorage.getItem('lang')
    if (lang) {
      this.$store.dispatch('updateLang', lang)
    }
    // 防止在其他页面刷新没数据
    let aliToken = window.localStorage.getItem('aliToken')
    if (aliToken) {
      this.getUserInfo()
    }
  },
  computed: {
    appPosition () {
      return this.$store.state.appPosition
    }
  },
  methods: {
    getUserInfo () {
      this.$axios.get(urls.userInfo).then((res) => {
        this.$store.dispatch('updateUserInfo', res.data)
      })
    }
  }
}
</script>

<style lang="scss">
@import './style/px2rem.scss';
@import './style/global.scss';
</style>
