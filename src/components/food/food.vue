<template>
	<transition name="move">
		<div v-show="showFlag" class="food" ref="food">
			<div class="food-content">
				<div class="image-header">
					<img v-bind:src="food.image"/>
					<div class="back" v-on:click="hide"><i class="icon-arrow_lift"></i></div>
				</div>
				<div class="f-content">
					<h1 class="f-title">{{food.name}}</h1>
					<div class="f-detail">
						<span class="f-sell-count">月售{{food.sellCount}}份</span>
						<span class="f-rating">好评率{{food.rating}}%</span>
					</div>
					<div class="f-price">
						<span class="f-now">￥{{food.price}}</span><span class="f-old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
					</div>
					<div class="cartcontrol-wrap">
						<cartcontrol v-bind:food="food" v-on:cart-add="cartAdd"></cartcontrol>
					</div>
					<div v-on:click="addFirst" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
				</div>		
				<split v-show="food.info"></split>
				<div class="info" v-show="food.info">
					<h1 class="title">商品信息</h1>
					<p class="f-text">{{food.info}}</p>
				</div>
				<split></split>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<ratingselect v-on:select="selectRating" 
						v-on:toggle="toggleContent" 
						v-bind:select-type="selectType" 
						v-bind:only-content="onlyContent" 
						v-bind:desc="desc" 
						v-bind:ratings="food.ratings"
						></ratingselect>
					<div class="rating-wrapper">
						<ul v-show="food.ratings && food.ratings.length">
							<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item border-1px">
								<div class="user">
									<span class="name">{{rating.username}}</span>
									<img class="avatar" width="12" height="12" v-bind:src="rating.avatar"/>
								</div>
								<div class="time">{{rating.rateTime | formatDate}}</div>
								<p class="text">
									<span v-bind:class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
									{{rating.text}}
								</p>
							</li>
						</ul>
						<div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	import Vue from 'vue';
	import {formatDate} from '../../common/js/date';
	import cartcontrol from '../cartcontrol/cartcontrol';	
	import ratingselect from '../ratingselect/ratingselect';
	import split from '../split/split';
	
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;
	
	export default{
		props:{
			food:{
				type:Object
			}
		},
		data(){
			return {
				showFlag: false,
				selectType: ALL,
				onlyContent: true,
				desc:{
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				}
			}
		},
		methods: {
			show() {
				this.showFlag = true;
				this.selectType = ALL;
				this.onlyContent = false;
				this.$nextTick(() => {
					if(!this.scroll){
						this.scroll = new BScroll(this.$refs.food,{
							click:true
						})
					}else{
						this.scroll.refresh();
					}
				})
			},
			hide() {
				this.showFlag = false;
			},
			addFirst(event){
				if(!event._constructed){
					return;
				}
				this.$emit('cart-add',event.target);
				Vue.set(this.food,'count',1);
			},
			cartAdd(target){
				this.$emit('cart-add', target);
			},
			selectRating(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
     },
     toggleContent() {
     		this.onlyContent = !this.onlyContent;
     		this.$nextTick(() => {
          this.scroll.refresh();
        });
     },
     needShow(type,text) {
    	if(this.onlyContent && !text){
    		return false;
    	}
    	if(this.selectType === ALL){
    		return true;
    	}else{
    		return type === this.selectType;
    	}
     }
		},
		filters: {
			formatDate(time){
				let date = new Date(time);
				return formatDate(date,'yyyy-MM-dd hh:mm')
			}
		},
		components: {
			cartcontrol,
			ratingselect,
			split
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl";
.rating
	.rating-item
		border-1px(rgba(7,17,27,0.1))
</style>

<style type="text/css">
.food{
	position: fixed;
	left: 0;
	top: 0;
	bottom: 48px;
	z-index: 30;
	width: 100%;
	background: #FFFFFF;
	transition: all 0.2s linear;
	transform: translate3d(0,0,0);
}	
.food.move-enter,
.food.move-leave-to{
	transform: translate3d(100%,0,0);
	opacity: 1;
}
.food .image-header{
	position: relative;
	width: 100%;
	height: 0;
	padding-top: 100%;
}
.food .image-header img{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
.food .image-header .back{
	position: absolute;
	top: 10px;
	left: 0;
}
.food .back .icon-arrow_lift{
	display: block;
	padding: 10px;
	font-size: 20px;
	color: #FFFFFF;
}
.food .f-content{
	position: relative;
	padding: 18px;
}
.food .f-content .f-title{
	line-height: 14px;
	margin-bottom: 8px;
	font-size: 14px;
	font-weight: 700;
	color: rgb(7,17,27);
}
.food .f-content .f-detail{
	margin-bottom: 18px;
	height: 10px;
	line-height: 10px;
	font-size: 0;
}
.food .f-content .f-sell-count,
.food .f-content .f-rating{
	font-size: 10px;
	color: rgb(147,153,159);
}
.food .f-content .f-rating{
	margin-left: 12px;
}
.food .f-content .f-price{
	font-weight: 700;
	line-height:24px;
}
.food .f-price .f-now{
	margin-right: 8px;
	font-size: 14px;
	color: rgb(240,20,20);
}
.food .f-price .f-old{
	text-decoration: line-through;
	font-size: 10px;
	color: rgb(147,153,159);
}
.food .cartcontrol-wrap{
	position: absolute;
	right: 12px;
	bottom: 12px;
}
.food .buy{
	position: absolute;
	right: 18px;
	bottom: 18px;
	z-index: 10;
	height: 24px;
	line-height: 24px;
	padding: 0 12px;
	box-sizing: border-box;
	border-radius: 12px;
	font-size: 10px;
	color: #fff;
	background: rgb(0,160,220);
}
.food .info{
	padding: 18px;
}
.food .info .title{
	line-height: 14px;
	margin-bottom: 6px;
	font-size: 14px;
	color: rgb(7, 17, 27);
}
.food .f-text{
	line-height: 24px;
	padding: 0 8px;
	font-size: 12px;
	color: rgb(77, 85, 93);
}
.food .food-content .rating{
	padding-top: 18px;
}
.food .food-content .rating .title{
	line-height: 14px;
	margin-left: 18px;
	font-size: 14px;
	color: rgb(7, 17, 27);
}
.food .rating-wrapper{
	padding: 0 18px;
}
.food .rating-wrapper .rating-item{
	position:relative;
	padding: 16px 0;
}
.food .rating-wrapper .no-rating{
	padding: 16px 0;
	font-size: 12px;
	color: rgb(147,153,159);
}
.food .rating-item .user{
	position: absolute;
	right: 0;
	top: 16px;
	line-height: 12px;
	font-size: 0;
}
.food .rating-item .time{
	margin-bottom: 6px;
	line-height: 12px;
	font-size: 10px;
	color: rgb(147,153,159);
}
.food .rating-item .text{
	line-height: 16px;
	font-size: 12px;
	color: rgb(7,17,27);
}
.food .user .name{
	display: inline-block;
	margin-right: 6px;
	vertical-align: top;
	font-size: 10px;
	color: rgb(147,153,159);
}
.food .user .avatar{
	border-radius: 50%;
}
.food .text .icon-thumb_up,
.food .text .icon-thumb_down{
	margin-right: 4px;
	line-height: 16px;
	font-size: 12px;
}
.food .text .icon-thumb_up{
	color: rgb(0,160,220);
}
.food .text .icon-thumb_down{
	color: rgb(147,153,150);
}
</style>