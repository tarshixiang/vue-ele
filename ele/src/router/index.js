import Vue from 'vue'
import Router from 'vue-router'
import Shop from '@/components/shop/Shop'
import Rating from '@/components/rating/Rating'
import Seller from '@/components/seller/Seller'
import noFind from '@/components/noFind/noFind'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: '首页',
      redirect: '/shops'
    },
    {
      path: '/shops',
      name: '商品',
      component: Shop
    },
    {
      path: '/ratings',
      name: '评论',
      component: Rating
    },
    {
      path: '/sellers',
      name: '商家',
      component: Seller
    },
    {
      path: '*',
      component: noFind
    }
  ]
})
