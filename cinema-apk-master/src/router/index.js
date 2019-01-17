import Vue from 'vue'
import Router from 'vue-router'
import SearchView from '../components/SearchView'
import HotView from '../components/HotView'
import HoodsView from '../components/HoodsView'
import Selectiontype from '../components/Selectiontype/Selectiontype'
import particular from '../components/particular/particular'
import information from '../components/registered/information'
import PurchaseDetails from'../components/PurchaseDetails/PurchaseDetails'

Vue.use(Router)

export default new Router({
  routes: [
   // {path: '/', name: 'Homeview', component: Homeview},
   {path: '/search', name: 'SearchView', component: SearchView, children: [{path: 'hoods', name: 'HoodsView', components: {hoods: HoodsView}}]},
   {path: '/', name: 'HotView', component: HotView},
   {path: '/purchasedetails', name: 'PurchaseDetails', component: PurchaseDetails},
   {path: '/selectiontypeseat', name: 'Selectiontype', component: Selectiontype},
   {path: '/particular', name: 'particular', component: particular,children:[{path:'infor',name:'information',components:{infor:information}}]}
]
})
