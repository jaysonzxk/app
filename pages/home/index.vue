<template>
	<view class="uni-tab-bar app" :style="{'padding-top': statusBarHeight + 'px'}">
		<view class="banner">
			<u-swiper :list="bannerList" keyName="uri" indicator indicatorMode="line" circular></u-swiper>
		</view>
		<view class="marquee">
			<u-notice-bar :text="marquee" bgColor="#eee"></u-notice-bar>
		</view>
		<view class="top">
			<span class="incomeTop">收益榜</span>
			<view class="incomeList">
				<view v-if="incomeRankList.length>0" class="incomeItem" v-for="(item, index) in incomeRankList" :key="index">
					<view>
						<span>{{ index+1 }}</span>
					</view>
					<view class="">
						<span>{{item.user}}</span>
					</view>
					<view class="">
						<span>{{item.income}}</span>
					</view>
				</view>
				<view v-else>
					<u-empty mode="list" icon="" text="暂无数据">
					</u-empty>
				</view>
			</view>
		</view>
		<view class="income">
			<span class="incomeShow">实时收益</span>
			<view class="slider">
				<div class="sliderList">
					<div class="slideItem" v-for="(item, index) in incomeList" :key="index">
						<span class="username">用户:{{item.user}}</span>
						<span class="money">收益:{{item.income}}U</span>
					</div>

				</div>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getBanner,
		getMarquee,
		getIncomeRank,
		getIncome
	} from '@/common/api'
	import {
		mapGetters
	} from 'vuex';
	import config from "@/common/config.js";

	export default {
		components: {
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
			this.getBanners();
		},
		onLoad: function(options) {
			const that = this;
			that.getBanners();
			that.getMarqueeList();
			that.getIncomeRankList();
			that.getIncomeList();
		},
		methods: {
			async getBanners() {
				let res = await getBanner();
				for (let i = 0; i < res.data.results.length; i++) {
					const host = uni.getSystemInfoSync().platform === 'ios' ? config.h5Serveer + '/': config.server + '/';
					console.log(host);
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
				font-weight: 700;
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
				.incomeItem{
					display: flex;
					align-items: center;
					justify-content: space-around;
					.rankIcon1{
						background: url('images/no1.png') no-repeat;
						width: 20px;
						height: 20px;
					}
					.rankIcon2{
						background: url('images/no2.png') no-repeat;
						width: 20px;
						height: 20px;
					}
					.rankIcon3{
						background: url('images/no3.png') no-repeat;
						width: 20px;
						height: 20px;
					}
					// span img {
					// 	display: flex;
					// 	align-items: center;
					// 	width: 20px;
					// 	height: 20px;
					// }
				}
			}
			
		}

		.income {
			// margin-bottom: 20px;
			padding-bottom: 20px;
			margin-top: 20px;
			.title {
				display: flex;
				justify-content: space-around;
				font-size: 14px;
				font-weight: 500;
			}

			.incomeShow {
				font-size: 15px;
				font-weight: 700;
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
				height: 300px;
				overflow: hidden;
				position: relative;
				display: flex;
				justify-content: center;
				.sliderList {
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					// position: absolute;
					// top: 0;
					// left: 0;
					animation: scroll 10s linear infinite;

					.slideItem {
						.username{
							margin-right: 20px;
						}
						
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