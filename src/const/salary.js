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
  }
]

// 缴纳基数范围
export const paymentBaseAreaOptions = [
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
  }
]

// 租赁情况
export const rentOptions = [
  {
    id: 1,
    value: 1200
  },
  {
    id: 2,
    value: 1200
  },
  {
    id: 3,
    value: 1200
  }
]

// 受教育子女数量
export const childrenOptions = [
  {
    label: '无',
    key: 'a',
    value: 0
  },
  {
    label: '一个',
    key: 'b',
    value: 1000
  },
  {
    label: '两个',
    key: 'c',
    value: 2000
  },
  {
    label: '三个',
    key: 'd',
    value: 3000
  }
]

// 个人继续教育情况
export const educationOptions = [
  {
    label: '无',
    key: 'a',
    value: 0
  },
  {
    label: '学历继续教育（教育期间）',
    key: 'b',
    value: 400
  },
  {
    label: '技能人员职业资格继续教育（已获取相关证书）',
    key: 'c',
    value: 300
  },
  {
    label: '专业技术人员职业资格继续教育（已获取相关证书）',
    key: 'd',
    value: 300
  }
]

// 赡养老人情况
export const supportOptions = [
  {
    label: '独生子女',
    key: 'a',
    value: 2000
  },
  {
    label: '2个',
    key: 'b',
    value: 1000
  },
  {
    label: '3个',
    key: 'c',
    value: 667
  },
  {
    label: '4个',
    key: 'd',
    value: 500
  }
]

// 住房贷款情况
export const loanOptions = [
  {
    label: '无住房贷款',
    key: 'a',
    value: 0
  },
  {
    label: '首套房贷款',
    key: 'b',
    value: 1000
  },
  {
    label: '非首套房贷款',
    key: 'c',
    value: 0
  }
]
