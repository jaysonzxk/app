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
		url: '/api/v1/login/',
		data: data
	})
}
// 轮播图
export function getBanner(params) {
	return http.request({
		method: 'get',
		url: '/api/v1/client/banners/',
		params: params
	})
}
// 用户信息
export function getUserInfo(params){
	return http.request({
		method: 'get',
		url: '/api/v1/client/user/user_info/',
		params: params
	})
}

// 商品
export function getGoods(params){
	return http.request({
		method: 'get',
		url: '/api/v1/client/goods/',
		params: params
	})
}

// 推荐技师列表
export function getTechnician(params){
	return http.request({
		method: 'get',
		url: '/api/v1/client/technician/',
		params: params
	})
}
