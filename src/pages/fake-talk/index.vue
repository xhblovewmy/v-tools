<template>
  <div :class="$style.container">
    <el-form :class="$style.form" size="mini" label-width="100px">
      <el-form-item label="时间">
          <el-time-picker format="HH:mm" v-model="data.chatTime"></el-time-picker>
      </el-form-item>
      <el-form-item label="聊天标题">
        <el-input v-model="data.chatName"></el-input>
      </el-form-item>
      <el-form-item label="显示昵称">
        <el-radio-group v-model="data.showNickname">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="我的昵称" v-if="data.showNickname">
        <el-input v-model="data.nickname"></el-input>
      </el-form-item>
      <el-form-item label="消息列表">
        <el-collapse v-model="activeIndexes">
          <el-collapse-item :title="`消息 ${ index + 1 }`" v-for="(message, index) in data.messageList" :key="index" :name="index" >
              <el-form-item label="消息类型">
                <el-radio-group v-model="message.type">
                  <el-radio label="text">文本消息</el-radio>
                  <el-radio label="image">图片</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="文本消息" v-if="message.type === 'text'" >
                <el-input v-model="message.text" />
              </el-form-item>
              <el-form-item label="图片" v-else></el-form-item>
              <el-form-item label="本人消息">
                  <el-radio-group v-model="message.isSelf">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
              </el-form-item>
              <el-form-item label="发送者昵称" v-if="!message.isSelf">
                <el-input v-model="message.nickname" />
              </el-form-item>
              <el-form-item label="包含时间">
                  <el-radio-group v-model="message.hasTime">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
              </el-form-item>
              <el-form-item label="时间" v-if="message.hasTime">
                <el-time-picker format="HH:mm" v-model="message.time"></el-time-picker>
              </el-form-item>
          </el-collapse-item>
        </el-collapse>
      </el-form-item>
    </el-form>
    <preview :class="$style.preview" />
  </div>
</template>

<script>
import Preview from './preview'

const initMessage = {
  type: 'text',
  isSelf: true,
  nickname: '',
  photo: '',
  text: '',
  hasTime: false,
  time: null
}

export default {
  data () {
    return {
      activeIndexes: [0],
      data: {
        chatTime: new Date(),
        chatName: '小伟哥',
        showNickname: true,
        nickname: 'vvliebe',
        messageList: [
          {...initMessage}
        ]
      }
    }
  },
  components: {
    Preview
  }
}
</script>

<style lang="stylus" module>
.container
  display flex
  justify-content space-between
  padding 20px
  .form
    flex 1
    max-height 100%
    border 1px solid #ddd
    border-radius 10px
    padding 20px
    box-sizing border-box
    overflow auto
    margin-right 20px
    .list-item
      border 1px solid #ddd
      header
        padding-left 20px
  .preview
    flex 1
</style>
