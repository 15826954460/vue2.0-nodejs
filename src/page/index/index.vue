<template>

  <div class="index_wrapper">
    <div class="index_top">
      <vhead></vhead>
    </div>
    <div class="index_content" id="comment_media_wrapper">
      <div class="index_left">
        <header class="index_header">
          <ul class="index_nav">
            <li v-for="(item, index) in indexNav">
                <span :class="{span_active:spanIndex === index}"
                      @click="toNegativeTab(index, item)">{{item}}</span>
            </li>
          </ul>
        </header>
        <ul class="topic_content" v-if="topicsData">
          <li v-for="(item, index) in topicsData">
            <div class="author" @click="showDetailAboutAthor(item.author.loginname)">
              <img :src="item.author.avatar_url" alt="用户图像" :title="item.author.loginname">
            </div>
            <span class="count_wrapper">
              <span class="reply_count">{{item.reply_count}}</span> / <span
              class="visit_count">{{item.visit_count}}</span>
             </span>

            <div class="topic_title">
              <span class="top" v-if="item.top">置顶</span>
              <span class="good" v-else-if="item.good">精华</span>
              <span class="ask" v-else-if="item.tab === 'ask'">问答</span>
              <span class="ask" v-else-if="item.tab === 'share'">分享</span>
              <span v-else></span>
              <a class="title" title="item.title" :class="{ask_color:item.tab === 'ask'}"
                 @click="getTopicsDetail(item.id, 0, item.author.loginname)">{{item.title}}</a>
            </div>

            <div class="send_time">
              <!--这里没有提供对应的接口，图片就不展示了-->
              <!--<div class="img_wrapper"><img src="" alt=""></div>-->
              <span class="time">{{item.last_reply_at | formatTime}}</span>
            </div>
          </li>
        </ul>
        <!--分页码-->
        <vpage></vpage>
      </div>
      <div class="index_right" id="comment_media_right">
        <vmsg :isShow="isShow">

          <div class="author_wrapper" slot="login_name" v-if="selfDetail !== null && isLogin">
            <header class="title">个人信息</header>
            <div class="author_info">
              <div class="author_img">
                <img src="https://avatars3.githubusercontent.com/u/25141652?v=3&s=120"
                     alt="博主图像"
                     :title="selfDetail.loginname"
                     @click="showDetailAboutAthor(selfDetail.loginname)"
                >
                <span class="login_name">{{selfDetail.loginname}}</span>
              </div>
              <p class="visit_count"><span>积分：</span><span>{{selfDetail.score}}</span></p>
              <p class="motto"></p>
            </div>
          </div>

          <div class="about_login_register" slot="login" v-show="!isLogin">
            <header>CNode: Node.jd专业中文社区</header>
            <p>您可以 <router-link to="/signin" class="login">登陆</router-link>，也可以</p>
            <router-link to="/accessToken" class="login_btn">通过 accessToken 登陆</router-link>
          </div>

          <div class="release_topic_wrapper" v-show="isLogin" slot="releaseTopic">
            <router-link to="/createTopic" tag="span" class="release_topic" @click="">
              发布话题
            </router-link>
          </div>
        </vmsg>
      </div>
    </div>
    <vaside></vaside>
  </div>

</template>

