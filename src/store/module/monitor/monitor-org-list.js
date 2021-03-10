import { initOrg, childOrgs } from '@/api/monitor/keyIndex/common/org'
export default {
  state: {
    orgM: {
      hasDataM: false,
      dataM: [],
      loadingDataM: false,
      orgName: '',
      orgNo: '',
      orgType: ''
    },
    cons: {

    }
  },
  mutations: {
    setOrgHasDataM (state, hasData) {
      state.orgM.hasDataM = hasData
    },
    setOrgListDataM (state, orgListData) {
      state.orgM.dataM = orgListData
    },
    setorgLoadingDataM (state, loadingData) {
      state.orgM.loadingDataM = loadingData
    },
    setorgNameM (state, orgName) {
      state.orgM.orgName = orgName
    },
    setorgNoM (state, orgNo) {
      state.orgM.orgNo = orgNo
    },
    setorgTypeM (state, orgType) {
      state.orgM.orgType = orgType
    }
  },
  getters: {
    orgHasDataM: state => state.orgM.hasDataM,
    orgListDataM: state => state.orgM.dataM,
    orgLoadingDataM: state => state.orgM.loadingDataM
  },
  actions: {
    initOrgListDataM ({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        commit('setorgLoadingDataM', true)
        initOrg(data).then(res => {
          const data = res.data
          if (data.code === 200 && data.data) {
            commit('setorgNameM', data.data[0].orgName)
            commit('setorgNoM', data.data[0].orgNo)
            commit('setorgTypeM', data.data[0].orgType)
            commit('setOrgHasDataM', true)
            commit('setOrgListDataM', data.data.map(item => {
              item.loading = false
              item.children = []
              return item
            }))
          }
        }).catch(err => {
          reject(err)
        })
        commit('setorgLoadingDataM', false)
        resolve()
      })
    },
    loadOrgListDataM ({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        console.log('入参： ', data)
        commit('setorgLoadingDataM', true)
        let queryData = { pOrgNo: data.orgNo, pOrgType: data.orgType }
        childOrgs(queryData).then(res => {
          const data = res.data
          if (data.code === 200 && data.data) {
            resolve(data.data.map(item => {
              item.loading = false
              item.children = []
              return item
            }))
          }
        }).catch(err => {
          reject(err)
        })
        commit('setorgLoadingDataM', false)
      })
    }
  }
}
