<template>
  <div class="chat">
    <ali-head :pageTitle="translate(104, lang)" :showDrawer="true"></ali-head>
    <div class="danmu">
      <input class="danmu-text" type="text" placeholder="say something" v-model="danmu">
      <span class="danmu-btn" @click="sendBarrage">{{translate(88, lang)}}</span>
    </div>
    <danmu
      :barrageList = "barrageList"
      :loop = "barrageLoop"
      @barrageHide="barrageHide">
    </danmu>
  </div>
</template>
<script>
import AliHead from '../../components/aliHead'
import Danmu from '../../components/danmu'
import {translate} from '../../config/util.js'
import urls from '../../config/urls.js'
export default {
  data () {
    return {
      danmu: '',
      barrageList: [],
      barrageLoop: false,
      timer: '',
      lastId: '',
      canDanmu: true
    }
  },
  components: {
    AliHead,
    Danmu
  },
  created () {
    if (!this.userInfo) {
      this.$router.replace({path: '/'})
    } else {
      this.timer = setInterval(() => {
        this.getBarrage()
      }, 1000 * 3)
      this.getBarrage()
    }
  },
  destroyed () {
    clearInterval(this.timer)
  },
  computed: {
    lang () {
      return this.$store.state.lang
    },
    userInfo () {
      return this.$store.state.userInfo
    },
    baseUrl () {
      return this.$store.state.baseUrl
    }
  },
  methods: {
    sendBarrage () {
      if (this.canDanmu) {
        this.$axios.post(urls.addDanmu, {msg: this.danmu}).then((res) => {
          this.canDanmu = false
          this.danmu = ''
          this.lastId = res.data
          setTimeout(() => {
            this.canDanmu = true
          }, 1000 * 10)
        })
      } else {
        this.$toast({msg: translate(100, this.lang)})
      }
    },
    getBarrage () {
      this.$axios.get(urls.getDanmuList).then((res) => {
        let newInfo = res.data
        if (newInfo.length > 0) {
          newInfo.map((item) => {
            if (item.status === 0) {
              this.barrageList.unshift(item)
            }
          })
        }
      })
    },
    barrageHide () {
      if (this.lastId) {
        this.$axios.post(urls.changeDanmuStatus, {id: this.lastId}).then(() => {})
      }
    },
    translate (key, lang) {
      return translate(key, lang)
    }
  }
}
</script>
<style lang="scss">
@import '../../style/px2rem.scss';
.danmu-out-btn {
  position: fixed;
  top: 9rem;
  width: 9rem;
  z-index: 8;
  right: px2rem(20);
  transition: right 1s;
}
.danmu {
  position: fixed;
  top: 4.4rem;
  z-index: 6;
  display: flex;
  width: 100%;
  background: #fff;
  padding: px2rem(20) 0;
  margin: 0 auto;
  justify-content: space-around;
  transition: left 1s;
  &-text {
    flex: 1;
    height: px2rem(88);
    font-size: px2rem(32);
    padding-left: px2rem(20);
    margin-left: px2rem(10);
    border-radius: px2rem(8);
    border: 1px solid #666;
    box-sizing: border-box;
  }
  &-btn {
    width: px2rem(100);
    height: px2rem(88);
    line-height: px2rem(88);
    margin: 0 px2rem(10);
    text-align: center;
    border-radius: px2rem(8);
    border: 1px solid #999;
    box-sizing: border-box;
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
.chat {
  width: 100%;
  height: 100%;
  background: url('../../../static/img/chat.jpg') no-repeat center top;
  background-size: cover;
}
</style>
