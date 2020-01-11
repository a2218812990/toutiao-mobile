<template>
 <div class="homepage">
       <van-nav-bar
         title="首页"
         fixed
         />
         <!-- tab标签栏 -->
         <van-tabs v-model="active">
           <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
          <!-- tab标签栏 -->
          <!-- 文章列表 -->
           <ArticleList :channel="channel"></ArticleList>
          </van-tab>
           <!-- 文章列表 -->
        </van-tabs>
 </div>
</template>

<script>
import { getChannels } from '@/api/user.js'
import ArticleList from '../../components/article-list'
export default {
  name: 'HomePage',
  components: { ArticleList },
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  methods: {
    //    获取频道列表
    async getchannels () {
      let { data } = await getChannels()
      //   console.log(data.data.channels)
      this.channels = data.data.channels
      // console.log(this.channels)
    }
  },
  created () {
    this.getchannels()
  }

}
</script>

<style lang='less' scoped>
.homepage{
  padding-top: 60px;
  padding-bottom: 50px;
.van-tabs__wrap{
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    z-index: 2;
  }
}
</style>