<script>
  import axios from 'axios'
  import vmsg from '../../components/message/message.vue'
  import vpage from '../../components/pageList/pageList.vue'
  import vhead from '../../components/header/header.vue'
  import vaside from '../../components/aside/aside.vue'
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        indexNav: [ // tab
          '全部', '精华', '分享', '问答', '招聘', '客户端测试'
        ],
        spanIndex: 0, // 默认高亮第一个tab标签
        topicsData: '', // 主题数据
        pageNum: null,  // 将page显示个数复原为初始个数
        isShow: true, // 传递给子组件的信息
        isLogin: false, // 用户是否登陆
        UserInfo: null, // 用户信息
        selfDetail: null
      }
    },
    components: { // 组件
      vmsg,
      vpage,
      vhead,
      vaside
    },
    computed: {
      ...mapGetters(['leftEllipsis', 'rightEllipsis', 'pageIndex', 'showPageNum', 'pageVariable', 'totalPage', 'userInfo'])
    },
    mounted () { // 页面刷新时，根据当前的tab,spanIndex以及之前用户的操作状态来加载数据加载数据
      let win = window.sessionStorage
      let tab = win.getItem('tab')
      this.spanIndex = win.getItem('spanIndex') === null ? 0 : parseInt(win.getItem('spanIndex'))
      let page = win.getItem('page') === null ? 0 : parseInt(win.getItem('page'))
      this.$store.commit('setPage', page)
      if (!win.getItem('pageVariable')) {
        this.$store.commit('setPageVariable', 0)
      } else {
        this.$store.commit('setPageVariable', parseInt(win.getItem('pageVariable')))
      }
      let showPageNum = win.getItem('showPageNum') === null ? 5 : parseInt(win.getItem('showPageNum'))
      this.$store.commit('setShowPageNum', showPageNum)
      let totalPage = win.getItem('totalPage') === null ? 537 : parseInt(win.getItem('totalPage'))
      this.$store.commit('setTotalPage', totalPage)
      if (win.getItem('leftEllipsis') === 'true') {
        this.$store.commit('setLeftEllipsis', true)
      } else {
        this.$store.commit('setLeftEllipsis', false)
      }
      if (win.getItem('rightEllipsis') === 'false') {
        this.$store.commit('setRightEllipsis', false)
      } else {
        this.$store.commit('setRightEllipsis', true)
      }
      if (tab !== null && tab !== 'all') {
        this.$nextTick(() => { // 请求主题首页接口,默认请求第一页
          axios.get('https://cnodejs.org/api/v1/topics', {
            params: {
              page: this.pageIndex + 1,
              tab: tab
            }
          }).then((res) => {
            this.topicsData = res.data.data
          })
        })
      } else {
        this.$nextTick(() => { // 请求主题首页接口,默认请求第一页
          axios.get('https://cnodejs.org/api/v1/topics', {
            params: {
              page: this.page
            }
          }).then((res) => {
            this.topicsData = res.data.data
          })
        })
      }
      // 页面一加载就判断用户是否登陆
      if (window.localStorage.getItem('userInfo') !== null && window.sessionStorage.getItem('isShowLogin') === 'true') {
        win.getItem('isLogin') === null ? this.isLogin = false : this.isLogin = true
        // 每次刷新压面让vuex中的状态和本地的保持一致
        this.UserInfo = JSON.parse(window.localStorage.getItem('userInfo'))
        this.$store.commit('setUserInfo', JSON.parse(window.localStorage.getItem('userInfo')))
      } else {
        this.UserInfo = null
        this.isLogin = false
      }
      // 请求自己的用户信息
      this.getSelfInfo()
    },
    methods: {
      toNegativeTab (index, item) { // 显示当前tab内容 ,招聘和客户端测试没有接口
        let tab = (item === '精华' ? 'good' : item === '分享' ? 'share' : item === '问答' ? 'ask' : item === '全部' ? 'all' : 'noApi')
        window.sessionStorage.setItem('tab', tab)  // 供页面刷新时判断的tab类型
        // 进行分页栏的状态初始化
        this.$store.commit('setPage', 0)
        this.$store.commit('setShowPageNum', 5)
        this.$store.commit('setPageVariable', 0)
        this.$store.commit('setLeftEllipsis', false)
        this.$store.commit('setRightEllipsis', true)
        if (tab === 'all') {
          this.spanIndex = index
          window.sessionStorage.setItem('spanIndex', this.spanIndex)
          this.$nextTick(() => { // 请求主题首页接口,默认请求第一页
            axios.get('https://cnodejs.org/api/v1/topics').then((res) => {
              this.topicsData = res.data.data
            })
          })
        } else if (tab === 'noApi') { // 针对于没有接口的api弹出提示信息
          alert('招聘，客户端测试的接口没有提供，暂时没法做，请见谅')
        } else { // 其他的就请求对应的数据
          this.spanIndex = index
          window.sessionStorage.setItem('spanIndex', this.spanIndex)
          this.$nextTick(() => { // 请求对应的tab数据接口,默认显示第一页
            axios.get('https://cnodejs.org/api/v1/topics', {
              params: {
                tab: tab,
                page: this.page
              }
            }).then((res) => {
              this.topicsData = res.data.data
            })
          })
        }
      },
      getTopicsDetail (id, isToBottom, loginname) { // 根据id显示对应的文章内容
        window.sessionStorage.setItem('id', id)
        window.sessionStorage.setItem('isToBottom', isToBottom)  // 将控制是否滚到低部的变量保存本地
        this.$store.commit('setId', id)
        window.sessionStorage.setItem('loginName', loginname)  // 将控制是否滚到低部的变量保存本地
        this.$router.push({path: '/article/' + id})
      },
      showDetailAboutAthor (loginname) { // 跳转到作者详情页面
        window.sessionStorage.setItem('loginName', loginname)
        this.$store.commit('setLoginName', loginname)
        this.$router.push({path: '/user'})
      },
      getSelfInfo () {
        if (window.localStorage.getItem('userInfo') !== null) {
          let loginName = JSON.parse(window.localStorage.getItem('userInfo')).userName
          axios({
            method: 'get',
            url: 'https://cnodejs.org/api/v1/user/' + loginName
          }).then((res) => {
            this.selfDetail = res.data.data
          })
        }
      }
    },
    watch: { // 监听当前的page是否发生改变
      pageIndex: function () {
        let tab = ''
        this.spanIndex === 0 ? tab = 'all' : this.spanIndex === 1 ? tab = 'good' : this.spanIndex === 2 ? tab = 'share' : this.spanIndex === 3 ? tab = 'ask' : tab = 'noApi'
        let win = window.sessionStorage
        // 将所有有关于分页导航的状态保存在本地
        win.setItem('tab', tab)
        win.setItem('page', this.pageIndex)
        win.setItem('showPageNum', this.showPageNum)
        win.setItem('pageVariable', this.pageVariable)
        win.setItem('totalPage', this.totalPage)
        win.setItem('leftEllipsis', this.leftEllipsis)
        win.setItem('rightEllipsis', this.rightEllipsis)
        if (this.spanIndex !== 0 && this.spanIndex < 4) {
          this.$nextTick(() => { // 根据tab请求对应数据
            axios.get('https://cnodejs.org/api/v1/topics', {
              params: {
                tab: tab,
                page: this.pageIndex + 1
              }
            }).then((res) => {
              this.topicsData = res.data.data
            })
          })
        } else { // 只有在tab=全部时,才做如下请求
          this.$nextTick(() => { // 如果page发生改变，根据page请求对应的数据
            axios({
              method: 'get',
              url: 'https://cnodejs.org/api/v1/topics',
              params: {
                page: this.pageIndex + 1
              }
            }).then((res) => {
              this.topicsData = res.data.data
            }).catch(function (error) {
              alert(error)
            })
          })
        }
      },
      userInfo: function () { // 根据是否登陆来判断是否显示用户信息
        this.UserInfo = this.userInfo
        this.userInfo === null ? this.isLogin = false : this.isLogin = true
        // 将状态保存到本地， 以备刷新页面时获取登录状态
        window.sessionStorage.setItem('isLogin', this.isLogin)
        this.getSelfInfo()
      }
    }
  }
</script>
<style scoped>
  @import 'index.css';
</style>
