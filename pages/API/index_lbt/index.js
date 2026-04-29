export default function() {
	uni.request({
		url: 'http://10.20.18.2:10001/prod-api/api/rotation/list',
		success: (res) => {
			console.log(res.data.rows);
		}
	})
	return res.data
}