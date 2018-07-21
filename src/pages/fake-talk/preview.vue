<template>
  <div :class="$style.container">
    <div v-html="canvas"></div>
    <div>
      <el-button @click="snapshot">截图</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['form'],
  data () {
    return {
      canvas: ''
    }
  },
  methods: {
    snapshot () {
      console.log(this.form)
    }
  }
}
</script>

<style lang="stylus" module>
</style>
