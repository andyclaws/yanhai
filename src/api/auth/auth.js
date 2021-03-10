import axios from '@/libs/api.login'
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

const loginBaseUrl = config.baseUrl.login

export const getCaptchaPath = (uuid) => {
  return loginBaseUrl + `sea-auth/captcha.jpg?uuid=${uuid}`
}

/**
 * 登录
 * @param data
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const login = (data) => {
  return axios.request({
    method: 'post',
    url: 'sea-auth/token',
    data: data
  })
}

/**
 * 注销
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const logout = () => {
  return axios.request({
    method: 'post',
    url: 'sea-auth/logout'
  })
}

/**
 * 获取登录信息
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const getUserInfo = () => {
  return axios.request({
    url: 'sea-auth/getUserInfo',
    method: 'get'
  })
}

/**
 * 获取公共通知
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const getPublicNotice = () => {
  return axios.request({
    url: 'sea-auth/publicNotice',
    method: 'post'
  })
}

/**
 * 获取未读信息
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const getUnreadCount = () => {
  return axios.request({
    url: 'sea-auth/getUnreadCount',
    method: 'get'
  })
}
