<template>
  <div class="join">
    <ali-head :showBack="true" :pageTitle="translate(69, lang)" :showDrawer="true"></ali-head>
    <div class="avatar pt54">
      <div class="avatar-item" v-for="(item, index) in avatarList" :key="index">
        <img :src="baseUrl + item.avatar">
        <p class="ellipsis">{{item.username}}</p>
      </div>
    </div>
    <ali-loading v-if="loadingStatus" :position="'fixed'"></ali-loading>
  </div>
</template>
<script>
import AliHead from '../../components/aliHead'
import {translate} from '../../config/util.js'
import urls from '../../config/urls.js'
import AliLoading from '../../components/aliLoading'
export default {
  data () {
    return {
      avatarList: []
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
      this.getAvatarList()
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
    getAvatarList () {
      this.$store.dispatch('changeLoadingStatus', true)
      this.$axios.get(urls.getAllUser).then((res) => {
        this.avatarList = res.data
        this.$store.dispatch('changeLoadingStatus', false)
      })
    }
  }
}
</script>
<style lang="scss">
@import '../../style/px2rem.scss';
.avatar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: px2rem(700);
  margin: 0 auto;
  .avatar-item {
    width: px2rem(180);
    img {
      width: px2rem(180);
      height: px2rem(180);
    }
    p {
      font-size: px2rem(28);
      line-height: px2rem(60);
      text-align: center;
    }
  }
}
</style>
