/**
 * 获取属性
 * @param data 数组数据
 * @param index 数组下标
 * @param key 数据里每个对象的key
 */
export function getData (data, index, key) {
  if (!data) {
    return ''
  }
  if (data.length - 1 < index) {
    return ''
  }
  if (data[index][key] || data[index][key] === 0) {
    return data[index][key]
  } else {
    return ''
  }
}

/**
 * 获取title名称
 * @param dateType 日期类型 day 日 month 月
 * @param dayTitle 日title
 * @param titleMon 月title
 * @param defaultTitle
 * @returns {*}
 */
export function getTitle (dateType, dayTitle, monthTitle, defaultTitle = '') {
  let title = dateType === 'day' ? dayTitle : monthTitle
  if (title && title !== '') {
    return title
  } else {
    return defaultTitle
  }
}

/**
 * 获取title是否显示
 * @param dateType
 * @param dayShow
 * @param monthShow
 * @param defaultShow
 * @returns {*}
 */
export function getTitleShow (dateType, dayShow, monthShow, defaultShow = true) {
  let show = dateType === 'day' ? dayShow : monthShow
  if (typeof (show) === 'boolean') {
    return show
  } else {
    return defaultShow
  }
}

/**
 * 判空
 * @param val
 * @returns {string}
 */
export function judgeNull (val, defaultValue = '-') {
  let result = defaultValue
  if (val !== null && val !== undefined && val !== '') {
    result = val
  }
  return result
}

/**
 * targetValueKey: 需要值的key
 * @param val
 * @returns {string}
 */
export function accordTypeEvaluation(arr, typeValue, targetValueKey, typeKey) {
  let typeName
  for (let i = 0; i < arr.length; i++) {
    if (typeValue === arr[i][typeKey]) {
      typeName = arr[i][targetValueKey]
    }
  }
  return typeName
}

