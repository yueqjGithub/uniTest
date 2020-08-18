export const setLang = (context, payload) => { // 变更语言
	context.commit('changeLang')
	if (payload === 'en-US') {
		context.commit('setEnTab')
	} else {
		context.commit('setZhTab')
	}
}