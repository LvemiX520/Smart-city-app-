<template>
	<view class="p">
		<view class="p-input">
			<input type="text" name="ip" id="ip" placeholder="格式：127.0.0.1:8080" v-model="ip"/>
		</view>
		<view class="p-out">
			<u-button @tap="back" data-name="3333" :loading="out.loading" :plain="out.plain" :shape="out.shape" :size="out.size"
				:ripple="out.ripple" :hairLine="out.hairLine" :type="out.type" class="p-out-u">保存</u-button>
		</view>
	</view>
</template>

<script>
	import { getbaseUrl } from '../../common/fetch'
	import fetch from '../../common/fetch'
	export default {
		data() {
			return {
				out: {
					hairLine: true,
					type: 'primary',
					size: 'default',
					shape: 'square',
					plain: false,
					ripple: false,
					loading: false,
				},
				ip:'',
				cs:''
			}
		},
		methods: {
			back(){
				uni.setStorageSync("baseUrl",this.ip)
				uni.removeStorageSync('user-token')
				uni.navigateBack({
					delta:2,
				})
			}
		}
	}
</script>

<style lang="scss">
	.p{
		display: flex;
		justify-content: center;
		flex-direction: column;
		.p-input{
			display: flex;
			justify-content: center;
			#ip{
				margin-top: 140rpx;
				width: 80%;
				border-bottom: 2rpx solid #a2a2a2;
			}
		}
		.p-out-u{
			margin-top: 40rpx;
			width: 80%;
			border-radius: 100rpx;
		}
	}
</style>
