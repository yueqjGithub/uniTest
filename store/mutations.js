import Vue from '../main.js'

export const changeLang = (state, payload) => { // 通过dispatch setLang，触发全局lang变更，并更改Vue._i18n
	Vue._i18n.locale = payload
	state.lang = payload
}

export const changeInitStatus = (state, payload) => {
	state.initSuc = payload
}