<template>
	<view class="uni-tab-bar app">
		<swiper :current="tabIndex" class="swiper-box touch-action-none" skip-hidden-item-layout="true" :duration="300"
			@change="changeTab">
			<swiper-item>
				<scroll-view class="good-list touch-action-none" :scroll-top="scrollTop" @scroll="scroll" scroll-y
					@scrolltolower="loadMore(good.cid)">
					<view class="banner">
						<uni-swiper-dot v-if="banners.length > 0">
							<swiper class="banner-swiper" :indicator-dots="indicatorDots" :autoplay="autoplay"
								:interval="interval" :duration="duration">
								<swiper-item v-for="(banner, index) in banners" :key="index">
									<view class="banner-swiper-item">
										<image :src="banner.image" lazy-load mode="aspectFill"
											@click="bannerClick(banner)" />
									</view>
								</swiper-item>
							</swiper>
						</uni-swiper-dot>
						<!-- <view class="grid-list"><uni-grid :options="activitys" :show-border="false" columnNum="4" @click="actClick"></uni-grid></view>
						<view class="active-title-image"><image :src="index_1.image" lazy-load mode="aspectFill" @click="bannerClick(index_1)"></image></view> -->
					</view>
					<span class="tip">服务项目</span>
					<!-- <view class="cate-grid-list" v-if="good.cid > 0">
						<uni-grid :options="gcategorys[index].sub_categorys" :show-border="false" columnNum="5" @click="tagClick"></uni-grid>
					</view> -->
					<block v-for="(product, index) in products" :key="product.id" class="item">
						<view class="uni-index-list-cell">
							<view class="list" @click="goodClick(g)">
								<image class="uni-good-list-logo" lazy-load :src="product.image"></image>
								<view class="uni-good-list-body">
									<view class="uni-good-list-text-top">{{ product.title }}</view>
									<view class="time">{{product.duration}}分钟</view>
									<view class="uni-good-list-text-bottom">
										<view class="bottom">
											<view class="prices">
												<span class="price">{{product.price}}</span>
												<span class="origin-price">{{product.originprice}}</span>
											</view>
											<view class="sales">
												已售 {{product.sales}}
											</view>
										</view>
										<!-- <text class="good-price-favour">天猫价￥{{ g.original_price }}</text>
										<text class="good-price-favour">淘宝价￥{{ g.original_price }}</text>
										<text class="good-sell-number">已售{{ g.sales_num }}件</text> -->
									</view>
								</view>
							</view>
						</view>
					</block>
					<uni-load-more :status="loadmoreStatue" :contentText="loadingText"></uni-load-more>
				</scroll-view>
			</swiper-item>
		</swiper>
		<uni-floating-button :visible="showFloatButton" @click="gotTop()"></uni-floating-button>
	</view>
</template>

