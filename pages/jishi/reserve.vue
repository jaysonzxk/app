<template>
  <view class="reserve-order" :style="{'padding-top': statusBarHeight + 'px'}">
    <view class="header">
      <view style="display: flex; flex-direction: row; align-items: center; flex: 1;justify-content: space-between">
        <view class="header-l" @click="goBack"></view>
        <view class="title">预约下单</view>
        <view class="notice">说明</view>
      </view>

    </view>
  </view>
</template>

<script>

export default {
  components: {
  },
  computed: {},
  onLoad: function (options) {

  },
  data() {
    return {
      statusBarHeight: getApp().globalData.statusBarHeight,
    }
  },
  methods: {
    goBack(){
      uni.navigateBack({
        delta: 1
      })
    }
  },

};
</script>

<style>
.reserve-order{
  background: #fff;
}
.header{
  /*display: flex;*/
  /*flex-direction: column;*/
  background: linear-gradient(to bottom, #edd089, #fff);
  height: 200px;
  padding-top: 10px;
  /*align-items: center;*/
  /*justify-content: space-between;*/
}

.header-l{
  background: url("@/pages/jishi/image/back.png") no-repeat;
  background-size: 60%;
  width: 15px;
  height: 15px;
  margin-left: 10px;
  /*position: absolute;*/
  /*left: 5px;*/
  /*margin-left: 10px;*/
}
.title{
  font-size: 15px;
  font-weight: 600;
  /*margin-left: calc((100% - 80px) / 2);*/
}
.notice{
  font-size: 13px;
  /*position: absolute;*/
  /*right: 5px;*/
  margin-right: 10px;
  color: #969696;
}


</style>
