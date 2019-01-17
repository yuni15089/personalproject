<template>
 <div id="app">
  <div class="region-search">
    <div class="region-cd" @click="showCity">
      <p>{{area}}
        <i class="icon-location"></i>
      </p>
    </div>
    <div class="search-cd" @click="invest">
      <span v-if="investigationShow">点击返回界面</span>
       <i class="icon-search"></i>
    </div>
  </div>
    <div class="home">
      <investigation v-if="investigationShow"></investigation>
      <home-view v-if="showDown" :message="area" @change-str="listen"></home-view>
      <keep-alive>
        <router-view :dynamic="douban" :area="area" v-if="!investigationShow" @popular-info-data="popularInfoData" :popularinfo="popularInfo"/>
      </keep-alive> 
      
    </div>
      <ul class="bottom-nav" v-if="!investigationShow">
        <li>
            <router-link to="/" class="cd-nav">
              <p class="icon-home"></p>
            首页
          </router-link>
        </li>
        <li>
            <router-link to="/search" class="cd-nav">
              <p class="icon-play"></p>
            热映
          </router-link>
        </li>
        <li>
            <router-link to="/particular" class="cd-nav">
               <p class="icon-user"></p>
            我的
          </router-link>
        </li>
      </ul>
 </div>
</template>

<script>
  import Hotview from './components/HotView'
  import BScroll from 'better-scroll'
  import Homeview from './components/Homeview'
  import Investigation from './components/Investigation'
export default {
  name: 'App',
  // img:[require('./img/bg-header.jpg'),require('./img/Am01.jpg')],
  components: {
    'home-view': Homeview,
    'investigation': Investigation
  },
  data () {
  return {
    douban: {},
    area: '广州',
    showDown: false,
    areaTitle: {},
    investigationShow: false,
    popularInfo: null,
    subjectData:{},
    dataindexs:null
    }
  },
  methods: {
      invest: function () {
        this.investigationShow = !this.investigationShow
      },
      listen: function (data) {
       this.area = data
      },
      showCity () {
        this.showDown = !this.showDown
      },
      popularInfoData: function (val) {
        this.popularInfo = val
        setTimeout(function () {
        this.popularInfo = null
       }, 2000)
      },
      relative: function (val) {
        this.dataindexs = val
      }
  },
  created () {
    this.axios.get('/api/area', {
      params: {
      city: this.area,
      start: 0,
      count: 20

    }})
    .then(res => {
    res = res.data
    let result = JSON.parse(res)
    this.douban = result.subjects
  })

    this.axios.get('/api/subject', {
      params: {
        id:26942674
      }})
      .then(res => {
      res = res.data
      let result = JSON.parse(res)
      console.log(result)
      this.subjectData = result.subjects
      })
}
}
</script>

<style>
a{
  color: #000;
}
#app {
  position: relative;
}
.region-search{
  width: 100%;
  height: 40px;
  background: #072;
}
.region-search .region-cd{
  float: left;
  font-size: 14px;
  line-height: 40px;
  color: #fff;
  text-align: center;
  width: 80px;
  height: 40px;
}
.region-search .search-cd{
  float: right;
  margin-top: 4px;
  margin-right:10px;
  font-size: 22px;
  line-height:34px;
  text-align:right;
  width:100px;
  height: 30px;
  color: #ddd;
  box-shadow: 0px 2px 10px #000;
  border-radius: 10px;
}
.region-search .search-cd span{
  float: left;
  margin-left: 16px;
  font-size: 12px;
}
.region-search .search-cd i{
  margin-right:4px;
}
/*搜索 区域*/
  .home{
    display: inline-block;
    width:100%;
    height: 100%;
    background-color: #fff;
    overflow: auto;
    margin-bottom: 50px;
  }
  .bottom-nav{
    display: flex;
    position: fixed;
    z-index: 100;
    bottom: 0px;
    width: 100%;
    height: 50px;
    background: #fff;
    border-top:1px solid #ddd;
  }
  .bottom-nav>li{
    float: left;
    margin-top:2px;
    flex: 1;
    text-align:center;
  }
  .bottom-nav>li>a>p{
    font-size: 24px;
    color: #072;
  }
  .bottom-nav>li>a{
    font-size: 14px;
  }
</style>
