import http from '@/common/http'

export function getCategory() {
	return http.get('/api/category', {})
}
export function getActGoods(params) {
	return http.get('/api/goods/activity', params)
}
export function getRecommend(params) {
	return http.get('/api/goods/recommend', params)
}
export function getBanner(params) {
	return http.get('/api/v1/client/banners/', params)
}
export function getActivity(params) {
	return http.get('/api/activity', params)
}
export function getSearch() {
	return http.get('/api/search/worlds')
}
export function searchGoods(params) {
	return http.get('/api/search', params)
}
export function getGoodDetail(params) {
	return http.get('/api/goods/detail', params)
}
export function checkVersion(params){
	return http.get('/api/app/check_version',params)
}

// 登陆
export function userLogin(data){
	return http.post('/api/v1/login/', data)
}

// 用户信息
export function getUserInfo(params){
	return http.get('/api/v1/client/user/user_info/', params)
}

// 商品
export function getGoods(params){
	return http.get('/api/v1/client/goods/', params)
}

// 推荐技师列表
export function getTechnician(params){
	return http.get('/api/v1/client/technician/', params)
}
