<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img width="64" height="64" v-bind:src="seller.avatar"/>
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div v-if="seller.supports" class="support">
					<span class="icon" v-bind:class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="support-count" v-on:click="showDetail">
				<span class="count">{{seller.supports.length}}个</span>
				<i class="icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper" v-on:click="showDetail">
			<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img v-bind:src="seller.avatar" width="100%" />
		</div>
		<transition name="fade">
			<div v-show="detailShow" class="detail">
				<div class="detail-wrapper clearfix">
					<div class="detail-main">
						<h1 class="name">{{seller.name}}</h1>
						<div class="star-wrapper">
							<star v-bind:size="48" v-bind:score="seller.score"></star>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul v-if="seller.supports" class="supports"> 
							<li class="support-item" v-for="(item,index) in seller.supports">
								<span class="icon" v-bind:class="classMap[seller.supports[index].type]"></span>
								<span class="text">{{seller.supports[index].description}}</span>
							</li>
						</ul>
						<div class="title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">
							<p class="content">{{seller.bulletin}}</p>
						</div>
					</div>
				</div>
				<div class="detail-close" v-on:click="hideDetail">
					<i class="icon-close"></i>
				</div>
			</div>
		</transition>
	</div>
</template>

<script type="text/ecmascript-6">
	import star from '../star/star';
	export default{
		props:{
			seller:{
				type:Object
			}
		},
		data:function(){
			return {
				detailShow:false
			}			
		},
		methods:{
			showDetail:function(){
				this.detailShow = true;
			},
			hideDetail:function(){
				this.detailShow = false;
			}
		},
		created:function(){
			this.classMap = ['decrease','discount','special','invoice','guarantee']
			console.log(this)
		},
		components: {
			star:star
		}
	};
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin";
  .header
    position: relative
    color:#fff
    background: rgba(7,17,27,0.5)
    overflow: hidden
    .content-wrapper
      position: relative
      padding:24px 12px 18px 24px
      font-size: 0
	  .avatar
	    display: inline-block
	    vertical-align: top
	    img
	      border-radius:2px
		.content
	    display: inline-block
	    font-size:14px
	    margin-left: 16px
	  	.title
	  	  margin: 2px 0 8px 0
	  	  .brand
	  	    display: inline-block
	  	    vertical-align: top
	  	    width: 30px
	  	    height: 18px
	  	    bg-image('brand')
	  	    background-size: 30px 18px
	  	    background-repeat: no-repeat
	  	  .name
	  	    margin-left: 6px
	  	    font-size: 16px
	  	    line-height: 18px
	  	    font-weight: bold 	  
	  	.description
	  	  margin-bottom: 10px
	  	  line-height: 12px
	  	  font-size: 12px    
	  	.support
	  	  .icon
	  	    display: inline-block
	  	    width: 12px
	  	    height: 12px
	  	    margin-right: 4px
	  	    vertical-align: top
	  	    background-size: 12px 12px
	  	    background-repeat: no-repeat
	  	    &.decrease
	  	      bg-image('decrease_1')
	  	    &.discount
	  	      bg-image('discount_1')
	  	    &.guarantee
	  	      bg-image('guarantee_1')
	  	    &.invoice
	  	      bg-image('invoice_1')
	  	    &.special
	  	      bg-image('special_1')
	  	  .text
	  	    line-height: 12px
	  	    font-size: 10px
	  	    vertical-align: top
	  .support-count
	    position: absolute
	    right: 12px
	    bottom: 16px
	    padding: 0 8px
	    height: 24px
	    line-height: 24px   
	    border-radius: 14px
	    background: rgba(0,0,0,0.2)        
	    text-align: center
	    .count
	      font-size: 10px
	    .icon-keyboard_arrow_right
	      line-height:24px
	      vertical-align: top
	      margin-left: 2px
	      font-size: 10px
	.bulletin-wrapper 
	  position: relative
	  height: 28px      
	  line-height: 28px
	  padding: 0 22px 0 12px 
	  white-space: nowrap
	  overflow: hidden 
	  text-overflow: ellipsis
	  background: rgba(7,17,27,0.2)
	  .bulletin-title
	    display: inline-block
	    vertical-align: middle
	    width: 22px
	    height: 12px
	    bg-image('bulletin')
	    background-size: 22px 12px
	    background-repeat: no-repeat
	  .bulletin-text
	    vertical-align: middle
	    margin: 0 4px
	    font-size: 10px    
	  .icon-keyboard_arrow_right
	    position: absolute
	    right: 12px
	    top: 11px
	    font-size: 10px 
	.background 
	  position: absolute  
	  top: 0
	  left: 0
	  width: 100%
	  height: 100%
	  z-index: -1
	  filter: blur(10px)
	.detail
	  position: fixed
	  top:0
	  left:0
	  z-index: 100
	  width: 100%
	  height: 100%
	  overflow: auto
	  background: rgba(7,17,27,0.8)
	  transition: opacity .5s
	  .detail-wrapper
	    width: 100%
	    min-height: 100%
	    .detail-main
		    margin-top: 64px
		    padding-bottom: 64px
		    .name
		      line-height: 16px
		      text-align: center
		      font-size: 16px
		      font-weight: 700
		    .star-wrapper
		      margin-top: 18px
		      padding: 2px 0
		      text-align: center
		    .title
		      display: flex
		      width: 80%
		      margin: 28px auto 24px auto
		      .line
		        flex: 1
		        position: relative
		        top: -6px
		        border-bottom: 1px solid rgba(255,255,255,0.2)
		      .text
	          padding: 0 12px  	
	          font-weight: 700
	          font-size: 14px
		      
	  .detail-close
	    position: relative
	    width: 32px
	    height: 32px
	    margin: -64px auto 0 auto
	    clear: both
	    font-size: 32px
</style>

<style type="text/css">
	@import url("../../common/stylus/style.css");
	.supports{
		width: 80%;
		margin: 0 auto;
	}
	.supports .support-item{
		padding: 0 12px;
		margin-bottom: 12px;
		font-size: 0;	    
	}
	.supports .support-item:last-child{
		margin-bottom: 0;
	}
	.supports .support-item .icon{
		display: inline-block;
  	width: 12px;
  	height: 12px;
  	vertical-align: top;
  	margin-right: 4px;
  	background-size: 12px 12px;
  	background-repeat: no-repeat;
	}
	.supports .support-item .icon.decrease{
		background-image: url(decrease_2@2x.png);
	}
	.supports .support-item .icon.discount{
		background-image: url(discount_2@2x.png);
	}
	.supports .support-item .icon.guarantee{
		background-image: url(guarantee_2@2x.png);
	}
	.supports .support-item .icon.invoice{
		background-image: url(invoice_2@2x.png);
	}
	.supports .support-item .icon.special{
		background-image: url(special_2@2x.png);
	}
	.supports .support-item .text{
		line-height: 16px;
    font-size: 12px;
	}
	.supports .support-item .detail-close{
		position: relative;
    width: 32px;
    height: 32px;
    margin: -64px auto 0 auto;
    clear: both;
    font-size: 32px;
	}
	.bulletin{
		width: 80%;
		margin: 0 auto;
	}
	.bulletin .content{
		padding: 0 12px;
		line-height: 24px;
		font-size: 12px;
		margin: 0;
	}
	.fade-enter, .fade-leave-to{
	  opacity: 0;
	}
</style>