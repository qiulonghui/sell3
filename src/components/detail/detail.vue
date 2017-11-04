<template>
	<div v-show="detail.detailShow" class="detail">
		我是detail
	</div>
</template>

<script type="text/ecmascript-6">
	export default{
		props:{
			detail:{
				type:Object
			}
		}
	};
</script>

<style>
</style>