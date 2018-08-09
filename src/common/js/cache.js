const SEARCH_MAX_LEN = 15
const PLAY_MAX_LEN = 200
const FAVORITE_MAX_LEN = 200

function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
  return arr
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveSearch(query) {
  const searchHistory = localStorage.getItem('__search__')
  let searches = searchHistory ? JSON.parse(searchHistory) : []
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  localStorage.setItem('__search__', JSON.stringify(searches))
  return searches
}

export function loadSearch() {
  const searchHistory = localStorage.getItem('__search__')
  let searches = searchHistory ? JSON.parse(searchHistory) : []
  return searches
}

export function deleteSearch(query) {
  const searchHistory = localStorage.getItem('__search__')
  let searches = searchHistory ? JSON.parse(searchHistory) : []
  deleteFromArray(searches, (item) => {
    return item === query
  })
  localStorage.setItem('__search__', JSON.stringify(searches))
  return searches
}

export function clearSearch() {
  localStorage.removeItem('__search__')
  return []
}

export function savePlay(song) {
  const playHistory = localStorage.getItem('__play__')
  let playes = playHistory ? JSON.parse(playHistory) : []
  insertArray(playes, song, (item) => {
    return item.id === song.id
  }, PLAY_MAX_LEN)
  localStorage.setItem('__play__', JSON.stringify(playes))
  return playes
}

export function loadPlay() {
  const playHistory = localStorage.getItem('__play__')
  let playes = playHistory ? JSON.parse(playHistory) : []
  return playes
}

export function saveFavorite(song) {
  let songs = localStorage.getItem('__favorite__')
  songs = songs ? JSON.parse(songs) : []
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LEN)
  localStorage.setItem('__favorite__', JSON.stringify(songs))
  return songs
}

export function deleteFavorite(song) {
  let songs = localStorage.getItem('__favorite__')
  songs = songs ? JSON.parse(songs) : []
  deleteFromArray(songs, (item) => {
    return item.id === song.id
  })
  localStorage.setItem('__favorite__', JSON.stringify(songs))
  return songs
}

export function loadFavorite() {
  let songs = localStorage.getItem('__favorite__')
  songs = songs ? JSON.parse(songs) : []
  return songs
}