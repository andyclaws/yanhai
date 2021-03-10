<template>
  <div class="collectionDetails">
    <tables ref="tables" :height="tableHeight - 50" editable :columns="columns" :axiosUrl="axiosUrl" :axiosData="queryData" :filename="'采集明细表格'" />
  </div>
</template>
<script>
import Tables from '_c/tables'

export default {
  name: 'collectionDetails',
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
          title: '用户名称',
          width: 100,
          key: 'consName',
          sortable: true
        },
        {
          title: '用户编号',
          width: 100,
          key: 'consNo',
          sortable: true
        },
        {
          title: '用户类型',
          key: 'consType',
          width: 140,
          sortable: true
        },
        {
          title: '电表条形码',
          key: 'meterBarcode',
          width: 150,
          sortable: true
        },
        {
          title: '电表资产号',
          key: 'assetNo',
          width: 150,
          sortable: true
        },
        {
          title: '数据日期',
          key: 'statDate',
          width: 150,
          sortable: true
        },
        {
          title: '成功标志',
          key: 'successFlag',
          width: 150,
          sortable: true
        },
        {
          title: '电表倍率',
          key: 'mfactor',
          width: 150,
          sortable: true
        },
        {
          title: '正向有功起码',
          key: 'papRS',
          width: 150,
          sortable: true
        },
        {
          title: '正向有功止码',
          key: 'papRE',
          width: 150,
          sortable: true
        },
        {
          title: '正向有功电量',
          key: 'papE',
          width: 150,
          sortable: true
        },
        {
          title: '反向有功起码',
          key: 'rapRS',
          width: 150,
          sortable: true
        },
        {
          title: '反向有功止码',
          key: 'rapRE',
          width: 150,
          sortable: true
        },
        {
          title: '反向有功电量',
          key: 'rapE',
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
