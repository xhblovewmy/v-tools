<template>
  <el-container>
    <el-header height="44px" class="header">{{ title }}</el-header>
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
  data () {
    return {
      title: ''
    }
  },
  mounted () {
    bus.$on('changeTitle', title => {
      this.title = title
    })
  },
  components: { 'v-menu': Menu }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
}
.header {
  display: flex;
  align-items: center;
  background: #46a0fc;
  color: #fff;
}
</style>
