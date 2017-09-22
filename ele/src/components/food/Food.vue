<template>
  <div class="food" v-show="showFlag"  transition='move' ref="food">
    <div class="food-content">
      <div class="img-header">
        <img :src="food.image" alt="">
        <div class="back" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="content">
        <h2 class="title">{{food.name}}</h2>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}&</span>
        </div>
        <div class="price">
          <span class="now">¥{{food.price}}</span>
          <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
        </div>
        <Split v-show="food.info"></Split> 
        <div class="info" v-show="food.info">
          <h2 class="title">商品信息</h2>
          <p class="text">{{food.info}}</p>
        </div>
        <Split></Split>
        <div class="rating">
        <h1 class="title">商品评价</h1>
        <rating-select :select-type="selectType" :only-content="onlyContent" :desc="desc"
                      :ratings="food.ratings"></rating-select>
        <div class="rating-wrapper">
          <ul v-show="food.ratings && food.ratings.length">
            <li v-show="needShow(rating.rateType,rating.text)" v-for="(rating, index) in food.ratings"
                class="rating-item" :key="index">
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img class="avatar" width="12" height="12" :src="rating.avatar">
              </div>
              <div class="time">{{rating.rateTime }}</div>
              <p class="text">
                <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
              </p>
            </li>
          </ul>
          <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import Split from './../common/Split';
  import RatingSelect from './../common/RatingSelect'; 
  const ALL = 2 ;
export default {
  props:['food'],
  components:{
    Split,
    RatingSelect
  },
  data() {
    return {
      showFlag: false,
      selectType: ALL,
      onlyContent: true,
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  computed:{
    
  },
  methods:{
    show() {
      this.showFlag = true;
      this.selectType = ALL;
      this.onlyContent = true;
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.food, {
            click: true
          });
        } else {
          this.scroll.refresh();
        }
      });
    },
    hide(){
      this.showFlag = false ;
    },
    needShow(type, text) {
      if (this.onlyContent && !text) {
        return false;
      }
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    }
  },
  events: {
      'ratingtype.select'(type) {
        console.log(type,'=========')
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      'content.toggle'(onlyContent) {
        this.onlyContent = onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
}
</script>


 <style lang="scss" scoped>
  @import './../../styles/mixin.scss';
  .food{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 46px;
    z-index: 30;
    background: #fff;
    width: 100%;   
      &.move-transition{
        transition: all 0.2s linear;
        transform: translate3d(0, 0, 0);
      }
      &.move-enter, &.move-leave{
        transform: translate3d(0, 0, 0);
      }
      .img-header{
        position: relative;
        widows: 100%;
        height: 0;
        padding-top: 100%;
        img{
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }
        .back{
          position: absolute;
          left: 20px;
          top: 20px;
          .icon-arrow_lift{
            display: block;
            color: #fff;
          }
        }
      }
  }
</style>
