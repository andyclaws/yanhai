<template>
  <!--面板切换过来的表格-->
  <div class="om_Table">
    <Tables
      border
      ref="tables"
      :height="tableHeight"
      :columns="columns"
      :axiosUrl="axiosUrl"
      :axiosData="axiosData"
      :row-class-name="rowClassName"
      class="table"
      @on-load-data="on_load_data"/>
  </div>
</template>

<script>
import Tables from '_c/tables'
export default {
  props: ['axiosUrl', 'axiosData'],
  components: {
    Tables
  },
  name: 'om_Table',
  data () {
    return {
      columns: [
        {
          title: '供电单位',
          key: 'orgName',
          sortable: true,
          width: 150
        }, {
          title: '台区总数',
          key: 'allTgNums',
          sortable: true,
          width: 150
        }, {
          title: '台区经理数',
          key: 'customerManagerNums',
          sortable: true,
          width: 150
        }, {
          title: '运行台区数',
          key: 'operationTgNums',
          sortable: true,
          width: 150
        }, {
          title: '无台区经理的台区数',
          key: 'noCutomerManagerTgNums',
          sortable: true,
          width: 150
        }, {
          title: '拆除台区总数',
          key: 'dismantleTgNums',
          sortable: true,
          width: 95
        }, {
          title: '停运台区总数',
          key: 'offStreamTgNums',
          sortable: true,
          width: 95
        }, {
          title: '未覆盖台区数',
          key: 'noCoverageTgNums',
          sortable: true,
          width: 95
        }, {
          title: '分布式电源台区数',
          key: 'distributedPowerTgNums',
          sortable: true,
          width: 95
        }, {
          title: '换表台区数',
          key: 'exchangeTableTgNums',
          sortable: true,
          width: 95/*,
          sortType: 'desc',
          sortable: true */
        }, {
          title: '零电量台区数',
          key: 'zeroElectricTgNums',
          sortable: true,
          width: 150
        }, {
          title: '线损治理率',
          key: 'linelossAbsentRate',
          sortable: true,
          width: 150
        }, {
          title: '本月线损计划治理台区数',
          key: 'tmllossPlanAbsentTgNums',
          sortable: true,
          width: 95
        }, {
          title: '本月线损实际治理台区数',
          key: 'tmllActalAbsentTgNums',
          sortable: true,
          width: 95
        }, {
          title: '新增异常台区数',
          key: 'increaseAnomalyTgNums',
          sortable: true,
          width: 150
        }, {
          title: '台区线损合格率',
          key: 'tgLinelossQualifiedRate',
          sortable: true,
          width: 150
        }, {
          title: '总发电量',
          key: 'allGpq',
          sortable: true,
          width: 95
        }, {
          title: '总供电量',
          key: 'allPpq',
          sortable: true,
          width: 95
        }, {
          title: '总售电量',
          key: 'allSpq',
          sortable: true,
          width: 150
        }, {
          title: '总线损电量',
          key: 'allLinelossElectric',
          sortable: true,
          width: 150
        }, {
          title: '总台区线损率',
          key: 'allTgLinelossRate',
          sortable: true,
          width: 150
        }, {
          title: '台区在线监测率',
          key: 'tgOnlineMoniterRate',
          sortable: true,
          width: 150
        }, {
          title: '台区在线监测率（分子）',
          key: 'tgOnlineMoniterOnlineNums',
          sortable: true,
          width: 150
        }, {
          title: '台区在线监测率（分母）',
          key: 'tgOnlineMoniterAllNums',
          sortable: true,
          width: 150
        }, {
          title: '采集覆盖率',
          key: 'collectCoverageRate',
          sortable: true,
          width: 150
        }, {
          title: '采集覆盖率（分子）',
          key: 'collectCoverageNums',
          sortable: true,
          width: 150
        }, {
          title: '采集覆盖率（分母）',
          key: 'collectAllNums',
          sortable: true,
          width: 120
        }, {
          title: '示值采集成功率',
          key: 'icsuccessRate',
          sortable: true,
          width: 120
        }, {
          title: '费控成功率',
          key: 'costcontrolSuccessRate',
          sortable: true,
          width: 120
        }, {
          title: '费控成功率（分子）',
          key: 'costcontrolSuccessNum',
          sortable: true,
          width: 120
        }, {
          title: '费控成功率（分母）',
          key: 'costcontrolAllNum',
          sortable: true,
          width: 120
        }, {
          title: '负损台区总数',
          key: 'minusLossTgNums',
          sortable: true,
          width: 120
        }, {
          title: '高损台区总数',
          key: 'highLossTgNums',
          sortable: true,
          width: 120
        },
        {
          title: '不可算台区总数',
          key: 'noCalculateTgNums',
          sortable: true,
          width: 120
        },
        {
          title: '合格台区总数',
          key: 'normalTgNums',
          sortable: true,
          width: 120
        },
        {
          title: '停运台区供电量超200千瓦时的台区数',
          key: 'offStreamTgPpg200KwhTgNums',
          sortable: true,
          width: 120
        }, {
          title: '运行台区供电量超10000千瓦时的重损台区数',
          key: 'otgPpq1000KwhHighLossTgNums',
          sortable: true,
          width: 120
        }, {
          title: '疑似窃电台区数',
          key: 'qseTgNums',
          sortable: true,
          width: 120
        }, {
          title: '配变异常台区数',
          key: 'dtaTgNums',
          sortable: true,
          width: 120
        }, {
          title: '小电量台区数',
          key: 'littleElectricTgNums',
          sortable: true,
          width: 120
        }, {
          title: '档案异常涉及台区数',
          key: 'recordAnomalyTgNums',
          sortable: true,
          width: 120
        }, {
          title: '计量异常台区数',
          key: 'meterAnomalyTgNums',
          sortable: true,
          width: 120
        }, {
          title: '用电异常台区数',
          key: 'eatgNums',
          sortable: true,
          width: 120
        },
        /* {
          title: '倍率异常台区数',
          key: 'powerrateAnomalyTgNums',
          sortable: true,
          width: 120
        }, */
        {
          title: '数据日期',
          key: 'dataDate',
          sortable: true,
          width: 150
        }
      ],
      tableHeight: 600
    }
  },
  methods: {
    // 变色，返回样式
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
    },
    changeHeight () {
      this.tableHeight = window.innerHeight > 800 ? window.innerHeight - 180 : 600
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

<style lang="less" scoped>
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
.ivu-poptip-body .ivu-poptip-body-content{
  height:300px;
  width:300px;
}
</style>
