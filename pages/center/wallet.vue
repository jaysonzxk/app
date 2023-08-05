<template>
	<view class="wallet">
		<view class="header">
			<view class="tip">
				我的余额
			</view>
			<view class="money">
				<span class="money-l">20000.80</span>
				<span class="money-r">充值</span>
			</view>
			
		</view>
		<view class="body">
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
			
		}
	}
</script>

<style>
	.wallet{
		background: #fff;
		height: 100%;
	}
.header{
	background: url("images/wallet.png") no-repeat;
	background-size: 100% 100%;
	/* height: 200px; */
	width: 95%;
	margin-left: calc(5% / 2);
	color: #fff;
	padding-top: 20px;
	/* align-items: center; */
	/* justify-content: center; */
}
.header-top{
	display: flex;
	flex-direction: column;
	}
.tip{
	padding-top: 16px;
	margin-bottom: 10px;
	margin-left: 20px;
	font-weight: 550;
}
.money{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.money-l{
	font-size: 29px;
	font-weight: 600;
	margin-left: 20px;
}
.money-r{
	border: 0.5px solid #fff;
	border-radius: 6px;
	margin-right: 20px;
	width: 60px;
	height: 30px;
	display: flex;
	align-items: center;
	justify-content: center;
}
.body{
	display: flex;
	flex-direction: column;
	margin-top: 20px;
	height: 100%;
	background-color: #fff;
}
.title{
	font-weight: 700;
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: center;
}
.item-l{
	display: flex;
	flex-direction: column;
}
.item-r{
	display: flex;
	flex-direction: column;
}
.item{
	/* justify-content: space-between; */
	width: 95%;
	margin-left: calc(5% / 2);
}
.item-list{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.item::after{
	content: '';
	display: inline-block;
	background: #f5f5f5;
	height: 2px;
	width: 100%;
}
</style>
