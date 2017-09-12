<template>
  <div class="star" :class='starType'>
    <span v-for="(item, index) in list " :key="index" class="star-item" :class='item'></span>
  </div>
</template>

<script>
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';
export default {
  data() {
    return {
      porps: ['size', 'score']
    }
  },
  computed: {
    starType() {
      return 'star-' + this.size;
    },
    list() {
      let result= [];
      let score = Math.round(this.score) ;
      
    }
  }
}
</script>

<style lang="scss" scoped>
@import './../../style/mixin.scss';
.star {
  font-size: 0;
  .star-item {
    display: inline-block;
    background-repeat: no-repeat;
    &.star-48 {
      .star-item {
        width: 20px;
        height: 20px;
        margin-right: 22px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          @include bg-image('star48_on');
        }
        &.half {
          @include bg-image('star48_half');
        }
        &.off {
          @include bg-image('star48_off');
        }
      }
    }
    &.star-36 {
      .star-item {
        width: 15px;
        height: 15px;
        margin-right: 16px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          @include bg-image('star36_on');
        }
        &.half {
          @include bg-image('star36_half');
        }
        &.off {
          @include bg-image('star36_off');
        }
      }
    }
    &.star-24 {
      .star-item {
        width: 10px;
        height: 10px;
        margin-right: 3px;
        &:last-child {
          margin-right: 0;
        }
        &.on {
          @include bg-image('star24_on');
        }
        &.half {
          @include bg-image('star24_half');
        }
        &.off {
          @include bg-image('star24_off');
        }
      }
    }
  }
}
</style>

