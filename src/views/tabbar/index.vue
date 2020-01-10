<template>
<div class="tabbar">
    <!-- 子路由出口 -->
    <router-view/>
     <!-- 子路由出口 -->
     <!-- 下面导航tabbar -->
     <van-tabbar route>
       <van-tabbar-item to="/" icon="wap-home-o">首页</van-tabbar-item>
       <van-tabbar-item to="/question" icon="comment-o">问答</van-tabbar-item>
       <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
       <van-tabbar-item to="/my" icon="contact">我的</van-tabbar-item>
        </van-tabbar>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>
