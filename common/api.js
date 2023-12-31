import http from '@/common/request'

// export function getCategory() {
// 	return http.request(me)
// }
// export function getActGoods(params) {
// 	return http.get('/api/goods/activity', params)
// }
// export function getRecommend(params) {
// 	return http.get('/api/goods/recommend', params)
// }
// export function getBanner(params) {
// 	return http.get('/api/v1/client/banners/', params)
// }
// export function getActivity(params) {
// 	return http.get('/api/activity', params)
// }
// export function getSearch() {
// 	return http.get('/api/search/worlds')
// }
// export function searchGoods(params) {
// 	return http.get('/api/search', params)
// }
// export function getGoodDetail(params) {
// 	return http.get('/api/goods/detail', params)
// }
// export function checkVersion(params){
// 	return http.get('/api/app/check_version',params)
// }

// 登陆
export function userLogin(data){
	return http.request({
		method: 'post',
		url: '/api/app/login',
		data: data
	})
}
// 轮播图
export function getBanner(params) {
	return http.request({
		method: 'get',
		url: '/api/app/home/banners',
		params: params
	})
}
// 用户信息
export function getUserInfo(){
	return http.request({
		method: 'get',
		url: '/api/app/mine/info'
	})
}

// 跑马灯
export function getMarquee(params){
	return http.request({
		method: 'get',
		url: '/api/app/home/marquee',
		params: params
	})
}

// 收益排行
export function getIncomeRank(params){
	return http.request({
		method: 'get',
		url: '/api/app/home/incomeRank',
		params:params
	})
}

// 收益展示
export function getIncome(params){
	return http.request({
		method: 'get',
		url: '/api/app/home/income',
		params:params
	})
}

// 技师列表
export function getTechnician(query){
	return http.request({
		method: 'get',
		url: '/api/v1/client/technician/',
		params: query
	})
}

// 获取技术服务项目
// 技师列表
export function getMasterGoods(query){
	return http.request({
		method: 'get',
		url: '/api/v1/client/technician/getMasterGoods/',
		params: query
	})
}


// 登录验证码
export function getMobileCode(query){
	return http.request({
		method: 'get',
		url: '/api/app/getCode',
		params: query
	})
}

// vip卡列表
export function getVipList(query) {
	return http.request({
		method: 'get',
		url: '/api/app/mine/vipCard/list',
		params: query
	})
}


// 支付渠道
export function getPayChannel(query) {
	return http.request({
		method: 'get',
		url: '/api/app/mine/channel/list',
		params: query
	})
}

// 支付
export function payMoney(data) {
	return http.request({
		method: 'post',
		url: '/api/v1/client/payMoney/pay/',
		data: data
	})
}

// 获取推广列表
export function getPromotionList(query) {
	return http.request({
		method: 'get',
		url: '/api/app/mine/promotion/list',
		params: query
	})
}

// 项目详情
export function getGoodsInfo(query) {
	return http.request({
		method: 'get',
		url: '/api/v1/client/goods/getDetails',
		params: query
	})
}
