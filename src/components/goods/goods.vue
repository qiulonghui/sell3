<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" v-bind:class="{'current':index === currentIndex}" 
						v-on:click="selectMenu(index,$event)" >
					<span class="text border-1px">
						<span v-show="item.type>0" class="icon"
							v-bind:class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li v-on:click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
							<div class="icon">
								<img width="57" height="57" v-bind:src="food.icon"/>
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">¥{{food.price}}</span>
									<span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol v-bind:food="food" v-on:cart-add="cartAdd"></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopcart ref="shopcart" v-bind:select-foods="selectFoods" v-bind:delivery-price="seller.deliveryPrice" v-bind:min-price="seller.minPrice"></shopcart>
		<food v-on:cart-add="cartAdd" v-bind:food="selectedFood" ref="food"></food>
	</div>
</template>

<script type="text/ecmascript-6">
	import BScroll from 'better-scroll';
	import shopcart from '../shopcart/shopcart';
	import cartcontrol from '../cartcontrol/cartcontrol';
	import food from '../food/food';
	
	const ERR_OK = 0;
	
	export default{
		props:{
			seller:{
				type:Object
			}
		},

		data:function(){
			return {
				goods:[],
				listHeight: [],
				scrollY: 0,
				selectedFood:{}
			}
		},
		created:function(){
			this._calculateHeight;
			this.classMap = ['decrease','discount','special','invoice','guarantee'];
			this.$http.get("/data.json").then((response)=>{
				response = response.body.goods;
				this.goods = response;
				this.$nextTick(() => {					
					this._initScroll();
					this._calculateHeight();				
				});		
			});			
		},
		computed: {
			currentIndex(){
				for(let i=0; i<this.listHeight.length; i++){
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i+1]; // 当滚动到最后一个区间时height2为underfind
					if(!height2||(this.scrollY>=height1 && this.scrollY<height2)){
						return i;
					}
				}
				return 0;
			},
			selectFoods(){
				let foods = [];
				
				this.goods.forEach((good) => {
					good.foods.forEach((food) => {
						if(food.count){
							foods.push(food);
						}
					})
				});
				return foods;
			}
		},
		methods: {
			selectFood:function (food,event){
				if(!event._constructed){
					return;
				}
				this.selectedFood = food;
				this.$refs.food.show();
			},
			selectMenu:function (index,event){
				if(!event._constructed){
					return;
				}
				let foodList = this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");
				let el = foodList[index];
				this.foodsScroll.scrollToElement(el,300);
			},
			cartAdd: function (target) {
				// 体验优化，异步执行小球下落动画
				this.$nextTick(() => {
					this.$refs.shopcart.drop(target);
				});      
	   },
			_initScroll(){
				this.menuScroll = new BScroll(this.$refs.menuWrapper,{
					click:true
				});
				this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
					click:true,
					probeType: 3
				});				
				this.foodsScroll.on("scroll",(pos)=>{
					this.scrollY = Math.abs(Math.round(pos.y));
				});
			},
			_calculateHeight(){
				let foodList = this.$refs.foodsWrapper.getElementsByClassName("food-list-hook");
				let height = 0;
				this.listHeight.push(height);
				for(let i=0;i<foodList.length;i++){
					let item = foodList[i];
					height += item.clientHeight;
					this.listHeight.push(height);
				}
			}			
		},
		components:{
			shopcart,
			cartcontrol,
			food
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"
.menu-item
	.text
		border-1px(rgba(7,17,27,0.1))
.foods-wrapper
	.food-item
		border-1px(rgba(7,17,27,0.1))
		&:last-child
			border-none()
			margin-bottom: 0
</style>

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
.goods .menu-wrapper .menu-item{
	display: table;
	height: 54px;
	width: 56px;
	padding: 0 12px;
	line-height: 14px;
}
.goods .menu-item.current{
	position: relative;
	margin-top: -1px;
	z-index: 10;
	background: #fff;
	font-weight: 700;
} 
.goods .menu-item .icon{
	display: inline-block;
	width: 12px;
	height: 12px;
	vertical-align: top;
	margin-right: 2px;
	background-size: 12px 12px;
	background-repeat: no-repeat;
}
.goods .menu-item .icon.decrease{
	background-image: url(decrease_3@2x.png);
}
.goods .menu-item .icon.discount{
	background-image: url(discount_3@2x.png);
}
.goods .menu-item .icon.guarantee{
	background-image: url(guarantee_3@2x.png);
}
.goods .menu-item .icon.invoice{
	background-image: url(invoice_3@2x.png);
}
.goods .menu-item .icon.special{
	background-image: url(special_3@2x.png);
}
.goods .menu-item .text{
	display: table-cell;
	width: 56px;
	vertical-align: middle;
	font-size: 12px;
}
.goods .menu-item.current .text{
	border: none;
	font-weight: 700;
}
.goods .foods-wrapper{
	flex: 1;
}
.goods .foods-wrapper .title{
	height: 26px;
	line-height: 26px;
	padding-left: 14px;
	border-left: 2px solid #d9dde1;
	font-size: 12px;
	color: rgb(147,153,159);
	background-color: #f3f5f7;
	margin: 0;
}
.goods .food-item{
	display: flex;
	margin: 18px;
	padding-bottom: 18px;
}
.goods .food-item .icon{
	flex: 0 0 57px;
	margin-right: 10px;
}
.goods .food-item .content{
	flex: 1;
	margin: 0;
}
.goods .content .name{
	margin: 2px 0 8px 0;
	height: 14px;
	line-height: 14px;
	font-size: 14px;
	font-weight: 700;
	color: rgb(7,17,27);
}
.goods .content .desc,
.goods .content .extra{
	line-height: 10px;
	font-size: 10px;
	color: rgb(147,153,159);
}
.goods .content .desc{
	margin-bottom: 8px;
	line-height: 12px;
}
.goods .extra .count{
	margin-right: 12px;
}
.goods .content .price{
	font-weight: 700;
	line-height: 24px;
}
.goods .content .cartcontrol-wrapper{
	position: absolute;
	right: 0;
	bottom: 12px;
}
.goods .price .now{
	margin-right: 8px;
	font-size: 14px;
	color: rgb(240,20,20);
}
.goods .price .old{
	text-decoration: line-through;
	font-size: rgb(147,153,159);
}
</style>