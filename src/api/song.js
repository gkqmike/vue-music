/* eslint-disable */
import axios from 'axios'
import qs from 'qs'
import { options } from 'api/config'
import { commonParams } from './config'

export function getSongList(songmid) {
  const url = '/getSongList'

  const params = {
    "comm": {
      "g_tk": 5381,
      "uin": 0,
      "format": "json",
      "inCharset": "utf-8",
      "outCharset": "utf-8",
      "notice": 0,
      "platform": "h5",
      "needNewCode": 1
    },
    "url_mid": {
      "module": "vkey.GetVkeyServer",
      "method": "CgiGetVkey",
      "param": {
        "guid": "8575506922",
        "songmid": songmid,
        "songtype": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        "uin": "0",
        "loginflag": 0,
        "platform": "23"
      }
    }
  }

  return axios.post(url, {
    data: params
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getLyric(mid) {
  const url = '/lyric'

  const data = Object.assign({}, commonParams, {
    songmid: mid,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}