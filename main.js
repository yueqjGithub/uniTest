import Vue from 'vue'
import App from './App'
import Store from './store'
import { httpPost, httpGet } from 'service/http.js'
import './common.scss'

Vue.config.productionTip = false
Vue.prototype.$store = Store
Vue.prototype.$post = httpPost
Vue.prototype.$get = httpGet
App.mpType = 'app'

const app = new Vue({
	Store,
	...App
})
app.$mount()
