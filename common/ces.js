function fetch(options){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:bassUrl+options.url,
			method:options.method||"GET",
			data:options.data,
			header:{
				"Authorization":uni.getStorageSync("user-token")||""
			},
			success: (res) => {
				if(res.data.code==200){
					if(options.url=="login"){
						uni.setStorageSync("user-token",res.data.token)
					}
					resolve(res.data)
				}else{
					var msg=""
					switch(res.statusCode){
						case 404:
							msg=""
							break;
						case 403:
							msg=""
							break;
						case 401:
							msg=""
							break;
						default:
							msg=res.data.msg
							break;
					}
					uni.showToast({
						title:msg,
						icon:"error"
					})
					reject(res.data)
				}
			},
			fail: (err) => {
				uni.showToast({
					title:err.response.msg
				})
				reject(err)
			}
		})
	})
}