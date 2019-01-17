 <template>
	<div class="selection">
		<div class="purchase-title">
			<router-link to="/search/hoods" class="title-a">&lt;</router-link>
			<h3>{{buyTickets.filmName}}</h3>
		</div>
		<div class="film-name-selection">
			<div class="film-title">{{buyTickets.films}}</div>
			<p class="film-start">{{buyTickets.time}}</p>
		</div>
		<div class="d-watch">
			<p>3D眼镜需自备或到影院购买</p>
		</div>
		<div class="cinema">
			<h2 class="title-wrap"></h2>
			<div class="btn-wrapper">
				<div class="btn-buy" @click="buySeat">选定座位</div>
				<div class="btn-buy" @click="resetSeat">重置座位</div>
				<div class="selecting-btn" v-for="(item,index) in smartChooseMaxNum" :key="index">
					<div class="btn-buy smart" @click="smartChoose(index+1)">
						推荐选座{{index+1}}人
					</div>
				</div>
			</div>
			<div class="seat-wrapper">
				<div class="illustration">
					<div class="illustration-img-wrapper unselected-seat">
          			</div>
					<span class="illustration-word">可选</span>
					<div class="illustration-img-wrapper selected-seat">
         			 </div>
					<span class="illustration-word">已选</span>
					<div class="illustration-img-wrapper bought-seat">
          			</div>
					<span class="illustration-word">不可选</span>
				</div>
				<div class="screen-big">
					3号激光厅大银幕
				</div>
				<div class="screen-center-t">
					银幕中央
					<div class="mid-line"></div>
				</div>
				<div class="inner-seat-wrapper" ref="innerSeatWrapper">
					<div v-for="row in seatRow" :key="row">
						<div v-for="col in seatCol"
                 v-if="seatArray.length > 0"
                 class="seat"
                 :style="{width:seatSize +'px',height:seatSize +'px'}"
                 :key="col">
							<div class="inner-seat" 
								@click="handleChooseSeat(row - 1, col - 1)"
 								v-if="seatArray[row - 1][col - 1] !== -1"
								:class="seatArray[row - 1][col - 1] === 2 ? 'bought-seat' : (seatArray[row - 1][col - 1] === 1 ? 'selected-seat' : 'unselected-seat')"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class=""></div>
	</div>
