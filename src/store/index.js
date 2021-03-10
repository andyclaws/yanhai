import Vue from 'vue'
import Vuex from 'vuex'

import auth from './module/auth/auth'
import commonSelectBox from './module/base/common-select-box/common-select-box'

// import user from './module/user'
import app from './module/app'
import permission from './module/permission'
import monitorOrgList from './module/monitor/monitor-org-list'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    auth,
    commonSelectBox,
    monitorOrgList,
    // user,
    app,
    permission
  }
})
