<template>
	<scroll-view scroll-y="true" class="scroll-Y"
	:style="{backgroundColor: bgc}"
	refresher-enabled
	:refresher-triggered="refreshListFlag"
	refresherrefresh="refreshList"
	refresherrestore="onRestore"
	scrolltolower="scrolltolower"
	>
		<slot name="list" :list="list"></slot>
		<u-loadmore style="margin: 20px;" :status="lowerStatus" v-if="list.length > 0" />
	</scroll-view>
</template>

<script>
	import {mapGetters} from 'vuex';
	
	export default {
		name: "cusScrollViewList",
		props: {
			requestFun: {
				type: Function,
			},
			otherParams: {
				type: Object,
				default: () => {}
			},
			bgc: {
				type: String,
				default: '#eee'
			}
		},
		computed: {
			lowerStatus() {
				return this
			}
		},
		data() {
			return {
				pageSize: {
					
				}
			}
		}
	}
</script>

<style>
</style>