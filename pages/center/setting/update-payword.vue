<template>
	<view class="update-pay">
		<view class="mobile">
			<input v-model="mobile" type="number" placeholder="请输入绑定手机号">
		</view>
		<view class="line">
			
		</view>
		<view class="code">
			<input v-model="code" type="text" placeholder="请输入短信验证码" />
			<span style="margin-right: 10px;" @click="getCode(mobile)">获取验证码</span>
		</view>
		<view class="line">
			
		</view>
		<view class="pay-pwd">
			<input type="text" placeholder="请输入六位支付密码" />
		</view>
		<view class="line">
			
		</view>
		<view class="btn" @click="submit()">确定</view>
	</view>
</template>

<script>
	export default {
		components: {},
		computed: {},
		data() {
			return {
				code: undefined,
				mobile: undefined,
				form:{}
			};
		},
		// onLoad: function(options) {
		// 	this.getData();
		// },
		methods: {
			submit() {
				if (this.mobile === undefined || this.code === undefined) {
					uni.showToast({
						icon: 'none',
						title: "请填写完整信息",
						duration: 2000
					})
				}
			},
			getCode(mobile){
				if (mobile === undefined) {
					uni.showToast({
						icon: 'none',
						title: "请输入正确手机号",
						duration: 2000
					})
				}
			}
		}
	};
</script>

<style>
	.update-pay {
		display: flex;
		justify-content: center;
		flex-direction: column;
		background-color: #fff;
	}

	.mobile {
		margin-top: 30px;
		margin-left: calc(5% / 2);
	}
	.line{
		background-color: rgb(192, 192, 192);;
		height: 1px;
		width: 95%;
		margin-left: calc(5% / 2);
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.code {
		display: flex;
		justify-content: space-between;
		/* margin-top: 30px; */
		margin-left: calc(5% / 2);
	}
.pay-pwd{
	/* margin-top: 30px; */
	margin-left: calc(5% / 2);
}
	.btn {
		background-color: #3ab54a;
		height: 45px;
		width: 95%;
		margin-left: calc(5% / 2);
		border-radius: 20px;
		color: #fff;
		font-size: 14px;
		font-weight: 500;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 40px;
		margin-top: 20px;
	}
</style>