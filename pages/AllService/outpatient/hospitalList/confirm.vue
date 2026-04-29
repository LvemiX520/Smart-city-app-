<template>
	<view class="confirm">
		<view class="type">
			<view class="head">
				<text class="text">就诊人</text>
				<text>111</text>
			</view>
			<view class="head">
				<text class="text">预约科室</text>
				<text>{{list.categoryName}}</text>
			</view>
			<view class="head">
				<text class="text">门诊类型</text>
				<text>{{list.type}}</text>
			</view>
			<view class="head">
				<text class="text">金额</text>
				<text>{{list.money}}</text>
			</view>
		</view>
		<view class="time">
			<view class="time-one">
				<text class="text">选择日期</text>
				<view class="u-demo-area">
					<u-calendar v-model="date.show" ref="calendar" :mode="date.mode" :start-text="date.startText"
						:end-text="date.endText" :range-color="date.rangeColor" :range-bg-color="date.rangeBgColor"
						:active-bg-color="date.activeBgColor" :btn-type="date.btnType">
					</u-calendar>
					<view class="u-demo-result-line" @tap="open">
						{{date.result}}
					</view>
				</view>
			</view>
			<view class="time-two">
				<text class="text">选择时间</text>
			</view>
		</view>
		<view class="button">
			<button type="default" class="one" @click="upOne">取消</button>
			<button type="primary" class="two" @click="next">确定</button>
		</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				ip: 'http://10.20.18.2:10001',
				list: {},
				id: "",
				date: {
					show: false,
					mode: 'range',
					result: "选择日期",
					startText: '开始',
					endText: '结束',
					rangeColor: '#2979ff',
					rangeBgColor: 'rgba(41,121,255,0.13)',
					activeBgColor: '#2979ff',
					btnType: 'primary',
					value: ""
				},
			}
		},
		methods: {
			getMessage() {
				uni.request({
					url: this.ip + '/prod-api/api/hospital/category/list/' + this.id,
					success: (res) => {
						console.log(res.data.rows);
						this.list = res.data.rows

					}
				})
			},
			open() {
				this.date.show = true
			},
			upOne() {
				uni.navigateBack({
					delta: 2,
				})
			},
			next() {
				uni.navigateTo({
					url:'./history'
				})
			}
		},
		onLoad(options) {
			this.id = options.id
		},
		mounted() {
			this.getMessage()
		}
	}
</script>

<style lang="scss">
	.confirm {
		font-size: 35rpx;

		.type {
			width: 95%;
			box-shadow: 1rpx 1rpx 4rpx 3rpx #c2c2c2;
			margin: 25rpx auto;
			padding: 30rpx;
			display: flex;
			flex-direction: column;

			.head {
				display: flex;
				flex-direction: row;
				margin: 20rpx;
			}
		}

		.text {
			color: #7891ff;
			margin-right: 80rpx;
		}

		.time {
			width: 95%;
			box-shadow: 1rpx 1rpx 4rpx 3rpx #c2c2c2;
			margin: 25rpx auto;
			padding: 30rpx;
			display: flex;
			flex-direction: column;
			.time-one {
				display: flex;
				flex-direction: row;
				justify-content: space-between;

				.u-demo-area {
					background-color: #d6ff63;
				}
			}
		}
		.button {
			display: flex;
			flex-direction: row;
			margin-top: 40rpx;
			button {
				font-size: 35rpx;
				width: 40%;
				height: 100rpx;
				border-radius: 50rpx;
				line-height: 100rpx;
				border:1rpx solid #7891ff;
			}
		}
	}
</style>