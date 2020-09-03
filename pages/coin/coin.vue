<template>
	<view class="bg-grey">
		<u-popup v-model="show" mode="bottom" :closeable="false">
			<cus-calendar
			></cus-calendar>
		</u-popup>
		<cus-tabbar></cus-tabbar>
	</view>
</template>

<script>
	import cusCalendar from '@/cusComponents/myCalendar/calendar.vue'
	import cusTabbar from '../../components/cus-tabbar/cusTabbar.vue'
	export default {
		name: 'coin',
		components: {
			cusTabbar,
			cusCalendar
		},
		data() {
			return {
				show: true
			}
		},
		methods: {
		}
	}
</script>

<style>

</style>
