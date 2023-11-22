<template>
	<view class="uni-tab-bar app" :style="{'padding-top': statusBarHeight + 'px'}">
		<view class="banner">
			<u-swiper :list="bannerList" keyName="uri" indicator indicatorMode="line" circular></u-swiper>
		</view>
		<view class="marquee">
			<u-notice-bar :text="marquee" bgColor="#eee"></u-notice-bar>
		</view>
	</view>
</template>

<script>
	import uniFloatingButton from '@/components/uni-floating-button/uni-floating-button.vue';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue';
	import uniGrid from '@/components/uni-grid/uni-grid.vue';
	import {
		getBanner,
		getMarquee,
		getIncomeRank,
		getIncome
	} from '@/common/api'
	import {
		mapGetters
	} from 'vuex';
	import {
		paseNum,
		openGps
	} from '@/common/util';
	import uniCard from "@/components/uni-card/uni-card.vue";
	import config from "@/common/config.js";

	export default {
		components: {
			uniCard,
			uniGrid,
			uniLoadMore,
			uniSwiperDot,
			uniFloatingButton
		},

		computed: {},

		data() {
			return {
				statusBarHeight: getApp().globalData.statusBarHeight || 20,
				isShow: false,
				title: "提示",
				openNow: false,
				content: "定位失败，请打开手机定位",
				pullDownRefresh: true,
				tabs: [],
				showFloatButton: false,
				scrollTop: 0,
				oldScrollTop: 0,
				isClickChange: false,
				scrollLeft: 0,
				tabIndex: 0,
				loadmoreStatue: 'more',
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				loadingText: {
					// contentdown: '下拉加载更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				bannerList: [],
				marquee: '',
				incomeRankList: [],
				incomeList: []
			};
		},
		create() {

		},
		onLoad: function(options) {
			const that = this;
			this.getBanners();
			this.getMarqueeList();
			this.getIncomeRankList();
			that.getIncomeList();
			uni.getLocation({
				type: 'wgs84',
				geocode: true,
				success: function(res) {
					console.log(res)
				},
				fail: (error) => {
					that.isShow = true;
					// that.openNow = true;

				}
			})
		},
		methods: {
			async getBanners() {
				let res = await getBanner()
				for (let i = 0; i < res.data.results.length; i++) {
					const host = config.server + '/';
					res.data.results[i].uri = (host + res.data.results[i].uri) || null;
					this.bannerList.push(res.data.results[i])
				}
			},
			async getIncomeRankList() {
				let params = {
					pageNum: 1,
					pageSize: 3,
				}
				let res = await getIncomeRank(params);
				this.incomeRankList = res.data.results;
			},
			async getMarqueeList() {
				let res = await getMarquee()
				this.marquee = res.data.results[0].content;
			},
			async getIncomeList() {
				let res = await getIncome();
				this.incomeList = res.data.results;
			},
			async loadMore(cid) {
				let item = this.goods[cid];
				let page = item.page + 1;
				this.loadmoreStatue = 'loading';
				this.$store
					.dispatch('good/GetGoods', {
						cid: cid,
						page: page,
						push: true
					})
					.then(() => {
						this.loadmoreStatue = 'more';
					})
					.catch(() => {
						this.loadmoreStatue = 'noMore';
					});
			},
			confirm() {
				this.isShow = false;
				this.openNow = true;
				openGps(this.openNow);
			},
			cancel() {
				this.isShow = false;
			},
			bannerClick(banner) {
				if (banner.url != '') {
					if (banner.url.indexOf('https://') == 0) {
						// #ifdef APP-PLUS
						let link = banner.url;
						link = link.replace('https', 'taobao');

						plus.runtime.openURL(link, function(res) {
							uni.navigateTo({
								url: '/pages/web/index?url=' + escape(banner.url)
							});
						});

						// #endif
						// #ifdef H5
						uni.navigateTo({
							url: '/pages/web/index?url=' + escape(banner.url)
						});
						// #endif
					} else {
						uni.navigateTo({
							url: banner.url
						});
					}
				} else if (banner.activity_type > 0) {
					uni.navigateTo({
						url: '/pages/activity/index?id=' + banner.activity_type
					});
				}
			},
			gotTop() {
				this.scrollTop = this.oldScrollTop;
				this.$nextTick(function() {
					this.scrollTop = 0;
				});
			},
		},
		onNavigationBarSearchInputClicked(e) {
			console.log('事件执行了');
			uni.navigateTo({
				url: '/pages/search/index'
			});
		},

	};
</script>

<style lang="scss" scoped>
	.app {
		/*margin-top: 15px;*/
		height: auto;
		padding-bottom: 60px;

		.banner {
			margin: 0px 10px 0 10px;
		}

		.marquee {
			margin: 10px 10px 0 10px;

		}

		/deep/.u-notice-bar {
			padding: 0;
		}

		.top {
			.incomeTop {
				font-size: 15px;
				color: #333;
				display: flex;
				align-items: center;
				margin-top: 10px;
				margin-left: 10px;
			}

			.incomeTop::before {
				content: "";
				display: block;
				width: 15px;
				height: 20px;
				background: url("@/pages/home/images/tjtc.png") no-repeat;
				background-size: 100%;
				/*border-radius: 1px;*/
				margin-right: 5px;
				margin-top: 5px;
			}

			.incomeList {
				display: flex;
				flex-direction: column;

				// justify-content: space-around;
				.title {
					// display: flex;
					// justify-content: space-around;
					font-size: 14px;
					font-weight: 500;
				}

				.incomeItem {
					display: flex;
					align-items: center;
					justify-content: space-around;

					span img {
						display: flex;
						align-items: center;
						width: 20px;
						height: 20px;
					}
				}
			}

		}

		.income {
			margin-bottom: 20px;

			.title {
				display: flex;
				justify-content: space-around;
				font-size: 14px;
				font-weight: 500;
			}

			.incomeShow {
				font-size: 15px;
				color: #333;
				display: flex;
				align-items: center;
				margin-top: 10px;
				margin-left: 10px;
			}

			.incomeShow::before {
				content: "";
				display: block;
				width: 15px;
				height: 20px;
				background: url("@/pages/home/images/tjtc.png") no-repeat;
				background-size: 100%;
				/*border-radius: 1px;*/
				margin-right: 5px;
				margin-top: 5px;
			}

			.slider {
				height: 200px;
				overflow: hidden;
				position: relative;

				.sliderList {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					// position: absolute;
					// top: 0;
					// left: 0;
					animation: scroll 60s linear infinite;

					.slideItem {
						margin: 0;
						display: flex;
						justify-content: space-around;
					}
				}
			}

			@keyframes scroll {
				0% {
					transform: translateY(0);
				}

				100% {
					transform: translateY(-100%);
				}
			}
		}
	}
</style>