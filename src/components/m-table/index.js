import dataTable from './index.vue'

const _dataTable = {
  install: function (Vue) {
    Vue.component('MTable', dataTable)
  }
}

export default _dataTable
