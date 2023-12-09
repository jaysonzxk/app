import {
	getBanner
} from "@/common/api"
const banner = {
	namespaced: true,
	state: {
		items: []
	},
	mutations: {
		SET_BANNER: (state, banner) => {
			state.items = banner
		}
	},
	actions: {
		GetBanner({
			commit
		}) {
			return new Promise((resolve, reject) => {
				getBanner().then(response => {
					const data = response.data.banner
					commit('SET_BANNER', data)
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		}
	}

}
export default banner
