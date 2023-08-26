<template>
	<view class="center">
		<view class="center-top">
			<!-- <text class="mine">我的</text> -->
			<view class="center-logo">
				<view class="userinfo">
					<image class="center-logo-img" src="./images/tuxiang.png"></image>
					<view class="center-logo-title">
						<view class="center-uer-name" v-show="userInfo">
							<text class="username">{{ userInfo.name }}</text>
							<text class="phone">{{ userInfo.mobile }}</text>
						</view>
            <text v-show="!userInfo" class="login" @click="goLogin">请 登 录</text>
					</view>
				</view>
				<!-- <view class="info">
					<span>编辑资料</span>
				</view> -->
			</view>
		</view>
		<view class="my-wallet">
			<view class="wallet">
				<view class="balance" v-show="userInfo">
					<span class="top">{{userInfo.balance}}</span>
					<span class="bottom">余额</span>
				</view>
        <view class="balance" v-show="!userInfo">
          <span class="top">0</span>
          <span class="bottom">余额</span>
        </view>
				<view class="coupons" v-show="userInfo">
					<span class="top">1</span>
					<span class="bottom">优惠券</span>
				</view>
        <view class="coupons" v-show="!userInfo">
          <span class="top">0</span>
          <span class="bottom">优惠券</span>
        </view>
				<view class="collect" v-show="userInfo">
					<span class="top">4</span>
					<span class="bottom">收藏</span>
				</view>
        <view class="collect" v-show="!userInfo">
          <span class="top">0</span>
          <span class="bottom">收藏</span>
        </view>
			</view>
		</view>
		<view class="my-order">
			<view class="title">
				<view class="order-icon">
					<span class="orderIcon"></span>
					<span class="tip">我的订单</span>
				</view>

				<view class="more-icon">
					<span class="more">查看全部</span>
					<span class="moreIcon"></span>
				</view>

			</view>
			<view class="order-status">
				<view class="daijiedan">
					<span>待接单</span>
				</view>
				<view class="fuwuzhong">
					<span>服务中</span>
				</view>
				<view class="daiqueren">
					<span>待确认</span>
				</view>
				<view class="daipingjia">
					<span>待评价</span>
				</view>
				<view class="yiwancheng">
					<span>已完成</span>
				</view>
			</view>
		</view>
		<view class="middle">
			<span class="middle-l"></span>
			<span class="middle-r"></span>
		</view>
		<view class="bottom-list">
			<view class="addr" @click="goAddress">
				<view class="addr-l">
					<span class="addr-icon"></span>
					<span class="addr-title">常用地址</span>
				</view>
				<span class="bottom-more"></span>
			</view>
			<view class="about" @click="goAbout">
				<view class="about-l">
					<span class="about-icon"></span>
					<span class="about-title">关于我们</span>
				</view>
				<span class="bottom-more"></span>
			</view>
			<view class="opinion" @click="goFeedback">
				<view class="opinion-l">
					<span class="opinion-icon"></span>
					<span class="opinion-title">意见反馈</span>
				</view>
				<span class="bottom-more"></span>
			</view>
			<view class="setting" @click="goSetting">
				<view class="setting-l">
					<span class="setting-icon"></span>
					<span class="setting-title">设置</span>
				</view>
				<span class="bottom-more"></span>
			</view>
		</view>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue';
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {
				versionName: 'v1.0.0',
			};
		},
		onLoad() {
			this.versionName = '版本:' + this.$config.versionName

		},
    computed: {
      userInfo(){
        if (uni.getStorageSync('userInfo')) {
          return uni.getStorageSync('userInfo')
        }else {
          return false
        }
      }
    },
		methods: {
			goAddress(){
				uni.navigateTo({
					url: '/pages/center/address'
				});
			},
			goAbout(){
				uni.navigateTo({
					url: '/pages/center/about'
				});
			},
			goFeedback(){
				uni.navigateTo({
					url: '/pages/center/feedback'
				});
			},
			goSetting(){
				uni.navigateTo({
					url: '/pages/center/setting/account-security'
				});
			},
			goLogin() {
				uni.navigateTo({
					url: '/pages/center/login'
				});
			},
			goRegister() {
				uni.navigateTo({
					url: '/pages/center/register'
				});
			},
			// goAbout() {
			// 	uni.navigateTo({
			// 		url: '/pages/about/about'
			// 	});
			// },
			click(index) {
				console.log(index);
				switch (index) {
					case 0:
						uni.navigateTo({
							url: '/pages/center/footprint'
						});
						break;
					case 1:
						uni.showModal({
							title: "联系客服",
							content: "QQ群:200910943"
						})
						break;
					case 4:
						this.checkVersion().catch(() => {
							uni.showToast({
								title: '已经是最新',
								duration: 1000
							});
						})
						break;
					case 5:
						uni.navigateTo({
							url: '/pages/center/about'
						})
						break
					default:
						break;
				}
			}
		},

		/**
		 *  点击导航栏 buttons 时触发
		 */
		onNavigationBarButtonTap() {
			uni.navigateTo({
				url: '/pages/center/setting'
			})

		}
	};
</script>

