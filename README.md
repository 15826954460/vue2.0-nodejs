# nodejs

A Vue2.0 js project

### 一个基于vue2.0高仿nodejs中文社区的项目

> 该项目只是为了进一步熟悉vue2.0而写的demo，感谢官网提供的公共API接口

### 技术栈

vue2.0 + vuex + vue-router + axios + webpack + es6 + less + flex + svg

### 效果演示

查看demo，请狠狠地点击这里 [http://demonodejs.applinzi.com] ，建议较新的Chrome,Fix,O....等浏览器进行浏览

### 项目运行

##### 温馨提示：由于该项目大量使用的ES6新特性，nodejs必须是较新的版本(6.0以上)，建议使用稳定版本

* git clone https://github.com/15826954460/nodejs
* cd nodejs
* npm/cnpm install
* npm/cnpm run dev
### 说明

> 项目可以和官网进行同步(eg: 收藏，取消收藏，评论回复，发表文章, 点赞等等)，如何您想通过该demo实现同步功能，还请你自己登陆nodejs官网获取accesstaken然后进入到accesstaken进行登陆，
 否则您将无法体验同步官网的功能
> 如果你觉得对您有帮助，您可以点击右上角的star支持一下，谢谢！
> 当然你一可以follow一下，我将会在后期开源更好的项目
> 项目还有一些不完美的地方，后续会持续进行修复更新

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

> |--- build                                          // webpack配置文件
> |--- config                                         // 项目打包路径
> |--- src                                            // 资源文件
>       |-- comment                                   // 公共样式文件
>              |-- comment.less                       // 全局共共样式
>              |-- reset.less                         // 初始化样式
>              |-- commentMedia.less                  // 重用的媒体查询样式
>       |-- components                                // 公共组件
>              |-- aside                              // 侧边栏组件
>              |-- header                             // 头部组件
>              |-- headerTitle                        // 头部标题组件
>              |-- message                            // 右边广告信息组件
>              |-- pageList                           // 分页码组件
>       |-- page
>              |-- accessTaken                        // accesstaken登陆页面
>              |-- createTopic                        // 新建主题页面
>              |-- index                              // 主题信息首页
>              |-- mymessage                          // 消息通知页面
>              |-- setting                            // 密码重置页面
>              |-- signin                             // 登陆页面
>              |-- topicDetail                        // 主题详情页面
>              |-- updateTopic                        // 修改主题页面
>              |-- user                               // 用户信息详情
>       |-- router
>              |-- index.js                           // 路由配置
>       |-- store                                     // vuex状态管理
>              |-- getters.js                         // 配置getters
>              |-- index.js                           // 引用vuex
>              |-- mutations.js                       // 配置mutations
>       |--- App.vue                                  // 页面入口文件
>       |--- main.js                                  // 程序入口文件，加载各种插件
> |--- static
>       |-- 外部资源文件                               // 用来存放外部引用的图片、音频、视频等文件


、、、
.
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── elm                                         // 上线项目文件，放在服务器即可正常访问
├── screenshots                                 // 项目截图
├── src                                         // 源码目录
│   ├── components                              // 组件
│   │   ├── common                              // 公共组件
│   │   │   ├── alertTip.vue                    // 弹出框组件
│   │   │   ├── buyCart.vue                     // 购物车组件
│   │   │   ├── computeTime.vue                 // 倒计时组件
│   │   │   ├── loading.vue                     // 页面初始化加载数据的动画组件
│   │   │   ├── mixin.js                        // 组件混合(包括：指令-下拉加载更多，处理图片地址)
│   │   │   ├── ratingStar.vue                  // 评论的五颗星组件
│   │   │   └── shoplist.vue                    // msite和shop页面的餐馆列表公共组件
│   │   ├── footer
│   │   │   └── footGuide.vue                   // 底部公共组件
│   │   └── header
│   │       └── head.vue                        // 头部公共组件
│   ├── config                                  // 基本配置
│   │   ├── env.js                              // 环境切换配置
│   │   ├── fetch.js                            // 获取数据
│   │   ├── mUtils.js                           // 常用的js方法
│   │   └── rem.js                              // px转换rem
│   ├── images                                  // 公共图片
│   ├── page
│   │   ├── balance
│   │   │   ├── balance.vue                     // 余额页
│   │   │   └── children
│   │   │       └── detail.vue                  // 余额说明
│   │   ├── benefit
│   │   │   ├── benefit.vue                     // 红包页
│   │   │   └── children
│   │   │       ├── commend.vue                 // 推荐有奖
│   │   │       ├── coupon.vue                  // 代金券说明
│   │   │       ├── exchange.vue                // 兑换红包
│   │   │       ├── hbDescription.vue           // 红包说明
│   │   │       └── hbHistory.vue               // 历史红包
│   │   ├── city
│   │   │   └── city.vue                        // 当前城市页
│   │   ├── confirmOrder
│   │   │   ├── children
│   │   │   │   ├── children
│   │   │   │   │   ├── addAddress.vue          // 添加地址页
│   │   │   │   │   └── children
│   │   │   │   │       └── searchAddress.vue   // 搜索地址页
│   │   │   │   ├── chooseAddress.vue           // 选择地址页
│   │   │   │   ├── invoice.vue                 // 选择发票页
│   │   │   │   ├── payment.vue                 // 付款页
│   │   │   │   ├── remark.vue                  // 订单备注页
│   │   │   │   └── userValidation.vue          // 用户验证页
│   │   │   └── confirmOrder.vue                // 确认订单页
│   │   ├── download
│   │   │   └── download.vue                    // 下载App
│   │   ├── find
│   │   │   └── find.vue                        // 发现页
│   │   ├── food
│   │   │   └── food.vue                        // 食品筛选排序页
│   │   ├── forget
│   │   │   └── forget.vue                      // 忘记密码，修改密码页
│   │   ├── home
│   │   │   └── home.vue                        // 首页
│   │   ├── login
│   │   │   └── login.vue                       // 登录注册页
│   │   ├── msite
│   │   │   └── msite.vue                       // 商铺列表页
│   │   ├── order
│   │   │   ├── children
│   │   │   │   └── orderDetail.vue             // 订单详情页
│   │   │   └── order.vue                       // 订单列表页
│   │   ├── points
│   │   │   ├── children
│   │   │   │   └── detail.vue                  // 积分说明
│   │   │   └── points.vue                      // 积分页
│   │   ├── profile
│   │   │   ├── children
│   │   │   │   ├── children
│   │   │   │   │   ├── address.vue             // 添加地址
│   │   │   │   │   └── children
│   │   │   │   │       ├── add.vue             // 新增地址
│   │   │   │   │       └── children
│   │   │   │   │           └── addDetail.vue   // 搜索地址
│   │   │   │   ├── info.vue                    // 帐户信息
│   │   │   │   └── setusername.vue             // 重置用户名
│   │   │   └── profile.vue                     // 个人中心
│   │   ├── search
│   │   │   └── search.vue                      // 搜索页
│   │   ├── service
│   │   │   ├── children
│   │   │   │   └── questionDetail.vue          // 问题详情
│   │   │   └── service.vue                     // 服务中心
│   │   ├── shop
│   │   │   ├── children
│   │   │   │   ├── children
│   │   │   │   │   └── shopSafe.vue            // 商铺认证信息页
│   │   │   │   ├── foodDetail.vue              // 商铺信息页
│   │   │   │   └── shopDetail.vue              // 单个商铺信息页
│   │   │   └── shop.vue                        // 商铺筛选页
│   │   └── vipcard
│   │       ├── children
│   │       │   ├── invoiceRecord.vue           // 购买记录
│   │       │   ├── useCart.vue                 // 使用卡号购买
│   │       │   └── vipDescription.vue          // 会员说明
│   │       └── vipcard.vue                     // 会员卡办理页
│   ├── plugins                                 // 引用的插件
│   ├── router
│   │   └── router.js                           // 路由配置
│   ├── service                                 // 数据交互统一调配
│   │   ├── getData.js                          // 获取数据的统一调配文件，对接口进行统一管理
│   │   └── tempdata                            // 开发阶段的临时数据
│   ├── store                                   // vuex的状态管理
│   │   ├── action.js                           // 配置actions
│   │   ├── getters.js                          // 配置getters
│   │   ├── index.js                            // 引用vuex，创建store
│   │   ├── modules                             // store模块
│   │   ├── mutation-types.js                   // 定义常量muations名
│   │   └── mutations.js                        // 配置mutations
│   └── style
│       ├── common.scss                         // 公共样式文件
│       ├── mixin.scss                          // 样式配置文件
│       └── swiper.min.css
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
├── favicon.ico                                 // 图标
├── index.html                                  // 入口html文件
.

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
