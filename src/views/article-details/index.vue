<template>
<div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
    class="nav-bar"
      title="文章详情"
      fixed
      @click-left="$router.back()"
    ><van-icon slot=left name="arrow-left" color="#fff" size="20px"/></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 加载中 -->
    <van-loading
      class="loading"
      color="#1989fa"
      vertical
      v-if="loading"
    >
      <slot>加载中...</slot>
    </van-loading>
    <!-- /加载中 -->

    <!-- 文章详情 -->
    <div v-else-if="article.title" class="detail">
      <h3 class="title">{{article.title}}</h3>
      <div class="author-wrap">
        <div class="base-info">
          <van-image
            class="avatar"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div class="text">
            <p class="name">{{article.aut_name}}</p>
            <p class="time">{{article.pubdate | relativeTime}}</p>
          </div>
        </div>
        <!-- //如果当前用户没有登录，或者当前登录的用户是作者本人，那么就不显示关注按钮 -->
        <van-button
         v-if="!$store.state.token || article.aut_id !== $store.state.token.id"
         class="follow-btn"
         :type="article.is_followed ? 'default' : 'info'"
          size="small" round
          @click="focusUser"
        >
             {{ article.is_followed ? '已关注' : '+ 关注' }}
        </van-button>
      </div>
      <div class="markdown-body" v-html="article.content"></div>
      <!-- 评论列表 -->
        <div class="markdown-body content" v-html="article.content"></div>
      <van-divider>正文结束</van-divider>
      <!-- 文章评论 -->
      <van-cell title="全部评论" :border="false" />
      <van-list
        v-model="articleComment.loading"
        :finished="articleComment.finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <comment-item
          v-for="(comment, index) in articleComment.list"
          :key="index"
          :comment="comment"
          @click-reply='onReplyShow'
        />
        <!-- <van-cell
          v-for="(comment, index) in articleComment.list"
          :key="index"
          :title="comment.content"
        /> -->
      </van-list>
    <!-- 评论列表 -->
    </div>
    <!-- /文章详情 -->

    <!-- 加载失败提示 -->
    <div v-else class="error">
      <img src="./no-network.png" alt="no-network">
      <p class="text">亲，网络不给力哦~</p>
      <van-button
        class="btn"
        type="default"
        size="small"
      >点击重试</van-button>
    </div>
    <!-- /加载失败提示 -->

    <!-- 底部区域 -->
    <div class="footer">
      <van-button
        @click="isPostShow = true"
        class="write-btn"
        type="default"
        round
        size="small"
      >写评论</van-button>
      <!-- 评论条数显示 -->
      <van-icon
        class="comment-icon"
        name="comment-o"
        :info="articleComment.totalCount"
      />
      <!-- 收藏 -->
      <van-icon
        color="orange"
        :name="article.is_collected?'star':'star-o'"
        @click="collec"
      />
      <!-- 点赞 -->
      <van-icon
        color="#e5645f"
        :name="article.attitude === 1?'good-job':'good-job-o'"
        @click="likeArticle"
      />
      <!-- 转发 -->
      <van-icon class="share-icon" name="share" />
    </div>
    <!-- /底部区域 -->
    <!-- 发布文章品论 -->
      <van-popup
      v-model="isPostShow"
      position="bottom"
    >
      <div class="post-comment">
        <van-field
          class="post-field"
          v-model="postMessage"
          rows="2"
          autosize
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        />
        <van-button size="small" type="primary" @click="onAddComment" :disabled="!postMessage">发布</van-button>
      </div>
    </van-popup>
    <!-- 发布文章品论 -->
    <!-- 评论回复 -->
       <van-popup
      v-model="isReplyShow"
      position="bottom"
      style="height: 95%"
    >
   <comment-reply
        :article-id="articleId"
        v-if="isReplyShow"
        @click-close="isReplyShow = false"
        :comment="currentComment"
      />
    </van-popup>
    <!-- 评论回复 -->
</div>

</template>

