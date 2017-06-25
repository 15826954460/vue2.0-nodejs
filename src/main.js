// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'font-awesome/css/font-awesome.min.css'
import store from './store/index'
import VueQuillEditor from 'vue-quill-editor'

Vue.config.productionTip = false
Vue.prototype.$ajax = axios
Vue.use(VueQuillEditor)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
/* 自定义一个全局过滤器(进行时间转换) */
Vue.filter('formatTime', function (value) {
  let time = new Date()
  let date = time - Date.parse(value)
  if (date / (12 * 30 * 24 * 60 * 60 * 1000) > 1) {
    return Math.ceil(date / (12 * 30 * 24 * 60 * 60 * 1000)) + ' ' + '年前'
  } else if (date / (30 * 24 * 60 * 60 * 1000) > 1) {
    return parseInt(date / (30 * 24 * 60 * 60 * 1000)) + ' ' + '个月前'
  } else if (date / (24 * 60 * 60 * 1000) > 1) {
    return parseInt(date / (24 * 60 * 60 * 1000)) + ' ' + '天前'
  } else if (date / (60 * 60 * 1000) > 1) {
    return parseInt(date / (60 * 60 * 1000)) + ' ' + '小时前'
  } else {
    if (date / (60 * 1000) > 1) {
      return parseInt(date / (60 * 1000)) + ' ' + '分钟前'
    } else {
      return '刚刚'
    }
  }
})
