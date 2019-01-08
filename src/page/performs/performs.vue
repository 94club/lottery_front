<template>
  <div class="perform">
    <ali-head :pageTitle="translate(18, lang)" :showDrawer="true" :showPerformStatistics="userInfo.role===1"></ali-head>
    <div class="perform-data pt44 pb1" v-if="performList.length > 0">
      <div class="fix-img">
        <img src="../../../static/img/bg.png" alt="">
      </div>
      <div class="perform-item" v-for="(item, index) in performList" :key="index">
        <span class="trigle"></span>
        <span class="num">{{item.id}}</span>
        <p class="department">{{translate(96, lang)}}&nbsp;&nbsp;{{item.department}}</p>
        <p class="perform-name">{{translate(97, lang)}}&nbsp;&nbsp;{{item.performName}}</p>
        <p class="join-people">{{translate(98, lang)}}&nbsp;&nbsp;{{item.joinPeople}}</p>
        <span class="submit-mark" @click="commentByUser(item)">{{translate(79, lang)}}</span>
        <span class="comment-score" v-if="gradeDetailList[index] && gradeDetailList[index].score">{{translate(77, lang)}}&nbsp;&nbsp;{{gradeDetailList[index].score}}</span>
      </div>
    </div>
    <div class="comment-box" v-if="commentBoxShow">
      <div class="mask" @click="boxHide"></div>
      <div class="box-content">
        <div class="top-comment">{{translate(76, lang)}}{{performId}}{{translate(80, lang)}}</div>
        <star-rating :score= "score" :maxScore= "maxScore" @rate="rate"></star-rating>
        <div class="btn" @click="commitPerformComment">{{translate(79, lang)}}</div>
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
export default {
  data () {
    return {
      performList: [],
      gradeDetailList: [],
      score: 0,
      maxScore: 5,
      timer: '',
      lastId: '',
      performId: '',
      commentBoxShow: false
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
    },
    baseUrl () {
      return this.$store.state.baseUrl
    },
    danmuIn () {
      if (this.danmuInputShow) {
        return '0'
      } else {
        return '-100%'
      }
    },
    danmuOut () {
      if (this.danmuInputShow) {
        return '-100%'
      } else {
        return '0'
      }
    }
  },
  methods: {
    ...mapActions([
      'updateAppPosition',
      'changeLoadingStatus'
    ]),
    rate (val) {
      this.score = val
    },
    commentByUser (item) {
      this.performId = item.id
      this.commentBoxShow = true
      this.updateAppPosition('fixed')
    },
    boxHide () {
      this.commentBoxShow = false
      this.updateAppPosition('absolute')
    },
    translate (key, lang) {
      return translate(key, lang)
    },
    commitPerformComment () {
      if (this.score > 0) {
        this.changeLoadingStatus(true)
        this.$axios.post(urls.commitPerformComment, {id: this.performId, score: this.score}).then((res) => {
          this.$toast({msg: translate(102, this.lang)})
          this.score = 0
          this.boxHide()
          this.getPerformList()
        })
      } else {
        this.$toast({msg: translate(101, this.lang)})
      }
    },
    getPerformList () {
      this.gradeDetailList = []
      this.$axios.get(urls.getPerformList).then((res) => {
        this.performList = quickSort(res.data, true, 'id')
        // 构造自己的gradeDetailList
        this.performList.map((item) => {
          item.gradeDetailList.map((scoreItem) => {
            if (scoreItem.username === this.userInfo.username) {
              this.gradeDetailList.push({id: item.id, score: scoreItem.score})
            }
          })
        })
        let tempArr = []
        for (let i = 0; i < this.performList.length; i++) {
          for (let j = 0; j < this.gradeDetailList.length; j++) {
            if (this.gradeDetailList[j].id === this.performList[i].id) {
              tempArr[i] = {id: this.performList[i].id, score: this.gradeDetailList[j].score}
              break
            } else {
              tempArr[i] = {id: this.performList[i].id, score: 0}
            }
          }
        }
        this.gradeDetailList = tempArr
        this.changeLoadingStatus(false)
      })
    }
  }
}
</script>
<style lang="scss">
@import '../../style/px2rem.scss';
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
    animation: box2Show 1s ease;
    text-align: center;
    .top-comment {
      text-align: center;
      font-size: px2rem(32);
      color: #fff;
      height: px2rem(100);
      line-height: px2rem(100);
    }
    .top-img {
      margin-top: -3rem;
      img {
        width: 100%;
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
.perform-data {
  position: relative;
  .perform-item {
    position: relative;
    width: px2rem(700);
    margin: px2rem(20) auto 0;
    padding-bottom: px2rem(20);
    background: #fff;
     .trigle {
      position: absolute;
      z-index: 2;
      right: 0;
      top: 0;
      width: 0;
      height: 0;
      border-top: px2rem(150) solid #c59cf8;
      border-left: px2rem(150) solid transparent;
    }
    .num {
      position: absolute;
      z-index: 3;
      right: px2rem(30);
      top: px2rem(30);
      font-size: px2rem(28);
      color: #fff;
    }
    p {
      width: 80%;
      line-height: px2rem(60);
      padding-left: px2rem(40);
      color: #9f56f0;
      font-size: px2rem(30);
      span {
        margin: 0 px2rem(20) 0 px2rem(40);
      }
    }
    .mark{
      position: absolute;
      top: px2rem(200);
      .text {
        line-height: px2rem(60);
        font-size: px2rem(30);
        vertical-align: bottom;
        margin: 0 px2rem(20) 0 px2rem(40);
      }
    }
    .submit-mark {
      display: inline-block;
      width: px2rem(120);
      height: px2rem(56);
      margin-left: px2rem(40);
      line-height: px2rem(56);
      text-align: center;
      background: #ffd552;
      color: #fd8504;
      border-radius: px2rem(8);
      font-size: px2rem(26);
    }
    .comment-score {
      display: inline-block;
      margin-left: px2rem(40);
      font-size: px2rem(26);
      color: #9f56f0;
    }
  }
}

@keyframes box2Show {
  0% {
    top: 5%;
    opacity: 0.6;
  }
  100% {
    top: 10%;
    opacity: 1;
  }
}
</style>
