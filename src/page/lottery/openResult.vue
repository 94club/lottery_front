<template>
  <div class="open-result">
    <ali-head :showBack="true" :pageTitle="translate(15, lang)" :showDrawer="true"></ali-head>
    <div class="lottery-list pt54" v-for="(item, index) in resultList" :key="index">
      <div class="lottery-list-item">
        <p>{{translate(62, lang)}}</p>
        <p>{{translate(43, lang)}}{{index + 1}}</p>
      </div>
      <div class="lottery-list-item">
        <p>{{translate(64, lang)}}</p>
        <p>{{item.redeemNum}}</p>
      </div>
      <div class="lottery-list-item">
        <p>{{translate(66, lang)}}</p>
        <p>{{item.owner}}</p>
      </div>
      <div class="lottery-list-item">
        <p>{{translate(65, lang)}}</p>
        <p>{{item.overTime}}</p>
      </div>
    </div>
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
      resultList: [{awardIndex: '0', redeemNum: 2, owner: 'alistar', overTime: '2018-11-12 15:15:15'}]
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
    getAwardList () {
      this.$store.dispatch('changeLoadingStatus', true)
      this.$axios.get(urls.awardList).then((res) => {
        let arr = reverseArr(res.data)
        arr.map((ele) => {
          if (ele.isOpenResultOver) {
            let newObj = {}
            newObj.awardIndex = ele.awardIndex
            newObj.redeemNum = ele.redeemNum
            newObj.overTime = ele.overTime
            newObj.owner = ele.owner
            this.resultList.push(newObj)
          }
        })
        this.$store.dispatch('changeLoadingStatus', false)
      })
    }
  }
}
</script>
