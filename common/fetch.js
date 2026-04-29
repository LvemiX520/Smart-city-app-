let baseUrl;
function getbaseUrl(){
	// uni.getStorage({
	// 	key:'baseUrl',
	// 	success: (res) => {
	// 		baseUrl=res.data
	// 		console.log(baseUrl);
	// 	}
	// })
	baseUrl=uni.getStorageSync('baseUrl') ? 'http://'+uni.getStorageSync('baseUrl') : ''
}
function fetch(options) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: baseUrl+options.url,
			method: options.method || 'GET',
			data: options.data,
			header: {
				'Authorization': uni.getStorageSync('user-token') || ''
			},
			success: (res) => {
				if(res.data.code == 200) {
					if(options.url == '/prod-api/api/login') {
						uni.setStorageSync('user-token', res.data.token)
					}
					resolve(res.data)
				} else {
					var msg = ''
					switch (res.statusCode){
						case 404:
							msg = '未找到资源'
							break;
						case 403:
							msg = '禁止访问'
							break;
						case 401:
							msg = '未授权'
							break;
						default:
							msg = res.data.msg
							break;
					}
					uni.showToast({
						title: msg,
						icon:"error"
					})
					reject(res.data)
				}
			},
			fail: (err) => {
				uni.showToast({
					title: err.response.msg
				})
				reject(err)
			}
		})
	})
}
export {getbaseUrl,baseUrl}
export default {fetch}