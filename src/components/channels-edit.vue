<template>
  <div class="ChannelsEdit">
  <van-cell title="我的频道" class="nav-cell">
      <van-button size="mini" round type="danger" plain>编辑</van-button>
      </van-cell>
      <!-- 我的频道格子 -->
<van-grid :gutter="10">
  <van-grid-item
    v-for="item in userChannels"
    :key="item.id"
    :text="item.name"
  />
</van-grid>
<!-- 频道推荐 全部频道-->
<van-cell title="频道推荐" class="nav-cell"/>
<van-grid :gutter="10">
  <van-grid-item
    v-for="(item,index) in remainingChannels"
    :key="index"
    :text="item.name"
  />
</van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/allchannels'
export default {
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      AllChannels: []
    }
  },
  computed: {
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
}
</style>
