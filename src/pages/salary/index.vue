<template>
  <div>
    <el-form label-width="200px">
      <!-- <el-form-item label="税前薪资">
        <el-input v-model="salary">
          <template slot="append">元</template>
        </el-input>
      </el-form-item> -->
      <el-form-item label="城市">
        <el-select v-model="cityId" filterable placeholder="请选择">
          <el-option
            v-for="city in cityOptions"
            :key="city.id"
            :label="city.name"
            :value="city.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="接受教育子女数">
        <el-radio-group v-model="additionalDeduction.children">
          <el-radio :label="0">无</el-radio>
          <el-radio :label="1000">1个</el-radio>
          <el-radio :label="2000">2个以上</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="个人继续教育情况">
        <el-radio-group v-model="additionalDeduction.adultEducation" :class="$style['radio-group-vertical']">
          <el-radio :label="0">无</el-radio>
          <el-radio :label="400">学历继续教育（教育期间）</el-radio>
          <el-radio :label="300">技能人员职业资格继续教育（已获取相关证书）</el-radio>
          <el-radio :label="300">专业技术人员职业资格继续教育（已获取相关证书）</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="税后薪资（旧税法）">
        <el-input v-model="oldAtSalary" disabled>
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
      <el-form-item label="税后薪资（新税法）">
        <el-input v-model="newAtSalary" disabled>
          <template slot="append">元</template>
        </el-input>
      </el-form-item>
    </el-form>
    <el-card :class="$style.card">
      <div slot="header">
        <div>五险一金 <span>（总计：{{ socialFundCount | currency }}）</span></div>
      </div>
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
    </el-card>
    <el-card :class="$style.card" header="个人所得税">
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
    </el-card>
  </div>
</template>

<script>
import { paymentRatioOptions, paymentBaseAreaOptions, cityOptions } from '@/const/salary'

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
      salary: 25000, // 税前工资
      cityId: 1,
      additionalDeduction: { // 定向专项扣除
        children: 0, // 子女教育
        adultEducation: 0, // 继续教育
        homeLoan: 0, // 住房贷款
        housingRent: 0, // 住房租金
        parent: 0 // 赡养父母
      },
      socialOptions: [ // 五险一金映射
        { label: '养老保险金', key: 'pension' },
        { label: '医疗保险金', key: 'medical' },
        { label: '失业保险金', key: 'unemployment' },
        { label: '工伤保险金', key: 'workInjury' },
        { label: '生育保险金', key: 'birth' },
        { label: '住房公积金', key: 'provident' }
      ],
      taxBase: [3500, 5000], // 个人所得税起征点
      taxRatioList: { // 个人所得税速查表
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
      },
      cityOptions
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
    },
    paymentRatio () {
      return paymentRatioOptions.find(item => item.id === this.cityId).value
    },
    paymentBaseArea () {
      return paymentBaseAreaOptions.find(item => item.id === this.cityId).value
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
.card
  margin-bottom 20px
.radio-group-vertical
  :global
    .el-radio
      display block
      margin-left 0
      margin-top 12px
.table
  width 600px
  margin-left 100px
  .row
    display flex
    span
      flex 1
</style>
