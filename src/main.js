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
  let date = new Date()
  let [currentYear, currentMouth, currentDay, currentHour, currentMinutes] = [date.getFullYear(), date.getMonth(), date.getDay(), date.getHours(), date.getMinutes()]
  let getDate = new Date(Date.parse(value))
  let [getDateYear, getDateMouth, getDateDay, getDateHour, getDateMinutes] = [getDate.getFullYear(), getDate.getMonth(), getDate.getDay(), getDate.getHours(), getDate.getMinutes()]
  if ((currentYear - getDateYear) >= 1) {
    return (currentYear - getDateYear) + ' ' + '年前'
  } else if ((currentMouth - getDateMouth) >= 1) {
    return (currentMouth - getDateMouth) + ' ' + '个月前'
  } else if ((currentDay - getDateDay) >= 1) {
    return (currentDay - getDateDay) + ' ' + '天前'
  } else if ((currentHour - getDateHour) >= 1) {
    return (currentHour - getDateHour) + ' ' + '小时前'
  } else {
    if ((currentMinutes - getDateMinutes) >= 1) {
      return (currentMinutes - getDateMinutes) + ' ' + '分钟前'
    } else {
      return '刚刚'
    }
  }
})
