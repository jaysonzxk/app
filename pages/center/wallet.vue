<template>
	<view class="wallet" :style="{'padding-top': statusBarHeight + 'px'}">
		<view class="header">
      <u-navbar
          title="我的钱包"
          @rightClick="rightClick"
          :autoBack="true"
          :bgColor="bgColor"
      >
      </u-navbar>
		<view class="body">
      <view class="tip">
        我的余额
      </view>
      <view class="money">
        <span class="money-l">20000.80</span>
        <span class="money-r">充值</span>
      </view>

    </view>
			<view class="title">
				钱包明细
			</view>
			<view class="details">
				<view class="item" v-for="(item, index) in details" :key="item.id">
					<view class="item-list">
						<view class="item-l">
							<span>{{item.name}}</span>
							<span>{{item.date}}</span>
						</view>
						<view class="item-r">
							<span :style="{'color':'red' ? Number(item.amount>0) : 'black'}">{{item.amount}}</span>
							<span>余额：{{item.balance}}</span>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        statusBarHeight: getApp().globalData.statusBarHeight,
        bgColor: '#fff',
				details:[
					{id:1, name: '余额支付订单', date: '2023-08-03 13:58:16', amount: -180.90, balance: 18223},
					{id:2, name: '余额支付订单', date: '2023-08-03 13:58:16', amount: -180.90, balance: 18223},
					{id:3, name: '余额支付订单', date: '2023-08-03 13:58:16', amount: -180.90, balance: 18223},
					{id:4, name: '余额支付订单', date: '2023-08-03 13:58:16', amount: -180.90, balance: 18223},
					{id:5, name: '余额支付订单', date: '2023-08-03 13:58:16', amount: -180.90, balance: 18223},
					{id:6, name: '余额支付订单', date: '2023-08-03 13:58:16', amount: -180.90, balance: 18223},
					{id:7, name: '余额支付订单', date: '2023-08-03 13:58:16', amount: -180.90, balance: 18223}
				]
			}
		},
		methods: {
      rightClick() {
      },
		}
	}
</script>

<style>

</style>
