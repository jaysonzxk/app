<template>
	<view class="update-mobile">
		<span class="tip">
			请输入 15434332343 短信验证码
		</span>
		<view class="code">
			<input v-model="code" type="number" placeholder="请输入短信验证码" placeholder-style="fontSize:14px; color:#e4e7ed" />
			<span style="font-size: 10px;margin-right: 20px;">获取验证码</span>
		</view>
		<span class="line"></span>
		<span class="btn" @click="submit(code)">下一步</span>
	</view>
</template>

<script>
	export default {
		components: {},
		computed: {},
		data() {
			return {
				code: undefined,
			};
		},
		// onLoad: function(options) {
		// 	this.getData();
		// },
		methods: {
			submit(code){
				if(code === undefined){
					uni.showToast({
						icon: 'none',
						title:"请输入验证码",
						duration:2000
					})
				}
			}
		}
	};
</script>

<style>
	.update-mobile {
		display: flex;
		justify-content: center;
		flex-direction: column;
		background-color: #fff;
	}

	.tip {
		margin-top: 20px;
		margin-left: 10px;
	}

	.code {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 10px;
		margin-bottom: 10px;
		margin-left: calc(10% / 2);
	}
	.line {
		background-color: #e4e7ed;
		height: 1px;
		width: 90%;
		margin-left: calc(10% / 2);
		margin-top: -5px;
		margin-bottom: 10px;
	}

	.btn {
		background-color: #3ab54a;
		height: 45px;
		width: 95%;
		margin-left: calc(5% / 2);
		border-radius: 20px;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 40px;
		margin-top: 20px;
	}
</style>