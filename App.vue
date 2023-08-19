<script>

	export default {
		onLaunch: function() {
			this.checkVersion().catch(()=>{

			})
			console.log('App Launch')
			const lang = uni.getLocale()
			console.log(lang)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import './common/common.css';

	page{
		background:#ffffff;
		height: 100%;
		font-size: 28upx;
		line-height: 1.8;
	}


</style>
