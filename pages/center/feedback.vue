<template>
	<view class="feedback">
		<span class="tip">Xin chào, bạn có thể gửi phản hồi cho chúng tôi về trải nghiệm và đề xuất sản phẩm của bạn.</span>
		<view class="area">
			<view class="content" style="background-color: #fff;">
        <u--textarea v-model="content" placeholder="Ý kiến ​​hoặc đề xuất" count height="140" maxlength="500" ></u--textarea>
			</view>
		</view>
<!--		<input type="text" placeholder="留下您的联系方式 手机 / QQ邮箱" placeholder-style="color:#d3d3d3; fontSize: 14px;"-->
<!--			class="input" />-->
    <view style="background: #fff;margin-top: 20px;width: 95%; margin-left: calc(5% / 2)">
      <u--input
          placeholder="Vui lòng nhập thông tin liên hệ"
          border="surround"
          clearable
      ></u--input>
    </view>
		<span class="bottom-tip">Thông tin liên hệ của bạn giúp chúng tôi liên lạc và giải quyết các vấn đề và chỉ nhân viên mới nhìn thấy được</span>
		<view class="btn" @click="submit">
      nộp
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		computed: {},
		data() {
			return {
        content: ''
      };
		},
		onLoad: function(options) {
			// this.getData();
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
		margin-left: 10px;
    color: #8F8F94;
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
		color: #8F8F94;
		/*display: flex;*/
		/*align-items: center;*/
		/*justify-content: center;*/
		margin-top: 10px;
    font-size: 12px;
    width: 95%;
    margin-left: calc(5% / 2);
	}

	.btn {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: #f4be55;
		color: #fff;
		border-radius: 22px;
		font-size: 16px;
    font-weight: 600;
		margin-top: 80px;
		height: 45px;
		width: 90%;
		margin-left: calc(10% / 2);
	}
</style>
