<template>
	<view class="box">
		<swiper :indicator-dots="true" :autoplay="false" :interval="3000" :duration="1000" indicator-color="#aaaaaa" indicator-active-color="#fff" class="box-n" @change="sk" :current="a">
			<swiper-item v-for="(item,index) in list" v-if="item.type==1">
				<image :src="ip+item.advImg" mode=""></image>
			</swiper-item>
		</swiper>
		<view class="hideen" :style="{'display':display}">
			<text class="ip" @tap="TapIp">IP端口设置</text>
			<button type="default" class="button" @tap="TapLogin">立即体验</button>
		</view>
	</view>
</template>

<script>
	import { getbaseUrl } from '../../common/fetch';
	import fetch from '../../common/fetch';
	export default {
		data() {
			return {
				ip:'http://10.20.18.2:10001',
				list:[{}],
				a:0,
				display:'none'
			};
		},
		methods:{
			getYdt(){
				// fetch({
				// 	url:'/prod-api/api/rotation/list',
				// }).then(res=>{
				// 	this.list=res.rows
				// })
				uni.request({
					url:this.ip+'/prod-api/api/rotation/list',
					success: (res) => {
						this.list=res.data.rows
					}
				})
			},
			sk(e){
				e.detail.current==4 ? this.display='block' :this.display='none'
			},
			TapIp(){
				uni.navigateTo({
					url:'/pages/IP/IP'
				})
			},
			TapLogin(){
				getbaseUrl()
				uni.getStorageSync('user-token') ? uni.reLaunch({url:'/pages/index/index'}) : uni.reLaunch({url:'/pages/login/login'})
			}
		},
		onLoad() {
			this.getYdt()
		}
	}
</script>

<style lang="scss">
	.box{
		width: 100%;
		height: 100vh;
		.box-n{
			width: 100%;
			height: 100%;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.ip{
			position: fixed;
			color: #fff;
			right: 10%;
			top: 5%;
			font-size: 40rpx;
		}
		.button{
			background-color: transparent;
			border: 2px solid #fff;
			color: #fff;
			position: fixed;
			left: 50%;
			bottom: 5%;
			width: 250rpx;
			border-radius: 100rpx;
			transform: translate(-50%, -5%);
		}
	}
</style>