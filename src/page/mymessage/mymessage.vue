<template>
  <div class="my_message_wrapper">
    <vheader></vheader>
    <div class="my_message_wrapper_content" id="comment_media_wrapper">
      <div class="my_message_wrapper_left">
        <section class="my_message_wrapper_left_title">
          <vheadertitle>
            <span slot="newInfo">新消息</span>
          </vheadertitle>
          <div class="no_info info_comment"  v-if="messages !== null">
            <p v-show="messages.hasnot_read_messages.length === 0">无消息</p>
            <ul class="has_read_messages">
              <li v-for="item in messages.hasnot_read_messages" class="item">
                <a class="reply_author">{{item.author.loginname}}</a><span class="reply">回复了你的请求</span><a class="article_title">{{item.topic.title}}</a>
              </li>
            </ul>
          </div>
        </section>

        <section class="my_message_wrapper_left_content">
          <p class="old_info">过往消息</p>
          <div class="no_info info_comment" v-if="messages !== null">
            <p v-show="messages.has_read_messages.length === 0">无消息</p>
            <ul class="has_read_messages">
              <li v-for="item in messages.has_read_messages" class="item">
                <a class="reply_author" @click="toUser(item.author.loginname)">{{item.author.loginname}}</a><span class="reply">回复了你的请求</span><a class="article_title" @click="toArticle(item.id)">{{item.topic.title}}</a>
              </li>
            </ul>
          </div>
        </section>

      </div>
      <div class="my_message_wrapper_right" id="comment_media_right">
      </div>
    </div>
  </div>
</template>
<script>
  import vheadertitle from '../../components/headerTitle/headerTitle.vue'
  import vheader from '../../components/header/header.vue'
  import axios from 'axios'
  export default {
    data () {
      return {
        messages: null // 已读和唯独消息
      }
    },
    components: {
      vheader,
      vheadertitle
    },
    mounted () {
      this.$nextTick(() => {
        axios({
          method: 'get',
          url: 'https://cnodejs.org/api/v1/messages',
          params: {
            accesstoken: '27f9ec03-8beb-4a75-a2f1-30251cecfd61'
          }
        }).then((res) => {
          this.messages = res.data.data
          console.log(res.data.data)
        })
      })
    },
    methods: {
      toUser (loginname) { // 跳转到用户信息页面
        window.sessionStorage.setItem('loginName', loginname)
        this.$store.commit('setLoginName', loginname)
        this.$router.push({path: '/user'})
      },
      toArticle (id) {
        alert('这些文章是测试端的文章，请求不到，咱们也就不在这里显示了，元芳，您意见如何......')
      }
    }
  }
</script>
<style scoped>
  @import './mymessage.css';
</style>
