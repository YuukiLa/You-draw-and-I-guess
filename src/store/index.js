import Vue from 'vue'
import Vuex from 'vuex'
import request from '../util/request'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    hasInfo: false,
    gamer: [],
    ws:null,
    eventList:[]
  },
  mutations: {
    set_user: (state, data) => {
      state.user = data
      state.hasInfo=true
    },
    set_gamer: (state,data) => {
      state.gamer = data
    },
    init_ws: (state,data) => {
      let url = `${process.env["VUE_APP_BASE_WS"]}/ws?token=${encodeURIComponent(localStorage.getItem("token"))}`

      state.ws = new WebSocket(url)
      state.ws.onopen = function () {
        console.log("连接成功！")
        state.ws.send(JSON.stringify(data))
      }
      state.ws.onmessage=function (data) {
        console.log("ws接收！")
        console.log(data)
        if(data.data) {
          state.eventList.push(JSON.parse(data.data))
        }else {
          state.eventList.push({})
        }

      }
      state.ws.οnerrοr=function(e) { //错误
        console.log("ws错误!");
        console.log(e);
      }
      state.ws.onclose=function(e) { //关闭
        console.log("ws关闭！");
        console.log(e);
      }
    },
    send_ws: (state,data) => {
      state.ws.send(data)
    }
  },
  actions: {
    async getUserInfo(context, data) {
      await request.get("/api/user/info").then(res=> {
        if(res.code===200) {
          context.commit("set_user",res.data)
        }else if(res.code==401) {
          localStorage.removeItem("token")
          window.location.href="/login"
        }
      })
    },
    initWs(context,data) {
      context.commit("init_ws",data)
    },
    sendWs(context,data) {
      context.commit("send_ws",data)
    }
  },
  getters: {
    onEvent(state) {
      return function (method) {
        let index = state.eventList.map((eb) => {
          return eb.cmd
        }).indexOf(method);
        if (state.eventList.length > 0 && index >= 0) {
          let result = Object.assign({}, state.eventList[index]);
          state.eventList.splice(index, 1);
          return result;
        }

        return null;
      }
    },
    currUserName: (state) => (id) => {
      return state.gamer.find(item=> item.account===id).username
    }
  }
})
