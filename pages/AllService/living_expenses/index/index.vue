<template>
	<view class="p">
		<view class="box">
			<view class="box-lbt">
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item v-for="(item,index) in lbt">
						<image :src="baseUrl+item.advImg" mode="scaleToFill" style="width: 100%;height: 100%;"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="box-text">
				<text>
					转眼已到五月，人们如需要生活缴费、医院挂号和医疗咨询等服务，则需要顶着烈日在街上来回奔波了。易信生活缴费和挂号功能正式上线，解决了大家这一难题。登陆易信进入“我的便利店”，动动手指就可以全部搞定。
				</text>
			</view>
			<view class="box-input">
				<view class="box-input-flex" v-for="(item,index) in button">
					<image :src="baseUrl+item.imgUrl" mode=""></image>
					<text>{{item.liveName}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { baseUrl } from '../../../../common/fetch'
	import fetch from '../../../../common/fetch'
	export default {
		data() {
			return {
				baseUrl:baseUrl,
				lbt:[{}],
				button:[{}]
			}
		},
		methods: {
			getLbt(){
				fetch({
					url:'/prod-api/api/living/rotation/list'
				}).then(res=>{
					this.lbt=res.rows
				})
			},
			getS(){
				fetch({
					url:'/prod-api/api/living/category/list'
				}).then(res=>{
					this.button=res.data
				})
			}
		},
		onLoad() {
			this.getLbt()
			this.getS()
		}
	}
</script>

<style lang="scss">
	.p{
		height: 100vh;
		background-color: #f5f5f5;
		.box{
			display: flex;
			flex-direction: column;
			gap: 35rpx;
			.box-text{
				align-self: center;
				background-color: #fff;
				width: 90%;
				padding: 25rpx;
				text-indent: 2em;
				text{
					line-height: 50rpx;
				}
			}
			.box-input{
				$list:#5858e8,#33ba9f,#efae1f,#69a5ed;
				display: flex;
				gap: 50rpx;
				flex-wrap: wrap;
				flex-direction: row;
				justify-content: center;
				padding-left: 30rpx;
				padding-right: 30rpx;
				.box-input-flex{
					width: 140px;
					height: 100px;
					text-align: center;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					border-width: 2rpx;
					border-style: solid;
					image{
						width: 50%;
						height: 70%;
					}
					text{
						width: 100%;
					}
				}
				@each $var in $list {
					$i:index($list,$var);
					.box-input-flex:nth-child(#{$i}){
						border-color: $var;
						text{
							color: $var;
						}
					}
				}
			}
		}
	}
</style>
