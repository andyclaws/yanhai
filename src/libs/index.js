import router from '@/router'
import store from '@/store'

// import lazyLoading from './lazyLoading.js'

/**
 * 获取uuid
 */
export function getUUID () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  })
}

/**
 * 是否有权限
 * @param {*} key
 */
export function isAuth (key) {
  return JSON.parse(sessionStorage.getItem('permissions') || '[]').indexOf(key) !== -1 || false
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate (data, id = 'id', pid = 'parentId') {
  var res = []
  var temp = {}
  for (var i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
  }
  for (var k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['children']) {
        temp[data[k][pid]]['children'] = []
      }
      if (!temp[data[k][pid]]['_level']) {
        temp[data[k][pid]]['_level'] = 1
      }
      data[k]['_level'] = temp[data[k][pid]]._level + 1
      temp[data[k][pid]]['children'].push(data[k])
    } else {
      res.push(data[k])
    }
  }
  return res
}

/**
 * 清除登录信息
 */
export function clearLoginInfo () {
  // Vue.cookie.delete('token')
  sessionStorage.setItem('token', '')
  store.commit('resetStore')
  router.options.isAddDynamicMenuRoutes = false
}

/**
 * 判断是否在数组中
 */
export function contains (arr, obj) {
  var i = arr.length
  while (i--) {
    if (arr[i] === obj) {
      return true
    }
  }
  return false
}

/**
 * 数组删除指定元素
 */
export function removeByValue (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      arr.splice(i, 1)
      break
    }
  }
  return arr
}

/**
 * 数组取并集
 */
export function intersect () {
  var result = []
  var obj = {}
  for (var i = 0; i < arguments.length; i++) {
    for (var j = 0; j < arguments[i].length; j++) {
      var str = arguments[i][j]
      if (!obj[str]) {
        obj[str] = 1
      } else {
        obj[str]++
        if (obj[str] === arguments.length) {
          result.push(str)
        }
      }
    }
  }
  return result
}

/**
 * 将数组拼接成string，以逗号隔开
 * @returns {string}
 */
export function splice () {
  var result = ''
  for (var i = 0; i < arguments.length; i++) {
    for (var j = 0; j < arguments[i].length; j++) {
      var str = arguments[i][j]
      result += str + ','
    }
  }
  return result.length > 0 ? result.substr(0, result.length - 1) : ''
}

/**
 * 获取供电单位列表
 * @returns {any}
 */
export function getOrgList () {
  return JSON.parse(sessionStorage.getItem('orgList') || '[]')
}

/**
 * 获取菜单列表
 * @returns {any}
 */
export function getMenuList () {
  return JSON.parse(sessionStorage.getItem('menuList') || '[]')
}

/**
 * 对Object数组进行指定属性的值进行排序
 * @param propertyName
 * @param type
 * @returns {Function}
 */
export function compare (propertyName, type) {
  type = type || 'asc'
  if (type === 'asc') {
    return function (object1, object2) {
      let value1 = object1[propertyName]
      let value2 = object2[propertyName]
      if (value2 < value1) {
        return 1
      } else if (value2 > value1) {
        return -1
      } else {
        return 0
      }
    }
  } else if (type === 'desc') {
    return function (object1, object2) {
      let value1 = object1[propertyName]
      let value2 = object2[propertyName]
      if (value2 > value1) {
        return 1
      } else if (value2 < value1) {
        return -1
      } else {
        return 0
      }
    }
  }
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function menuTranslate (data, Main, parentView, id = 'id', pid = 'pId') {
  var res = []
  var temp = {}
  for (var i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
  }
  for (var k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['children']) {
        temp[data[k][pid]]['children'] = []
      }
      if (!temp[data[k][pid]]['_level']) {
        temp[data[k][pid]]['_level'] = 1
      }
      data[k]['_level'] = temp[data[k][pid]]._level + 1
      // data[k]['component'] = import(`@/view${data[k]['component']}`)
      temp[data[k][pid]]['children'].push(data[k])
    } else {
      data[k]['component'] = Main
      res.push(data[k])
    }
  }
  router.push(res)
  return res
}

/**
 * 日期月份/天的显示，如果是1位数，则在前面加上'0'
 * @param arg
 * @returns {string}
 */
export function getFormatDate (arg) {
  if (arg === undefined || arg === '') {
    return ''
  }
  let re = arg + ''
  if (re.length < 2) {
    re = '0' + re
  }
  return re
}

/**
 *格式化日期工具
 * @param date string类型的日期
 * @param days 增加或减去多少天 int 类型
 * @returns {string}
 */
export function formatDate (date = dateToString(new Date(), undefined), days = 0) {
  // 非string参数按照空处理 防止传过来date类型报错
  if (typeof (date) !== 'string') {
    date = ''
  }
  let dd
  if (date.length === 0) {
    dd = new Date()
  } else {
    dd = new Date(date)
  }
  dd.setDate(dd.getDate() + days)
  let month = dd.getMonth() + 1
  let day = dd.getDate()
  return dd.getFullYear() + '-' + getFormatDate(month) + '-' + getFormatDate(day)
}
export function getLastMonthMaxDay () {
  let date = formatDate()
  var year = date.substr(0, 4)
  var month = date.substr(5, 2)
  var day = date.substr(8, 2)
  var thisDay = new Date(year, month, 0)
  var maxThisDay = thisDay.getDate()
  if (month === '01') {
    year = year - 1
    month = '12'
  } else {
    if (month <= 10) {
      month = '0' + (month - 1)
    } else {
      month = (month - 1)
    }
  }
  var lastDay = new Date(year, month, 0)
  var maxLastDay = lastDay.getDate()
  if (day > maxLastDay) {
    day = maxLastDay
  } else if (day === maxThisDay) {
    day = maxLastDay
  }
  return year + '-' + month + '-' + day
}

