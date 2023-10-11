<template>
  <view class="reserve-order" :style="{'padding-top': statusBarHeight + 'px'}">
    <view class="header">
      <u-navbar
          title="预约下单"
          @rightClick="rightClick"
          :autoBack="true"
          :placeholder="true"
      >
      </u-navbar>
    </view>
	<view class="">
		<u-notice-bar :text="text" speed="50"></u-notice-bar>
	</view>
    <view class="body">
		
    </view>
  </view>
</template>

<script>
import {getInfo} from "@/common/api";

export default {
  components: {
  },
  computed: {},
  onLoad: function (options) {
    this.getMaster();
  },
  data() {
    return {
      statusBarHeight: getApp().globalData.statusBarHeight,
      masterImg: undefined,
      text: 'Kỹ thuật viên nền tảng có chứng chỉ chuyên môn và chứng chỉ sức khỏe; vui lòng đặt lịch hẹn và đặt hàng~'
    }
  },
  methods: {
    rightClick() {
    },
    async getMaster(){
      const query = this.$route.query;
	  console.log(query);
      let res = await getInfo(query);
      if (res.code === 2000) {
        this.masterImg = res.data.avatar
      }
    }
    // goBack(){
    //   uni.navigateBack({
    //     delta: 1
    //   })
    // }
  },

};
</script>

<style scoped lang="scss">
.reserve-order{
  //background: #8F8F94 !important;
  height: 500px;
  /deep/.u-notice-bar{
	  padding: 0 0;
	  margin: 0 3px;
  }
  .body{
    // background: #fff;
	height: 100px;
    .u-notice-bar{
      padding: 0;
    }
  }
}



</style>
