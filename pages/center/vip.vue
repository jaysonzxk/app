<template>
  <view class="vip" :style="{'padding-top': statusBarHeight + 'px'}">
    <view class="top">
      <view class="header">
        <u-navbar
            title="会员中心"
            @rightClick="rightClick"
            :autoBack="true"
            rightText="充值说明"
            :bgColor="bgColor"
            :leftIconColor="leftIconColor"
        >
        </u-navbar>
        <view class="no-vip">
          <view class="img">
            <image class="center-logo-img" src="./images/tuxiang.png"></image>
            <span class="username">{{ userInfo.name }}</span>
          </view>
          <span style="padding-left: 10px;">开通VIP享受多重特权</span>
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
            <view class="vip-item" v-for="(v,index) in vipList" :key="v.id" @click="changeIndex(v,index)"
            >
              <view class="item" v-model="vId" :class="{'active' : isActive ? indexI === index : !isActive}">
                <view class="info">
                  <view v-if="v.isRecommend === 1" class="mark">khuyên bạn</view>
                  <view v-else class="mark1"></view>
                  <span>{{ v.name }}</span>
                  <span style="font-size: 20px; font-weight: 700;"><text
                      style="font-size: 12px">¥</text>{{ Number(v.currentPrice) }}</span>
                  <span class="amount">¥{{ Number(v.amount) }}</span>
                </view>
                <span class="youhui">立省{{ Number(v.amount) - Number(v.currentPrice) }}元</span>
              </view>

              <!--            <span>{{v.name}}</span>-->
              <!--            <span>{{Number(v.currentPrice)}}</span>-->
              <!--            <span>{{Number(v.amount)}}</span>-->
              <!--            <span>{{Number(v.amount) - Number(v.currentPrice)}}</span>-->
            </view>
          </view>

        </view>
        <view class="queren-pay">
          <span class="btn" @click="open">确认开通</span>
        </view>
        <view class="pay-list">
          <u-popup :show="show" :round="10" mode="bottom" @close="close" @open="open">
            <span class="title">选择支付</span>
            <view class="pay-item" v-for="(p,index) in payChannelList" :key="p.id" @click="changePay(p,index)">
              <view class="item" v-model="pId" :class="{'pay-active': payActive ? payIndex === index : !payActive}">
                <span v-if="p.payCode === 'balance'">{{ p.name }}({{ userInfo.balance }}元)</span>
                <span v-else>{{ p.name }}</span>
                <span class="icon"></span>
              </view>
            </view>
                <view class="bottom">
                  <view class="bottom-l">
                    <span style="font-size: 10px; color: #8F8F94">支付金额:¥</span>
                    <span style="color: #ce3c39;font-size: 16px">{{amount}}</span>
                  </view>
<!--                  <text class="tips">支付遇到问题联系客服</text>-->
                  <view class="bottom-r">
                    <span class="ljzf" @click="goPay">立即支付</span>
                  </view>
                </view>
          </u-popup>
        </view>
      </view>
      <u-modal :show="toastShow" :closeOnClickOverlay="true"></u-modal>
    </view>
  </view>
</template>

<script>
import uniList from '@/components/uni-list/uni-list.vue';
import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
import user from "@/store/modules/user";
import {getVipList, getPayChannel, payMoney} from "@/common/api"
import {beforeDestroy} from "@/uni_modules/uview-ui/libs/mixin/mixin";

export default {
  components: {
    uniList,
    uniListItem
  },
  data() {
    return {
      toastShow: false,
      statusBarHeight: getApp().globalData.statusBarHeight,
      bgColor: '#444',
      leftIconColor: '#fff',
      vipList: [],
      payChannelList: [],
      indexI: 2,
      isActive: true,
      payActive: true,
      payIndex: 0,
      amount: 0,
      pName: undefined,
      pId: undefined,
      vId: undefined,
      form: {},
      show: false
    };
  },
  onLoad() {
    this.getVip();
    this.getPayChannels();
  },
  create() {
  },
  computed: {
    userInfo() {
      return uni.getStorageSync('userInfo')
    }
  },
  methods: {
    open() {
      this.show = true;
    },
    close() {
      this.show = false
    },
    async goPay() {
      const data = {vId: this.vId, pId: this.pId, amount: this.amount}
      let res = await payMoney(data);
        if (res.code === 2000) {
          uni.showToast({
            title: res.msg,
            duration: 2000
          });
          uni.navigateBack({
            delta: 1,
          })
        }
    },
    changePay(val, index) {
      this.payIndex = index;
      this.pId = val.id;
    },
    changeIndex(val, index) {
      this.indexI = index;
      this.amount = val.currentPrice;
      this.vId = val.id;
    },
    rightClick() {
    },
    async getPayChannels() {
      let res = await getPayChannel();
      if (res.code === 2000) {
        this.payChannelList = res.data.data;
        this.pName = this.payChannelList[0].name;
        this.pId = this.payChannelList[0].id;
      }
    },
    async getVip() {
      let res = await getVipList();
      if (res.code === 2000) {
        this.vipList = res.data.data;
        for (let i = 0; i < this.vipList.length; i++) {
          if (this.indexI === i) {
            this.amount = this.vipList[i].currentPrice;
            this.vId = this.vipList[i].id;
          }
        }
      }
    },
  },

};
</script>

