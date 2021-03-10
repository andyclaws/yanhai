import axios from '@/libs/api.login'

/**
 * 查询菜单
 * @param data
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const list = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'sea-system/sysmenu/list'
  })
}

/**
 * 保存
 * @param data
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const save = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'sea-system/sysmenu/save'
  })
}

/**
 * 查询详情
 * @param menuId
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const menuDetail = (menuId) => {
  return axios.request({
    method: 'get',
    // url: 'sea-system/menu/detail/' + menuId
    url: 'sea-system/sysmenu/info/' + menuId
  })
}

/**
 * 修改
 * @param data
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const update = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'sea-system/sysmenu/update'
  })
}

/**
 * 删除
 * @param menuId
 * @returns {*|void|ClientRequest|AxiosPromise<any>|ClientHttp2Stream}
 */
export const deleteMenu = (menuId) => {
  return axios.request({
    method: 'post',
    // url: 'sea-system/menu/delete/' + menuId
    url: 'sea-system/sysmenu/delete/' + menuId
  })
}

/**
 * -----------------------------------------------------------------------------------------------------------------
 */

/**
 * 初始化菜单
 * @returns {http.ClientRequest | * | void | AxiosPromise<any> | ClientHttp2Stream}
 */
export const initMenuTree = () => {
  return axios.request({
    method: 'get',
    url: 'sea-system/menu/initMenuTree'
  })
}

/**
 * 查询下级菜单
 * @param data
 * @returns {http.ClientRequest | * | void | AxiosPromise<any> | ClientHttp2Stream}
 */
export const menuTreeChild = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'sea-system/menu/menuTreeChild'
  })
}

export const menuTree = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: 'sea-system/sysmenu/menuTree'
  })
}
/**
 * 切换状态
 * @param data
 * @returns {*|never|Promise<any | never>}
 */
export const changeStatus = (menuId) => {
  return axios.request({
    method: 'post',
    url: 'sea-system/sysmenu/changeStatus/' + menuId
  })
}
