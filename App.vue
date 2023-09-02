<script>

	export default {
		onLaunch: function() {
      const that = this
      uni.getSystemInfo({
        success(res){
          that.globalData.statusBarHeight = res.statusBarHeight
        }
      })
			this.checkVersion().catch(()=>{
			})
			const lang = uni.getLocale()
      console.log(lang)
		},
    globalData: {
      statusBarHeight: ''
    },
		onShow: function() {

			// plus.navigator.setFullscreen(false)
		},
		onHide: function() {
			console.log('App Hide')
		},

	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import './common/common.css';
  @import "@/uni_modules/uview-ui/index.scss";
  page{
		//background:#ffffff;
		//height: 100%;
		//font-size: 28upx;
		//line-height: 1.8;
	}


</style>
