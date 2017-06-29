<template>
  <div class="page_list_wrapper">
    <ul class="page_list">
      <li @click="startControl()"><<</li>
      <li v-show="leftEllipsis && (pageIndex > 2)">...</li>
      <li v-for="(item, index) in totalPage"
          :class="{currentIndex: index === pageIndex}"
          v-show="pageVariable === 0 ? index < showPageNum : pageVariable === 1 ? index > showPageNum : index < (pageIndex + 3) && index > (pageIndex - 3)"
          @click="goToCurrentIndex(index)">{{item}}
      </li>
      <li v-show="rightEllipsis && pageIndex < (totalPage - 2)">...</li>
      <li @click="finallyControl()">>></li>
    </ul>
  </div>
</template>
<script>
  import $ from 'jquery'
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {}
    },
    computed: {
      ...mapGetters(['leftEllipsis', 'rightEllipsis', 'showPageNum', 'pageVariable', 'totalPage', 'pageIndex'])
    },
    methods: {
      startControl () { // 显示前几页
        this.$store.commit('setLeftEllipsis', false)
        this.$store.commit('setRightEllipsis', true)
        this.$store.commit('setShowPageNum', 5)
        this.$store.commit('setPage', 0)
        this.$store.commit('setPageVariable', 0)
//        this.backTop()
      },
      finallyControl () { // 显示最后几页
        let tab = window.sessionStorage.getItem('tab')
        if (tab === 'good') { // 这部分没有总页数数据，是手动模拟的总页数
          this.$store.commit('setTotalPage', 16)
          this.$store.commit('setPage', (this.totalPage - 1))
          this.$store.commit('setShowPageNum', (this.totalPage - 4))
        } else if (tab === 'share') {
          this.$store.commit('setTotalPage', 109)
          this.$store.commit('setPage', (this.totalPage - 1))
          this.$store.commit('setShowPageNum', (this.totalPage - 4))
        } else if (tab === 'ask') {
          this.$store.commit('setTotalPage', 211)
          this.$store.commit('setPage', (this.totalPage - 1))
          this.$store.commit('setShowPageNum', (this.totalPage - 4))
        } else if (tab === 'all' || tab === null) {
          this.$store.commit('setTotalPage', 537)
          this.$store.commit('setPage', (this.totalPage - 1))
          this.$store.commit('setShowPageNum', (this.totalPage - 4))
        }
        this.$store.commit('setLeftEllipsis', true)
        this.$store.commit('setRightEllipsis', false)
        this.$store.commit('setPageVariable', 1)
//        this.backTop()
      },
      goToCurrentIndex (index) { // 跳转到指定的页面
        if (index <= 2) {  // 如果当前页码小于3（下标为2）时的样式
          this.$store.commit('setLeftEllipsis', false)
          this.$store.commit('setRightEllipsis', true)
          this.$store.commit('setShowPageNum', 5)
          this.$store.commit('setPageVariable', 0)
        } else if (index > this.totalPage - 4) { // 如果当前页码大于后三页时的样式
          this.$store.commit('setLeftEllipsis', true)
          this.$store.commit('setRightEllipsis', false)
          this.$store.commit('setShowPageNum', this.totalPage - 4)
          this.$store.commit('setPageVariable', 2)
        } else { // 点击其它页码的样式
          this.$store.commit('setLeftEllipsis', true)
          this.$store.commit('setRightEllipsis', true)
          this.$store.commit('setPageVariable', 2)
        }
//        this.backTop()
        this.$store.commit('setPage', index)
      },
      backTop () { // 返回顶部动画
        $('html, body').animate({scrollTop: 0}, 200)
      }
    }
  }
</script>
<style scoped>
  @import './pageList.css';
</style>