/**
 * 获取所得时间年份
 * @param date
 * @returns {string}
 */
export function formatDateToYear (date = dateToString(new Date(), undefined)) {
  // 非string参数按照空处理 防止传过来date类型报错
  if (typeof (date) !== 'string') {
    date = ''
  }
  let dd
  if (date.length === 0) {
    dd = new Date()
  } else {
    dd = new Date(date)
  }
  return dd.getFullYear() + ''
}
/**
 * 日期转string
 * @param date
 * @returns {string}
 */
export function dateToString (date, isMonth) {
  let year = date.getFullYear()
  let month = (date.getMonth() + 1).toString()
  let day = (date.getDate()).toString()
  if (month.length === 1) {
    month = '0' + month
  }
  if (day.length === 1) {
    day = '0' + day
  }
  let dateTime = isMonth ? year + '-' + month : year + '-' + month + '-' + day
  return dateTime
}

/**
 * String日期转date
 * @param dateStr
 * @param separator
 * @returns {Date}
 */
export function stringToDate (dateStr, separator = '-') {
  let dateArr = dateStr.split(separator)
  let year = parseInt(dateArr[0])
  let month
  if (dateArr[1].indexOf('0') === 0) {
    month = parseInt(dateArr[1].substring(1))
  } else {
    month = parseInt(dateArr[1])
  }
  let day = dateArr.length === 3 ? parseInt(dateArr[2]) : 1
  let date = new Date(year, month - 1, day)
  return date
}

// scrollTop animation
export function scrollTop (el, from = 0, to, duration = 500, endCallback) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60)
      }
    )
  }
  const difference = Math.abs(from - to)
  const step = Math.ceil(difference / duration * 50)

  function scroll (start, end, step) {
    if (start === end) {
      endCallback && endCallback()
      return
    }

    let d = (start + step > end) ? end : start + step
    if (start > end) {
      d = (start - step < end) ? end : start - step
    }

    if (el === window) {
      window.scrollTo(d, d)
    } else {
      el.scrollTop = d
    }
    window.requestAnimationFrame(() => scroll(d, end, step))
  }

  scroll(from, to, step)
}

/**
 * 判断浏览器版本
 * @returns {string}
 */
export function myBrowser () {
  let userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
  let isOpera = userAgent.indexOf('Opera') > -1 // 判断是否Opera浏览器
  let isIE = userAgent.indexOf('compatible') > -1 &&
    userAgent.indexOf('MSIE') > -1 && !isOpera // 判断是否IE浏览器
  let isEdge = userAgent.indexOf('Edge') > -1 // 判断是否IE的Edge浏览器
  let isFF = userAgent.indexOf('Firefox') > -1 // 判断是否Firefox浏览器
  let isSafari = userAgent.indexOf('Safari') > -1 &&
    userAgent.indexOf('Chrome') === -1 // 判断是否Safari浏览器
  let isChrome = userAgent.indexOf('Chrome') > -1 &&
    userAgent.indexOf('Safari') > -1 // 判断Chrome浏览器

  if (isIE) {
    let reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(userAgent)
    let fIEVersion = parseFloat(RegExp['$1'])
    if (fIEVersion === 7) {
      return 'IE7'
    } else if (fIEVersion === 8) {
      return 'IE8'
    } else if (fIEVersion === 9) {
      return 'IE9'
    } else if (fIEVersion === 10) {
      return 'IE10'
    } else if (fIEVersion === 11) {
      return 'IE11'
    } else {
      return '0'
    }// IE版本过低
  }
  if (isOpera) {
    return 'Opera'
  }
  if (isEdge) {
    return 'Edge'
  }
  if (isFF) {
    return 'Firefox'
  }
  if (isSafari) {
    return 'Safari'
  }
  if (isChrome) {
    return 'Chrome'
  }
}

/**
 * 判断是否需要升级浏览器，非chromeo 74 的判定都需要升级
 * @returns {boolean}
 */
export function needUpdateBrowser () {
  let browserType = myBrowser()
  let needUpdate = true
  let userAgent = navigator.userAgent
  if (browserType === 'Chrome' && parseInt(userAgent.substr(userAgent.indexOf('Chrome/') + 7, 2)) > 74) {
    needUpdate = false
  }
  return needUpdate
}

/**
 * 数字格式化方法
 * @param val 初始值
 * @param digit 保留小数点位数 (默认2位小数)
 * @param rounding 是否四舍五入 (默认四舍五入)
 * @returns {string}
 */
export function numberFormat (val, digit = 2, rounding = true) {
  let data = parseFloat(val)
  if (Number.isNaN(data)) {
    return ''
  }
  if (rounding) {
    return data.toFixed(digit)
  } else {
    return Math.floor(data * 100) / 100
  }
}

/**
 * Array 转 map
 * @param arr
 * @returns {map}
 */
export function arrToMap (arr, keyName = 'value', valueName = 'name') {
  let map = new Map()
  if (typeof arr !== 'undefined' && arr.length > 0) {
    for (let index = 0; index < arr.length; index++) {
      map.set(arr[index][keyName], arr[index][valueName])
    }
  }
  return map
}
