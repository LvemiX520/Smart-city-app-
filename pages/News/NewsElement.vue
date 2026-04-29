<template>
	<view class="NE">
		<text class="NE-title">{{list.title}}</text>
		<view class="NE-box">
			<image :src="baseUrl+list.cover" mode=""></image>
			<rich-text :nodes="list.content"></rich-text>
		</view>
		<view class="Bottom" @tap="TapCommentaries()">
			<view class="u-icon-item u-border-bottom u-border-right">
				<u-icon name="edit-pen-fill" size="60" color="#8b8b8b"></u-icon>
			</view>
			<text>说说你的看法</text>
			<view class="Bottom-right">
				<view class="u-demo-area">
					<view class="u-badge-wrap">
						<view class="u-icon-item u-border-bottom u-border-right">
							<u-icon name="chat" size="60" color="#8b8b8b"></u-icon>
							<u-badge :is-center="wrap.isCenter" :type="wrap.type" :count="wrap.count" :is-dot="wrap.isDot" :offset="wrap.offset" :size="wrap.size"></u-badge>
							</view>
						</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { baseUrl } from '../../common/fetch'
	import fetch from '../../common/fetch'
	export default {
		data() {
			return {
				baseUrl:baseUrl,
				id:'',
				list:{},
				wrap:{
					count: 0,
					type: 'error',
					isDot: false,
					offset: [-8, -8],
					size: 'default',
					isCenter: false
				}
			}
		},
		methods: {
			getZt(){
				fetch({
					url:'/prod-api/press/press/'+this.id,
				}).then(res=>{
					this.list=res.data
				})
			},
			TapCommentaries(){
				uni.navigateTo({
					url:'/pages/News/commentaries/Commentaries?id='+this.id
				})
			},
			getCount(){
				fetch({
					url:'/prod-api/press/comments/list'
				}).then(res=>{
					let s=0;
					res.rows.forEach((item,index)=>{
						if(item.newsId==this.id){
							s++
						}
					})
					this.wrap.count=s
				})
			}
		},
		onLoad(options){
			this.id=options.id
		},
		onShow() {
			this.getCount()
		},
		mounted() {
			this.getZt()
		}
	}
</script>

<style lang="scss">
	image,img{
		width: 100%;
	}
	.NE{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-content: space-around;
		gap: 40rpx;
		.NE-title{
			margin-top: 40rpx;
			flex: 1;
			text-align: center;	
			font-size: 36rpx;
			font-weight: 800;
		}
		.NE-box{
			flex: 1;
			margin: 0 40rpx 0 40rpx ;
			min-height: 600rpx;
			box-shadow: 0 0 10rpx #bcbcbc;
			padding:40rpx 40rpx 180rpx 40rpx;
			.NE-box-text{
				font-size: 32rpx;
				font-weight: 520;
			}
		}
	}
	.Bottom{
		display: flex;
		align-items: center;
		gap: 25rpx;
		padding: 0 20rpx 0 20rpx;
		width: 100%;
		height: 100rpx;
		background-color: #ffffff;
		box-shadow: 0 5rpx 10rpx #000;
		position: fixed;
		bottom: 0;
		color: #a6a6a6;
		text{
			flex: 1;
		}
	}
</style>
