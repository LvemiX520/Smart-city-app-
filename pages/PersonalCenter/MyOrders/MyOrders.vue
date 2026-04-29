<template>
	<view class="box">
		<view class="box-tab">
			<view class="box-tab-left" :class="active==0?'active':''" @tap="active=0,getbus()">
				<text>未支付</text>
			</view>
			<view class="box-tab-right" :class="active==1?'active':''" @tap="active=1,getbus()">
				<text>已支付</text>
			</view>
		</view>
		<view class="box-main">
			<view v-if="list.some(e=>e.status==active)">
				<view class="box-main-bus" v-for="(item,index) in list" :key="item.id" v-if="item.status==active">
					<view class="box-main-bus-text1">
						<view class="box-main-bus-text-left">
							<image src="" mode=""></image>
							<text>订单：{{item.orderNum}}</text>
						</view>
						<view class="box-main-bus-text-right">
							<text>{{item.price}}</text>
						</view>
					</view>
					<view class="box-main-bus-text2">
						<view class="box-main-bus-text-left">
							<image src="" mode=""></image>
							<text>{{item.start}}</text>
						</view>
						<view class="box-main-bus-text-right">
							<image src="" mode=""></image>
							<text>{{item.end}}</text>
						</view>
					</view>
					<view class="box-main-bus-text3">
						<text>线路</text>
						<text>{{item.path}}</text>
					</view>
					<view class="box-main-bus-text3">
						<text>乘车人</text>
						<text>{{item.userName}}</text>
					</view>
					<view class="box-main-bus-text3">
						<text>手机号</text>
						<text>{{item.userTel}}</text>
					</view>
					<view class="box-main-bus-text4" v-if="active==0">
						<button type="default" @tap="zhifu(item.orderNum),getbus()">立即支付</button>
					</view>
				</view>
			</view>
			<text v-else class="box-main-s"> 暂无订单！</text>
		</view>
	</view>
</template>

<script>
import fetch from '../../../common/fetch'
	export default {
		data() {
			return {
				up:0,
				active:0,
				list:[{}]
			}
		},
		methods: {
			getbus(){
				fetch({
					url:'/prod-api/api/bus/order/list',
				}).then(res=>{
					this.list=res.rows
				})
			},
			zhifu(e){
				fetch({
					url:'/prod-api/api/bus/pay',
					method:'post',
					data:{
						orderNum:e,
						paymentType:'电子支付'
					}
				}).then(res=>{
					console.log(res);
					this.active=0
				})
			},
			updata(){
				this.up+=1
			}
		},
		onLoad() {
			this.getbus()
		}
	}
</script>

<style lang="scss">
	@mixin Flex1 {
		align-items: center;
		display: flex;
		justify-content: center;
	}
	@mixin Flex2($boolean) {
		display: flex;
		flex-direction: if($boolean,column,row);
	}
	.box{
		@include Flex2(true)
		padding: 30rpx 30rpx 0 30rpx;
		gap: 30rpx;
		.box-tab{
			width: 100%;
			@include Flex2(false)
			border: 2rpx solid #007aff;
			.box-tab-left,.box-tab-right{
				flex: 1;
				height: 80rpx;
				@include Flex1
				color: #007aff;
			}
			.active{
				background-color: #007aff;
				color: #fff;
			}
		}
		.box-main{
			width: 100%;
			min-height: 20vh;
			@include Flex2(true)
			.box-main-bus{
				width: 100%;
				@include Flex2(true)
				background-color: #f4f4f4;
				margin-bottom: 30rpx;
				flex: 1;
				.box-main-bus-text1,.box-main-bus-text2{
					@include Flex2(false)
					height: 120rpx;
					.box-main-bus-text-left,.box-main-bus-text-right{
						@include Flex2(false)
						flex: 1;
						image{
							width: unset;
							flex: 0.5;
							height: unset;
						}
						text{
							align-self: center;
							flex: 1;
							text-align: center;
						}
					}
				}
				.box-main-bus-text1{
					border-bottom: 4rpx dashed #35a1ff;
				}
				.box-main-bus-text3{
					@include Flex2(false)
					border-top: 4rpx solid #ececec;
					height: 100rpx;
					text{
						flex: 1;
						text-align: left;
						text-indent: 2rem;
						align-self: center;
					}
				}
				.box-main-bus-text4{
					height: 120rpx;
					display: flex;
					justify-content: end;
					align-items: center;
					border-top: 4rpx solid #ececec;
					button{
						width: 180rpx;
						height: 60rpx;
						border-radius: 10rpx;
						color: #fff;
						text-align: center;
						background-color: #007aff;
						margin-right: 40rpx;
						font-size: 26rpx;
					}
				}
			}
			.box-main-s{
				flex: 1;
				justify-content: center;
				display: flex;
				align-items: center;
				width: 100%;
				background-color: #f4f4f4;
			}
		}
	}
</style>
