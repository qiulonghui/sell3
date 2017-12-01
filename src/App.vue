<template>
  <div id="container">
		<v-header v-bind:seller="seller"></v-header>	
		<div class="tab">
			<div class="tab-item">
				<router-link to="/goods">商品</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/ratings">评论</router-link>
			</div>
			<div class="tab-item">
				<router-link to="/seller">商家</router-link>
			</div>		
		</div>
		
		<!-- 路由出口 -->
  	<!-- 路由匹配到的组件将渲染在这里 -->
		<keep-alive>
			<router-view v-bind:seller="seller"></router-view>
		</keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
	import {urlParse} from './common/js/util'
	import header from "./components/header/header";
	
	const ERR_OK = 0;
	
	export default{
		data:function(){
			return{
				seller:{
					id: (() => {
						let queryParam = urlParse();
						console.log(queryParam);
						return queryParam.id;
					})()
				}
			};
		},
		created:function(){
			this.$http.get('/api/seller?id='+this.seller.id).then((response)=>{
				response = response.body;
				if(response.errno === ERR_OK){
					this.seller = Object.assign({},this.seller,response.data);
				};
			});
		},
		methods:{
			selectMenu(){
				console.log("yyy");
			}
		},
		components:{
			"v-header": header
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl";
	#container
		.tab
			display:flex
			width:100%
			height:40px
			line-height: 40px
			border-1px:(rgba(7,17,27,0.1))
			.tab-item
				flex: 1
				text-align: center
				& > a 
					display: block
					font-size: 14px
					color:rgb(77,85,93)
					&.active
						color:rgb(240,20,20)
</style>
