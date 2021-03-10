<template>
  <div class="ppqDetail">
    <tables ref="tables"
            :height="tableHeight - 20"
            editable
            :columns="columns"
            :filename="'电量明细'"
            :axiosUrl="axiosUrl"
            :axiosData="axiosData"/>
  </div>
</template>

<script>
import Tables from '_c/tables'
import axios from '@/libs/api.request'
export default {
  name: 'ppqDetail',
  props: ['axiosUrl', 'axiosData'],
  components: {
    Tables,
    axios
  },
  data () {
    return {
      tableData: [],
      columns: [
        {
          title: '用户编号',
          width: 120,
          sortable: true,
          key: 'consNo'
        },
        {
          title: '用户名称',
          sortable: true,
          width: 120,
          key: 'consName'
        },
        {
          title: '用户类型',
          sortable: true,
          width: 120,
          key: 'consType'
        },
        {
          title: '终端地址',
          sortable: true,
          width: 120,
          key: 'tmnlAddr'
        },
        {
          title: '总分表标识',
          sortable: true,
          width: 120,
          key: 'calcMode'
        },
        {
          title: '起码值(正向)',
          sortable: true,
          width: 120,
          key: 'papRS'
        },
        {
          title: '止码值(正向)',
          sortable: true,
          width: 120,
          key: 'papRE'
        },
        {
          title: '电量值(正向)',
          sortable: true,
          width: 120,
          key: 'rapS'
        },
        {
          title: '起码值(反向)',
          sortable: true,
          width: 120,
          key: 'rapRS'
        },
        {
          title: '止码值(反向)',
          sortable: true,
          width: 120,
          key: 'rapRE'
        },
        {
          title: '电量值(反向)',
          sortable: true,
          width: 120,
          key: 'rapE'
        },
        {
          title: '供电量',
          sortable: true,
          width: 120,
          key: 'ppq'
        },
        {
          title: '售电量',
          sortable: true,
          width: 120,
          key: 'spq'
        },
        {
          title: '主用途类型',
          sortable: true,
          width: 120,
          key: 'usageTypeName'
        },
        {
          title: '综合倍率',
          sortable: true,
          width: 120,
          key: 'tfactory'
        },
        {
          title: '电表资产号',
          sortable: true,
          width: 120,
          key: 'assetNo'
        },
        {
          title: '测量点号',
          sortable: true,
          width: 120,
          key: 'mpSn'
        },
        {
          title: '条形码',
          sortable: true,
          width: 120,
          key: 'barCode'
        }, {
          title: '数据时间',
          sortable: true,
          width: 130,
          key: 'dataDate'
        }
      ],
      tableHeight: 500
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
