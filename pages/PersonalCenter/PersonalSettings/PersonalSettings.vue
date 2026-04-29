<template>
	<view>
		<view class="p-setup">
			<view class="p-setup-line">
				<text class="p-setup-left">{{this.setup.title[0]}}</text>
				<view class="p-setup-right">
					<view class="u-demo-area">
						<u-avatar :mode="avatar.mode" :size="avatar.size" :src="avatar.src" :text="avatar.text" :showLevel="avatar.showLevel" :showSex="avatar.showSex"
							:sexIcon="avatar.sexIcon" :bgColor='avatar.bgColor'></u-avatar>
					</view>
				</view>
			</view>
			<view class="p-setup-line">
				<text class="p-setup-left">{{this.setup.title[1]}}</text>
				<view class="p-setup-right">
					<input type="text" name="nickName" id="nickName" :value="user.nickName" @input="nickName=$event.target.value"/>
				</view>
			</view>
			<view class="p-setup-line">
				<text class="p-setup-left">{{this.setup.title[2]}}</text>
				<view class="p-setup-right">
					<u-radio-group v-model="setup.radio" :width="setup.radioCheckWidth" :wrap="setup.radioCheckWrap">
						<u-radio shape="circle" v-for="(item, index) in setup.radioList" :key="index" :name="item.name">{{ item.name }}</u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="p-setup-line">
				<text class="p-setup-left">{{this.setup.title[3]}}</text>
				<view class="p-setup-right">
					<input type="text" name="idCard" id="idCard" :value="user.idCard" @input="idCard=$event.target.value"/>
				</view>
			</view>
			<view class="p-setup-line">
				<text class="p-setup-left">{{this.setup.title[4]}}</text>
				<view class="p-setup-right">
					<input type="text" name="phonenumber" id="phonenumber" :value="user.phonenumber" @input="phonenumber=$event.target.value"/>
				</view>
			</view>
		</view>
		<view class="p-out">
			<u-button @tap="setuser" data-name="3333" :loading="out.loading" :plain="out.plain" :shape="out.shape"
				:size="out.size" :ripple="out.ripple" :hairLine="out.hairLine" :type="out.type"
				class="p-out-u">确认</u-button>
		</view>
	</view>
</template>

<script>
	import fetch from '../../../common/fetch'
	export default {
		data() {
			return {
				avatar: {
					mode: 'circle',
					src: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
					text: '', // 优先级比src高
					size: '60',
					showLevel: false,
					showSex: false,
					sexIcon: 'man',
					bgColor: '#fcbd71'
				},
				setup: {
					arrow: true,
					label: '',
					title: ['头像', '昵称', '性别', '证件号', '手机号'],
					radioList: [
						{
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
					radio:'男',
					radioCheckWidth: 'auto',
					radioCheckWrap: false,
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
				idCard:'',				
				nickName:'',				
				phonenumber:'',							
			}
		},
		methods: {
			getText(){
				fetch({
					url:'/prod-api/api/common/user/getInfo'
				}).then(res=>{
					this.user=res.user
					this.setup.radio=this.user.sex=='0'?'男':'女'
					console.log(this.user);
				})
			},
			setuser(){
				console.log(this.idCard);
				fetch({
					url:'/prod-api/api/common/user',
					method:'put',
					data:{
						idCard:this.idCard ? this.idCard:this.user.idCad,
						nickName:this.nickName ? this.nickName:this.user.nickName,
						phonenumber:this.phonenumber ? this.phonenumber:this.user.phonenumber,
						sex:this.setup.radio=='男'?'0':'1'
						}
				}).then(res=>{
					console.log(res);
				}).catch(res=>{
					console.log(res);
				})
			}
		},
		onLoad() {
			this.getText()
		}
	}
</script>

<style lang="scss">
	.p-setup {
		margin-bottom: 30rpx;
		.p-setup-line {
			display: flex;
			height: 100rpx;
			flex-direction: row;
			justify-content: space-between;
			border-bottom: 3rpx solid #e0e0e0;

			&:first-child {
				border-top: 3rpx solid #e0e0e0;
			}

			.p-setup-left {
				margin-left: 30rpx;
				align-self: center;
				color: black;
			}
			.p-setup-right{
				display: flex;
				margin-right: 30rpx;
				align-self: center;
				justify-content: end;
				input{
					text-align: end;
				}
			}
		}

	}

	.p-out-u {
		width: 80%;
	}
</style>