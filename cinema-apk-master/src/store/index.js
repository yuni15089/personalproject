import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'
import getters from './getter'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		count: 0,
		usersData:[],
		PurchasedGoods:[],
		cinemaDetails:[
			{cinema: '佳影国际影城',
			 details: ['退', '改签', '小吃', '折扣卡', '杜比全景声厅', '儿童厅', '4K厅', '4D厅'],
			 address:'黄埔区锐丰中心5号楼三层（地铁6号线香雪站F出口）',
			 distance:'500m',
			 offer: '开卡特惠，首单2张立减7元',
			 session: ['19:30','20:25','20:35']
			},
			{cinema: '中数华昇巨幕影城',
			 details: ['小吃', '折扣卡', '杜比全景声厅', 'CGS中国巨幕厅', '4K厅'],
			 address:'黄埔区锐丰中心5号楼三层（地铁6号线香雪站F出口）',
			 distance:'1km',
			 offer: '开卡特惠，首单2张立减6元',
			 session: ['20:30','20:25','21:35']
			},
			{cinema: '万达影城',
			 details: ['退', '改签', '小吃', '折扣卡', 'IMAX厅', '儿童厅', '4K厅', '4D厅'],
			 address:'黄埔区锐丰中心5号楼三层（地铁6号线香雪站F出口）',
			  distance:'2km',
			 offer: '开卡特惠，首单2张立减7元',
			 session: ['19:45','20:25','20:35']
			},
			{cinema: '烽禾影城',
			 details: ['退', '改签', '小吃', '折扣卡', '杜比全景声厅', '儿童厅', '4K厅', '4D厅'],
			 address:'黄埔区锐丰中心5号楼三层（地铁6号线香雪站F出口）',
			 distance:'5km',
			 offer: '开卡特惠，首单2张立减7元',
			 session: ['19:20','20:25','20:35']
			},
			{cinema: '左岸国际影城',
			 details: ['退', '改签', '小吃', '折扣卡', '杜比全景声厅', '儿童厅', '4K厅', '4D厅'],
			 address:'黄埔区锐丰中心5号楼三层（地铁6号线香雪站F出口）',
			 distance:'2.1km',
			 offer: '开卡特惠，首单2张立减7元',
			 session: ['18:30','20:25','20:35']
			}
		],
		theDayData:null,
		theDateData:null,
		indexsData:null,
		buyTickets:null,
		logining:false
	},
	mutations,
	getters
})
