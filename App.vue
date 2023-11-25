<script>
	export default {
		data(){
			
		},
		onLaunch: function() {
			const that = this
			uni.getSystemInfo({
				success(res) {
					that.globalData.statusBarHeight = res.statusBarHeight
				}
			})
			this.checkVersion().catch(() => {});
			const lang = uni.getLocale();
			// uni.getLocation({
			// 	type: 'wgs84',
			// 	geocode:true,
			// 	success: function(res) {
			// 		console.log(res)
			// 	},
			// 	fail: function() {
			// 		that.show = true;
					
			// 	}
			// })
		},
		globalData: {
			statusBarHeight: ''
		},
		onShow: function() {},
		onHide: function() {
			console.log('App Hide')
		},
		data() {
			return {
				isShow: false
			}
		},
		methods: {
			getClientId() {
				const client = plus.push.getClientInfo();
				console.log('当前设备ID', client)
			}
		}

	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import './common/common.css';
	@import "@/uni_modules/uview-ui/index.scss";

	page {
		background: #eee;
		// height: 100%;
		font-size: 28upx;
		line-height: 1.8;
	}
</style>