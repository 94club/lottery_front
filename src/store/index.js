import Vue from 'vue'
import Vuex from 'vuex'
// import * as types from './types'

Vue.use(Vuex)

const state = {
  userInfo: '',
  loadingStatus: false,
  staffArr: '',
  actionFromPath: '',
  pageIndex: 0,
  pageSize: 15,
  lang: 'cn',
  appPosition: 'absolute',
  baseUrl: ''
}

const getters = {}

const actions = {
  updateStaffArr ({commit}, data) {
    commit('updateStaffArr', data)
  },
  updateUserInfo ({commit}, data) {
    commit('updateUserInfo', data)
  },
  updateAppPosition ({commit}, data) {
    commit('updateAppPosition', data)
  },
  changeLoadingStatus ({commit}, data) {
    commit('changeLoadingStatus', data)
  },
  actionFromPath ({commit}, data) {
    commit('actionFromPath', data)
  },
  updateLang ({commit}, data) {
    commit('updateLang', data)
  },
  updateBaseUrl ({commit}, data) {
    commit('updateBaseUrl', data)
  }
}

const mutations = {
  'updateBaseUrl': (state, data) => {
    state.baseUrl = data
  },
  'updateStaffArr': (state, data) => {
    state.staffArr = data
  },
  // [mutation] (state, data) {} 两种写法
  'updateUserInfo': (state, data) => {
    state.userInfo = data
  },
  'updateAppPosition': (state, data) => {
    state.appPosition = data
  },
  'changeLoadingStatus': (state, data) => {
    state.loadingStatus = data
  },
  'actionFromPath': (state, data) => {
    state.actionFromPath = data
  },
  'updateLang': (state, data) => {
    state.lang = data
  }
}
// store.state.moduleFoot.state
const moduleAward = {
  state: {
    awardItemInfo: ''
  },
  actions: {
    // {state, commit, tooeState} = context
    updateAwardItemInfo ({commit}, data) {
      commit('updateAwardItemInfo', data)
    }
  },
  mutations: {
    'updateAwardItemInfo': (state, data) => {
      state.awardItemInfo = data
    }
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    moduleAward: moduleAward
  }
})
