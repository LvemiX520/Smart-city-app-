<template>
	<view>
		<view class="name u-border">
			<text>姓名</text>
			<input type="text" placeholder="请输入姓名" v-model="name.value"/>
		</view>
		<view class="sex u-border">
			<text>性别</text>
			<u-radio-group :shape="sex.shape" :size="sex.size" :width="sex.width" :wrap="sex.wrap" v-model="sex.value"
				@change="radioGroupChange" :activeColor="sex.activeColor" >
				<u-radio @change="radioChange" v-for="(item, index) in sex.list" :disabled="item.disabled" :key="index"
					:name="item.name">{{item.name}}</u-radio>
			</u-radio-group>
		</view>
		<view class="id u-border">
			<text>身份证号</text>
			<input type="text" placeholder="请输入身份证号" v-model="id.value"/>
		</view>
		<view class="date u-border">
			<text>出生年月</text>
			<view class="u-demo-area">
				<u-calendar v-model="date.show" ref="calendar" :mode="date.mode"
					:start-text="date.startText" :end-text="date.endText" :range-color="date.rangeColor"
					:range-bg-color="date.rangeBgColor" :active-bg-color="date.activeBgColor" :btn-type="date.btnType">
				</u-calendar>
				<view class="u-demo-result-line" @tap="open">
					{{date.result}}
				</view>
			</view>
		</view>
		<view class="phone u-border">
			<text>手机号</text>
			<input type="text"  placeholder="请输入手机号" v-model="phone.value"/>
		</view>
		<view class="address u-border">
			<text>住址</text>
			<input type="text" placeholder="请输入住址" v-model="address.value"/>
		</view>
		<view class="button">
			<button type="primary" @click="cancle()">取消</button>
			<button type="primary">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:{
					value:""
				},
				sex: {
					list: [{
							name: '男',
							checked: true,
							disabled: false
						},
						{
							name: '女',
							checked: false,
							disabled: false
						}
					],
					disabled: false,
					result: '男',
					shape: 'circle',
					value: '男',
					activeColor: '#2979ff',
					size: 34,
					wrap: false,
					width: 'auto'
				},
				id:{
					value:""
				},
				date: {
					show: false,
					mode: 'range',
					result: "请选择日期",
					startText: '开始',
					endText: '结束',
					rangeColor: '#2979ff',
					rangeBgColor: 'rgba(41,121,255,0.13)',
					activeBgColor: '#2979ff',
					btnType: 'primary',
					value:""
				},
				phone:{
					value:"",
				},
				address:{
					value:""
				}
			}
		},
		methods: {
			open() {
				this.date.show = true
			},
			cancle() {
				uni.navigateTo({
					url:"./card"
				})
			},
		}
	}
	
</script>

<style lang="scss">
	.u-border {
		width: 100%;
		height: 130rpx;
		font-size: 35rpx;
		border-bottom: 1rpx solid #b9b9b9;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		input {
			font-size: 35rpx;
			text-align: right;
		}
	}
	.button {
		display: flex;
		flex-direction: row;
		margin-top: 20rpx;
		button {
			width: 40%;
			height: 90rpx;
			border-radius: 50rpx;
		}
	}
</style>