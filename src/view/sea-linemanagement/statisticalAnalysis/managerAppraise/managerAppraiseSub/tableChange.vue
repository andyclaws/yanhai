<template>
  <!--面板切换过来的表格-->
  <div class="om_Table">
    <Tables border
            ref="tables"
            height=680
            :columns="columns"
            :axiosUrl="axiosUrl"
            :axiosData="queryData"
            :row-class-name="rowClassName"
            class="table"
            @on-load-data="on_load_data"/>

  </div>
</template>

<script>
import Tables from '_c/tables'

export default {
  name: 'tableChange',
  components: {
    Tables
  },
  props: ['axiosUrl', 'queryData'],
  data () {
    return {
      columns: [
        {
          title: '台区经理',
          key: 'custManagerName',
          sortable: true,
          width: 150
        }, {
          title: '台区经理联系方式',
          key: 'custManagerMobileNo',
          sortable: true,
          width: 150
        }, {
          title: '下辖分布式电源台区数',
          sortable: true,
          key: 'fcGcTgNum',
          width: 150
        }, {
          title: '合格台区总数',
          key: 'linelossNormalTgNum',
          sortable: true,
          width: 150
        }, {
          title: '停运台区数',
          key: 'stopTgNum',
          sortable: true,
          width: 150
        }, {
          title: '拆除台区数',
          sortable: true,
          key: 'removeTgNum',
          width: 150
        }, {
          title: '运行台区数',
          sortable: true,
          key: 'runTgNum',
          width: 150
        }, {
          title: '终端数',
          sortable: true,
          key: 'tmnlNum',
          width: 150
        }, {
          title: '管辖台区主表数',
          sortable: true,
          key: 'mainMetNum',
          width: 150
        }, {
          title: '户表数',
          key: 'consMetNum',
          sortable: true,
          width: 150
        }, {
          title: '分布式电源用户数',
          sortable: true,
          key: 'fcGcConsNum',
          width: 150
        }, {
          title: '线损治理率',
          key: 'lineLossRemoveLackRate',
          sortable: true,
          width: 150
        }, {
          title: '本月线损计划治理台区数',
          sortable: true,
          key: 'planRemoveLackTgNum',
          width: 150
        }, {
          title: '本月线损实际治理台区数',
          sortable: true,
          key: 'realRemoveLackTgNum',
          width: 150
        }, {
          title: '新增异常台区数',
          sortable: true,
          key: 'newExecptTgNum',
          width: 150
        }, {
          title: '管辖台区线损合格率',
          sortable: true,
          key: 'mtgLLSuccRate',
          width: 150
        }, {
          title: '总发电量',
          sortable: true,
          key: 'gpq',
          width: 150
        }, {
          title: '总供电量',
          sortable: true,
          key: 'ppq',
          width: 150
        }, {
          title: '总售电量',
          sortable: true,
          key: 'spq',
          width: 150
        }, {
          title: '总线损电量',
          sortable: true,
          key: 'lossPq',
          width: 150
        }, {
          title: '总线损率',
          sortable: true,
          key: 'lllr',
          width: 150
        }, {
          title: '管辖台区可在线监测率',
          sortable: true,
          key: 'isMonitorTgRate',
          width: 150
        }, {
          title: '管辖台区可在线监测率（分子）',
          sortable: true,
          key: 'isMonitorTgFailNum',
          width: 150
        }, {
          title: '管辖台区可在线监测率（分母）',
          sortable: true,
          key: 'isMonitorTgAllNum',
          width: 150
        }, {
          title: '采集覆盖率',
          sortable: true,
          key: 'metCoverRate',
          width: 150
        }, {
          title: '采集覆盖率（分子）',
          key: 'metCoverFailNum',
          sortable: true,
          width: 150
        }, {
          title: '采集覆盖率（分母）',
          sortable: true,
          key: 'metCoverAllNum',
          width: 150
        }, {
          title: '管辖台区示值成功率',
          key: 'ivSuccRate',
          sortable: true,
          width: 150
        }, {
          title: '费控成功率',
          sortable: true,
          key: 'costCtrSuccRate',
          width: 150
        }, {
          title: '费控成功率（分子）',
          sortable: true,
          key: 'costCtrSuccFailNum',
          width: 150
        }, {
          title: '费控成功率（分母）',
          sortable: true,
          key: 'costCtrSuccAllNum',
          width: 150
        }, {
          title: '负损台区总数',
          sortable: true,
          key: 'linelossLowTgNum',
          width: 150
        }, {
          title: '高损台区总数',
          sortable: true,
          key: 'linelossHighTgNum',
          width: 150
        }, {
          title: '不可算台区总数',
          sortable: true,
          key: 'linelossNocalcTgNum',
          width: 150
        }, {
          title: '电量计算失败',
          sortable: true,
          key: 'meterValueCalFailNum',
          width: 150
        }, {
          title: '疑似窃电台区数',
          sortable: true,
          key: 'elecStealNum',
          width: 150
        }, {
          title: '配变异常数',
          sortable: true,
          key: 'transforExecptNum',
          width: 150
        }, {
          title: '小电量台区数',
          sortable: true,
          key: 'amallPqTgNum',
          width: 150
        }, {
          title: '档案异常涉及台区数',
          sortable: true,
          key: 'archExecptTgNum',
          width: 150
        }, {
          title: '计量异常涉及台区数',
          sortable: true,
          key: 'calcExecptTgNum',
          width: 150
        }, {
          title: '用电异常涉及台区数',
          sortable: true,
          key: 'elecExecptTgNum',
          width: 150
        }, {
          title: '数据时间',
          sortable: true,
          key: 'date',
          width: 150
        }
      ]
    }
  },
  methods: {
    // 变色，返回样式
    // rowClassName (row, index) {
    //   if (row.LR > 30) {
    //     return 'high-row'
    //   } else if (row.LR > 20) {
    //     return 'alarm-row'
    //   }
    //   return ''
    // },
    rowClassName (row) {
      if (row.LR > 30) {
        return 'alarm-row'
      } else if (row.LR > 20) {
        return 'high-row'
      }
      return ''
    },
    on_load_data (tableDataList) {
      this.$emit('on-load-data', tableDataList)
    }
  }
  // mounted () {
  //   this._getData()
  // }
}
</script>

<style lang="less">
  .om_Table .ivu-table-header th {
    color: #448c86;
    text-align: center;
    font-weight: bolder;
  }

  .ivu-table .high-row td {
    background-color: red;
  }

  .ivu-table .alarm-row td {
    background-color: yellow;
  }

  .table {
    width: 100%;
  }

  .ivu-poptip-body .ivu-poptip-body-content {
    height: 300px;
  }
</style>
