<template>
	<view class="container">

		<view class="user-section">
			<image class="bg" src="/static/user-bg.jpg"></image>
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" :src="userInfo.avatar || '/static/missing-face.png'"></image>
				</view>
				<view class="info-box">
					<span v-if="!userInfo" class="username" @click="goLogin">请登录</span>
					<span v-else class="username">{{ userInfo.name }}</span>
				</view>
			</view>
		</view>

		<view class="cover-container">
			<image class="arc" src="/static/arc.png"></image>
			<view class="tj-sction">
				<view class="tj-item">
					<text class="num">128.8</text>
					<text>余额</text>
				</view>
				<view class="tj-item">
					<text class="num">128.8</text>
					<text>收益</text>
				</view>
				<view class="tj-item">
					<text class="num">0</text>
					<text>优惠券</text>
				</view>
				<view class="tj-item">
					<text class="num">20</text>
					<text>积分</text>
				</view>
			</view>

			<view class="robot">
				<view class="robotBox">
					<span class="icon"></span>
					<view class="text">
						<span class="title">量化机器人</span>
						<span class="tip">开启机器人即可自动获取收益哦,快去开启吧</span>
					</view>
					<span class="btn">去开启</span>
				</view>
			</view>

			<view class="history-section icon">
				<list-cell icon="icon-iconfontweixin" iconColor="#e07472" title="我的钱包"
					:tips="userInfo && userInfo.balance ? userInfo.balance : '0.00'"
					@eventClick="navTo('/pages/user/wallet')"></list-cell>
				<list-cell icon="icon-iconfontweixin" iconColor="#d6c2b3" title="会员中心" :tips="tip"
					@eventClick="navTo('/pages/user/vip')"></list-cell>
				<list-cell icon="icon-share" iconColor="#9789f7" title="推广赚钱" tips="邀请好友获得佣金"
					@eventClick="navTo('/pages/user/promote')"></list-cell>
				<list-cell icon="icon-pinglun-copy" iconColor="#ee883b" title="在线客服" tips="在线客服"></list-cell>
				<list-cell icon="icon-shoucang_xuanzhongzhuangtai" iconColor="#54b4ef" title="交易所"></list-cell>
				<list-cell icon="icon-shezhi1" iconColor="#e07472" title="设置" border=""
					@eventClick="navTo('/pages/set/index')"></list-cell>
			</view>
		</view>


	</view>
</template>
<script>
	import listCell from '@/components/mix-list-cell';
	import {
		mapState
	} from 'vuex';
	let startY = 0,
		moveY = 0,
		pageAtTop = true;
	export default {
		components: {
			listCell
		},
		data() {
			return {
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
			}
		},
		onLoad() {
			// console.log(this.$store.state.user)
			this.$store.dispatch('user/GetUserInfo', {});
		},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.navTo('/pages/set/set');
			} else if (index === 1) {
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}

		},
		// #endif
		computed: {
			userInfo() {
				return uni.getStorageSync('userInfo');
			},
			tip() {
				let userInfo = uni.getStorageSync('userInfo');
				if (userInfo && userInfo.userVip && userInfo.userVip.isExpiration) {
					return '已过期,去续费';
				} else if (userInfo && userInfo.userVip && !userInfo.userVip.isExpiration) {
					return userInfo.userVip.expiration;
				} else if (userInfo && !userInfo.userVip) {
					return '去开通';
				} else if (!userInfo) {
					return '去开通';
				}
			},

		},
		methods: {

			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			goLogin() {
				uni.navigateTo({
					url: '/pages/public/login'
				})
			},
			navTo(url) {
				if (!this.userInfo) {
					url = '/pages/public/login';
				}
				uni.navigateTo({
					url
				})
			},

			/**
			 *  会员卡下拉和回弹
			 *  1.关闭bounce避免ios端下拉冲突
			 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
			 *    transition设置0.1秒延迟，让css来过渡这段空窗期
			 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
			 */
			// 	coverTouchstart(e){
			// 		if(pageAtTop === false){
			// 			return;
			// 		}
			// 		this.coverTransition = 'transform .1s linear';
			// 		startY = e.touches[0].clientY;
			// 	},
			// 	coverTouchmove(e){
			// 		moveY = e.touches[0].clientY;
			// 		let moveDistance = moveY - startY;
			// 		if(moveDistance < 0){
			// 			this.moving = false;
			// 			return;
			// 		}
			// 		this.moving = true;
			// 		if(moveDistance >= 80 && moveDistance < 100){
			// 			moveDistance = 80;
			// 		}

			// 		if(moveDistance > 0 && moveDistance <= 80){
			// 			this.coverTransform = `translateY(${moveDistance}px)`;
			// 		}
			// 	},
			coverTouchend() {
				if (this.moving === false) {
					return;
				}
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
				this.coverTransform = 'translateY(0px)';
			}
		}
	}
