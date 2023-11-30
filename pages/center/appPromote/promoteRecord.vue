<template>
	<view class="promoteRecord" :style="{'paddingTop': statusBarHeight + 'px'}">
		<view class="header">
			<u-navbar title="推广记录" @rightClick="rightClick" :autoBack="true">
			</u-navbar>
		</view>
		<view class="promoteList">
			<u-list class="list" v-if="promoteList.length > 0" lowerThreshold="30">
				<!-- <span class="tip">已推广人数:{{ count }}人</span> -->
				<u-list-item class="item" v-for="(item, index) in promoteList" :key="index">
					<view class="itemLeft">
						<u-avatar size="35" :src="host + item.avatar" shape="square"></u-avatar>
						<span class="name">{{ item.name }}</span>

					</view>
					<span class="itemRight">注册时间:{{ item.create_datetime }}</span>
				</u-list-item>
			</u-list>
			<u-loadmore :status="status" :loading-text="loadingText" :loadmore-text="loadmoreText"
				:nomore-text="nomoreText" />
		</view>
		
		<u-loading-icon :show="show" text="加载中..." style="margin-top: 200px;"></u-loading-icon>
		<u-empty class="empty" mode="data" text="暂无数据" marginTop="200" :show="emptyShow"></u-empty>
	</view>
</template>

<script>
	import {
		getPromotionList
	} from '@/common/api.js'
	import config from "@/common/config.js";
	export default {

		data() {
			return {
				statusBarHeight: getApp().globalData.statusBarHeight,
				promoteList: [],
				queryParams: {
					pageNum: 1,
					pageSize: 10,
				},
				host: uni.getSystemInfoSync().platform === 'ios' ? config.h5Serveer + '/' : config.server + '/',
				count: undefined,
				show: true,
				emptyShow: false,
				total: 0,
				status: 'loadmore',
				loadingText: '努力加载中',
				loadmoreText: '轻轻上拉',
				nomoreText: '实在没有了'
			};
		},

		onLoad(options) {
			this.getPromotionLists();
			// this.loadmore();
		},
		computed: {},
		onReachBottom(){
			let that = this;
			if(this.promoteList.length  === this.total) return;
			this.status = 'loading';
			this.queryParams.pageNum = ++ this.queryParams.pageNum;
			setTimeout(() => {
				that.getPromotionLists();
				this.status = this.promoteList.length == this.total ? 'nomore' : 'loading'; 
			}, 2000)
		},
		methods: {

			async getPromotionLists() {
				let res = await getPromotionList(this.queryParams);
				this.promoteList = this.promoteList.concat(res.data.results);
				this.total = res.data.count;
				this.show = false;
				if (this.promoteList.length === 0) {
					this.emptyShow = true;
				}
				if (!res.data.next) {
					this.status = 'nomore';
				}
			},
			
		},
	};
</script>

<style lang="scss" scoped>
	.promoteRecord {
		margin-top: 44px;
		// padding-bottom: 10px;

		.promoteList {
			margin-top: 10px;

			.list {
				.tip {
					display: flex;
					align-items: center;
					justify-content: center;
					color: #a9a9a9;
					font-size: 12px;
					padding: 10px 0;
				}

				.item {
					display: flex !important;
					background: #fff;
					margin-bottom: 10px;
					padding: 10px 10px;
					flex-direction: row;
					align-items: center;
					justify-content: space-between;
					width: 90%;
					margin-left: 2.5%;

					.itemLeft {
						display: flex;
						align-items: center;

						.name {
							margin-left: 10px;
							color: #727272;
							font-size: 14px;
							font-weight: 500;
						}
					}

					.itemRight {
						color: #a9a9a9;
						font-size: 12px;
					}
				}
			}
		}
	}
</style>