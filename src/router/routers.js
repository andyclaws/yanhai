import Main from '@/components/main'
import parentView from '@/components/parent-view'
// import axios from '@/libs/api.request'
// import config from '@/config'
// const monitorBaseUrl = process.env.NODE_ENV === 'development' ? config.monitorBaseUrl.dev : config.monitorBaseUrl.pro

/**
 *
 * meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */
export const loginRouter = [{
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录',
    hideInMenu: true
  },
  component: () => import('@/view/login/login.vue')
}]
export const errorRouters = [
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  }, {
    path: '/404',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  }
]
export const globalRoutes = [
  {
    path: '/locking',
    name: 'locking',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/components/main/components/lockscreen/components/locking-page.vue')
  },
  {
    path: '/redirect/:path*',
    name: 'redirect',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/components/redirect/index.vue')
  },

  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          // notCache: true,
          icon: 'md-funnel'
        },
        component: () => import('@/view/fictitiousPowerPlant/home/home.vue')
      }
    ]
  }
]

export const fictitiousPowerPlantRouters = [
  {
    path: '/home',
    name: 'home',
    meta: {
      icon: 'md-funnel',
      title: '首页'
    },
    component: () => import('@/view/fictitiousPowerPlant/home/home.vue')
  },
  {
    path: '/synthesizeWatch',
    name: 'synthesizeWatch',
    meta: {
      icon: 'md-funnel',
      showAlways: true,
      title: '综合监视'
    },
    component: Main,
    children: [
      {
        path: 'runTimeWatch',
        name: 'runTimeWatch',
        meta: {
          icon: 'md-funnel',
          title: '运行监视'
        },
        component: () => import('@/view/fictitiousPowerPlant/runTimeWatch/runTimeWatch.vue')
      },
      {
        path: 'exceptionAlarm',
        name: 'exceptionAlarm',
        meta: {
          icon: 'md-funnel',
          title: '异常告警'
        },
        component: () => import('@/view/fictitiousPowerPlant/exceptionAlarm/exceptionAlarm.vue')
      },
      {
        path: 'sourceList',
        name: 'sourceList',
        meta: {
          icon: 'md-funnel',
          title: '资源列表'
        },
        component: () => import('@/view/fictitiousPowerPlant/sourceList/sourceList.vue')
      }
    ]
  },
  {
    path: '/supportElecControl',
    name: 'supportElecControl',
    meta: {
      icon: 'md-funnel',
      showAlways: true,
      title: '发电控制'
    },
    component: Main,
    children: [
      {
        path: 'loadForecasting',
        name: 'loadForecasting',
        meta: {
          icon: 'md-funnel',
          title: '负荷预测'
        },
        component: () => import('@/view/fictitiousPowerPlant/loadForecasting/loadForecasting.vue')
      },
      {
        path: 'loadExecutionDecomposition',
        name: 'loadExecutionDecomposition',
        meta: {
          icon: 'md-funnel',
          title: '负荷执行分解'
        },
        component: () => import('@/view/fictitiousPowerPlant/loadExecutionDecomposition/loadExecutionDecomposition.vue')
      },
      {
        path: 'controlPractice',
        name: 'controlPractice',
        meta: {
          icon: 'md-funnel',
          title: '控制演练'
        },
        component: () => import('@/view/fictitiousPowerPlant/controlPractice/controlPractice.vue')
      },
      {
        path: 'historyPowerGenerationEvent',
        name: 'historyPowerGenerationEvent',
        meta: {
          icon: 'md-funnel',
          title: '历史发电事件'
        },
        component: () => import('@/view/fictitiousPowerPlant/historyPowerGenerationEvent/historyPowerGenerationEvent.vue')
      }
    ]
  },
  {
    path: '/marketTrade',
    name: 'marketTrade',
    meta: {
      icon: 'md-funnel',
      showAlways: true,
      title: '市场交易'
    },
    component: Main,
    children: [
      {
        path: 'transactionManage',
        name: 'transactionManage',
        meta: {
          icon: 'md-funnel',
          title: '交易管理'
        },
        component: () => import('@/view/fictitiousPowerPlant/transactionManage/transactionManage.vue')
      },
      {
        path: 'tradeAnnouncement',
        name: 'tradeAnnouncement',
        meta: {
          icon: 'md-funnel',
          title: '交易公示'
        },
        component: () => import('@/view/fictitiousPowerPlant/tradeAnnouncement/tradeAnnouncement.vue')
      },
      {
        path: 'transactionDeclaration',
        name: 'transactionDeclaration',
        meta: {
          icon: 'md-funnel',
          title: '交易申报'
        },
        component: () => import('@/view/fictitiousPowerPlant/transactionDeclaration/transactionDeclaration.vue')
      },
      {
        path: 'tradeOff',
        name: 'tradeOff',
        meta: {
          icon: 'md-funnel',
          title: '交易出清'
        },
        component: () => import('@/view/fictitiousPowerPlant/tradeOff/tradeOff.vue')
      },
      {
        path: 'transactionContractManage',
        name: 'transactionContractManage',
        meta: {
          icon: 'md-funnel',
          title: '交易合同管理'
        },
        component: () => import('@/view/fictitiousPowerPlant/transactionContractManage/transactionContractManage.vue')
      },
      {
        path: 'measurement',
        name: 'measurement',
        meta: {
          icon: 'md-funnel',
          title: '交易结算'
        },
        component: () => import('@/view/fictitiousPowerPlant/measurement/measurement.vue')
      }
    ]
  },
  {
    path: '/operationManagement',
    name: 'operationManagement',
    meta: {
      icon: 'md-funnel',
      showAlways: true,
      title: '运营管理'
    },
    component: Main,
    children: [
      {
        path: 'archiveManage',
        name: 'archiveManage',
        meta: {
          icon: 'md-funnel',
          title: '档案管理'
        },
        component: () => import('@/view/fictitiousPowerPlant/archiveManage/archiveManage.vue')
      },
      {
        path: 'protectElecManager',
        name: 'protectElecManager',
        meta: {
          icon: 'md-funnel',
          title: '保电管理'
        },
        component: () => import('@/view/fictitiousPowerPlant/protectElecManager/protectElecManager.vue')
      },
      {
        path: 'userSettle',
        name: 'userSettle',
        meta: {
          icon: 'md-funnel',
          title: '业主结算'
        },
        component: () => import('@/view/fictitiousPowerPlant/userSettle/userSettle.vue')
      }
    ]
  },
  {
    path: '/systemManage',
    name: 'systemManage',
    meta: {
      icon: 'md-funnel',
      hideInMenu: true,
      showAlways: true,
      title: '系统管理'
    },
    component: Main,
    children: [
      {
        path: 'collectionManage',
        name: 'collectionManage',
        meta: {
          icon: 'md-funnel',
          title: '采集管理'
        },
        component: () => import('@/view/fictitiousPowerPlant/collectionManage/collectionManage.vue')
      }
    ]
  },
  {
    path: '/systemInfo',
    name: 'systemInfo',
    meta: {
      icon: 'md-funnel',
      showAlways: true,
      title: '系统信息'
    },
    component: Main,
    children: [
      {
        path: 'platform-introduction',
        name: 'platform-introduction',
        meta: {
          icon: 'md-funnel',
          title: '平台介绍'
        },
        component: () => import('@/view/fictitiousPowerPlant/platformIntroduction/platformIntroduction.vue')
      }
    ]
  },
  {
    path: '/fictitiousPowerPlantRouters',
    name: 'fictitiousPowerPlantRouters',
    meta: {
      icon: 'md-funnel',
      showAlways: true,
      hideInMenu: true,
      title: '微网新页面'
    },
    component: Main,
    children: [
      {
        path: 'airConditioningDetail',
        name: 'airConditioningDetail',
        meta: {
          icon: 'md-funnel',
          title: '空调具体详情'
        },
        component: () => import('@/view/fictitiousPowerPlant/airConditioningDetail/airConditioningDetail.vue')
      },
      {
        path: 'machineDetails',
        name: 'machineDetails',
        meta: {
          icon: 'md-funnel',
          hideInMenu: true,
          title: '机组明细'
        },
        component: () => import('@/view/fictitiousPowerPlant/machineDetails/machineDetails.vue')
      },
      {
        path: 'detailOfSinglePlantPlan',
        name: 'detailOfSinglePlantPlan',
        meta: {
          icon: 'md-funnel',
          hideInMenu: true,
          title: '电厂单一计划详情'
        },
        component: () => import('@/view/fictitiousPowerPlant/detailOfSinglePlantPlan/detailOfSinglePlantPlan.vue')
      },
      {
        path: 'userMeasurement',
        name: 'userMeasurement',
        meta: {
          icon: 'md-funnel',
          hideInMenu: true,
          title: '业主计量结算'
        },
        component: () => import('@/view/fictitiousPowerPlant/userMeasurement/userMeasurement.vue')
      },
      {
        path: 'singleUnitPlanDetail',
        name: 'singleUnitPlanDetail',
        meta: {
          icon: 'md-funnel',
          hideInMenu: true,
          title: '单一机组单一计划详情'
        },
        component: () => import('@/view/fictitiousPowerPlant/singleUnitPlanDetail/singleUnitPlanDetail.vue')
      },
      {
        path: 'chargingPileDetail',
        name: 'chargingPileDetail',
        meta: {
          icon: 'md-funnel',
          title: '充电桩具体详情'
        },
        component: () => import('@/view/fictitiousPowerPlant/chargingPileDetail/chargingPileDetail.vue')
      },
      {
        path: 'storedEnergyDetail',
        name: 'storedEnergyDetail',
        meta: {
          icon: 'md-funnel',
          title: '储能具体详情'
        },
        component: () => import('@/view/fictitiousPowerPlant/storedEnergyDetail/storedEnergyDetail.vue')
      },
      {
        path: 'fanDetails',
        name: 'fanDetails',
        meta: {
          icon: 'md-funnel',
          title: '风机具体详情'
        },
        component: () => import('@/view/fictitiousPowerPlant/fanDetails/fanDetails.vue')
      },
      {
        path: 'photovoltaicDetail',
        name: 'photovoltaicDetail',
        meta: {
          icon: 'md-funnel',
          title: '光伏具体详情'
        },
        component: () => import('@/view/fictitiousPowerPlant/photovoltaicDetail/photovoltaicDetail.vue')
      },
      {
        path: 'lightingDetail',
        name: 'lightingDetail',
        meta: {
          icon: 'md-funnel',
          title: '照明具体详情'
        },
        component: () => import('@/view/fictitiousPowerPlant/lightingDetail/lightingDetail.vue')
      }
    ]
  }
]