</script>
<style lang='scss' scoped>
	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		display: flex;
		justify-content: space-around;
		align-content: center;
		background: #fff;
		border-radius: 10upx;
	}


	.user-section {
		height: 520upx;
		padding: 100upx 30upx 0;
		position: relative;

		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
		}
	}

	.user-info-box {
		height: 180upx;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 1;

		.portrait {
			width: 130upx;
			height: 130upx;
			border: 5upx solid #fff;
			border-radius: 50%;
		}

		.username {
			font-size: $font-lg + 6upx;
			color: $font-color-dark;
			margin-left: 20upx;
		}
	}

	.vip-card-box {
		display: flex;
		flex-direction: column;
		color: #f7d680;
		height: 240upx;
		background: linear-gradient(left, rgba(0, 0, 0, .7), rgba(0, 0, 0, .8));
		border-radius: 16upx 16upx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20upx 24upx;

		.card-bg {
			position: absolute;
			top: 20upx;
			right: 0;
			width: 380upx;
			height: 260upx;
		}

		.b-btn {
			position: absolute;
			right: 20upx;
			top: 16upx;
			width: 132upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			font-size: 22upx;
			color: #36343c;
			border-radius: 20px;
			background: linear-gradient(left, #f9e6af, #ffd465);
			z-index: 1;
		}

		.tit {
			font-size: $font-base+2upx;
			color: #f7d680;
			margin-bottom: 28upx;

			.yticon {
				color: #f6e5a3;
				margin-right: 16upx;
			}
		}

		.e-b {
			font-size: $font-sm;
			color: #d8cba9;
			margin-top: 10upx;
		}
	}

	.cover-container {
		background: $page-color-base;
		margin-top: -150upx;
		padding: 0 30upx;
		position: relative;
		background: #f5f5f5;
		padding-bottom: 20upx;

		.arc {
			position: absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}

	.tj-sction {
		@extend %section;

		.tj-item {
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}

		.num {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8upx;
		}
	}

	.robot {
		/* background: #fff; */
		display: flex;
		margin-top: 20upx;
		border-radius: 10upx;

		.robotBox {
			display: flex;
			background: linear-gradient(to right, #ffc2a7, #ffa37d);
			padding: 30upx 20upx;
			border-radius: 10upx;
			flex: 1;
			align-items: center;
			justify-content: space-around;

			.icon {
				background: url('images/robot-icon.png') no-repeat;
				background-size: 100% 100%;
				width: 100upx;
				height: 100upx;
			}

			.text {
				display: flex;
				flex-direction: column;
				justify-content: center;

				.title {
					color: #410206;
					font-size: 40upx;
					margin-bottom: 10upx;
				}

				.tip {
					font-size: 20upx;
					color: #410206;
				}
			}

			.btn {
				background: #fff;
				border-radius: 30upx;
				font-size: 30upx;
				color: #410206;
				padding: 10upx 30upx;
				font-weight: 500;
			}
		}
	}

	.order-section {
		@extend %section;
		padding: 28upx 0;
		margin-top: 20upx;

		.order-item {
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
		}

		.yticon {
			font-size: 48upx;
			margin-bottom: 18upx;
			color: #fa436a;
		}

		.icon-shouhoutuikuan {
			font-size: 44upx;
		}
	}

	.history-section {
		padding: 30upx 0 0;
		margin-top: 20upx;
		background: #fff;
		border-radius: 10upx;

		.sec-header {
			display: flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;

			.yticon {
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}

		.h-list {
			white-space: nowrap;
			padding: 30upx 30upx 0;

			image {
				display: inline-block;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				border-radius: 10upx;
			}
		}
	}
</style>