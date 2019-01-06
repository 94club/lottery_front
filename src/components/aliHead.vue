<template>
  <div class="top-head">
    <slot name="leftInfo" />
    <div v-if="showBack" class="back" @click="goBack"><span class="iconfont icon-left top-center">{{translate(4, lang)}}</span></div>
    <div v-if="showFashionStatistics" class="statistic" @click="goFashionStatistics">{{translate(75, lang)}}</div>
    <div v-if="showPerformStatistics" class="statistic" @click="goPerformStatistics">{{translate(75, lang)}}</div>
    <div v-if="pageTitle" class="title">{{pageTitle}}</div>
    <div class="lang-select top-center" v-show="langShow" @click="changeLang">
      <span v-if="lang==='cn'">cn</span>
      <span v-else>en</span>
      <span class="iconfont icon-bottom"></span>
    </div>
    <div v-if="showDrawer" class="drawer" :class="aliDrawerShow ? 'rollIn': 'rollOut'"><span class="iconfont icon-drawer"  @click="drawerClick"></span></div>
    <div class="drawer-mask" v-show="aliDrawerShow" @click="drawerClick"></div>
    <div class="drawer-content" :class="aliDrawerShow ? 'r0': ''">
      <div class="drawer-item ellipsis">{{userInfo.username}}</div>
      <div class="drawer-item ellipsis" :class="slectedIndex === 11 ? 'selected': ''" v-if="userInfo && userInfo.role === 1" @click="action('fashionImgSet')">{{translate(71, lang)}}</div>
      <div class="drawer-item ellipsis" :class="slectedIndex === index ? 'selected': ''" v-for="(item, index) in drawerItemList" :key="index" @click="action(index)">{{translate(item.key, lang)}}</div>
    </div>
  </div>
</template>
<script>
import {translate} from '../config/util.js'
import AliDrawer from './aliDrawer'
import urls from '../config/urls.js'
export default {
  data () {
    return {
      aliDrawerShow: false,
      drawerItemList: [
        // {
        //   key: 14
        // },
        // {
        //   key: 17
        // },
        {
          key: 54
        },
        {
          key: 18
        },
        {
          key: 19
        }
      ]
    }
  },
  components: {
    AliDrawer
  },
  props: {
    langShow: {
      type: Boolean,
      default () {
        return false
      }
    },
    pageTitle: {
      type: String,
      default () {
        return ''
      }
    },
    showBack: {
      type: Boolean,
      default () {
        return false
      }
    },
    showDrawer: {
      type: Boolean,
      default () {
        return false
      }
    },
    showFashionStatistics: {
      type: Boolean,
      default () {
        return false
      }
    },
    showPerformStatistics: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    changeLang () {
      this.cnShow = !this.cnShow
      let lang
      if (this.cnShow) {
        lang = 'cn'
        this.$emit('onLangChange', 'cn')
      } else {
        lang = 'en'
        this.$emit('onLangChange', 'en')
      }
      window.localStorage.setItem('lang', lang)
    },
    goFashionStatistics () {
      this.$router.push({path: '/fashionStatistic'})
    },
    goPerformStatistics () {
      this.$router.push({path: '/performStatistic'})
    },
    translate (key, lang) {
      return translate(key, lang)
    },
    drawerClick () {
      this.aliDrawerShow = !this.aliDrawerShow
    },
    action (index) {
      switch (index) {
        case 'awardSet':
          this.$router.push({path: '/awardSet'})
          break
        case 'fashionImgSet':
          this.$router.push({path: '/fashionImgSet'})
          break
        // case 0:
        //   this.$router.push({path: '/profile'})
        //   break
        // case 1:
        //   this.$router.push({path: '/join'})
        //   break
        case 0:
          this.$router.push({path: '/fashion'})
          break
        case 1:
          this.$router.push({path: '/performs'})
          break
        case 2:
          this.$axios.post(urls.logout).then((res) => {
            localStorage.removeItem('aliToken')
            this.$store.dispatch('updateUserInfo', '')
            this.$router.replace({path: '/'})
          })
          break
      }
    }
  },
  computed: {
    lang () {
      return this.$store.state.lang
    },
    userInfo () {
      return this.$store.state.userInfo
    },
    slectedIndex () {
      if (this.$route.path === '/fashion') {
        return 0
      }
      if (this.$route.path === '/performs') {
        return 1
      }
      return 11
    }
  }
}
</script>
<style lang="scss">
@import '../style/px2rem.scss';
.top-head {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: px2rem(88);
  line-height: px2rem(88);
  font-size: px2rem(28);
  background: #b280ea;
  .title {
    text-align: center;
    font-size: px2rem(36);
    color:#fff;
  }
  .back {
    .icon-left {
      padding: 0 px2rem(14);
      color:#fff;
      font-size: px2rem(28);
    }
  }
  .statistic {
    position: absolute;
    left: px2rem(20);
    color:#fff;
  }
  .drawer {
    position: absolute;
    right: 0;
    top: 0;
    transform-origin:center 50%;
    transition: transform 1s;
    .icon-drawer {
      padding: 0 px2rem(24);
      color:#fff;
      font-size: px2rem(38)
    }
  }
  .rollIn {
    transform: rotate(90deg);
  }
  .rollOut {
    transform: rotate(0);
  }
}
.drawer-mask {
  position: fixed;
  top: px2rem(88);
  z-index: 99;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.6);
}
.drawer-content {
  position: fixed;
  top: px2rem(88);
  z-index: 100;
  right: - px2rem(220);
  width: px2rem(220);
  height: 100%;
  text-align: center;
  background: url('/static/img/right.png') repeat-y;
  transition: right 1s;
  color: #fff;
}
.r0 {
  right: 0
}
.lang-select {
  right: 0;
  width: px2rem(100);
  text-align: center;
  font-size: px2rem(26);
  color:#fff;
}
.selected {
  color: #311650;
}
</style>
