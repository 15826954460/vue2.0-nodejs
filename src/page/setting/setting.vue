<template>
  <div class="setting_wrapper">
    <vheader></vheader>
    <div class="setting_wrapper_content" id="comment_media_wrapper">
      <div class="setting_wrapper_content_left">
        <div class="setting_wrapper_content_left_setting setting_wrapper_comment">
          <vheadertitle>
            <span slot="setting">设置</span>
          </vheadertitle>
          <section class="setting_box" id="setting_box">
            <div class="user_name_box comment_style">
              <span class="user_name">用户名</span><input type="text"  readonly="true" class="text_user_name" v-model="userName">
            </div>
            <div class="user_email_box comment_style">
              <span class="user_email">电子邮件</span><input type="text" value='624793604@qq.com' readonly="true" class="text_user_email">
            </div>
            <div class="user_website_box comment_style">
              <span class="user_website">个人网站</span><input type="text">
              <p>同时决定了Gravatar头像</p>
            </div>
            <div class="user_address_box comment_style">
              <span class="user_address">所在地点</span><input type="text">
            </div>
            <div class="user_weibo_box comment_style">
              <span class="user_weibo">微博</span><input type="text" placeholder="e.g. http://weibo.com/cnodejs">
            </div>
            <div class="user_github_box comment_style">
              <span class="user_github">GitHub</span><input type="text" value="@15826954460">
              <p>通过 GitHub 登陆CNode 来修改此处</p>
            </div>
            <div class="user_signature_box comment_style">
              <span class="user_signature">个性签名</span><textarea name="" id="" cols="30" rows="3"></textarea>
            </div>
            <span class="save_update comment_update">保存设置</span>
          </section>
        </div>

        <div class="setting_wrapper_content_left_update_secret setting_wrapper_comment">
          <p class="title">更改密码</p>
          <div class="setting_box" id="setting_wrapper_setting_box">
            <div class="negative_secret_box comment_style">
              <span class="negative_secret">当前密码</span><input type="password" v-model="negativeSecret">
            </div>
            <div class="new_secret_box comment_style">
              <span class="new_secret">新密码</span><input type="password" v-model="newSecrt">
            </div>
            <span class="update_secret comment_update" @click="updateSecret">更改密码</span>
          </div>
        </div>

        <div class="setting_wrapper_content_left_erweima setting_wrapper_comment">
          <p class="title">Access Token</p>
          <div class="erweima_box">
            <span>字符串：27f9ec03-8beb-4a75-a2f1-30251cecfd61</span>
            <p>二维码：</p>
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAQu0lEQVR4Xu2d63YjNwyDnfd/aPd44tPTJuIsvoDUjh3055aWKBDgRTOxP2632/12sf/u9xmXPj4+5JO6Pqz2ImtWvq7WmNpLBqsw7Div64P7+QdjZthoeEaAJdtEIGu0CC4EbxLHKR+IvyvbCKQh+y2BXVSrDsKkgriUZ5+PQCKQ21T27kgIjM791hFIBBKBnOhqKRCifFezZMB0M517LndwrrAifqkYVGuqnydxJXt12BLfVNsKlwhERfB2KzOtOhdEILdbBAII9zBNBalJow7/KztCRBiyb+Zkrw5b11+CayoIQDst1hqsDtKTRAlCJpumxXo88DEfQEYgEciBgNtTk17bzRxTpCVtCynZ7rrqXh1ZXd2LxLuyVXnQcclA+C23WDsdI5k+AvHnuA68XeFHIKAydQSMZAm1Ue3wyyWSmtVTQeqoEm6kgqjqgDMMqbhEeBGI/sIpaf3sIZ0E3HWMECYtVloskOPwjJ0KAtDtEG5arDXgmUE2zyAq70mv7lZG1afqJvHx7zuJRPx1hb/zXJlBQGQjEAAWNHUrLiEycY2s+7YtlgpYBKIixe0iEIiZqlwXWOJWBELQYrZuHFW+MK/Yg/BUkOL1E3JrNxFIItyJ/SnpMoOALzxwh1mSeUggp0ivEpSci/jqknMnhtVeGdKHbrF2Btd95hKB1NGKQCIQ9DZxKgibFUiiVCv+ca2++tofssCEYyTTkv0J6QgGqi05F/E1LRZhARNeBFJgq5K+eqintgykJyc0IGIk6xLhEh9UvMj+7iycCnLCjAhkDQ4h6K8SCMkyxFbNHIeawZexqYEk16kkI+3EgOy1sx0jfpHYknVVW/ttXnUjakeAcW0JOVSBVS0WwWHiXGR/kunJusSWYEDWVW0jEDBrVNUqFUSlG7eLQArMCDCubSrIOgipIPV3nsm3WDwnaJ9wSe/OEO7n02Jpcf6TFeHBn9b6yf9HLdZPNuj8DCGta+s+Ha8EQgI+YfsO5+rk1E/Xeqkvrw6R9Ju8COSnkvj/5yKQ4iXMnc9BIvx6Buih+c9XiUAiEPtLud02l94a/pzu/JMRSAQSgZzo5uN+hTs+Udjk4Z24ZIsZacfUq2Z3hpjK6hNnbQnC0CIRSAOwE6SJQBoC07BEBNIAYgSif9vhCzUsBzMikAjE/tUn0vpGIA2Eq5YggRh049vSqSCpIDv5Vu4Vgeh/DZchvYeyIy3WFJFJplZtO0q+et4p0rpU6PBr5YP7AFS98aPnR35NXPOqhKEHU0n/WFe1jUDmfnkWEVH8WqmpeJVJIgK5U51+s1cTQkemVvcih+rwKxUEID4RRFIViO1URiLtwUSmBeGyb7HIpQoRI8GQnBfhnQqSCkJISxIKIuKrt1jkyS5Rs1qa6ZpqIEm1U9c8HjCJASfVrsKA+DWBt7t/hRdZ1xWjPYNEIOx31iMQltIIwVWRd1RG+Zo3AolApipYKghLJqg9cYPmZnoyoBJfp/xSsy8JGWmFCF5kXVKBkK06pKeCpIIQgROBpYJAtEj2dING9nIzGvF1yq9UEP3v+g/hrr7dnfCZkEYNDlnTrWxXICI5rxobFxeS1cleLt7k8ypW1U1iBNJwHUuCQIhE1lUTzxkR1DXUV3iqvQjByV4uXuWNVyrIvle1I5C9z4eIaCKQAi03o5EgRCARCOHLYUuu3NQ2gLQSEUgdMjU2RPgu3uTzhIzoSboKTOUAOQQZUCfW7VhTXaPjyS4JOkkoK9uJGWAq3i4uJZdXz0EikDVchOAq4TqqKCGHKuaOIZtg4IqZYEBsl6+aRCARSATyyYEIxHzrtqoAJHu6CQllRPO8pAIRDFJBiihO9aTquiTgabHYLdRbCER9DqIS7iybqWQkROzwy81eqg/q+c8wdPdSP08uYEi8SLUjvnZgu+RBBLIOGQFcDSRZsyKSu5f6+QjkOYNEIBEIyepkXnITAhGzu1eZECKQCCQCqRGQ3+YlaiblmQxyJHuRoGcG0dEiMXCzOuGcu1cqiM6Bz/tv8zrUFV1mkLk/UCNUGPmbdJdcHe/2qNnH9ZWKiVRMNZAdZ/jte5UVZOJPbt2ARSAqXZ83LQPVzm2TH59Xk9QV9opACgRcMaeC1GKOQMCXRJOeOhUkFYQmHleMqSCpIAcCLpE6Kq4q/517IYG4V3lTrx6owJJqRdbsqGzqkE72ImdwbXeSluyl4krPb7/N64qJOuzYT2VP9w+LyOfdMzj47W57IhA3WvDzLrlIVifBjUDWgSQYpoJAMUwAFoHMPEDtuOadiPdRMd0/uU2Lpf/cG5mNiBgbcoe8BMnqUxVbddbdPwJRkX7aEdK6RCJ7wWNY5u65yOZkr79eQUj2IyCsbAkw5MaM9Pou4KSyuhgQX3f6RfB2sz3hDOGn3GJFIOwZwk4iRiBsNopAwBfSkcxDslwEwmYzgu1ExS0vCtQhPRUkFeQYWs0XI6dmK+JXKkgqyNafdibJ820F4pZAmn3UvpoATrJMx3m/noH4irLcm2Z1EgM3ttXn5SGdOFv2cyCQEYgukSlyuDEnfqnx7uAWuV2LQArEXXKQQdLdixCRkGOnXxEIHPBUwEjb4hJJz+lrS+Ir2cs91xX8UuOdCnLCDDf7uUQipE0FYTdelxXI6nuxpojoluwJ0pHs6Qpsai8iXBIDcl6X4CS26nndtyyOi6UIZP0bhSRJqOSIQFRqf9pNCZQ8xI1Aipu1CGSOoKpMIhAVqRM7kpVJGY9AIpC0WCdlPAKJQCKQCOS0hk+1OGrjMLW/PYOoQ2c1SJHbAxWsh517A0OqwoTtFC4uhoSIE7hUsSVEJu0z4rf78wfkECQQ5BAqOFcNrotLBLJGgOBaJq8IxL/mVYWXClLPNS6GapKskkkEAr8mVQ1YR3tAMh2pFmoVJvtP4NKBYQSSGcTVxvF5QnBXYGQv1dadQ1sqiOosBZwcTs0IpG1xz1WBq85h5JnNb8vqJDaucNXPv9w1r0pEcrtGSBuBrGcIkvgI3lNJIgJp+JNbN+gkIxJbNbgdRFT9crGinYiLgfr5VBD4oDAVJBUED3JqlqmyBJk802Kt0XJj4FabVBCYaQngEUhull6uxSKk7cge6n4Te7m3YNWFgHomeu2orjuVpNT9yUUJtVV9IEN+2T6rT9I7Auk6HIGo1GBPrPVVmeVES0w8cPlWDunEiQnS7hRjKgiJNrONQBqebhPIJ8QYgZAIMNsIJAI5GNNRyr9SjySDFW0zg/TERf6bdJY7ZqxJRnI9IHsR251+qcIhVZT4P3X9vPLBTShoSJ/ajIDrBnfnXhHIGu0IxGUh/PxViXhVv9wk47aOEQgkuGt+VSJe1a8IxGUc+OI4fyt/hasS8ap+RSANnFMfFHbMJW7JJsOZuhcZUDts/ZB5K0yImdyYEVtV4A87t51DQzohIgmXSlqyJiEtORchErElZ5uwnfCVkJ7YRiANDIhAGIgRCPz6qLRY9yXDCJGILaNzv/WEr6QqENtUkIb4p4IwECOQVJCDMeq8QwTWYcvo3G8dgUCBrH4nvT8snyuqwXHLMPG/Yy9VjMSvyla9TSQ+qWuSGFJbtZ0iSaoD7+WPeHYs7By4g7TqGTr2ImRU/YpA9IRKOgaKfwQCfkCnAjcC8S86nIQagTzRI62AmilSQWBPvkgopO0hMVRb8ggkAvlX7yrBSFVT16RzBSH4S1UQcjDXdgUMyUhqpXjYuUQge03ZqmfYWRlVn84wIYJWOeOueSSE1S2WS3qX4O7n3QF3smS7wlHJGIHoV/2nwo1A1vB0ZB9XDGqmVNuTqSqqijYV5A+zgkq6VJCaSioZU0FSQXCCVsmVFusTWjehkQCpe5H22V0zM8hJBDvAJQRRbVWRp4LoAj9t/VZv85I/PlEDS/tfdV1CZHIuYqv6ujv7qTNMh5jIHOTipX5eTSYRyMlsRMhBxKgGsUocV9jLJdjUGVRsXf+PFisVxP+VWzVgqSAuUuzzEQgYJGmmTovFHqymxSpe6iOa7lD01/1IGSekJ7YEA3cu2LmXGy8SG/dcKq50H/lt3o7DqqTb+RzkqjNIFUjyloOb1SfiRURHzkpsiUgiEPC6e0eScDOdSwRyhgikeBfLzTzuMJoKUue4CGTmb0/Kiq3+yS3JPBEIKeJsGI5AIpDytXRXpGrLQG+8mBy+W0/15W4noOJFKv7UWd3EYVcQQgIy+E4EkQy45FzElhCBrKsmiSuQlpzLtVVxofvIQzpZOAJhbVMHtl/XiEAIqicznzqDkO0ikAiE8KXDNhWkQJG0MlMgule3hCDqGVJBCKqpIAcCKrk6oCXCJfupZ4hACKoRSATy5IB72+N+voe231dREwfdf/k2r9sykBmEHEy9dnz472Zw4peKl7tmFVwXl6l4UTLusid4RSBFVFwykyC4xCB7Tdm6Z9j5eYJBBBKBlLMZIdJOgrt7kXNFIBFIBHJygROBRCARyJlAJh4UuiWw+jy5QVFnCHeYn/L1lfxSsd59edKB4cirJhGI/9sWHcFdxcFNMqR/V2/3CF92ivHhVwRyX78+TYK2i4iuT0fAB36+YCdpd+4VgTQ8L0mLxd5QcCtjBHKSJt3sN1HyI5AIpKOyt6wRgfgwuhj+uhlk9cVxfhi8FTpetCNEUGeI6lQqadz2gswQpBUh5yKRJTFQbclrMcTXshOIQNbQEIJFIDqGbvKLQE4GZzXLkExLZgiSaYmvJNOp6xKBk3NN+EriFYFEIKccjED071ImYk6LBa90SQZOi/XLWqyOYVJVr5oRqzKs7vOwU4lM1qzWpWuo9gQvdU1iRxLHal2XW6TFIr6Ws5H68wcERGJLAk4OrAbHXTMCIdGe+0M2N/lFIKkgjMmFtZtQUkFgGFJBGGAEL7ayZh2BwGFWg7W2IgGfCI67ZlosxoC3rSBTRHIFQh48qXNJeeUHfkSIEIFgsPKNxIb06qqtGwMmsbW16itNaH/9NwoJOVzbCITd5Kmki0CavnRtAnA3OG6mr7Kfu677eeKXe3XqxiAV5IlABLKmAqmMabHSYqHfB3Gz185MTWabnX6lgpxcIqkPCskg6JZ3QnpimxkkM8hbD+lue7FTIKSvVltPElxSFa5Q2dzYELyJ7UvdYkUg+qsaEQiRwZu0WBFIBNJDe32VVBDwtT8dc5jaSrgVwP38w8+dt2sqLjq1eywjkAikZFIEcrv9KoGQYZhkNJdIpHVUz0CuiUmunaqiBG8VL3LDab/u3gHMRHCJX+r+5Jq6oxVRA17dYk0IlNxsEYERWyJyggGyfaXnIIRIakZyBRaBEMoz2whk8yCYCsII6iYkd7cIJAJBA3JarJPnFQNfyn10B2mx1l8jo7ZoabHcOlF//qUqyBQMZGAiJV8Flzwv6JhXXByJD6rIXQxUrKtk0lEZJ3BBFcQNLLkVmQLcFRgJAjkDwZb4EIHoyNrXvPpWzDIVxMeLrEAuKlRbkgymqtVE4kgFOflLSZUcFTkJaQjBJ4gwRdqJik0e/hFcU0EKtFxyRCD6C5RvM4MQ5U3YdmTfiUxL5ii1/6e3YOq5OjJtRxy+4qD6Xw3uhG9krzK2r/T7IDvBIeRQA0FIS2xdMe6sgipWEcgJ2wk53azeQQ416IT0xDYCWUdRjctZ4l0+KCSZesI2Aqn7ejXorsA6MjgZ0onIVc6pWEUgKqL/sSMiVQNBSEtsCblUXyOQT1RTQQrxRCDsdkrNQTsFSvaq/P8HRM97E68Sq5gAAAAASUVORK5CYII="
              alt="">
          </div>
        </div>
      </div>
      <div class="setting_wrapper_content_right" id="comment_media_right">

      </div>
    </div>
  </div>
</template>
<script>
  import vheader from '../../components/header/header.vue'
  import vheadertitle from '../../components/headerTitle/headerTitle.vue'
  export default {
    data () {
      return {
        userName: '', // 用户名
        negativeSecret: '', // 当前密码
        newSecrt: '' // 新密码
      }
    },
    components: {
      vheader,
      vheadertitle
    },
    mounted () {
      let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
      this.userName = userInfo.userName
    },
    methods: {
      updateSecret () { // 修改当前密码
        if (this.negativeSecret !== '' && this.newSecrt !== '') {
          let userInfo = {}
          userInfo.userName = this.userName
          userInfo.userPwd = this.newSecrt
          window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
          this.negativeSecret = ''
          this.newSecrt = ''
        }
      }
    }
  }
</script>
<style scoped>
  @import "./setting.css";
</style>
