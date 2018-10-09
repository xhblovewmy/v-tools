<template>
  <div>
    <el-form label-width="200px">
      <el-form-item label="税前薪资">
        <el-input v-model="salary">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="税后薪资（旧税法）">
        <el-input v-model="oldAtSalary">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="税后薪资（新税法）">
        <el-input v-model="newAtSalary">
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
    </el-form>
    <p>五险一金 <span>（总计：{{ socialFundCount | currency }}）</span></p>
    <div :class="$style.table">
      <div :class="$style.row">
        <span></span>
        <span>个人缴纳金额</span>
        <span>单位缴纳金额</span>
      </div>
      <div v-for="({ label, key }) in socialOptions" :key="key" :class="$style.row">
        <span>{{ label }}</span>
        <span>{{ socialFund[key][0] | currency }}</span>
        <span>{{ socialFund[key][1] | currency }}</span>
      </div>
    </div>
    <p>个人所得税</p>
    <div :class="$style.table">
      <div :class="$style.row">
        <span>扣除五险一金后薪资</span>
        <span>{{ salary - socialFundCount | currency }}</span>
      </div>
      <div :class="$style.row">
        <span>个人所得税（旧税法）</span>
        <span>{{ tax.old | currency }}</span>
      </div>
      <div :class="$style.row">
        <span>个人所得税（新税法）</span>
        <span>{{ tax.new | currency }}</span>
      </div>
    </div>
  </div>
</template>

<script>
const middle = (a, b, c) => {
  const min = Math.min(a, b)
  const max = Math.max(a, b)
  if (c < min) return min
  if (c > max) return max
  return c
}
export default {
  data () {
    return {
      salary: 0,
      paymentRatio: {
        pension: [8, 20],
        medical: [2, 9.5],
        unemployment: [0.5, 0.5],
        workInjury: [0, 0.2],
        birth: [0, 1],
        provident: [7, 7]
      },
      paymentBaseArea: [
        { min: 4279, max: 21396 },
        { min: 2300, max: 21400 }
      ],
      socialOptions: [
        { label: '养老保险金', key: 'pension' },
        { label: '医疗保险金', key: 'medical' },
        { label: '失业保险金', key: 'unemployment' },
        { label: '工伤保险金', key: 'workInjury' },
        { label: '生育保险金', key: 'birth' },
        { label: '住房公积金', key: 'provident' }
      ],
      taxBase: [3500, 5000],
      taxRatioList: {
        new: [
          [3000, 3, 0],
          [12000, 10, 210],
          [25000, 20, 1410],
          [35000, 25, 2660],
          [55000, 30, 4410],
          [80000, 35, 7160],
          [null, 45, 15160]
        ],
        old: [
          [1500, 3, 0],
          [4500, 10, 105],
          [9000, 20, 555],
          [35000, 25, 1005],
          [55000, 30, 2755],
          [80000, 35, 5505],
          [null, 45, 13505]
        ]
      }
    }
  },
  methods: {
    calcTax (num, mode) {
      const base = mode === 'old' ? num - this.taxBase[0] : num - this.taxBase[1]
      if (base < 0) return 0
      for (const [max, ratio, deduction] of this.taxRatioList[mode]) {
        console.log(base, max, ratio, deduction)
        if (max === null || base <= max) return base * ratio / 100 - deduction
      }
    }
  },
  computed: {
    socialFund () {
      return Object.keys(this.paymentRatio).reduce((obj, key) => {
        const value = this.paymentRatio[key].map(ratio => {
          const area = key === 'provident' ? this.paymentBaseArea[1] : this.paymentBaseArea[0]
          return +(middle(this.salary, area.min, area.max) * ratio / 100).toFixed(2)
        })
        return {
          ...obj,
          [key]: value
        }
      }, {})
    },
    socialFundCount () {
      return Object.keys(this.socialFund).reduce((res, key) => res + this.socialFund[key][0], 0)
    },
    tax () {
      const salaryBase = this.salary - this.socialFundCount
      return {
        old: +(this.calcTax(salaryBase, 'old')).toFixed(2),
        new: +(this.calcTax(salaryBase, 'new')).toFixed(2)
      }
    },
    oldAtSalary () {
      const tax = this.tax.old
      const socialCount = this.socialFundCount
      return +(this.salary - socialCount - tax).toFixed(2)
    },
    newAtSalary () {
      const tax = this.tax.new
      const socialCount = this.socialFundCount
      return +(this.salary - socialCount - tax).toFixed(2)
    }
  },
  filters: {
    currency (value) {
      if (!value) return '-'
      return `￥ ${value} 元`
    }
  }
}
</script>

<style lang="stylus" module>
.line
  display flex
  > div
    margin-right 20px
.table
  width 600px
  margin-left 100px
  .row
    display flex
    span
      flex 1
</style>
