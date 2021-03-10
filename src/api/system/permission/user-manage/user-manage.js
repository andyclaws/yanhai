import axios from '@/libs/api.login'

/**
 * 获取下拉框
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const selectBoxData = () => {
  return axios.request({
    method: 'get',
    url: 'sea-system/sysUser/selectBoxData'
  })
}

/**
 * 查询供电单位所属部门
 * @param data
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const queryDept = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'sea-system/sysUser/queryDept'
  })
}

/**
 * 根据角色类型查询角色
 * @param data
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const queryByRoleAttrId = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'sea-system/sysUser/queryRoleByRoleAttrId'
  })
}

/**
 * 角色状态
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const roleStatusList = () => {
  return axios.request({
    method: 'get',
    url: 'sea-system/sysRole/roleStatusList'
  })
}

/**
 * 查询系统用户
 * @param data
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const list = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'sea-system/sysUser/list'
  })
}

/**
 * 查询专业类别
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const getFieldType = () => {
  return axios.request({
    method: 'get',
    url: 'sea-system/sysRole/getFieldType'
  })
}

/**
 * 查询角色类型
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const getRoleAttrList = () => {
  return axios.request({
    method: 'get',
    url: 'sea-system/sysRole/getRoleAttrList'
  })
}

/**
 * 根据角色类型查询所有角色
 * @param data
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const queryRoleByRoleAttrId = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'sea-system/sysRole/queryRoleByRoleAttrId'
  })
}

/**
 * 角色类型对应的菜单
 * @param data
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const roleAttrMenuList = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'sea-system/sysRole/roleAttrMenuList'
  })
}

/**
 * 保存系统角色
 * @param data
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const save = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'sea-system/sysRole/save'
  })
}

/**
 * 保存系统用户
 * @param data
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const saveUser = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'sea-system/sysUser/saveUser'
  })
}

/**
 * 修改系统用户
 * @param data
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const updateUser = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'sea-system/sysUser/updateUser'
  })
}

/**
 * 根据userId查询用户
 * @param data
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const queryUserByUserId = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'sea-system/sysUser/queryUserByUserId'
  })
}

/**
 * 查询读写主站数据权限
 * @param data
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const rwStations = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'sea-system/sysRole/rwStations'
  })
}

/**
 * 查询读写终端数据权限
 * @param data
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const rwTmnls = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'sea-system/sysRole/rwTmnls'
  })
}

/**
 * 查询系统角色详情
 * @param data
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const detail = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'sea-system/sysRole/detail'
  })
}

/**
 * 更新系统角色
 * @param data
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const update = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'sea-system/sysRole/update'
  })
}

/**
 * 删除系统角色
 * @param data
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const del = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'sea-system/sysRole/delete'
  })
}

/**
 * 更新系统角色状态
 * @param data
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const changeStatus = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'sea-system/sysRole/changeStatus'
  })
}
