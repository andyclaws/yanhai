export default {
  /**
   * @description 配置显示在浏览器标签的title
   */
  title: '',
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,
  /**
   * @description 是否使用国际化，默认为false
   *              如果不使用，则需要在路由中给需要在菜单中展示的路由设置meta: {title: 'xxx'}
   *              用来在菜单中显示文字
   */
  useI18n: true,
  /**
   * @description api请求基础路径
   */
  baseUrl: {
    dev: 'http://127.0.0.1:8088/',
    // dev: 'http://192.168.176.7:7300/mock/5cd4dc078d93a40024d49abe',
    // dev: 'http://101.133.225.37:8088/',
    // dev: 'http://192.168.43.56:8088/',
    //dev: 'http://47.92.66.49:8088/',
    // dev: 'http://39.98.152.222:8088/',
    // dev: 'http://20.78.132.133:9999/',
    // dev: 'http://192.168.176.7:7300/mock/5cd4dc078d93a40024d49abe',
    pro: 'http://47.92.66.49:8088/',
    // pro: 'http://10.215.12.207:7300/mock/5cc16494c6a8f100247f80b1/'
    // login: 'http://127.0.0.1:20008/'
    login: 'http://47.92.66.49:6380/'
  },
  // 全业务监控
  monitorBaseUrl: {
    dev: 'http://10.215.12.209:89/monitor/#',
    pro: 'http://10.215.12.209:89/monitor/#'
  },
  /**
   * @description axios请求超时时间
   */
  axiosTimeOut: 30,
  /**
   * @description 默认打开的首页的路由name值，默认为home
   */
  // homeName: 'SyntheticalAnalysis',
  homeName: 'home',
  /**
   * @description 需要加载的插件
   */
  plugin: {
    'error-store': {
      showInHeader: true, // 设为false后不会在顶部显示错误日志徽标
      developmentOff: true // 设为true后在开发环境不会收集错误信息，方便开发中排查错误
    }
  },
  /**
   * 营销业务监控 服务前缀
   */
  monitorPre: 'hzwq-monitor/',
  needCheckBrowser: true, // 是否检查浏览器并提供下载
  browserDownload: { // 下载地址
    url: 'http://20.78.132.133:28080/group1/M00/00/00/FE6EhFznTC2AB943A2QiABYxswI589.msi',
    backUp1: 'http://20.78.132.132:28888/group1/M00/00/00/FE6EhFznTC2AB943A2QiABYxswI589.msi',
    backUp2: 'http://20.78.132.133:28888/group1/M00/00/00/FE6EhFznTC2AB943A2QiABYxswI589.msi',
    backUp3: 'http://20.78.132.134:28888/group1/M00/00/00/FE6EhFznTC2AB943A2QiABYxswI589.msi',
    backUp4: 'http://10.215.12.207/miss/index.php?explorer/fileDownload&accessToken=fcd7KRRzTZ2rQz5rWtwFT1pOw2MAZG-uJgrWyYeXZAIWRzoPcEyf4ZuiAKMILe8jFiJ-khRhOw&path=%7BgroupPath%7D%3A1%2F%E8%BD%AF%E4%BB%B6%2FGoogleChrome74_x86.msi'
  },
  // 允许导出全部最大条数
  exportExcelMax: 20000,
  modelNo: '07',
  publicKey: `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCpp8A8/67GMcXQuOwUEbZySxQZK8YCSY4/GA5JBbuknRahCmAW07GEifxkOLWEo8NGwGxafSmaQwt6QWIhou2cEC9/VHd8Au8bn88keBeJlukRiEBuYwdOirJsS3S9m1XMPZOed4u/9zo4VQwnjqqPnbnNMxWxBwJTNr1rPdSkFQIDAQAB`
}
