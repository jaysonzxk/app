<template>
	<view class="container vip">

		<view class="top">
			<view class="header">
				<!-- <u-navbar title="会员中心" @rightClick="rightClick" :autoBack="true" rightText="充值说明" :bgColor="bgColor"
					:leftIconColor="leftIconColor">
				</u-navbar> -->
				<view class="no-vip">
					<view class="img">
						<image class="center-logo-img" src="./images/tuxiang.png"></image>
						<span class="username">{{ userInfo.name }}</span>
					</view>
					<span class="tip">开通VIP享受多重特权</span>
				</view>
			</view>
			<view class="body">
				<view class="quanyi">
					<view class="title">
						<span class="tip">会员特权</span>
						<span class="icon"></span>
					</view>
					<view class="quanyi-list">
						<view class="quanyi-item">
							<span class="zhekou-icon"></span>
							<span>会员折扣</span>
						</view>
						<view class="quanyi-item">
							<span class="kefu-icon"></span>
							<span>专属客服</span>
						</view>
						<view class="quanyi-item">
							<span class="tuikuan-icon"></span>
							<span>极速退款</span>
						</view>
						<view class="quanyi-item">
							<span class="huodong-icon"></span>
							<span>优惠活动</span>
						</view>
					</view>
				</view>
				<view class="vip-list">
					<view class="vip-top">
						<span style="font-size: 16px;">会员套餐</span>
					</view>
					<view class="vip-card">
						<view class="vip-item" v-for="(v,index) in vipList" :key="v.id" @click="changeIndex(v,index)">
							<view class="item" v-model="vId"
								:class="{'active' : isActive ? indexI === index : !isActive}">
								<view class="info">
									<!-- <view v-if="v.recommend" class="mark">推荐</view>
									<view v-else class="mark1"></view> -->
									<span>{{ v.name }}</span>
									<span style="font-size: 20px; font-weight: 700;"><text
											style="font-size: 12px">$</text>{{ Number(v.discountAmount) }}</span>
									<span class="amount">${{ Number(v.originAmount) }}</span>
								</view>
								<span class="youhui">立省{{ Number(v.originAmount) - Number(v.discountAmount) }}U</span>
							</view>
						</view>
					</view>

				</view>
				<view class="queren-pay">
					<span class="btn" @click="open">{{amount}}U/立即开通</span>
					<div>
						<span style="font-size: 10px; color: #a1a2a8;margin-right: 5px;">支付遇到问题请联系</span>
						<span style="color: #ed633a; font-size: 10px;">在线客服</span>
					</div>
				</view>
				<view class="pay-list">
					<u-popup  class="mode" :show="show" :round="10" mode="bottom" @close="close">
						<span class="title">选择支付方式</span>
						<view class="pay-item" v-for="(p,index) in payChannelList" :key="p.id"
							@click="changePay(p,index)">
							<view class="item" v-model="pId"
								:class="{'pay-active': payActive ? payIndex === index : !payActive}">
								<!-- <span v-if="p.payCode === 'balance'">{{ p.name }}({{ userInfo.balance || 0 }}元)</span> -->
								<div class="item-i">
									<span class="usdtIcon"></span>
									<span>{{ p.name }}</span>
								</div>
								<span class="icon"></span>
							</view>
						</view>
						<view class="tips">
							<span style="color: #000000;font-size: 14px;font-weight: 500;">温馨提示</span>
							<span class="tip">1.充值后请耐心等待15分钟左右的审核</span>
							<span  class="tip">2.如果在充值并且确认usdt转账成功的情况下,充值未到账请及时联系客服</span>
							<span class="tip">3.为确认资金安全请勿用平台以外的链接进行转账</span>
						</view>
						<view class="bottom">
							<span class="btn" @click="goPay">立即支付</span>
							<div style="margin-top: 14px;">
								<span style="color: #000000;margin-right: 10px; font-size: 10px;">支付中如有问题，请咨询</span>
								<span style="color: #ed633a; font-size: 10px;">在线客服</span>
							</div>
						</view>
					</u-popup>
				</view>
			</view>
		</view>
		<Pay :data="payData"></Pay>
	</view>
