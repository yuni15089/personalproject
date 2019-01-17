<template>
	<div class="hood-wrap">
		<div>
			<div class="retreat">
				<a href="#/search">
					<div >&lt;</div>
				</a>
			</div>
			<div class="header-hoods">
				<div class="bg-hoods-img">
					<img :src="dynamic[indexDataInt].images.small" alt="">
				</div>
				<div class="cover-hoods">
					<img :src="dynamic[indexDataInt].images.small" alt="">
				</div>
				<div class="introduction">
					<div class="title-hoods">
						<span class="titles-all"> {{dynamic[indexDataInt].title}}</span>
						<p>类型:{{dynamic[indexDataInt].genres}}</p>
						<span>年份：{{dynamic[indexDataInt].year}}</span>
						<span>评分：<em>{{dynamic[indexDataInt].rating.average}}</em></span>
					</div>
				</div>
			</div>
			<div class="isolation">
				<p class="msg">您所在城市：<span> {{areaData}}</span> </p>
			</div>
			<div class="date-selection">
				<div class="date-cd">
					<ul>
						<li v-for="(item,index) in theDateData" :key="index"><span>{{theDayData[index]}} </span>{{item}}</li>
					</ul>
				</div>
			</div>
			<div class="filter-film">
				<div v-for="(num, index) in cinemaDetails" class="films-cd" :key="index" @click="weap">
						<router-link :to="{name: 'PurchaseDetails', 
										   params: {cinema: num.cinema,
											session: num.session,
											address: num.address}}">
							<div class="title-film-cd">
								<h4 class="titles">{{num.cinema}}</h4>
								<span class="price">30元起</span>
								<p class="address">{{num.address}}</p><span class="distance">{{num.distance}}</span>
							</div>
								<ul>
									<li v-for="(val, indexs) in num.details" class="details" :key="indexs">{{val}}</li>
								</ul>
							<p class="offer">{{num.offer}}</p>
							<div class="session">
								近期场次：<span>{{num.session.join(' | ')}}</span>
							</div>
						</router-link>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {mapState, mapMutations} from 'vuex'
	export default {
		name: 'HoodsView',
		props: ['dynamic','areaData'], 
		data () {
			return {
				indexDataInt: this.$route.params.id,
				dayArray: null
			}
		},
		computed: {
			...mapState(['cinemaDetails']),
			...mapState(['theDayData','theDateData','indexsData'])
		},
		components: {
		},
		methods: {
			...mapMutations({extract: 'EXTRACT_DATE'}),
			...mapMutations({change: 'INDEX_PROPS'}),
			weap: function () {
				this.change(this.indexDataInt)
			}
		},
		created () {
			this.extract()
		}
	}
