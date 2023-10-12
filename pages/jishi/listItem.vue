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
		<u-loadmore style="margin: 20px;"></u-loadmore>
	</scroll-view>
</template>

<script>
</script>

<style>
</style>