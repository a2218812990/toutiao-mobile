<template>
  <div class="search">

<form action="/" slot="title">
  <van-search
    v-model="searchtext"
    placeholder="请输入搜索关键词"
    show-action
    @search="onSearch"
    @cancel="$router.push('/')"
    @focus="resultshow=false"
    background="#3296fa"
    @input="inputChange"
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
   @click="$router.push(`/article/${item.art_id.toString()}`)"
    v-for="item in list"
    :key="item.id"
    :title="item.title"
  />
</van-list>
<!-- 搜索结果 -->
<!-- 联想建议 -->
<van-cell-group v-else-if="searchtext">
  <van-cell v-for="(item,index) in suggestionList" :key="index"  icon="search" @click="clickSuggest(item)" >
    <div slot="title" v-html="lightText(item)"></div>
  </van-cell>
</van-cell-group>
<!-- 联想建议 -->
<!-- 历史记录 -->
<van-cell-group  v-else >
  <van-cell title="历史记录">
     <van-icon name="delete" v-if='isDeleteShow' @click="isDeleteShow=false"></van-icon>
     <template v-else>
     <span @click="searchhistory=[]">全部删除</span>
     &nbsp;&nbsp;
    <span @click="isDeleteShow=true">完成</span>
    </template>
    </van-cell>
  <van-cell v-for="(item,index) in searchhistory" :key="index" :title="item"  @click="clickhistory(item,index)"/>
</van-cell-group>
<!-- 历史记录 -->
  </div>
</template>

<script>
import { searchSuggestion, searchResult } from '@/api/search.js'
import { getItem, setItem } from '@/utils/storage'
import { debounce } from 'lodash'
export default {
  data () {
    return {
      searchtext: '', // 搜索框的输入的内容
      list: [], // 搜索结果列表
      loading: false, // 数据加载状态
      finished: false, // 内容是否全部加载完
      resultshow: false, // 搜索结果展示
      suggestionList: [], // 联想建议列表
      page: 1, // 页码
      per_page: 20, // 数量
      isDeleteShow: true, // 历史删除功能
      searchhistory: getItem('user-history') || []
    }
  },
  watch: {
    searchhistory (newVal) {
      setItem('user-history', newVal)
    }
  },
  methods: {
    async clickhistory (q, index) {
      if (this.isDeleteShow) {
        this.searchtext = q
        if (q) {
          let params = {
            q: this.searchtext
          }
          let res = await searchResult(params)
          this.list = res.data.data.results
          this.resultshow = true
        }
      } else {
        this.searchhistory.splice(index, 1)
      }
    },
    async  onSearch () {
      const index = this.searchhistory.indexOf(this.searchtext)
      if (index !== -1) {
        this.searchhistory.splice(index, 1)
      }
      this.searchhistory.unshift(this.searchtext)
      // 当回车键搜索，或者在触摸键盘搜索键的时候，会触发这个事件
      // 展示搜索结果
      if (this.searchtext) {
        this.resultshow = true
        this.list = await this.getresult()
      }
    },
    // 联想建议事件
    inputChange: debounce(async function () {
      let q = this.searchtext
      if (q) {
        let { data } = await searchSuggestion({ q })
        this.suggestionList = data.data.options
      }
    }, 400),
    // 点击联想建议得到搜索结果
    async clickSuggest (str) {
      if (str) {
        let params = {
          q: str
        }
        this.list = await this.getresult(params)
        this.resultshow = true
      }
    },
    // 处理联想建议中的高亮事件
    lightText (str) {
      const reg = new RegExp(this.searchtext, 'ig')
      return str.replace(reg, `<span style="color: red">${this.searchtext}</span>`)
    },
    // 获取搜索结果封装
    async getresult (params) {
      params = {
        page: this.page,
        per_page: this.per_page,
        q: this.searchtext
      }
      let res = await searchResult(params)
      return res.data.data.results
    },
    // 搜索结果加载事件
    async onLoad () {
      // 异步更新数据
      let articlelist = await this.getresult()
      console.log(articlelist)

      this.list.push(...articlelist)
      // 加载状态结束
      this.loading = false
      // 数据全部加载完成
      articlelist.length ? this.page++ : this.finished = true
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
