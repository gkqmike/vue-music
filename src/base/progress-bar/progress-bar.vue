<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
export default {
  props: {
    precent: {
      type: Number,
      default: 0
    }
  },
  created() {
    this.touch = {}
    this.barWidth = 0
  },
  methods: {
    progressClick(e) {
      // 获取dom距离屏幕左边的距离
      // const rect = this.$refs.progressBar.getBoundingClientRect()
      if (e.target.classList[0] === 'progress-btn-wrapper' || e.target.classList[0] === 'progress-btn') {
        return
      }
      this._offsetWidth(e.offsetX)
      this._triggerPercent()
    },
    touchStart(e) {
      this.touch.initiated = true
      this.touch.startX = e.touches[0].pageX
      this.touch.startOffsetWidth = this.$refs.progress.clientWidth
    },
    touchMove(e) {
      if (!this.touch.initiated) {
        return
      }
      const moveX = e.touches[0].pageX
      const deltaX = moveX - this.touch.startX
      const offsetWidth = Math.min(this.barWidth, Math.max(0, deltaX + this.touch.startOffsetWidth))
      this._offsetWidth(offsetWidth)
      const precent = offsetWidth / this.barWidth
      this.$emit('percentMove', precent)
    },
    touchEnd() {
      this.touch.initiated = false
      this._triggerPercent()
    },
    _offsetWidth(offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`
      this.$refs.progressBtn.style.left = `${offsetWidth - 8}px`
    },
    _triggerPercent() {
      const progressWidth = this.$refs.progress.clientWidth
      const precent = progressWidth / this.barWidth
      this.$emit('percentChange', precent)
    }
  },
  watch: {
    precent(newPrecent) {
      if (newPrecent >= 0 && !this.touch.initiated) {
        this.barWidth = this.$refs.progressBar.clientWidth - 16
        const offsetWidth = newPrecent * this.barWidth
        this._offsetWidth(offsetWidth)
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>
