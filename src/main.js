import 'babel-polyfill'
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VuelazyLoad from 'vue-lazyload'
import store from './store/store.js'
import 'common/stylus/index.styl'

Vue.config.productionTip = false
fastclick.attach(document.body)

Vue.use(VuelazyLoad, {
  loading: require('common/image/default.png')
})
Vue.use(Vuex)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
