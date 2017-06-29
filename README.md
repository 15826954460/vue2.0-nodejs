# nodejs

A Vue2.0 js project

### 一个基于vue2.0高仿nodejs中文社区的项目

> 该项目只是为了进一步熟悉vue2.0而写的demo，感谢官网提供的公共API接口

### 技术栈

vue2.0 + vuex + vue-router + axios + webpack + es6 + less + flex + svg

### demo
查看demo，请狠狠地点击这里 [http://vue2demonodejs.applinzi.com] ，建议较新的Chrome,Fix,O....等浏览器进行浏览

### 效果演示
![text](../master/static/img/beforelogin.gif)(../master/static/img/afterlogin.gif)
![text](../master/static/img/pc_login.gif)

### 项目运行

##### 温馨提示：由于该项目大量使用的ES6新特性，nodejs必须是较新的版本(6.0以上)，建议使用稳定版本

* git clone https://github.com/15826954460/nodejs
* cd nodejs
* npm/cnpm install
* npm/cnpm run dev
### 说明
* 这是一个pc端的项目，简单的做了一下移动端的适配
* 项目可以和官网进行同步(eg: 收藏，取消收藏，评论回复，发表文章, 点赞等等)，如何您想通过该demo实现同步功能，还请你自己登陆nodejs官网获取accesstaken然后进入到accesstaken进行登陆，
 否则您将无法体验同步官网的功能
* 如果你觉得对您有帮助，您可以点击右上角的star支持一下，谢谢！
* 当然你一可以follow一下，我将会在后期开源更好的项目
* 项目还有一些不完美的地方，后续会持续进行修复更新

### 目标功能
- [x] 获取所有主题信息（主题首页）  -- 完成
- [x] 查看博主文章（主题详情）  -- 完成
- [x] 新建主题  -- 完成
- [x] 编辑主题  -- 完成
- [x] 收藏、取消文章（主题的收藏/取消）  -- 完成
- [x] 评论  -- 完成
- [x] 为评论点赞、取消点赞  -- 完成
- [x] 获取博主信息（用户详情）  -- 完成
- [x] 消息通知（已读未读消息）  -- 完成
- [x] 模拟登陆注册  -- 完成
- [x] 密码重置  -- 完成
- [x] accesstaken登陆（第三方登陆）  -- 完成

### 目录结构（布局）

* |--- build                                          // webpack配置文件
* |--- config                                         // 项目打包路径
* |--- src                                            // 资源文件
*       |-- comment                                   // 公共样式文件
               |-- comment.less                       // 全局共共样式
               |-- reset.less                         // 初始化样式
               |-- commentMedia.less                  // 重用的媒体查询样式
        |-- components                                // 公共组件
               |-- aside                              // 侧边栏组件
               |-- header                             // 头部组件
               |-- headerTitle                        // 头部标题组件
               |-- message                            // 右边广告信息组件
               |-- pageList                           // 分页码组件
        |-- page
               |-- accessTaken                        // accesstaken登陆页面
               |-- createTopic                        // 新建主题页面
               |-- index                              // 主题信息首页
               |-- mymessage                          // 消息通知页面
               |-- setting                            // 密码重置页面
               |-- signin                             // 登陆页面
               |-- topicDetail                        // 主题详情页面
               |-- updateTopic                        // 修改主题页面
               |-- user                               // 用户信息详情
        |-- router
               |-- index.js                           // 路由配置
        |-- store                                     // vuex状态管理
               |-- getters.js                         // 配置getters
               |-- index.js                           // 引用vuex
               |-- mutations.js                       // 配置mutations
        |--- App.vue                                  // 页面入口文件
        |--- main.js                                  // 程序入口文件，加载各种插件
* |--- static
*       |-- 外部资源文件                               // 用来存放外部引用的图片、音频、视频等文件

56 directories, 203 files
```
## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader)
