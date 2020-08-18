import Vuex from 'vuex'
import Vue from 'vue'
import state from './state.js'
import * as mutations from './mutations.js'
import * as actions from './actions.js'
Vue.use(Vuex)

const Store = new Vuex.Store({  
    state,  
    mutations,
		actions
})

export default Store