</template>
<script>
	// import listCell from '@/components/mix-list-cell';
	import Pay from '@/components/pay.vue'
	import {
		mapState
	} from 'vuex';
	import {
		getVipList,
		getPayChannel,
		payMoney,
		buyVip
	} from "@/common/api"
	export default {
		components: {
			Pay
		},
		data() {
			return {
				bgColor: '#444',
				leftIconColor: '#fff',
				vipList: [],
				payChannelList: [],
				indexI: 0,
				isActive: true,
				payActive: true,
				payIndex: 0,
				amount: 0,
				pName: undefined,
				pId: undefined,
				vId: undefined,
				show: false,
				payData: {}
			}
		},
		onLoad() {
			this.$store.dispatch('user/GetUserInfo', {});
			this.getVip();
			this.getPayChannels();
		},

		computed: {
			userInfo() {
				return uni.getStorageSync('userInfo');
			},

		},
		methods: {


			open() {
				this.show = true;
			},
			close() {
				this.show = false;
			},
			async goPay() {
				if (this.payChannelList[this.payIndex].type === 1){
					console.log(this.vipList[this.indexI])
					const formData = {
						vipCard: this.vipList[this.indexI].id,
						amount: this.vipList[this.indexI].discountAmount,
						payChannelId: this.payChannelList[this.payIndex].id,
						user: uni.getStorageSync('userInfo').id
					}
					let res = await buyVip(formData);
					if (res.code === 200){
						uni.showToast({
							title:res.msg,
							icon:'none',
							duration:2000
						})
					}
					return
				}
				this.close();
				this.payData = {
					vip: this.vipList[this.indexI].id,
					qrCode: this.payChannelList[this.payIndex].qrCode,
					payCode: this.payChannelList[this.payIndex].payCode,
					payChannel: this.payChannelList[this.payIndex].id,
					amount: this.vipList[this.indexI].discountAmount,
					payShow: true,
				}
				// this.show = false;
			},
			changePay(val, index) {
				this.payIndex = index;
				this.pId = val.id;
			},
			changeIndex(val, index) {
				this.indexI = index;
				this.amount = val.discountAmount;
				this.vId = val.id;
			},
			// rightClick() {},
			async getPayChannels() {
				let res = await getPayChannel();
				this.payChannelList = res.data;
				this.pName = this.payChannelList[0].name;
				this.pId = this.payChannelList[0].id;
			},
			async getVip() {
				let res = await getVipList();
				this.vipList = res.data;
				this.amount = this.vipList[this.indexI].discountAmount;
				
				// for (let i = 0; i < this.vipList.length.length; i++) {
				// 	if (this.indexI === i) {
				// 		console.log(11111)
				// 		this.amount = this.vipList[i].currentPrice;
				// 		this.vId = this.vipList[i].id;
				// 	}
				// }

			},



		}
	}
