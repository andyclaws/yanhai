import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '@/store'
import iView from 'iview'
import { getToken, setTitle } from '@/libs/util'
import localRouters from './myrouter.json'

Vue.use(Router)

const mainRoutes = [
  {
    path: '*',
    redirect: { name: 'home' }
  }
]

let router = new Router({
  routes: routes,
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  isLoading: false, // 是否正在请求菜单 axios异步请求导致菜单加载多次
  mode: 'hash'
})

store.commit('setRouters', router)

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()
  if (router.options.isAddDynamicMenuRoutes === false && router.options.isLoading === false) {
    loadMenu(router).then(() => {
      filterRouter(to, from, next, token)
    }).catch((error) => {
      console.error('loadMenu error, reason: ', error)
    })
  } else {
    filterRouter(to, from, next, token)
  }
})

router.afterEach(to => {
  setTitle(to, router.app)
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

/**
 * 动态加载菜单
 * @param router
 * @returns {Promise<any>}
 */
function loadMenu (router) {
  console.log('load menu')
  router.options.routes = []
  return new Promise((resolve, reject) => {
    router.options.isLoading = true
    let sysRoutes = []
    let dataList = localRouters.data
    sysRoutes = filterMenu(dataList)
    if (router.options.isAddDynamicMenuRoutes === false) {
      let i = 0
      for (i; i < sysRoutes.length; i++) {
        router.options.routes.push(sysRoutes[i])
      }
      router.addRoutes(sysRoutes.concat(mainRoutes))
      store.commit('setRouters', router)
      router.options.isAddDynamicMenuRoutes = true
    }
    router.options.isLoading = false
    resolve()
  })
}

/**
 * 路由判断过滤
 * @param to
 * @param from
 * @param next
 * @param token
 */
function filterRouter (to, from, next, token) {
  if (!to.name) {
    next({
      name: 'login'
    })
  } else {
    next()
  }
}

/**
 * 加载菜单
 * @param menuList
 * @returns {Array}
 */
function filterMenu (menuList) {
  let routes = []
  menuList.forEach((item) => {
    let route = {
      path: '',
      name: '',
      meta: {
        icon: '',
        title: ''
      }
    }
    route.path = `/${item.url}`
    route.name = item.url
    route.meta.icon = item.icon
    route.meta.showAlways = true
    route.meta.title = item.name
    route.component = (resolve) => require(['@/components/main'], resolve)
    let childs = filterNextMenu(item.children)
    if (childs && childs.length > 0) {
      route.children = childs
    }
    routes.push(route)
  })
  return routes
}

/**
 * 加载下级菜单
 * @param menuList
 * @returns {*}
 */
function filterNextMenu (menuList) {
  const childRoutes = []
  if (!menuList || menuList === '' || menuList === undefined) {
    return null
  }
  menuList.forEach((menu) => {
    const route = {
      path: '',
      name: '',
      meta: {
        icon: '',
        title: ''
      }
    }
    route.path = menu.url
    route.name = menu.url
    route.meta.icon = menu.icon
    route.meta.showAlways = true
    route.meta.title = menu.name
    if (menu.isValid === 3) {
      route.meta.hideInMenu = true
    }
    if (menu.componentAddr && menu.componentAddr !== '') {
      route.component = (resolve) => require([`@/view/${menu.componentAddr}`], resolve)
      route.meta.showAlways = false
    } else {
      route.component = (resolve) => require(['@/components/parent-view'], resolve)
    }
    let childs = filterNextMenu(menu.children)
    if (childs && childs.length > 0) {
      route.children = childs
    }
    childRoutes.push(route)
  })
  return childRoutes
}
export default router
