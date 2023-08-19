<template>
	<view class="detail">

		<span>2222</span>
	</view>
</template>

<script>
import uniFloatingButton from "@/components/uni-floating-button/uni-floating-button.vue"
import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'
import uniPopup from "@/components/uni-popup/uni-popup.vue"
import {format} from "@/common/util"
export default {
	components: {
		uniSwiperDot,
		uniFloatingButton,
		uniPopup
	},
	computed: {

	},
	onLoad: function(options) {
		this.goodId = options.id;
		this.nummId = options.nummId;

		// console.log(this.good)
		// this.getData();
	},

	data() {
		return {
			popupTitle:'复制淘口令购买',
			popopContent:'复制框内整段文字，打开【手淘APP】即可领券购买。',
			tpwd:'',
			popupPwd:false,
			showFloatButton:false,
			scrollTop:0,
			oldScrollTop:0,
			goodId: 0,
			nummId: 0,
			indicatorDots: false,
			autoplay: false,
			interval: 2000,
			duration: 500,
			webviewStyles: {
                progress: {
                    color: '#FF3333'
                }
            }
		};
	},
	methods: {
		async getData() {
			uni.showLoading({
				title: '数据加载中...'
			});
			let params = {
				id: this.goodId,
				numm_id: this.nummId
			};
			await this.$store.dispatch('good/GetGoodDetail', params);

			uni.hideLoading();
		},
		scroll(e){

			if(e.detail.scrollTop > 1000){
				this.showFloatButton = true;
			}else{
				this.showFloatButton = false;
			}
			this.oldScrollTop = e.detail.scrollTop;
		},
		gotTop(){
			this.scrollTop = this.oldScrollTop;
			this.$nextTick(function() {
		        this.scrollTop = 0
		    });
			// this.scrollTop = 0;
		},
		onClickBuy(){
			console.log(this.good)
			// #ifdef APP-PLUS
			let link = this.good.coupon_click_url;
			link = link.replace('https','taobao');
			const _this = this
			plus.runtime.openURL(link,function(res){
				uni.navigateTo({
					url:'/pages/web/index?url='+ escape(_this.good.coupon_click_url)
				})
			});

			// #endif
			// #ifdef H5
				uni.navigateTo({
					url:'/pages/web/index?url='+ escape(this.good.coupon_click_url)
				})
			// #endif

		},
		hideTpwd(){
			this.popupPwd = false;
		},
		showTpwd(type){
			if(type == 0){
				this.popupTitle = "复制淘口令购买";
				this.popopContent = format('复制框内整段文字，打开【手淘APP】即可领券购买。{0}',this.good.tpwd);

			}else{
				this.popupTitle = "复制淘口令分享";
				this.popopContent = format("{0}\n【原价】: {1}元\n【优惠券】: {2}元\n【券后价】: {3}元\n【淘口令下单】: 复制这条信息，打开→手机淘宝领取优惠券{4} \n推荐理由:{5}",this.good.dtitle,this.good.original_price,this.good.coupon_price,this.good.actual_price,this.good.tpwd,this.good.desc);
			}
			this.popupPwd = true;
		},
		clipboard(){
			// #ifdef APP-PLUS||MP
			uni.setClipboardData({
				data:this.popopContent,
				success:function(){
					uni.showToast({
						title:'复制成功',
						duration:1000,
					})
				}
			})
			// #endif

		}
	},
	onNavigationBarButtonTap() {
		this.showTpwd(1);
	}
};
</script>

<style>
.detail{
	width: 100%;
	height: 100%;
}
.detail-swiper {
	height: 750upx;
}
.detail-swiper-item {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	background: #eee;
	color: #fff;
}

.detail-swiper-item image {
	width: 100%;
	height: 100%;
}
.detail-good-info{
	height: 560upx;
	background: #FFFFFF;
}

