<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease" v-show="food.count>0" v-on:click.stop.prevent="decreaseCart">
				<span v-show="food.count>0" class="inner icon-remove_circle_outline"></span>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" v-on:click.stop.prevent="addCart"></div>
	</div>
</template>

<script type="text/ecmascript-6">
	import Vue from 'vue';
	export default{
		props:{
			food:{
				type: Object
			}
		},
		methods:{
			addCart(event){			
				if(!event._constructed){
					return;
				}
				if(!this.food.count){
					Vue.set(this.food,"count",1)
				}else{
					this.food.count++;
				}
				this.$emit("cart-add",event.target);
				
			},
			decreaseCart(event){
				if(!event._constructed){
					return;
				}
				if(this.food.count){
					this.food.count--;
				}
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>

<style type="text/css">
	.cartcontrol {
		font-size: 0;
	}
	.cartcontrol .cart-decrease{
		display: inline-block;
		padding: 6px;
	}
	.cartcontrol .cart-decrease .inner{
		display: inline-block;
		line-height: 24px;
		font-size: 24px;
		color: rgb(0,160,220);
	}
	.cartcontrol .cart-count{
		display: inline-block;
		vertical-align: top;
		width: 12px;
		padding-top: 6px;
		line-height: 24px;
		text-align: center;
		font-size: 12px;
		color: rgb(147,153,159);
	}
	 .cartcontrol .cart-add{
		display: inline-block;
		line-height: 24px;
		font-size: 24px;
		padding: 6px;
		color: rgb(0,160,220);
	}
	.move-enter-active, .move-leave-active{
		transition: all 0.4s linear;
	}
	.move-enter, .move-leave-to{
		opacity: 0;
		transform: translate3D(24px,0,0);
	}
	.move-enter-active .inner, .move-leave-active .inner{
		transition: all 0.4s linear;
	}
	.move-enter .inner, .move-leave-to .inner{
		transform: rotate(180deg);
	}

</style>