export const cityOptions = [
  {
    id: 1,
    name: '上海'
  }
]

export const paymentRatioOptions = [
  {
    id: 1,
    value: { // 五险一金缴纳比例
      pension: [8, 20],
      medical: [2, 9.5],
      unemployment: [0.5, 0.5],
      workInjury: [0, 0.2],
      birth: [0, 1],
      provident: [7, 7]
    }
  }
]

export const paymentBaseAreaOptions = [
  {
    id: 1,
    value: [ // 缴纳基数范围
      { min: 4279, max: 21396 },
      { min: 2300, max: 21400 }
    ]
  }
]
