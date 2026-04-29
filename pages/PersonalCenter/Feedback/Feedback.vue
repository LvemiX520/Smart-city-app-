<template>
	<view class="box">
		<view class="text">
			<textarea value="" placeholder="提点意见吧" maxlength="150" v-model="content"/>
		</view>
		<view class="Enter">
			<u-button @tap="setFeedback" data-name="3333" :loading="out.loading" :plain="out.plain" :shape="out.shape"
				:size="out.size" :ripple="out.ripple" :hairLine="out.hairLine" :type="out.type"
				class="Enter-u">提交</u-button>
		</view>
	</view>
</template>

<script>
import fetch from '../../../common/fetch';
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
				content:''
			}
		},
		methods: {
			setFeedback(){
				fetch({
					url:'/prod-api/api/common/feedback',
					method:'post',
					data:{
						content:this.content,
						title:'发现错误'
					}
				}).then(res=>{
					console.log(res);
					this.content=''
				})
			}
		}
	}
</script>

<style lang="scss">
	.box{
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20rpx;
		margin-top: 20rpx;
		.text{
			width: 90%;
			margin: 0 30rpx 0 30rpx;
			border: 4rpx solid #dadada;
			border-radius: 20rpx;
			textarea{
				width: 100%;
				text-indent: 1em;
			}
		}
		.Enter{
			width: 90%;
			.Enter-u{
				width: 100%;
			}
		}
	}
</style>
