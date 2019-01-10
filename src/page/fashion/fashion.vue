<template>
  <div class="fashion">
    <ali-head :pageTitle="translate(54, lang)" :showDrawer="true" :showFashionStatistics="userInfo.role===1"></ali-head>
    <div class="img-data pt44" v-if="imgList.length > 0">
      <div class="img-item" v-for="(item, index) in imgList" :key="index">
        <input v-if="userInfo.role === 1" type="file" :class="'img-input' + index" @change="uploadFashionImg(item.id, index)">
        <span class="num">{{item.id}}号</span>
        <div class="trigle"></div>
        <img v-if="item.imgSrc" :src="item.imgSrc">
        <p v-if="userInfo.role === 1" class="top-center"><span class="iconfont icon-add"></span>{{translate(70, lang)}}</p>
      </div>
    </div>
    <div class="comment-img" @click="commentImg">
      <img src="../../../static/img/comment.png" alt="">
    </div>
    <div class="comment-box" v-if="commentBoxShow">
      <div class="mask" @click="boxHide"></div>
      <div class="box-content">
        <div class="top-img">
          <img src="../../../static/img/ctop.png" alt="">
        </div>
        <div class="middle" v-for="(item, index) in imgList" :key="index">
          <span class="comment-num">{{translate(87, lang)}}{{item.id}}:</span><input class="input-radio" type="radio" name="radio" :value="item.id" v-model="commentId">
        </div>
        <div class="btn" @click="commitFashionComment">{{translate(79, lang)}}</div>
      </div>
    </div>
    <ali-loading v-if="loadingStatus" :position="'fixed'"></ali-loading>
  </div>
