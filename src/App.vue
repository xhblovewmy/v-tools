<template>
  <el-container :class="$style['app-container']">
    <el-header height="44px" :class="$style.header">
      <span>{{ title }}</span>
      <span :class="$style.secret" @click="a"></span>
    </el-header>
    <el-container>
      <el-aside v-if="!isPhone && withMenu">
        <v-menu />
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menu from '@/components/menu'
import bus from '@/bus'

export default {
  data () {
    return {
      isPhone: false
    }
  },
  created () {
    this.handleResize()
    window.onresize = this.handleResize
  },
  methods: {
    handleResize () {
      this.isPhone = document.body.clientWidth <= 960
    },
    a () {
      console.log(this.$route)
      if (this.$route.name === 'test-page') {
        this.$router.push({ path: '/' })
      } else {
        this.$router.push({ name: 'test-page', params: { pageName: 'home' } })
      }
    }
  },
  computed: {
    title () {
      return bus.title
    },
    withMenu () {
      return bus.withMenu
    }
  },
  components: { 'v-menu': Menu }
}
</script>

<style lang="stylus" module>
html, body
  margin 0
  padding 0
.app-container
  height 100vh
  .header
    display flex
    justify-content space-between
    align-items center
    background #46a0fc
    color #fff
    .secret
      width 20px
      height 100%
</style>
