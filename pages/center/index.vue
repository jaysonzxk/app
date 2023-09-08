<template>
	<view class="center" :style="{'padding-top': statusBarHeight + 'px'}">
		<view class="center-top">
			<!-- <text class="mine">我的</text> -->
			<view class="center-logo">
				<view class="userinfo">
					<image class="center-logo-img" src="./images/tuxiang.png"></image>
					<view class="center-logo-title">
						<view class="center-uer-name" v-show="userInfo">
              <view class="sex">
                <text class="username">{{ userInfo.name }}</text>
                <span class="man" v-show="userInfo.gender === 0"></span>
                <span class="woman" v-show="userInfo.gender === 1"></span>
              </view>
              <view>
                <view v-if="userInfo">
                  <text v-if="userInfo.vip === null" class="phone">普通用户</text>
                  <text v-else class="phone">{{userInfo.vip.vipName}}</text>
                </view>
              </view>
						</view>
            <text v-show="!userInfo" class="login" @click="goLogin">请 登 录</text>
					</view>
				</view>
        <view class="top-r">
          <span class="tongzhi"></span>
          <span class="setting"></span>
        </view>

				<!-- <view class="info">
					<span>编辑资料</span>
				</view> -->
			</view>
      <view class="tips">
        <view class="collect">
          <span>0</span>
          <span>收藏</span>
        </view>
        <view class="follow">
          <span>0</span>
          <span>关注</span>
        </view>
        <view class="points">
          <span>0</span>
          <span>积分</span>
        </view>
      </view>
      <view class="vip">
        <view class="vip-bg" v-if="!userInfo">
          <span class="vip-bg-l"></span>
          <span style="color: rgb(235, 209, 182);font-size: 12px">点亮会员标识, 享受尊贵特权</span>
          <span class="open" @click="goOpenVip"></span>
        </view>
        <view class="vip-bg"  v-else>
          <template v-if="userInfo.vip === null">
            <span class="vip-bg-l"></span>
            <span style="color: rgb(235, 209, 182);font-size: 12px">点亮会员标识, 享受尊贵特权</span>
            <span class="open" @click="goOpenVip"></span>
          </template>
          <template v-else>
            <span class="vip-bg-l"></span>
            <span style="color: rgb(235, 209, 182);font-size: 12px">到期时间:{{$u.timeFormat(userInfo.vip.expiration, 'yyyy-mm-dd hh:MM:ss')}}</span>
            <span class="renew" @click="goOpenVip"></span>
          </template>

        </view>

      </view>
		</view>
    <view class="my-wallet">
      <view class="coupon">
        <view class="coupon-l">
          <span class="title">优惠券</span>
          <span class="use-num">3张可用</span>
        </view>
        <view class="coupon-icon"></view>
      </view>
      <view class="wallet" @click="goWallet">
        <view class="wallet-l">
          <span class="title">我的钱包</span>
          <span class="balance">余额:{{userInfo.balance}}</span>
        </view>
        <view class="wallet-icon"></view>
      </view>
    </view>
		<view class="middle">
			<span class="middle-l"></span>
			<span class="middle-r"></span>
		</view>
		<view class="bottom-list">
      <text style="margin-left: 10px">我的工具</text>
      <view class="tools">
