import axios from '@/libs/api.request'
import {
  addPre
} from '@/api/util.js'

/**
 *
 * @param {*} params
 */
export const getChartData = params => {
  return axios.request({
    url: addPre('succrate/load-read-curve/getChartData'),
    method: 'post',
    data: params
  })
}
