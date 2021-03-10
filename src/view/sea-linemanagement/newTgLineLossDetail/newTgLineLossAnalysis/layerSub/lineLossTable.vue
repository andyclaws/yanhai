<template>
  <div class="tableRight">
    <RadioGroup type="button" v-model="showFlag" size="large" >
      <Radio label="1" >线损趋势</Radio>
      <Radio label="2" >持续分析</Radio>
      <Radio label="3" >累计分析</Radio>
    </RadioGroup>
    <div class="table1" v-show="showFlag === '1'">
      <tables ref="table1" editable :columns="trendColumns" height=400
              :axiosUrl="url1" :axiosData="query1" :filename="'线损趋势表格'"></tables>
    </div>
    <div class="table2" v-show="showFlag === '2'">
      <tables ref="table2" editable :columns="
      query2.dateType === 'month' ? constantAnalysisColumnsMonth : constantAnalysisColumns" height=400
              :axiosUrl="url2" :axiosData="query2" :filename="'持续分析表格'"></tables>
    </div>
    <div class="table3" v-show="showFlag === '3'">
      <tables ref="table3" editable :columns="
      query3.dateType === 'month' ? cumulativeAnalysisColumnsMonth : cumulativeAnalysisColumns" height=400
              :axiosUrl="url3" :axiosData="query3" :filename="'累计分析表格'"></tables>
    </div>
  </div>
</template>
<script>
import Tables from '_c/tables'
export default {
  name: 'lineLossTable',
  props: ['query1', 'query2', 'query3'],
  components: {
    Tables
  },
  data () {
    return {
      showFlag: '1',
      url1: '/sea-lineLose/tgLineLoseDetail/trendAnalysis/lineLoseTrend',
      url2: '/sea-lineLose/tgLineLoseDetail/trendAnalysis/continueAnalysis', // 持续分析
      url3: '/sea-lineLose/tgLineLoseDetail/trendAnalysis/addToAnalysis', // 累计分析
      trendColumns: [
        {
          title: '日期',
          key: 'date',
          width: 110,
          sortable: true
        },
        {
          title: '线损率(%)',
          key: 'lineLoseRate',
          width: 100,
          sortable: true
        },
        {
          title: '损耗电量(kWh)',
          key: 'lossPq',
          width: 120,
          sortable: true
        },
        {
          title: '供电量(kWh)',
          key: 'ppq',
          width: 120,
          sortable: true
        },
        {
          title: '售电量(kWh)',
          key: 'spq',
          width: 120,
          sortable: true
        },
        {
          title: '发电量(kWh)',
          key: 'gpq',
          width: 120,
          sortable: true
        },
        {
          title: '线损类型',
          key: 'status',
          width: 120,
          sortable: true
        }
      ],
      constantAnalysisColumns: [
        {
          title: '持续天数',
          key: 'dayNums',
          sortable: true
        },
        {
          title: '线损类型',
          key: 'lineLossType',
          sortable: true
        },
        {
          title: '时间区间',
          key: 'timeSection',
          sortable: true
        }
      ],
      constantAnalysisColumnsMonth: [
        {
          title: '持续月数',
          key: 'dayNums',
          sortable: true
        },
        {
          title: '线损类型',
          key: 'lineLossType',
          sortable: true
        },
        {
          title: '时间区间',
          key: 'timeSection',
          sortable: true
        }
      ],
      cumulativeAnalysisColumns: [
        {
          title: '累计天数',
          key: 'dayNums',
          sortable: true
        },
        {
          title: '线损类型',
          key: 'lineLossType',
          sortable: true
        },
        {
          title: '时间区间',
          key: 'timeSection',
          sortable: true
        }
      ],
      cumulativeAnalysisColumnsMonth: [
        {
          title: '累计月数',
          key: 'dayNums',
          sortable: true
        },
        {
          title: '线损类型',
          key: 'lineLossType',
          sortable: true
        },
        {
          title: '时间区间',
          key: 'timeSection',
          sortable: true
        }
      ]
    }
  }
}
</script>

<style lang="less">
  .tableRight{
    width: 40%;
    height: 100%;
    float: right;
  }
  .tableRight .ivu-table-header th{
    text-align: center;
    font-family:'Arial Negreta', 'Arial';
    font-weight:700;
    font-style:normal;
    font-size:14px;
    color:#009999;
  }
  .tableRight td{
    text-align: center;
  }
  .tableRight  .ivu-radio-wrapper-checked{
    border-style:solid;
    border-color:rgba(0, 153, 153, 1);
  }
</style>
