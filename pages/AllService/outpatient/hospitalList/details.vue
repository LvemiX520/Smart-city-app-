<template>
	<view class="swiper">
		<view class="u-demo-area">
			<swiper class="lbt" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item v-for="item in lbt.list">
					<image class="img" :src="ip+item.imgUrl" mode=""></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="message-box">	
		<!-- <rich-text :nodes="message.list.brief"></rich-text> -->
		<text>{{message.list.data.brief}}</text>
		</view>
		<button type="primary" @click="interCard()">预约挂号</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ip: 'http://10.20.18.2:10001',
				lbt: {
					list: [{}],
				},
				id: '',
				message:{
					list:[{}]
				},
			}
		},
		methods: {
			getLbt() {
				uni.request({
					url: this.ip + '/prod-api/api/hospital/banner/list?hospitalId=' + this.id,
					success: (res) => {
						// console.log(res.data.data);
						this.lbt.list = res.data.data
					}
				})
			},
			getMessage() {
				uni.request({
					url: this.ip + '/prod-api/api/hospital/hospital/' + this.id,
					success: (res) => {
						console.log(res.data);
						this.message.list = res.data 
						// console.log(this.message.list);
						
					}
				})
				 
			},
			interCard(){
				uni.navigateTo({
					url:'./card'
				})
			}
		},
		onLoad(e) {
			this.id = e.id
			// console.log(e);
			this.getLbt()
			this.getMessage()
		},
	}
</script>

<style lang="scss">
	.lbt {
		width: 80%;
		height: 280rpx;
		border-radius: 15rpx;
		margin: 30rpx auto;
		overflow: hidden;

		img {
			width: 100%;
			height: 100%;
		}
	}
	.message-box {
		width: 95%;
		border-radius: 15rpx;
		box-shadow: 1rpx 1rpx 2rpx 2rpx #a7a7a7;
		margin: auto;
		font-size: 35rpx;
		text-indent: 2em;
		padding: 20rpx;
		font-weight: 300;
	}
	button {
		width: 90%;
		height: 90rpx;
		margin-top: 30rpx;
		border-radius: 50rpx;
	}
</style>