<!--        <view class="addr">-->
<!--          <span class="addr-icon"></span>-->
<!--          <span>我的地址</span>-->
<!--        </view>-->
        <view class="about">
          <span class="about-icon part"></span>
          <span>关于我们</span>
        </view>
        <view class="feedback part">
          <span class="feedback-icon"></span>
          <span>用户反馈</span>
        </view>
        <view class="cs part">
          <span class="cs-icon"></span>
          <span>联系客服</span>
        </view>
        <view class="evaluate part">
          <span class="evaluate-icon"></span>
          <span>我的评价</span>
        </view>
        <view class="report part">
          <span class="report-icon"></span>
          <span>投诉举报</span>
        </view>
      </view>
		</view>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue';
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
  import {getUserInfo, userLogin} from '@/common/api'
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {
				versionName: 'v1.0.0',
        statusBarHeight: getApp().globalData.statusBarHeight,
        isRefresh: false,
        // userInfo:{}
			};
		},
    onShow(){
      // this.userInfo = uni.getStorageSync('userInfo')
    },
		onLoad(options) {
			this.versionName = '版本:' + this.$config.versionName
		},
    computed: {
      userInfo(){
        console.log(uni.getStorageSync('userInfo') === '')
        return uni.getStorageSync('userInfo')
      }
    },
		methods: {
      async getUserInfo() {
        await this.$store.dispatch('user/GetUserInfo', {});

      },
      // async userInfos() {
      //   let res = await getUserInfo();
      //   if (res.code === 2000){
      //     this.userInfo = res.data
      //   }
      // },
      goWallet(){
        uni.navigateTo({
          url: '/pages/center/wallet'
        })
      },
      goOpenVip(){
        uni.navigateTo({
          url: '/pages/center/vip'
        })
      },
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

<style scoped lang="scss">
	.center {
		//height: 100%;
    //overflow-y: auto;
		/* flex-direction: column; */
		background-color:#f5f5f5;
    //margin-bottom: 20px;
    padding-bottom: 10px;
    .center-top {
      //width: 100%;
      background: url(./images/mine_title_bg.png) no-repeat;
      background-size: 100%;
      border-radius: 0 0 20px 20px;
      .center-logo {
        width: 750upx;
        /*height: 380upx;*/
        box-sizing: border-box;
        /* flex-direction: row; */
        align-items: center;
        margin-left: 20px;
        display: flex;
        justify-content: space-between;
        /* padding-bottom: 60px; */
        .userinfo{
          display: flex;
          /* flex-direction: column; */
          align-items: center;
          margin-top: 40px;
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
        }
        .top-r{
          display: flex;
          margin-right: 30px;
          margin-bottom: 30px;
          .tongzhi{
            background: url("@/pages/center/images/tongzhi.png")  no-repeat;
            background-size: 100%;
            height: 30px;
            width: 20px;
            margin-right: 10px;
          }
          .setting{
            background: url("@/pages/center/images/setting.png")  no-repeat;
            background-size: 100%;
            height: 30px;
            width: 20px;
          }
        }
      }
      .tips{
        display: flex;
        justify-content: space-around;
        margin-top: 20px;
      }
      .tips>view{
        display: flex;
        flex-direction: column;
        justify-items: center;
        align-items: center;
      }
      .vip{
        height: 50px;
        width: 100%;
        margin-top: 20px;
        .vip-bg{
          background: url("@/pages/center/images/vipcard_bg.png") no-repeat;
          background-size: 100%;
          height: 50px;
          width: 95%;
          margin-left: calc(5% / 2);
          display: flex;
          flex: 1;
          /*align-items: center;*/
          align-items: center;
          justify-content: space-around;
          .vip-bg-l{
            background: url("@/pages/center/images/vip_txt_ic.png") no-repeat;
            background-size: 100%;
            width: 50px;
            height: 30px;
            display: flex;
            margin-top: 10px;
          }
          .open{
            background: url("@/pages/center/images/vip_open.png") no-repeat;
            background-size: 100%;
            width: 80px;
            height: 30px;
            /*margin-top: 10px;*/
          }
          .renew{
            background: url("@/pages/center/images/vip_renew.png") no-repeat;
            background-size: 100%;
            width: 80px;
            height: 30px;
          }
        }

      }
    }
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
  .sex{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .man{
    background: url("@/pages/center/images/sex_man.png") no-repeat;
    background-size: 100%;
    height: 12px;
    width: 12px;
    margin-left: 5px;
  }
  .woman{
    background: url("@/pages/center/images/sex_woman.png") no-repeat;
    background-size: 100%;
    height: 12px;
    width: 12px;
    margin-left: 5px;
  }
	.phone {
		font-size: 10px;
		/*color: #fbfbfb;*/
    color: #8F8F94;
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
    height: 90px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin-top: 20px;
    .coupon{
      height: 90px;
      width: 45%;
      background-color: #fff;
      border-radius: 7px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .coupon-l{
        display: flex;
        flex-direction: column;
        align-items: center;
        .title{
          font-size: 16px;
        }
        .use-num{
          font-size: 12px;
          color: #8F8F94;
        }
      }
      .coupon-icon{
        background: url("@/pages/center/images/coupon_ic.png") no-repeat;
        background-size: 80%;
        width: 70px;
        height: 55px;
      }
    }
    .wallet{
      height: 90px;
      width: 45%;
      background-color: #fff;
      border-radius: 7px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .wallet-l{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;
        .title{
          font-size: 16px;
        }
        .balance{
          font-size: 12px;
          color: #8F8F94;
        }
      }
      .wallet-icon{
        background: url("@/pages/center/images/wallet_ic.png") no-repeat;
        background-size: 80%;
        width: 70px;
        height: 55px;
      }
    }
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
		/*margin-top: -50px;*/
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
		width: 100%;
		//height: auto;
    height: 400px;
		margin-top: 10px;
    //margin-bottom: 20px;
		//font-size: 16px;
    .tools{
      background: #fff;
      width: 95%;
      height: auto;
      border-radius: 7px;
      margin-left: calc(5% / 2);
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding-top: 10px;
      //padding-left: calc((100% - 330px) / 2);
      justify-content: space-between;
      .addr{
        display: flex;
        flex-direction: column;
        justify-items: center;
        align-items: center;
        margin-left: 20px;
        .addr-icon{
          background: url("@/pages/center/images/location.png") no-repeat;
          background-size: 80%;
          width: 30px;
          height: 30px;
        }
      }
      .about{
        display: flex;
        flex-direction: column;
        justify-items: center;
        align-items: center;
        width: 80px;

        //margin-left: 20px;
        .about-icon{
          background: url("@/pages/center/images/guanyuwomen.png") no-repeat;
          background-size: 100%;
          width: 40px;
          height: 40px;
        }
      }
      .feedback{
        display: flex;
        flex-direction: column;
        justify-items: center;
        align-items: center;
        width: 80px;
        .feedback-icon{
          background: url("@/pages/center/images/yonghufankui.png") no-repeat;
          background-size: 100%;
          width: 40px;
          height: 40px;
        }
      }
      .cs{
        display: flex;
        flex-direction: column;
        justify-items: center;
        align-items: center;
        width: 80px;
        .cs-icon{
          background: url("@/pages/center/images/lianxikefu.png") no-repeat;
          background-size: 100%;
          width: 40px;
          height: 40px;
        }
      }
      .evaluate{
        display: flex;
        flex-direction: column;
        justify-items: center;
        align-items: center;
        width: 80px;
        .evaluate-icon{
          background: url("@/pages/center/images/wodepingjia.png") no-repeat;
          background-size: 100%;
          width: 40px;
          height: 40px;
        }
      }
      .report{
        display: flex;
        flex-direction: column;
        justify-items: center;
        align-items: center;
        width: 80px;
        .report-icon{
          background: url("@/pages/center/images/tousujubao.png") no-repeat;
          background-size: 100%;
          width: 40px;
          height: 40px;
        }
      }
    }
	}

</style>
