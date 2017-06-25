<template>
  <div class="create_topic_wrapper">
    <vhead></vhead>
    <div class="create_topic_content_wrapper" id="comment_media_wrapper">
      <div class="create_topic_content_left">
        <vheadertitle>
          <span slot="sendTopic">发布话题</span>
        </vheadertitle>
        <div class="replay_wrapper">
          <div class="replay_type">
            <span class="change_mode">选择板块:</span>
            <select name="" id="select" class="select" @change="change">
              <option value="请选则">请选则</option>
              <option value="分享">分享</option>
              <option value="问答">问答</option>
              <option value="招聘">招聘</option>
              <option value="客户端测试">客户端测试</option>
            </select>
          </div>
          <div class="title_num">
            <span v-show="isShowTitleWarning" class="isShowTitleWarning">标题最少6字以上，请认真描述......</span>
            <input type="text" min-length="6" placeholder="标题6个字以上" v-model="title" @input="validateLength">
          </div>
          <quill-editor
            ref="myTextEditor"
            v-model="content"
          >
          </quill-editor>
          <div class="sent_topic_box">
            <span class="sent_topic_btn" @click="sendTopic">提交</span>
          </div>
        </div>
       </div>
      <div class="create_topic_content_right" id="comment_media_right"></div>
    </div>
  </div>
</template>
<script>
  import vhead from '../../components/header/header.vue'
  import vheadertitle from '../../components/headerTitle/headerTitle.vue'
  import axios from 'axios'
  export default {
    data () {
      return {
        content: '', // 发布内容
        tab: '请选择', // 默认tab
        title: '', // 主题
        isShowTitleWarning: false,
        isShowContentWrapperWarning: false
      }
    },
    components: {
      vhead,
      vheadertitle
    },
    methods: {
      change () { // 获取select中的值
        let select = document.getElementById('select') // 获取select元素
        let index = select.selectedIndex // 获取选中的option的下标
        let value = select.options[index].value  // 拿到选中项的值
        this.tab = value
        console.log(value)
      },
      validateLength () {
        this.isShowTitleWarning = false
      },
      sendTopic () { // 点击发布话题
        if (this.tab !== '请选择' && this.title !== '' && this.content !== '') {
          let tabs = ''
          tabs = (this.tab === '分享' ? 'share' : this.tab === '问答' ? 'ask' : this.tab === '招聘' ? 'job' : 'dev')
          if (this.title.length >= 6 && tabs === 'dev') { // 将文章发到测试专区
            axios({
              method: 'post',
              url: 'https://cnodejs.org/api/v1/topics',
              data: {
                // 请在这里使用您自己的accessToken
                accesstoken: '27f9ec03-8beb-4a75-a2f1-30251cecfd61',
                title: this.title,
                tab: tabs,
                content: this.content
              }
            }).then((res) => {
              if (res.data.success === true) {
                this.$router.push({path: '/'})
                //  这里没有接口调用就暂时不掉了，只是简单的将部分内容清空
                this.title = ''
                this.content = ''
              }
            })
          } else {
            this.isShowTitleWarning = true
          }
        } else if (this.tab === '请选择') {
          alert('请选择一个话题板块')
        } else {
          alert('话题内容不能为空')
        }
      }
    }
  }
</script>
<style scoped>
  @import './createTopic.css';
</style>
