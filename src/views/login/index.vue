<template>
<div class="login">
    <!-- 导航栏 -->
  <van-nav-bar
  title="登录"
/>
 <!-- 导航栏 -->
 <!-- 表单 -->
  <van-cell-group>
  <van-field
    label="手机号"
    placeholder="请输入手机号"
    v-model="login.mobile"
  />
  <van-field
    label="验证码"
    placeholder="请输入验证码"
    v-model="login.code"
  />
</van-cell-group>
  <!-- 表单 -->
  <!-- 按钮 -->
  <div class="btn">
  <van-button type="info" @click="clicklogin">登录</van-button>
  </div>
   <!-- 按钮 -->
</div>
</template>

<script>
import { login } from '@/api/user.js'
export default {
  name: 'loginpage',
  data () {
    return {
      login: {
        mobile: '', // 手机号
        code: '' // 验证码
      }
    }
  },
  methods: {
    // 登录验证
    async  clicklogin () {
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
