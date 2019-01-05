// 城市
export const cityOptions = [
  {
    id: 1,
    name: '上海'
  },
  {
    id: 2,
    name: '北京'
  },
  {
    id: 3,
    name: '杭州'
  },
  {
    id: 4,
    name: '广州'
  },
  {
    id: 5,
    name: '深圳'
  }
]

// 五险一金缴纳比例
export const paymentRatioOptions = [
  {
    id: 1,
    value: {
      pension: [8, 20],
      medical: [2, 9.5],
      unemployment: [0.5, 0.5],
      workInjury: [0, 0.5],
      birth: [0, 1],
      provident: [7, 7]
    }
  },
  {
    id: 2,
    value: {
      pension: [8, 19],
      medical: [2, 10],
      unemployment: [0.2, 0.8],
      workInjury: [0, 0.4],
      birth: [0, 0.8],
      provident: [12, 12]
    }
  },
  {
    id: 3,
    value: {
      pension: [8, 14],
      medical: [2, 10.5],
      unemployment: [0.5, 0.5],
      workInjury: [0, 0.3],
      birth: [0, 1.2],
      provident: [12, 12]
    }
  },
  {
    id: 4,
    value: {
      pension: [8, 14],
      medical: [2, 7],
      unemployment: [0.2, 0.64],
      workInjury: [0, 0.4],
      birth: [0, 0.85],
      provident: [5, 5]
    }
  },
  {
    id: 5,
    value: {
      pension: [8, 13],
      medical: [2, 6.2],
      unemployment: [0.5, 0.9],
      workInjury: [0, 0.23],
      birth: [0, 0.45],
      provident: [5, 5]
    }
  }
]

// 五险一金缴纳基数范围
export const paymentBaseRangeOptions = [
  {
    id: 1,
    value: [
      { min: 4279, max: 21396 },
      { min: 2300, max: 21400 }
    ]
  },
  {
    id: 2,
    value: [
      { min: 3387, max: 25401 },
      { min: 2409, max: 25401 }
    ]
  },
  {
    id: 3,
    value: [
      { min: 3054.95, max: 15274.74 },
      { min: 1010, max: 24311 }
    ]
  },
  {
    id: 4,
    value: [
      { min: 3469, max: 20004 },
      { min: 2100, max: 24654 }
    ]
  },
  {
    id: 5,
    value: [
      { min: 2200, max: 25044 },
      { min: 2130, max: 25044 }
    ]
  }
]

// 五险一金映射
export const socialOptions = [
  { label: '养老保险金', key: 'pension' },
  { label: '医疗保险金', key: 'medical' },
  { label: '失业保险金', key: 'unemployment' },
  { label: '工伤保险金', key: 'workInjury' },
  { label: '生育保险金', key: 'birth' },
  { label: '住房公积金', key: 'provident' }
]

// 五险一金映射
export const additionalDeductionOptions = [
  { label: '子女教育', key: 'children' },
  { label: '继续教育', key: 'education' },
  { label: '大病医疗', key: 'hospital' },
  { label: '赡养老人', key: 'support' },
  { label: '住房贷款利息', key: 'loan' },
  { label: '住房租金', key: 'rent' }
]

// 个人所得税速查表
export const newTaxRatio = [
  [36000, 3, 0],
  [144000, 10, 2520],
  [300000, 20, 16920],
  [420000, 25, 31920],
  [660000, 30, 52920],
  [960000, 35, 85920],
  [null, 45, 181920]
]

// 年终奖个人所得税速查表
export const newBonusTaxRatio = [
  [36000, 3, 0],
  [144000, 10, 210],
  [300000, 20, 1410],
  [420000, 25, 2660],
  [660000, 30, 4410],
  [960000, 35, 7160],
  [null, 45, 15160]
]

// 最低工资
export const minSalaryMap = {
  1: 2420,
  2: 2120,
  3: 2010,
  4: 2100,
  5: 2200
}

const getTax = (bonus) => {
  for (const [max, ratio, deduction] of newBonusTaxRatio) {
    if (max === null || bonus <= max) return bonus * ratio / 100 - deduction
  }
}

// 年终奖与实际得手
const bonusData = []
for (let i = 0; i <= 1200; i++) {
  const bonus = i * 1000
  const tax = getTax(bonus)
  const realBonus = bonus - tax
  bonusData.push({ index: `${bonus}`, bonus, tax, realBonus })
}

export { bonusData }
