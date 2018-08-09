<template>
  <div class="loading">
    <img width="24" height="24" src="./loading.gif">
    <p class="desc">{{text}}</p>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    text: {
      type: String,
      default: '正在载入...'
    }
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
 @import "~common/stylus/variable"  
  .loading
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
    text-align: center
    .desc
      line-height: 20px
      font-size: $font-size-small
      color: $color-text-l
</style>
