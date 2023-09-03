<template>
  <view class="uni-tab-bar app" :style="{'padding-top': statusBarHeight + 'px'}">
    <view class="header">
      <view class="location">
        <view class="location-icon"></view>
        <view class="title">北京</view>
        <view class="more"></view>
      </view>
      <view class="massage"></view>
    </view>
    <view class="banner">
      <u-swiper
          :list="bannerList"
          keyName="file"
          indicator
          indicatorMode="line"
          circular
      ></u-swiper>
    </view>
    <view class="tip-list">
      <view class="item-tab">
        <span class="tab-1"></span>
        <span>超时秒退</span>
      </view>
      <view class="item-tab">
        <span class="tab-2"></span>
        <span>持证上岗</span>
      </view>
      <view class="item-tab">
        <span class="tab-3"></span>
        <span>爽约包赔</span>
      </view>
      <view class="item-tab">
        <span class="tab-4"></span>
        <span>全场保障</span>
      </view>
    </view>
    <view class="recommend">
      <span class="tjjs">推荐技师</span>
      <view class="more-jishi">
        <span class="more-l">更多</span>
        <span class="more-r"></span>
      </view>

    </view>
    <view class="technician" v-show="technicianList.length > 0">
      <view class="technician-item">
        <view class="jishi"  v-for="(item, index) in technicianList" :key="index">
          <u-avatar :src="item.avatar" shape="square"></u-avatar>
<!--          <img class="avatar" :src="item.avatar" />-->
          <view class="user">
            <span class="username">{{item.name}}</span>
            <span class="order">接单量{{item.orderNum}}</span>
          </view>
        </view>
      </view>
    </view>
    <span class="tjxm">服务项目</span>
    <!-- <view class="cate-grid-list" v-if="good.cid > 0">
      <uni-grid :options="gcategorys[index].sub_categorys" :show-border="false" columnNum="5" @click="tagClick"></uni-grid>
    </view> -->
    <view class="product" v-show="products.length > 0">
      <view v-for="(product, index) in products" :key="product.id" class="item"  @click="goodClick(product.id)">
        <view class="uni-index-list-cell">
          <view class="list">
            <image class="uni-good-list-logo" lazy-load :src="product.img"></image>
            <view class="uni-good-list-body">
              <view class="uni-good-list-text-top">{{ product.name }}</view>
              <view class="time">{{ product.duration }}分钟</view>
              <view class="uni-good-list-text-bottom">
                <view class="bottom">
                  <view class="prices">
                    <span class="price">{{ product.price }}</span>
                    <span class="origin-price">{{ product.originPrice }}</span>
                  </view>
                  <view class="sales">
                    已售 {{ product.sales }}
                  </view>
                </view>
                <!-- <text class="good-price-favour">天猫价￥{{ g.original_price }}</text>
                <text class="good-price-favour">淘宝价￥{{ g.original_price }}</text>
                <text class="good-sell-number">已售{{ g.sales_num }}件</text> -->
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
<!--    <view class="body-bottom">-->
<!--      <span>你的服务 我来保障</span>-->
<!--      <view class="">-->
<!--        <view>-->
<!--          <span></span>-->
<!--        </view>-->
<!--      </view>-->
<!--    </view>-->
    <uni-load-more :status="loadmoreStatue" :contentText="loadingText"></uni-load-more>
  </view>
</template>

<script>
import uniFloatingButton from '@/components/uni-floating-button/uni-floating-button.vue';
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue';
import uniGrid from '@/components/uni-grid/uni-grid.vue';
import {getBanner, getGoods, getRecommendTechnician} from '@/common/api'
import {
  mapGetters
} from 'vuex';
import {
  paseNum
} from '@/common/util';
import uniCard from "@/components/uni-card/uni-card.vue";