<script>
	import uniFloatingButton from '@/components/uni-floating-button/uni-floating-button.vue';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue';
	import uniGrid from '@/components/uni-grid/uni-grid.vue';
	import {
		mapGetters
	} from 'vuex';
	import {
		paseNum
	} from '@/common/util';

	export default {
		components: {
			uniGrid,
			uniLoadMore,
			uniSwiperDot,
			uniFloatingButton
		},
		computed: {
			// ...mapGetters('category', {
			// 	categorys: 'categorys'
			// }),
			// ...mapGetters('category', {
			// 	gcategorys: 'gcategorys'
			// }),
			// ...mapGetters('good', {
			// 	goods: 'goods'
			// }),
			// ...mapGetters('banner', {
			// 	banners: 'banners'
			// }),
			// ...mapGetters('banner', {
			// 	index_1: 'index_1'
			// }),
			// ...mapGetters('activity', {
			// 	activitys: 'activitys'
			// })
		},
		onLoad: function(options) {
			this.getData();
		},

		data() {
			return {
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
					contentdown: '下拉加载更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				banners: [{
						id: 1,
						image: require("./images/banner1.png")
					},
					{
						id: 2,
						image: require("./images/banner2.png")
					},
					{
						id: 3,
						image: require("./images/1.png")
					}
				],
				products: [{
						id: 1,
						image: require("./products/1.png"),
						title: "本地颐固本养生Spa",
						duration: 100,
						originprice: 200,
						price: 180,
						sales: 10
					},
					{
						id: 2,
						image: require("./products/2.png"),
						title: "本地颐固本养生Spa",
						duration: 100,
						originprice: 200,
						price: 180,
						sales: 10
					},
					{
						id: 3,
						image: require("./products/3.png"),
						title: "足部按摩",
						duration: 100,
						originprice: 200,
						price: 180,
						sales: 10
					},
					{
						id: 4,
						image: require("./products/4.png"),
						title: "颈部按摩",
						duration: 100,
						originprice: 200,
						price: 180,
						sales: 10
					},
					{
						id: 5,
						image: require("./products/5.png"),
						title: "泰式SPA",
						duration: 100,
						originprice: 200,
						price: 180,
						sales: 10
					},
					{
						id: 6,
						image: require("./products/6.png"),
						title: "足浴",
						duration: 100,
						originprice: 200,
						price: 180,
						sales: 10
					},
					{
						id: 7,
						image: require("./products/7.png"),
						title: "采耳服务",
						duration: 100,
						originprice: 200,
						price: 180,
						sales: 10
					},
					{
						id: 8,
						image: require("./products/8.png"),
						title: "新居开荒",
						duration: 100,
						originprice: 200,
						price: 180,
						sales: 10
					}
				]
			};
		},
		methods: {
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
			async getData() {
				// uni.showLoading({
				// 	title: '数据加载中...'
				// });
				this.tabIndex = 0;
				if (this.categorys.length == 1) {
					await this.$store.dispatch('category/GetCategory');
					this.tabs = this.categorys;
				}
				await this.$store.dispatch('banner/GetBanner');
				await this.$store.dispatch('activity/GetActivity', {});
				await this.$store.dispatch('good/InitGoods', this.tabs);
				await this.$store.dispatch('good/GetGoods', {
					cid: 0,
					page: 1
				});
				this.gotTop();
				// console.log(this.tabs)
				uni.hideLoading();
			},
			goodClick(g) {
				let params = {
					id: g.id,
					numm_id: g.goods_id
				};
				uni.showLoading({
					title: '数据加载中...'
				});
				this.$store
					.dispatch('good/GetGoodDetail', params)
					.then(() => {
						uni.hideLoading();
						uni.navigateTo({
							url: '/pages/good/detail?id=' + g.id + '&nummId=' + g.goods_id
						});
					})
					.catch(() => {
						//TODO
						uni.hideLoading();
					});
			},
			getElSize(id) {
				//得到元素的size
				return new Promise((res, rej) => {
					uni.createSelectorQuery()
						.select('#' + id)
						.fields({
								size: true,
								scrollOffset: true
							},
							data => {
								res(data);
							}
						)
						.exec();
				});
			},
			async tapTab(tab, index) {
				if (this.tabIndex === index) {
					return false;
				} else {
					let tabBar = await this.getElSize('tab-bar'),
						tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
					this.scrollLeft = tabBarScrollLeft;
					this.isClickChange = true;
					this.tabIndex = index;

					if (this.goods[tab.id].data.length == 0) {
						uni.showLoading({
							title: '数据加载中...'
						});
						await this.$store.dispatch('good/GetGoods', {
							cid: tab.id,
							page: 1
						});
						uni.hideLoading();
					}
					if (this.tabIndex > 0) {
						this.subCategorys = this.tabs[this.tabIndex].sub_categorys.map(item => {
							return {
								id: item.id,
								image: item.icon,
								text: item.name
							};
						});
					}
				}
			},
			actClick(e) {
				let act = this.activitys[e.index];
				const id = act.id;
				const name = act.text;
				uni.showLoading({
					title: '数据加载中...'
				});
				let params = {
					cid: 0,
					scid: 0,
					score: 1,
					page: 1,
					id: id
				};
				this.$store
					.dispatch('good/GetActGoods', params)
					.then(() => {
						uni.hideLoading();
						uni.navigateTo({
							url: '/pages/activity/index?id=' + id + '&name=' + name
						});
					})
					.catch(() => {
						uni.hideLoading();
					});
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
			scroll(e) {
				if (e.detail.scrollTop == 0) {
					this.pullDownRefresh = true;
					this.disabledPullRefresh(true);
				} else {
					//保证只设置一次
					if (!this.pullDownRefresh) {
						this.disabledPullRefresh(false);
					}
					this.pullDownRefresh = false;
				}

				this.disabledPullRefresh(e.detail.scrollTop == 0);

				if (e.detail.scrollTop > 1000) {
					this.showFloatButton = true;
				} else {
					this.showFloatButton = false;
				}
				this.oldScrollTop = e.detail.scrollTop;
			},
			gotTop() {
				this.scrollTop = this.oldScrollTop;
				this.$nextTick(function() {
					this.scrollTop = 0;
				});
			},
			// tagClick(e) {
			// 	let cate = this.gcategorys[this.tabIndex];
			// 	let scate = cate.sub_categorys[e.index];
			// 	uni.showLoading({
			// 		title: '数据加载中...'
			// 	});
			// 	this.params = {
			// 		cid: cate.id,
			// 		scid: scate.id,
			// 		score: 1,
			// 		page: 1,
			// 		id: 0
			// 	};
			// 	this.$store
			// 		.dispatch('good/GetActGoods', this.params)
			// 		.then(() => {
			// 			uni.hideLoading();
			// 			uni.navigateTo({
			// 				url: '/pages/activity/index?id=0&name=' + scate.text + '&scid=' + scate.id + '&cid=' + cate.id
			// 			});
			// 		})
			// 		.catch(() => {
			// 			uni.hideLoading();
			// 		});
			// }
		},

		/**
		 * 当 searchInput 配置 disabled 为 true 时触发
		 */
		onNavigationBarSearchInputClicked(e) {
			console.log('事件执行了');
			uni.navigateTo({
				url: '/pages/search/index'
			});
		},
		/**
		 *  点击导航栏 buttons 时触发
		 */
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				this.getData();
			} else if (e.index == 1) {
				uni.navigateTo({
					url: '/pages/center/footprint'
				});
			}
		},
		onTabItemTap(e) {
			if (e.index == 0) {
				this.getData();
			}
		},
		onPullDownRefresh() {
			let cate = this.gcategorys[this.tabIndex];
			let item = this.goods[cate.id];
			let page = item.page + 1;

			this.$store
				.dispatch('good/GetGoods', {
					cid: cate.id,
					page: page,
					push: false
				})
				.then(() => {
					uni.stopPullDownRefresh();
				})
				.catch(() => {
					uni.stopPullDownRefresh();
				});
		}
	};
