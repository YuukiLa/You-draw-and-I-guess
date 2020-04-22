import Vue from 'vue'
import Router from 'vue-router'
import ViewUI from 'iview'
import store from '../store'
Vue.use(Router)


const routes = [
	{
		path: '/',
		component: () => import('@/view/home/home')
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/view/login/login')
	},{
		path: '/room',
		name: 'room',
		component: () => import('@/view/room/room')
	},{
		path: '/game',
		name: 'game',
		component: () => import('@/view/game/game')
	},
]

const router = new Router({
  routes,
  mode: 'history'
})
router.beforeEach(async (to, from, next) => {
	ViewUI.LoadingBar.start()
	let token = localStorage.getItem("token")
	if(token) {
		if(to.name==='login') {
			next("/")
			return
		}
		if(!store.state.hasInfo) {
			await store.dispatch("getUserInfo")
		}
		next()
	}else {
		if (to.name === "login") {
			next()
			return
		}
		next({name: "login"})
		return
	}
})
router.afterEach(() => {
	ViewUI.LoadingBar.finish()
	document.documentElement.scrollTop = 0
	document.body.scrollTop = 0
	let layoutContent = document.querySelector('.h-layout-content')
	if (layoutContent) {
		layoutContent.scrollTop = 0
	}
})
export default router