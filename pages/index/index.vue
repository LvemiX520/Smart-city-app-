<template>
	<view>
		<view class="ss">
			<u-search v-model="ss.value" :shape="ss.shape"
				:clearabled="ss.clearabled" :show-action="ss.showAction" :input-align="ss.inputAlign">
			</u-search>
		</view>
		<view class="lbt">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item v-for="item in lbt.list">
						<image :src="baseUrl+item.advImg"></image>
					</swiper-item>
			</swiper>
		</view>
		<view class="tjfw">
			<view class="tjfw-title">
				<text>推荐服务</text>
				<u-line class="u-line" :border-style="tjfw.borderStyle" color="red" :color="tjfw.color"
					:length="tjfw.length" :direction="tjfw.direction" :hair-line="tjfw.hairLine"></u-line>
			</view>
			<view class="tjfw-fw">
				<view v-for="(item,index) in tjfw.list.slice(0,5)" :key="index" class="tjfw-all">
					<image :src="baseUrl+item.imgUrl" mode=""></image>
					<text>{{item.serviceName}}</text>
				</view>
			</view>
		</view>
		<view class="zt">
			<view class="zt-title">
				<text>专题</text>
			</view>
			<view class="zt-wz">
				<view v-for="(item,index) in zt.list.slice(0,4)" :key="index" class="zt-wz-box" @tap="TapNew(item.id)">
					<image :src="baseUrl+item.cover" mode=""></image>
					<text>{{item.content}}</text>
				</view>
			</view>
		</view>
		<view class="news">
			<NewsVue></NewsVue>
		</view>
	</view>
</template>

<script>
	import { baseUrl } from '../../common/fetch.js';
	import fetch from '../../common/fetch.js';
	import NewsVue from '../News/NewsMain.vue';
	export default {
		components:{
			NewsVue
		},
		data() {
			return {
				baseUrl:baseUrl,
				ss:{
					value: '',
					shape: 'round',
					clearabled: true,
					showAction: true,
					inputAlign: 'left'
				},
				lbt: {
					list: [{}],
					title: false,
					mode: 'round',
					indicatorPos: 'bottomCenter',
					effect3d: false,
				},
				tjfw: {
					list:[{}],
					direction: 'row',
					hairLine: true,
					length: '100%',
					color: this.$u.color['primary'],
					borderStyle: 'solid',
				},
				zt: {
					list: [{}]
				}
			}
		},
		methods: {
			change(index) {
				// console.log(index);
			},
			getLbt(){
				fetch({
					url:'/prod-api/api/rotation/list',
				}).then(res =>{
					this.lbt.list=res.rows
				})
			},
			getTjfw(){
				fetch({
					url:"/prod-api/api/service/list",
				}).then(res=>{
					this.tjfw.list=res.rows
				})
			},
			getZt(){
				fetch({
					url:'/prod-api/press/press/list',
				}).then(res=>{
					this.zt.list=res.rows
				})
			},
			TapNew(e){
				uni.navigateTo({
					url: '/pages/News/NewsElement?id='+e,
				})
			}
		},
		onLoad() {
			this.getLbt(),
			this.getTjfw(),
			this.getZt()
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		margin: 30rpx 0;
	}

	.ss {
		margin: 30rpx;
	}

	.lbt {
		margin-left: 30rpx;
		margin-right: 30rpx;
		image{
			width: 100%;
			height: 100%;
		}
		.u-demo-area {
			margin-top: 15rpx;
		}
	}

	.tjfw {
		margin-top: 30rpx;
		height: 250rpx;
		background-color: #f8f8f8;
		display: flex;
		flex-direction: column;

		.tjfw-title {
			flex: 0.6;
			display: flex;
			flex-direction: column;
			font-size: 1.2em;
			height: 50rpx;
			text-indent: 1em;
			text {
				margin-top: 20rpx;
				margin-bottom: 20rpx;
			}
		}

		.tjfw-fw {
			display: flex;
			flex: 1;
			margin-top: 20rpx;
			justify-content: space-evenly;
			.tjfw-all{
				display: flex;
				align-items: center;
				flex-direction: column;
				image{
					width: 50rpx;
					height: 50rpx;
					background-color: rgb(120,164,250);
					padding: 20rpx;
					border-radius: 50%;
				}
				text{
					align-content: center;
					flex: 1;
				}
			}
		}
	}
	.zt {
		margin-top: 20rpx;
		display: flex;
		flex-direction: column;
		.zt-title {
			flex: 0.6;
			font-size: 1.2em;
			margin-bottom: 20rpx;
			text-indent: 1em;
		}
		.zt-wz {
			flex:1;
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			gap: 30rpx;
			.zt-wz-box{
				width: 45%;
				display: flex;
				flex-direction: column;
				height: 250rpx;
				border-radius: 20rpx;
				box-shadow: 5rpx 5rpx #ebebeb;
				image{
					flex:1;
					width: 100%;
					flex-grow: 0.7;
					border-radius: 20rpx 20rpx 0 0;
				}
				text{
					flex: 0.3;
					margin-left: 20rpx;
					margin-bottom: 15rpx;
					font-size: 27rpx;
					text-indent: 1em;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2;  // 控制多行的行数
					-webkit-box-orient: vertical;
				}
			}
		}
	}
	.news{
		margin-top: 30rpx;
	}
</style>