<template>
  <div class="aside">
    <aside class="back_to_top" id="back_to_top" @click="backTop()">
      回到顶部


    </aside>
  </div>
</template>
<script>
  import $ from 'jquery'
  export default {
    mounted () {
      this.scroll() // 页面加载完整就调用鼠标滚动事件
    },
    methods: {
      scroll () { // 鼠标滚动事件
        window.onscroll = () => {
          // 获取滚动高度
          let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
          if (scrollTop > 300) {
            $('.back_to_top').css({opacity: 1})
          } else {
            $('.back_to_top').css({opacity: 0})
          }
        }
      },
      backTop () { // 返回顶部过度动画
        $('html, body').animate({scrollTop: 0}, 500)
      }
    }
  }
</script>
<style scoped>
  @import './aside.css';
</style>
