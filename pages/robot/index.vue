<template>
	<view class="jishi"  :style="{'padding-top': statusBarHeight + 'px'}">
		<view class="header">
			<u-tabs :list="conditions" lineWidth="0" lineHeight="0" :activeStyle="{
			    color: '#303133',
			    fontWeight: 'bold',
			}">
				</u-tabs>
		</view>
		<view class="body">
			<scroll-view @scroll="scroll" refresher-default-style="none" class="scroll" :refresher-triggered="triggered" @refresherrestore="onRestore"
				@refresherrefresh="onRefresh" @refresherabort="onAbout" refresher-background="#f0f0f0"
				:refresher-enabled="refresherEnabled" scroll-y @scrolltolower="loadMore()">
				<view class="recommend-good-list">
					<block v-for="(t,idx) in technicianList" :key="idx">
						<view class="items">
							<view class="item">
								<view class="img">
									<image class="avatar" :src="t.avatar"></image>
								</view>
								<view class="jishi-info">
									<view class="name">{{ t.name }}</view>
									<view class="time">
										<span style="margin-right: 5px">最早可约</span>
										<span>16:00</span>
									</view>
									<view class="stars">
										<span class="star">{{ t.starLevel }}</span>
										<span>单量{{ t.orderNum }}</span>
									</view>
									<view class="pingjia-fensi">
										<span class="pingjia">评价30</span>
										<span>粉丝{{ t.collectNum }}</span>
									</view>
								</view>
								<view class="other">
									<span class="distance">1km</span>
									<span class="btn" @click="reserve(t.id)">去预约</span>
								</view>
							</view>
						</view>
					</block>
					<!-- <uni-load-more :status="loadmoreStatue"
						:contentText="loadingText"></uni-load-more> -->
				</view>
			</scroll-view>
		</view>
		

	</view>
</template>

<script>
	import uniFloatingButton from "@/components/uni-floating-button/uni-floating-button.vue"
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
	import {
		mapGetters
	} from 'vuex';
	import {
		getTechnician,
		getMasterGoods
	} from "@/common/api";

	export default {
		components: {
			uniLoadMore,
			uniDrawer,
			uniFloatingButton,
		},
		computed: {},
		onLoad: function(options) {
			this._freshing = false
			this.getTechnicians()
		},
		data() {
			return {
				show: false,
				selectShow: false,
				indexType: undefined,
				statusBarHeight: getApp().globalData.statusBarHeight,
				pullDownRefresh: true,
				showFloatButton: false,
				scrollTop: 0,
				oldScrollTop: 0,
				canFix: true,
				startPrice: '',
				endPrice: '',
				refresherEnabled: true,
				triggered: false,
				masterGoodsList: [],
				showDrawer: false,
				params: {},
				total: 0,
				selectIndex: undefined,
				loadmoreStatue: 'more',
				technicianList: [],
				loadingText: {
					// contentdown: '下拉加载更多',
					contentrefresh: 'đang tải...',
					contentnomore: 'không còn dữ liệu'
				},
				queryParams: {
					limit: 10,
					page: 1,
				},
				conditions: [{
					name: '全部',
				}, {
					name: '单量优先',
				}, {
					name: '好评优先'
				}, {
					name: '距离优先'
				}],
			}
		},
		methods: {
			reserve(val) {
				uni.navigateTo({
					url: '/pages/jishi/reserve?userId=' + val,
				})
			},

			onRestore() {
				this.triggered = 'restore';
			},
			onRefresh() {
				this.loadmoreStatue = 'loading';
				if (this._freshing) return
				this._freshing = true;
				this.queryParams.page = 1;
				this.queryParams.limit = 10;
				this.technicianList = [];
				this.getTechnicians()
				this.triggered = 'restore';
				setTimeout(() => {
					this.triggered = false;
					this._freshing = false;
				}, 1000)
			},
			onAbout(e) {
				this.triggered = false;
			},
			async getTechnicians() {
				let res = await getTechnician(this.queryParams);
				if (res.code === 2000) {
					this.technicianList = this.technicianList.concat(res.data.data);
					this.total = res.data.total;
					if (this.technicianList.length === this.total) {
						this.loadmoreStatue = 'nomore';
					}
				}
			},
			cancel() {
				this.selectShow = false;
				this.selectIndex = undefined;
			},
			change(e) {
				console.log('e:', e);
			},
			closeDrawer(e) {
				this.showDrawer = false;
			},
			loadMore() {
				this.queryParams.page += 1;
				if (this.technicianList.length === this.total) {
					this.loadmoreStatue = 'nomore';
				} else {
					// this.loadmoreStatue = 'loading';
					this.getTechnicians()
					this.loadmoreStatue = 'more';
					
				}
			},
			reset() {
				this.startPrice = '';
				this.endPrice = '';
			},
			scroll(e) {
				if (e.detail.scrollTop == 0) {
					this.refresherEnabled = true;
					this.disabledPullRefresh(true);
				} else {
					//保证只设置一次
					if (!this.refresherEnabled) {
						this.disabledPullRefresh(false);
					}
					this.refresherEnabled = false;
				}
				this.oldScrollTop = e.detail.scrollTop;
			},


		},

	};
