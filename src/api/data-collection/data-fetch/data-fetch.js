import axios from '@/libs/api.request'

/**
 * 根据终端查询
 * @returns {http.ClientRequest | * | void | AxiosPromise<any> | ClientHttp2Stream}
 */
export const queryByTmnl = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'sea-dataCollection/dataFetch/queryByTmnl'
  })
}

/**
 * 根据用户查询
 * @param data
 * @returns {http.ClientRequest | * | void | AxiosPromise<any> | ClientHttp2Stream}
 */
export const queryByCons = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'sea-dataCollection/dataFetch/queryByCons'
  })
}

/**
 * 根据电表资产号查询
 * @param data
 * @returns {http.ClientRequest | * | void | AxiosPromise<any> | ClientHttp2Stream}
 */
export const queryByAssetNo = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'sea-dataCollection/dataFetch/queryByAssetNo'
  })
}

/**
 * 查询376.1实时
 * @param data
 * @returns {http.ClientRequest | * | void | AxiosPromise<any> | ClientHttp2Stream}
 */
export const query376_1Real = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'sea-dataCollection/dataFetch/query376_1Real'
  })
}

/**
 * 查询376.1历史
 * @param data
 * @returns {http.ClientRequest | * | void | AxiosPromise<any> | ClientHttp2Stream}
 */
export const query376_1His = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'sea-dataCollection/dataFetch/query376_1His'
  })
}

/**
 * 查询面向对象
 * @param data
 * @returns {http.ClientRequest | * | void | AxiosPromise<any> | ClientHttp2Stream}
 */
export const queryOopDataItem = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'sea-dataCollection/dataFetch/queryOopDataItem'
  })
}
