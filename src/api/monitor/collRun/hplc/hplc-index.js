import axios from '@/libs/api.request'
import { addPre } from '../../util'
export const getHplcRate = (params) => {
  return axios.request({
    method: 'post',
    data: params,
    url: addPre('hplcIndex/getHplcRate')
  })
}
export const getHplcOrgRank = (params) => {
  return axios.request({
    method: 'post',
    data: params,
    url: addPre('hplcIndex/getHplcOrgRank')
  })
}
export const getHplcCharts = (params) => {
  return axios.request({
    method: 'post',
    data: params,
    url: addPre('hplcIndex/getHplcCharts')
  })
}
export const getHplcPillar = (params) => {
  return axios.request({
    method: 'post',
    data: params,
    url: addPre('hplcIndex/getHplcPillar')
  })
}
