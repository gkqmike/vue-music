import { shuffle, findIndex } from 'common/js/util'
import { playMode } from 'common/js/config'
import { saveSearch, deleteSearch, clearSearch, savePlay, saveFavorite, deleteFavorite } from 'common/js/cache'

export const selectPlay = function ({ commit, state }, { list, index }) {
  commit('SET_SEQUENCE_LIST', list)
  let playList = list
  if (state.mode === playMode.random) {
    playList = shuffle(list)
    index = findIndex(playList, list[index])
  }
  commit('SET_PLAYLIST', playList)
  commit('SET_CURRENT_INDEX', index)
  commit('SET_FULL_SCREEN', true)
  commit('SET_PLAYING_STATE', true)
}

export const randomPlay = function ({ commit }, { list }) {
  commit('SET_SEQUENCE_LIST', list)
  const playList = shuffle(list)
  commit('SET_PLAYLIST', playList)
  commit('SET_CURRENT_INDEX', 0)
  commit('SET_FULL_SCREEN', true)
  commit('SET_PLAYING_STATE', true)
  commit('SET_PLAY_MODE', playMode.random)
}

export const inserSong = function ({ commit, state }, song) {
  let playList = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let currentSong = playList[currentIndex]
  let fpIndex = findIndex(playList, song)
  // splice是插入在index之前，所以需要++，插入到index之后
  currentIndex++
  playList.splice(currentIndex, 0, song)
  if (fpIndex > -1) {
    if (currentIndex >= fpIndex) {
      playList.splice(fpIndex, 1)
      currentIndex--
    } else {
      playList.splice(fpIndex + 1, 1)
    }
  }

  let currentSIndex = findIndex(sequenceList, currentSong) + 1
  let fsIndex = findIndex(sequenceList, song)
  sequenceList.splice(currentSIndex, 0, song)
  if (fsIndex > -1) {
    if (currentSIndex >= fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit('SET_PLAYLIST', playList)
  commit('SET_SEQUENCE_LIST', sequenceList)
  commit('SET_CURRENT_INDEX', currentIndex)
  commit('SET_FULL_SCREEN', true)
  commit('SET_PLAYING_STATE', true)
}

export const saveSearchHistory = function ({ commit }, query) {
  commit('SET_SEARCH_HISTORY', saveSearch(query))
}

export const deleteSearchHistory = function ({ commit }, query) {
  commit('SET_SEARCH_HISTORY', deleteSearch(query))
}

export const clearSearchHistory = function ({ commit }) {
  commit('SET_SEARCH_HISTORY', clearSearch())
}

export const deleteSong = function ({ commit, state }, song) {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let pIndex = findIndex(playlist, song)
  playlist.splice(pIndex, 1)
  let sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)
  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }

  commit('SET_PLAYLIST', playlist)
  commit('SET_SEQUENCE_LIST', sequenceList)
  commit('SET_CURRENT_INDEX', currentIndex)

  const playingState = playlist.length > 0
  commit('SET_PLAYING_STATE', playingState)
}

export const deleteSongList = function ({ commit }) {
  commit('SET_CURRENT_INDEX', -1)
  commit('SET_PLAYLIST', [])
  commit('SET_SEQUENCE_LIST', [])
  commit('SET_PLAYING_STATE', false)
}

export const savePlayHistory = function ({commit}, song) {
  commit('SET_PLAY_HISTORY', savePlay(song))
}

export const saveFavoriteList = function ({ commit }, song) {
  commit('SET_FAVORITE_LIST', saveFavorite(song))
}

export const deleteFavoriteList = function ({ commit }, song) {
  commit('SET_FAVORITE_LIST', deleteFavorite(song))
}