import Vue from 'vue'
import Router from 'vue-router'
import index from '../page/index/index.vue'
import article from '../page/topicDetail/article.vue'
import signin from '../page/signin/signin.vue'
import user from '../page/user/user.vue'
import mymessage from '../page/mymessage/mymessage.vue'
import setting from '../page/setting/setting.vue'
import createTopic from '../page/createTopic/createTopic.vue'
import accessToken from '../page/accessToken/accessToken.vue'
import updateTopic from '../page/updateTopic/updateTopic.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/article/:id',
      name: 'article',
      component: article
    },
    {
      path: '/signin',
      name: 'signin',
      component: signin
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/mymessage',
      name: 'mymessage',
      component: mymessage
    },
    {
      path: '/setting',
      name: 'setting',
      component: setting
    },
    {
      path: '/createTopic',
      name: 'createTopic',
      component: createTopic
    },
    {
      path: '/accessToken',
      name: 'accessToken',
      component: accessToken
    },
    {
      path: '/updateTopic',
      name: 'updateTopic',
      component: updateTopic
    }
  ]
})
