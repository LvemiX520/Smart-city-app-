<template>
	<view>
		<view class="u-demo-area">
			<u-search v-model="value" @change="change" @custom="custom" @search="search" :shape="shape"
				:clearabled="clearabled" :show-action="showAction" :input-align="inputAlign" @clear="clear"></u-search>
		</view>
		<view class="hospital">
			<view class="hospital-message" v-for="(item,index) in list" :key="item.id" @tap="enterDetails(item.id)">
				<image class="image" :src="ip + item.imgUrl" mode=""></image>
				<text class="text">{{item.hospitalName}}</text>
				<view class="u-demo-rate">
					<u-rate v-model="item.level" :count="rate.count" @change="change" :active-color="rate.activeColor"
						:inaction-color="rate.inactiveColor" :active-icon="activeIcon" :inactive-icon="inactiveIcon"
						:disabled="rate.disabled" :colors="rate.colors" :icons="rate.icons"></u-rate>
				</view>
				<u-icon class="icon" name="arrow-right" size="30" color="#b1b1b1"></u-icon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ip: 'http://10.20.18.2:10001',
				value: '',
				shape: 'round',
				clearabled: true,
				showAction: true,
				inputAlign: 'left',
				list: [{}],
				rate: {
					activeColor: '#FA3534',
					inactiveColor: '#b2b2b2',
					disabled: false,
					count: 5,
					customIcon: false,
					plain: false,
					value: 2,
					colors: [],
					icons: []
				},
				id:''
			}
		},
		watch: {
			// 这里的演示为证明通过v-model绑定值，它是双向绑定的，意味着您无需监听change事件
			// 也能知道value值当前的内容
			value(val) {
				// console.log(val);
			}
		},
		methods: {
			getmessage() {
				uni.request({
					url: this.ip + '/prod-api/api/hospital/hospital/list',
					success: (res) => {
						console.log(res.data.rows);
						this.list = res.data.rows
					}
				})
			},
			enterDetails(e) {
				uni.navigateTo({
					url:'./details?id='+e,
				})
			},
			// change(value) {
			// 	// 搜索框内容变化时，会触发此事件，value值为输入框的内容
				
			// },
			// custom(value) {
			// 	//console.log(value);
			// 	this.$u.toast('输入值为：' + value)
			// },
			// search(value) {
			// 	this.$refs.uToast.show({
			// 		title: '搜索内容为：' + value,
			// 		type: 'success'
			// 	})
			// },
			// clear() {
			// 	// console.log(this.value);
			// }
		},
		onLoad() {
			this.getmessage()
		}
	}
</script>

<style lang="scss">
	.u-demo-area {
		padding: 20rpx;
	}

	.hospital {
		border-top: 1rpx solid #dcdcdc;
		display: flex;
		flex-direction: column;

		.hospital-message {
			position: relative;
			width: 100%;
			height: 150rpx;
			display: flex;
			flex-direction: row;
			border-bottom: 1rpx solid #dcdcdc;
			.image {
				width: 15%;
				height: 60%;
				align-self: center;
				margin: 0 20rpx;
			}

			.text {
				font-size: 31rpx;
				align-self: center;
			}
			.u-demo-rate {
				position: absolute;
				right: 10%;
				align-self: center;
			}
			.icon {
				position: absolute;
				right: 0;
				align-self: center;
			}
		}
	}
</style>