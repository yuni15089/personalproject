import * as types from './mutation-types'

export default {
	[types.CHANGE_USERS_ARRAY] (state,Data) {
		state.usersData.push(Data)
	},
	[types.EXTRACT_DATE] (state,obj) {
		let day = parseInt(new Date().getDate())
			// 获取当前日期
		let nowDate = new Date()
		// 获取当前时间
		let worship = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
		// 声明数组装载 礼拜
		let neatDate = null
		let neatMonth = null
		let neatDay = null
		let dataDay = []
		let dataDate = []
		let dataAll = {}
		for (var i = 0; i < 7; i++) {
			nowDate.setDate(day + i)
			// 当前时间 与未来七天
				neatDate = nowDate.getDate()
				// 日期
				neatMonth = nowDate.getMonth()
				// 月份
				neatDay = nowDate.getDay()
				// 七天的礼拜
				if (!neatMonth) { // 1月为0月
					neatMonth = 1
				}
				// 七个日期 push进数组
				dataDate.push(`${neatMonth}月${neatDate}日`)
				if (i == 0) {
					dataDay.push('今天')
				} else if (i == 1) {
					dataDay.push('明天')
				} else {
					dataDay.push(worship[neatDay])
				}
			}
			state.theDayData = dataDay
			state.theDateData = dataDate
		},
	[types.INDEX_PROPS] (state, index) {
		state.indexsData = index
	},
	[types.BUY_TICKETS] (state,dataTickets) {
		state.buyTickets = dataTickets
	},
	[types.LOGIN_ING_TRUE] (state,boolean) {
		state.logining = true
	}
}