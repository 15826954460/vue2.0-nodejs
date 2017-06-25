<template>
  <div class="message_box">
    <slot name="login"></slot>
    <slot name="login_name"></slot>
    <slot name="about"></slot>
    <slot name="releaseTopic"></slot>
    <div v-show="isShow" class="advertising">
      <a href="https://0x6.me/CnodeAD">
        <img src="//dn-cnode.qbox.me/Fh-dDBC360-fT8gaefK0p_hmx_zv" alt="广告图片">
      </a>
      <a href="https://alinode.aliyun.com/?ref=cnode">
        <img src="//dn-cnode.qbox.me/Fn4D6BhOTz1IswvmzeZ1q7QW1ls_" alt="广告图片">
      </a>
      <a
        href="http://www.ucloud.cn/site/active/gift.html?utm_source=cnodejs&utm_medium=content_pic_pc&utm_campaign=multicloud&utm_content=gift&ytag=cnodejs">
        <img src="//dn-cnode.qbox.me/FgQS-GQDfqwAD_v0NuhyYUOUk5MG" alt="广告图片">
      </a>
    </div>
    <div v-show="isShow" class="no_people_answer">
      <header class="no_answer_title title">无人回复的问题</header>
      <ul class="no_answer_list">
        <li v-for="item in noPeopleAnswer">{{item.title}}</li>
      </ul>
    </div>
    <div v-show="isShow" class="scoreboard">
      <header class="scoreboard_title title">积分榜 TOP 100 >></header>
      <ul class="scoreboard_list">
        <li v-for="item in topScore">
          <span class="top_score">{{item.top_score}}</span>
          <span class="user_name">{{item.user_name}}</span>
        </li>
      </ul>
    </div>
    <div v-show="isShow" class="Friendship">
      <header class="Friendship_title title">友情社区</header>
      <ul class="Friendship_list">
        <li><a href="https://ruby-china.org/"><img src="//o4j806krb.qnssl.com/public/images/ruby-china-20150529.png"
                                                   alt="链接图片"></a></li>
        <li><a href="http://golangtc.com/"><img src="//o4j806krb.qnssl.com/public/images/golangtc-logo.png" alt="链接图片"></a>
        </li>
        <li><a href="http://phphub.org/"><img src="//o4j806krb.qnssl.com/public/images/phphub-logo.png" alt="链接图片"></a>
        </li>
        <li><a href="https://testerhome.com/"><img src="//dn-cnode.qbox.me/FjLUc7IJ2--DqS706etPQ1EGajxK" alt="链接图片"></a>
        </li>
      </ul>
    </div>
    <div v-show="isShow" class="erweima">
      <header class="erweima_title title">客户端二维码</header>
      <div class="cnode-app-download"><img src="//dn-cnode.qbox.me/FtG0YVgQ6iginiLpf9W4_ShjiLfU" alt=""></div>
      <p class="code_address">客户端源码地址</p>
    </div>
  </div>
</template>
<script>
  export default {
    props: ['isShow'],
    data () {
      return {
        // 这里没有接口，数据量不大，所以本地自己创建了模拟数据
        noPeopleAnswer: [
          {
            title: '研究-访问控制的资料汇总',
            id: '5938b8197845b4795c6d9a63'
          },
          {
            title: '使用vue2.0和express制作了一个简单的影评分享网站',
            id: '5937a082990c3ef64e2df570'
          },
          {
            title: 'net 模块 作为服务器对客户端写函数如何独立控制',
            id: '5936c4e569912fcf6b3cca67'
          },
          {
            title: '详谈移动端1px细线解决方案',
            id: '593680fe538dbcaa6bc7dd5f'
          },
          {
            title: 'webpack打包的时候,被拆分的文件怎么命名',
            id: '5936669cdfbb657c2a05ca67'
          }
        ],
        topScore: [
          {top_score: '18825', user_name: 'i5ting'},
          {top_score: '14465', user_name: 'alsotang'},
          {top_score: '9880', user_name: 'leapon'},
          {top_score: '9945', user_name: 'juyingying'},
          {top_score: '8875', user_name: 'DevinXian'},
          {top_score: '6894', user_name: 'Magicdawn'},
          {top_score: '6684', user_name: 'fhdsuiahtkr'},
          {top_score: '5894', user_name: 'fhdsjafk'},
          {top_score: '5562', user_name: 'uojku89'},
          {top_score: '4089', user_name: 'trejtureo'},
          {top_score: '4458', user_name: 'jkjhh'}
        ]
      }
    }
  }
</script>
<style scoped>
  @import './message.css';
</style>
