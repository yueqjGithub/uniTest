import Vue from '../main.js'

export const setInviter = (state, payload) => { // 设置邀请者
	state.inviter = payload
}

export const changeLang = (state, payload) => { // 通过dispatch setLang，触发全局lang变更，并更改Vue._i18n
	Vue._i18n.locale = payload
	state.lang = payload
}

export const changeInitStatus = (state, payload) => {
	state.initSuc = payload
}

export const setCurAddress = (state, payload) => { // 设置当前编辑状态的收货地址
	state.curAddress = payload
}

export const setCurOrderNum = (state, payload) => { // 设置当前查看物流的订单号
	state.curOrderNumber = payload
}

export const setCurrentTrapOptions = (state, payload) => {
	state.trapSetting = payload
}

export const setCurTrap = (state, payload) => { // 设置当前选座的车次
	state.curTrap = payload
}

export const setCurSeat = (state, payload) => { // 设置当前选择的座位
	state.curSeat = payload
}