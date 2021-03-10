import axios from '@/libs/api.login'

/**
 * 查询系统角色类型
 * @param data
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
// export const listUrl = 'sea-system/sysRoleAttr/list'
export const listUrl = 'sea-system/sysRole/list'
export const list = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: listUrl
  })
}

/**
 * 保存系统角色类型
 * @param data
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const save = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    // url: 'sea-system/sysRoleAttr/save'
    url: 'sea-system/sysRole/save'
  })
}

/**
 * 查询系统角色类型详情
 * @param data
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const detail = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    // url: 'sea-system/sysRoleAttr/detail'
    url: 'sea-system/sysRole/detail'
  })
}

/**
 *
 * @param data
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const update = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    // url: 'sea-system/sysRoleAttr/update'
    url: 'sea-system/sysRole/update'
  })
}

/**
 * 删除系统角色类型
 * @param data
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const del = (roleId) => {
  return axios.request({
    method: 'post',
    // data: data,
    url: 'sea-system/sysRole/delete/' + roleId
  })
}
