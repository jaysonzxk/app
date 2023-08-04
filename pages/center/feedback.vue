<template>
	<view class="feedback">
		<span class="tip">您好，欢迎您给我们反馈产品的使用感受和建议。</span>
		<view class="area">
			<view class="content" style="background-color: #fff;">
				<textarea placeholder-style="color:#d3d3d3; fontSize: 14px;" placeholder="请填写意见反馈内容" />
			</view>
		</view>
		<input type="text" placeholder="留下您的联系方式 手机 / QQ邮箱" placeholder-style="color:#d3d3d3; fontSize: 14px;"
			class="input" />
		<span class="bottom-tip">您的联系方式有助于我们沟通解决问题，仅工作人员可见</span>
		<view class="btn" @click="submit">
			提交
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		components: {},
		computed: {},
		data() {
			return {};
		},
		onLoad: function(options) {
			this.getData();
		},
		methods: {
			submit() {
				console.log(1111111);
			},
		}
	}
</script>

<style>
	.feedback {
		background-color: #f7f7f7;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.tip {
		margin-top: 10px;
		margin-left: 12px;
	}

	.content {
		background-color: #fff;
		width: 95%;
		/* height: 200px; */
		border-radius: 10px;
		margin-left: calc(5% / 2);
		margin-top: 5px;
	}

	.input {
		background-color: #fff;
		width: 95%;
		height: 50px;
		border-radius: 5px;
		margin-left: calc(5% / 2);
		margin-top: 20px;
	}

	.bottom-tip {
		color: #d3d3d3;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 10px;
	}

	.btn {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #3ab54a;
		color: #fff;
		border-radius: 22px;
		font-size: 14px;
		margin-top: 80px;
		height: 45px;
		width: 90%;
		margin-left: calc(10% / 2);
	}
</style>