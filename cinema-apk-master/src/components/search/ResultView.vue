\<template>
	<div class="result-show">
		<div class="result-alone"></div>
		<div class="result-detail" v-for="(item,index) in searchData" :key="index" :class="'item-'+index">
			<div class="bg-imgs">
				<img :src="item.images.small" alt="">
			</div>
			<div class="digital-white"></div>
			<div class="traversing-present">
				<div class="title-present">
					<h3>{{item.title}}</h3>
					<span>--{{item.original_title}}</span>
				</div>
				<div class="score-cd">
					<span>
						评分：
						<em>{{item.rating.average}}</em>
					</span>
					<span>
						分类：
						<em>{{item.genres}}</em>
					</span>
					<div class="target">
						<span>{{item.year|filterTime}}</span>
					</div>
				</div>
			</div>
			<div class="footer-cd">
				<span>上映时间：{{item.year}}</span>
				<a href="javascript:void(0);">进入详情&gt;</a>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'ResultView',
		props: ['searchData', 'searchTitle'],
		data () {
			return {
			}
		},
		methods: {
		},
		filters: {
			filterTime (time) {
				let dec = parseInt(new Date().getFullYear())
				let times = parseInt(time)
				var results = ''
				if (dec === times) {
					results = `近期上映`
				} else if (times >= dec - 1) {
					results = `去年上映`
				} else if (times < dec) {
					results = `已下架`
				}
				return results
			}
		}
	}
</script>
<style>
.result-show{
	position: relative;
	/*border: 1px solid #000;*/
}
.result-show .result-detail{
	position: relative;
	margin-bottom:30px;
	width: 100%;
	height: 100px;
	/*border: 1px solid #000;*/
}
.result-show .result-detail .bg-imgs{
	position: relative;
	z-index: 0;
	float: right;
	width:190px;
	height: 100px;
	overflow: hidden;
}
.result-show .result-detail .bg-imgs img{
	display: block;
	position: absolute;
	z-index: 0;
	top: -14px;
	width:200px;
	height: 172px;
}
.result-show .result-detail .digital-white{
	position: absolute;
	left:183px;
	z-index: 1;
	width:200px;
	height: 100px;
	background: linear-gradient(left,#fff , rgba(250,250,250,0.1));
}
.result-show .result-detail .traversing-present{
	position: absolute;
	z-index: 5;
	width:250px;
	height: 100px;
	white-space: nowrap;
}
.result-show .result-detail .traversing-present .title-present{
	width:100%;
	margin-top:2px;
	height: 25px;
	border-bottom: 1px dashed #ddd;
}
.result-show .result-detail .traversing-present .title-present h3{
	display: inline;
	margin-left: 10px;
	line-height:20px;
	font-weight: 600;
}
.result-show .result-detail .traversing-present .title-present>span{
	font-size: 12px;
	text-overflow:ellipsis;
}
.result-show .result-detail .traversing-present .score-cd{
	margin-top:6px;
	font-size: 12px;
}
.result-show .result-detail .traversing-present .score-cd em{
	color:#f09;
}
.result-show .result-detail .traversing-present .score-cd p{
	margin-top:8px;
}
.result-show .result-detail .footer-cd{
	position: absolute;
	bottom: 0px;
	z-index: 10;
	width:100%;
	height: 22px;
	background: rgba(240,240,240,0.5);
}
.result-show .result-detail .footer-cd span{
	/*color: #fff;*/
	font-size: 12px;
}
.result-show .result-detail .footer-cd a{
	float: right;
	margin-right: 4px;
	line-height:22px;
	font-size: 12px;
}
</style>
