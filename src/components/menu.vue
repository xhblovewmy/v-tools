<template>
  <div :class="$style.container">
    <el-menu :default-active="$route.name" @select="changeMenu" :class="$style.menu">
      <el-menu-item v-for="item in menu" :key="item.name" :index="item.name">
        <i :class="item.iconClass"></i>
        <span slot="title">{{ item.title }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import menu from '@/const/menu'

export default {
  data () {
    return {
      menu
    }
  },
  created () {
    // console.log(this.$route.name, menu.map(item => item.name))
  },
  methods: {
    changeMenu (key, keyPath) {
      this.$router.push({name: key})
    }
  }
}
</script>

<style lang="stylus" module>
.container
  display flex
  flex-direction column
  height 100%
  .menu
    flex 1
</style>
