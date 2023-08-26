<template>
	<view class="vip" :style="{'padding-top': statusBarHeight + 'px'}">
    <view class="header">
      <u-navbar
          title="会员中心"
          @rightClick="rightClick"
          :autoBack="true"
          rightText="充值说明"
          :bgColor="bgColor"
          :leftIconColor="leftIconColor"
      >
      </u-navbar>
      <view class="no-vip"></view>
    </view>
<!--    <view class="vip-bg">-->
<!--      -->
<!--    </view>-->

	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue';
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {
        statusBarHeight: getApp().globalData.statusBarHeight,
        bgColor: '#444',
        leftIconColor: '#fff',
			};
		},
		onLoad() {
      // this.getUserInfo()
      console.log(this.statusBarHeight)
		},
    create(){
      this.getUserInfo()
    },
    computed: {
    },
		methods: {
      rightClick(){}
		},

	};
</script>

<style scoped lang="scss">
.vip{
  //margin-top: 30px;
  .header{
    //display: flex;
    //justify-content: space-between;
    background: #444;
    background-size: 100%;
    width: 100%;
    height: 100px;
    margin-top: 44px;
    /deep/.u-navbar__content__right__text{
      font-size: 12px;
      color: #8F8F94;
    }
    /deep/.u-navbar__content__title{
      color: #ffff;
    }
    .no-vip{
      background: url("@/pages/center/images/vip_no_card_bg.png") no-repeat;
      background-size: 100%;
      width: 90%;
      height: 130px;
      margin-top: 20px;
      margin-left: calc(10% / 2);
    }
  }
  .vip-bg{
    //height: 200px;

  }

}
</style>
