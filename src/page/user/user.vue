<template>
  <div class="user_wrapper">
    <vhead></vhead>
    <div class="user_content_wrapper" id="comment_media_wrapper">
      <div class="user_content_wrapper_left">
        <vheadertitle></vheadertitle>
        <div class="author_info" v-if="JSON.stringify(authorDetail) !== '{}'">
          <div class="title">
            <img :src="authorDetail.avatar_url" alt="作者头像"
                 :title="authorDetail.loginname"><span>{{authorDetail.loginname}}</span>
          </div>
          <p class="score">{{authorDetail.score}} 积分</p>
          <span v-if="topicCollect" class="collection">{{topicCollect.length}} 个话题收藏</span>
          <ul class="relevance">
            <li><span class="fa fa-home"></span>&nbsp;&nbsp;no data</li>
            <li><span class="fa fa-map-marker"></span>&nbsp;&nbsp;&nbsp;&nbsp;no data</li>
            <li><span class="fa fa-github"></span>&nbsp;&nbsp;@{{authorDetail.githubUsername}}</li>
            <li><span class="fa fa-twitter"></span>&nbsp;&nbsp;no data</li>
          </ul>
          <p class="login_time" v-if="authorDetail.create_at"> 注册时间 {{authorDetail.create_at | formatTime}}</p>
        </div>
        <div class="recent_topics comment_style" v-if="authorDetail.recent_topics">
          <header class="title">最近创建的话题</header>
          <ul class="list_wrapper">
            <li v-for="(item, index) in authorDetail.recent_topics" v-show="index < showRecentTopicsNum" class="list">
              <div class="list_img">
                <img :src="item.author.avatar_url" alt="作者头像" :title="item.author.loginname">
              </div>

              <div class="list_content">
                <p><span>8</span><span> / </span><span>794555</span></p>
                <span class="title" @click="goToArticleDetail(item.id)">{{item.title}}</span>
              </div>

              <div class="last_reply_at">{{item.last_reply_at | formatTime}}</div>
            </li>
            <li class="look_more" @click="recentTopics(authorDetail)">查看更多>></li>
          </ul>
        </div>
        <div class="recent_replies comment_style" v-if="authorDetail.recent_replies">
          <header class="title">最近参与的话题</header>
          <ul class="list_wrapper">
            <li v-for="(item, index) in authorDetail.recent_replies" v-show="index < showRecentRepliesNum" class="list">
              <div class="list_img">
                <img :src="item.author.avatar_url" alt="作者头像"
                     :title="item.author.loginname"
                     @click="showDetailAboutAthor(item.author.loginname)"
                >
              </div>

              <div class="list_content">
                <p><span>8</span><span> / </span><span>794555</span></p>
                <span class="title" @click="goToArticleDetail(item.id)">{{item.title}}</span>
              </div>

              <div class="last_reply_at">{{item.last_reply_at | formatTime}}</div>
            </li>
            <li class="look_more" @click="recentReplies(authorDetail)">查看更多>></li>
          </ul>
        </div>
      </div>

      <div class="user_content_wrapper_right" id="comment_media_right">
        <vmsg :isShow="isShow">
          <div class="author_wrapper" slot="login_name" v-if="authorDetail">
            <header class="title">个人信息</header>
            <div class="author_info">
              <div class="author_img"><img :src="authorDetail.avatar_url" alt="博主图像"
                                           :title="authorDetail.loginname"><span
                class="login_name">{{authorDetail.loginname}}</span></div>
              <p class="visit_count"><span>积分：</span><span>{{authorDetail.score}}</span></p>
              <p class="motto"></p>
            </div>
          </div>
          <div class="release_topic_wrapper" slot="releaseTopic">
            <router-link to="/createTopic" tag="span" class="release_topic">
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
  import vhead from '../../components/header/header.vue'
  import vmsg from '../../components/message/message.vue'
  import vaside from '../../components/aside/aside.vue'
  import vheadertitle from '../../components/headerTitle/headerTitle.vue'
  import axios from 'axios'
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        isShow: true, // 传给子组件的状态
        authorDetail: {}, // 作者详情
        topicCollect: [], // 作者收藏话题
        showRecentTopicsNum: 5,
        showRecentRepliesNum: 3
      }
    },
    computed: {
      ...mapGetters(['loginName'])
    },
    components: {
      vhead,
      vmsg,
      vaside,
      vheadertitle
    },
    mounted () {
      this.$nextTick(() => { // 页面刷新时获取数据
        let loginName = window.sessionStorage.getItem('loginName')
        axios.get('https://cnodejs.org/api/v1/user/' + loginName).then((res) => {
          this.authorDetail = res.data.data
        })
        axios.get('https://cnodejs.org/api/v1/topic_collect/' + loginName).then((res) => {
          this.topicCollect = res.data.data
        })
      })
    },
    methods: {
      recentTopics (authorDetail) {
        this.showRecentTopicsNum = authorDetail.recent_topics.length
        this.showRecentRepliesNum = 3
      },
      recentReplies (authorDetail) {
        this.showRecentRepliesNum = authorDetail.recent_replies.length
        this.showRecentTopicsNum = 5
      },
      goToArticleDetail (id) { // 将id传到vuex
        this.$store.commit('setId', id)
        window.sessionStorage.setItem('id', id)
        this.$router.push({path: '/article/' + id})
      },
      showDetailAboutAthor (loginname) {
        window.sessionStorage.setItem('loginName', loginname)
        this.$store.commit('setLoginName', loginname)
        this.$router.push({path: '/user'})
      }
    },
    watch: {
      loginName: function () {
        axios.get('https://cnodejs.org/api/v1/user/' + this.loginName).then((res) => {
          this.authorDetail = res.data.data
        })
        // 用户收藏的话主题
        axios.get('https://cnodejs.org/api/v1/topic_collect/' + this.loginName).then((res) => {
          this.topicCollect = res.data.data
        })
      }
    }
  }
</script>
<style scoped>
  @import './user.css';
</style>
