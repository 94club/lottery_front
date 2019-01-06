// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Api from './util/axios'
import store from './store'
import VueLazyload from 'vue-lazyload'
import toastPlugin from './components/toast' // toast使用插件的形式
Vue.prototype.$axios = Api

Vue.config.productionTip = false
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/applogo.png'),
  loading: require('./assets/loading.gif'),
  attempt: 1
})
Vue.use(toastPlugin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
