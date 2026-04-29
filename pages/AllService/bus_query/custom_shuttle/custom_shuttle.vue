<template>
	<view>
		<view class="box">
			<view class="box-bus" v-for="(item,index) in list" :key="index">
				<view class="box-bus-text" @tap="TobBusXq(1+index)">
					<button type="button">{{item.name}}</button>
				</view>
				<view class="box-bus-text1">
					<view class="box-bus-text1-left">
						<image src="../../../../static/image/AllService/bus/bashi_icon.png" mode="aspectFit"></image>
						<text>{{item.first}}</text>
					</view>
					<view class="box-bus-text1-right">
						<svg t="1727350562744" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1502" width="80" height="80"><path d="M2.275 493.795l946.631 0 1e-8 36.409-946.63100002 0 1e-8-36.409z" p-id="1503" fill="#78a4fa"></path><path d="M839.68 457.387l182.045 54.613-182.045 54.613z" p-id="1504" fill="#78a4fa"></path></svg>
						<text>{{item.end}}</text>
					</view>
				</view>
				<view class="box-bus-text2">
					<view class="box-bus-text2-left">
						<text>票价：￥{{item.price}}</text>
					</view>
					<view class="box-bus-text2-right">
						<text>{{item.startTime}}</text>
						<view style="background-color: #ff373a ;">
							<text>始</text>
						</view>
					</view>
				</view>
				<view class="box-bus-text2">
					<view class="box-bus-text2-left">
						<text>里程：{{item.mileage}}km</text>
					</view>
					<view class="box-bus-text2-right">
						<text>{{item.endTime}}</text>
						<view style="background-color: #ffaa00 ;">
							<text>终</text>
						</view>
					</view>
				</view>
				<view class="box-xq">
					<view class="box-xq-zd" @tap="Show(index)" :ref="'zd'+index">
						<u-icon name="arrow-down" size="40" color="#909399" id="u-icon0"></u-icon>
					</view>
					<view class="box-xq-text" :id="'box-xq-text'+index">
						<ul>
							<li v-for="(item1,index1) in xq.filter((e)=> e.linesId==index+1)"><text></text><text>{{item1.name}}</text></li>
						</ul>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import fetch from '../../../../common/fetch';
	export default {
		data() {
			return {
				list:[{}],
				xq:[{}]
			}
		},
		methods: {
			getBus() {
				fetch({
					url: '/prod-api/api/bus/line/list'
				}).then(res => {
					this.list=res.rows
				})
			},
			getxq(){
				fetch({
					url:'/prod-api/api/bus/stop/list'
				}).then(res=>{
					this.xq=res.rows
				})
			},
			TobBusXq(e){
				uni.navigateTo({
					url:'/pages/AllService/bus_query/custom_shuttle/bus_xq/bus_xq?id='+e
				})
			},
			Show(s){
				if(this.$refs[`zd${s}`][0].$el.nextSibling.style.display=='block'){
					this.$refs[`zd${s}`][0].$el.nextSibling.style.display='none'
				}else{
					this.$refs[`zd${s}`][0].$el.nextSibling.style.display='block'
				}
			}
		},
		onLoad() {
			this.getBus()
			this.getxq()
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
		flex-direction: if($boolean, column, row);
	}

	.box {
		background-color: #f4f4f4;
		padding: 40rpx;
		.box-bus {
			background-color: #fff;
			margin-bottom: 40rpx;
			@include Flex2(true) .box-bus-text {
				flex: 1;
				margin-top: 40rpx;
				button {
					width: 230rpx;
					height: 100rpx;
					border-radius: 15rpx;
					color: #fff;
					background-color: #4cd964;
				}
			}

			.box-bus-text1 {
				@include Flex2(false) height: 150rpx;

				.box-bus-text1-left,
				.box-bus-text1-right {
					width: 50%;
					@include Flex2(false) 
					text {
						flex: 1;
						font-size: 0.8rem;
						@include Flex1
					}
				}
				.box-bus-text1-left{
					image:first-child{
						background-color: #78a4fa;
						padding: 10rpx;
						border-radius: 50%;
						width: 50rpx;
						height: 50rpx;
						margin-left: 40rpx;
						align-self: center;
					}
				}
				
			}

			.box-bus-text2 {
				@include Flex2(false) height: 100rpx;

				.box-bus-text2-left,
				.box-bus-text2-right {
					flex: 1;
					@include Flex2(false) 
					image {
						width: unset;
						height: unset;
						flex: 0.5;
					}

					text {
						display: flex;
						justify-content: start;
						align-items: center;
						margin-left: 80rpx;
						font-size: 0.8rem;
					}
				}
				.box-bus-text2-left{
					text:first-child{
						color: #3db5e0;
					}
				}
				.box-bus-text2-right{
					text:first-child{
						flex: 0.5;
						color:#4cd964;
					}
					view{
						width: 60rpx;
						height: 60rpx;
						padding: 1rpx;
						border-radius: 50%;
						align-self: center;
						display: flex;
						justify-content: center;
						text:last-child{
							margin-left:0;
							color: #fff;
							align-self: center;
						}
					}
				}
			}
		}

		.box-xq {
			@include Flex2(true)
			margin-bottom: 40rpx;
			.box-xq-zd{
				height: 100rpx;
				display: flex;
				justify-content: end;
				align-items: center;
				padding-right: 40rpx;
			}
			.box-xq-text{
				display: none;
				ul{
					li{
						height: 50rpx;
						line-height: 50rpx;
						&::marker,text:first-child{
							color: #4cd964;
							margin-right: 40rpx;
						}
						&:first-child text:first-child::after{
							content: "起点";
						}
						&:last-child text:first-child::after{
							content: "终点";
						}
						&:not(:first-child,:last-child) text:first-child::after{
							content:"　　";
						}
						text:last-child{
							font-weight: 600;
						}
					}
				}
			}
		}
	}
</style>