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
    <view class="body">
      <u-notice-bar :text="text" speed="50"></u-notice-bar>

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
      text: '平台技师已经已持有从业资格证，健康证；请广大用户放心预约下单～'
    }
  },
  methods: {
    rightClick() {
    },
    async getMaster(){
      const query = this.$route.query
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
  .body{
    //margin-top: 44px;
    //display: flex;
    //flex-direction: column;
    //align-items: center;
    .u-notice-bar{
      padding: 0;
    }
  }
}



</style>
