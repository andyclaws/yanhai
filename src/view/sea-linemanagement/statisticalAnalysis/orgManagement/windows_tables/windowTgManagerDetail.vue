<!--台区经理弹窗-->
<template>
  <div class="windowTgManagerDetail">
    <Tables border ref="tables" :height="tableHeight - 50" :columns="columns" :filename="'台区经理信息'" :axiosUrl="axiosUrl" :axiosData="axiosData" class="table"/>
  </div>
</template>

<script>
import Tables from '_c/tables'
export default {
  props: ['axiosUrl', 'axiosData'],
  components: {
    Tables
  },
  data () {
    return {
      tableHeight: 500,
      columns: [
        {
          title: '台区经理所属单位',
          key: 'orgName',
          sortable: true,
          width: 150
        },
        {
          title: '台区经理',
          key: 'customerManager',
          sortable: true,
          width: 150
        },
        {
          title: '台区经理编号',
          key: 'customerNo',
          sortable: true,
          width: 150
        },
        {
          title: '台区经理上级领导',
          key: 'customerManagerLeader',
          sortable: true,
          width: 150
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
.T_Account_Manager .ivu-table-header th{
    color: #448c86
}
</style>
