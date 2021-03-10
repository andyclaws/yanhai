import axios from '@/libs/api.request'
import utils from '@/libs/api.utils'

export const loadTree = () => {
  return axios.request({
    url: 'error_url',
    method: 'post'
  })
}