export default {
  components: {
    uniCard,
    uniGrid,
    uniLoadMore,
    uniSwiperDot,
    uniFloatingButton
  },

  computed: {},
  onLoad: function (options) {
    this.getBanners();
    this.getGoodsList();
    this.getTechnicians();
  },
  data() {
    return {
      statusBarHeight: getApp().globalData.statusBarHeight,
      pullDownRefresh: true,
      tabs: [],
      showFloatButton: false,
      scrollTop: 0,
      oldScrollTop: 0,
      isClickChange: false,
      scrollLeft: 0,
      tabIndex: 0,
      loadmoreStatue: 'more',
      indicatorDots: true,
      autoplay: true,
      interval: 2000,
      duration: 500,
      loadingText: {
        // contentdown: '下拉加载更多',
        contentrefresh: '正在加载...',
        contentnomore: '没有更多数据了'
      },
      bannerList: [],
      products: [],
      technicianList: [],
    };
  },
  create() {

  },

  methods: {
    async getBanners() {
      let res = await getBanner()
	  console.log(res)
      if (res.code === 2000) {
        this.bannerList = res.data.data
      }
    },
    async getTechnicians() {
      let res = await getRecommendTechnician()
      if (res.code === 2000) {
        this.technicianList = res.data
      }
    },
    // async getGoodsList() {
    //   uni.showLoading({
    //     title: '数据加载中'
    //   });
    //   let res = await getGoods()
    //   if (res.code === 2000) {
    //     this.products = res.data.data
    //     uni.hideLoading();
    //   }
    // },
    async getGoodsList() {
      uni.showLoading({
        title: '数据加载中...'
      });
      let res = await getGoods(() => {
        if (res.code === 2000) {
          console.log(res)
          this.products = res.data.data
          uni.hideLoading();
        }
      })

    },
    goodClick(val){
      uni.navigateTo({
        url: '/pages/good/detail?goodsId=' + val
      })
    },
    async loadMore(cid) {
      let item = this.goods[cid];
      let page = item.page + 1;
      this.loadmoreStatue = 'loading';
      this.$store
          .dispatch('good/GetGoods', {
            cid: cid,
            page: page,
            push: true
          })
          .then(() => {
            this.loadmoreStatue = 'more';
          })
          .catch(() => {
            this.loadmoreStatue = 'noMore';
          });
    },
    // async getData() {
    // 	// uni.showLoading({
    // 	// 	title: '数据加载中...'
    // 	// });
    // 	await this.$store.dispatch('banner/GetBanner');
    // 	await this.$store.dispatch('activity/GetActivity', {});
    // 	await this.$store.dispatch('good/InitGoods', this.tabs);
    // 	await this.$store.dispatch('good/GetGoods', {
    // 		cid: 0,
    // 		page: 1
    // 	});
    // 	this.gotTop();
    // 	// console.log(this.tabs)
    // 	uni.hideLoading();
    // },
    // async tapTab(tab, index) {
    //   if (this.tabIndex === index) {
    //     return false;
    //   } else {
    //     let tabBar = await this.getElSize('tab-bar'),
    //         tabBarScrollLeft = tabBar.scrollLeft; //点击的时候记录并设置scrollLeft
    //     this.scrollLeft = tabBarScrollLeft;
    //     this.isClickChange = true;
    //     this.tabIndex = index;
    //
    //     if (this.goods[tab.id].data.length == 0) {
    //       uni.showLoading({
    //         title: '数据加载中...'
    //       });
    //       await this.$store.dispatch('good/GetGoods', {
    //         cid: tab.id,
    //         page: 1
    //       });
    //       uni.hideLoading();
    //     }
    //     if (this.tabIndex > 0) {
    //       this.subCategorys = this.tabs[this.tabIndex].sub_categorys.map(item => {
    //         return {
    //           id: item.id,
    //           image: item.icon,
    //           text: item.name
    //         };
    //       });
    //     }
    //   }
    // },
    bannerClick(banner) {
      if (banner.url != '') {
        if (banner.url.indexOf('https://') == 0) {
          // #ifdef APP-PLUS
          let link = banner.url;
          link = link.replace('https', 'taobao');

          plus.runtime.openURL(link, function (res) {
            uni.navigateTo({
              url: '/pages/web/index?url=' + escape(banner.url)
            });
          });

          // #endif
          // #ifdef H5
          uni.navigateTo({
            url: '/pages/web/index?url=' + escape(banner.url)
          });
          // #endif
        } else {
          uni.navigateTo({
            url: banner.url
          });
        }
      } else if (banner.activity_type > 0) {
        uni.navigateTo({
          url: '/pages/activity/index?id=' + banner.activity_type
        });
      }
    },
    // scroll(e) {
    //   if (e.detail.scrollTop == 0) {
    //     this.pullDownRefresh = true;
    //     this.disabledPullRefresh(true);
    //   } else {
    //     //保证只设置一次
    //     if (!this.pullDownRefresh) {
    //       this.disabledPullRefresh(false);
    //     }
    //     this.pullDownRefresh = false;
    //   }
    //
    //   this.disabledPullRefresh(e.detail.scrollTop == 0);
    //
    //   if (e.detail.scrollTop > 1000) {
    //     this.showFloatButton = true;
    //   } else {
    //     this.showFloatButton = false;
    //   }
    //   this.oldScrollTop = e.detail.scrollTop;
    // },
    gotTop() {
      this.scrollTop = this.oldScrollTop;
      this.$nextTick(function () {
        this.scrollTop = 0;
      });
    },
  },

  /**
   * 当 searchInput 配置 disabled 为 true 时触发
   */
  onNavigationBarSearchInputClicked(e) {
    console.log('事件执行了');
    uni.navigateTo({
      url: '/pages/search/index'
    });
  },
  /**
   *  点击导航栏 buttons 时触发
   */
  // onNavigationBarButtonTap(e) {
  //   if (e.index == 0) {
  //     this.getData();
  //   } else if (e.index == 1) {
  //     uni.navigateTo({
  //       url: '/pages/center/footprint'
  //     });
  //   }
  // },
  // onTabItemTap(e) {
  //   if (e.index == 0) {
  //     this.getData();
  //   }
  // },
  // onPullDownRefresh() {
  //   console.log(1111)
  // }
};
</script>

