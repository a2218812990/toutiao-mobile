<template>
  <div class="user-profile">
    <van-nav-bar
      title="编辑资料"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell-group>
      <van-cell title="头像" is-link>
        <van-image
          width="30"
          height="30"
          round
          :src="user.photo"
        />
      </van-cell>
      <van-cell title="昵称" :value="user.name" is-link @click="isEditNameShow=true" />
      <!-- <van-cell title="介绍" :value="user." is-link /> -->
      <van-cell title="性别" :value="user.gender === 0 ? '男' : '女'" is-link />
      <van-cell title="生日" :value="user.birthday" is-link />
    </van-cell-group>
    <!-- 编辑昵称 -->
    <van-popup
      v-model="isEditNameShow"
      position="bottom">
       <editname :name="user.name"
        @close="isEditNameShow = false"
        @confirm="onSaveName">
        </editname>
      </van-popup>
  </div>
</template>

<script>
import { getUserProfile, editUserProfile } from '@/api/user'
import editname from '../../components/user/edit-name'
export default {
  name: 'UserProfile',
  components: { editname },
  props: {},
  data () {
    return {
      user: {}, // 用户个人资料
      isEditNameShow: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getProfile()
  },
  mounted () {},
  methods: {
    //   获取用户个人信息
    async getProfile () {
      try {
        let{ data } = await getUserProfile()
        // console.log(data)
        this.user = data.data
      } catch (err) {
        console.log(err)
        this.$toast.fail('获取数据失败')
      }
    },
    // 封装更新用户资料的方法，修改昵称性别和生日都是这个方法
    async updateuser (name, value) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '更新中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        await editUserProfile({ [name]: value })
        this.$toast.success('更新成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('更新失败')
      }
    },
    // 修改名字
    async onSaveName (name) {
      await this.updateuser({ name })
      this.user.name = name
      this.isEditNameShow = false
    }
  }
}
</script>

<style scoped></style>
