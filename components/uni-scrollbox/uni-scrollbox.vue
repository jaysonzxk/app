<template>
  <!-- 滚动组件外层的框-->
  <view class="">
    <!-- 滚动区域 -->
    <scroll-view class="scroll-component" :scroll-top="scrollTop" scroll-y="true"
                 :style="{
					height: `calc(100vh - ${statusBarHeight}px - ${navbarHeight}px - ${otherHeight}rpx - env(safe-area-inset-bottom) )`,
				}"
                 :lower-threshold="150"
                 :refresher-triggered="triggered"
                 :refresher-enabled="true"
                 refresher-default-style="none"
                 :refresher-threshold="20"
                 @refresherpulling="onPulling"
                 @scrolltoupper="upper" @scrolltolower="lower"
                 @scroll="scroll"
                 @refresherrefresh="refresh"
                 @refresherrestore="restore">
      <!-- 下拉刷新提示 -->
      <u-loadmore status="loading" bgColor="#fff" v-if="triggered" :icon-color="activeColor" :color="activeColor"
                  :load-text="refreshText" margin-top="30" margin-bottom="30"/>
      <slot name="contBox"></slot>
      <!-- 暂无数据 -->
      <view class="no-data-box" v-if="_type&&list.length==0">
        <image src="../static/imgs/nodata.png" v-if="_type=='nodata'" mode="aspectFit"></image>
        <image src="../static/imgs/nofile.png" v-if="_type=='nofile'" mode="aspectFit"></image>
        <image src="../static/imgs/nomsg.png" v-if="_type=='nomsg'" mode="aspectFit"></image>
        <image src="../static/imgs/nospace.png" v-if="_type=='nospace'" mode="aspectFit"></image>
        <image src="../static/imgs/nofile.png" v-if="_type=='nofile'" mode="aspectFit"></image>
      </view>
      <!-- 上拉加载 -->
      <u-loadmore :status="status" :load-text="loadText" margin-top="30" margin-bottom="30"/>
    </scroll-view>
    <!-- 回到顶部 -->
    <view @tap="goTop" class="go-top" v-if="old.scrollTop>500">
      <u-icon name="arrow-upward" color="#909399" size="56"></u-icon>
    </view>
  </view>
</template>
<script>
import {mapGetters} from 'vuex';

export default {
  props: {
    // 这个数组结合暂无数据的类型主要是控制暂无数据模块的展示与隐藏
    list: {
      default: [],
      type: Array
    },
    //暂无数据的类型
    _type: {
      default: '',
      type: String
    },
    //控制上拉加载时提示 loadmore代表还可以继续上拉加载 nomore没有更多数据 loading 加载中
    status: {
      default: 'loadmore',
      type: String
    },
    //结合这个控制下拉刷新时加载圈的显示隐藏
    isRefresh: {
      default: false,
      type: Boolean
    },
    //除了标题栏和状态栏以外的高度
    otherHeight: {
      default: 0,
      type: Number
    },
    //下拉加载时加载圈的背景色
    bgColor: {
      default: '',
      type: String
    },
    //加载中，上拉加载时，暂无更多数据时所提示的文案
    loadText: {
      default: {
        loadmore: '轻轻上拉获取更多数据',
        loading: '努力加载中...',
        nomore: '暂无更多数据'
      },
      type: Object
    }
  },
  computed: {
    triggered() {
      return this.isRefresh;
    },
    ...mapGetters(['activeColor', 'statusBarHeight', 'navbarHeight', 'skeletonColor'])
  },
  data() {
    return {
      old: {
        scrollTop: 0
      },
      scrollTop: 0,
      refreshText: {
        loading: '正在获取最新数据...'
      } //刷新文案
    };
  },
  methods: {
    onPulling() {
      // 下拉
      this.$emit('refreshFun');
      // this.triggered = true; //下拉加载，先让其变true再变false才能关闭
    },
    // 自定义下拉刷新控件被下拉
    refresh(e) {
    },
    // 刷新重置
    restore() {
      // this.triggered = 'restore'; // 需要重置
    },
    // 刷新终止
    onAbort() {
      // console.log("onAbort");
    },
    upper: function (e) {
      console.log(e);
    },
    // 上拉加载
    lower: function (e) {
      // console.log('上拉加载')
      this.$emit('lowerFun');
      // console.log(e)
      // this.status='loading'
    },
    scroll: function (e) {
      this.old.scrollTop = e.detail.scrollTop;
    },
    goTop: function (e) {
      this.scrollTop = this.old.scrollTop;
      this.$nextTick(() => {
        this.scrollTop = 0;
      });
    }
  }
};
</script>
<style>
.scroll-component {
  width: 750rpx;
  overflow-y: scroll;
}

/deep/ .u-loading-circle {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80rpx;
  width: 750rpx;
}

.go-top {
  position: fixed;
  bottom: 208rpx;
  right: 0;
  z-index: 2;
  background-color: red;
  width: 100rpx;
  height: 100rpx;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #606266;
  border-radius: 50%;
}

.no-data-box {
  width: 750rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20%;
  margin-bottom: 10%;}

image {
  max-width: 600rpx;
}
</style>
