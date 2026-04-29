<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<view class="swiper-item" style="text-align: center;">
					<image src="../../static/image/News/new1.jpg" mode="scaleToFil" style="width: 100%;"></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item" style="text-align: center;">
					<image src="../../static/image/News/new2.jpg" mode="scaleToFil" style="width: 100%;"></image>
				</view>
			</swiper-item>
		</swiper>
		<NewsMain></NewsMain>
	</view>
</template>

<script>
	import NewsMain from './NewsMain.vue'
	export default {
		components:{
			NewsMain
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		},
	}
</script>

<style lang="scss">
</style>
