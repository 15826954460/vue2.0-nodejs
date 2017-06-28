<template>
  <div class="article_wrapper">

    <div class="article_top">
      <vhead></vhead>
    </div>

    <div class="article_content" id="comment_media_wrapper">

      <div class="topicDetail" id="topicDetail">

        <div class="article_container_wrapper">
          <div class="top_title" v-if="article">
            <div class="topic_title">
              <span class="top" v-if="article.top">置顶</span>
              <span class="good" v-else-if="article.good">精华</span>
              <span class="ask" v-else-if="article.tab === 'ask'">问答</span>
              <span class="share" v-else-if="article.tab === 'share'">分享</span>
              {{article.title}}



            </div>
            <ul class="about_article_base_info">
              <li class="comment_style"><i class="dot"></i><span>发布于</span><span> 13天前</span></li>
              <li class="comment_style"
                  v-if="article.author"><i class="dot"></i><span>作者</span><span> {{article.author.loginname}}</span>
              </li>
              <li class="comment_style"><i class="dot"></i><span>{{article.visit_count}}</span><span> 次浏览</span></li>
              <li class="comment_style" v-if="article.tab === 'share'">
                <i class="dot"></i><span>来自</span><span> 分享</span>
              </li>
              <li class="comment_style" v-if="article.tab === 'dev'">
                <i class="dot"></i><span>来自</span><span> 客户端测试</span>
              </li>
              <li class="comment_style" v-else>
              </li>
            </ul>

            <div class="collect_wrapper" v-show="isShowCollectBtn">
              <span class="collect collect_style" v-show="collect" @click="toCollect">收藏</span>
              <span class="no_collect collect_style" v-show="noCollect" @click="cancelCollect">取消收藏</span>
            </div>

            <div class="update" v-show="showEdit">
              <i @click="toUpdateTopic" class="fa fa-edit"></i>
              <i class="fa fa-trash" @click="deleteArticle"></i>
            </div>
          </div>

          <div
            class="article_container"
            v-if='article'
            v-html="article.content">
          </div>

        </div>

        <div class="replies" v-if="article.replies">
          <header class="replies_total">{{article.replies.length}} 回复</header>
          <ul class="replies_list">
            <li v-for="(item, index) in article.replies" :class="{bgc_olor:item.ups.length>=3}">
              <img :src="item.author.avatar_url" alt="博主图像" @click="showReplyAuthorDetail(item.author.loginname)"
                   :title="item.author.loginname">
              <div class="replies_container">
                <header>
                  <span class="loginname">{{item.author.loginname}}</span>
                  <span class="floor" @click="goToTop(index)">{{index + 1}} 楼 <i
                    class="doc"></i>{{item.create_at | formatTime}}</span>
                  <div class="agree_wrapper">
                    <span class="fa fa-thumbs-o-up comment_span" title="喜欢" v-show="item.ups.length>0"
                          @click="thumbs(item.id)"></span>
                    <span class="fa fa-thumbs-o-up thumbs" title="喜欢" @click="thumbs(item.id)"></span>
                    <span class="agree_num " v-show="item.ups.length>0">{{item.ups.length}}</span>
                    <span class="fa fa-mail-reply comment_span" title="回复"></span>
                  </div>
                </header>
                <div v-html="item.content" class="replies_content"></div>
              </div>
            </li>
          </ul>
        </div>

        <quill-editor
          ref="myTextEditor"
          v-model="content"
        >
        </quill-editor>

        <span class="send_replies replies_comment" @click="sendReplies()">回复</span>
        <span class="reset_replies replies_comment" @click="resetReplies">清空</span>

      </div>

      <div class="msg" id="comment_media_right">
        <vmsg :isShow="isShow">
          <div class="author_wrapper" slot="login_name" v-if="aboutAuthorDetail">
            <header class="title">作者</header>
            <div class="author_info">
              <div class="author_img">
                <img :src="aboutAuthorDetail.avatar_url"
                     alt="博主图像"
                     :title="aboutAuthorDetail.loginname"
                     @click="showDetailAboutAthor(aboutAuthorDetail.loginname)"
                >
                <span class="login_name">{{aboutAuthorDetail.loginname}}</span>
              </div>
              <p class="visit_count"><span>积分：</span><span>{{aboutAuthorDetail.score}}</span></p>
              <p class="motto"></p>
            </div>
          </div>
        </vmsg>
      </div>

    </div>

    <vaside>
    </vaside>
  </div>
