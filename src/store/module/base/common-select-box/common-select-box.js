import { initOrg, childOrgs } from '@/api/base/common-select-box/org'
export default {
  state: {
    org: {
      hasData: false,
      data: [],
      loadingData: false
    },
    cons: {

    }
  },
  mutations: {
    setOrgHasData (state, hasData) {
      state.org.hasData = hasData
    },
    setOrgListData (state, orgListData) {
      state.org.data = orgListData
    },
    setorgLoadingData (state, loadingData) {
      state.org.loadingData = loadingData
    }
  },
  getters: {
    orgHasData: state => state.org.hasData,
    orgListData: state => state.org.data,
    orgLoadingData: state => state.org.loadingData
  },
  actions: {
    initOrgListData ({ state, commit }) {
      return new Promise((resolve, reject) => {
        commit('setorgLoadingData', true)
        initOrg().then(res => {
          const data = res.data
          if (data.code === 200 && data.data) {
            commit('setOrgHasData', true)
            commit('setOrgListData', data.data.map(item => {
              item.loading = false
              item.expand = true

              let child = []
              let queryData = { pOrgNo: item.orgNo, pOrgType: item.orgType }
              childOrgs(queryData).then(res => {
                const data = res.data
                if (data.code === 200 && data.data) {
                  data.data.map(c => {
                    c.loading = false
                    c.children = []
                    child.push(c)
                  })
                }
              }).catch(err => {
                console.error(err)
              })
              item.children = child
              return item
            }))
          }
        }).catch(err => {
          reject(err)
        })
        commit('setorgLoadingData', false)
        resolve()
      })
    },
    loadOrgListData ({ state, commit }, data) {
      return new Promise((resolve, reject) => {
        commit('setorgLoadingData', true)
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
        commit('setorgLoadingData', false)
      })
    }
  }
}
