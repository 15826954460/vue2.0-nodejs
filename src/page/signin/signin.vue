<template>
  <div class="signin_wrapper">
    <vhead></vhead>
    <div class="signin_content" id="comment_media_wrapper">
      <div class="signin_content_left">
        <vheadertitle>
          <span v-show="isShowLoginBox" slot="isShowLoginBox">登陆</span>
          <span v-show="isShowGitHub" slot="isShowGitHub">注册新账号</span>
        </vheadertitle>
        <section class="login_wrapper" id="login_wrapper">
          <div class="login_box">
            <p v-show="showWarning" class="warning_info"><span id="warning_info"></span>
              <span class="fa fa-remove" @click="closeWarning"></span>
            </p>
            <div v-show="isShowGitHub" class="git"><span class="github_login" id="github_login">通过 GitHub 账号</span>
              <span class="register_new" @click="registerNewAccount">注册新账号</span>
            </div>
            <span v-show="isShowGitHub" class="other" id="other">或者</span>
            <div class="user user_name"
                 :class="{isShowLoginBox:isShowLoginBox}"><span class="label">用户名</span>
              <input type="text" v-model="inputUserName" placeholder="请输入用户名" maxlength="16"
                     @input="validationUserName">
              <span v-show="warningUsername" class="warning_user_name">以字母开头，长度6—16</span>
            </div>
            <div class="user user_pwd"><span class="label">密码</span>
              <input type="password"
                     v-model="inputPwd" placeholder="请输入密码" maxlength="16"
                     @input="validationPwd">
              <span v-show="warningPwd" class="warning_pwd">6-16数字/字母/下划线</span></div>
            <div class="btn_wrapper" v-show="isShowLoginBox">
              <span class="login_register comment_style"
                    v-show="loginAndRegister"
                    @click="_login">注册并登陆</span>
              <span class="login comment_style" v-show="login" @click="_login">登陆</span>
              <span class="login_by_github comment_style" @click="loginByGitHub">通过 GitHub 登陆</span>
              <span class="forget_pwd">忘记密码了？</span>
            </div>
            <div class="accessToken" v-show="">这里是模拟登陆效果，如果您想借此来关联node.js中文社区，请选择accessToken进行登陆</div>
            <span v-show="isShowGitHub" class="relevance_old_account" id="relevance_old_account"
                  @click="relevanceOldAccount">关联旧账号</span>
          </div>
        </section>
      </div>
      <div class="signin_content_right" id="comment_media_right">
        <vmsg :isShow="isShow" v-show="isShowLoginBox">
          <div slot="about" class="about_wrapper">
            <header class="title">关于</header>
            <div class="about_intro">
              <span>CNode: Node.js专业中文社区</span>
              <dl class="do_list">
                <dt>在这里你可以:</dt>
                <dd><i></i>像别人提出你遇到的问题</dd>
                <dd><i></i>帮助遇到问题的人</dd>
                <dd><i></i>分享自己的知识</dd>
                <dd><i></i>和其他人一起进步</dd>
              </dl>
            </div>
          </div>
        </vmsg>
      </div>
    </div>

  </div>
</template>
<script>
  import vhead from '../../components/header/header.vue'
  import vmsg from '../../components/message/message.vue'
  import vheadertitle from '../../components/headerTitle/headerTitle.vue'
  export default {
    data () {
      return {
        isShow: false, // 传给子组件的状态
        showWarning: false, // 显示提示信息
        isShowLoginBox: true, // 登陆框的显示
        isShowGitHub: false, // 通过github登陆
        warningUsername: false, // 显示用户名注册提示信息
        warningPwd: false, // 显示密码注册提示信息
        inputUserName: '', // 用户名
        inputPwd: '', // 用户密码
        loginAndRegister: true,
        login: false
      }
    },
    components: {
      vhead,
      vmsg,
      vheadertitle
    },
    mounted () {
      if (window.localStorage.getItem('userInfo') === null) {
        this.loginAndRegister = true
        this.login = false
      } else {
        this.loginAndRegister = false
        this.login = true
      }
    },
    methods: {
      _login () {
        if (this.inputUserName === '' || this.inputPwd === '') {
          this.showWarning = true
          document.getElementById('warning_info').innerHTML = '信息不完整。'
        } else {
          // 如果没有注册过，登陆的同时并注册
          if (window.localStorage.getItem('userInfo') === null) {
            if (this.warningUsername === false && this.warningPwd === false) {
              let userInfo = {}
              userInfo.userName = this.inputUserName
              userInfo.userPwd = this.inputPwd
              window.localStorage.setItem('userInfo', JSON.stringify(userInfo)) // 将用户信息保存到本地
              window.sessionStorage.setItem('isLogin', true) // 登陆成功就更改登录状态
              this.$store.commit('setUserInfo', userInfo)
              this.$router.push({path: '/'})
              this.inputUserName = ''
              this.inputPwd = ''
            }
          } else { // 如果已经登陆过，就直接获本地取用户信息，进行匹配
            let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
            if (this.inputUserName === userInfo.userName && this.inputPwd === userInfo.userPwd) {
              this.$store.commit('setUserInfo', userInfo)
              this.$router.push({path: '/'})
              window.sessionStorage.setItem('isLogin', true) // 登陆成功就更改登录状态
              this.inputUserName = ''
              this.inputPwd = ''
            } else {
              this.showWarning = true
              document.getElementById('warning_info').innerHTML = '您的输入有误请重新输入。'
            }
          }
        }
      },
      loginByGitHub () {
        this.isShowGitHub = true
        this.isShowLoginBox = false
        this.showWarning = false
        this.inputUserName = ''
        this.inputPwd = ''
      },
      closeWarning () {
        this.showWarning = false
      },
      registerNewAccount () {
        this.isShowGitHub = false
        this.isShowLoginBox = true
        this.showWarning = false
      },
      relevanceOldAccount () {
        alert('这部分小编确实不知道node.js官网是如何关联github账号的，所以无能为力了,还是老老实实的注册新账号得了')
      },
      validationUserName () { // 简单的验证用户名
        let reg = /^[a-zA-Z1-9]\w{5,15}$/
        this.showWarning = false
        if (!reg.test(this.inputUserName)) {
          this.warningUsername = true
        } else {
          this.warningUsername = false
        }
      },
      validationPwd () {  // 简单的验证密码
        this.showWarning = false
        let reg = /^\w{6,16}$/
        if (!reg.test(this.inputPwd)) {
          this.warningPwd = true
        } else {
          this.warningPwd = false
        }
      }
    }
  }
</script>
<style scoped>
  @import './signin.css';
</style>
