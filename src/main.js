import Vue from 'vue'
import App from './App.vue'
import router from './routes/index.js'
import ViewUI from 'iview'
import 'iview/dist/styles/iview.css'
import request from './util/request'
import store from './store'
Vue.use(ViewUI)

Vue.config.productionTip = false
Vue.prototype.$ajax=request

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
