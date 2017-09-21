<template>
  <div class="food" v-show="showFlag">
    <div class="food-content">
      <div class="img-header">
        img
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['food'],
  data() {
    return {
      showFlag: false 
    }
  },
  mounted() {
    console.log(this.food,'-' )
    JSON.parse(JSON.stringify(this.food)).length < 1 ? this.showFlag = true : this.showFlag = false;
  },
  momputed(){
    
  }
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
  }
</style>
