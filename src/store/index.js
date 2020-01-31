import Vue from 'vue'
import Vuex from 'vuex'
import decodeJwt from 'jwt-decode'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getItem('token') // token存储
  },
  mutations: {
    setToken (state, data) {
      if (data && data.token) {
        data.id = decodeJwt(data.token).user_id
      }
      state.token = data
      // 单纯的设置token一旦刷新就没了，要想持久化就要储存到本地
      setItem('token', state.token)
    }
  },
  actions: {
  },
  modules: {
  }
})
