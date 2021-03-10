<template>
  <div class="tgPowerDetail">
    <tables ref="tables" editable :height="tableHeight - 50" :columns="columns" :axiosUrl="axiosUrl" :axiosData="queryData" :filename="'台区低压用户电量明细表格'" />
  </div>
</template>
<script>
import Tables from '_c/tables'
export default {
  name: 'tgPowerDetail',
  props: ['queryData', 'axiosUrl'],
  components: {
    Tables
  },
  data () {
    return {
      tableHeight: 500,
      columns: [
        {
          title: '用户编号',
          width: 100,
          key: 'consNo',
          sortable: true
        },
        {
          title: '用户名称',
          width: 100,
          key: 'consName',
          sortable: true
        },
        {
          title: '用户类型',
          key: 'consType',
          width: 140,
          sortable: true
        },
        {
          title: '终端地址',
          key: 'tmnlAddr',
          width: 150,
          sortable: true
        },
        {
          title: '总分表标识',
          key: 'meterFlag',
          width: 150,
          sortable: true
        },
        {
          title: '数据时间',
          key: 'statDate',
          width: 150,
          sortable: true
        },
        {
          title: '主用途类型',
          key: 'useType',
          width: 150,
          sortable: true
        },
        {
          title: '综合倍率',
          key: 'tfactor',
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
          title: '测量点号',
          key: 'mpSn',
          width: 150,
          sortable: true
        },
        {
          title: '条形码',
          key: 'meterBarcode',
          width: 150,
          sortable: true
        },
        {
          title: '起码值(正向)',
          key: 'papRS',
          width: 150,
          sortable: true
        },
        {
          title: '止码值(正向)',
          key: 'papRE',
          width: 150,
          sortable: true
        },
        {
          title: '电量值(正向)',
          key: 'papE',
          width: 150,
          sortable: true
        },
        {
          title: '起码值(反向)',
          key: 'rapRS',
          width: 150,
          sortable: true
        },
        {
          title: '止码值(反向)',
          key: 'rapRE',
          width: 150,
          sortable: true
        },
        {
          title: '电量值(反向)',
          key: 'rapE',
          width: 150,
          sortable: true
        },
        {
          title: '供电量',
          key: 'ppq',
          width: 150,
          sortable: true
        },
        {
          title: '修复供电量',
          key: 'ppqRepair',
          width: 150,
          sortable: true
        },
        {
          title: '售电量',
          key: 'spq',
          width: 150,
          sortable: true
        },
        {
          title: '修复售电量',
          key: 'spqRepair',
          width: 150,
          sortable: true
        },
        {
          title: '上网电量',
          key: 'gpq',
          width: 150,
          sortable: true
        },
        {
          title: '修复上网电量',
          key: 'gpqRepair',
          width: 150,
          sortable: true
        }
      ]
    }
  },
  methods: {
    changeHeight () {
      this.tableHeight = window.innerHeight > 800 ? window.innerHeight - 300 : 500
    }
  },
  mounted () {
    this.changeHeight()
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
