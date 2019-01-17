<template>
  <div class="search">
	<div class="hoods-content">
		<router-view name="hoods" :dynamic="dynamic" :areaData="area"></router-view>
	</div>
	<div class="content-pic" v-for="(init, index) in dynamic" :class="'init-'+index" :key="index">
		<router-link :to="{name:'HoodsView',params:{id:index}}">
<!-- 			<a href="#/search/hoods"> -->
				<div class="bg-imgs">
					<img :src="init.images.small" alt="">
				</div>
				<div class="digital"></div>
				<div class="content-text">
					<div class="title">
						<h3>{{init.title}}</h3>
						<span>{{init.original_title}}</span>
					</div>
					<div class="starring-cd">
						<span>
							评分:
							<em>{{init.rating.average}}</em>
						</span>
						<span>
							分类：
							<em>{{init.genres}}</em>
						</span>
					</div>
				</div>
				<div class="footer">
					<span>上映时间：{{init.year}}</span>
					<a href="javascript:void(0)">进入详情&gt;</a>
				</div>
			<!-- </a> -->
		</router-link>
	</div>
  </div>
</template>

<script>
  export default {
    name: 'SearchView',
    props: ['dynamic', 'area'],
	data () {
		return {
			ser: null
		}
    },
    methods: {
	}
}
</script>

<style>
.search{
	position:absolute;
	top: 0px;
	z-index: 100;
	margin-bottom:50px;
	padding: 0 1px;
	width: 99.572%;
	background:#fff;
}
.search .content-pic {
	position: relative;
	margin:20px 4px;
	width: 98%;
	height: 100px;
	/*border: 1px solid #000;*/
}
.search .content-pic.init-0{
	margin-top:70px;
}
.search .content-pic .bg-imgs{
	position: relative;
	z-index: 0;
	float: right;
	width:200px;
	height: 100px;
	overflow: hidden;
}
.search .content-pic .bg-imgs img{
	display: block;
	position: absolute;
	z-index: 0;
	top: -20px;
	width:200px;
	height: 170px;
}
.search .content-pic .digital{
	position: absolute;
	left:45%;
	z-index: 1;
	width:240px;
	height: 100px;
	background: linear-gradient(left,#fff , rgba(250,250,250,0.1));
	/*border:1px solid #000;*/
}
.search .content-pic .content-text{
	position: absolute;
	z-index: 5;
	width:350px;
	height: 100px;
	white-space: nowrap;
	overflow: hidden;
}
.search .content-pic .content-text .title{
	width:100%;
	margin-top:2px;
	height: 25px;
	border-bottom: 1px dashed #ddd;
}
.search .content-pic .content-text .title h3{
	display: inline;
	margin-left: 10px;
	line-height:20px;
	font-weight: 600;
}
.search .content-pic .content-text .title>span{
	font-size: 12px;
	text-overflow:ellipsis;
}
.search .content-pic .content-text .starring-cd{
	margin-top:6px;
	font-size: 12px;
}
.search .content-pic .content-text .starring-cd em{
	color:#f09;
}
.search .content-pic .content-text .starring-cd p{
	margin-top:8px;
}
.search .content-pic .footer{
	position: absolute;
	bottom: 0px;
	z-index: 10;
	width:100%;
	height: 22px;
	background: rgba(240,240,240,0.9);
}
.search .content-pic .footer span{
	font-size: 12px;
}
.search .content-pic .footer a{
	float: right;
	margin-right: 4px;
	line-height:22px;
	font-size: 12px;
}
.search .hoods-content{
	display: inline-block;
    width:100%;
    height: 100%;
}
</style>
