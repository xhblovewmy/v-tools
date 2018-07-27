<template>
  <el-container :class="$style['app-container']">
    <el-header height="44px" :class="$style.header">{{ title }}</el-header>
    <el-container>
      <el-aside>
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
  computed: {
    title () {
      return bus.title
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
    align-items center
    background #46a0fc
    color #fff
</style>