</script>

<style>
	.jishi {
		width: 100%;
		height: 100%;
	}
	.header{
		height: 40px;
	}
	.body {
		/* height: calc(100% - 40px); */
		height: 100%;
		background: #fff;
	}

	/deep/.u-tabs__wrapper__nav {
		justify-content: space-around;
	}
	/* /deep/.uni-scroll-view-refresh-inner{
		display: none;
	} */
	.scroll {
		/*width: 750upx;*/
		background: #eee;
		/* height: calc(100% - 40px); */
		height:100%;
		
	}

	.recommend-good-list {
		display: flex;
		width: 100%;
		/* flex-wrap: wrap; */
		height: 100%;
		flex-direction: column;
	}

	.items {
		background: #FFFFFF;
		/*width: 365upx;*/
		width: 100%;
		/* margin: 5px; */
		margin: 10px 5px 0 5px;
		display: flex;
		border-radius: 15upx;
		flex-direction: column;
	}

	.item {
		display: flex;
		justify-content: space-around;
		width: 100%;
	}

	.img {
		display: flex;
		align-items: center;
		/*justify-items: center;*/
		border-radius: 50%;
		border: 1px solid #eee;
		width: 75px;
	}

	.avatar {
		width: 60px;
		height: 60px;
		margin-left: calc(15px / 2);
	}

	.jishi-info {
		display: flex;
		flex-direction: column;
	}

	.name {
		font-size: 14px;
		font-weight: 600;
	}

	.stars {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: 10px;
	}

	.star {
		display: flex;
		align-items: center;
		margin-right: 5px;
	}

	.star:before {
		content: '';
		background: url("@/pages/robot/image/star.png") no-repeat;
		background-size: 100%;
		width: 12px;
		height: 12px;
	}

	.pingjia-fensi {
		font-size: 10px;
		color: #8F8F94;
		display: flex;
	}

	.pingjia {
		margin-right: 5px;
	}

	.time {
		background: rgb(255, 237, 236);
		border-radius: 5px;
		font-size: 10px;
		/*color: #fff;*/
		/*display: flex;*/
		/*width: auto;*/
		/*justify-content: space-around;*/
		/*text-align: center;*/
		/*width: 100%;*/
	}

	.other {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		margin-left: 20px;
	}

	.distance {
		font-size: 12px;
		color: #8F8F94;
		position: relative;
		top: 20px;
	}

	/*.distance:before{*/
	/*  content: '';*/
	/*  background: url("@/pages/jishi/image/location.png") no-repeat;*/
	/*  background-size: 100%;*/
	/*  display: inline-block;*/
	/*  width: 15px;*/
	/*  height: 15px;*/
	/*}*/
	.btn {
		background: rgb(255, 209, 51);
		text-align: center;
		border-radius: 12px;
		color: #000000;
		font-size: 14px;
		position: relative;
		bottom: 10px;
		padding: 0 12px;
		/*font-weight: 700;*/
	}

	.recommend-good-title-view {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.recommend-good-image-view {
		margin: 20upx 0 20upx 0;
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.recommend-good-condition-view {
		background: #FFFFFF;
		height: 80upx;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}

	.recommend-good-condition-item {
		/*width: 150upx;*/
		/*text-align: center;*/
		display: flex;
		align-items: center;
	}

	.recommend-good-condition-item:after {
		content: '';
		background: url("@/pages/robot/image/sort_down.png") no-repeat;
		background-size: 100%;
		width: 10px;
		height: 10px;
		margin-top: 3px;
	}

	.recommend-good-condition-color {
		/*color:#FF80AB;*/
		font-weight: 700;
	}

	.recommend-good-condition-color:after {
		content: '';
		background: url("@/pages/robot/image/sort_up.png") no-repeat;
		background-size: 100%;
		height: 10px;
		width: 10px;
	}

	.queren {
		height: 700rpx;
	}

	.tag {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
</style>