<template>
	<view class="calendar-contaienr border-box">
		<view class="calendar-name text-18 text-center">{{name}}</view>
		<view class="title-show flex-row flex-jst-btw flex-ali-center ma-col-md">
			<button type="default" class="plain-btn" @click="reduceMonth">
				<u-icon name="weibiaoti--11" custom-prefix="iconfont" size="34" class="text-grey-1"></u-icon>
			</button>
			<view class="text-18 text-bold text-primary">
				<text>{{year}}</text>
				<text>-</text>
				<text>{{month > 9 ? month : `0${month}`}}</text>
			</view>
			<button type="default" class="plain-btn" @click="addMonth">
				<u-icon name="weibiaoti--11" custom-prefix="iconfont" size="34" class="text-grey-1 trans-icon"></u-icon>
			</button>
		</view>
		<view class="week-show flex-row flex-nowrap flex-jst-btw flex-ali-center">
			<text class="text-12 text-grey flex-1 text-center" v-for="k in weekList" :key="k.week">{{k.name}}</text>
		</view>
		<view class="days-show flex-row flex-wrap flex-jst-start flex-ali-start ma-col-md">
			<view v-for="(k,idx) in daysList" :key="idx" :class="k.isInMonth ? 'self-day' : 'out-month'" class="day-item">
				<view
					class="days-container flex-row flex-jst-center flex-ali-center"
					v-if="k.isInMonth" @click="chooseDays(k)"
					:class="{'is-btw': k.isBetween, 'choosed': k.date === choose.date && k.month === choose.month}">
					{{k.date}}
				</view>
			</view>
		</view>
		<!-- 确认按钮 -->
		<view class="width-80 flex-row flex-jst-center flex-ali-center btn-container">
			<button type="default" class="my-btn-primary text-white" @click="subDays">{{btnText}}</button>
		</view>
	</view>
</template>
 
<script>
	import dayjs from 'dayjs'
	const isBetween = require('dayjs/plugin/isBetween')
	dayjs.extend(isBetween)
	export default {
		name: 'calendar',
		props: {
			formatValue: { // 获取最终值的format格式
				type: String,
				default: 'YYYY-MM-DD'
			},
			name: { // 标题名字
				default: '日期选择'
			},
			btnText: { // 确认按钮文字
				default: '确认'
			},
			weekNames: { // 周末到周六的每一天的名称
				type: Array,
				default: function () {
					return []
				}
			},
			startDate: { // 可选时间范围
				default: function () {
					return dayjs().format('YYYY/MM/DD')
				}
			},
			endDate: { // 可选时间范围结束
				default: function () {
					return dayjs().add(30,'day').format('YYYY/MM/DD')
				}
			}
		},
		data () {
			return {
				year: '',
				month: '',
				date: '',
				week: '',
				now: '',
				choose: '',
				weekList: [
					{ week: 0, name: '周日' },
					{ week: 1, name: '周一' },
					{ week: 2, name: '周二' },
					{ week: 3, name: '周三' },
					{ week: 4, name: '周四' },
					{ week: 5, name: '周五' },
					{ week: 6, name: '周六' }
				]
			}
		},
		created () {
			this.setToday()
			this.compareDays()
			if (this.weekNames.length === 7) {
				this.weekList.forEach((item, idx) => {
					item.name = this.weekNames[idx]
				})
			}
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
				const vm = this
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
				let result = []
				if (vm.month) {
					const len = vm.monthList.find(item => item.month === vm.month).days // 获得对应月份总天数
					const arr = [1,2,3]
					for (let k=1;k<=len;k++) {
						const dayInfo = {
							year: vm.year,
							month: vm.month,
							date: k,
							week: new Date(`${vm.year}/${vm.month}/${k}`).getDay(),
							isInMonth: true, // 是否是当月内
							isBetween: vm.compareDays(dayjs(`${vm.year}/${vm.month}/${k}`))
						}
						result.push(dayInfo)
					}
					// 月前补足
					const start = result[0].week
					for (let k=0;k<start;k++) {
						result.unshift({isInMonth: false})
					}
				}
				return result
			}
		},
		methods: {
			chooseDays (target) { // 点击日期
				if (target.isBetween) {
					this.choose = target
				}
			},
			subDays () { // 提交日期
				const str = `${this.choose.year}/${this.choose.month}/${this.choose.date}`
				this.$emit('choose', dayjs(str).format(this.formatValue))
			},
			compareDays (day) {
				const vm = this
				return dayjs(day).isBetween(dayjs(vm.startDate), dayjs(vm.endDate), null, '[]')
			},
			isLeapYear (year) { // 判断是否是闰年
				let result = false
				const reason1 = (year % 4 === 0) && (year % 100 !== 0)
				const reason2 = (year % 100 === 0) && (year % 400 === 0)
				if (reason1 || reason2) {
					result = true
				}
				return result
			},
			setToday () { // init设置当前日
				const vm = this
				vm.now = new Date()
				vm.choose = {
					year: vm.now.getFullYear(),
					month: vm.now.getMonth() + 1,
					date: vm.now.getDate(),
					week: vm.now.getDay(),
					isInMonth: true // 是否是当月内
				}
			},
			reduceMonth () { // 月份前推
				if (this.month !== 1) {
					this.month--
				} else {
					this.month = 12
					this.year--
				}
			},
			addMonth () { // 月份后推
				if (this.month !== 12) {
					this.month++
				} else {
					this.month = 1
					this.year++
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './calendar.scss';
</style>
