<template>
	<view>
		<view class="box">
			<view class="box-text">
				<view class="box-text-input">
					<view class="box-text-input-left">
						<text>日期选择</text>
					</view>
					<view class="box-text-input-right">
						<picker mode="date" :value="date" @change="bindDateChange">
							<view>{{date}}</view>
						</picker>
					</view>
				</view>
				<view class="box-text-input">
					<view class="box-text-input-left">
						<text>时间选择</text>
					</view>
					<view class="box-text-input-right">
						<picker mode="time" :value="time" :start="0+all.startTime" :end="all.endTime" @change="bindTimeChange">
							<view class="uni-input">{{time}}</view>
						</picker>
					</view>
				</view>
				<view class="box-text-input">
					<view class="box-text-input-left">
						<text>姓名</text>
					</view>
					<view class="box-text-input-right">
						<input type="text" name="username" id="username" :value="Info.userName" />
					</view>
				</view>
				<view class="box-text-input">
					<view class="box-text-input-left">
						<text>手机号码</text>
					</view>
					<view class="box-text-input-right">
						<input type="text" name="phonenumber" id="phonenumber" :value="Info.phonenumber" />
					</view>
				</view>
				<view class="box-text-input">
					<view class="box-text-input-left">
						<text>上车地点</text>
					</view>
					<view class="box-text-input-right">
						<picker @change="shangche" :value="index1" :range="array1">
							<view class="uni-input">{{array1[index1]}}</view>
						</picker>
					</view>
				</view>
				<view class="box-text-input">
					<view class="box-text-input-left">
						<text>下车地点</text>
					</view>
					<view class="box-text-input-right">
						<picker @change="xiache" :value="index2" :range="array2">
							<view class="uni-input">{{array2[index2]}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="box-button">
				<button type="button" @tap="TORecognize">下一步</button>
			</view>
		</view>
	</view>
</template>

<script>
	import fetch from '../../../../../../common/fetch'
	export default {
		data() {
			const currentDate= this.getDate({
				format:true
			})
			return {
				time:'12:01',
				date:currentDate,
				index1:0,
				index2:0,
				all:[{}],
				array1:'',
				array2:'',
				Info:'',
				To:{
					userName:'',
					phonenumber:'',
					shangche:'',
					xiache:'',
					price:'',
					path:''
				}
			}
		},
		methods: {
			bindDateChange(e){
				this.date=e.detail.value
			}
			,
			bindTimeChange(e) {
			    this.time = e.detail.value
			},
			getDate(type) { //年月日
			            const date = new Date();
			            // const date = new Date();
			            let year = date.getFullYear();
			            let month = date.getMonth() + 1;
			            let day = date.getDate();
			            if (type === 'start') {
			                year = year - 60;
			            } else if (type === 'end') {
			                year = year + 2;
			            }
			            month = month > 9 ? month : '0' + month;
			            day = day > 9 ? day : '0' + day;
			            return `${year}-${month}-${day}`;
			},
			shangche(e){
				this.index1=e.detail.value
				if(e.detail.value!=0){
					this.array2=this.all.array.filter((item,index)=>{
						 if(index>e.detail.value)return item
					})
				}else{
					this.array2=this.all.array.toSpliced(0,1)
				}
			},
			xiache(e){
				this.index2=e.detail.value
			},
			TORecognize(){
				this.To.userName=this.Info.userName
				this.To.phonenumber=this.Info.phonenumber
				this.To.shangche=this.array1[this.index1]
				this.To.xiache=this.array2[this.index2]
				this.To.price=this.all.price
				this.To.path=this.all.path
				uni.navigateTo({
					url:'recognize/recognize?all='+encodeURIComponent(JSON.stringify(this.To))
				})
			},
			getInfo(){
				fetch({
					url:'/prod-api/api/common/user/getInfo'
				}).then(res=>{
					this.Info=res.user
				})
			}
		},
		onLoad(options) {
			this.all=JSON.parse(decodeURIComponent(options.all))
			this.array1=this.all.array.toSpliced(this.array2.length-1,1)
			this.array2=this.all.array.toSpliced(0,1)
			this.getInfo()
			console.log(this.all);
		}
	}
</script>

<style lang="scss">
	.box{
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 40rpx;
		.box-text{
			.box-text-input{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				border-bottom: 2rpx solid #aaaaaa;
				.box-text-input-left{
					height: 100rpx;
					line-height: 100rpx;
					text-indent: 1em;
				}
				.box-text-input-right{
					height: 100rpx;
					line-height: 100rpx;
					margin-right: 1em;
					input{
						float: right;
						width: 100%;
						height: 100%;
						text-align: end;
					}
				}
			}
		}
		.box-button{
			button{
				width: 70%;
				background-color: #237bff;
				color: #fff;
			}
		}
	}
</style>