</template>
<script>
  import vhead from '../../components/header/header.vue'
  import vmsg from '../../components/message/message.vue'
  import vaside from '../../components/aside/aside.vue'
  import {mapGetters} from 'vuex'
  import axios from 'axios'
  import $ from 'jquery'
  export default {
    data () {
      return {
        article: {}, // 保存当前文章信息
        isShow: true,  // 传递子组建中的值
        aboutAuthorDetail: {}, // 关于作者的详细信息
        isShowCollectBtn: false, // 是否显示收藏按钮
        content: '' // 富文本编辑器的内容
      }
    },
    components: {
      vhead,
      vmsg,
      vaside
    },
    computed: {
      ...mapGetters(['id', 'isToBottom', 'userInfo', 'collect', 'noCollect', 'showEdit'])
    },
    mounted () {
      // 页面刷新获取数据
      let win = window.sessionStorage
      let id = win.getItem('id')
      let loginName = win.getItem('loginName')
      this.$nextTick(() => {
        axios.get('https://cnodejs.org/api/v1/topic/' + id).then((res) => {
          this.article = res.data.data
        })
        axios.get('https://cnodejs.org/api/v1/user/' + loginName).then((res) => {
          this.aboutAuthorDetail = res.data.data
        })
      })
      if (win.getItem('isLogin') !== null && win.getItem('isLogin') === 'true') {
        this.isShowCollectBtn = true
      } else {
        this.isShowCollectBtn = false
      }
      this.getSelfArticle()
      if (win.getItem('showEdit') !== null && win.getItem('showEdit') !== 'false') {
        this.$store.commit('setShowEdit', true)
      } else {
        this.$store.commit('setShowEdit', false)
      }
    },
    methods: {
      goToTop (index) { // 将当前评论置顶
        let top = $('.replies_list>li').eq(index).offset().top // 获取当前li距离顶部的距离
        $('html,body').animate({scrollTop: top}, 100)
      },
      showReplyAuthorDetail (loginname) { // 跳转到该作者的详情
        window.sessionStorage.setItem('loginName', loginname)
        this.$store.commit('setLoginName', loginname)
        this.$router.push({path: '/user'})
      },
      toCollect () { // 点击收藏按钮
        this.$store.commit('setCollect', false)
        this.$store.commit('setNoCollect', true)
        let id = window.sessionStorage.getItem('id')
        axios({
          method: 'post',
          url: 'https://cnodejs.org/api/v1/topic_collect/collect',
          data: {
            topic_id: id,
            accesstoken: '27f9ec03-8beb-4a75-a2f1-30251cecfd61'
          }
        }).then((res) => {
          // 这里不需要进行处理
        }).catch((error) => {
          alert(error)
        })
      },
      cancelCollect () { // 点击取消收藏
        this.$store.commit('setCollect', true)
        this.$store.commit('setNoCollect', false)
        let id = window.sessionStorage.getItem('id')
        axios({
          method: 'post',
          url: 'https://cnodejs.org/api/v1/topic_collect/de_collect',
          data: {
            topic_id: id,
            accesstoken: '27f9ec03-8beb-4a75-a2f1-30251cecfd61'
          }
        })
          .then((res) => {
          })
          .catch((error) => {
            alert(error)
          })
      },
//      onEditorBlur ({editor, html}) {
      // 失去焦点 you can do something
//      },
//      onEditorFocus (editor) {
      // 编辑器获取焦点 you can do something
//      },
//      onEditorReady (editor) {
      // 编辑器加载完成 you can do something
//      },
//      onEditorChange ({editor, html, text}) {
      //  当输入内容发生改变时 you can do something
      //        console.log('editor change!', editor, html, text)
//      },
      sendReplies () { // 新建评论
        let win = window.sessionStorage
        let id = win.getItem('id')
        if (this.content !== '') {
          axios({
            method: 'post',
            url: 'https://cnodejs.org/api/v1//topic/' + id + '/replies',
            data: {
              content: this.content,
              accesstoken: '27f9ec03-8beb-4a75-a2f1-30251cecfd61'
            }
          }).then((res) => {
            if (res.data.success === true) {
              axios({
                method: 'get',
                url: 'https://cnodejs.org/api/v1/topic/' + id
              }).then((res) => {
                this.article = res.data.data
              })
            }
            this.content = ''
          })
        }
      },
      resetReplies () { // 清空内容
        this.content = ''
      },
      showDetailAboutAthor (loginname) {
        window.sessionStorage.setItem('loginName', loginname)
        this.$store.commit('setLoginName', loginname)
        this.$router.push({path: '/user'})
      },
      getSelfArticle () {
        // 获取自己收藏的文章
        if (window.localStorage.getItem('userInfo') !== null) {
          let selfLoginName = JSON.parse(window.localStorage.getItem('userInfo')).userName
          axios.get('https://cnodejs.org/api/v1/topic_collect/' + selfLoginName).then((res) => {
            let collect = res.data.data.some((value, index, arr) => {
              return value.id === this.id
            })
            if (collect === true) {
              this.$store.commit('setCollect', false)
              this.$store.commit('setNoCollect', true)
            } else {
              this.$store.commit('setCollect', true)
              this.$store.commit('setNoCollect', false)
            }
          })
        }
      },
      deleteArticle () { // 删除文章
        alert('官方没有提供接口，臣妾做不到啊💔')
      },
      thumbs (replyid) { // 为评论点赞
        let win = window.sessionStorage
        let id = win.getItem('id')
        axios({
          method: 'post',
          url: 'https://cnodejs.org/api/v1/reply/' + replyid + '/ups',
          data: {
            accesstoken: '27f9ec03-8beb-4a75-a2f1-30251cecfd61'
          }
        }).then((res) => {
          if (res.data.success === true) {
            axios({
              method: 'get',
              url: 'https://cnodejs.org/api/v1/topic/' + id
            }).then((res) => {
              this.article = res.data.data
            })
          }
        })
      },
      toUpdateTopic () {
        this.$store.commit('setNum', Math.random())
        this.$router.push({path: '/updateTopic'})
      }
    },
    watch: { // 监听id，事实请求数据
      id: function (newValue, oldValue) {
        axios({
          method: 'get',
          url: 'https://cnodejs.org/api/v1/topic/' + this.id
        }).then((res) => {
          this.article = res.data.data
          console.log(res.data.data)
        })
        let loginName = window.sessionStorage.getItem('loginName')
        axios.get('https://cnodejs.org/api/v1/user/' + loginName).then((res) => {
          this.aboutAuthorDetail = res.data.data
          // 判段是否是当前用户
          if (res.data.data.loginname === JSON.parse(window.localStorage.getItem('userInfo')).userName) {
            this.$store.commit('setShowEdit', true)
            window.sessionStorage.setItem('showEdit', true)
          } else {
            this.$store.commit('setShowEdit', false)
            window.sessionStorage.setItem('showEdit', false)
          }
        })
        this.getSelfArticle()
      }
    }
  }
</script>
<style scoped>
  @import './article.css';
</style>
