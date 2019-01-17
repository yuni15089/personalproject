<template>
  <div class="homes-bulid" v-if="showBox">
    <div class="home-province" v-for="(item,index) in areaAarry" :key="index" @mouseenter="seed">
      <h4>{{item.province}}</h4>
      <div class="home-city" v-for="(child,v) in item.city" :key="v" @click="transfer(child)">
          <span>{{child}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Homeview',
    props: ['message'],
    data () {
      return {
        box: '',
        showBox: true,
        areaAarry: [
        {province: '广东', city: ['广州', '惠州', '深圳', '东莞', '潮汕', '肇庆', '韶关']},
        {province: '广西', city: ['桂林', '柳州', '南宁', '梧州', '北海', '贵港', '贺州']},
        {province: '北京', city: ['东城', '西城', '朝阳', '丰台', '石景山', '海淀', '通州']},
        {province: '上海', city: ['黄浦', '徐汇', '长宁', '静安', '普陀', '虹口', '宝山']},
        {province: '山东', city: ['济南', '泰安', '威海', '日照', '济南', '滨州', '青海']}
        ]
      }
    },
    filters: {
    },
    methods: {
      seed: function () {
        this.showBox = !this.showBox
      },
      transfer: function (val) {
        this.box = val
        this.$emit('change-str', val)
        this.showBox = !this.showBox
        console.log(this.box)
      }
    }
  }
</script>
<style>
.homes-bulid{
    position: fixed;
    top: 40px;
    left: 0px;
    right: 0px;
    z-index: 10;
    margin: 0 auto;
    width: 98%;
    background: #f5f5f5;
    border-radius: 6px;
    box-shadow: 1px 2px 4px #000;
}
.homes-bulid .home-province{
  width: 100%;
  line-height: 24px;
}
.homes-bulid .home-province h4{
  background: #ebebeb;
  font-size: 14px;
  color: #000;
}
.homes-bulid .home-province .home-city{
  display: inline-block;
  margin:4px;
  padding:4px;
  width:60px;
  border:1px solid #ececec;
  border-radius: 10px;
  color: #000;
  font-size: 12px;
  text-align: center;
  background: #fff;
}
.homes-bulid .home-province .home-city:click{
  background: #072;
}
</style>
