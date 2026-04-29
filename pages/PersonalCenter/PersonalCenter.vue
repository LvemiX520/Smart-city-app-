<template>
	<view class="p">
		<view class="p-avatar">
			<view class="u-demo-area">
				<u-avatar :mode="avatar.mode" :size="avatar.size" :src="avatar.src" :text="avatar.text" :showLevel="avatar.showLevel" :showSex="avatar.showSex"
					:sexIcon="avatar.sexIcon" :bgColor='avatar.bgColor'></u-avatar>
			</view>
			<text>{{user.userName}}</text>
		</view>
		<view class="p-setup">
			<view v-for="(item,index) in setup.title" :key="index" class="p-setup-line" @tap="TapSetup(item.src)">
				<u-cell-item center :is-link="true" :label="setup.label" index="index" 
				 :arrow="setup.arrow" :title="item.text">
					<u-badge :absolute="false" v-if="setup.rightSlot == 'badge'" count="105" slot="right-icon"></u-badge>
					<u-switch v-if="setup.rightSlot == 'switch'" slot="right-icon" v-model="setup.checked"></u-switch>
				</u-cell-item>
			</view>
		</view>
		<view class="p-out">
			<u-button @tap="logout()" data-name="3333" :loading="out.loading" :plain="out.plain" :shape="out.shape" :size="out.size"
				:ripple="out.ripple" :hairLine="out.hairLine" :type="out.type" class="p-out-u">退出</u-button>
		</view>
	</view>
</template>

<script>
	import fetch from '../../common/fetch'
	export default {
		data() {
			return {
				avatar: {
					mode: 'circle',
					src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
					text: '', // 优先级比src高
					size: '160',
					showLevel: false,
					showSex: false,
					sexIcon: 'man',
					bgColor: '#fcbd71'
				},
				setup:{
					arrow: true,
					label: '',
					rightSlot: true,
					checked: false,
					title:[{
						text:'个人设置',
						src:'PersonalSettings'
					},{
						text:'我的订单',
						src:'MyOrders'
					},{
						text:'修改密码',
						src:'SetPassword'
					},{
						text:'意见反馈',
						src: 'Feedback'
					}],
				},
				out: {
					hairLine: true,
					type: 'primary',
					size: 'default',
					shape: 'square',
					plain: false,
					ripple: false,
					loading: false,
				},
				user:[{}],
			}
		},
		methods: {
			TapSetup(src){
				uni.navigateTo({
					url:'/pages/PersonalCenter/'+src+'/'+src
				})
			},
			getText(){
				console.log(uni.getStorageSync('user-token'));
				fetch({
					url:'/prod-api/api/common/user/getInfo',
				}).then(res=>{
					this.user=res.user
					console.log(this.user);
				}).catch(res=>{
					console.log(res);
				})
			},
			logout(){
				// fetch({
				// 	url:'/logout',
				// 	method:'post',
				// }).then(response=>{
				// 	console.log(response);
				// 	localStorage.removeItem("user-token")
				// 	uni.redirectTo({
				// 		url:'/pages/deployment/deployment'
				// 	})
				// })
				uni.request({
					url:'http://10.20.18.2:10001/logout',
					method:'post'
				}).then(res=>{
					console.log(res);
					localStorage.removeItem("user-token")
					uni.redirectTo({
						url:'/pages/deployment/deployment'
					})
				})
			}
		},
		onLoad() {
			this.getText()
		}
	}
</script>

<style lang="scss">
	.p{
		display: flex;
		flex-direction: column;
		gap: 30rpx;
		.p-avatar{
			display: flex;
			flex-direction: column;
			text{
				margin-top: 20rpx;
				align-self: center;
			}
		}
		.p-setup{
			.p-setup-line{
				border-bottom: 3rpx solid #e0e0e0;
				&:first-child{
					border-top: 3rpx solid #e0e0e0;
				}
			}
		}
		.u-demo-area {
			margin-top: 30rpx;
		}
		.p-out-u{
			width: 80%;
		}
	}

</style>