</template>
<script>
	import {mapState, mapMutations} from 'vuex'
	export default {
		name: 'Selectiontype',
		data () {
			return {
				// 影院座位的二维数组,-1为非座位，0为未购座位，1为已选座位(绿色),2为已购座位(红色)
				seatArray: [],
				// 影院座位行数
				seatRow: 10,
				// 影院座位列数
				seatCol: 20,
				// 座位尺寸
				seatSize: '',
				// 推荐选座最大数量
				smartChooseMaxNum: 5,
				// 记录当下选定的位置
				rowNum:[],
				//电影城名称
				cinemaName:null,
				//电影名
				film:null,
				// 开始播放时间
				time:null
			}
		},
		created () {
			this.changeCinemaName()
		},
		computed: {
			...mapState(['buyTickets'])
		},
		methods: {
			changeCinemaName: function () {
				this.cinemaName = this.$route.params.filmName
				this.film = this.$route.params.films
				this.time = this.$route.params.time
			},


			searchSeatByDirection: function (fromRow, toRow, num) {
				/*
				* 推荐座位规则
				* (1)初始状态从座位行数的一半处的后一排的中间开始向左右分别搜索，取离中间最近的，如果满足条件，
				*    记录下该结果离座位中轴线的距离，后排搜索完成后取距离最小的那个结果座位最终结果，优先向后排进行搜索，
				*    后排都没有才往前排搜，前排逻辑同上
				*
				* (2)只考虑并排且连续的座位，不能不在一排或者一排中间有分隔
				*
				* */

				/*
				* 保存当前方向搜索结果的数组,元素是对象,result是结果数组，offset代表与中轴线的偏移距离
				* {
				*   result:Array([x,y])
				*   offset:Number
				* }
				*
				*/
				let currentDirectionSearchResult = []

				let largeRow = fromRow > toRow ? fromRow : toRow
				let smallRow = fromRow > toRow ? toRow : fromRow

				for (let i = smallRow; i <= largeRow; i++) {
				// 每一排的搜索,找出该排里中轴线最近的一组座位
				let tempRowResult = []
				let minDistanceToMidLine = Infinity
				for (let j = 0; j <= this.seatCol - num; j++) {
				// 如果有合法位置
				if (this.checkRowSeatContinusAndEmpty(i, j, j + num - 1)) {
				// 计算该组位置距离中轴线的距离:该组位置的中间位置到中轴线的距离
				let resultMidPos = parseInt((j + num / 2), 10)
				let distance = Math.abs(parseInt(this.seatCol / 2) - resultMidPos)
				// 如果距离较短则更新
				if (distance < minDistanceToMidLine) {
					minDistanceToMidLine = distance
				 // 该行的最终结果
					tempRowResult = this.generateRowResult(i, j, j + num - 1)
				}
				}
				}
				// 保存该行的最终结果
				currentDirectionSearchResult.push({
				result: tempRowResult,
				offset: minDistanceToMidLine
				})
				}

				// 处理后排的搜索结果:找到距离中轴线最短的一个
				// 注意这里的逻辑需要区分前后排，对于后排是从前往后，前排则是从后往前找
				let isBackDir = fromRow < toRow
				let finalReuslt = []
				let minDistanceToMid = Infinity
				if (isBackDir) {
				// 后排情况,从前往后
				currentDirectionSearchResult.forEach((item)=> {
				if (item.offset < minDistanceToMid) {
				finalReuslt = item.result
				minDistanceToMid = item.offset
				}
				})
				} else {
				// 前排情况，从后往前找
				currentDirectionSearchResult.reverse().forEach( (item) =>{
				if (item.offset < minDistanceToMid) {
				finalReuslt = item.result
				minDistanceToMid = item.offset
				}
				})
				}

				// 直接返回结果
				return finalReuslt
				},
						// 推荐选座,参数是推荐座位数目
			smartChoose: function (num) {
				// 找到影院座位水平垂直中间位置的后一排
				let rowStart = parseInt((this.seatRow - 1) / 2, 10) + 1
				// 先从中间排往后排搜索
				let backResult = this.searchSeatByDirection(rowStart, this.seatRow-1, num)
				if (backResult.length > 0) {
				this.chooseSeat(backResult)
				return
				}
				// 再从中间排往前排搜索
				let forwardResult = this.searchSeatByDirection(rowStart-1, 0, num)
				if (forwardResult.length > 0) {
				this.chooseSeat(forwardResult)
				return
				} // 提示用户无合法位置可选
				alert('无合法位置可选!')
			},
			checkRowSeatContinusAndEmpty: function (rowNum, startPos, endPos) {
				let isValid = true
				for (let i = startPos; i <= endPos; i++) {
					if (this.seatArray[rowNum][i] !== 0) {
						isValid = false
						break
				}
				}
				return isValid
			}, // 辅助函数：返回每一行的某个合理位置的座位数组
			generateRowResult: function (row, startPos, endPos) {
				let result = []
				for (let i = startPos; i <= endPos; i++) {
				result.push([row, i])
				}
				return result
			}, // 辅助函数:智能推荐的选座操作
			chooseSeat: function (result) {
				let oldArray = this.seatArray.slice();
				for (let i = 0; i < result.length; i++) { //选定座位
				oldArray[result[i][0]][result[i][1]] = 1
				}
				this.seatArray = oldArray
			}, // 重置座位
			resetSeat: function () {
				// 将所有座位的值变为0
				let oldArray = this.seatArray.slice();
				for (let i = 0; i < this.seatRow; i++){
				for (let j= 0; j < this.seatCol; j++){
				if (oldArray[i][j] !== -1) {
				oldArray[i][j] = 0
				}
				}
				}
				this.seatArray = oldArray
			}, // 选定且购买座位
			buySeat: function () { // 遍历seatArray，将值为1的座位变为2
				let oldArray = this.seatArray.slice()
				for (let i = 0; i < this.seatRow; i++) {
				for (let j = 0; j < this.seatCol; j++) {
				if (oldArray[i][j] === 1) {
				oldArray[i][j] = 2
				this.rowNum.push([i+1+'排',j+'座'])
				}
				}
				}
				this.seatArray = oldArray;
				console.log(this.rowNum)
			}, // 处理座位选择逻辑
			handleChooseSeat: function (row, col) {
				let seatValue = this.seatArray[row][col]
				let newArray = this.seatArray
// 如果是已购座位，直接返回
				if (seatValue === 2) return
// 如果是已选座位点击后变未选
				if (seatValue === 1) {
				 newArray[row][col] = 0
				} else if (seatValue === 0) {
				 newArray[row][col] = 1
				}
// 必须整体更新二维数组，Vue无法检测到数组某一项更新,必须slice复制一个数组才行
				this.seatArray = newArray.slice()
			},
// 初始座位数组
			initSeatArray: function () {
				let seatArray = Array(this.seatRow).fill(0).map(()=> Array(this.seatCol).fill(0))
				this.seatArray = seatArray
				this.seatSize = this.$refs.innerSeatWrapper
				? parseInt(parseInt(window.getComputedStyle(this.$refs.innerSeatWrapper).width, 10) / this.seatCol, 10)
				: 0
				// 初始化不是座位的地方
				this.initNonSeatPlace()
			}, // 初始化不是座位的地方
			initNonSeatPlace: function () {
				for (let i = 0; i < 9; i++) {
				 this.seatArray[i][0] = -1
				}
				for (let i = 0; i < 8; i++) {
				 this.seatArray[i][this.seatArray[0].length - 1] = -1
				 this.seatArray[i][this.seatArray[0].length - 2] = -1
				}
				for (let i = 0; i < 9; i++) {
				 this.seatArray[i][this.seatArray[0].length - 3] = -1
				}
				for (let i = 0; i < this.seatArray[0].length; i++) {
					this.seatArray[2][i] = -1
				}
			}
		},
			mounted: function () {
				this.initSeatArray(10, 20)
			}
	}
