import {
	getUserInfo, userLogin
} from "@/common/api"
const user = {
	namespaced: true,
	state: {
		userInfo: {},
		token: ''
	},
	mutations: {
		SET_TOKEN: (state, token) => {
			// state.userInfo = userInfo
			state.token = token
		},
		SET_USER_INFO: (state, userInfo) => {
			state.userInfo = userInfo
		}

	},
	actions: {
		Login({commit}, data){
			return new Promise((resolve, reject) => {
				userLogin(data).then(response => {
					// if (response.code === 2000) {
					// 	uni.navigateBack({
					// 		delta: 1
					// 	})
					// }
					const token = response.data.access
					commit('SET_TOKEN', token)
					uni.setStorageSync('TOKEN', token)
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},
		GetUserInfo({commit}){
			return new Promise((resolve, reject) => {
				getUserInfo().then(response => {
					const userInfo = response.data
					commit('SET_USER_INFO', userInfo)
					uni.setStorageSync('userInfo', userInfo)
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		}
	},
	getters: {
		users: (state, getters, rootState) => {
			// console.log(state.items)
			let temp = []
			for (var item of state.items) {
				// console.log(item)
				if (item.type == 1) {
					temp.push(item);
				}
			}
			state.items.map((item) => {
				return {
					image: item.image,
					url: item.url,
					activity_type: item.activity_type
				}
			});
			return temp.map((item) => {
				return {
					image: item.image,
					url: item.url,
					activity_type: item.activity_type
				}
			});
		},
		index_1: (state, getters, rootState) => {
			let temp = {}
			for (var item of state.items) {
				if (item.type == 2) {
					temp = item;
					break;
				}
			}
			return temp;

		}
	}

}
export default user
