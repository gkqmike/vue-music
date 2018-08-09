<template>
  <transition name="slide">
    <music-list :title="this.disc.dissname" :bgImage="this.disc.imgurl" :songs="songs"></music-list>
  </transition>
</template>

<script type='text/ecmascript-6'>
import { mapGetters } from 'vuex'
import MusicList from 'components/music-list/music-list'
import { getDiscSongList } from 'api/recommend'
import { getSongList } from 'api/song'
import { createSong } from 'common/js/song'

export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    ...mapGetters([
      'disc'
    ])
  },
  created() {
    if (!this.disc.dissid) {
      this.$router.push('/recommend')
      return
    }
    this._getSongList(this.disc.dissid)
  },
  methods: {
    _getSongList(disstid) {
      getDiscSongList(disstid).then(res => {
        if (res.code === 0) {
          let songmid = []
          res.cdlist[0].songlist.forEach((item) => {
            songmid.push(item.songmid)
          })
          getSongList(songmid).then((resp) => {
            if (resp.code === 0) {
              let purls = resp.url_mid.data.midurlinfo
              this.songs = this._normalizeSongs(res.cdlist[0].songlist, purls)
            }
          })
        }
      })
    },
    _normalizeSongs(list, purls) {
      let ret = []
      list.forEach((musicData, index) => {
        if (musicData.songmid && musicData.albummid) {
          if (purls[index]) {
            let purl = purls[index].purl
            ret.push(createSong(musicData, purl))
          }
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

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
