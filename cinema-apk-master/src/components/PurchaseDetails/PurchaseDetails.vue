<template>
	<div class="purchase-details">
<!-- 		<router-link to="/search/hoods/">123</router-link> -->
		<div class="purchase-title">
			<router-link to="/search/hoods" class="title-a">&lt;</router-link>
				<h3>{{cinemaName}}</h3>
		</div>
		<!-- 顶部end -->
		<div class="positioning-cinema">
			<div class="positioning">
				<p class="name-big">{{cinemaName}}</p>
				<p class="cinema-address">{{cinemaAddress}}</p>
			</div>
			<span class="icon-location"></span>
		</div>
		<!-- 电影院位置 end-->	
		<div class="better-case">
					<div class="better-bg-imgs">
				<img :src="dynamic[indexsData].images.large" alt="">
		</div>
		<div class="giant-screen">
			 <ul>
			 	<li class="imgs-screen null"></li>
			 	<li class="imgs-screen null"></li>
				<li v-for="(imgs,index) in dynamic" :key="index" class="imgs-screen">
					<div class="images">
						<img :src="imgs.images.large" alt="">
					</div>
				</li>
			 </ul>
		</div>
		</div>

		<!-- 电影巨幕 end-->
		<div class="cinema-name">
			<div class="names-title">
				{{dynamic[indexsData].title}}
				<span>{{dynamic[indexsData].rating.average}}分</span>
				<div class="small-fonts case-top">{{dynamic[indexsData].genres.join(' | ')}}
					<p class="white-space case-top">
						<span v-for="(irem,index) in dynamic[indexsData].casts" class="small-fonts" :key="index">{{irem.name}}、</span>
					</p>
				</div>
			</div>
		</div>
		<!-- 电影名称 end-->
		<div class="date-selection">
			<div class="date-cd">
					<ul>
						<li v-for="(item,index) in theDateData" :key="index"><span>{{theDayData[index]}} </span>{{item}}</li>
					</ul>
				</div>
		</div>
		<!-- 时间轴 end-->
		<div class="films-date-buy">
			<ul>
				<li v-for="(reg, index) in cinemaSession" :key="index" class="carts" @click="determineLogin({filmName: cinemaName,films: dynamic[indexsData].title,time: reg})">
						<div class="strat-time text-align-center">
							<p>{{reg}}</p>
						</div>
						<div class="typesof text-align-center">
							<span>双语 3D</span>
							<p>3号激光厅大银幕</p>
						</div>
						<div class="piace">
							<p class="original ">
								￥38 
								<span>
									折扣卡<em>￥31.5</em>
								</span>
							</p>
							<p class="first">折扣卡首单特惠</p>
						</div>
						<div class="buy text-align-center">
							<span class="buy-ticket">购票</span>
						</div>
				</li>
			</ul>
		</div>
		<!-- 购票选项 end-->
		<div class="dividing"></div>
		<div class="offer-foods">
			<div class="offer-title">
				<h4>影院超值套餐</h4>
			</div>
			<div class="foods">
				<div class="foods-img">
					<img src="../../assets/foods.jpg" alt="" width="92" height="92">
				</div>
				<div class="foods-introduction">
					<span>双人</span>
					<p>85OZ爆米花*1 +22OZ可乐*2</p>
					<div class="buyed">已售77</div>
					<div class="piace">￥41.9</div>
					<div class="buy">去购买</div>
				</div>
			</div>
			<div class="foods">
				<div class="foods-img">
					<img src="../../assets/foods.jpg" alt="" width="92" height="92">
				</div>
				<div class="foods-introduction">
					<span>双人</span>
					<p>85OZ爆米花*1 +22OZ可乐*2</p>
					<div class="buyed">已售77</div>
					<div class="piace">￥41.9</div>
					<div class="buy">去购买</div>
				</div>
			</div>
			<div class="foods">
				<div class="foods-img">
					<img src="../../assets/foods.jpg" alt="" width="92" height="92">
				</div>
				<div class="foods-introduction">
					<span>双人</span>
					<p>85OZ爆米花*1 +22OZ可乐*2</p>
					<div class="buyed">已售77</div>
					<div class="piace">￥41.9</div>
					<div class="buy">去购买</div>
				</div>
			</div>
			<div class="foods">
				<div class="foods-img">
					<img src="../../assets/foods.jpg" alt="" width="92" height="92">
				</div>
				<div class="foods-introduction">
					<span>双人</span>
					<p>85OZ爆米花*1 +22OZ可乐*2</p>
					<div class="buyed">已售77</div>
					<div class="piace">￥41.9</div>
					<div class="buy">去购买</div>
				</div>
			</div>
		</div>
		<!-- 零食end -->
		<div class="not-yet" v-if="loginYet">
			<div class="content-login">请先登录</div>
		</div>
		<div class="not-yet" v-if="loginUp">
			<div class="content-login" >请稍后</div>
		</div>
	</div>
