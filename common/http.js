import Request from '@/common/request'
import Config from '@/common/config'
import store from "@/store";
const http = new Request()

http.setConfig((config) => {
	config.baseUrl = Config.server
	config.responseType = "json"
	return config
})

// 拦截器
http.interceptor.request(async (config, cancel) => {
	let token = uni.getStorageSync('TOKEN')
	console.log(config)
	if (token) {
		config.header["Authorization"] = 'JWT ' + token
	}
	return config;
})
http.interceptor.response((response) => {
	// console.log(response)

	const res = response.data;
	if(res.code !== 2000){
		console.log(res)
		return Promise.reject(res);
	}else{
		return response.data;
	}
})

export default http
