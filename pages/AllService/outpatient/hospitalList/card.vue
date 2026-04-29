<template>
	<view>
		<view class="u-card">
			<image src="" mode=""></image>
			<view class="content">
				<text>111</text>
				<view class="message-box" @click="order()">
					<view>
						<text>身份证号:888888888888888888</text>
					</view>
					<view>
						<text>手机号:11111111111</text>
					</view>
				</view>
			</view>
			<u-icon class="icon" name="setting-fill" size="50" color="#7891ff"></u-icon>
		</view>
		<view class="box">
			<view class="add" @click="enterAdd()">
				<u-icon name="plus-circle-fill" size="80" color="#7891ff"></u-icon>
				<view class="text">
					<text>添加就诊人</text>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		data(){
			return {
				
			}
		},
		methods: {
			enterAdd() {
				uni.navigateTo({
					url:"./people"
				})
			},
			order() {
				uni.navigateTo({
					url:"./order"
				})
			}
		}
	}
</script>

<style lang="scss">
	.u-card {
		width: 95%;
		height: 200rpx;
		box-shadow: 1rpx 1rpx 4rpx 2rpx #c5c5c5;
		margin: auto;
		margin-top: 20rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		color: #c8c8c8;
		border-radius: 10rpx;

		image {
			width: 200rpx;
			height: 100%;
			background-color: #47ff94;
		}

		.content {
			margin: 0 20rpx;
			font-size: 25rpx;
			display: flex;
			flex-direction: column;
			color: #464b46;

			.message-box {
				display: flex;
				flex-direction: column;
				border: 1rpx solid #c8c8c8;
				color: #5d5d5d;
				padding: 10rpx;
			}
		}

		.icon {
			margin-right: 10rpx;

		}
	}

	.add {
		width: 95%;
		height: 240rpx;
		box-shadow: 1rpx 1rpx 4rpx 2rpx #c5c5c5;
		margin: 40rpx auto;
		border-radius: 10rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;

		.text {
			align-self: center;
		}
	}
</style>