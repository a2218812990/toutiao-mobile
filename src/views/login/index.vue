<template>
<div class="login">
    <!-- 导航栏 -->
  <van-nav-bar
  title="登录"
/>
 <!-- 导航栏 -->
 <!-- 表单 -->
<ValidationObserver ref="form">

<ValidationProvider name="手机号" rules="required">
  <van-field
    label="手机号"
    placeholder="请输入手机号"
    v-model="login.mobile"
   >
   <i class="iconfont icon-shouji" slot="left-icon"></i>
  </van-field>
  <!-- <span>{{errors[0]}}</span> -->
</ValidationProvider>

<ValidationProvider name="验证码" rules="required">
<van-field
   label="验证码"
   placeholder="请输入验证码"
   v-model="login.code"
  >
  <i class="iconfont icon-iconfontmima1" slot="left-icon"></i>
  <!-- 倒计时 -->
  <van-count-down
    v-if="timeShow"
    slot="button"
    :time="60*1000"
    format="sss"
    @finish="timeShow=false"
   />
 <!-- 倒计时 -->
   <van-button v-else @click="sendCode"
    slot="button" size="small" type="primary">
    发送验证码</van-button>
</van-field>
</ValidationProvider>

</ValidationObserver>
  <!-- 表单 -->
  <!-- 按钮 -->
  <div class="btn">
  <van-button type="info" @click="clicklogin">登录</van-button>
  </div>
   <!-- 按钮 -->
</div>
</template>

<script>
import { login, phoneCode } from '@/api/user.js'
export default {
  name: 'loginpage',
  data () {
    return {
      login: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      timeShow: false
    }
  },
  methods: {
    // 登录验证
    async  clicklogin () {
      // 表单验证
      let success = await this.$refs.form.validate()
      if (!success) {
        console.log('验证失败')
        return // 终止后续执行
      }
      // 表单验证成功后转圈圈
      this.$toast.loading({
        duration: 0,
        message: '登陆中...',
        forbidClick: true
      })
      // 登录接口调用
      try {
        let res = await login(this.login)
        console.log(res)
        this.$toast.success('登录成功')
      } catch (err) {
        console.log('登录失败', err)
        this.$toast.fail('登录失败')
      }
    },
    // 发送验证码
    async sendCode () {
      let{ mobile } = this.login
      try {
        this.timeShow = true
        await phoneCode(mobile)
      } catch (err) {
        this.timeShow = false
        if (err.response.status === 429) {
          this.$toast('请勿频繁发送验证码')
          return
        }
        this.$toast('发送失败')
      }
    }
  },
  created () {

  }
}
</script>

<style lang='less' scoped >
.login{
    .btn{
        padding:25px 15px;
        .van-button{
            width:100%;
            border-radius: 4px;
            background-color: #6db4fb;
        }
    }
}
</style>
