<template>
		<view class="page-body">
      <view  class="header">
        <u-navbar
            title="全部订单"
        ></u-navbar>
        <u-tabs
            :list="list4"
            lineWidth="20"
            lineHeight="7"
            :lineColor="`url(${lineBg}) 100% 100%`"
            :activeStyle="{
        color: '#303133',
        fontWeight: 'bold',
        transform: 'scale(1.05)'
    }"
            :inactiveStyle="{
        color: '#606266',
        transform: 'scale(1)'
    }"
            itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;"
        >
        </u-tabs>
      </view>

		</view>
	<!-- </view> -->
</template>

<script>
export default {
	components: {

	},
	computed:{

	},
	onLoad:function(options){
	},
	data() {
		return {
      lineBg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAOCAYAAABdC15GAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFxSURBVHgBzZNRTsJAEIb/WTW+lpiY+FZPIDew3ABP4GJ8hxsI9zBpOYHeQDwBPQI+mRiRvpLojtPdYhCorQqF/6GdbGd2vvwzBXZcNAt4oj1ANeUoAT5iqkUjbEFLHNmhD1YPEvpZ3ghkGlVDCkc94/BmHMq998I5ONiY1ZBfpKAyuOtgAc5yOEDmYEWNh32BHF91sGHZHmwW4azciN9aQwnz3SJEgOmte+R2tdLprTYoa50mvuomlLpD4Y3oQZnov6D2RzCqI93bWOHaEmAGqQUyRBlZR1WfarcD/EJ2z8DtzDGvsMCwpm8XOCfDUsVOCYhiqRxI/CTQo4UOvjzO7Pow18vfywneuUHHUUxLn55lLw5JFpZ8bEUcY8oXdOLWiHLTxvoGpLqoUmy6dBT15o/ox3znpoycAmxUsiJTbs1cmxeVKp+0zmFIS7bGWiVghC7Vwse8jFKAX9eljh4ggKLLv7uaQvG9/F59Oo2SouxPu7OTCxN/s8wAAAAASUVORK5CYII=",
			isClickChange:false,
			height: 0,
			tabIndex: 0,
			scrollTop: 0,
      list4: [{
        name: '关注'
      }, {
        name: '推荐',
        badge: {
          isDot: true
        }
      }, {
        name: '电影',
      }, {
        name: '科技'
      }, {
        name: '音乐'
      }, {
        name: '美食'
      }, {
        name: '文化'
      }, {
        name: '财经'
      }, {
        name: '手工'
      }],
		}
	},
	methods: {
		getElSize(id) { //得到元素的size
				return new Promise((res, rej) => {
					uni.createSelectorQuery().select("#" + id).fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						res(data);
					}).exec();
				})
		},
		tagClick(cate,scate){
			// uni.navigateTo({
			// 	url: '/pages/activity/index?id=0&name='+scate.name+'&scid=' + scate.id
			// });

			uni.showLoading({
				title:"数据加载中..."
			})
			this.params = {
				cid:cate.id,
				scid:scate.id,
				score:1,
				page:1,
				id:0
			}
			this.$store.dispatch('good/GetActGoods',this.params).then(()=>{
				uni.hideLoading();
				uni.navigateTo({
					url: '/pages/activity/index?id=0&name='+scate.name+'&scid=' + scate.id+'&cid='+cate.id
				});
			}).catch(()=>{
				uni.hideLoading();
			});


		},
		async tapTab(tab, index) {

			if(this.tabIndex == index){
				return false;
			}else{
				let tabBar = await this.getElSize("tab-bar"),tabBarScrollTop = tabBar.scrollTop;
				this.scrollTop = tabBarScrollTop;
				this.isClickChange = true;
				this.tabIndex = index;
			}

		},
		async getData(){
			if(this.categorys.length == 0){
				uni.showLoading({
					title:"数据加载中..."
				})
				await this.$store.dispatch('category/GetCategory')
				uni.hideLoading();
			}
			// console.log(this.categorys)
		},
		async changeTab(e){
			// console.log("changeTab:" + index)
			let index = e.target.current

			if(this.isClickChange){
				this.tabIndex = index;
				this.isClickChange = false;
				return;
			}
			let tabBar = await this.getElSize("tab-bar"),tabBarScrollTop = tabBar.scrollTop;
			let height = 0;
			for(let i =0 ; i < index; i++){
				let result = await this.getElSize('tab_'+ this.categorys[i].id);
				height += result.height;
			}
			let winHeight = uni.getSystemInfoSync().windowHeight,nowElement = await this.getElSize('tab_' + this.categorys[index].id),nowHeight = nowElement.height;
			if(height + nowHeight - tabBarScrollTop > winHeight){
				this.scrollTop  = height + nowHeight -winHeight;
			}
			if(height < tabBarScrollTop){
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
	onTabItemTap(e){
		// console.log(e)
		if(e.index == 2){
			this.getData()
		}
	}
};
</script>

<style scoped lang="scss">
	.page-body {
		height: 100%;
    .header{
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-items: center;
      span {
        font-size: 16px;
        font-weight: 500;

      }
    }
	}

</style>
