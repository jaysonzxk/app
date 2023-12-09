<template>
	<view class="content">
		<view class="pay">
			<!-- <span class="title">支付确认</span> -->
			<u-modal :show="data.payShow" :confirmText="confirmText" :title="title" :closeOnClickOverlay="true"
				:showCancelButton="true" confirmColor="#410704" @cancel="close" @confirm="submit">
				<view class="qrcode">
					<img :src="host+qrCode" alt="" class="qrcode-img" />
					<div class="code">
						<!-- <span ref="">{{ data.payCode }}</span> -->
						<span class="copy" @click="copyText">复制链接</span>
						<span class="save" @click="saveImg(host+qrCode)">保存二维码</span>
					</div>
					<div class="upload">
						<span style="margin-right: 10px;font-size: 12px;font-weight: 500;">请上传支付截图</span>
						<u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic" name="5" :multiple="false"
							:maxCount="1" width="140" height="140" :previewFullImage="false" accept="file"></u-upload>
					</div>

				</view>
			</u-modal>
		</view>
	</view>
</template>

<script>
	import config from '@/common/config.js';
	import { uploadImages, buyVip } from '@/common/api.js';
	export default {
		name: "pay",
		data() {
			return {
				payShow: false,
				title: '支付确认',
				host: uni.getSystemInfoSync().platform === 'ios' ? config.h5Serveer + '/' : config.server + '/',
				confirmText: '确认付款',
				fileList: [],
				payUri:''
			};
		},
		computed: {
			qrCode() {
				return this.$props.data.qrCode;
			}
		},
		props: ['data'],
		methods: {
			saveImg(url) {
				uni.downloadFile({
					url: url,
					success: res => {
						if (res.statusCode == 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									uni.showToast({
										title: '保存成功',
										icon: 'success'
									})
								},
								fail: function() {
									uni.showToast({
										title: '保存失败',
										icon: 'error'
									})
								}
							})
						}

					}
				})
			},
			async afterRead(event) {
				const imgBolb = await fetch(event.file.url).then(r => r.blob());
				let lists = [].concat(event.file);
				let fileListLen = this.fileList.length;
				lists.map((item) => {
					this.fileList.push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					let file = new File([imgBolb], event.file.name,{type: 'image/png', path: event.file.url});
					let result = await this.uploadFilePromise(file);
					this.payUri = JSON.parse(result).data.image;
					let item = this.fileList[fileListLen]
					this.fileList.splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '上传成功',
						url: JSON.parse(result).data.image
					}))
					fileListLen++
				}
			},
			deletePic(event) {
				this.fileList.splice(event.index, 1);
			},
			// 上传
			uploadFilePromise(file) {
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: this.host + 'api/app/upload', 
						file,
						name: 'file',
						// name: file.name,
						success: (res) => {
							setTimeout(() => {
								resolve(res.data)
							}, 500)
						}
					});
				})
			},
			copyText() {
				uni.setClipboardData({
					data: this.$props.data.payCode,
					success: () => {
						uni.showToast({
							title: `复制成功`,
						})
					}
				})
			},
			close() {
				this.$props.data.payShow = false;
			},
			async submit() {
				const formData = {
					vipCard: this.$props.data.vip,
					amount: this.$props.data.amount,
					payChannelId: this.$props.data.payChannel,
					payUri: this.payUri,
					user: uni.getStorageSync('userInfo').id
				}
				if (this.fileList && this.fileList.length == 0) {
					uni.showToast({
						title: `请上传支付截图`,
						icon: 'none',
						duration: 2000
					})
				}else{
					let res = await buyVip(formData);
					if (res.code === 200){
						this.$props.data.payShow = false;
						uni.showToast({
							title:res.msg,
							icon:'none',
							duration:2000
						})
					}
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		/deep/.u-popup__content {
			background: linear-gradient(to bottom, #fdf0e7, #fffdfc) !important;
		}

		width: 90%;
		height: 300px;

		.pay {
			display: flex;
			flex-direction: column;

			.title {
				color: #333333;
				font-size: 16px
			}

			.qrcode {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;

				.upload {
					display: flex;
					margin-top: 10px;
				}

				.qrcode-img {
					width: 200px;
					/* 指定图片的宽度 */
					height: 200px;
					/* 指定图片的高度 */
					object-fit: cover;
					/* 截取图片的指定大小 */
				}

				.code {
					display: flex;
					align-items: center;
					width: 200px;
					margin-top: 10px;
					justify-content: space-between;

					.copy {
						background: #f4b592;
						color: #333333;
						font-size: 12px;
						border-radius: 5px;
						// margin-left: 10px;
						padding: 6px 10px;
						font-weight: 500;
					}

					.save {
						background: #f4b592;
						color: #333333;
						font-size: 12px;
						border-radius: 5px;
						padding: 6px 10px;
						font-weight: 500;
					}
				}
			}
		}
	}
</style>