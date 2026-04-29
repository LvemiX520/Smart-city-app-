<template>
	<view>
		<view class="box">
			<view class="box-text">
				<view class="box-text-input">
					<view class="box-text-input-left">
						<text>姓名</text>
					</view>
					<view class="box-text-input-right">
						<text>{{all.userName}}</text>
					</view>
				</view>
				<view class="box-text-input">
					<view class="box-text-input-left">
						<text>手机号码</text>
					</view>
					<view class="box-text-input-right">
						<text>{{all.phonenumber}}</text>
					</view>
				</view>
				<view class="box-text-input">
					<view class="box-text-input-left">
						<text>上车地点</text>
					</view>
					<view class="box-text-input-right">
						<text>{{all.shangche}}</text>
					</view>
				</view>
				<view class="box-text-input">
					<view class="box-text-input-left">
						<text>下车地点</text>
					</view>
					<view class="box-text-input-right">
						<text>{{all.xiache}}</text>
					</view>
				</view>
			</view>
			<view class="box-button">
				<button type="button" @tap="submit()">提交订单</button>
			</view>
		</view>
	</view>
</template>

<script>
	import fetch from '../../../../../../../common/fetch';
	export default {
		data() {
			return {
				all:[{}],
				options:{},
			}
		},
		computed: {
		},
		methods: {
			submit(){
				let thi=this
				console.log(this.all);
				uni.showModal({
					title:'提示',
					content:'确认提交',
					success(res) {
						if(res.confirm){
							thi.setBus()
						}else if(res.cancel){
						}
					},
				})
			},
			setBus(){
				fetch({
					url:'/prod-api/api/bus/order',
					method:'post',
					data:{
						start:this.all.shangche,
						end:this.all.xiache,
						price:this.all.price,
						path:this.all.path,
						status:1
					}
				}).then(res=>{
					uni.redirectTo({
						url:'/pages/PersonalCenter/MyOrders/MyOrders'
					})
				})
			}
		},
		onLoad(e) {
			this.all=JSON.parse(decodeURIComponent(e.all))
			console.log(this.all);
		}
	}
</script>

<style lang="scss">
	.box{
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 40rpx;
		.box-text{
			.box-text-input{
				display: flex;
				flex-direction: row;
				border-bottom: 2rpx solid #aaaaaa;
				.box-text-input-left{
					height: 100rpx;
					width: 200rpx;
					line-height: 100rpx;
					text-indent: 1em;
					margin-left: 100rpx;
				}
				.box-text-input-right{
					height: 100rpx;
					line-height: 100rpx;
					margin-right: 1em;
				}
			}
		}
		.box-button{
			button{
				width: 70%;
				background-color: #237bff;
				color: #fff;
			}
		}
	}
</style>