</script>
<style>
.hood-wrap{
	position: absolute;
	top: 0px;
	z-index: 120;
	width: 100%;
	height: 100%;
	background: #fff;
}
.hood-wrap .retreat{
	position: fixed;
	top: 0px;
	z-index: 3;
	width: 100%;
	height: 30px;
	/*border:1px solid #000;*/
	background: rgba(0,0,0,0.6);
}
.hood-wrap .retreat a{
	display: block;
	text-align: center;
	line-height: 30px;
	width: 30px;
	height: 30px;/*
	border: 1px solid #000;*/
	background: rgba(220,220,220,0.6);
}
.titles-all{
	font-size: 16px;
	line-height:30px;
}
.hood-wrap .header-hoods{
	position: relative;
	width:100%;
	height: 200px;
	/*border:1px solid #000;*/
}
.hood-wrap .bg-hoods-img{
	position: absolute;
	z-index: 0;
	width: 100%;
	height: 200px;
	overflow: hidden;
}
.hood-wrap .bg-hoods-img img{
	filter: blur(15px);
	width:100%;
	height: 250px;
}
.hood-wrap .header-hoods .cover-hoods{
	position: absolute;
	bottom:-40px;
	left: 12px;
	width: 150px;
	height: 200px;
	border:1px solid #000;
}
.hood-wrap .header-hoods .cover-hoods img{
	border:3px solid #fff;
	width:144px;
	height: 194px;
}
.hood-wrap .header-hoods .introduction{
	position: absolute;
	z-index: 2;
	right: 16px;
	top: 40px;
	width: 180px;
	height: 160px;
	font-size: 14px;
	color: #fff;
	overflow: hidden;
}
.hood-wrap .header-hoods .introduction .msg{
	position: absolute;
	bottom: 12px;
}
.hood-wrap .header-hoods .introduction .title-hoods{
	line-height:16px;
	white-space: nowrap;
	text-overflow:ellipsis;
}
.hood-wrap .header-hoods .introduction .title-hoods p{
	margin-bottom: 10px;
}
.hood-wrap .header-hoods .introduction .title-hoods span {
	margin-right:10px;
}
.hood-wrap .header-hoods .introduction .title-hoods span em{
	margin-left:4px;
	font-size: 20px;
	color: #f40;
}
.hood-wrap .content-hoods{
	position: relative;
	margin:50px 0px;
	width: 100%;
	height: 100%;
	/*border: 1px solid #000;*/
}
.hood-wrap .content-hoods h3{
	display: block;
	position: absolute;
	right: 20px;
	top: -30px;
	font-size: 16px;
	color: #072;
	font-weight: 600;

}
.hood-wrap .content-hoods .character{
	margin: 10px 0px;
	width: 100%;
	height: 130px;
	/*border:1px solid #000;*/
}
.hood-wrap .content-hoods .character .imgs-cha{
	float: left;
	margin:4px;
	width: 100px;
	height: 124px;
	/*border: 1px solid #000;*/
}
.hood-wrap .content-hoods .character .imgs-cha img{
	width: 100px;
	height: 124px;
}
.hood-wrap .content-hoods .character .text-cha{
	float: right;
	margin-right: 10px;
	width:250px;
	height: 124px;
	/*border: 1px solid #000;*/
}
.hood-wrap .content-hoods .character .text-cha p{
	margin-left:4px;
	line-height:26px;
}
/*购票*/
/*.selection-box{
	position: fixed;
	top: 30px;
	z-index: 9000;
	width: 100%;
	height: 100%;
	background: #eee;
}*/
.isolation{
	width: 100%;
	height: 40px;
	background: #fff;
	border-bottom:1px solid #ddd;
	box-shadow: 0px 1px 4px #000;
	margin-bottom: 4px; 
	line-height:40px;
}
.isolation p{
	float: right;
	margin-right: 10px;
}
.isolation p span{
	font-weight: 600;
}
/*日期*/
.date-selection{
	width: 100%;
	height: 40px;
	overflow: scroll;
	background: #fff;
	border-bottom:2px solid #eee;
}
.date-selection .date-cd ul {
	width: 854px;
	line-height:40px;
}
.date-selection .date-cd ul li{
	float: left;
	width: 122px;
	text-align: center;
	color: #f40;
}
.date-selection .date-cd ul li:active{
	border-bottom: 2px solid #f40;
	background: rgba(240,240,240,0.4);
}
/*影城*/
.filter-film{

}
.filter-film .films-cd{
	margin-top:20px;
	padding-bottom: 6px;
	border-bottom:1px solid #eee;
	box-shadow: 0px 2px 3px #ccc; 
}
.filter-film .films-cd .title-film-cd{
	position: relative;
}
.filter-film .films-cd .title-film-cd .titles{
	float: left;
	margin-left: 14px;
}
.filter-film .films-cd .title-film-cd .price{
	margin-left: 10px;
	color: #f40;
}
.filter-film .films-cd .title-film-cd .address{
	display: inline-block;
	position: relative;	
	margin:6px 0px 4px 14px;
	width: 250px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-size: 12px;
	color: #555;
}
.filter-film .films-cd .title-film-cd .distance{
	display: inline-block;
	position: absolute;
	top: 22px;
	right: 20px;
	font-size: 12px;
}
.filter-film ul{
	width: 100%;
}
.filter-film ul .details{
	float: left;
	margin:4px;
	padding: 1.4px;
	font-size: 12px;
	border: 1px solid #072;
	color: #10b;
}
.filter-film .offer{
	display: inline-block;
	font-size: 12px;
	margin-left:20px;
	color: #999;
}
.filter-film .session{
	margin-left:14px;
	color:#999;
	font-size: 12px;
}
</style>
