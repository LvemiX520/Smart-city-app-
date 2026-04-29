<template>
	<view class="p">
		<view class="box">
			<view class="box-text1">
				<text>{{list.first}}</text>
				<svg t="1727350562744" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1502" width="80" height="80"><path d="M2.275 493.795l946.631 0 1e-8 36.409-946.63100002 0 1e-8-36.409z" p-id="1503" fill="#78a4fa"></path><path d="M839.68 457.387l182.045 54.613-182.045 54.613z" p-id="1504" fill="#78a4fa"></path></svg>
				<text>{{list.end}}</text>
			</view>
			<view class="box-text2">
				<text>￥{{list.price}}元</text>
				<text>全程{{list.mileage}}km</text>
			</view>
			<view class="box-text3">
				<scroll-view scroll-x="true" scroll-with-animation style="height: auto; white-space: nowrap;">
					<view style="display: inline-block;" v-for="(item,index) in list1"><li><text>{{item.name}}</text></li></view>
				</scroll-view>
			</view>
			<button type="button" @tap="ToRide()">下一步</button>
		</view>
	</view>
</template>

<script>
import fetch from '../../../../../common/fetch'
	export default {
		data() {
			return {
				id:'',
				list:[{}],
				list1:[{}],
				To:{
					startTime:'',
					endTime:'',
					array:[],
					price:'',
					path:'',
				},
			}
		},
		methods: {
			getBaShi(){
				fetch({
					url:'/prod-api/api/bus/line/'+this.id,
				}).then(res=>{
					this.list=res.data
					this.To.startTime=res.data.startTime
					this.To.endTime=res.data.endTime
					this.To.price=res.data.price
					this.To.path=res.data.name
				}),
				fetch({
					url:'/prod-api/api/bus/stop/list?linesId='+this.id,
				}).then(res=>{
					this.list1=res.rows
					res.rows.forEach((item,index)=>{
						this.To.array.push(item.name)
					})
				})
			},
			ToRide(){
				uni.navigateTo({
					url:'ride_text/ride_text?all='+encodeURIComponent(JSON.stringify(this.To))
				})
			}
		},
		onLoad(options) {
			this.id=options.id,
			this.getBaShi()
			console.log(this.To);
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
	.p{
		background-color: #f5f5f5;
		height: 94vh;
	}
	.box{
		padding: 40rpx;
		@include Flex2(true)
		gap: 40rpx;
		justify-content: center;
		.box-text1{
			@include Flex2(false)
			width: 100%;
			justify-content: center;
			gap: 40rpx;
			align-items: center;
			font-size: 1rem;
			background-color: #fff;
		}
		.box-text2{
			@include Flex2(true)
			width: 100%;
			justify-content: center;
			gap: 40rpx;
			padding: 20rpx 0 20rpx 0;
			align-items: center;
			font-size: 1rem;
			background-color: #fff;
			text{
				&:first-child{
					color: #237bff;
				}
				&:last-child{
					color: #4cd964;
				}
			}
		}
		.box-text3{
			padding: 40rpx 0 40rpx 0;
			display: flex;
			align-items: end;
			background-color: #fff;
			li{
				font-size: 1rem;
				float: left;
				writing-mode: vertical-lr;
				text-orientation: upright;
				color: #237bff;
				&::marker{
					font-size: 2em;
				}
				&:first-child{
					margin-left: 20rpx;
				}
				text{
					margin-top: -50rpx;
				}
			}
		}
		button{
			width: 70%;
			background-color: #237bff;
			color: #fff;
		}
	}
</style>
