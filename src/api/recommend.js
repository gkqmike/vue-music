import jsonp from 'common/js/jsonp'
import { commonParams, options } from 'api/config'
import axios from 'axios'
// import qs from 'qs'

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })
  return jsonp(url, data, options)
}

export function getDiscList() {
  const url = '/getDiscList'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  // axios.post(url, {
  //   headers: { 'content-type': 'application/x-www-form-urlencoded' },
  //   data: data
  // }).then((res) => {
  //   return Promise.resolve(res.data)
  // })
  return axios({
    url: url,
    method: 'GET',
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getDiscSongList(disstid) {
  const url = '/getDiscSongList'

  const data = Object.assign({}, commonParams, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    format: 'json'
  })

  return axios({
    url: url,
    method: 'GET',
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}