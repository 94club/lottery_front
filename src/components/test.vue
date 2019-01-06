<template>
  <!-- <el-form class="login-form" ref="formInline" :model="formInline" label-width="80px" :rules="rules">
    <el-form-item label="用户名称">
      <el-input v-model="formInline.username"></el-input>
    </el-form-item>
    <el-form-item label="用户密码">
      <el-input type="password" @keyup.enter.native="submitForm('formInline')" v-model="formInline.password"></el-input>
    </el-form-item>
    <p>温馨提示：未注册过的账号，登录时将自动注册</p>
    <p>注册过的用户可凭账号密码登录</p>
    <el-button type="primary" @click="submitForm('formInline')">登录</el-button>
    <button @click="login">tokentest--登录</button>
    <button @click="getInfo">tokentest--用户信息</button>
    <button @click="logout">tokentest--登出</button>
  </el-form> -->
  <div>
    <star-rating :size= "size" :color= "color" :score= "score" :maxScore= "maxScore" :readOnly= "readOnly" @rate="rate"></star-rating>
    <span>{{score}}</span>
    <input type="text" v-model="msg">
    <button @click="send">发送</button>
    <canvas ref="canvas" class="canvas"></canvas>
  </div>
</template>

<script>
import urls from '../config/urls.js'
import StarRating from './starRating'
export default {
  data () {
    return {
      barrageList: [],
      canvasH: '',
      canvasW: '',
      msg: '',
      score: 4,
      color: '#f00',
      size: 1,
      timer: '',
      maxScore: 5,
      readOnly: false,
      formInline: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    StarRating
  },
  computed: {
    colorArr () {
      return this.getColor()
    },
    numArrL () {
      return this.getLeft()
    },
    numArrT () {
      return this.getTop()
    },
    speedArr () {
      return this.getSpeed()
    }
  },
  mounted () {
    let canvas = this.$refs.canvas
    this.canvasH = canvas.height
    this.canvasW = canvas.width
    let ctx = canvas.getContext('2d')
    // this.colorArr = this.getColor()
    // // get the initial left for all barrage
    // this.numArrL = this.getLeft()
    // // get the initial top for all barrage
    // this.numArrT = this.getTop()
    // // get speed of all barrage
    // this.speedArr = this.getSpeed()
    this.timer = setInterval(() => {
      ctx.clearRect(0, 0, this.canvasW, this.canvasH)
      ctx.save()
      if (this.barrageList.length > 0) {
        console.log()
        for (let j = 0; j < this.barrageList.length; j++) {
          this.numArrL[j] -= this.speedArr[j]
          ctx.fillStyle = this.colorArr[j]
          ctx.fillText(this.barrageList[j], this.numArrL[j], this.numArrT[j])
          ctx.restore()
        }
      }
    }, 30)
  },
  methods: {
    send () {
      if (this.msg) {
        this.barrageList.push(this.msg)
        this.msg = ''
      }
    },
    rate (val) {
      this.score = val
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.formInline.password = md5(md5('' + this.formInline.password).toUpperCase())
          this.formInline.username = this.formInline.username.trim()
          this.$axios.post(urls.login, this.formInline).then((res) => {
            this.$notify({
              title: '提示',
              message: '登录成功',
              type: 'success'
            })
            if (res.data.token) {
              localStorage.setItem('aliToken', res.data.token)
              this.$router.replace({path: '/main'})
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    login () {
      this.$axios.post('http://localhost:8001/api/login', this.formInline).then((res) => {
        if (res.data.token) {
          localStorage.setItem('aliToken', res.data.token)
        }
      })
    },
    logout () {
      this.$axios.post('http://localhost:8001/user/logout').then((res) => {
        localStorage.removeItem('aliToken')
      })
    },
    getInfo () {
      this.$axios.get('http://localhost:8001/user/info').then((res) => {
        console.log(res.data)
      })
    },
    getTop () {
      let len = this.barrageList.length
      let arr = new Array(len).fill(1)
      return arr.map(() => {
        let tagHeight = Math.random() * this.canvasH
        if (tagHeight < 0.2 * this.canvasH) {
          return 0.2 * this.canvasH
        }
        if (tagHeight > 0.8 * this.canvasH) {
          return 0.8 * this.canvasH
        }
        console.log(tagHeight)
        return tagHeight
      })
    },
    getLeft () {
      let width = this.canvasW
      let len = this.barrageList.length
      return new Array(len).fill(width)
    },
    getColor (color) {
      let len = this.barrageList.length
      // random color
      // the empty will skip，so fill 1 with the all array
      let arr = new Array(len).fill(1)
      return arr.map(() => {
        return '#' + Math.floor(Math.random() * 0xffffff).toString(16)
      })
    },
    getSpeed () {
      let len = this.barrageList.length
      // random speed
      let arr = new Array(len).fill(1)
      return arr.map(() => {
        return parseInt(Math.random() * 3)
      })
    }
  },
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>
<style>
.login-form{
  width: 400px;
  margin: 120px auto;
  padding: 20px;
  border-radius: 4px;
  text-align: center;
  background: #d9eaed;
}
p {
  font-size: 14px;
  line-height: 30px;
}
button {
  width: 100%;
}
.canvas {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  font-size: 24px;
}
</style>