</script>
<style>
.selection{
	position: absolute;
	top: 0px;
	z-index: 9900;
	width:100%;
	box-sizing: border-box;
	font-size: 12px;
	background: #fff;
}
.selection .film-name-selection{
	margin-top:30px;
	width: 100%;
	height: 60px;
	border-bottom: 1px solid #ccc;
}
.selection .film-name-selection .film-title{
	margin-left:20px;
	font-size: 14px;
	line-height:40px;
}
.selection .cinema{
	background: #eee;
	height: 100%;
}
.d-watch{
	padding-left: 20px;
	font-size: 12px;
	color: #444;
	line-height:30px;
	width: 100%;
	height: 30px;
	border-bottom: 1px solid #ccc;
}
.film-start{
	font-size: 12px;
	color: #666;
	margin-left: 30px;
}
.selection .purchase-title{
	position: fixed;
	top: 0px;
	z-index: 3;
	width: 100%;
	height: 30px;
	background: rgba(0,0,0,0.6);	
}
.selection .purchase-title h3{
	display: block;
	position: absolute;
	top: 0px;
	text-align: center;
	width: 100%;
	color: #fff;
	line-height:30px;
}
.selection .cinema .title-wrap{
	text-align: center;
}
.selection .cinema .seat-wrapper{
	position: relative;
	top: 10px;
	margin:0 auto;
	height: 400px;
	width: 350px;
	/*border:1px solid #000;*/
}
.selection .cinema .seat-wrapper .screen-big{
	margin: 0 auto;
	height:30px;
	width:140px;
	background-color: #e3e3e3;
	border-radius: 0 0 30px 30px;
	color: #585858;
	line-height: 30px;
	text-align: center;
}
.selection .cinema .seat-wrapper .inner-seat-wrapper{
	position: absolute;
    top:60px;
    bottom:0;
    width:100%;
    box-sizing: border-box;
}
.selecting-btn{
	width: 300px;
	margin:0px auto;
}
.seat{
	float:left;
	display: flex;
	justify-content: center;
	align-items: center;
  }
.inner-seat{
	width:80%;
	height:80%;
	cursor: pointer;
  }
.screen-center-t{
	position: absolute;
	left:50%;
	transform: translateX(-50%);
	padding:5px;
	font-size: 13px;
	border-radius: 5px;
	top:30px;
	background-color: #f6f6f6;
	color: #636363;
	border:1px solid #b1b1b1;
  }
.mid-line{
	position: absolute;
	left:50%;
	transform: translateX(-50%);
	top:100%;
	width:1px;
	height:200px;
	border-left:1px dashed #919191;
}
.btn-wrapper{
	padding:20px 0px;
	margin: 0px auto;
	width:350px;
	height:30px;
	text-align: center;
	}
.btn-buy{
	height: 16px;
	line-height: 16px;
	font-size: 12px;
	border-radius: 5px;
	padding:0 2px;
	background-color: #ffa349;
	color: #ffffff;
	display: inline-block;
	cursor: pointer;
	margin-right: 2px;
	margin-bottom:4px;
	}
.smart{
	float: left;
	background-color: #39ac6a;
	}
.illustration{
	position: absolute;
	left:0;
	top:10px;
	height:16px;
	width:100px;
  }
.illustration-img-wrapper{
	width:17px;
	height:17px;
	position: relative;
	top:30%;
	display: inline-block;
	transform: translateY(-50%);
	}
.illustration-word{
	display: inline-block;
	line-height: 12px;
	font-size: 12px;
	position: relative;
	top:-10px;
	}
.selected-seat{
	background: url('../../assets/selected.png') center center no-repeat;
	background-size: 100% 100%;
	}
.unselected-seat{
	background: url('../../assets/unselected.png') center center no-repeat;
	background-size: 100% 100%;
	}
.bought-seat{
	background: url('../../assets/bought.png') center center no-repeat;
	background-size: 100% 100%;
	}
</style>
