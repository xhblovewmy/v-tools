<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="税前薪资">
        <el-input-number
          v-model="salary"
          :min="minSalaryMap[cityId]"
          :step="100"
          controls-position="right"
        />
      </el-form-item>
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
      <div :class="$style.card">
        <p :class="$style.title">专项附加扣除</p>
        <div :class="$style.list">
          <el-form-item :class="$style.item" v-for="option in additionalDeductionOptions" :key="option.key" :label="option.label">
              <el-input-number
                v-model="additionalDeduction[option.key]"
                :min="0"
                :step="100"
                controls-position="right"
              />
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div :class="$style.card">
      <div :class="$style.header">
        <p :class="$style.title">税后薪资 与 个人所得税</p>
        <el-button type="text" @click="showTax = !showTax">{{ showTax ? '折叠' : '展开' }}</el-button>
      </div>
      <div :class="$style.list" v-if="showTax">
        <div :class="$style.table">
          <div :class="$style.row">
            <span>月份</span>
            <span>税后薪资</span>
            <span>个人所得税</span>
          </div>
          <div v-for="(tax, index) in newTaxYear" :key="index" :class="$style.row">
            <span>{{ index + 1 }} 月</span>
            <span>{{ realSalaryYear[index] | currencyFitler }}</span>
            <span>{{ tax | currencyFitler }}</span>
          </div>
          <div :class="$style.row">
            <span>总计</span>
            <span>{{ realSalaryYearCount | currencyFitler }}</span>
            <span>{{ newTaxYearCount | currencyFitler }}</span>
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.card">
      <div :class="$style.header">
        <p :class="$style.title">五险一金</p>
        <el-button type="text" @click="showPayment = !showPayment">{{ showPayment ? '折叠' : '展开' }}</el-button>
      </div>
      <template v-if="showPayment">
        <p>个人缴纳 - (总计：{{ this.paymentCount[0] | currencyFitler }})</p>
        <div :class="$style.list">
          <div v-for="option in socialOptions" :key="option.key" :class="$style.item">
            <span>{{ option.label }}</span>
            <span>{{ payment[option.key][0] | currencyFitler }}</span>
          </div>
        </div>
        <p>公司缴纳 - (总计：{{ this.paymentCount[1] | currencyFitler }})</p>
        <div :class="$style.list">
          <div v-for="option in socialOptions" :key="option.key" :class="$style.item">
            <span>{{ option.label }}</span>
            <span>{{ payment[option.key][1] | currencyFitler }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import {
  cityOptions,
  paymentBaseRangeOptions,
  paymentRatioOptions,
  additionalDeductionOptions,
  newTaxRatio,
  socialOptions,
  minSalaryMap
} from '@/const/salary'

export default {
  data () {
    return {
      salary: 0, // 税前薪资
      cityId: 1,
      additionalDeduction: { // 专项附加扣除
        rent: 0,
        children: 0,
        education: 0,
        support: 0,
        loan: 0,
        hospital: 0
      },
      cityOptions,
      additionalDeductionOptions,
      socialOptions,
      minSalaryMap,
      showTax: true,
      showPayment: true
    }
  },
  methods: {
    getTax (taxBase, count) {
      if (taxBase <= 0) return 0
      for (const [max, ratio, deduction] of newTaxRatio) {
        if (max === null || taxBase <= max) return taxBase * ratio / 100 - deduction - count
      }
    }
  },
  filters: {
    currencyFitler (value) {
      if (value === null || value === undefined) return null
      return `￥ ${value.toFixed(2)} 元`
    }
  },
  computed: {
    paymentBaseRange () { // 五险一金缴纳基数范围
      return paymentBaseRangeOptions.find(option => option.id === this.cityId).value
    },
    paymentRatio () { // 五险一金缴纳比例
      return paymentRatioOptions.find(option => option.id === this.cityId).value
    },
    paymentBase () { // 五险一金缴纳基数
      return this.paymentBaseRange.map(item => {
        const { min, max } = item
        if (this.salary > max) return max
        if (this.salary < min) return min
        return this.salary
      })
    },
    payment () { // 五险一金缴纳金额
      return Object.keys(this.paymentRatio).reduce((obj, key) => {
        const value = this.paymentRatio[key].map(ratio => {
          const paymentBase = key === 'provident' ? this.paymentBase[1] : this.paymentBase[0]
          return paymentBase * ratio / 100
        })
        return { ...obj, [key]: value }
      }, {})
    },
    paymentCount () { // 五险一金缴纳总额
      return Object.keys(this.payment)
        .map(key => this.payment[key])
        .reduce(
          ([selfCount, companyCount], [self, company]) => [selfCount + self, companyCount + company],
          [0, 0]
        )
    },
    additionalDeductionCount () { // 专项附加扣除总和
      return Object.keys(this.additionalDeduction)
        .map(key => this.additionalDeduction[key])
        .reduce((a, b) => a + b, 0)
    },
    taxBase () { // 计税基数
      return Math.max(this.salary - this.paymentCount[0] - this.additionalDeductionCount - 5000, 0)
    },
    newTaxYear () {
      const taxList = []
      let count = 0
      for (let i = 1; i <= 12; i++) {
        const tax = this.getTax(this.taxBase * i, count)
        taxList.push(tax)
        count += tax
      }
      return taxList
    },
    newTaxYearCount () {
      return this.newTaxYear.reduce((a, b) => a + b, 0)
    },
    realSalaryYear () {
      return this.newTaxYear.map(tax => this.salary - this.paymentCount[0] - tax)
    },
    realSalaryYearCount () {
      return this.realSalaryYear.reduce((a, b) => a + b, 0)
    }
  }
}
</script>

<style lang="stylus" module>
.card
  border 1px solid #eeeeee
  border-radius 10px
  margin-bottom 20px
  font-size 14px
  .header
    display flex
  .title
    font-size 16px
    font-weight bolder
    margin-right 20px
  p
    margin-left 20px
  .list
    display flex
    flex-wrap wrap
    padding 0 20px
    .item
      min-width 33.3%
      line-height 40px
      >span
        margin-right 10px
  .table
    .row
      display flex
      >span
        text-align right
      >span:first-child
        width 40px
      >span:not(:first-child)
        width 140px
</style>
