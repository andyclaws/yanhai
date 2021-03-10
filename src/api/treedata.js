import axios from '@/libs/api.request'

export const getTreeData = () => {
  return axios.request({
    url: '/treeData',
    method: 'post'
  })
}
