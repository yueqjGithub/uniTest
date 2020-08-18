import Vue from '../main.js'

export const changeLang = (state, payload) => { // 通过dispatch setLang，触发全局lang变更，并更改Vue._i18n
	Vue._i18n.locale = payload
	state.lang = payload
}

export const setEnTab = state => { // 变更菜单为非中文
	const messages = Vue._i18n.messages['en-US']
	uni.setTabBarItem({
		index: 0,
		text: messages.tab.about,
		pagePath: "pages/about/about",
		iconPath: "static/images/Money-line.png",
		selectedIconPath:"static/images/Money-fill.png"
	});
	uni.setTabBarItem({
		index: 1,
		text: messages.tab.home,
		pagePath: "pages/about/about",
		iconPath: "static/images/Home-line.png",
		selectedIconPath:"static/images/Home-fill.png"
	});
}

export const setZhTab = state => { // 变更为中文菜单
	const messages = Vue._i18n.messages['zh-CN']
	uni.setTabBarItem({
		index: 1,
		text: messages.tab.about,
		pagePath: "pages/about/about",
		iconPath: "static/images/Money-line.png",
		selectedIconPath:"static/images/Money-fill.png"
	});
	uni.setTabBarItem({
		index: 0,
		text: messages.tab.home,
		pagePath: "pages/about/about",
		iconPath: "static/images/Home-line.png",
		selectedIconPath:"static/images/Home-fill.png"
	});
}