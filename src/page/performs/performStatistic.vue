<template>
  <div class="fashionstatistic-page">
    <ali-head :showBack="true" :pageTitle="translate(82, lang)" :showDrawer="true"></ali-head>
    <scroller :on-refresh="refresh">
      <div class="interval"></div>
      <div class="result-text">
        <p class="title">{{translate(83, lang)}}</p>
        <p class="title">{{translate(103, lang)}}</p>
        <p class="title">{{translate(84, lang)}}</p>
      </div>
      <div class="result-text" v-for="(item, index) in resultList" :key="index">
        <p class="text">{{index + 1}}</p>
        <p class="text">{{item.id}}</p>
        <p class="text">{{item.score}}</p>
      </div>
    </scroller>
    <ali-loading v-if="loadingStatus" :position="'fixed'"></ali-loading>
  </div>
</template>
<script>
import AliHead from '../../components/aliHead'
import {translate, quickSort} from '../../config/util.js'
import Scroller from '../../components/scroll/components/Scroller'
import urls from '../../config/urls.js'
import AliLoading from '../../components/aliLoading'
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      resultList: []
    }
  },
  components: {
    AliHead,
    AliLoading,
    Scroller
  },
  created () {
    if (!this.userInfo) {
      this.$router.replace({path: '/'})
    } else {
      this.changeLoadingStatus(true)
      this.getPerformList()
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
    }
  },
  methods: {
    ...mapActions([
      'changeLoadingStatus'
    ]),
    translate (key, lang) {
      return translate(key, lang)
    },
    refresh (fn) {
      this.getFashionImgList(fn)
    },
    getPerformList (fn) {
      setTimeout(() => {
        if (fn) fn() // 取消loading
      }, 2000)
      this.resultList = []
      this.$axios.get(urls.getPerformList).then((res) => {
        this.performList = quickSort(res.data, true, 'id')
        // 构造自己的gradeDetailList
        this.performList.map((item) => {
          let score = 0
          item.gradeDetailList.map((scoreItem) => {
            score += scoreItem.score
          })
          this.resultList.push({id: item.id, score})
        })
        this.resultList = quickSort(this.resultList, false, 'score')
        this.changeLoadingStatus(false)
      })
    }
  }
}
</script>
<style lang="scss">
@import '../../style/px2rem.scss';
.result-text {
  display: flex;
  justify-content: space-around;
  width: px2rem(640);
  margin: 0 auto;
  border-bottom: 1px solid #999;
  p {
    width: px2rem(200);
    line-height: px2rem(60);
    text-align: center;
  }
  .text {
    font-size: px2rem(24);
  }
  .title {
    font-size: px2rem(26);
    font-weight: bold;
  }
}
.statistic-data {
  background: linear-gradient(-45deg,#a9acdd,#cba2c8,#aa93cd);
  .statistic-item {
    width: px2rem(690)!important;
    margin-left: px2rem(30);
    background: #fff;
    .result-text:last-child {
      border: none;
    }
  }
}

</style>
