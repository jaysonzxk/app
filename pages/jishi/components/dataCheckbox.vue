<template>
  <view>
    <!--    <uni-data-checkbox selectedColor="black" icon="right" mode="list" v-model="value" :localdata="range"-->
    <!--                       @change="change" v-if="indexType"></uni-data-checkbox>-->
    <view v-if="indexType === 0">
      <uni-data-checkbox selectedColor="black" icon="right" v-model="value" :localdata="range"
                         @change="change"></uni-data-checkbox>
    </view>
    <view v-if="indexType === 1">
      <uni-data-checkbox selectedColor="black" icon="right" v-model="value" :localdata="range1"
                         @change="change"></uni-data-checkbox>
    </view>
    <view v-if="indexType === 2">
      <view class="title">
        <view>今天</view>
        <view>明天</view>
        <view>后天</view>
      </view>
      <uni-data-checkbox selectedColor="black" icon="right" mode="tag" v-model="value" :localdata="range2"
                         @change="change"></uni-data-checkbox>
    </view>
  </view>

</template>

<script>
import {uniDataCheckbox} from "@dcloudio/uni-ui"

export default {
  props: ['indexType'],
  name: "dataCheckbox",
  components: {
    uniDataCheckbox,
  },
  computed: {

  },
  data() {
    return {
      // indexType: this.indexType,
      value: 0,
      range: [
        {value: 0, text: "全城"},
        {value: 1, text: "1km"},
        {value: 3, text: "3km"},
        {value: 4, text: "5km"},
        {value: 5, text: "10km"},
      ],
      range1: [
        {value: 0, text: "智能排序"},
        {value: 1, text: "距离优先"},
        {value: 2, text: "评价最高"},
        {value: 3, text: "接单最多"},
        {value: 4, text: "星级排序"},
      ],
      range2: [
        {value: 1, text: "00:00"},
        {value: 2, text: "00:30"},
        {value: 3, text: "01:00"},
        {value:4, text: "01:30"},
        {value: 5, text: "02:00"},
        {value: 6, text: "02:30"},
      ],
    }
  },
  methods: {}

}
</script>

<style scoped>
.title{
  display: flex;
  justify-content: space-around;
  font-size: 10px;
}
/deep/ .checklist-content {
  /*margin-left: 18px !important;*/
}
/deep/ .radio__inner{
  position: absolute !important;
  right: 0 !important;
}
/deep/ .checkobx__list {
  border-color: rgb(247, 199, 68) !important;
}
/deep/ .checklist-text{
  margin-left: 17px !important;
}
/deep/ .radio__inner-icon{
  border-color: rgb(247, 199, 68) !important;
  background-color: rgb(247, 199, 68) !important;
}
/deep/ .checklist-group{
  /*margin-left: 14px !important;*/
  flex-direction: column !important;
}
/deep/ .checklist-box{
  padding: 5px 5px !important;
}
/deep/ .checklist-box.is--tag.is-checked{
  background-color: rgb(247, 199, 68) !important;
  border-color: rgb(247, 199, 68) !important;
}
</style>
