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
  />

  <van-field
    label="验证码"
    placeholder="请输入验证码"
  />
</van-cell-group>
  <!-- 表单 -->
  <!-- 按钮 -->
  <div class="btn">
  <van-button type="info">登录</van-button>
  </div>
   <!-- 按钮 -->
</div>
</template>

<script>
export default {
  name: 'login'
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