</script>
<style lang='scss' scoped>
	.vip {
		height: auto;

		.top {

			.header {
				background: #444;
				background-size: 100%;
				width: 100%;
				height: 250upx;
				padding-top: 44px;

				.no-vip {
					background: url("./images/vip_no_card_bg.png") no-repeat;
					background-size: 100%;
					width: 90%;
					height: 260upx;
					margin-left: calc(10% / 2);
					display: flex;
					flex-direction: column;

					.tip {
						margin: 40upx 0 0 40upx;
					}

					.img {
						display: flex;
						align-items: center;
						/* //width: 60px; */
						height: 60px;
						padding-top: 20px;
						padding-left: 10px;

						.center-logo-img {
							width: 60px;
							height: 60px;
							border-radius: 150upx;
							margin-right: 10px;
						}
					}

				}
			}

			.body {
				margin-top: 60px;
				height: 100%;

				.queren-pay {
					margin-top: 40px;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					.btn {
						background: linear-gradient(to right, #f8ceb6, #f4ad87);
						width: 280px;
						height: 44px;
						border-radius: 40px;
						font-size: 16px;
						display: flex;
						align-items: center;
						justify-content: center;
						color: #410704;
						font-weight: 600;
					}
				}

				.pay-list {
					width: 90%;
					margin-left: calc(10% / 2);

					.tips {
						display: flex;
						flex-direction: column;
						align-items: flex-start;
						margin: 10px 20px;

						.tip {
							color: #878787;
							font-size: 10px;
						}
					}

					.title {
						text-align: center;
						font-size: 16px;
						padding-bottom: 20px;
						margin-top: 10px;
					}

					.pay-item {
						.pay-active {
							.icon {
								background: #efb08d !important;
								border: 1px solid #efb08d !important;
							}
						}

						.item {
							display: flex;
							align-items: center;
							justify-content: space-between;
							margin: 5px 20px;

							.item-i {
								display: flex;
								align-items: center;

								.usdtIcon {
									background: url('./images/usdt-icon.png') no-repeat;
									background-size: 100% 100%;
									width: 14px;
									height: 14px;
									margin-right: 5px;
								}
							}

							.icon {
								//background: #8F8F94;
								border: 0.5px solid #000000;
								width: 12px;
								height: 12px;
								border-radius: 50%;
							}

						}

					}
				}

				.quanyi {
					width: 90%;
					margin-left: calc(10% / 2);

					.title {
						display: flex;
						align-items: center;

						.tip {
							font-size: 16px;
							margin-right: 10px;
						}

						.icon {
							background: url("./images/vip_tq_ic.png") no-repeat;
							background-size: 100%;
							width: 16px;
							height: 16px;
						}
					}

					.quanyi-list {
						display: flex;
						justify-content: space-between;
						margin-top: 10px;
						font-size: 12px;

						.quanyi-item {
							display: flex;
							flex-direction: column;
							align-items: center;

							.zhekou-icon {
								background: url("./images/hyzxj.png") no-repeat;
								background-size: 100% 100%;
								width: 45px;
								height: 50px;
								margin-bottom: 10px;
							}

							.kefu-icon {
								background: url("./images/zskf.png") no-repeat;
								background-size: 100% 100%;
								width: 45px;
								height: 50px;
								margin-bottom: 10px;
							}

							.tuikuan-icon {
								background: url("./images/jstk.png") no-repeat;
								background-size: 100% 100%;
								width: 45px;
								height: 50px;
								margin-bottom: 10px;
							}

							.huodong-icon {
								background: url("./images/zxhd.png") no-repeat;
								background-size: 100% 100%;
								width: 45px;
								height: 50px;
								margin-bottom: 10px;
							}
						}
					}
				}

				.vip-list {
					margin-top: 20px;
					width: 90%;
					margin-left: calc(10% / 2);

					.vip-card {
						display: flex;
						flex-direction: row;
						overflow-x: auto;
						margin-top: 6px;

						::-webkit-scrollbar {
							display: none;
						}

						.vip-item {
							.active {
								border: 1px solid #f29a70 !important;

								.info {
									color: #f29a70;
								}

								.youhui {
									background: #fdf3e5 !important;
								}
							}

							.item {
								border: 1px solid #8F8F94;
								background: #fff;
								border-radius: 10px;
								width: 120px;
								height: 150px;
								margin-right: 10px;
								display: flex;
								flex-direction: column;
								align-items: center;
								justify-content: space-around;
								.info {
									display: flex;
									flex-direction: column;
									align-items: center;
									margin-top: 10px;

									
									.mark1 {
										/* width: auto;
										height: 19px;
										background: rgb(212, 119, 60);
										border-radius: 10px 0 0 0;
										margin-top: -12px;
										margin-left: -68px; */
									}

									.amount {
										font-size: 12px;
										color: #8F8F94;
										display: inline-block;
										text-decoration: line-through;
										text-decoration-line: line-through;
										text-decoration-thickness: initial;
										text-decoration-style: initial;
										text-decoration-color: initial;
									}

									.amount::after {
										content: '';
										width: 10px;
										height: 1px;
										background: #8F8F94;

									}
								}

								.youhui {
									/* margin-top: 20px; */
									color: #8F8F94;
									font-size: 12px;
									width: 100px;
									background: #efeff1;
									border-radius: 5px;
									text-align: center;
								}
							}
						}
					}
				}
			}
		}


		.bottom {
			height: auto;
			/* // border-radius: 10px 10px 0 0;
			// background: #fff;
			// padding-bottom: 10px; */
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			text-align: center;
			margin: 16px 0;

			.btn {
				background: linear-gradient(to right, #ffbc9f, #ffa17b);
				border-radius: 30px;
				width: 270px;
				height: auto;
				padding: 6px 0;
				color: #410704;
				font-size: 16px;
				font-weight: 500;
			}
		}
	}
</style>