<script>
import { getArticleDetails, collectArticle, deleteCollect, addLike, deleteLike } from '@/api/article'
import { addFocus, deleteFocus } from '@/api/user'
import { getComments, addComment } from '@/api/comment'
import CommentItem from '../../components/comment-item'
import CommentReply from '../../components/comment-reply'
export default {
  name: 'article-details',
  components: { CommentItem, CommentReply },
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      article: {},
      loading: false,
      articleComment: {
        list: [],
        loading: false,
        finished: false,
        offset: null, // 请求下一页数据的页码
        totalCount: 0 // 总数据条数
      },
      isPostShow: false, // 发布评论的显示
      postMessage: '', // 发布评论输入内容
      isReplyShow: false,
      currentComment: {} // 点击品论回复的那个对象
    }
  },
  created () {
    this.articleContent()
  },
  methods: {
    // 根据文章id来获取文章详情
    async articleContent () {
      this.loading = true
      try {
        let { data } = await getArticleDetails(this.articleId)
        this.article = data.data
        // console.log(this.articleinfo)
      } catch (err) {
        console.log(err)
      }
      this.loading = false
    },
    // 收藏和取消收藏
    async  collec () {
      // 收藏的时候可以添加互动
      // this.$toast.loading({
      //   duration: 0, // 持续展示 toast
      //   message: '操作中...',
      //   forbidClick: true // 是否禁止背景点击
      // })
      if (this.article.is_collected) {
        //  收藏状态，取消收藏
        // console.log(this.id)
        this.article.is_collected = false
        await deleteCollect(this.articleId)
        this.$toast.success('取消收藏')
      } else {
        // 没收藏状态，收藏
        await collectArticle(this.articleId)
        // 改变视图效果
        this.article.is_collected = true
        this.$toast.success('收藏成功')
      }
    },
    // 点赞和取消点赞
    async likeArticle () {
      // 收藏的时候可以添加互动
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        if (this.article.attitude === 1) {
        //  收藏状态，取消收藏
          // console.log(this.id)
          this.article.attitude = -1
          await deleteLike(this.articleId)
          // 改变视图效果

          console.log(this.article.attitude)
          this.$toast.success('取消点赞')
        } else {
        // 没收藏状态，收藏
          await addLike(this.articleId)
          // 改变视图效果
          this.article.attitude = 1
          this.$toast.success('点赞成功')
        }
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
    },
    // 关注和取消关注文章作者
    async focusUser () {
      try {
        const authorId = this.article.aut_id
        if (this.article.is_followed) {
        // 如果是关注则取消
          await deleteFocus(authorId)
        } else {
          await addFocus(authorId)
        }
        // 更新视图
        this.article.is_followed = !this.article.is_followed
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败')
      }
    },
    // 评论列表数据的获取
    async onLoad () {
      const articleComment = this.articleComment
      // 1. 请求获取数据
      const { data } = await getComments({
        type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.articleId, // 源id，文章id或评论id
        offset: articleComment.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: 10 // 每页大小
      })
      // 2. 将数据添加到列表中
      const { results } = data.data
      articleComment.list.push(...results)
      // 更新总数据条数
      articleComment.totalCount = data.data.total_count
      // 3. 将加载更多的 loading 设置为 false
      articleComment.loading = false
      // 4. 判断是否还有数据
      if (results.length) {
        articleComment.offset = data.data.last_id // 更新获取下一页数据的页码
      } else {
        articleComment.finished = true // 没有数据了，关闭加载更多
      }
    },
    // 发布品论
    async onAddComment () {
      const postMessage = this.postMessage
      if (!postMessage) {
        return
      }
      this.$toast.loading({
        duration: 0,
        message: '发布中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        let{ data } = await addComment({
          target: this.articleId, // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
          content: postMessage })
        // 关闭发布弹层
        this.isPostShow = false
        // 更新视图，发布的品论到最顶部
        this.articleComment.list.unshift(data.data.new_obj)
        // 评论数量显示增加
        this.articleComment.totalCount++
        // 最后清空文本框
        this.postMessage = ''
        this.$toast.success('发布成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('发布失败')
      }
    },
    async onReplyShow (comment) {
      // 将子组件中传给我评论对象存储到当前组件
      this.currentComment = comment
      this.isReplyShow = true
    }
  }

}
</script>

<style lang="less" scoped>
@import "./github-markdown.css";

.article-container {
  padding: 46px 20px 50px;
  background: #fff;
  .loading {
    padding-top: 100px;
    text-align: center;
  }
  .detail {
    .title {
      margin: 0;
      padding-top: 24px;
      font-size: 20px;
      color: #3A3A3A;
    }
    .author-wrap {
      padding: 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .base-info {
        display: flex;
        align-items: center;
        .avatar {
          width: 35px;
          height: 35px;
          margin-right: 5px;
        }
        .text {
          .name {
            margin: 0;
            font-size: 12px;
          }
          .time {
            margin: 0;
            font-size: 10px;
            color: #999;
          }
        }
      }
      .follow-btn {
        width: 85px;
      }
    }
  }
  .error {
    padding-top: 100px;
    text-align: center;
    .text {
      font-size: 15px;
    }
    .btn {
      width: 30%;
    }
  }
  .footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .write-btn {
      width: 160px;
    }
    .van-icon {
      font-size: 20px;
    }
    .comment-icon {
      bottom: -2px;
    }
    .share-icon {
      bottom: -2px;
    }
  }
    .post-comment {
    display: flex;
    align-items: flex-end;
    padding: 10px;
    .post-field {
      background: #f5f7f9;
      margin-right: 15px;
    }
  }
}
</style>
