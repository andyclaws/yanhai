<template>
  <div class="loadRateStatistics">
    <tables ref="tables" editable :height="tableHeight - 50" :columns="columns" :axiosUrl="axiosUrl" :axiosData="queryData" :filename="'负载率统计明细表格'" />
  </div>
</template>
<script>
import Tables from '_c/tables'
export default {
  name: 'loadRateStatistics',
  props: ['queryData', 'axiosUrl'],
  components: {
    Tables
  },
  data () {
    return {
      tableHeight: 500,
      columns: [
        {
          title: '供电单位',
          key: 'orgName',
          width: 150,
          sortable: true
        },
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
          title: '合同容量',
          key: 'tgCap',
          width: 140,
          sortable: true
        },
        {
          title: '运行容量',
          key: 'runCap',
          width: 150,
          sortable: true
        },
        {
          title: '最大有功功率',
          key: 'maxP',
          width: 150,
          sortable: true
        },
        {
          title: '发生时间',
          key: 'maxPTime',
          width: 150,
          sortable: true
        },
        {
          title: '最大视在功率',
          key: 'maxPq',
          width: 150,
          sortable: true
        },
        {
          title: '负载率',
          key: 'loadRate',
          width: 150,
          sortable: true
        },
        {
          title: '负载情况',
          key: 'loadDetail',
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
