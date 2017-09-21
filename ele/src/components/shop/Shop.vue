<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper" ref='menuWrapper'>
        <ul>
          <li v-for="(item, index) in goods" class="menu-item current"  :key="index" @click="selectMenu(index,$event)" >
            <span class="text">
              <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
            </span>
          </li>
        </ul>
      </div>  
      <div class="foods-wrapper" ref='foodsWrapper'>
        <ul>
          <li v-for='(item, index) in goods' :key="index" class="food-list food-list-hook">
            <h2 class="title">{{ item.name }}</h2>
            <ul>
              <li v-for="(food, index) in item.foods" :key="index" class="food-item" @click="selectFood(food,$event)" >
                <div class="icon">
                  <img :src="food.icon" width="57" height="57" alt="">
                </div>
                <div class="content">
                  <h3 class="name">{{ food.name }}</h3>
                  <p v-show="food.description" class="desc">{{ food.description }}</p>
                  <div class="extra">
                    <span class="count">月售 {{ food.sellCount }}份</span>
                    <span>好评率 {{ food.rating }}%</span>
                  </div>
                  <div class="price">
                    <span class="now">¥ {{ food.price }}</span>
                    <span class="old" v-show="food.oldPrice">¥ {{ food.oldPrice}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <Food :food='selectedFood' ref='food'></Food>  
  </div>
  
</template>

<script>
import axios from 'axios';
import BScroll from 'better-scroll';
import Food from './../food/Food';
const ERR_OK = 0 ;
export default {
  data() {
    return {
      goods: [],
      classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    }
  },
  components:{
    Food
  },
  mounted() {
    axios.get('/goods').then((response) => {
      if(response.data.errno === ERR_OK){
        this.goods = response.data.data;
        this.$nextTick(() => {
          this._initScroll();
          this._calculateHeight();
        });
      }
    }).catch((error) => {
    })
  },
  methods:{
   
   _initScroll() {
      this.meunScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });

      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      });

      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight() {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu(index, event) {
      if (!event._constructed) {
        return;
      }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
      let el = foodList[index];
      this.foodsScroll.scrollToElement(el, 300);
    },
    selectFood(food, event) {
      if (!event._constructed) {
        return;
      }
      this.selectedFood = food;
      // this.$refs.food.show();
    },
    currentIndex() {
      console.log(111)
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          console.log(i)
          return i;
        }
      }
      return 0;
    },
  }
}
</script>

<style lang="scss" scoped>
  @import './../../styles/mixin';
  .goods{
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    display: flex;
    overflow: hidden;
    .menu-wrapper{
      flex: 0 0 80px;
      width: 80px;
      background: #f3f5f7;
      .menu-item{
        display: table;
        height: 54px;
        width: 56px;
        padding: 0 12px;
        &.current{
          position: relative;
          z-index: 10;
          margin-top: -1px;
          background: #fff;
          font-weight: 700;
        }
        .icon{
          display: inline-block;
          width: 16px;
          height: 16px;
          vertical-align: top;
          margin-right: 2px;
          &.decrease {
            @include bg-image('decrease_3');
          }
          &.discount {
            @include bg-image('discount_3')
          }
          &.guarantee {
            @include bg-image('guarantee_3')
          }
          &.invoice {
            @include bg-image('invoice_3')
          }
          &.special {
            @include bg-image('special_3')
          }
        }
        .text{
          @include borderBottom;
          display: table-cell;
          width: 100%;
          vertical-align: middle;
          font-size: 12px;
          line-height: 16px;
           &:last-child{
             @include borderNone;
          }
        }
      }
    }

    .foods-wrapper{
      flex: 1;
      .title{
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background: #f3f5f7;
      }
      .food-item{
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        @include borderBottom;
        &:last-child{
          @include borderNone;
          margin-bottom: 0;
        }
        .icon{
          flex: 0 0 57px;
          margin-right: 10px;
        }
        .content{
          flex: 1;
          .name{
            margin: 2px 0 8px 0;
            line-height: 14px;
            height: 14px;
            font-size: 14px;
            color: rgb(7, 17, 27);
            font-weight: 700;
          }
          .desc,.extra{
            line-height: 10px;
            font-size: 10px;
            max-width: 200px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            color: rgb(147, 153, 159);
          }
          .desc{
            margin-bottom: 10px;
          }
          .extra{
            .count{
              margin-right: 12px;
            }
          }
          .price{
            font-weight: 700;
            line-height: 24px;
            .now{
              margin-right: 8px;
              font-size: 14px;
              color: rgb(240, 20, 20);
            }
            .old{
              text-decoration: line-through;
              font-size: 10px;
              line-height: 10px;
            }
          }
        }
      }
    }
  }

</style>
