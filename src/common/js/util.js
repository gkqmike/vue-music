export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = random(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function findIndex(list, li) {
  return list.findIndex((item) => {
    return item.id === li.id
  })
}

export function debounce(func, delay, ture) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}