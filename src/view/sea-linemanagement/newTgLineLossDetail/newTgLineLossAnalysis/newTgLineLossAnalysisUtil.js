
export const ruleValidate = {
  orgNo: [
    { required: true, message: '供电单位不能为空', trigger: 'blur' }
  ],
  selectDateType: [
    { required: true, message: '请选择查询维度', trigger: 'blur' }
  ],
  selectDate: [
    { required: true, message: '查询日期不能为空', trigger: 'blur' }
  ]
}

export const tgStatusList = [
  { value: '-1', label: '全部' }, { value: '01', label: '投运' }, { value: '02', label: '停运' }, { value: '03', label: '拆除' }
]

export const tgFlagList = [
  { value: '-1', label: '全部' }, { value: '01', label: '公变' }, { value: '02', label: '专变' }
]

export const nullObj = {
  'status': '',
  'tgName': '',
  'ranking': '',
  'healthScore': '',
  'accountManagerName': '',
  'tgNo': '',
  'tgId': '',
  'tgStatus': '',
  'tgFlag': '',
  'tmnlAddr': '',
  'instAddr': '',
  'zongMetCnt': '',
  'lowConsCnt': '',
  'gcMetCnt': '',
  'lineLoseElec': '',
  'ppq': '',
  'spq': '',
  'gpq': '',
  'tgLoadRate': '',
  'collectMetCnt': '',
  'coverMetNum': '',
  'meetNeedNum': '',
  'readSuccNum': '',
  'readSuccRate': '',
  'coverMetRate': '',
  'replaceMetCnt': '',
  'replaceTFactor': '',
  'calcErrorCnt': '',
  'unCoverCnt': '',
  'powerAbnormalCnt': '',
  'dataAbnormalCnt': '',
  'distributionAbnormalCnt': '',
  'zeroPowerCnt': '',
  'meteringAbnormalCnt': '',
  'stealElecCnt': '',
  'dataDate': '',
  'dateType': '',
  'accountManagerNo': '',
  'downFromYesterday': '',
  'linkRelativeDown': '',
  'tgOrgNo': '',
  'tgOrgName': '',
  'transformerCapacity': '',
  'tgHomeNum': '',
  'lllr': ''
}
export function getExceptType (tableName) {
  let exceptType = ''
  switch (tableName) {
    // 1：计量异常
    //   2：用电异常
    //   3：配变异常
    //   4：档案异常
    //   5：疑似窃电
    case 'tgMeteringAbnormalDetail':
      exceptType = '1'
      break
    case 'tgPowerAbnormalDetail':
      exceptType = '2'
      break
    case 'tgDistributionAbnormalDetail':
      exceptType = '3'
      break
    case 'tgDataAbnormalDetail':
      exceptType = '4'
      break
    case 'tgStealElectricityDetail':
      exceptType = '5'
      break
  }
  return exceptType
}

export function getExStatus (name) {
  // '0' 正常 '1' 高损 '2' 负损 '3' 线损不可算"
  let exStatus = ''
  switch (name) {
    case 'highLoss':
      exStatus = '1'
      break
    case 'normal':
      exStatus = '0'
      break
    case 'all':
      exStatus = '-1'
      break
    case 'alarm':
      exStatus = '2'
      break
    case 'noCount':
      exStatus = '3'
      break
  }
  return exStatus
}
