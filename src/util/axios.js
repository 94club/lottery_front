import axios from 'axios'
import store from '../store'
import router from '../router'
import Vue from 'vue'
import {devUrl, proUrl} from '../config/util'

const vueIns = new Vue()
const axiosIns = axios.create()
axiosIns.defaults.retry = 1
axiosIns.defaults.retryDelay = 1000
axiosIns.defaults.timeout = 20000

if (process.env.NODE_ENV === 'development') {
  axiosIns.defaults.baseURL = devUrl
} else {
  axiosIns.defaults.baseURL = proUrl
}
store.dispatch('updateBaseUrl', axiosIns.defaults.baseURL)
// 添加请求拦截器
axiosIns.interceptors.request.use(function (config) {
  const aliToken = window.localStorage.getItem('aliToken')
  if (aliToken) {
    /*
      此处有坑，在此记录
      config.headers['Authorization']
      必须通过此种形式设置Authorization,否则后端即使收到字段也会出现问题，返回401
      - config.headers.Authorization或 config.headers.authorization可以设置成功，
      浏览器查看也没有任何问题，但是在后端会报401并且后端一律只能拿到小写的，
      也就是res.headers.authorization，后端用大写获取会报undefined
    */
    config.headers['Authorization'] = `Bearer ${aliToken}`
  }
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 拦截响应，遇到token不合法则报错
axios.interceptors.response.use(
  response => {
    if (response.data.data.token) {
      console.log('token:', response.data.data.token)
      window.localStorage.setItem('ali_token', response.data.data.token)
    }
    return response
  },
  error => {
    const errRes = error.response
    if (errRes.status === 401) {
      window.localStorage.removeItem('ali_token')
      router.replace('/login')
      setTimeout(() => {
        window.location.reload()
      }, 0)
    }
    return Promise.reject(error.message) // 返回接口返回的错误信息
  }
)

const ajaxMethod = ['get', 'post']
const Api = {}
ajaxMethod.forEach((method) => {
  Api[method] = function (uri, data, config) {
    return new Promise(function (resolve, reject) {
      axiosIns[method](uri, data, config).then((response) => {
        if (response.data.status === 401) {
          store.dispatch('updateUserInfo', '')
          store.dispatch('changeLoadingStatus', false)
          vueIns.$toast({msg: '登录信息失效'})
          window.localStorage.removeItem('aliToken')
          router.push('/')
        } else if (response.data.status === 0 || response.data.status === 404) {
          vueIns.$toast({msg: response.data.message, visiable: false})
          store.dispatch('changeLoadingStatus', false)
        } else if (response.data.status === 200) {
          resolve(response.data)
        }
      }).catch(function (error) {
        console.log(error)
        store.dispatch('changeLoadingStatus', false)
        if (error.response) {
          // 请求已发出，但服务器响应的状态码不在 2xx 范围内
          // console.log(error.response.data)
          // console.log(error.response.status)
          // console.log(error.response.headers)
        } else {
          // console.log(error)
          // Something happened in setting up the request that triggered an Error
          // console.log('Error', error.message)
        }
        // console.log(error.config)
      })
    })
  }
})

export default Api
