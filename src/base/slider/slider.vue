<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item,index) in dots" :class="{'active': currentIndex === index}"></span>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import { addClass } from 'common/js/dom'
import BScroll from 'better-scroll'
export default {
  name: 'slider',
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 4000
    }
  },
  data() {
    return {
      dots: [],
      currentIndex: 0
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth()
      this._initSlider()

      if (this.autoPlay) {
        this._play()
      }
    }, 20)

    window.addEventListener('resize', () => {
      if (this.slider) {
        this._setSliderWidth(true)
        this.slider.refresh()
      }
    })
  },
  deactivated() {
    clearTimeout(this.timer)
  },
  beforeDestroy() {
    clearTimeout(this.timer)
  },
  methods: {
    _setSliderWidth(isResize = false) {
      let sliderWidth = this.$refs.slider.clientWidth
      let children = this.$refs.sliderGroup.children
      let width = 0
      for (let i = 0; i < children.length; i++) {
        let child = children[i]
        addClass(child, 'slider-item')

        child.style.width = sliderWidth + 'px'
        width += sliderWidth
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth
      }

      this.$refs.sliderGroup.style.width = width + 'px'
      // 轮播点的个数
      this.dots = new Array(children.length)
    },
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: true,
        snap: {
          loop: this.loop,
          threshold: 0.3,
          speed: 400
        },
        click: true
      })

      this.slider.on('scrollEnd', () => {
        this.currentIndex = this.slider.getCurrentPage().pageX
        if (this.autoPlay) {
          clearTimeout(this.timer)
          this._play()
        }
      })
    },
    _play() {
      this.timer = setTimeout(() => {
        this.slider.next()
      }, this.interval)
    }
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
 
</style>
