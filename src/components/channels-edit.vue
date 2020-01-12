<template>
  <div class="ChannelsEdit">
  <van-cell title="我的频道" class="nav-cell">
      <van-button
       @click="closeicon=!closeicon"
        size="mini"
         round type="danger"
         plain>{{closeicon?'完成':'编辑'}}</van-button>
      </van-cell>
      <!-- 我的频道格子 -->
<van-grid :gutter="10">
  <van-grid-item
    v-for="(item,index) in userChannels"
    :key="item.id"
    :text="item.name"
    @click="editchannels(index)"
  >
  <van-icon v-show="closeicon&&index!==0" class="close-icon" name="clear" slot="icon"></van-icon>
  </van-grid-item>
</van-grid>
<!-- 频道推荐 全部频道-->
<van-cell title="频道推荐" class="nav-cell"/>
<van-grid :gutter="10">
  <van-grid-item
    v-for="(item,index) in remainingChannels"
    :key="index"
    :text="item.name"
    @click="addchannels(item)"
  />
</van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/allchannels'
import { setItem } from '@/utils/storage'
export default {
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      AllChannels: [],
      closeicon: false
    }
  },
  watch: {
    userChannels () {
      setItem('userChannels', this.userChannels)
    }
  },
  computed: {
    //   接口只有全部频道列表的，频道推荐=全部频道-我的频道
    remainingChannels () {
      const { AllChannels, userChannels } = this
      let channels = []
      AllChannels.forEach(item => {
        if (!userChannels.find(items => items.id === item.id)) {
          channels.push(item)
        }
      })
      return channels
    }

  },
  methods: {
    //   接口只有全部频道列表的，频道推荐=全部频道-我的频道
    async allChannels () {
      let { data } = await getAllChannels()
      this.AllChannels = data.data.channels
    },
    // 点击推荐频道添加到我的频道中,因为
    addchannels (channels) {
      this.userChannels.push(channels)
    },
    // 编辑频道功能
    editchannels (index) {
      if (this.closeicon && index !== 0) {
        //  编辑状态
        this.userChannels.splice(index, 1)
      } else {
        // 点击跳转到相应的频道
        // 1.点其中的一个频道关闭弹窗
        this.$emit('input', index)
        this.$emit('close')
        // 3.改变频道默认active切换相应频道
      }
    }

  },
  created () {
    this.allChannels()
  }
}
</script>

<style lang="less" scoped>
.ChannelsEdit{
     padding: 44px 0;
     .nav-cell{
       font-size: 16px;
       color:#333333;
     }
    /deep/.van-grid-item__icon-wrapper{
        position: absolute;
        top:-11px;
        right: -6px;
        font-size: 16px;
     }
}
</style>
