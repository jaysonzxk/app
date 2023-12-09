<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">LOGIN</view>
			<view class="welcome">
				欢迎登录！
			</view>
			<view class="input-content">
				<view class="input-item">
					<!-- <text class="tit">手机号码</text> -->
					<input v-model="mobile" type="text" placeholder="请输入(+区号)手机号码" maxlength="11"
						data-key="mobile" @input="inputChange" />
				</view>
				<view class="codeInput">
					<view class="code">
						<!-- <text class="tit">验证码</text> -->
						<input v-model="code" type="text" value="" placeholder="请输手机入验证码" maxlength="20"
							@input="inputChange" />
					</view>
					<span v-show="codeShow" class="getCode" @click="getCode(mobile)">获取验证码</span>
					<span v-show="!codeShow" class="count">{{ count }}秒</span>
				</view>

			</view>
			<button class="confirm-btn" @click="userLogin" :disabled="logining">登录</button>
			<!-- <view class="forget-section">
				忘记密码?
			</view> -->
		</view>
		<view class="register-section">
			还没有账号?
			<text @click="toRegist">马上注册</text>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex';
	import {
		getMobileCode
	} from '@/common/api.js';
	export default {
		data() {
			return {
				mobile: '',
				code: '',
				logining: false,
				codeShow: true,
				count: '',
				deviceId: getApp().globalData.clientId
			}
		},
		onLoad() {

		},
		methods: {
			// ...mapMutations(['user.Login']),
			inputChange(e) {
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			navBack() {
				uni.navigateBack();
			},
			toRegist() {
				this.$api.msg('去注册');
			},
			async getCode(val) {
				const TIME_COUNT = 60
				const phoneReg = /^[1][3,4,5,6,7,8][0-9]{9}$/;
				if (phoneReg.test(val) === false) {
					this.$api.msg('手机号格式错误')
					return
				}
				if (this.mobile === '') {
					this.$api.msg('手机号不能为空')
				} else {
					if (!this.timer) {
						const query = {
							mobile: val
						}
						let res = await getMobileCode(query)
						if (res.code === 200) {
							this.code = res.data.code
						} else {
							this.$api.msg('' + res.msg)
							return
						}
						this.count = TIME_COUNT
						this.codeShow = false
						this.timer = setInterval(() => {
							if (this.count > 0 && this.count <= TIME_COUNT) {
								this.count--
							} else {
								this.codeShow = true
								clearInterval(this.timer)
								this.timer = null
							}
						}, 1000)
						this.$api.msg('验证码已发送');
					}
				}
			},
			async userLogin() {
				this.logining = true;
				const loginForm = {
					mobile: this.mobile,
					code: this.code,
					deviceId: this.deviceId
				}
				await this.$store.dispatch('user/Login', loginForm);

				await this.$store.dispatch('user/GetUserInfo', {});
				this.logining = false;
			}
			// async toLogin() {
			// 	this.logining = true;

			// 	const loginForm = {mobile: this.mobile, code: this.code, deviceId:this.deviceId}
			// 	await this.$store.dispatch('user/Login', loginForm);
			// 	if (res.code === 200) {
			// 		this.login(result.data);
			// 		uni.navigateBack();
			// 	} else {
			// 		this.$api.msg(result.msg);
			// 		this.logining = false;
			// 	}
			// }
		},

	}
</script>

<style lang='scss'>
	page {
		background: #fff;
	}

	.container {
		padding-top: 115px;
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}

	.wrapper {
		position: relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}

	.back-btn {
		position: absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}

	.left-top-sign {
		font-size: 120upx;
		color: $page-color-base;
		position: relative;
		left: -16upx;
	}

	.right-top-sign {
		position: absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;

		&:before,
		&:after {
			display: block;
			content: "";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}

		&:before {
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}

		&:after {
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}

	.left-bottom-sign {
		position: absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}

	.welcome {
		position: relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0, 0, 0, .3);
	}

	.input-content {
		padding: 0 60upx;
	}

	.codeInput {
		display: flex;

		/* align-items: center; */
		.code {
			width: 400upx;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			padding: 0 30upx;
			background: $page-color-light;
			height: 80upx;
			border-radius: 4px;
			margin-bottom: 50upx;

			input {
				height: 60upx;
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				width: 100%;
			}
		}

		.getCode {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			padding: 0 30upx;
			/* background: $page-color-light; */
			height: 80upx;
			border-radius: 4px;
			margin-bottom: 50upx;
			color: #fbd300;
		}

		.count {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			padding: 0 60upx;
			/* background: $page-color-light; */
			height: 80upx;
			border-radius: 4px;
			margin-bottom: 50upx;
			color: #ff0000;
		}

	}

	.input-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 0 30upx;
		background: $page-color-light;
		height: 80upx;
		border-radius: 4px;
		margin-bottom: 50upx;

		&:last-child {
			margin-bottom: 0;
		}

		.tit {
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}

		input {
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}
	}

	.confirm-btn {
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;

		&:after {
			border-radius: 100px;
		}
	}

	.forget-section {
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}

	.register-section {
		position: absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;

		text {
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}
</style>