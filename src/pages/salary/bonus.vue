<template>
  <div>
    <el-form label-width="100px" @submit.native.prevent>
      <el-form-item label="税前年终奖">
        <el-input-number
          v-model="bonus"
          :min="0"
          :step="100"
          controls-position="right"
        />
      </el-form-item>
      <el-form-item label="个人所得税">
        <span> {{ tax | currencyFitler }}</span>
      </el-form-item>
      <el-form-item label="实发年终奖">
        <span> {{ realBonus | currencyFitler }}</span>
      </el-form-item>
    </el-form>
    <ve-line
      v-for="(chartData, index) in chartDatas"
      :key="index"
      :data="chartData"
      :settings="chartSetting"
    />
  </div>
</template>

<script>
import {
  newBonusTaxRatio,
  bonusData
} from '@/const/salary'
export default {
  data () {
    return {
      bonus: 0,
      chartSetting: {
        metrics: ['bonus', 'tax', 'realBonus'],
        dimension: ['index'],
        area: true,
        // stack: { 'bonus': ['realBonus', 'tax'] },
        labelMap: {
          bonus: '税前年终奖',
          tax: '个人所得税',
          realBonus: '实发工资'
        }
      },
      chartDatas: []
    }
  },
  created () {
    const levels = [100, 350, 600, 800, 1200]
    const chartDatas = levels.map((max, index) => {
      const start = index === 0 ? 0 : levels[index - 1]
      return bonusData.slice(start, max)
    }).map(rows => ({
      columns: [ 'index', 'bonus', 'realBonus', 'tax' ],
      rows
    }))
    this.chartDatas = chartDatas
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
