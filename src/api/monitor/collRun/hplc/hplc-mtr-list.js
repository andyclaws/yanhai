import axios from '@/libs/api.request'
import { addPre } from '../../util'
export const getHplcTaskList = (params) => {
  return axios.request({
    method: 'post',
    data: params,
    url: addPre('hplcTask/getHplcTaskList')
  })
}
export const queryList = (data) => {
  return axios.request({
    method: 'post',
    data: data,
    url: addPre('common/queryList')
  })
}
