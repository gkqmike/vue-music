<template>
  <div>
    <music-list :title="topList.topTitle" :bgImage="bgImage" :songs="songs" :rank="true"></music-list>
  </div>
</template>

<script type='text/ecmascript-6'>
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { getMusicList } from 'api/rank'
import { createSong } from 'common/js/song'
import { getSongList } from 'api/song'

export default {
  data() {
    return {
      songs: []
    }
  },
  created() {
    if (!this.topList.id) {
      this.$router.push('/rank')
    }
    this._getMusicList()
  },
  computed: {
    bgImage() {
      if (this.songs.length) {
        return this.songs[0].image
      }
    },
    ...mapGetters([
      'topList'
    ])
  },
  methods: {
    _getMusicList() {
      getMusicList(this.topList.id).then(res => {
        if (res.code === 0) {
          let songmids = []
          res.songlist.forEach(item => {
            songmids.push(item.data.songmid)
          })
          getSongList(songmids).then(resp => {
            if (resp.code === 0) {
              let purls = resp.url_mid.data.midurlinfo
              this.songs = this._normalize(res.songlist, purls)
            }
          })
        }
      })
    },
    _normalize(list, purls) {
      let ret = []
      list.forEach((musicData, index) => {
        if (purls[index]) {
          let purl = purls[index].purl
          ret.push(createSong(musicData.data, purl))
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
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
