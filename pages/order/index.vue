<template>
	<view class="page-body">
		<view class="header">
			<u-navbar title="全部订单" leftIcon=""></u-navbar>
		</view>
		<view class="body">
			<u-tabs :list="conditions" lineWidth="0" lineHeight="0" :activeStyle="{
	    color: '#303133',
	    fontWeight: 'bold'}">
			</u-tabs>
		</view>
	</view>
	<!-- </view> -->
</template>

<script>
	export default {
		components: {

		},
		computed: {

		},
		onLoad: function(options) {},
		data() {
			return {
				lineBg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAOCAYAAABdC15GAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFxSURBVHgBzZNRTsJAEIb/WTW+lpiY+FZPIDew3ABP4GJ8hxsI9zBpOYHeQDwBPQI+mRiRvpLojtPdYhCorQqF/6GdbGd2vvwzBXZcNAt4oj1ANeUoAT5iqkUjbEFLHNmhD1YPEvpZ3ghkGlVDCkc94/BmHMq998I5ONiY1ZBfpKAyuOtgAc5yOEDmYEWNh32BHF91sGHZHmwW4azciN9aQwnz3SJEgOmte+R2tdLprTYoa50mvuomlLpD4Y3oQZnov6D2RzCqI93bWOHaEmAGqQUyRBlZR1WfarcD/EJ2z8DtzDGvsMCwpm8XOCfDUsVOCYhiqRxI/CTQo4UOvjzO7Pow18vfywneuUHHUUxLn55lLw5JFpZ8bEUcY8oXdOLWiHLTxvoGpLqoUmy6dBT15o/ox3znpoycAmxUsiJTbs1cmxeVKp+0zmFIS7bGWiVghC7Vwse8jFKAX9eljh4ggKLLv7uaQvG9/F59Oo2SouxPu7OTCxN/s8wAAAAASUVORK5CYII=",
				isClickChange: false,
				height: 0,
				tabIndex: 0,
				scrollTop: 0,
				conditions: [{
					name: '全部',
				}, {
					name: '已完成',
				}, {
					name: '已取消/退款',
				}, {
					name: '待评价'
				}],
			}
		},
		methods: {
			tagClick(cate, scate) {
				uni.showLoading({
					title: "数据加载中..."
				})
				this.params = {
					cid: cate.id,
					scid: scate.id,
					score: 1,
					page: 1,
					id: 0
				}
				this.$store.dispatch('good/GetActGoods', this.params).then(() => {
					uni.hideLoading();
					uni.navigateTo({
						url: '/pages/activity/index?id=0&name=' + scate.name + '&scid=' + scate.id +
							'&cid=' + cate.id
					});
				}).catch(() => {
					uni.hideLoading();
				});


			},
			async tapTab(tab, index) {

				if (this.tabIndex == index) {
					return false;
				} else {
					let tabBar = await this.getElSize("tab-bar"),
						tabBarScrollTop = tabBar.scrollTop;
					this.scrollTop = tabBarScrollTop;
					this.isClickChange = true;
					this.tabIndex = index;
				}

			},
			async getData() {
				if (this.categorys.length == 0) {
					uni.showLoading({
						title: "数据加载中..."
					})
					await this.$store.dispatch('category/GetCategory')
					uni.hideLoading();
				}
				// console.log(this.categorys)
			},
			async changeTab(e) {
				// console.log("changeTab:" + index)
				let index = e.target.current

				if (this.isClickChange) {
					this.tabIndex = index;
					this.isClickChange = false;
					return;
				}
				let tabBar = await this.getElSize("tab-bar"),
					tabBarScrollTop = tabBar.scrollTop;
				let height = 0;
				for (let i = 0; i < index; i++) {
					let result = await this.getElSize('tab_' + this.categorys[i].id);
					height += result.height;
				}
				let winHeight = uni.getSystemInfoSync().windowHeight,
					nowElement = await this.getElSize('tab_' + this.categorys[index].id),
					nowHeight = nowElement.height;
				if (height + nowHeight - tabBarScrollTop > winHeight) {
					this.scrollTop = height + nowHeight - winHeight;
				}
				if (height < tabBarScrollTop) {
					this.scrollTop = height;
				}
				this.isClickChange = false;
				this.tabIndex = index;

			}
		},

		/**
		 * 当 searchInput 配置 disabled 为 true 时触发
		 */
		onNavigationBarSearchInputClicked(e) {
			console.log('事件执行了')
			uni.navigateTo({
				url: '/pages/search/index'
			});
		},
		/**
		 *  点击导航栏 buttons 时触发
		 */
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: '/pages/center/footprint'
			});
		},
		onTabItemTap(e) {
			// console.log(e)
			if (e.index == 2) {
				this.getData()
			}
		}
	};
</script>

<style scoped lang="scss">
	.page-body {
		height: 100%;

		.header {
			margin-top: 10px;
			display: flex;
			align-items: center;
			justify-items: center;

			span {
				font-size: 16px;
				font-weight: 500;

			}
		}

		.body {
			margin-top: 40px;

			/deep/.u-tabs__wrapper__nav {
				justify-content: space-around;
			}
		}
	}
</style>