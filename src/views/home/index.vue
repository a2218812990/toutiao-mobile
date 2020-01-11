<template>
 <div class="homepage">
       <van-nav-bar
         title="首页"
         fixed
         />
         <!-- tab标签栏 -->
         <van-tabs v-model="active">
          <van-icon class="click-icon" slot="nav-right" name="wap-nav" @click="popupShow=true"></van-icon>
           <van-tab :title="channel.name" v-for="channel in channels" :key="channel.id">
          <!-- 文章列表 -->
           <ArticleList :channel="channel"></ArticleList>
           <!-- 文章列表 -->
          </van-tab>
        </van-tabs>
            <!-- tab标签栏 -->
            <!-- 频道选择弹窗 -->
            <van-popup
             v-model="popupShow"
             closeable
             close-icon-position="top-left"
             position="bottom"
             :style="{ height: '100%' }"
            >
           <ChannelsEdit :userChannels="channels"></ChannelsEdit>
            </van-popup>
 </div>
</template>

<script>
import { getChannels } from '@/api/user.js'
import ArticleList from '../../components/article-list'
import ChannelsEdit from '../../components/channels-edit'
export default {
  name: 'HomePage',
  components: { ArticleList, ChannelsEdit },
  data () {
    return {
      active: 0,
      channels: [],
      popupShow: false

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
  padding-top: 110px;
  padding-bottom: 50px;
/deep/.van-tabs__wrap{
    position: fixed;
    top: 64px;
    left: 0;
    right: 0;
    z-index: 2;
  }
  .click-icon{
       position: fixed;
       right: 0;
       line-height: 44px;
       background-color: #fff;

  }
}
</style>
