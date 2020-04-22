import Vue from 'vue'
import Vuex from 'vuex'
import request from '../util/request'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    hasInfo: false,
  },
  mutations: {
    set_user: (state, data) => {
      state.user = data
      state.hasInfo=true
    }
  },
  actions: {
    async getUserInfo(context, data) {
      request.get("/api/user/info").then(res=> {
        if(res.code===200) {
          context.commit("set_user",res.data)
        }else if(res.code==401) {
          localStorage.removeItem("token")
          window.location.href="/login"
        }
      })
    }
  },
  getters: {}
});
