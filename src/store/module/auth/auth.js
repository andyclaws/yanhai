import { login, getUserInfo, getUnreadCount, logout } from '@/api/auth/auth'
import { getToken, setToken, getTokenType, setTokenType } from '@/libs/util'
import router from '../../../router'

export default {
  state: {
    userName: '',
    name: '',
    userId: '',
    avator: '',
    token: getToken(),
    tokenType: getTokenType(),
    perms: '',
    orgNo: ' ',
    orgType: ' ',
    orgName: ' ',
    hasGetInfo: false,
    unreadCount: 0
  },
  mutations: {
    setAvator (state, avator) {
      state.avator = avator
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, userName) {
      state.userName = userName
    },
    setName (state, name) {
      state.name = name
    },
    setPerms (state, perms) {
      state.perms = perms
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setTokenType (state, tokenType) {
      state.tokenType = tokenType
      setTokenType(tokenType)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    },
    setMessageCount (state, count) {
      state.unreadCount = count
    },
    setMessageUnreadList (state, list) {
      state.messageUnreadList = list
    },
    setOrgNo (state, orgNo) {
      state.orgNo = orgNo
    },
    setOrgType (state, orgType) {
      state.orgType = orgType
    },
    setOrgName (state, orgName) {
      state.orgName = orgName
    }
  },
  getters: {},
  actions: {
    // 登录
    handleLogin ({ commit }, data) {
      return new Promise((resolve, reject) => {
        login(data).then(res => {
          const data = res.data
          if (data.code === 200 && data.data) {
            commit('setToken', data.data.accessToken)
            commit('setTokenType', data.data.tokenType)
          }
          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('setToken', '')
          commit('setPerms', [])
          commit('setHasGetInfo', false)
          router.options.isAddDynamicMenuRoutes = false
          resolve()
        }).catch(err => {
          commit('setToken', '')
          commit('setPerms', [])
          commit('setHasGetInfo', false)
          router.options.isAddDynamicMenuRoutes = false
          reject(err)
          resolve()
        })
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo().then(res => {
            const data = res.data
            if (data.code === 200) {
              commit('setAvator', data.data.avator)
              commit('setUserName', data.data.userName)
              commit('setName', data.data.name)
              commit('setUserId', data.data.userId)
              commit('setPerms', data.data.perms)
              commit('setOrgNo', data.data.orgNo)
              commit('setOrgType', data.data.orgType)
              commit('setOrgName', data.data.orgName)
              commit('setHasGetInfo', true)
            }
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    },
    // 此方法用来获取未读消息条数，接口只返回数值，不返回消息列表
    getUnreadMessageCount ({ state, commit }) {
      getUnreadCount().then(res => {
        const { data } = res
        if (data.code === 200) {
          commit('setMessageCount', data.data.count)
        }
      })
    }
  }
}
