<template>
	<view class="promote" :style="{'paddingTop': statusBarHeight + 'px'}">
		<view class="header">
			<u-navbar title="APP推广" @rightClick="rightClick" :autoBack="true">
			</u-navbar>
		</view>
		<view class="incomeBox">
			<view class="income">
				<span class="title">收益金额</span>
				<view class="amount">
					<view class="amountLeft">
						<span class="amountIcon"></span>
						<span class="incomeAmount">0.00</span>
					</view>
					<view class="amountBtn">
						<span>提现</span>
						<span>转账</span>
					</view>
				</view>
			</view>
			<view class="list">
				<view class="bill">
					<view class="billLeft">
						<span class="billIcon"></span>
						<span class="title">账单明细</span>
					</view>
					<span class="right"></span>
				</view>
				<view class="record" @click="goPromoteRecord">
					<view class="recordBox">
						<view class="recordLeft">
							<span class="recordIcon"></span>
							<span class="title">推广记录</span>
						</view>
						<span class="right"></span>
					</view>
					
				</view>
				<view class="share">
					<view class="shareLeft">
						<span class="shareIcon"></span>
						<span class="title">分享推广</span>
					</view>
					<span class="right"></span>
				</view>
			</view>
		</view>
		<view class="incomeBottom">
			<view class="incomeTips">
				<span class="title">收益说明</span>
				<view class="tip">
					<span>累计充值0-2000 返利30%</span>
					<span>累计充值2000-10000 返利40%</span>
					<span>累计充值10000-30000 返利45%</span>
					<span>累计充值30000以上 返利50%</span>
				</view>
			</view>
			<view class="promotionProcess">
				<span class="title">推广流程</span>
				<view class="tip">
					<span>第一步：点击「分享推广」
						将「二维码」分享给其他人，对方扫码下载APP并登录生成了新账号，则视作推广成功。</span>
					<span>第二步：对方「充值」
						推广的用户充值，则充值金额按照「推广级别」的比例返利给你，若有什么疑问请联系「在线客服」</span>
					<span>第三步：收益提现或转账到余额</span>
				</view>
				<span style="color: #ff4d2d; font-size: 10px; margin: 18px 18px 0 18px;">举例：推广的用户充值100元，返利30～50元，充值越多越高比例越高。</span>
			</view>
		</view>
	</view>
</template>

<script>
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

		onLoad(options) {
		},
		computed: {},
		methods: {
			goPromoteRecord(){
				uni.$u.route('/pages/center/appPromote/promoteRecord')
			}
		},
	};
</script>

<style lang="scss" scoped>
	.promote {
		.incomeBox {
			margin-top: 54px;
			// display: flex;

			.income {
				background: url('../images/promote.png') no-repeat;
				background-size: 100% 100%;
				width: 340px;
				height: 125px;
				margin-left: calc((100% - 340px) / 2);

				.title {
					display: flex;
					align-items: center;
					margin-top: 8px;
					color: #ffa37f;
				}

				.title::before {
					content: '';
					height: 20px;
					width: 8px;
					background: #ffa37f;
					margin-right: 10px;
					border-radius: 0 3px 3px 0;
				}

				.amount {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin: 10px 0 0 10px;

					.amountLeft {
						.incomeAmount {
							color: #ff5331;
							font-size: 28px;
						}
					}

					.amountBtn {
						span {
							background: linear-gradient(to right, #ffc1a6, #ffa37c);
							width: 74px;
							height: 25px;
							border-radius: 5px;
							color: #fff;
							font-size: 12px;
							padding: 4px 12px;
							margin-right: 10px;
						}
					}
				}
			}

			.list {
				background: #fff;
				width: 340px;
				height: 150px;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				margin-left: calc((100% - 340px) / 2);
				margin-top: 12px;
				padding: 10px 0;
				.bill {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin: 0 12px;

					.billLeft {
						display: flex;
						align-items: center;

						.billIcon {
							background: url('../images/billIcon.png') no-repeat;
							background-size: 100% 100%;
							width: 22px;
							height: 22px;
							margin-right: 5px;
						}

						.title {
							color: #2d2d2d;
							font-size: 12px;
						}
					}

					.right {
						background: url('../images/more.png') no-repeat;
						background-size: 100% 100%;
						width: 10px;
						height: 10px;
					}

				}

				.record {
					display: flex;
					flex-direction: column;
					// align-items: center;
					// justify-content: space-between;
					margin: 0 12px;
					.recordBox{
						display: flex;
						justify-content: space-between;
						align-items: center;
						.recordLeft {
							display: flex;
							align-items: center;
							.recordIcon {
								background: url('../images/recordIcon.png') no-repeat;
								background-size: 100% 100%;
								width: 22px;
								height: 22px;
								margin-right: 5px;
							}
						
							.title {
								color: #2d2d2d;
								font-size: 12px;
							}
						}
						
						.right {
							background: url('../images/more.png') no-repeat;
							background-size: 100% 100%;
							width: 10px;
							height: 10px;
						}
					}
					
				}
				.record::before{
					content: '';
					background: #e3e3e3;
					width: 315px;
					height: 1px;
					margin: 5px 0 18px 0;
				}
				.record::after{
					content: '';
					background: #e3e3e3;
					width: 315px;
					height: 1px;
					margin: 18px 0 5px 0;
				}
				.share {
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin: 0 12px;

					.shareLeft {
						display: flex;
						align-items: center;

						.shareIcon {
							background: url('../images/shareIcon.png') no-repeat;
							background-size: 100% 100%;
							width: 22px;
							height: 22px;
							margin-right: 5px;
						}

						.title {
							color: #2d2d2d;
							font-size: 12px;
						}
					}

					.right {
						background: url('../images/more.png') no-repeat;
						background-size: 100% 100%;
						width: 10px;
						height: 10px;
					}
				}
			}
		}

		.incomeBottom {
			margin-top: 17px;
			padding-bottom: 30px;
			.incomeTips {
				.title {
					font-weight: 500;
					display: flex;
					align-items: center;
				}

				.title::before {
					content: '';
					background: #ffa37f;
					width: 8px;
					height: 20px;
					border-radius: 0 3px 3px 0;
					margin-right: 10px;
				}

				.tip {
					display: flex;
					flex-direction: column;
					color: #5b5b5b;
					font-size: 12px;
					margin-left: 18px;

					span:nth-child(n+1) {
						margin-top: 5px;
					}
				}
			}

			.promotionProcess {
				margin-top: 17px;

				.title {
					font-weight: 500;
					display: flex;
					align-items: center;
				}

				.title::before {
					content: '';
					background: #ffa37f;
					width: 8px;
					height: 20px;
					border-radius: 0 3px 3px 0;
					margin-right: 10px;
				}

				.tip {
					display: flex;
					flex-direction: column;
					color: #5b5b5b;
					font-size: 12px;
					margin-left: 18px;
					margin-right: 18px;

					span:nth-child(n+1) {
						margin-top: 5px;
					}
				}
			}
		}
	}
</style>