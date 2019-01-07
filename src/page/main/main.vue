<template>
  <div class="main-page">
    <ali-head :langShow="true" :pageTitle="translate(91, lang)" @onLangChange="onLangChange"></ali-head>
    <div class="fix-img">
      <img src="../../../static/img/bg.png" alt="">
    </div>
    <div class="pt44" :style="{textAlign: 'center'}">
      <img :style="{width: '18rem', height: '18rem'}" src="../../../static/img/nianhui.png">
    </div>
    <div class="submit-btn" @click="action('fashion')">{{translate(54, lang)}}</div>
    <div class="submit-btn" @click="action('performs')">{{translate(2, lang)}}</div>
  </div>
</template>
<script>
import {translate} from '../../config/util.js'
import AliHead from '../../components/aliHead'
export default {
  data () {
    return {
    }
  },
  components: {
    AliHead
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    },
    lang () {
      return this.$store.state.lang
    }
  },
  methods: {
    translate (key, lang) {
      return translate(key, lang)
    },
    onLangChange (val) {
      this.$store.dispatch('updateLang', val)
    },
    action (flag) {
      window.localStorage.setItem('lang', this.lang)
      this.$store.dispatch('updateLang', this.lang)
      if (this.userInfo) {
        if (flag === 'performs') {
          this.$router.push({path: '/performs'})
        }
        if (flag === 'fashion') {
          this.$router.push({path: '/fashion'})
        }
      } else {
        if (flag === 'performs') {
          this.$store.dispatch('actionFromPath', '/performs')
        }
        if (flag === 'fashion') {
          this.$store.dispatch('actionFromPath', '/fashion')
        }
        this.$router.push({path: '/login'})
      }
    }
  }
}
</script>
