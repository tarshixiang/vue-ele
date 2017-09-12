<template>
  <div id="app">
    <Vheader></Vheader>
    <div class="tabs border-1px">
      <div class="item-tab">
        <router-link to='/shops'>商品</router-link>
      </div>
      <div class="item-tab">
        <router-link to='/ratings'>评论</router-link>
      </div>
      <div class="item-tab">
        <router-link to='/sellers' >商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import Vheader from './components/header/Header'
import axios from 'axios'
export default {
  name: 'app',
  components: {
    Vheader,
  }
}
</script>

<style lang="scss" >
@import './styles/index.scss' ;
.tabs {
  @include borderBottom;
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  .item-tab {
    flex: 1;
    text-align: center;
    a {
      display: block;
      font-size: 14px;
      color: rgb(77, 85, 93);
      &.router-link-active{
        color: rgb(240, 20, 20)
      }
    }
  }
}
</style>


