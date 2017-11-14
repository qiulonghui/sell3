<template>
	<div class="goods">
		<div class="menu-wrapper">
			
		</div>
		<div class="foods-wrapper"></div>
	</div>
</template>

<script type="text/ecmascript-6">
	export default{
		props:{
			seller:{
				type:Object
			}
		},
		created:function(){
			
		}
	};
</script>

<style type="text/css">
.goods{
	display: flex;
	position:absolute;
	top: 174px;
	bottom: 46px;
	width: 100%;
	overflow: hidden;
}
.goods .menu-wrapper{
	width: 80px;
	background: #f3f5f7;
}
.goods .foods-wrapper{
	flex: 1;
}
</style>