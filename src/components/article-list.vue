<template>
<div class="article-list">
  <!-- 下拉刷新列表 -->
 <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
<!-- 因为需要同样的外观不同的数据，以及懒加载，不选择频道就不加载，所以要用组件 -->
   <van-list
     v-model="loading"
     :finished="finished"
     finished-text="没有更多了"
     @load="onLoad"
   >
     <van-cell
       v-for="(item,index) in list"
       :key="index"
       :title="item.title"
       @click="$router.push(`/article/${item.art_id}`)"
     />
   </van-list>
 </van-pull-refresh>
</div>
</template>

<script>
import { getArticleList } from '@/api/article'
export default {
  name: 'articlePage',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false, // v-model="loading" 控制上拉加载更多的 loading 状态
      finished: false, // :finished="finished" 控制是否加载结束，如果没有数据了，则不会继续加载更多
      isLoading: false, // 下拉刷新
      timestamp: null // 时间戳
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      // console.log(this.channel.id)
      let params = {
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1 }
      let{ data } = await getArticleList(params)
      // console.log(data.data.results)
      // result中的文章数据有十条，onLoad事件每触发一次就加载十条，如果没有沾满屏幕自动再加载
      // 不能改变原数组的状态，所以以push的方式
      let res = data.data.results
      this.list.push(...res)
      // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      if (res.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },

    // 下拉刷新
    async onRefresh () {
      let params = {
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 1 }
      let{ data } = await getArticleList(params)
      let res = data.data.results
      this.list.unshift(...res)
      this.isLoading = false
      this.$toast(`加载了${res.length}篇文章`)
    }
  }
}
</script>

<style>

</style>
