<template>
  <div class="post-comment">
    <!--
      value 用来指定文本框的数据内容
      当文本框输入数据的时候会触发 input 事件，它会把输入的数据通过该事件传递出来
      模板中的 $event 表示事件参数
     -->
    <van-field
      v-model="message"
      class="post-field"
      rows="2"
      autosize
      :value="value"
      @input="$emit('input', $event)"
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button
      size="small"
      type="primary"
      :disabled="!value"
      @click="$emit('click-post')"
    >发布</van-button>
  </div>
</template>

<script>
export default {
  name: 'PostComment',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  align-items: flex-end;
  padding: 10px;
  .post-field {
    background: #f5f7f9;
    margin-right: 15px;
  }
}
</style>
