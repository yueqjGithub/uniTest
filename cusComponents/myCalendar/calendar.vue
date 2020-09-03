<template>
	<view class="calendar-contaienr"></view>
</template>

<script>
	export default {
		name: 'calendar',
		data () {
			return {
				year: '',
				month: '',
				date: '',
				week: '',
				now: '',
				weekList: [
					{ week: 1, name_cn: '周一' },
					{ week: 2, name_cn: '周二' },
					{ week: 3, name_cn: '周三' },
					{ week: 4, name_cn: '周四' },
					{ week: 5, name_cn: '周五' },
					{ week: 6, name_cn: '周六' },
					{ week: 7, name_cn: '周日' },
				]
			}
		},
		created () {
			this.setToday()
		},
		watch: {
			now (val) {
				this.year = val.getFullYear()
				this.month = val.getMonth() + 1
				this.date = val.getDate()
				this.week = val.getDay()
			}
		},
		computed: {
			monthList () { // 每月天数
				const list = [
					{ month: 1, days: 31 },
					{ month: 2, days: 28 },
					{ month: 3, days: 31 },
					{ month: 4, days: 30 },
					{ month: 5, days: 31 },
					{ month: 6, days: 30 },
					{ month: 7, days: 31 },
					{ month: 8, days: 31 },
					{ month: 9, days: 30 },
					{ month: 10, days: 31 },
					{ month: 11, days: 30 },
					{ month: 12, days: 31 }
				]
				if (vm.isLeapYear(vm.year)) {
					list[1].days = 29
				}
				return list
			},
			daysList () { // 要显示在页面上的日期列
				const vm = this
				const len = vm.monthList.find(item => item.month === vm.month) // 获得对应月份总天数
				let result = []
				for (let k in len) {
					const dayInfo = {
					}
				}
			}
		},
		methods: {
			isLeapYear (year) { // 判断是否是闰年
				let result = false
				const reason1 = (year % 4 === 0) && (year % 100 !== 0)
				const reason2 = (year % 100 === 0) && (year % 400 === 0)
				if (reason1 || reason2) {
					result = true
				}
				return result
			},
			setToday () {
				const vm = this
				vm.now = new Date()
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './calendar.scss';
</style>
