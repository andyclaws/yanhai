<!--趋势分析弹窗1-->
<template>
  <div class="trendAnalysis">
    <div class="left1">
      <!--折线图-->
      <echarts-line-chart-line-loss-trend :queryItems="queryItems"
                                       :refreshDataTrigger="refreshDataTrigger" />
    </div>
    <div class="right">
      <!--表-->
      <table-right ref="table-right"
                   :axiosUrl="axiosUrl"
                   :axiosData="param"
                   @show-right-table-api="getShowRightTableApiTail"
                   :refreshDataTrigger="refreshDataTrigger" />
    </div>
    <div class="left2">
      <!--柱状图-->
      <echarts_BarChart_LineLossAlarmAnalysis ref="bar" :queryItems="queryItems"
                                              :width="width"
                                              :refreshDataTrigger="refreshDataTrigger" />
    </div>
  </div>
</template>

<script>
import echartsLineChartLineLossTrend from './echarts_LineChart_LineLossTrend.vue'
import echartsBarChartLineLossAlarmAnalysis from './echarts_BarChart_LineLossAlarmAnalysis.vue'
import tableRight from './tableRight.vue'
import axios from '@/libs/api.request'

export default {
  props: {
    refreshDataTrigger: {
      type: Boolean
    },
    width: {
      type: String
    },
    queryItems: {
      type: Object,
      default () {
        return {}
      }
    },
    queryDateRange: {
      type: Array,
      default () {
        return []
      }
    }
  },
  components: {
    echartsLineChartLineLossTrend,
    echartsBarChartLineLossAlarmAnalysis,
    tableRight,
    axios
  },
  data () {
    return {
      axiosUrl: '',
      defaultRightTableQueryApiTail: 'lineLossTrendAnalysis',
      param: {
        'dateType': this.queryItems['dateType'],
        'anomalyLinelossAnalysisDay': !this.queryItems['anomalyLinelossAnalysisDay'] ? 3 : this.queryItems['anomalyLinelossAnalysisDay'],
        'anomalyLinelossAnalysisType': !this.queryItems['anomalyLinelossAnalysisType'] ? '1' : this.queryItems['anomalyLinelossAnalysisType'],
        'startDate': this.queryDateRange[0],
        'endDate': this.queryDateRange[1],
        'statDate': this.queryItems['statDate'],
        'orgType': this.queryItems['orgType'],
        'orgNo': this.queryItems['modOrgNo']
      }
    }
  },
  methods: {
    rightTableQueryFunction (showRightTableApiTail) {
      this.axiosUrl = '/sea-lineLose/unitControl/trendAnalysis/' + showRightTableApiTail
      this.$nextTick(() => {
        this.$refs['table-right'].$refs.tables.queryTableData()
      })
    },
    initDataFunction () {
      this.param['orgNo'] = this.queryItems.modOrgNo
      this.param['orgType'] = this.queryItems.modOrgType
      this.param['dateType'] = this.queryItems.modDateType
      this.param['statDate'] = this.queryItems.modDate
      if (this.queryDateRange.length !== 0) {
        this.param['startDate'] = this.queryDateRange[0]
        this.param['endDate'] = this.queryDateRange[1]
      }
      /* // 头部 subTitle
      axios.request({
        method: 'post',
        data: this.param,
        url: '/sea-lineLose/unitControl/trendAnalysis/headInfo'
      }).then(response => {
        let subTitle = `<div style="color: #fff; font-size: 15px">` +
          `供电量：` + response.data.data.ppq +
          ` | ` +
          `售电量：` + response.data.data.spq +
          ` | ` +
          `线损率：` + response.data.data.linelossRate +
          `% | ` +
          `较昨日下降` + response.data.data.toYesterdayDecline +
          `% | ` +
          `环比下降` + response.data.data.linkRatioDecline + `%` +
          `</div>`
        //this.$parent.subTitle = subTitle
        this.$emit('window-trend-analysis-subtitle', subTitle)
      }) */
      // 加载右侧表格
      this.rightTableQueryFunction(this.defaultRightTableQueryApiTail)
    },
    // 三个tab互相切换时触发,加载表格数据
    getShowRightTableApiTail (showRightTableApiTail) {
      this.rightTableQueryFunction(showRightTableApiTail)
      // 调用 bar的持续累计按钮的切换
      this.$refs.bar.changeBarButton(showRightTableApiTail)
    },
    // 持续和累计按钮和表格联动切换
    changeShowRightTableApiTail (showRightTableApiTail) {
      this.$refs['table-right'].changeTableApiTail(showRightTableApiTail)
    },
    // 高损负损等联动表头
    changeLineLossQueryType (lineLossQueryType) {
      this.param.anomalyLinelossAnalysisType = lineLossQueryType
      this.$refs['table-right'].changeLineLossQueryType(lineLossQueryType)
      this.$emit('change-lineLoss-queryType', lineLossQueryType)
    },
    // 柱状图天数改变
    changeLineLossDay (lineLossQueryDay) {
      this.param.anomalyLinelossAnalysisDay = lineLossQueryDay
      this.$refs['table-right'].changeLineLossDay(lineLossQueryDay)
      this.$emit('change-lineLoss-day', lineLossQueryDay)
    }

  },
  watch: {
    refreshDataTrigger () {
      this.initDataFunction()
    },
    queryDateRange () {
      this.initDataFunction()
    }
  }
}
</script>

<style scoped>
.trendAnalysis {
  width: 100%;
  height: 80%;
  background-color: rgb(241, 241, 241);
}
.left1 {
  width: 60%;
  height: 48%;
  float: left;
  background-color: white;
}
.right {
  width: 40%;
  height: 80%;
  float: right;
  background-color: white;
}
.left2 {
  margin-top: 23px;
  width: 60%;
  height: 39%;
  float: left;
  background-color: white;
}
.tableRight .ivu-poptip{
  float: left
}
</style>