const systemRouters = [
  {
    path: '/system',
    name: 'system',
    meta: {
      icon: 'md-menu',
      showAlways: true,
      title: '系统管理'
    },
    component: Main,
    children: [
      // {
      //   path: 'logs',
      //   name: 'logs',
      //   meta: {
      //     icon: 'md-funnel',
      //     showAlways: true,
      //     title: '日志管理'
      //   },
      //   component: parentView,
      //   children: [
      //     {
      //       path: 'audit-log',
      //       name: 'audit-log',
      //       meta: {
      //         icon: 'md-trending-up',
      //         title: '异常日志'
      //       },
      //       component: () => import('@/view/system/logs/audit-log/audit-log.vue')
      //     },
      //     {
      //       path: 'menu-log',
      //       name: 'menu-log',
      //       meta: {
      //         icon: 'ios-infinite',
      //         title: '操作日志'
      //       },
      //       component: () => import('@/view/system/logs/menu-log/menu-log.vue')
      //     },
      //     {
      //       path: 'operate-log',
      //       name: 'operate-log',
      //       meta: {
      //         icon: 'md-list',
      //         title: '系统日志'
      //       },
      //       component: () => import('@/view/system/logs/operate-log/operate-log.vue')
      //     }
      //   ]
      // },
      {
        path: 'permission',
        name: 'permission',
        meta: {
          icon: 'md-funnel',
          showAlways: true,
          title: '权限管理'
        },
        component: parentView,
        children: [
          // {
          //   path: 'menu-manage',
          //   name: 'menu-manage',
          //   meta: {
          //     icon: 'md-trending-up',
          //     title: '菜单管理'
          //   },
          //   component: () => import('@/view/system/permission/menu-manage/menu-manage.vue')
          // },
          {
            path: 'role-attr-manage',
            name: 'role-attr-manage',
            meta: {
              icon: 'md-trending-up',
              title: '角色管理'
            },
            component: () => import('@/view/system/permission/role-attr-manage/role-attr-manage.vue')
          },
          // {
          //   path: 'role-manage',
          //   name: 'role-manage',
          //   meta: {
          //     icon: 'md-trending-up',
          //     title: '角色管理'
          //   },
          //   component: () => import('@/view/system/permission/role-manage/role-manage.vue')
          // },
          {
            path: 'user-manage',
            name: 'user-manage',
            meta: {
              icon: 'md-trending-up',
              title: '用户管理'
            },
            component: () => import('@/view/system/permission/user-manage/user-manage.vue')
          },
          {
            path: 'password-manage',
            name: 'password-manage',
            meta: {
              icon: 'md-trending-up',
              title: '密码管理'
            },
            component: () => import('@/view/system/permission/password-manage/password-manage.vue')
          }
        ]
      }
    ]
  }
]

export default loginRouter
  .concat(errorRouters)
  .concat(globalRoutes)
  // .concat(fictitiousPowerPlantRouters)
  // .concat(systemRouters)
