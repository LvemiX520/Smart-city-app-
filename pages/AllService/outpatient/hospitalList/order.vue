<template>
	<view>
		<view class="button">
			<button type="primary" @click="onchange">专家号</button>
			<button type="primary" @click="change">普通号</button>
		</view>
		<view class="content" v-for="(item,index) in list" :key="index" v-if="item.type==type" @click="enterConfirm(item.id)">
			<text>{{item.categoryName}}</text>
			<u-icon name="arrow-right" size="40" color="#757575"></u-icon>
		</view> 
	</view>
</template>

<script>
	export default {
		data(){
			return {
				ip: 'http://10.20.18.2:10001',
				list:[{}],
				type:1,
				id:""
			}
		},
		methods:{
			getMessage(){
				uni.request({
					url:this.ip + '/prod-api/api/hospital/category/list',
					success:(res) => {
						console.log(res.data.rows);
						this.list = res.data.rows
					}
				})
			},
			onchange() {
				this.type=1
			},
			change() {
				this.type=2
			},
			enterConfirm(e) {
				uni.navigateTo({
					url:'./confirm?id='+ e
				})
			}
		},
		onLoad() {
			this.getMessage()
		}
	}
</script>

<style lang="scss">
	.button {
		display: flex;
		flex-direction: row;
		margin: 30rpx auto;
		button {
			width: 40%;
			border-radius: 40rpx;
		}
	}
	.content {
		width: 100%;
		height: 100rpx;
		border-bottom: 1rpx solid #c1c1c1;
		line-height: 100rpx;
		font-size: 37rpx;
		padding: 0 30rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		u-icon {
			
		}
	}
</style>