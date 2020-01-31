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
            <p class="time">{{article.pubdate}}</p>
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
        class="write-btn"
        type="default"
        round
        size="small"
      >写评论</van-button>
      <!-- 评论条数显示 -->
      <van-icon
        class="comment-icon"
        name="comment-o"
        info="9"
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
</div>

</template>

<script>
import { getArticleDetails, collectArticle, deleteCollect, addLike, deleteLike } from '@/api/article'
import { addFocus, deleteFocus } from '@/api/user'
export default {
  name: 'article-details',
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      article: {},
      loading: false
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
}
</style>