<style scoped lang="scss">
.vip {
  //margin-top: 30px;
  background: #f1f0f0;
  height: 100%;

  .top {
    //overflow-y: auto;
    //max-height: 600px;
    .header {
      //display: flex;
      //justify-content: space-between;
      background: #444;
      background-size: 100%;
      width: 100%;
      height: 110px;
      margin-top: 44px;

      /deep/ .u-navbar__content__right__text {
        font-size: 12px;
        color: #8F8F94;
      }

      /deep/ .u-navbar__content__title {
        color: #ffff;
      }

      .no-vip {
        background: url("@/pages/center/images/vip_no_card_bg.png") no-repeat;
        background-size: 100%;
        width: 90%;
        height: 130px;
        margin-top: 20px;
        margin-left: calc(10% / 2);
        //display: flex;
        //align-items: center;
        .img {
          display: flex;
          align-items: center;
          //width: 60px;
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
        margin-top: 60px;
        //display: flex;
        //align-items: center;
        //width: 90%;
        text-align: center;
        .btn {
          background: rgb(244, 190, 85);
          border-radius: 40px;
          font-size: 16px;
          padding: 10px 40px;
          color: #fff;
          font-weight: 600;
        }
      }

      .pay-list {
        //margin-top: 20px;
        width: 90%;
        margin-left: calc(10% / 2);
        .title{
          text-align: center;
          font-size: 16px;
          padding-bottom: 20px;
        }
        .pay-item {
          .pay-active {
            .icon {
              background: goldenrod !important;
            }
          }

          .item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 5px 20px;
            .icon {
              //background: #8F8F94;
              border: 1px solid #8F8F94;
              width: 14px;
              height: 14px;
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
            background: url("@/pages/center/images/vip_tq_ic.png") no-repeat;
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
              background: url("@/pages/center/images/hyzxj.png") no-repeat;
              background-size: 100% 100%;
              width: 45px;
              height: 50px;
              margin-bottom: 10px;
            }

            .kefu-icon {
              background: url("@/pages/center/images/zskf.png") no-repeat;
              background-size: 100% 100%;
              width: 45px;
              height: 50px;
              margin-bottom: 10px;
            }

            .tuikuan-icon {
              background: url("@/pages/center/images/jstk.png") no-repeat;
              background-size: 100% 100%;
              width: 45px;
              height: 50px;
              margin-bottom: 10px;
            }

            .huodong-icon {
              background: url("@/pages/center/images/zxhd.png") no-repeat;
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
        //height: 400px;
        .vip-card {
          display: flex;
          flex-direction: row;
          overflow-x: auto;
          //justify-content: space-around;
          margin-top: 6px;

          ::-webkit-scrollbar {
            display: none;
          }

          .vip-item {

            .active {
              border: 2px solid rgb(212, 119, 60) !important;
              //.item{
              //  border: 1px solid rgb(212, 119, 60);
              //}
              .info {
                color: rgb(212, 119, 60);
              }

              .youhui {
                background: rgb(250, 235, 209) !important;
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

              .info {
                display: flex;
                flex-direction: column;
                align-items: center;
                margin-top: 10px;

                .mark {
                  width: auto;
                  //height: 10px;
                  background: rgb(212, 119, 60);
                  border-radius: 10px 0 0 0;
                  margin-top: -11px;
                  margin-left: -68px;
                  color: #1f1f1f;
                  font-size: 10px;
                  text-align: center;
                }

                .mark1 {
                  width: auto;
                  height: 19px;
                  background: rgb(212, 119, 60);
                  border-radius: 10px 0 0 0;
                  margin-top: -12px;
                  margin-left: -68px;
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
                margin-top: 20px;
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
    height: 40px;
    border-radius: 10px 10px 0 0;
    background: #fff;
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 20px;
    .tips{
      font-size: 10px;
      color: #fe7f0f;
    }
    .bottom-r {
      .ljzf {
        background: rgb(244, 190, 85);
        border-radius: 30px;
        padding: 10px 40px;
        color: #fff;
        font-size: 15px;
        font-weight: 600;
      }
    }
  }
}
</style>
