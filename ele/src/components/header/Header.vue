<template>
  <div :seller='seller' class="header">
    <div class="content-wapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{ seller.description}} / {{seller.deliveryTime}}
        </div>
        <div v-if='seller.supports' class="supports">
          <span class="icon" :class='classMap[seller.supports[0].type]'></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>

      </div>

      <div class="support-count" @click="showDetail" v-if="seller.supports">
        <div class="count">{{ seller.supports.length }}个</div>
      </div>
    </div>

    <div class="bulletin-wapper" @click="showDetail" >
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{ seller.bulletin }}</span>
    </div>

    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="slide-fade">
      <div class="detail" v-show="detailShow" transition='fade'> 
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{ seller.name }}</h1>
            <div class="star-wrapper">
              <Star :size='48' :score='seller.score'></Star>  
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports" >
              <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <span class="text">{{ seller.supports[index].description }}</span>  
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{ seller.bulletin }}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="showDetail">x</div>
      </div>
    </transition>
    
  </div>
</template>

<script>
import axios from 'axios';
import Star from './../star/Star';
const ERR_OK = 0;
export default {
  data() {
    return {
      seller: {},
      detailShow: false ,
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  },
  mounted() {
    axios.get('/seller').then((response) => {
      response.data.errno === ERR_OK ? this.seller = response.data.data : null;
    })
  },
  methods:{
    showDetail() {
      this.detailShow = !this.detailShow ;
    }
  },
  components:{
    Star
  }


}
</script>

<style lang='scss' scoped>
@import './../../styles/mixin';
.header {
  color: white;
  position: relative;
  background: rgba(7, 17, 27, 0.5);
  overflow: hidden;
  .content-wapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;
    .avatar {
      display: inline-block;
      vertical-align: top;
      img {
        border-radius: 2px;
      }
    }
    .content {
      display: inline-block;
      font-size: 14px;
      margin-left: 16px;
      .title {
        margin: 2px 0 8px 0;
        .brand {
          vertical-align: top;
          width: 30px;
          height: 18px;
          display: inline-block;
          @include bg-image('brand');
        }
        .name {
          margin-left: 6px;
          font-size: 16px;
          line-height: 18px;
          font-weight: bold;
        }
      }
      .description {
        margin-bottom: 10px;
        line-height: 12px;
        font-size: 12px;
      }
      .supports {
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          &.decrease {
            @include bg-image('decrease_1');
          }
          &.discount {
            @include bg-image('discount_1')
          }
          &.guarantee {
            @include bg-image('guarantee_1')
          }
          &.invoice {
            @include bg-image('invoice_1')
          }
          &.special {
            @include bg-image('special_1')
          }
        }
        .text {
          font-size: 12px;
          line-height: 12px;
        }
      }
    }
    .support-count {
      position: absolute;
      right: 12px;
      bottom: 14px;
      line-height: 24px;
      padding: 0 8px;
      border-radius: 14px;
      height: 24px;
      background: rgba(0, 0, 0, 0.2);
      text-align: center;
      .count {
        font-size: 10px;
      }
    }
  }
  .bulletin-wapper {
    height: 28px;
    line-height: 28px;
    padding: 0 22px 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    background: rgba(0, 0, 0, 0.1);

    .bulletin-title {
      display: inline-block;
      width: 22px;
      height: 12px;
      margin-top: 8px;
      @include bg-image('bulletin');
      vertical-align: top;
    }
    .bulletin-text {
      font-size: 10px;
      font-weight: 200;
      margin-left: 4px;
      vertical-align: top;
    }
  }
  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px)
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to{
    transform: translateX(10px);
    opacity: 0;
  }
  .detail{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7, 17, 27, 0.8);
    .detail-wrapper{
      width: 100%;
      min-height: 100%;
      .detail-main{
        margin-top: 64px;
        padding-bottom: 64px;
        .name{
          line-height: 16px;
          text-align: center;
          font-size: 16px;
          font-weight: 700;
        }
        .star-wrapper{
          margin-top: 18px;
          padding: 2px 0;
          text-align: center;
        }
        .title{
          display: flex;
          width: 80%;
          margin: 10px auto 10px;
          .line{
            flex: 1;
            position: relative;
            top: -6px;
            border-bottom: 1px solid  rgba(255, 255, 255, 0.3);
          }
          .text{
            font-weight: 700;
            padding: 0 12px;
            font-size: 14px;
          }
        }
        .supports{
          width: 80%;
          margin: 20px auto;
          .support-item{
            padding: 0 12px;
            margin-bottom: 12px;
            font-size: 0;
            &:last-child{
              margin-bottom: 0;
            }
            .icon{
              display: inline-block;
              width: 16px;
              height: 16px;
              vertical-align: top;
              margin-right: 6px;
              &.decrease {
                @include bg-image('decrease_2');
              }
              &.discount {
                @include bg-image('discount_2')
              }
              &.guarantee {
                @include bg-image('guarantee_2')
              }
              &.invoice {
                @include bg-image('invoice_2')
              }
              &.special {
                @include bg-image('special_2')
              }
            }
            .text{
              line-height: 16px;
              font-size: 12px;
            }
          }
        }

        .bulletin{
          width: 80%;
          margin: 0 auto;
          .content{
            padding: 5px;
            line-height: 24px;
            font-size: 12px;
          }
        }

        
      }      
    }
    .detail-close{
      position: relative;
      width: 32px;
      height: 32px;
      margin: -64px auto 0 auto;
      clear: both;
      color: white;
      font-size: 32px;
      text-align: center;
      line-height: 32px;
    }
  }
}
</style>
