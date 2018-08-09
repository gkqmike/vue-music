<template>
  <scroll class="listview" @scroll="position" :data="data" :listen-scroll="listenScroll" :probe-type="probeType" ref="listview">
    <ul>
      <li class="list-group" v-for="group in data" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li class="list-group-item" v-for="item in group.items" @click="selectItem(item)">
            <img class="avatar" v-lazy="item.avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart="shortcutTouchStart" @touchmove.stop.prevent="shortcutTouchMove">
      <ul>
        <li class="item" v-for="(item,index) in shortcutList" :data-index="index" :class="{'current':currentIndex===index}">
          {{item}}
        </li>
      </ul>
    </div>
    <div class="list-fixed" v-show="fixedTitle" ref="fixed">
      <h1 class="fixed-title">{{fixedTitle}}</h1>
    </div>
    <slot></slot>
  </scroll>
</template>

<script type='text/ecmascript-6'>
import Scroll from 'base/scroll/scroll'
import { getData } from 'common/js/dom'

export default {
  created() {
    this.listenScroll = true
    this.probeType = 3
    this.listHeight = []
  },
  data() {
    return {
      currentIndex: 0,
      scrollY: -1,
      diff: 0
    }
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  computed: {
    shortcutList() {
      return this.data.map((item) => {
        return item.title.substr(0, 1)
      })
    },
    fixedTitle() {
      if (this.scrollY < 0) {
        return
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('select', item)
    },
    shortcutTouchStart(e) {
      this.anchorIndex = Number(getData(e.target, 'index'))
      this.y1 = e.touches[0].pageY
      this._scrollTo(this.anchorIndex)
    },
    shortcutTouchMove(e) {
      this.y2 = e.touches[0].pageY
      let delda = (this.y2 - this.y1) / 18 | 0
      this._scrollTo(this.anchorIndex + delda)
    },
    position(pos) {
      this.scrollY = -pos.y
    },
    refresh() {
      this.$refs.listview.refresh()
    },
    _scrollTo(index) {
      index = index > 0 ? (index > 22 ? 22 : index) : 0
      this.currentIndex = index
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index])
    },
    _calculateHeight() {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      list.forEach((item, index) => {
        height += item.clientHeight
        this.listHeight.push(height)
      })
    }
  },
  watch: {
    data: function() {
      setTimeout(() => {
        this.$nextTick(function() {
          this._calculateHeight()
        })
      }, 20)
    },
    scrollY: function(newY) {
      if (newY < 0) {
        this.currentIndex = 0
        return
      }
      for (let i = 0; i < this.listHeight.length; i++) {
        let heightTop = this.listHeight[i]
        let heightBottom = this.listHeight[i + 1]
        if (newY >= heightTop && newY < heightBottom) {
          this.currentIndex = i
          this.diff = heightBottom - newY
          let translateY = this.diff < 30 ? (this.diff - 30) : 0
          if (this.translateY === translateY) {
            return
          }
          this.translateY = translateY
          this.$refs.fixed.style.transform = `translateY(${translateY}px)`
          return
        }
      }
    }
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~common/stylus/variable"

  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
