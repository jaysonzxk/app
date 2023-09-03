<script>
	export default {
		onLaunch: function() {
			const that = this
			uni.getSystemInfo({
				success(res) {
					that.globalData.statusBarHeight = res.statusBarHeight
				}
			})
			this.checkVersion().catch(() => {})
			const lang = uni.getLocale()
      uni.getLocation({type: 'wgs84', success: function (res) {
          console.log('当前位置的经度：' + res.longitude);
          console.log('当前位置的纬度：' + res.latitude);
          console.log(res)
        }})
			console.log(this.isShow)
		},
		globalData: {
			statusBarHeight: ''
		},
		onShow: function() {},
		onHide: function() {
			console.log('App Hide')
		},
    data(){
      return {
        isShow: false
      }
    }

	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import './common/common.css';
	@import "@/uni_modules/uview-ui/index.scss";

	page {
		background: #ffffff;
		height: 100%;
		font-size: 28upx;
		line-height: 1.8;
	}
</style>
