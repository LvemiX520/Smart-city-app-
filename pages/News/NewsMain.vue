<template>
	<view class="news">
		<view class="news-tab">
			<scroll-view class="news-tab-scroll" scroll-x="true" scroll-with-animation>
				<view class="news-tab-scroll-box" v-for="(item,index) in news.list" :key="item.id" @click="id=item.id"
					:class="id==item.id?'active':''">
					<text class="news-tab-scroll-box-text" :class="index!=5?'line':''">{{item.name}}</text>
				</view>
			</scroll-view>
		</view>
		<view class="news-element">
			<view v-for="(item,index) in all.list" :key="index" class="news-element-box" v-if="item.type==id"  @tap="TapNew(item.id)">
				<image :src="baseUrl+item.cover" mode=""></image>
				<text>{{item.title}}</text>
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
				id: 9,
				news: {
					list: []
				},
				all: {
					list: []
				},
				baseUrl:baseUrl
			}
		},
		methods: {
			getNews() {
				fetch({
					url:'/prod-api/press/category/list'
				}).then(res=>{
					this.news.list=res.data
				})
			},
			getAll() {
				fetch({
					url:'/prod-api/press/press/list'
				}).then(res=>{
					this.all.list=res.rows
				})
			},
			TapNew(e){
				uni.navigateTo({
					url: '/pages/News/NewsElement?id='+e,
				})
			}
		},
		mounted() {
			this.getNews();
			this.getAll();
		}
	}
</script>

<style lang="scss">
	.news {
		display: flex;
		flex-direction: column;

		.news-tab {
			border-bottom: 8rpx solid #ececec;

			.news-tab-scroll {
				height: 100rpx;
				white-space: nowrap;

				.news-tab-scroll-box {
					height: 100rpx;
					padding: 0 20rpx;
					display: inline-block;
					text-align: center;

					&.active {
						color: red;
					}

					.news-tab-scroll-box-text {
						font-size: 30rpx;
						line-height: 100rpx;
						padding-right: 40rpx;

						&.line {
							border-right: 1rpx solid #000;
						}
					}
				}
			}
		}

		.news-element {
			.news-element-box {
				display: block;
				height: 200rpx;
				border-bottom: 1rpx solid #bdbdbd;

				image {
					float: left;
					width: 20%;
					height: 80%;
					padding: 20rpx;
				}

				text {
					display: block;
					padding: 20rpx;
				}
			}
		}
	}
</style>