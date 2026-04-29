<template>
	<view class="box">
		<view class="input">
			<view class="input-line">
				<image src="" mode=""></image>
				<input type="password" name="password1" id="password1" placeholder="输入原始密码" v-model="oldPassword" />
			</view>
			<view class="input-line">
				<image src="" mode=""></image>
				<input type="password" name="password1" id="password1" placeholder="输入新密码" v-model="newPassword" />
			</view>
			<view class="input-line">
				<image src="" mode=""></image>
				<input type="password" name="password1" id="password1" placeholder="输入确认密码" v-model="pdPassword"/>
			</view>
		</view>
		<view class="Enter">
			<u-button @tap="setPassword" data-name="3333" :loading="out.loading" :plain="out.plain" :shape="out.shape"
				:size="out.size" :ripple="out.ripple" :hairLine="out.hairLine" :type="out.type"
				class="Enter-u">确认</u-button>
		</view>
	</view>
</template>

<script>
	import fetch from '../../../common/fetch'
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
				oldPassword:'',
				newPassword:'',
				pdPassword:'',
			}
		},
		methods: {
			setPassword(){
				if(this.newPassword==this.pdPassword){
					fetch({
						url: '/prod-api/api/common/user/resetPwd',
						method:'put',
						data: {newPassword:this.newPassword,oldPassword:this.oldPassword}
					})
				}else{
					console.log('no');
				}
			}
		}
	}
</script>

<style lang="scss">
	.box{
		display: flex;
		flex-direction: column;
		gap: 20rpx;
		margin-top: 20rpx;
		.input{
			.input-line {
				display: flex;
				justify-content: center;
				height: 100rpx;
				border-bottom: 3rpx solid #c3c3c3;
				image{
					width: 10%;
					height: 100%;
				}
				input{
					width: 80%;
					height: 100%;
				}
			}
		}
		.Enter{
			align-self: center;
			width: 90%;
			.Enter-u{
				width: 100%;
			}
		}
	}
</style>
