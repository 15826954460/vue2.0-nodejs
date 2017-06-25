<template>
  <div class="access_token_wrapper">
    <vheader></vheader>
    <p class="warm_prompt">温馨提示：如果想在该demo里（第三方）关联nodejs中文社区，请登录官网获取您自己的accessToken,否则您不可以在这里进行评论、收藏、创建主题等一系列操作......</p>
    <div class="access_token_content">
      <img :src="logo" alt="logo">
      <input type="password" placeholder="请输入accessToken" v-model="inputText" @input="onblur">
      <span class="access_login" @click="_login">登陆</span>
    </div>
    <p class="warning" v-show="isShowWarning">您的输入有误，请正确的accessToken</p>
  </div>
</template>
<script>
  import vheader from '../../components/header/header.vue'
  import axios from 'axios'
  export default {
    data () {
      return {
        logo: require('../../../static/img/nodejs.jpg'),
        inputText: '', // 输入框的值
        isShowWarning: false, // 提示信息
        accessToken: ''
      }
    },
    components: {
      vheader
    },
    methods: {
      _login () {
        if (this.inputText !== '') {
          axios({
            method: 'post',
            url: 'https://cnodejs.org/api/v1/accesstoken',
            data: {
              accesstoken: this.inputText
            }
          }).then((res) => {
            let userInfo = {}
            userInfo.userName = res.data.loginname
            userInfo.userPwd = '88888888'  // 设置默认密码
            userInfo.id = res.data.id
            window.localStorage.setItem('userInfo', JSON.stringify(userInfo)) // 将用户信息保存到本地
            window.sessionStorage.setItem('isLogin', true) // 登陆成功就更改登录状态
            this.$store.commit('setUserInfo', userInfo)
            this.$router.push({path: '/'})
            this.inputText = ''
          }).catch(() => {
            this.isShowWarning = true
          })
        }
      },
      onblur () {
        this.isShowWarning = false
      }
    }
  }
</script>
<style scoped>
  @import './accessToken.css';
</style>
