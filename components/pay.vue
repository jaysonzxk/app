<template>
	<view class="content">
		<view class="pay">
			<!-- <span class="title">支付确认</span> -->
			<u-modal :show="data.show" :confirmText="confirmText" :title="title" :closeOnClickOverlay="true" :showCancelButton="true" confirmColor="#410704">
				<view class="qrcode">
					<img :src="host+qrCode" alt="" class="qrcode-img" />
					<div class="code">
						<span ref="">{{ data.payCode }}</span>
						<span class="copy" @click="copyText">复制</span>
					</div>
					<div class="upload">
						<span style="margin-right: 10px;">请上传支付截图</span>
						<u-upload
							:fileList="fileList"
							@afterRead="afterRead"
							@delete="deletePic"
							name="5"
							multiple
							:maxCount="1"
							width="140"
							height="140"
						></u-upload>
					</div>
					
				</view>
			</u-modal>
		</view>
	</view>
</template>

<script>
	import config from '@/common/config.js'
	export default {
		name:"pay",
		data() {
			return {
				show:false,
				title:'支付确认',
				host: config.server + '/',
				confirmText: '确认付款',
				fileList: [],
				// qrCode: undefined
			};
		},
		computed: {
			qrCode(){
				console.log(this.$props.data)
				return this.$props.data.qrCode;
			}
		},
		props: ['data'],
		methods: {
			copyText(){
				uni.setClipboardData({
					data: this.$props.data.qrCode,
					success: () => {
						uni.showToast({
							title: `复制成功`,
						})
					}
				})
			}
		}
	}
</script>

<style  lang="scss" scoped>
.content{
	/deep/.u-popup__content{
		background: linear-gradient(to bottom, #fdf0e7, #fffdfc) !important;
	}
	width: 90%;
	height: 300px;
	
	.pay{
		display: flex;
		flex-direction: column;
		.title{
			color: #333333;
			font-size: 16px
		}
		.qrcode{
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.upload{
				display: flex;
				margin-top: 10px;
			}
			.qrcode-img{
				width: 200px; /* 指定图片的宽度 */
				height: 200px; /* 指定图片的高度 */
				object-fit: cover; /* 截取图片的指定大小 */
			}
			.code{
				display: flex;
				align-items: center;
				margin-top: 10px;
				.copy{
					background: #f4b592;
					color: #333333;
					font-size: 12px;
					border-radius: 5px;
					margin-left: 10px;
					padding: 0 5px;
				}
			}
		}
	}
}	
</style>