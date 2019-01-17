<template>
	<div class="hot-reveal">
		<div class="popular" :style="'height:'+dynamic.length*96+'px'">
			<div class="carsouel">
				<div class="show-pic" v-for="(num,index) in dynamic" :key="index" v-show="index == quantity">
					<router-link :to="{name:'HoodsView',params:{id:index}}">
						<img :src="num.images.small" alt="">
					</router-link>
				</div>
			</div>
			<div class="hot-list">
				<h3>热销榜</h3>
				<div class="flow" v-for="(item,index) in dynamic" :key="index" v-if="item.rating.average">
					<router-link :to="{name:'HoodsView',params:{id:index}}">
						<div class="rendering">
							<img :src="item.images.small" alt="" width="100%" height="100%">
						</div>
						<div class="evaluation">
							<div class="content">
								<p class="text-wrap">《{{item.title}}》</p>
								<p class="small">{{item.original_title}}</p>
							</div>
							<div class="score">
								<div class="bar">
									<div class="progress" :style="'width:'+(item.rating.average)*10+'%'"></div>
								</div>
								<em>{{item.rating.average}}</em>
							</div>
						</div>
					</router-link>
				</div>
			</div>
			<div class="tab-premiere"></div>
		</div>
	</div>
</template>

<script>
	export default{
		name: 'HotView',
		props: ['dynamic'],
		data () {
		return {
			quantity: 0
		}
		},
		methods: {
		},
		mounted () {
				this.$nextTick(() => {
					clearInterval(this.timer)
					setInterval(() => {
					if (this.quantity >= this.dynamic.length - 1) {
						this.quantity = 0
						} else {
						this.quantity++
					}
					}, 1500)
					})
				}
}
</script>

<style>
.text-wrap{
	white-space: nowrap;
	text-overflow: ellipsis;
}
.small{
	font-size: 12px;
	font-weight: 100;
}
.popular{
	padding: 6px 0;
	width: 100%;
	background: #fff;
}
.popular .carsouel{
	position: relative;
	margin: 0 auto;
	margin-bottom: 6px;
	width: 95%;
	height:250px;
	box-shadow: 0px 2px 5px #ccc;
}
.popular .carsouel .show-pic{
	position: absolute;
	width:100%;
	height: 100%;
	text-align:center;
}
.popular .carsouel .show-pic img{
	width:60%;
	height: 100%;
}
.popular .carsouel .addprev{
	position: absolute;
	width: 100%;
	height: 20px;
	/*border: 1px solid #000;*/
}
.popular .carsouel .addprev .prev{
	float: left;
	width: 60px;
	height: 250px;
	background: linear-gradient(left,rgba(0,0,0,0.9),rgba(250,250,250,0.4));
}
.popular .carsouel .addprev .prev button{
	width: 60px;
	height: 250px;
	opacity: 0.3;
}
.popular .carsouel .addprev .add{
	float: right;
	width: 60px;
	height: 250px;
	background: linear-gradient(right,rgba(0,0,0,0.9),rgba(250,250,250,0.4));
}
.popular .carsouel .addprev .add button{
	width: 60px;
	height: 250px;
	opacity: 0.3;
}
.popular .carsouel .subscript{
	position: absolute;
	bottom: 10px;
	left: 50%;
	display: flex;
	justify-content:center;
	transform: translateX(-50%);
	width:200px;
	height: 14px;
	border-radius: 12px;
}
.popular .carsouel .subscript>li{
	display: flex;
	margin: 0 2px;
	margin-top:1px;
	width:12px;
	height: 12px;
	border-radius: 50%;
	background: #ddd;
}
.popular .carsouel .subscript li a{
	display: block;
	width:12px;
	height: 12px;
	border-radius: 50%;
	background: #f40;
}
.popular .hot-list{
	padding:4px 2px;
	width: 99%;
	height: 100%;
}
.popular .hot-list h3{
	color: #072;
	font-weight: 600;
}
.popular .hot-list .flow{
	position: relative;
	margin:8px 0px;
	width:96.6%;
	height: 80px;
	border: 1px solid #ddd;
	background: #fff;
}
.popular .hot-list .flow .rendering{
	float: left;
	margin:12px 0px;
	width:80px;
	height: 50px;
}
.popular .hot-list .flow .evaluation{
	float: right;
	margin:12px 0px;
	width: 75%;
	height: 50px;
}
.popular .hot-list .flow .evaluation .content{
	float: left;
	width:52%;
	height: 100%;
	border-right: 1px solid #ddd;
	font-size: 14px;
	font-weight: 600;
}
.popular .hot-list .flow .evaluation .content p{
	line-height:16px;
}
.popular .hot-list .flow .evaluation .score{
	float: right;
	width:46%;
	height: 100%;
	font-size: 12px;
}
.popular .hot-list .flow .evaluation .score em{
	float: right;
	transform: translateY(40%);
	margin-right: 4px;
}
.popular .hot-list .flow .evaluation .score .bar{
	position: relative;
	top: 50%;
	transform: translateY(-50%);
	width: 100px;
	height: 14px;
	background: #c8c8c8;
	box-shadow: 2px 2px 6px #ddd;
}
.popular .hot-list .flow .evaluation .score .bar .progress{
	position: absolute;
	z-index: 1;
	height: 15px;
	background: linear-gradient(left,#f78916,#e15201);
}

.popular .hot-list .flow .layer-pic{
	position: absolute;
	z-index: 0;
	width:100%;
	height: 100%;
	overflow: hidden;
}
.popular .hot-list .flow .layer-pic img{
	width:100%;
	height: 180px;
}
</style>
