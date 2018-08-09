const mutations = {
  'SET_SINGER'(state, singer) {
    state.singer = singer
  },
  'SET_PLAYING_STATE'(state, flag) {
    state.playing = flag
  },
  'SET_FULL_SCREEN'(state, flag) {
    state.fullScreen = flag
  },
  'SET_PLAYLIST'(state, list) {
    state.playlist = list
  },
  'SET_SEQUENCE_LIST'(state, list) {
    state.sequenceList = list
  },
  'SET_PLAY_MODE'(state, mode) {
    state.mode = mode
  },
  'SET_CURRENT_INDEX'(state, index) {
    state.currentIndex = index
  },
  'SET_DISC'(state, disc) {
    state.disc = disc
  },
  'SET_TOP_LIST'(state, topList) {
    state.topList = topList
  },
  'SET_SEARCH_HISTORY'(state, history) {
    state.searchHistory = history
  },
  'SET_PLAY_HISTORY'(state, history) {
    state.playHistory = history
  },
  'SET_FAVORITE_LIST'(state, list) {
    state.favoriteList = list
  }
}

export default mutations