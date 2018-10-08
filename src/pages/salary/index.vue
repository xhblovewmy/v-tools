<template>
  <div>
    <el-form>
      <el-form-item label="税前薪资" label-width="100px">
        <div :class="$style.line">
          <div>
            <el-input v-model="salary">
              <template slot="append">元</template>
            </el-input>
          </div>
          <el-button type="primary">点击计算</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      salary: 0
    }
  }
}
</script>

<style lang="stylus" module>
.line
  display flex
  > div
    margin-right 20px
</style>
