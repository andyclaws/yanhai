<template>
  <div class="terminalId">
    <tables ref="tables" editable :columns="columns" :height="tableHeight - 50" :axiosUrl="axiosUrl" :axiosData="queryData" :filename="'终端地址明细表格'" />
  </div>
</template>
<script>
import Tables from '_c/tables'
export default {
  name: 'terminalId',
  props: ['queryData', 'axiosUrl'],
  components: {
    Tables
  },
  data () {
    return {
      tableHeight: 500,
      columns: [
        {
          title: '台区管理单位',
          key: 'orgName',
          width: 150,
          sortable: true
        },
        {
          title: '台区名称',
          width: 150,
          key: 'tgName',
          sortable: true
        },
        {
          title: '台区编号',
          key: 'tgNo',
          width: 120,
          sortable: true
        },
        {
          title: '考核单元名称',
          key: 'checkUnitName',
          width: 150,
          sortable: true
        },
        {
          title: '台区经理',
          key: 'accountManagerName',
          width: 120,
          sortable: true
        },
        {
          title: '终端地址',
          width: 100,
          key: 'tmnlAddr',
          sortable: true
        },
        {
          title: '终端厂家',
          width: 100,
          key: 'tmnlFactoryName',
          sortable: true
        },
        {
          title: '终端规约',
          key: 'protocolName',
          width: 140,
          sortable: true
        },
        {
          title: '终端类型',
          key: 'tmnlTypeName',
          width: 150,
          sortable: true
        },
        {
          title: '在线状态',
          key: 'onlineStatus',
          width: 150,
          sortable: true
        },
        {
          title: '数据日期',
          key: 'dataDate',
          width: 150,
          sortable: true
        }
      ],
      axiosData: {}
    }
  },
  methods: {
    changeHeight () {
      this.tableHeight = window.innerHeight > 800 ? window.innerHeight - 300 : 500
    }
  },
  mounted () {
    let that = this
    window.onresize = () => {
      return (() => {
        that.changeHeight()
      })()
    }
  }
}
</script>
<style lang="less">
</style>
