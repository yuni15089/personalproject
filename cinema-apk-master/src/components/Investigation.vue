<template>
	<div class="investigation">
		<div class="film-search">
			<div class="search-fl">
				<span class="icon-search"></span>
				<input type="text" placeholder="搜电影" v-model="strs">
			</div>
			<p @click="inputHandel">搜索</p>
		</div>
		<div class="hot-search">
			<p v-if="showP">{{searchTitle}}</p>
			<p>热门搜索</p>
			}
		</div>
		<div class="result-push">
			<ResultView :searchData="searchData" :searchTitle="searchTitle"></ResultView>
		</div>
	</div>
</template>
<script>
	import ResultView from './search/ResultView'
	export default {
		name: 'Investigation',
		data () {
			return {
				searchData: {},
				searchTitle: {},
				strs: '',
				showP: false,
				songdata:{}
			}
		},
		components: {
			ResultView
		},
		methods: {
			inputHandel: function () {
					// this.showP = !this.showP
					this.axios.get('/api/search', {
						params: {
						q: this.strs,
						apikey: '0b2bdeda43b5688921839c8ecb20399b',
						start: 0,
						count: 20
					}})
					.then(res => {
						res = res.data
						let result = JSON.parse(res)
						this.searchData = result.subjects
						this.searchTitle = result.title
					}) 
					console.log(this.searchData)
					console.log(this.searchTitle)
			}
		}
	}
</script>
<style>
.investigation{
	width: 100%;
}
.investigation .film-search{
	display: inline-block;
	position: relative;
	width:100%;
	height: 50px;
	background: #ebebeb;
}
.investigation .film-search .search-fl{
	float: left;
	margin-top:10px;
	margin-left:  10px;
	width:285px;
	height: 30px;
	background: #fff;
}
.investigation .film-search .search-fl input{
	float: right;
	margin-top:4px;
	width: 250px;
	height: 20px;
	border:0px;
	outline: none;
}
.investigation .film-search .search-fl span{
	display: inline-block;
	margin-left: 6px;
	margin-top:5px;
	color: #ccc;
}
.investigation .film-search p{
	float: right;
	width:80px;
	height: 50px;
	text-align: center;
	line-height: 50px;
	color: #f40;
}
.investigation .hot-search{
	/*width: 100%;*/
	height: 70px;
	background: #f5f5f5;
	line-height:70px;
	overflow: hidden;
}
.investigation .hot-search p{
	margin-left: 10px;
}
</style>
