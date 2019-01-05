<template>
  <div>
    <el-form label-width="100px" @submit.native.prevent>
      <el-form-item label="年终奖">
        <el-input-number
          v-model="bonus"
          :min="0"
          :step="100"
          controls-position="right"
        />
      </el-form-item>
      <el-form-item label="缴税">
        <span> {{ tax | currencyFitler }}</span>
      </el-form-item>
      <el-form-item label="实发年终奖">
        <span> {{ realBonus | currencyFitler }}</span>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  newBonusTaxRatio
} from '@/const/salary'
export default {
  data () {
    return {
      bonus: 0
    }
  },
  filters: {
    currencyFitler (value) {
      if (value === null || value === undefined) return null
      return `￥ ${value.toFixed(2)} 元`
    }
  },
  computed: {
    tax () {
      for (const [max, ratio, deduction] of newBonusTaxRatio) {
        if (max === null || this.bonus <= max) return this.bonus * ratio / 100 - deduction
      }
    },
    realBonus () {
      return this.bonus - this.tax
    }
  }
}
</script>

<style lang="stylus" module>

</style>
