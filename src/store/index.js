/**
 * Created by lele on 2017/6/9.
 */
import * as getters from './getters'
import * as mutations from './mutations'
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  id: null, // 当前的用户id
  loginName: null, // 用户名
  leftEllipsis: false, // 左省略号
  rightEllipsis: true, // 右省略号
  pageIndex: 0, // 默认显示第一页
  pageVariable: 0, // 显示前几页或者后几页
  showPageNum: 5, // 默认显示五个分页
  totalPage: 537, // 默认总页码数
  userInfo: null, // 用户基本信息
  collect: null,  // 收藏
  noCollect: null, // 不收藏
  showEdit: false, // 默认不显示编辑
  num: null
}
export default new Vuex.Store({
  state,
  modules: {},
  getters,
  mutations
})