.detail-good-detail-info{
	margin-top: 20upx;
	margin-bottom: 100upx;
	/* height: 280upx; */
	background: #FFFFFF;
}
.detail-good-detail-info-title{
	text-align: center;
	color: #999999;
}
.detail-good-images{
	width: 100%;
	display: flex;
	flex-direction: column;
}
.detail-good-images image{
	width: 100%;
}

.detail-info{
	/* background: #ffffff; */
	height: calc(100% - 90upx);
}
.detail-good-title{
	padding: 20upx 40upx 20upx 40upx;
}
.detail-good-price{
	font-size: 28upx;
	padding: 0upx 40upx 0upx 40upx;
	display: flex;
	justify-content: space-between;
}
.detail-good-org-price{
	color: #999999;
	font-size: 20upx;
	padding: 0upx 40upx 0upx 40upx;
	display: flex;
	justify-content: space-between;
}
.detail-good-price-size{
	margin-left: 20upx;
}
.detail-good-quan{
	display: flex;
	height: 172upx;
	background: url(../../static/goods_quan.png) no-repeat;
	background-size: 100% 100%;
}
.detail-good-quan-left{
	color: #FFFFFF;
	text-align: center;
	justify-content: center;
	display: flex;
	flex-direction: column;
	width: 60%;
	height: 100%;
	border-right:2px dashed #FFFFFF;

}
.detail-good-quan-time{
	color: #F1F1F1;
	font-size: 18upx;
}
.detail-good-quan-right{
	width: 40%;
	height: 100%;
	color: #FFFFFF;
	text-align: center;
	justify-content: center;
	display: flex;
	flex-direction: column;
}
.detail-good-introduce{
	padding: 0upx 40upx 0upx 40upx;
	font-size: 12px;
	color: #999999;
	word-break: break-all;
	display: -webkit-box;
	overflow: hidden;
	line-height:1.5;
	text-overflow: ellipsis;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
}
.detail-shop-type{
	border: 1px solid #FF3333;
	padding:0 4px 0 4px;
	font-size: 10upx;
	color: #FF3333;
}
.detail-good-title-text{
	margin-left: 20upx;
}
.detail-foot-bar{
	position: fixed;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 10;
	bottom: 0upx;
	box-shadow:0px -2px 2px #CCCCCC;
	height: 100upx;
	width:100%;
	background: #FFFFFF;
}


.detail-tab-bar{
	padding: 0 10upx 0 10upx;

	height: 80upx;
	width: 100%;
	display: flex;
	justify-content: center;

}

.detail-tab-bar-tpwd{
	align-items: center;
	color: #FF3333;
	border: 1px solid #FF3333;
	border-right: none;
	border-radius:2px;
	border-top-right-radius: 0px;
	border-bottom-right-radius: 0px;
	width: 50%;
	display: flex;
	justify-content: center;

}
.detail-tab-bar-coupon{
	align-items: center;
	color: #FFFFFF;
	width: 50%;
	display: flex;
	justify-content: center;
	background: linear-gradient(to left,#FA4DBF 0,#FBAA59 100%);
}
.popup-center-box{
	width: 580upx;
	height: 480upx;
	display: flex;
	flex-direction: column;
}
.popup-center-title{
	text-align: center;
	font-size: 16px;
	color:#666666 ;
	line-height: 40upx;
	margin-bottom: 40upx;
}
.popup-center-txt{
	width: 540upx;
	height: 200upx;
	font-size: 12px;
	background: #F1F1F1;
	color: #333333;
	padding: 20upx;
	border-radius:6px;
	flex: 1;
}
.popup-center-txt-scroll{
	height: 100%;
}
.popup-center-button{
	margin-top: 40upx;
	display: flex;
	justify-content: center;
	line-height: 70upx;
}
.copy-button{
	color: #FFFFFF;
	text-align: center;
	width: 280upx;
	border-radius:6px;
	background: linear-gradient(to left,#FA4DBF 0,#FBAA59 100%);
}

</style>
