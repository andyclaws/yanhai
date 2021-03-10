<!--表中表 下钻明细-->
<template>
  <div class="sonTable">
    <Tables border ref="tables" :filename="'台区供售电量信息'" :columns="columns" :axiosUrl="axiosUrl" :axiosData="axiosData" class="table"/>
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
        // 用户编号 consNo
        {
          title: '用户编号',
          key: 'consNo',
          sortable: true,
          width: 150
        },
        // 用户名称 consName
        {
          title: '用户名称',
          key: 'consName',
          sortable: true,
          width: 150
        },
        // 用户类型 consType
        {
          title: '用户类型',
          key: 'consType',
          sortable: true,
          width: 150
        },
        // 终端地址 tmnlAddr
        {
          title: '终端地址',
          key: 'tmnlAddr',
          sortable: true,
          width: 150
        },
        // 总分表标识 totalTableFlag
        {
          title: '总分表标识',
          key: 'totalTableFlag',
          sortable: true,
          width: 150
        },
        // 数据时间 dataTime
        {
          title: '数据时间',
          key: 'statDate',
          sortable: true,
          width: 150
        },
        // 起码值（正向） startCodeValuePostive
        {
          title: '起码值（正向）',
          key: 'startCodeValuePostive',
          sortable: true,
          width: 150
        },
        // 止码值（正向） endCodeValuePostive
        {
          title: '止码值（正向）',
          key: 'endCodeValuePostive',
          sortable: true,
          width: 150
        },
        // 电量值（正向） electricValuePostive
        {
          title: '电量值（正向）',
          key: 'electricValuePostive',
          sortable: true,
          width: 150
        },
        // 起码值（反向） startCodeValueNegative
        {
          title: '起码值（反向）',
          key: 'startCodeValueNegative',
          sortable: true,
          width: 150
        },
        // 止码值（反向） endCodeValueNegative
        {
          title: '止码值（反向）',
          key: 'endCodeValueNegative',
          sortable: true,
          width: 150
        },
        // 电量值（反向） electricValueNegative
        {
          title: '电量值（反向）',
          key: 'electricValueNegative',
          sortable: true,
          width: 150
        },
        {
          title: '供电量',
          key: 'ppq',
          sortable: true,
          width: 150
        },
        {
          title: '售电量',
          key: 'spq',
          sortable: true,
          width: 150
        },

        // 主用途类型 mainPurposeType
        {
          title: '主用途类型',
          key: 'mainPurposeType',
          sortable: true,
          width: 150
        },
        // 综合倍率  compositePowerrate
        {
          title: '综合倍率',
          key: 'compositePowerrate',
          sortable: true,
          width: 150
        },
        // 电表资产号  assetNo
        {
          title: '电表资产号',
          key: 'assetNo',
          sortable: true,
          width: 150
        },
        // 测量点号  mpSn
        {
          title: '测量点号',
          key: 'mpSn',
          sortable: true,
          width: 150
        },
        // 条形码  barCode
        {
          title: '条形码',
          key: 'barCode',
          sortable: true,
          width: 150
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
