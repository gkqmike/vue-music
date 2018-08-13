<template>
  <scroll class="suggest" ref="suggest" :pullUp="true" :beforeScorll="true" :data="result" @scrollToEnd="searchMore" @beforeScroll="listScroll">
    <ul class="suggest-list">
      <li class="suggest-item" v-for="item in result" @click="selectItem(item)">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <div class="loadingWapper">
        <loading v-show="hasMore" text=""></loading>
      </div>
    </ul>
  </scroll>
</template>

<script type='text/ecmascript-6'>
import { search } from 'api/search'
import { getSongList } from 'api/song'
import { createSong } from 'common/js/song'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import Singer from 'common/js/singer'
import { mapMutations, mapActions } from 'vuex'

const perpage = 20

export default {
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 1,
      result: [],
      hasMore: true
    }
  },
  methods: {
    refresh() {
      this.$refs.suggest.refresh()
    },
    search() {
      this.page = 1
      this.hasMore = true
      this.$refs.suggest.scrollTo(0, 0)
      this._genResult()
    },
    selectItem(item) {
      if (item.type === 'singer') {
        const singer = new Singer({
          id: item.singermid,
          name: item.singername
        })
        this.$router.push(`/search/${singer.id}`)
        this.setSinger(singer)
      } else {
        this.inserSong(item)
      }
      this.$emit('select')
    },
    searchMore() {
      if (!this.hasMore) {
        return
      }
      this.page++
      this._genResult()
    },
    getIconCls(item) {
      return item.type === 'singer' ? 'icon-mine' : 'icon-music'
    },
    getDisplayName(item) {
      if (item.type === 'singer') {
        return item.singername
      } else {
        return `${item.name}-${item.singer}`
      }
    },
    listScroll() {
      this.$emit('listScroll')
    },
    _genResult() {
      search(this.query, this.page, this.showSinger, perpage).then(res => {
        if (res.code === 0) {
          let songmid = []
          res.data.song.list.forEach((item) => {
            songmid.push(item.songmid)
          })
          getSongList(songmid).then((resp) => {
            if (resp.code === 0) {
              let purls = resp.url_mid.data.midurlinfo
              let ret = []
              if (res.data.zhida && res.data.zhida.singerid && this.page === 1) {
                ret.push({ ...res.data.zhida, type: 'singer' })
              }
              if (res.data.song) {
                ret = ret.concat(this._normalize(res.data.song.list, purls))
              }
              this.result = this.page === 1 ? ret : this.result.concat(ret)
              this._checkMore(res.data.song)
            }
          })
        }
      })
    },
    _normalize(list, purls) {
      let ret = []
      list.forEach((musicData, index) => {
        ret.push(createSong(musicData, purls[index].purl))
      })
      return ret
    },
    _checkMore(song) {
      if (!song.list.length || this.result.length >= song.totalnum) {
        this.hasMore = false
      }
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'inserSong'
    ])
  },
  watch: {
    query(newQuery) {
      this.search(newQuery)
    }
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
        .icon
          flex: 0 0 30px
          width: 30px
          [class^="icon-"]
            font-size: 14px
            color: $color-text-d
        .name
          flex: 1
          font-size: $font-size-medium
          color: $color-text-d
          overflow: hidden
          .text
            no-wrap()
      .loadingWapper
        height: 27px
        position: relative
</style>