</script>

<style>
	.app {
		/* background: linear-gradient(180deg, #3ab54a, rgba(58, 181, 74, .37) 77%, rgba(58, 181, 74, .12) 86%, rgba(58, 181, 74, 0)) #f5f5f5 no-repeat; */
		/* height: 800px; */
		margin-top: 10px;
		background-size: 100% 180px;
	}

	.banner {
		margin: 0 10px;
	}

	.tip {
		font-size: 15px;
		color: #333;
		display: flex;
		align-items: center;
		margin-top: 10px;
		margin-left: 10px;
	}

	.tip::before {
		content: "";
		display: block;
		width: 3px;
		height: 13px;
		background: #3ab54a;
		border-radius: 1px;
		margin-right: 5px;
	}

	.uni-index-list-cell {
		width: auto !important;
		margin: 7px 10px !important;
	}

	.uni-good-list-logo {
		width: 90px;
		height: 90px;
		align-items: center;
		border-radius: 5px;
		margin: 10px;
	}

	.list {
		display: flex;
	}

	.time {
		font-size: 12px;
		margin-bottom: 10px;
	}

	.bottom {
		display: flex;
		justify-content: space-between;
		margin-bottom: 15px;
	}

	.uni-good-list-text-top {
		font-size: 15px;
		line-height: 21px;
		color: #333;
		font-weight: 700;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		margin-top: 15px !important;
	}

	.price {
		font-size: 17px;
		color: #f55;
	}

	.price::before {
		content: "¥";
		color: #f55;
		font-size: 12px
	}

	.origin-price {
		font-size: 12px;
		margin-left: 5px;
		text-decoration: line-through;
		text-decoration-line: line-through;
		text-decoration-thickness: initial;
		text-decoration-style: initial;
		text-decoration-color: initial;
	}

	.origin-price::before {
		content: "¥";
	}

	.sales {
		font-size: 11px;
		color: #999;
		margin-right: 10px;
	}
</style>