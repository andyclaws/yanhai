import axios from 'axios'
import config from '@/config'
import { getToken, getTokenType, setToken, setTokenType } from '@/libs/util'
import { clearLoginInfo } from '@/libs/index'
import router from '@/router'
import iView from 'iview'

class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }

  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        //
      }
    }
    return config
  }

  destroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // iView.Spin.hide()
    }
  }

  interceptors (instance, url) {
    instance.options.emulateJSON = true
    // 请求拦截
    instance.interceptors.request.use(config => {
      // Selenium模拟浏览器 事件记录与封杀
      let webDriver = window.navigator.webdriver
      if (webDriver) {
        console.log('Selenium模拟浏览器 监控')
      }
      // 添加全局的loading...
      if (!Object.keys(this.queue).length) {
        // iView.Spin.show({
        //   render: (h) => {
        //     return h('div', [
        //       h('Icon', {
        //         'class': 'demo-spin-icon-load',
        //         props: {
        //           type: 'ios-loading',
        //           size: 30
        //         }
        //       }),
        //       h('div', '加载中......')
        //     ])
        //   }
        // })
      }
      this.queue[url] = true
      config.headers['token'] = getToken()// 请求头带上token
      config.headers['sea-auth'] = getTokenType() + '.' + getToken()
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      this.destroy(url)
      const { data, status } = res
      if (res.data && res.data.code === 401) { // 401, token失效
        clearLoginInfo()
        router.push({ name: 'login' })
      } else if (res.data && res.status !== 200) {
        iView.Message.error(res.data.msg)
      }
      return { data, status }
    }, error => {
      this.destroy(url)
      let errorInfo = error.response
      if (!errorInfo) {
        const { request: { statusText, status }, config } = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: { responseURL: config.url }
        }
        iView.Message.error('调用服务器接口异常！')
      } else if (errorInfo && (errorInfo.status === 400 || errorInfo.status === 500)) {
        iView.Message.error(errorInfo.status === 500 ? '后台程序异常, 查询失败！' : errorInfo.data.msg)
      }
      return Promise.reject(error)
    })
  }

  request (options) {
    const instance = axios.create({
      timeout: 1000 * config.axiosTimeOut,
      withCredentials: true,
      headers: {
        // 'Content-Type': 'application/json; charset=utf-8'
        'Content-Type': 'application/json'
      }
    })
    // 安徽现场 与原有用采系统集成 从前台直接获取token
    if (options.url === 'sea-auth/tokenLogin') {
      setToken(options.data)
      setTokenType('bearer')
    }
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest
