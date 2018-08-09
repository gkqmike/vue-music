<template>
  <transition name="slide">
    <music-list :bgImage="singer.avatar" :title="singer.name" :songs="songs"></music-list>
  </transition>
</template>

<script type='text/ecmascript-6'>
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
import { createSong } from 'common/js/song'
import { getSongList } from 'api/song'
import MusicList from 'components/music-list/music-list'

export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  created() {
    this._getSingerDetail()
  },
  methods: {
    _getSingerDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === 0) {
          let songmid = []
          res.data.list.forEach((item) => {
            songmid.push(item.musicData.songmid)
          })
          getSongList(songmid).then((resp) => {
            if (res.code === 0) {
              let purls = resp.url_mid.data.midurlinfo
              this.songs = this._normalizeSongs(res.data.list, purls)
            }
          })
        }
      })
    },
    _normalizeSongs(list, purls) {
      let ret = []
      list.forEach((item, index) => {
        let { musicData } = item
        let { purl } = purls[index]
        if (musicData.songid && musicData.albummid && purl) {
          ret.push(createSong(musicData, purl))
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
  @import "~common/stylus/variable"

  // .singer-detail
  //   position: fixed
  //   z-index: 100
  //   top: 0
  //   left: 0
  //   right: 0
  //   bottom: 0
  //   background: $color-background

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
