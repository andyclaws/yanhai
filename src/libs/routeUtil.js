import lazyLoading from './lazyLoading.js'
import Main from '@/components/main'
let util = {

}

util.initRouter = function (vm) {
  let test = [{
    path: '/test',
    name: 'test',
    meta: {
      icon: 'md-menu',
      title: '测试'
    },
    component: Main,
    children: [
      {
        path: 'tree',
        name: 'tree',
        meta: {
          icon: 'md-funnel',
          title: '树'
        },
        component: lazyLoading('/test/tree')
      },
      {
        path: 'table',
        name: 'table',
        meta: {
          icon: 'md-funnel',
          title: '表格'
        },
        component: lazyLoading('/test/table')
      }
    ]
  }]
  vm.$store.commit('updateAppRouter', test)
}
export default util
