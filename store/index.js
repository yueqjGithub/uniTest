import Vuex from 'vuex'
import Vue from 'vue'
import state from './state.js'
import * as mutations from './mutations.js'
Vue.use(Vuex)

const Store = new Vuex.Store({  
    state,  
    mutations
})

export default Store