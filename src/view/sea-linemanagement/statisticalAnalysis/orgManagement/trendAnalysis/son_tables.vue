<!--表中表 下钻明细-->
<template>
  <div class="sonTable">
    <Tables border ref="tables" :columns="columns" :axiosUrl="axiosUrl" :axiosData="axiosData" class="table"/>
  </div>
</template>

<script>
import Tables from '_c/tables'
export default {
  props: ['axiosUrl', 'axiosData'],
  name: 'sonTable',
  components: {
    Tables
  },
  data () {
    return {
      // 表头
      columns: [
        {
          title: '台区编号',
          key: 'tgNo',
          sortable: true,
          width: 150
        },
        // 用户名称 consName
        {
          title: '台区名称',
          key: 'tgName',
          sortable: true,
          width: 150
        },
        // 用户类型 consType
        {
          title: '台区经理',
          key: 'manager',
          sortable: true,
          width: 150
        },
        // 终端地址 tmnlAddr
        {
          title: '考核单元名称',
          key: 'checkUnitName',
          sortable: true,
          width: 150
        },
        // 总分表标识 totalTableFlag
        {
          title: '线损类型',
          key: 'type',
          sortable: true,
          width: 150
        },
        // 数据时间 dataTime
        {
          title: '线损发生时间',
          key: 'time',
          sortable: true,
          width: 300
        }
      ]
    }
  }
}
</script>

<style lang="less">
.sonTable .ivu-table-header th {
  color: #448c86;
}
</style>
