<template>
	<view class="p">
		<view class="p-image">
			<text>智慧城市</text>
		</view>
		<view class="p-box">
			<view class="p-box-input">
				<text>图标</text>
				<input type="text" name="username" id="username" placeholder="请输入账号" v-model="username" />
			</view>
			<view class="p-box-input">
				<text>图标</text>
				<input type="password" name="password" id="password" placeholder="请输入密码" v-model="password" />
			</view>
		</view>
		<text class="p-zc" @tap="ToRegister">暂无账号，立即注册</text>
		<view class="p-out">
			<u-button @tap="login()" data-name="3333" :loading="out.loading" :plain="out.plain" :shape="out.shape" :size="out.size"
				:ripple="out.ripple" :hairLine="out.hairLine" :type="out.type" class="p-out-u">登录</u-button>
		</view>
	</view>
</template>

<script>
	import { baseUrl } from '../../common/fetch';
	import fetch from '../../common/fetch';
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
				username:'',
				password:'',
			}
		},
		methods: {
			Tapindex(){
				uni.reLaunch({
					url:'/pages/index/index'
				})
			},
			login(){
				fetch({
					url:'/prod-api/api/login',
					method:'post',
					data:{
						username:this.username,
						password:this.password
					},
				}).then(res=>{
					console.log(res);
					this.Tapindex()
				})
			},
			ToRegister(){
				uni.navigateTo({
					url:'/pages/login/register/register'
				})
			}
		}
	}
</script>

<style lang="scss">
	.p{
		margin-top: 40rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding:  0 40rpx 0 40rpx;
		gap: 40rpx;
		.p-image{
			height: 240rpx;
		}
		.p-box{
			width: 100%;
			display: flex;
			flex-direction: column;
			.p-box-input{
				display: flex;
				flex-direction: row;
				border-bottom: 2rpx solid #e0e0e0;
				height: 100rpx;
				align-items: center;
				text{
					flex: 0.2;
					display: flex;
					justify-content: end;
					padding-right: 20rpx;
				}
				input{
					flex: 1;
				}
			}
		}
		.p-zc{
			flex: 1;
		}
		.p-out{
			width: 100%;
			.p-out-u{
				width: 100%;
			}
		}
	}
</style>
