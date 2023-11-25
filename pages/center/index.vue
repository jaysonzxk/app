<template>
	<view class="center" :style="{'padding-top': statusBarHeight + 'px'}">
		<view class="header">
			<view class="topIcon">
				<span class="message"></span>
				<span class="setting"></span>
			</view>
		</view>
		<view class="body">
			<view>
				<view class="userInfo" v-if="!userInfo">
					<view class="infoLeft">
						<u-avatar text="XY" fontSize="20" size="60"></u-avatar>
						<span style="font-size: 20px; font-weight: 500;" @click="goLogin">登 录</span>
					</view>
				</view>
				<view class="userInfo" v-else>
					<view class="infoLeft">
						<u-avatar :src="userImg" size="60"></u-avatar>
						<div class="infoRight">
							<span class="title">{{ userInfo.name }}</span>
							<view class="info">
								<div class="gender">
									<img v-if="userInfo.gender == 1" src="./images/feminine.png" alt="" />
									<img v-else src="./images/man.png" alt="" />
								</div>
								<div class="vipIcon">
									<img v-if="userInfo.userVip && userInfo.userVip.isExpiration == 0" src="./images/vip-icon1.png" alt="" />
									<span v-else style="color: #666666; font-size: 12px;">普通用户</span>
								</div>
							</view>
						</div>
						
					</view>
				</view>
			</view>
			<view class="box">
				<view class="boxTop">
					<div>
						<span class="num">0</span>
						<span class="tip">累计收益</span>
					</div>
					<div>
						<span class="num">0</span>
						<span class="tip">下级</span>
					</div>
					<div>
						<span class="num">0</span>
						<span class="tip">累计订单</span>
					</div>
					<div>
						<span class="num">0</span>
						<span class="tip">积分</span>
					</div>
				</view>
				<view class="vipBox">
					<view class="vipBoxLeft" @click="goOpenVip">
						<div class="left">
							<span class="title">会员中心</span>
							<span class="tip"
								v-if="userInfo && (userInfo.userVip && !userInfo.userVip.isExpiration)">{{ userInfo.userVip.name }}</span>
							<span class="tip" v-else>开通会员 <i></i></span>
						</div>
						<span class="vipIcon"></span>
					</view>
					<view class="vipBoxRight">
						<div class="left">
							<span class="title">机器人中心</span>
							<span class="tip"
								v-if="userInfo && (userInfo.userRobot && !userInfo.userRobot.isExpiration)">{{ userInfo.userRobot.name }}</span>
							<span class="tip" v-else>开通机器人 <i></i></span>
						</div>
						<span class="robotIcon"></span>
					</view>
				</view>
				<view class="boxBottom">
					<view class="robotBox">
						<span class="robotIcon"></span>
						<div class="tip">
							<span class="title">量化机器人</span>
							<span class="desc">开启机器人可自动获得收益哦,快去开启吧</span>
						</div>
						<span class="goStart">去开启</span>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<span class="title">常用功能</span>
			<view class="toolTop">
				<div class="tips">
					<span class="spread"></span>
					<span>推广赚钱</span>
				</div>
				<div class="tips">
					<span class="cs"></span>
					<span>客服</span>
				</div>
				<div class="tips">
					<span class="spread"></span>
					<span>我的订单</span>
				</div>
				<div class="tips">
					<span class="myMessage"></span>
					<span>我的消息</span>
				</div>
				<div class="tips">
					<span class="income"></span>
					<span>收益明细</span>
				</div>
			</view>
			<view class="toolBottom">
				<view class="exchange">
					<div class="item">
						<span class="exchangeIcon"></span>
						<span class="title">交易所</span>
					</div>
					<span class="goMore"></span>
				</view>
				<view class="group">
					<div class="item">
						<span class="groupIcon"></span>
						<span class="title">官方社群</span>
					</div>
					<span class="goMore"></span>
				</view>
				<view class="feedback">
					<div class="item">
						<span class="feedbackIcon"></span>
						<span class="title">已经反馈</span>
					</div>
					<span class="goMore"></span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getUserInfo,
		userLogin
	} from '@/common/api'
	import config from "@/common/config.js";
	export default {
		
		data() {
			return {
				versionName: 'v1.0.0',
				statusBarHeight: getApp().globalData.statusBarHeight,
				isRefresh: false,
				userInfo: undefined,
				show: true,
				userImg: undefined
			};
		},
		onShow() {},
		onLoad(options) {
			this.versionName = '版本:' + this.$config.versionName;
			this.userInfos()
		},
		computed: {
		},
		methods: {
			async userInfos() {
				let res = await getUserInfo();
				let host = config.server + '/';	
				this.userImg  = host + res.data.avatar;
				console.log(this.userImg)
				this.userInfo = res.data;
			},
			
			goWallet() {
				uni.navigateTo({
					url: '/pages/center/wallet'
				})
			},
			goOpenVip() {

				uni.navigateTo({
					url: '/pages/center/vip'
				})
			},
			goAddress() {
				uni.navigateTo({
					url: '/pages/center/address'
				});
			},
			goAbout() {
				uni.navigateTo({
					url: '/pages/center/about'
				});
			},
			goFeedback() {
				uni.navigateTo({
					url: '/pages/center/feedback'
				});
			},
			goSetting() {
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

<style scoped lang="scss">
	.center {
		padding-bottom: 20px;
		.header {
			// padding-top: 12px;
			.topIcon {
				display: flex;
				float: right;
				margin-top: 12px;
				margin-right: 16px;

				.message {
					background: url('images/message.png') no-repeat;
					background-size: 100% 100%;
					width: 20px;
					height: 20px;
					margin-right: 16px;
				}

				.setting {
					background: url('images/setting.png') no-repeat;
					background-size: 100% 100%;
					width: 20px;
					height: 20px;
				}
			}

		}

		.body {
			padding-top: 40px;

			.userInfo {
				// padding-top: 20px;
				margin-left: 16px;

				.infoLeft {
					display: flex;
					align-items: center;
					.infoRight{
						.title {
							font-size: 14px;
							font-weight: 500;
							margin-left: 10px;
						}
						.info{
							display: flex;
							align-items: center;
							.gender{
								img{
									display: flex;
									align-items: center;
									width: 20px;
									height: 20px;
								}
							}
							.vipIcon{
								img{
									display: flex;
									align-items: center;
									width: 20px;
									height: 20px;
								}
							}
						}
						
					}
				}
			}

			.box {
				background: #fff;
				width: 340px;
				height: 240px;
				border-radius: 10px;
				margin-left: calc((100% - 340px) / 2);
				margin-top: 16px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				.boxTop {
					display: flex;
					justify-content: space-around;

					div {
						display: flex;
						flex-direction: column;
						align-items: center;
						.num {
							color: #181818;
							font-weight: 500;
						}

						.tip {
							color: #333333;
							font-size: 12px;
						}
					}
				}

				.vipBox {
					display: flex;
					justify-content: space-around;
					margin-top: 15px;

					.vipBoxLeft {
						width: 159px;
						height: 70px;
						border-radius: 5px;
						background: linear-gradient(to right, #fdf6e8, #faead1);
						display: flex;
						justify-content: space-around;
						align-items: center;

						.left {
							display: flex;
							flex-direction: column;

							.title {
								color: #4c3d28;
								font-weight: 500;
							}

							.tip {
								color: #4c3d28;
								font-size: 10px;
								display: flex;
								align-items: center;
							}

							i {
								// display: flex;
								background: url('images/open.png') no-repeat;
								background-size: 100% 100%;
								width: 10px;
								height: 10px;
								margin-left: 5px;
							}
						}

						.vipIcon {
							background: url('images/vip-icon.png') no-repeat;
							background-size: 100% 100%;
							width: 50px;
							height: 50px;
						}
					}

					.vipBoxRight {
						width: 159px;
						height: 70px;
						border-radius: 5px;
						background: linear-gradient(to right, #fdf1e7, #fbe4d8);
						display: flex;
						justify-content: space-around;
						align-items: center;
						.left {
							display: flex;
							flex-direction: column;
						
							.title {
								color: #4c3d28;
								font-weight: 500;
							}
						
							.tip {
								color: #4c3d28;
								font-size: 10px;
								display: flex;
								align-items: center;
							}
						
							i {
								// display: flex;
								background: url('images/open.png') no-repeat;
								background-size: 100% 100%;
								width: 10px;
								height: 10px;
								margin-left: 5px;
							}
						}
						
						.robotIcon {
							background: url('images/robot-icon.png') no-repeat;
							background-size: 100% 100%;
							width: 50px;
							height: 50px;
						}
					}
				}

				.boxBottom {
					display: flex;
					justify-content: center;
					margin-top: 10px;
					// padding-bottom: 20px;
					.robotBox {
						width: 327px;
						height: 70px;
						border-radius: 5px;
						background: linear-gradient(to right, #f8ceb6, #f4ad87);
						display: flex;
						align-items: center;
						justify-content: space-around;
						.robotIcon{
							background: url('images/robot-icon.png') no-repeat;
							background-size: 100% 100%;
							width: 50px;
							height: 50px;
						}
						.tip{
							display: flex;
							flex-direction: column;
							.title{
								color: #410704;
							}
							.desc{
								color: #410704;
								font-size: 10px;
							}
						}
						.goStart{
							border-radius: 8px;
							background: #ffffff;
							width: 65px;
							height: 26px;
							color: #410704;
							font-size: 12px;
							font-weight: 500;
							display: flex;
							align-items: center;
							justify-content: center;
						}
					}
				}
			}
		}
		.bottom{
			margin-top: 18px;
			.title{
				margin-left: 18px;
				color: #333333;
				font-weight: 500;
			}
			.toolTop{
				background: #fff;
				width: 340px;
				height: auto;
				border-radius: 10px;
				margin-left: calc((100% - 340px) / 2);
				margin-top: 10px;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
				padding: 16px 0;
				.tips{
					display: flex;
					align-items: center;
					flex-direction: column;
					width: 70px;
					
					.spread{
						background: url('images/spread.png') no-repeat;
						background-size: 100% 100%;
						width: 36px;
						height: 36px;
					}
					.cs{
						background: url('images/cs.png') no-repeat;
						background-size: 100% 100%;
						width: 36px;
						height: 36px;
					}
					.myMessage{
						background: url('images/my-message.png') no-repeat;
						background-size: 100% 100%;
						width: 36px;
						height: 36px;
					}
					.income{
						background: url('images/income.png') no-repeat;
						background-size: 100% 100%;
						width: 36px;
						height: 36px;
					}
				}
				
			}
			.toolBottom{
				background: #fff;
				width: 340px;
				height: auto;
				border-radius: 10px;
				margin-left: calc((100% - 340px) / 2);
				margin-top: 10px;
				.exchange{
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 5px 15px;
					.item{
						display: flex;
						align-items: center;
						.exchangeIcon{
							background: url('images/exchange.png') no-repeat;
							background-size: 100% 100%;
							width: 36px;
							height: 36px;
						}
						.title{
							font-size: 12px
						}
					}
					.goMore{
						background: url('images/open.png') no-repeat;
						background-size: 100% 100%;
						width: 12px;
						height: 12px;
					}
				}
				.group{
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 5px 15px;
					.item{
						display: flex;
						align-items: center;
						.groupIcon{
							background: url('images/group.png') no-repeat;
							background-size: 100% 100%;
							width: 36px;
							height: 36px;
						}
						.title{
							font-size: 12px
						}
					}
					.goMore{
						background: url('images/open.png') no-repeat;
						background-size: 100% 100%;
						width: 12px;
						height: 12px;
					}
				}
				.feedback{
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 5px 15px;
					.item{
						display: flex;
						align-items: center;
						.feedbackIcon{
							background: url('images/feedback.png') no-repeat;
							background-size: 100% 100%;
							width: 36px;
							height: 36px;
						}
						.title{
							font-size: 12px
						}
					}
					.goMore{
						background: url('images/open.png') no-repeat;
						background-size: 100% 100%;
						width: 12px;
						height: 12px;
					}
				}
			}
		}
		
	}
</style>