<style>
	.center {
		height: 800px;
		/* flex-direction: column; */
		background-color:#f5f5f5;
	}

	/* .center-title {
		font-size: 32upx;
		line-height: 32upx;
		color: #777;
		margin: 40upx 25upx;
		position: relative;
	}

	.center-list {
		background-color: #ffffff;
		flex-direction: column;
	} */

	.center-top {
		width: 100%;
		background: url(./images/mine_title_bg.png) no-repeat;
		background-size: 100%;
		border-radius: 0 0 20px 20px;
	}

	.center-logo {
		width: 750upx;
		height: 380upx;
		box-sizing: border-box;
		/* flex-direction: row; */
		align-items: center;
		display: flex;
		margin-left: 20px;
		/* padding-bottom: 60px; */
	}
	.userinfo{
		display: flex;
		/* flex-direction: column; */
		align-items: center;
		margin-bottom: 30px;
	}
	.center-logo-img {
		width: 120upx;
		height: 120upx;
		border-radius: 150upx;
	}

	.center-logo-title {
		height: 150upx;
		/* flex: 1; */
		align-items: center;
		flex-direction: row;
		margin-left: 20upx;
		display: flex;
	}

	.center-uer-name {
		display: flex;
		flex-direction: column;
		height: 60upx;
		line-height: 60upx;
		font-size: 38upx;
		color: #333;
		margin-bottom: 20px;
	}
  .login{
    font-size: 38upx;
    color: #333;
  }
	.phone {
		font-size: 13px;
		/*color: #fbfbfb;*/
		margin-top: -5px;
	}
	.mine{
		display: flex;
		flex: 1;
		justify-content: center;
		padding-top: 5px;
		color: #fff;
		font-weight: 500;
		font-size: 16px;
	}
	.info {
		font-size: 13px;
		display: flex;
		align-items: baseline;
		padding: 5px 8px 5px 12px;
		background-color: #fff;
		border-radius: 16px 0 0 16px;
		margin-right: 10px;
	}
	.my-wallet{
		position: relative;
		bottom: 60px;
	}
	.wallet{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 95%;
		height: 90px;
		background-color: #fff;
		border-radius: 7px;
		margin-left: calc(5% / 2);
	}
	.balance{
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-left: 20px;
	}
	.coupons{
		display: flex;
		flex-direction: column;
		/* margin: 0 40px; */
		align-items: center;
	}
	.collect{
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-right: 20px;
	}
	.top{
		font-weight: 500;
		font-size: 18px;
	}
	.bottom{
		font-weight: normal;
		color: #777;
		font-size: 12px;
	}
	.my-order{
		width: 95%;
		height: 140px;
		background-color: #fff;
		border-radius: 7px;
		margin-left: calc(5% / 2);
		margin-top: -50px;
	}
	.title{
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.order-icon{
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 10px;
		margin-left: 10px;
	}
	.orderIcon{
		background: url('images/order_icon.png') no-repeat;
		background-size: 80%;
		width: 25px;
		height: 30px;
		margin-top: 10px;
	}
	.tip{
		font-weight: 500;
		font-size: 17px;
		margin-left: -5px;
		/* margin-top: 10px;
		margin-left: 20px; */
	}
	.more{
		font-size: 10px;
		font-weight: 500;
		/* margin-top: 10px; */
		/* margin-right: 20px; */
	}
	.more-icon{
		display: flex;
		align-items: center;
		margin-top: 10px;
		margin-right: 5px;
	}
	.moreIcon{
		background: url('images/more_icon.png') no-repeat;
		background-size: 100%;
		width: 30px;
		height: 30px;
		margin-left: -10px;
	}
	.order-status{
		display: flex;
		justify-content: space-around;
		margin-top: 60px;
	}
	.middle{
		display: flex;
		margin-top: 20px;
		/* justify-content: space-around; */
	}
	.middle-l{
		background: url('./images/haoyou.png') no-repeat;
		background-size: 100%;
		width: 173px;
		height: 84px;
		margin-left: calc((100% - 346px) / 3);
	}
	.middle-r{
		background: url('./images/zhaomu.png') no-repeat;
		background-size: 100%;
		width: 173px;
		height: 84px;
		margin-left: calc((100% - 346px) / 3);
	}
	.bottom-list{
		width: 95%;
		height: 200px;
		background-color: #fff;
		border-radius: 7px;
		margin-top: 10px;
		margin-left: calc(5% / 2);
		margin-bottom: -20px;
		font-size: 16px;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
	}
	.addr{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 10px;
	}
	.addr-l{
		display: flex;
		align-items: center;
	}
	.addr-icon{
		background: url('./images/addr.png') no-repeat;
		background-size: 100%;
		width: 25px;
		height: 25px;
	}
	.about{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 10px;
	}
	.about-l{
		display: flex;
		align-items: center;
	}
	.about-icon{
		background: url('./images/about.png') no-repeat;
		background-size: 100%;
		width: 25px;
		height: 25px;
	}
	.opinion{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 10px;
	}
	.opinion-l{
		display: flex;
		align-items: center;
	}
	.opinion-icon{
		background: url('./images/opinion.png') no-repeat;
		background-size: 100%;
		width: 25px;
		height: 25px;
	}
	.setting{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 10px;
	}
	.setting-l{
		display: flex;
		align-items: center;
	}
	.setting-icon{
		background: url('./images/setting.png') no-repeat;
		background-size: 100%;
		width: 25px;
		height: 25px;
	}
	.bottom-more{
		background: url('./images/more_icon.png') no-repeat;
		background-size: 100%;
		width: 25px;
		height: 25px;
	}
</style>
