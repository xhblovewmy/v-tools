<template>
  <div :class="$style.container">
    <el-form ref="form" :class="$style.form" size="mini" label-width="100px">
      <el-form-item label="时间">
          <el-time-picker format="HH:mm" v-model="data.chatTime"></el-time-picker>
      </el-form-item>
      <el-form-item label="聊天标题">
        <el-input v-model="data.chatName"></el-input>
      </el-form-item>
      <el-form-item label="聊天背景">
        <el-upload
          list-type="picture-card"
          :on-change="handleBackground"
          :auto-upload="false"
          action=""
          :show-file-list="false">
          <img :class="$style['preview-image']" :src="data.background" alt="" v-if="data.background">
          <i class="el-icon-plus" v-else></i>
        </el-upload>
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
      <el-form-item label="我的头像">
        <el-upload
          list-type="picture-card"
          :on-change="handleSelfAvatar"
          :auto-upload="false"
          action=""
          :show-file-list="false">
          <img :class="$style['preview-image']" :src="data.avatar" alt="" v-if="data.avatar">
          <i class="el-icon-plus" v-else></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="消息列表">
        <el-collapse v-model="activeIds">
          <el-collapse-item v-for="(message, index) in data.messageList" :key="message.id" :name="message.id" >
            <div slot="title" :class="$style.title">
              <span>消息 {{index + 1}}</span>
              <div>
                <el-button type="text" @click.stop="minus(message.id)" v-if="data.messageList.length !== 1">删除</el-button>
                <el-button type="text" @click.stop="add(message.id)">增加</el-button>
                <el-button type="text" @click.stop="copy(message.id)">复制</el-button>
              </div>
            </div>
            <el-form-item label="消息类型">
              <el-radio-group v-model="message.type">
                <el-radio label="text">文本消息</el-radio>
                <el-radio label="image">图片</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="文本消息" v-if="message.type === 'text'" >
              <el-input v-model="message.text" />
            </el-form-item>
            <el-form-item label="图片" v-else>
              <el-upload
                list-type="picture-card"
                :on-change="file => handlePictureCardPreview(file, message.id)"
                :auto-upload="false"
                action=""
                :show-file-list="false">
                <img :class="$style['preview-image']" :src="message.photo" alt="" v-if="message.photo">
                <i class="el-icon-plus" v-else></i>
              </el-upload>
            </el-form-item>
            <el-form-item label="本人消息">
                <el-radio-group v-model="message.isSelf">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="发送者昵称" v-if="!message.isSelf">
              <el-input v-model="message.nickname" />
            </el-form-item>
            <el-form-item label="发送者头像" v-if="!message.isSelf">
              <el-upload
                list-type="picture-card"
                :on-change="file => handleMessageAvatar(file, message.id)"
                :auto-upload="false"
                action=""
                :show-file-list="false">
                <img :class="$style['preview-image']" :src="message.avatar" alt="" v-if="message.avatar">
                <i class="el-icon-plus" v-else></i>
              </el-upload>
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
    <preview :form="data" :class="$style.preview" />
  </div>
</template>

<script>
import uuid from 'uuid'
import Preview from './preview'

const initMessage = {
  type: 'text',
  isSelf: true,
  nickname: '',
  avatar: '',
  photo: '',
  text: '我是消息',
  hasTime: false,
  time: null
}

export default {
  data () {
    const initId = uuid.v4()
    return {
      formEl: null,
      activeIds: [initId],
      data: {
        chatTime: new Date(),
        chatName: '我是标题',
        background: '',
        showNickname: true,
        nickname: '我是昵称',
        avatar: 'https://avatars3.githubusercontent.com/u/10060635?s=460&v=4',
        messageList: [
          {...initMessage, id: initId}
        ]
      }
    }
  },
  methods: {
    add (id) {
      const newId = uuid.v4()
      this.data.messageList = this.data.messageList.reduce((arr, item) => {
        if (item.id !== id) return [...arr, item]
        return [...arr, item, {...initMessage, id: newId}]
      }, [])
      this.activeIds = [...this.activeIds, newId]
    },
    minus (id) {
      this.data.messageList = this.data.messageList.filter(item => item.id !== id)
      this.activeIds = this.activeIds.filter(item => item.id !== id)
    },
    copy (id) {
      const newId = uuid.v4()
      this.data.messageList = this.data.messageList.reduce((arr, item) => {
        if (item.id !== id) return [...arr, item]
        return [...arr, item, {...item, id: newId}]
      }, [])
      this.activeIds = [...this.activeIds, newId]
    },
    handleBackground (file) {
      this.data.background = file.url
    },
    handleSelfAvatar (file) {
      this.data.avatar = file.url
    },
    handleMessageAvatar (file, id) {
      this.data.messageList = this.data.messageList.map(item => {
        if (item.id !== id) return item
        return {...item, avatar: file.url}
      })
    },
    handlePictureCardPreview (file, id) {
      this.data.messageList = this.data.messageList.map(item => {
        if (item.id !== id) return item
        return {...item, photo: file.url}
      })
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
  max-height 100%
  overflow hidden
  box-sizing border-box
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
    .title
      display flex
      justify-content space-between
      padding-right 20px
    .preview-image
      max-height 148px
      max-width 148px
      border-radius 6px
  .preview
    flex 1
</style>
