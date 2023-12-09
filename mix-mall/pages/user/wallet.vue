<template>
	<view class="container">
		<view class="header">
			<view class="balanceBox">
				<view class="balanceBoxTop">
					<view class="balanceBoxTopLeft">
						<span class="moneyIcon"></span>
						<span class="title">我的钱包</span>
					</view>
					<span class="btn">立即提现</span>
				</view>
				<view class="banlaceBody">
					<view class="banlace">
						<span style="color: #b76543;font-size: 12px;">我的余额</span>
						<span
							style="color: #ff5331;font-size: 24px;font-weight: 500;">{{userInfo.banlace || 0.00}}</span>
					</view>
					<view class="income">
						<span style="color: #b76543;font-size: 12px;">我的收益</span>
						<span
							style="color: #ff5331;font-size: 24px;font-weight: 500;">{{userInfo.income || 0.00}}</span>
					</view>
				</view>
				<view class="banlaceBottom">
					<view class="billIncome">
						<view class="billDetails">
							<span></span>
							<span style="color: #ff7a5c;">账单明细</span>
						</view>
						<span class="fenge"></span>
						<view class="incomeCenter">
							<span></span>
							<span style="color: #ff7a5c;">收益中心</span>
						</view>
					</view>

				</view>
			</view>
		</view>
		<view class="body">
			<view class="amonutList">
				<span style="font-size: 16px;font-weight: 500;margin-top: 10px;">充值余额</span>
				<view class="amonutCard">
					<view class="amonutItem" v-for="(item,index) in amonutList" :key="item.id" @click="changeIndex(item,index)">
						<view class="item" v-model="vId" :class="{'active' : isActive ? indexI === index : !isActive}">
							<view class="info" :style="{'borderRadius': item.description ? borderRadius: '5px' }">
								<!-- <span>{{ item.name }}</span> -->
								<span class="discountAmount">{{item.discountAmount}}U</span>
								<span class="originAmount">{{item.originAmount}}U</span>
								
								<!-- <span style="font-size: 20px; font-weight: 700;"><text
										style="font-size: 12px">$</text>{{ Number(item.discountAmount) }}</span>
								<span class="amount">${{ Number(item.originAmount) }}</span> -->
							</view>
							
							<span class="description" v-if="item.description">{{item.description}}</span>
							<!-- <span class="youhui">立省{{ Number(item.originAmount) - Number(item.discountAmount) }}U</span> -->
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
				<u-popup class="mode" :show="show" :round="10" mode="bottom" @close="close">
					<span class="title">选择支付方式</span>
					<view class="pay-item" v-for="(p,index) in payChannelList" :key="p.id" @click="changePay(p,index)">
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
						<span class="tip">2.如果在充值并且确认usdt转账成功的情况下,充值未到账请及时联系客服</span>
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
		getAmonut,
		getPayChannel,
		payMoney
	} from "@/common/api"
	export default {
		components: {
			Pay
		},
		data() {
			return {
				bgColor: '#444',
				leftIconColor: '#fff',
				amonutList: [],
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
				payData: {},
				borderRadius: '5px 5px 0 0'
			}
		},
		onLoad() {
			this.$store.dispatch('user/GetUserInfo', {});
			this.getAmonutList();
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
			goPay() {
				this.close();
				this.payData = {
					vip: this.vipList[this.indexI].id,
					qrCode: this.payChannelList[this.payIndex].qrCode,
					payCode: this.payChannelList[this.payIndex].payCode,
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
			async getAmonutList() {
				let res = await getAmonut();
				this.amonutList = res.data;
				this.amount = this.amonutList[this.indexI].discountAmount;

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
	.container {
		height: 100%;
		.header {
			.balanceBox {
				background: linear-gradient(to right, #feebe3, #ffdcd3);
				width: 340px;
				height: 170px;
				margin-left: calc((100% - 340px) / 2);
				border-radius: 5px;
				display: flex;
				flex-direction: column;

				.balanceBoxTop {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 10px;

					.balanceBoxTopLeft {
						display: flex;

						.moneyIcon {
							background: url('images/money.png') no-repeat;
							background-size: 100% 100%;
							width: 20px;
							height: 20px;
						}

						.title {
							margin-left: 10px;
							color: #c67f61;
							font-size: 16px;
							font-weight: 500;
						}
					}

					.btn {
						background: #ffffff;
						font-size: 12px;
						color: #b76543;
						border-radius: 20px;
						text-align: center;
						padding: 10px 20px;
					}
				}

				.banlaceBody {
					display: flex;
					justify-content: space-around;
					padding: 0 10px;

					.banlace {
						display: flex;
						flex-direction: column;
						align-items: center;
					}

					.income {
						display: flex;
						flex-direction: column;
						align-items: center;
					}
				}

				.banlaceBottom {
					display: flex;
					flex-direction: column;
					justify-content: center;

					.billIncome {
						display: flex;
						justify-content: space-around;
						align-items: center;
						margin-top: 12px;

						.fenge {
							width: 1px;
							height: 22px;
							background: #f3ccc2;
						}
					}
				}

				.banlaceBottom::before {
					content: '';
					border: 1px #f3ccc2 solid;
					width: 310px;
					margin-left: calc((100% - 310px) / 2);
					margin-top: 10px;
				}
			}
		}
		.body{
			background: #f3f3f3;
			margin-top: 10px;
			.amonutList{
				padding-top: 10px;
				margin-left: calc((100% - 340px) / 2);
				.amonutCard{
					display: flex;
					flex-wrap: wrap;
					.amonutItem{
						/* display: flex; */
						.active{
							.info{
								background: #fff0ed !important;
								border: #ff8b62 1px solid;
								bo
								span{
									color: #ff5b3d !important;
								}
							}
							
						}
						.item{
							display: flex;
							flex-direction: column;
							margin: 10px 5px 0 0;
							.info{
								display: flex;
								flex-direction: column;
								align-items: center;
								justify-content: center;
								background: #fff;
								width: 110px;
								height: 80px;
								/* border-radius: 5px; */
								.discountAmount{
									color: #2d2d2d;
									font-size: 20px;
									font-weight: 500;
								}
								.originAmount{
									color: #2d2d2d;
									font-size: 14px;
									text-decoration: line-through;
								}
								
							}
							.description{
								background: #ff8b62;
								height: 18px;
								width: 100%;
								color: #fff;
								font-size: 12px;
								border-radius: 0 0 5px 5px;
								text-align: center;
								/* position: relative;
								bottom: -3px; */
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
			background: linear-gradient(to right, #f7ccb4, #f4af89);
			border-radius: 30px;
			width: 270px;
			height: auto;
			padding: 6px 0;
			color: #410704;
			font-size: 16px;
			font-weight: 500;
		}

	}
</style>