<style>
.app {
  /*margin-top: 15px;*/
  height: auto;
  padding-bottom: 60px;
}
.header{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  /*justify-items: center;*/
}
.location{
  display: flex;
  align-items: center;
}
.location-icon{
  background: url("@/pages/home/images/location.png") no-repeat;
  background-size: 100%;
  width: 14px;
  height: 14px;
  margin-right: 2px;
}
.more{
  background: url("@/pages/home/images/down.png") no-repeat;
  background-size: 100%;
  width: 14px;
  height: 8px;
  display: flex;
  align-items: center;
  margin-left: 2px;
}
.massage{
  background: url("@/pages/home/images/tongzhi.png") no-repeat;
  background-size: 100%;
  height: 30px;
  width: 20px;
  margin-top: 13px;
}
.banner {
  margin: 0px 10px 0 10px;
}

.item-tab{
  display: flex;
  align-items: center;
}
.tip-list{
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  color: #007aff;
  font-size: 10px;
  justify-content: space-around;
}
.tab-1{
  background: url("@/pages/home/images/home_tab_1.png") no-repeat;
  background-size: 100%;
  width: 12px;
  height: 12px;
  margin-right: 3px;
  /*padding-right: 5px;*/
}
.tab-2{
  background: url("@/pages/home/images/home_tab_2.png") no-repeat;
  background-size: 100%;
  width: 12px;
  height: 12px;
  margin-right: 3px;
}
.tab-3{
  background: url("@/pages/home/images/home_tab_3.png") no-repeat;
  background-size: 100%;
  width: 12px;
  height: 12px;
  margin-right: 3px;
}
.tab-4{
  background: url("@/pages/home/images/home_tab_4.png") no-repeat;
  background-size: 100%;
  width: 12px;
  height: 12px;
  margin-right: 3px;
}
.recommend{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 15px 10px 0 10px;
}
.tjjs {
  font-size: 15px;
  color: #333;
  display: flex;
  align-items: center;
}
.more-jishi{
  display: flex;
  align-items: center;
}
.more-l{
  font-size: 12px;
  color: #8F8F94;
}
.more-r{
  background: url("@/pages/home/images/more.png") no-repeat;
  background-size: 100%;
  height: 15px;
  width: 15px;
}
.technician{
  margin-top: 10px;
  overflow-x:auto;
  /*background: #8F8F94;*/
}
.technician::-webkit-scrollbar{
  display: none;
}
.technician-item{
  display: flex;
  flex-direction: row;
  /*width: 60px;*/
  /*height: 80px;*/
}
.jishi{
  /*margin-right: 15px;*/
  /*margin-left: 2px;*/
  display: flex;
  flex-direction: column;
  /*justify-items: center;*/
  /*justify-content: space-around;*/
  /*align-items: center;*/
  align-items: center;
}
.user{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
}
.username{
  font-weight: 700;
}
.order{
  font-size: 10px;
  color: #8F8F94;
}
.tjjs::before {
  content: "";
  display: block;
  width: 15px;
  height: 20px;
  background: url("@/pages/home/images/tjjs.png") no-repeat;
  background-size: 100%;
  /*border-radius: 1px;*/
  margin-right: 5px;
  margin-top: 5px;
}
.tjxm{
  font-size: 15px;
  color: #333;
  display: flex;
  align-items: center;
  margin-top: 10px;
  margin-left: 10px;
}
.tjxm::before {
  content: "";
  display: block;
  width: 15px;
  height: 20px;
  background: url("@/pages/home/images/tjtc.png") no-repeat;
  background-size: 100%;
  /*border-radius: 1px;*/
  margin-right: 5px;
  margin-top: 5px;
}
.uni-index-list-cell {
  width: auto !important;
  margin: 7px 10px !important;
}

.uni-good-list-logo {
  width: 80px;
  height: 80px;
  align-items: center;
  border-radius: 5px;
  margin: 10px;
}

.list {
  display: flex;
}

.time {
  font-size: 12px;
  margin-bottom: 10px;
}

.bottom {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.uni-good-list-text-top {
  font-size: 15px;
  line-height: 21px;
  color: #333;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  margin-top: 15px !important;
}

.price {
  font-size: 17px;
  color: #f55;
}

.price::before {
  content: "¥";
  color: #f55;
  font-size: 12px
}

.origin-price {
  font-size: 12px;
  margin-left: 5px;
  text-decoration: line-through;
  text-decoration-line: line-through;
  text-decoration-thickness: initial;
  text-decoration-style: initial;
  text-decoration-color: initial;
}

.origin-price::before {
  content: "¥";
}

.sales {
  font-size: 11px;
  color: #999;
  margin-right: 10px;
}

.noData {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 150px;
  color: #8F8F94;
}
</style>
