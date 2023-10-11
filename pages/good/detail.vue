<template>
	<view class="detail">

		<span>2222</span>
	</view>
</template>

<script>
import {getGoodsInfo} from '@/common/api.js'
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
		};
	},
	methods: {}
		
		
};
</script>

<style scoped lang="scss">


</style>
