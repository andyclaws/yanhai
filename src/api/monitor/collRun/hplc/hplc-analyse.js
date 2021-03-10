import axios from '@/libs/api.request'
import { addPre } from '../../util'
export const getAnalyseList = (params) => {
  return axios.request({
    method: 'post',
    data: params,
    url: addPre('hplcAnalyse/getAnalyseList')
  })
}
