<template>
  <div>
    <el-menu :default-active="$route.name" @select="changeMenu">
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
    console.log(this.$route.name, menu.map(item => item.name))
  },
  methods: {
    changeMenu (key, keyPath) {
      console.log(key, keyPath)
      this.$router.push({name: key})
    }
  }
}
</script>
