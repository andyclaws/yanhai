<template>
  <div class="zeroVolumeMeterDetail">
    <tables ref="tables" editable :columns="columns" :height="tableHeight - 50" :axiosUrl="axiosUrl" :axiosData="queryData" :filename="'零电量电表明细表格'" />
  </div>
</template>
<script>
import Tables from '_c/tables'
export default {
  name: 'zeroVolumeMeterDetail',
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
          title: '电表止码',
          key: 'papRE',
          width: 150,
          sortable: true
        }, {
          title: '电表起码',
          key: 'papRS',
          width: 150,
          sortable: true
        }, {
          title: '电表倍率',
          key: 'mfactor',
          width: 150,
          sortable: true
        }, {
          title: '电表电量',
          key: 'elec',
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
