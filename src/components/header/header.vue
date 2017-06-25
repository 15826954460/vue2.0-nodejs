<template>
  <div class="header_box">
    <header class="head_nav">
      <div class="container" id="container">
        <div class="logo_box">
          <img src="//o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt="">
        </div>
        <div class="search_box" id="search_box">
          <input type="text" class="search">
          <span class="fa fa-search"></span>
        </div>
        <div class="nav_list_box" id="nav_list_box">
          <ul v-show="!isShowLogin">
            <li v-for="(item, index) in noLogin"
                @click="goToNegativePage(index, item)"
                :class="{currentState:currentIndex === index}">{{item}}
            </li>
          </ul>
          <ul v-show="isShowLogin">
            <li v-for="(item, index) in Login"
                @click="goToNegativePage(index, item)"
                :class="{currentState:currentIndex === index}">{{item}}
            </li>
          </ul>
        </div>
      </div>
    </header>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        currentIndex: 0,
        noLogin: ['首页', '新手入门', 'API', '关于', 'accessToken', '登陆'], // 未登陆时头部导航栏
        Login: ['首页', '未读消息', '新手入门', 'API', '关于', '设置', '退出'], // 登陆后头部导航栏
        isShowLogin: false // 是否显示登陆后的信息
      }
    },
    mounted () {
      let win = window.sessionStorage
      win.getItem('isShowLogin') === null ? this.isShowLogin = false : win.getItem('isShowLogin') === 'false' ? this.isShowLogin = false : this.isShowLogin = true
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    methods: {
      goToNegativePage (index, item) {
        this.currentIndex = index
        switch (item) {
          case '首页':
            this.$router.push({path: '/'})
            break
          case '未读消息':
            this.$router.push({path: '/mymessage'})
            break
          case '新手入门':
            alert('新手入门，API，以及关于这部分的接口没有提供，暂时没写，臣妾做不到啊！！！')
            break
          case 'API':
            alert('新手入门，API，以及关于这部分的接口没有提供，暂时没写，臣妾做不到啊！！！')
            break
          case '关于':
            alert('新手入门，API，以及关于这部分的接口没有提供，暂时没写，臣妾做不到啊！！！')
            break
          case '设置':
            this.$router.push({path: '/setting'})
            break
          case '退出':
            this.isShowLogin = false
            sessionStorage.setItem('isShowLogin', this.isShowLogin)
            this.$store.commit('setUserInfo', null)
            this.$router.push({path: '/'})
            break
          case 'accessToken':
            this.$router.push({path: '/accessToken'})
            break
          case '登陆':
            this.$router.push({path: '/signin'})
            break
        }
      }
    },
    watch: {
      userInfo: function () {
        if (this.userInfo === null) {
          this.isShowLogin = false
          sessionStorage.setItem('isShowLogin', this.isShowLogin)
        } else {
          this.isShowLogin = true
          sessionStorage.setItem('isShowLogin', this.isShowLogin)
        }
      }
    }
  }
</script>
<style scoped>
  @import "./header.css";
</style>
