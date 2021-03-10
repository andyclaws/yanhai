<template>
  <div class="changeMet">
    <tables ref="tables" editable :height="tableHeight - 50" :columns="columns" :axiosUrl="axiosUrl" :axiosData="queryData" :filename="'换表记录表格'"/>
  </div>
</template>
<script>
import Tables from '_c/tables'
export default {
  name: 'changeMet',
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
          title: '老表资产号',
          key: 'oldAssetNo',
          width: 150,
          sortable: true
        },
        {
          title: '新表资产号',
          key: 'newAssetNo',
          width: 150,
          sortable: true
        },
        {
          title: '计量点编号',
          key: 'mpNo',
          width: 150,
          sortable: true
        },
        {
          title: '老表上次抄表日期',
          key: 'oldLastReadDate',
          width: 150,
          sortable: true
        },
        {
          title: '上次抄表值',
          key: 'oldLastReadData',
          width: 150,
          sortable: true
        },
        {
          title: '老表拆除日期',
          key: 'removeDate',
          width: 150,
          sortable: true
        },
        {
          title: '拆除日期抄表值',
          key: 'removeReadData',
          width: 150,
          sortable: true
        },
        {
          title: '老表电量',
          key: 'oldE',
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
