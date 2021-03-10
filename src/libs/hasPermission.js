/** 按钮级别权限控制
 * <Button v-hasPermission="'add'">添加</Button>
 * @type {{install(*, *): void}}
 */
const hasPermission = {
  install (Vue, options) {
    Vue.directive('hasPermission', {
      bind (el, binding, vnode) {
        let permissionList = vnode.context.$route.meta.permission
        if (permissionList && permissionList.length && !permissionList.includes(binding.value)) {
          el.parentNode.removeChild(el)
        }
      }
    })
  }
}

export default hasPermission
