<template>
	<view class="content">
		<view class="content-top">
			<span class="fenge"></span>
			<view class="iphone" @click="goUpdateIphone(index=0)">
				<view class="iphone-l">
					<span class="title">修改手机号</span>
					<span class="tip">若手机号更换请尽快修改</span>
				</view>
				<view class="iphone-r">
					<span style="color: rgb(192, 192, 192);">152****3332</span>
					<span class="more"></span>
				</view>
			</view>
			<span class="fenge"></span>
			<view class="password">
				<view class="password-l">
					<span class="title">修改登陆秘密</span>
					<span class="tip">定期修改登陆密码以确保账户安全</span>
				</view>
				<view class="password-r">
					<span class="more"></span>
				</view>
			</view>
			<span class="fenge"></span>
			<view class="pay-password" @click="updatePayPwd">
				<view class="pay-password-l">
					<span class="title">支付密码</span>
					<span class="tip">设置支付密码用于余额支付</span>
				</view>
				<view class="pay-password-r">
					<span class="more"></span>
				</view>
			</view>
		</view>
		<view class="content-bottom">
			<view class="zhuxiao">
				<span>注销账号</span>
				<span class="more"></span>
			</view>
		</view>
		<view class="logout">
			退出登陆
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			updatePayPwd(){
				uni.navigateTo({
					url:"/pages/center/setting/update-mobile"
				})
			},
			goUpdateIphone(){
				uni.navigateTo({
					url: '/pages/center/setting/update-payword'
				})
			}
		}
	}
</script>

<style>
	.content-top {
		background-color: #fff;
		display: flex;
		flex-direction: column;
	}

	.more {
		background: url('../images/more_icon.png') no-repeat;
		background-size: 100%;
		height: 30px;
		width: 30px;
	}

	.iphone {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-left: 10px;
		height: 60px;
	}

	.iphone-l {
		display: flex;
		flex-direction: column;
	}

	.iphone-r {
		display: flex;
		align-items: center;
	}

	.title {
		font-weight: 350;
	}

	.tip {
		font-size: 12px;
		color: rgb(192, 192, 192);
	}

	.password {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-left: 10px;
		height: 60px;
	}

	.password-l {
		display: flex;
		flex-direction: column;
	}

	.password-r {
		display: flex;
		align-items: center;
	}

	.pay-password {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-left: 10px;
		height: 60px;
	}

	.pay-password-l {
		display: flex;
		flex-direction: column;
	}

	.pay-password-r {
		display: flex;
		align-items: center;
	}

	.content-bottom {
		background-color: #fff;
		margin-top: 10px;
	}

	.zhuxiao {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 50px;
		margin-left: 10px;
	}
	.fenge{
		background:#eee;
		width: 100%;
		height: 1px;
	}
	.logout{
		display: flex;
		flex: 1;
		justify-content: center;
		align-items: center;
		height: 44px;
		background: #3ab54a;
		border-radius: 6px;
		color: #fff;
		font-size: 15px;
		width: 95%;
		margin-left: calc(5% / 2);
		margin-top: 40px;
	}
</style>