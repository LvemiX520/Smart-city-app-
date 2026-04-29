<template>
	<view>
		<view class="C-box">
			<view class="C-box-bgcolor">
				<view class="C-box-input">
					<input type="text" name="text" placeholder=" 说说你的看法" v-model="content" @confirm="sear"/>
					<button type="button" @tap="sear">评论</button>
				</view>
			</view>
			<view class="C-box-text">
				<text class="C-box-text-text">最新评论</text>
				<view class="C-box-text-box" v-for="(item,index) in list" v-if="item.newsId==newsId">
					<view class="box-n">
						<view class="box-n-left">
							头像
						</view>
						<view class="box-n-right">
							<text>{{item.userName}}</text>
							<text>{{item.commentDate}}</text>
							<text>{{item.content}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import fetch from '../../../common/fetch'
	export default {
		data(){
			return {
				list:[{}],
				newsId:'',
				content:''
			}
		},
		methods:{
			getPl(){
				fetch({
					url:'/prod-api/press/comments/list'
				}).then(res=>{
					this.list=res.rows
				})
			},
			setComment(){
				fetch({
					url:'/prod-api/press/pressComment',
					method:'post',
					data:{
						newsId:this.newsId,
						content:this.content
					},
				}).then(res=>{
					console.log(res);
				})
			},
			sear(){
				if(this.content==''){
					uni.showToast({
						icon:'error',
						title:'空'
					})
				}else{
					this.setComment()
					this.content=''
				}
			}
		},
		onLoad(options) {
			this.newsId=options.id
			this.getPl()
		}
	}
</script>

<style lang="scss">
	.C-box{
		display: flex;
		flex-direction: column;
		.C-box-bgcolor{
			background-color: #f5f5f5;
			.C-box-input{
				margin: 20rpx;
				background-color: #fff;
				display: flex;
				flex-direction: row;
				height: 80rpx;
				input{
					text-indent: 1em;
					flex: 1;	
					height: 100%;
					border: 2rpx solid #dbdbdb;
				}
				button{
					background-color: #007aff;
					color: #fff;
				}
			}
		}
		.C-box-text{
			flex: 1;
			flex-direction: column;
			.C-box-text-box{
				margin-top: 40rpx;
				display: flex;
				border-bottom: 2rpx solid #d6d6d6;
				.C-box-text-text{
					font-size: 16rpx;
				}
				.box-n{
					flex: 1;
					display: flex;
					flex-direction: row;
					height: 170rpx;
					.box-n-left{
						flex: 0.5;
					}
					.box-n-right{
						flex: 3;
						display: flex;
						flex-direction: column;
						text:first-child,text:nth-child(2){
							color: #a9a9a9;
							margin-bottom: 20rpx;
						}
					}
				}
			}
		}
	}
</style>