</template>
<script>
	import {mapState, mapMutations} from 'vuex'
	import foods from'../../assets/foods.jpg'
	export default {
		name:'PurchaseDetails',
		props:['dynamic'],
		data () {
			return {
				loginYet:false,
				loginUp:false
			}
		},
		computed: {
			...mapState(['indexsData', 'theDateData', 'theDayData', 'logining']),
			//电影名称
			cinemaName () {
				return this.$route.params.cinema
			},
			// 电影时间轴
			cinemaSession () {
				return this.$route.params.session
			},
			//地址
			cinemaAddress () {
				return this.$route.params.address
			}
		},
		methods: {
			...mapMutations({tickets:'BUY_TICKETS'}),
			determineLogin: function (val)	{
				if (this.logining) {
					this.loginUp = true
					this.tickets(val)
					console.log('请稍后')
					setTimeout(()=>{
						this.loginUp = false
					},500)
					setTimeout("location.href='#/selectiontypeseat'", 1000)
				} else {
					this.loginYet = true
					console.log('请先登录')
					setTimeout(()=>{
					this.loginYet = false
					},500)
					setTimeout("location.href='#/particular'", 1000)
				}
			}
		},
	}
</script>
<style>
.not-yet{
	  position: fixed;
  	top: 0px;
  	width: 100%;
  	height: 100%;
  	background: rgba(0,0,0,0.1);
}
.not-yet .content-login{
		position: absolute;
		top:50%;
		left:50%;
		transform: translateX(-50%) translateY(-50%);
		width: 120px;
		height: 50px;
		text-align: center;
		line-height: 50px;
		background: rgba(0,0,0,0.7);
		color: #fff;
		border-radius: 6px;
}
.purchase-details{
	position: absolute;
	top: 0px;
	z-index: 100;
	width: 100%;
	background: #fff;
}
.purchase-details .purchase-title{
	position: fixed;
	top: 0px;
	z-index: 3;
	width: 100%;
	height: 30px;
	background: rgba(0,0,0,0.6);
}
.purchase-details .purchase-title h3{
	display: block;
	position: absolute;
	top: 0px;
	text-align: center;
	width: 100%;
	color: #fff;
	line-height:30px;
}
.title-a{
	position: absolute;
	z-index: 120;
	display: block;
	text-align: center;
	line-height: 30px;
	width: 30px;
	height: 30px;
	background: rgba(220,220,220,0.6);
}
.purchase-details .positioning-cinema{
	margin-top: 30px;
	padding: 20px 15px;
	height: 40px;
	border-bottom: 1px solid #ccc;
	background: #fff;
}
.purchase-details .giant-screen{
	transform-style:preserve-3d;
	position: relative;
	overflow: scroll;
	width: 100%;
	height: 140px;
	border-bottom:2px solid #ccc;
  perspective:100px;
} 
.better-bg-imgs{
	position: absolute;
	top: 10px;
	left:0px;
	z-index: 0;
	width: 100%;
	height: 125px;
}
.better-bg-imgs img{
	filter: blur(6px);
	width: 100%;
	height: 125px;
}
.purchase-details .giant-screen ul{
	position: absolute;
	z-index: 7;
	height: 90px;
	width: 1900px;
	margin-top:16px;
}
.purchase-details .giant-screen ul .imgs-screen{
	float: left;
	position: relative;
	margin:4px;
}
.purchase-details .giant-screen ul .imgs-screen .images{
	transform: translateZ(-20px);
	position: relative;
	width: 70px;
	height: 90px;
	background: #fff;
}
.purchase-details .giant-screen ul .imgs-screen .images:hover{
	transform: translateZ(0px);
	z-index: 10;
}
.purchase-details .giant-screen ul .imgs-screen .images:hover img{
	width: 66px;
	height: 86px;
	border: 2px solid #fff;
}
.purchase-details .giant-screen ul .imgs-screen .images img{
	width: 70px;
	height: 90px;
}
.purchase-details .cinema-name{
	height: 70px;
	background: #fff;
	border-bottom: 1px solid #ccc;
}
.purchase-details .positioning-cinema{
	position: relative;
}
.purchase-details .positioning-cinema .name-big{
	font-size: 20px;
	font-weight: 600;
	line-height: 30px;
}
.purchase-details .positioning-cinema .cinema-address{
	overflow: hidden;
	width: 270px;
	font-size: 14px;
	color: #999;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.purchase-details .positioning-cinema .positioning{
	width: 280px;
	border-right: 1px solid #ccc;
}
.purchase-details .positioning-cinema span{
	position: absolute;
	top: 30px;
	right: 26px;
	text-align: center;
	color: #072;
	font-size: 25px;
}
.purchase-details .cinema-name{
	text-align: center;
}
.purchase-details .cinema-name .names-title{
	font-weight: 600;
	margin-top: 10px;
	font-size: 18px;
}
.purchase-details .cinema-name .names-title>span{
		margin-left: 4px;
		line-height: 24px;
		color: #faaf00;
}
.better-case{
	position: relative;
}
.small-fonts{
	font-size: 12px;
	font-weight: normal;
}
.case-top{
	margin-top: 6px;
}
.white-space{
	width: 100%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.films-date-buy{
	position: relative;
	width: 100%;
}
.films-date-buy ul .carts{
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: 80px;
	border-bottom: 2px solid #ccc;
}
.text-align-center{
	text-align:center;
}
.films-date-buy ul .carts .strat-time{
	width: 70px;
	font-size: 20px;
	line-height:70px;
}
.films-date-buy ul .carts .typesof{
	width: 100px;
	font-size: 14px;
	text-align: left;
}
.films-date-buy ul .carts .typesof span{
	display: block;
	margin-top:22px;
	line-height:22px;
}
.films-date-buy ul .carts .typesof p{
	font-size: 12px;
	color: #777;
}
.films-date-buy ul .carts .piace{
	width: 110px;
}
.films-date-buy ul .carts .piace .original{
	margin-top: 22px;
	line-height:22px;
	color: #f40;
	font-size: 14px;
}
.films-date-buy ul .carts .piace .original>span{
	font-size: 10px;
	background: #ff9000;
	color:#fff;
	border-radius: 4px;
	border: 1px solid #ff9000;
	border-right: 0px;
}
.films-date-buy ul .carts .piace .original>span>em{
	display: inline;
	background: #fff;
	color: #ff9000;
	border: 1px solid #ff9000;
}
.films-date-buy ul .carts .piace .first{
	font-size: 12px;
	color: #777;
}
.films-date-buy ul .carts .buy{
	width: 70px;
	line-height:70px;
}
.films-date-buy ul .carts .buy .buy-ticket{
	background: #f03d37;
	color: #fff;
	font-size: 12px;
	padding:6px 10px;
	border-radius: 6px;
}
.dividing{
	width: 100%;
	height: 14px;
	background: #f0f0f0;
}
.offer-foods{
	display: inline-block;
	margin-bottom:100px;
	width: 100%;
}
.offer-foods .offer-title{
	width: 100%;
	height: 40px;
	border-bottom: 1px solid #ccc;
	line-height:40px;
}
.offer-foods .offer-title h4{
	padding: 0px 10px;
	font-size: 16px;
	color: #666;
}
.foods{
	width: 100%;
	height: 110px;
	border-bottom: 1px solid #ccc;
}
.foods-img{
	float: left;
	margin-top:10px;
	width: 92px;
	height: 92px;
}
.foods-introduction{
	float: left;
	position: relative;
	margin-top:10px;
	margin-left: 10px;
	height: 90px;

}
.foods-introduction>span{
	background: #ff9000;
	color: #fff;
	font-size: 12px;
	padding: 1px 4px;
	border-radius: 4px;
}
.foods-introduction>p{
	display: inline-block;
	color: #666;
}
.foods-introduction .buy{
	position: absolute;
	top: 50px;
	right: 0px;
	width: 36px;
	height: 12px;
	font-size: 12px;
	background: #f03d37;
	padding: 6px 10px;
	color: #fff;
	border-radius: 4px;
}
.foods-introduction .piace{
	position: absolute;
	bottom:10px;
	left:10px;
	width: 60px;
	height: 20px;
	color: #f40;
}
.buyed{
	position: absolute;
	top: 30px;
	right:-4px;
	width: 60px;
	height: 12px;
	font-size: 12px;
	text-align: center;
	color: #c0c0c0;
}
.null{
	width: 70px;
	height: 90px;
}
</style>