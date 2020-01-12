<template>
  <div class="search">

<form action="/" slot="title">
  <van-search
    v-model="searchtext"
    placeholder="请输入搜索关键词"
    show-action
    @search="onSearch"
    @cancel="onCancel"
    background="#3296fa"
  />
</form>
<!-- 搜索结果 -->
<van-list
  v-if="resultshow"
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
 >
  <van-cell
    v-for="item in list"
    :key="item"
    :title="item"
  />
</van-list>
<!-- 搜索结果 -->
<!-- 联想建议 -->
<van-cell-group v-else-if="searchtext">
  <van-cell title="联想建议" icon="search" />
</van-cell-group>
<!-- 联想建议 -->
<!-- 历史记录 -->
<van-cell-group  v-else >
  <van-cell title="历史记录">
     <van-icon name="delete"></van-icon>
     <span>全部删除</span>
     &nbsp;&nbsp;
    <span>完成</span>
    </van-cell>
  <van-cell title="历史记录"/>
</van-cell-group>
<!-- 历史记录 -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchtext: '', // 搜索框的输入的内容
      list: [], // 搜索结果列表
      loading: false, // 数据加载状态
      finished: false, // 内容是否全部加载完
      resultshow: false
    }
  },
  methods: {
    onSearch () {

    },
    onCancel () {

    },
    // 搜索结果加载事件
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
.search{
    padding-top:55px;
.van-search{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1;
}
}
</style>
