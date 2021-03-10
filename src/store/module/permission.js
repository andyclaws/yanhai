import routes from '@/router/routers'
import router from '@/router/index'

const permission = {
  state: {
    routers: routes
  },
  getters: {
    // permissionRouters: state => state.permission.routers
    permissionRouters: state => state.routers
  },
  mutations: {
    updateAppRouter (state, routes) {
      state.routers.push(...routes)
      router.addRoutes(routes)
    }
  }
}
export default permission
