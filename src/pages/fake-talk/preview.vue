<template>
  <div :class="$style.container">
    <div :class="$style.button">
      <el-button @click="snapshot" type="primary">下载聊天记录截图（png格式）</el-button>
    </div>
    <div :class="$style.preview" ref="preview">
      <div :class="$style.header">
        <span>{{form.chatTime | dateFormat}}</span>
        <span>{{form.chatName}}</span>
        <img :src="headerImage" alt="">
      </div>
      <div :class="$style.body">
        <div v-for="message in form.messageList" :key="message.id" :class="$style.message">
          <div v-if="message.hasTime" :class="$style.time">
            <div>{{ message.time | dateFormat }}</div>
          </div>
          <div :class="[$style.content, $style.self]" v-if="message.isSelf">
            <div :class="$style.main">
              <!-- <div :class="$style.nickname" v-if="form.showNickname">{{ form.nickname }}</div> -->
              <div v-if="message.type === 'text'" :class="[$style.text, $style.self]">{{ message.text }}</div>
              <div v-else :class="[$style.photo, $style.self]">
                <img :src="message.photo" alt="">
              </div>
            </div>
            <div :class="$style.avatar">
              <img :src="form.avatar" alt="">
            </div>
          </div>
          <div :class="$style.content" v-else>
            <div :class="$style.avatar">
              <img :src="message.avatar" alt="">
            </div>
            <div :class="$style.main">
              <div :class="$style.nickname" v-if="form.showNickname">{{ message.nickname }}</div>
              <div v-if="message.type === 'text'" :class="[$style.text, $style.other]">{{ message.text }}</div>
              <div v-else :class="[$style.photo, $style.self]">
                <img :src="message.photo" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div :class="$style.footer">
        <img :src="footerImage" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import dateFormat from 'dateformat'
import headerImage from '@/assets/fake-talk/header.png'
import footerImage from '@/assets/fake-talk/footer.png'

export default {
  props: ['form'],
  data () {
    return {
      canvas: null,
      previewImage: null,
      headerImage,
      footerImage
    }
  },
  methods: {
    async snapshot () {
      console.log(this.$refs.preview)
      this.canvas = await html2canvas(this.$refs.preview)
      this.previewImage = this.canvas.toDataURL().replace('image/png', 'image/octet-stream')
      window.location.href = this.previewImage
    }
  },
  filters: {
    dateFormat (value) {
      if (!value) return ''
      return dateFormat(value, 'HH:MM')
    }
  }
}
</script>

<style lang="stylus" module>
.button
  margin-bottom 20px
.preview
  width 375px
  img
    max-width 100%
  .header
    position relative
    color #fff
    span
      position absolute
      &:first-of-type
        left 50%
        top 1px
        font-size 12px
        transform translate(-50%, 0)
      &:last-of-type
        left 50%
        bottom 14px
        transform translate(-50%, 0)
  .header,
  .footer
    margin-bottom -5px

.body
  overflow hidden
  min-height 559px
  background #ebebeb
  .message
    margin 10px 0
  .time
    display flex
    justify-content center
    font-size 12px
    padding-top 10px
    div
      padding 0 6px
      border-radius 4px
      background #cecece
      color #f8f8f8
  .content
    display flex
    .main
      display flex
      flex-direction column
    &.self
      justify-content flex-end
      .main
        align-items flex-end
  .nickname
    color #999999
    font-size 12px
    margin-bottom 5px
    min-height 17px
  .text
    position relative
    padding 10px
    border-radius 5px
    word-break break-all
    min-height 42px
    box-sizing border-box
    &.other
      background #fff
      margin 0 75px 0 0
      &:before
        content ''
        position absolute
        width 0
        height 0
        top 15px
        left -12px
        border 6px solid transparent
        border-right 6px solid #fff
    &.self
      background #b2e36e
      margin 0 0 0 75px
      &:before
        content ''
        position absolute
        width 0
        height 0
        top 15px
        right -12px
        border 6px solid transparent
        border-left 6px solid #b2e36e
  .photo
    &.other
      margin 0 75px 0 0
    &.self
      margin 0 0 0 75px
    img
      max-width 100%
      border-radius 5px
  .avatar
    margin 0 10px
    width 45px
    height 45px
    flex-shrink 0
    img
      width 100%
      height 100%
</style>
