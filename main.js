import Vue from 'vue'
import App from './App'
import Store from './store'
import VueI18n from 'vue-i18n'
import { httpPost, httpGet } from 'service/http.js'
import './common.scss'
import en from './lang/en.js'
import zh from './lang/zh.js'
import uView from "uview-ui";
Vue.use(uView);
Vue.use(VueI18n) 

const i18n = new VueI18n({  
  locale: Store.state.lang,  
  messages: {  
    'en-US': en,
    'zh-CN': zh
  }  
})  

Vue.config.productionTip = false
Vue.prototype._i18n = i18n
Vue.prototype.$store = Store
Vue.prototype.$post = httpPost
Vue.prototype.$get = httpGet
App.mpType = 'app'

const app = new Vue({
	i18n,
	Store,
	...App
})
app.$mount()

export default app
