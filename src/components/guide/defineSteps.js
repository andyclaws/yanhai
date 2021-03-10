const steps = [
  {
    element: '.menu-container',
    popover: {
      title: '菜单收缩',
      description: '点击可以展开/折叠菜单',
      position: 'bottom'
    }
  },
  {
    element: '.bread-container',
    popover: {
      title: '导航',
      description: '面包屑导航栏，您可以知道当前菜单所属目录',
      position: 'bottom'
    }
  },
  {
    element: '.fullScreen-container',
    popover: {
      title: '全屏',
      description: '您可以点击来全屏展示',
      position: 'left'
    }
  },
  {
    element: '.lockScreen-container',
    popover: {
      title: '锁屏',
      description: '您可以在您离开的时候锁定屏幕',
      position: 'left'
    }
  },
  {
    element: '.language-container',
    popover: {
      title: '语言选择',
      description: '您可以根据需要选择显示的语言',
      position: 'left'
    }
  },
  {
    element: '.tags-view-container',
    popover: {
      title: '打开菜单视图',
      description: '您可以在这里切换打开的视图',
      position: 'bottom'
    },
    padding: 0
  }
]

export default steps