</template>
<script>
import AliHead from '../../components/aliHead'
import {translate, quickSort} from '../../config/util.js'
import urls from '../../config/urls.js'
import AliLoading from '../../components/aliLoading'
import StarRating from '../../components/starRating'
import {mapActions} from 'vuex'
import canvasResize from 'canvas-resize'
export default {
  data () {
    return {
      imgList: [],
      commentBoxShow: false,
      commentId: ''
    }
  },
  components: {
    AliHead,
    AliLoading,
    StarRating
  },
  created () {
    if (!this.userInfo) {
      this.$router.replace({path: '/'})
    } else {
      this.getFashionImgList()
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
    ...mapActions([
      'changeLoadingStatus',
      'updateAppPosition',
      'updateUserInfo'
    ]),
    translate (key, lang) {
      return translate(key, lang)
    },
    uploadFashionImg (id, index) {
      this.changeLoadingStatus(true)
      let input = document.querySelector('.img-input' + index)
      let self = this
      canvasResize(input.files[0], {
        crop: false,
        quality: 0.9,
        rotate: 0,
        callback (baseStr) {
          self.$axios.post(urls.uploadBase64, {baseStr, id}).then((res) => {
            self.imgSrc = res.data
            self.$toast({msg: translate(61, self.lang)})
            self.getFashionImgList()
            this.changeLoadingStatus(false)
          })
        }
      })
      // let formdata = new FormData()
      // formdata.append('imgFile', input.files[0])
      // formdata.append('id', id)
      // let config = {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // }
      // this.$axios.post(urls.uploadFashionImg, formdata, config).then((res) => {
      //   this.imgSrc = this.baseUrl + res.data
      //   this.$toast({msg: translate(61, this.lang)})
      //   this.getFashionImgList()
      // })
    },
    boxHide () {
      this.commentBoxShow = false
      this.updateAppPosition('absolute')
    },
    commitFashionComment () {
      if (this.commentId > 0) {
        this.changeLoadingStatus(true)
        this.$axios.post(urls.commitFashionComment, {id: this.commentId}).then((res) => {
          this.$toast({msg: translate(102, this.lang)})
          this.boxHide()
          this.changeLoadingStatus(false)
          this.getUserInfo()
        })
      } else {
        this.$toast({msg: translate(94, this.lang)})
      }
    },
    getUserInfo () {
      this.$axios.get(urls.userInfo).then((res) => {
        this.updateUserInfo(res.data)
      })
    },
    getFashionImgList () {
      this.changeLoadingStatus(true)
      this.$axios.get(urls.getFashionImgList).then((res) => {
        this.changeLoadingStatus(false)
        this.imgList = quickSort(res.data, true, 'id')
      })
    },
    commentImg () {
      if (this.userInfo.hadFashionComment) {
        this.$toast({msg: translate(94, this.lang)})
      } else {
        this.changeLoadingStatus(true)
        this.$axios.get(urls.getCommentStatus + '?id=1').then((res) => {
          this.changeLoadingStatus(false)
          if (res.data.status === 1) {
            this.commentBoxShow = true
            this.updateAppPosition('fixed')
          } else {
            this.$toast({msg: translate(93, this.lang)})
          }
        })
      }
    }
  }
}
</script>
<style lang="scss">
@import '../../style/px2rem.scss';
.img-data {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding-bottom: 2rem
}
.img-item {
  position: relative;
  width: px2rem(350);
  height: px2rem(520);
  margin-top: px2rem(20);
  border: 1px solid #666;
  background: #fff;
  img {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: px2rem(520);
  }
  p {
    width: 100%;
    text-align: center;
    font-size: px2rem(28);
    span {
      font-size: px2rem(28);
      color:#666;
    }
  }
  .num {
    position: absolute;
    z-index: 3;
    left: px2rem(20);
    top: px2rem(20);
    font-size: px2rem(28);
    color: #fff;
  }
  .trigle {
    position: absolute;
    z-index: 2;
    left: 0;
    top: 0;
    width: 0;
    height: 0;
    border-top: px2rem(150) solid #c59cf8;
    border-right: px2rem(150) solid transparent;
  }
  .grade {
    position: absolute;
    left: px2rem(80);
    top: px2rem(20);
    font-size: px2rem(28)
  }
  input {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 1;
  }
  .comment-txt {
    position: absolute;
    z-index: 2;
    bottom: px2rem(10);
    right: px2rem(220);
    line-height: px2rem(80);
    font-size: px2rem(28);
  }
  .comment {
    position: absolute;
    z-index: 2;
    right: px2rem(10);
    bottom: px2rem(10);
    width: px2rem(200);
    height: px2rem(80);
    line-height: px2rem(80);
    font-size: px2rem(24);
    text-align: center;
    color: #fff;
    background: aqua;
  }
}
.comment-box {
  .box-content {
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 104;
    width: px2rem(632);
    border-radius: 4px;
    background: linear-gradient(0,#a779da,#ba91ea,#cfabfb);
    animation: boxShow 1s ease;
    text-align: center;
    .top {
      margin-top: -3rem;
      img {
        width: 100%;
      }
    }
    .middle {
      width: px2rem(600);
      height: px2rem(120);
      line-height: px2rem(120);
      margin: 0 auto;
      .comment-num {
        display: inline-block;
        width: px2rem(120);
        height: px2rem(60);
        line-height: px2rem(60);
        vertical-align: sub;
        text-align: right;
        margin-right: px2rem(40);
        color: #fff;
        font-size: px2rem(32);
      }
    }
    .btn {
      width: px2rem(400);
      height: px2rem(80);
      margin: px2rem(20) auto px2rem(60);
      line-height: px2rem(80);
      font-size: px2rem(28);
      background: linear-gradient(0,#f0e82d,#f6f25f,#fdfd9a);
      color: #fd8504;
      border-radius: px2rem(8);
    }
  }
}
@keyframes boxShow {
  0% {
    top: 5%;
    opacity: 0.6;
  }
  100% {
    top: 10%;
    opacity: 1;
  }
}
.comment-img {
  position: fixed;
  z-index: 2;
  bottom: px2rem(100);
  right: px2rem(0);
  img {
    width: 9rem;
  }
}
.fashion {
  width: 100%;
  min-height: 100%;
  background: linear-gradient(0,#a9acdd,#cba2c8,#aa93cd);
}
.input-radio {
  width: px2rem(60);
  height: px2rem(60);
  line-height: px2rem(120);
  vertical-align: middle;
}
</style>
