<!--趋势分析弹窗1-->
<template>
  <!--<template>-->
  <!--<div class="trendAnalysis">-->
  <!--<div style="float:left; height:98%; width:58%">-->
  <!--<div class="lineChart" style="height:50%">-->
  <!--<div id="lineChart"></div>-->
  <!--</div>-->
  <!--<div style="height:49%; margin-top:1%;">-->
  <!--<div class="top">-->
  <!--<h4 class="h4">异常线损分析</h4>-->
  <!--<Select class="select" v-model="lossType">-->
  <!--<Option v-for="item in lossTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
  <!--</Select>-->
  <!--<h5 class="dayFont">天</h5>-->
  <!--<Select class="select" v-model="day">-->
  <!--<Option v-for="item in dayList" :value="item.value" :key="item.value">{{ item.label }}</Option>-->
  <!--</Select>-->
  <!--<h5 class="dayFont">持续</h5>-->
  <!--</div>-->
  <!--<RadioGroup v-model="button"  type="button">-->
  <!--<Radio label="持续"></Radio>-->
  <!--<Radio label="累计"></Radio>-->
  <!--</RadioGroup>-->
  <!--<div id="barChart"></div>-->
  <!--</div>-->
  <!--</div>-->
  <!--<div style="float:right; height:98%; width:320px;padding:0px">-->
  <!--<RadioGroup type="button" v-model="showFlag" >-->
  <!--<Radio label="1" >线损趋势</Radio>-->
  <!--<Radio label="2" >持续分析</Radio>-->
  <!--<Radio label="3" >累计分析</Radio>-->
  <!--</RadioGroup>-->
  <!--<div class="table1" v-if="showFlag == 1">-->
  <!--<Table stripe border :columns="trendColumns" :data="firstTableData" height="350"></Table>-->
  <!--</div>-->
  <!--<div class="table2" v-if="showFlag == 2">-->
  <!--<Table stripe border :columns="constantAnalysisColumns" :data="tableData" height="350"></Table>-->
  <!--</div>-->
  <!--<div class="table3" v-if="showFlag == 3">-->
  <!--<Table stripe border :columns="cumulativeAnalysisColumns" :data="tableData" height="350"></Table>-->
  <!--</div>-->
  <!--</div>-->
  <!--</div>-->
  <!--</template>-->

  <!--<script>-->
  <!--import echarts from 'echarts'-->
  <!--import axios from 'axios'-->
  <!--export default {-->
  <!--props: ['dataFromFather', 'barData'],-->
  <!--components: {-->
  <!--axios-->
  <!--},-->
  <!--data () {-->
  <!--return {-->
  <!--firstTableData: [],-->
  <!--tableData: [],-->
  <!--barChartData: [],-->
  <!--button: '',-->
  <!--value: {},-->
  <!--day: 3,-->
  <!--dayList: [-->
  <!--{-->
  <!--value: 3, // 实际的-->
  <!--label: '3'// 显示的-->
  <!--},-->
  <!--{-->
  <!--value: 5,-->
  <!--label: '5'-->
  <!--},-->
  <!--{-->
  <!--value: 7,-->
  <!--label: '7'-->
  <!--}-->
  <!--],-->
  <!--lossType: 1,-->
  <!--lossTypeList: [-->
  <!--{ value: 1, label: '高损' },-->
  <!--{ value: 2, label: '负损' },-->
  <!--{ value: 3, label: '异常' },-->
  <!--{ value: 4, label: '合格' },-->
  <!--{ value: 5, label: '不可算' }-->
  <!--],-->
  <!--showFlag: 1,-->
  <!--trendColumns: [-->
  <!--{-->
  <!--title: '日期',-->
  <!--key: 'date',-->
  <!--width: 95-->
  <!--},-->
  <!--{-->
  <!--title: '供电量 (kWh)',-->
  <!--key: 'ppq',-->
  <!--width: 75-->
  <!--},-->
  <!--{-->
  <!--title: '售电量 (kWh)',-->
  <!--key: 'sqp',-->
  <!--width: 75-->
  <!--},-->
  <!--{-->
  <!--title: '线损率(%)',-->
  <!--key: 'lineLoseRate',-->
  <!--width: 70-->
  <!--}-->
  <!--],-->
  <!--constantAnalysisColumns: [-->
  <!--{-->
  <!--title: '单位',-->
  <!--key: 'orgNo',-->
  <!--width: 50-->
  <!--},-->
  <!--{-->
  <!--title: '持续天数',-->
  <!--key: 'continueDays',-->
  <!--width: 75-->
  <!--},-->
  <!--{-->
  <!--title: '高损',-->
  <!--key: 'lossHigh',-->
  <!--width: 60-->
  <!--},-->
  <!--{-->
  <!--title: '台区数',-->
  <!--key: 'linelossHighTgNum',-->
  <!--width: 60-->
  <!--},-->
  <!--{-->
  <!--title: '时间区间',-->
  <!--key: 'date',-->
  <!--width: 75-->
  <!--}-->
  <!--],-->
  <!--cumulativeAnalysisColumns: [-->
  <!--{-->
  <!--title: '单位',-->
  <!--key: 'orgNo',-->
  <!--width: 50-->
  <!--},-->
  <!--{-->
  <!--title: '累计天数',-->
  <!--key: 'addUpDays',-->
  <!--width: 75-->
  <!--},-->
  <!--{-->
  <!--title: '高损',-->
  <!--key: 'loss',-->
  <!--width: 60-->
  <!--},-->
  <!--{-->
  <!--title: '台区数',-->
  <!--key: 'linelossHighTgNum',-->
  <!--width: 60-->
  <!--},-->
  <!--{-->
  <!--title: '时间区间',-->
  <!--key: 'date',-->
  <!--width: 75-->
  <!--}-->
  <!--]-->
  <!--}-->
  <!--},-->
  <!--methods: {-->
  <!--drawLineChart () {-->
  <!--let lineChartXdata = this.firstTableData.map(_ => _.date)-->
  <!--let lineChartYdata = this.firstTableData.map(_ => _.lineLoseRate)-->
  <!--var linevalue = 20-->
  <!--var myecharts = echarts.init(document.getElementById('lineChart'), 'light')-->
  <!--myecharts.setOption({-->
  <!--title: {-->
  <!--text: '线损率趋势 ',-->
  <!--textStyle: {-->
  <!--color: '#448c86'-->
  <!--},-->
  <!--left: 'center'-->
  <!--},-->
  <!--tooltip: {-->
  <!--trigger: 'axis',-->
  <!--show: true,-->
  <!--showContent: false-->
  <!--},-->
  <!--grid: {-->
  <!--left: '10%', // 距离左边的距离-->
  <!--right: '5%', // 距离右边的距离-->
  <!--bottom: '0%', // 距离下边的距离-->
  <!--top: '30%', // 距离上边的距离-->
  <!--containLabel: true-->
  <!--},-->
  <!--xAxis: [{-->
  <!--axisLine: {-->
  <!--interval: '0',-->
  <!--lineStyle: { color: 'rgb(20, 31, 97)', width: 3 }-->
  <!--},-->
  <!--splitLine: {-->
  <!--show: true-->
  <!--},-->
  <!--type: 'category',-->
  <!--boundaryGap: false,-->
  <!--data: lineChartXdata-->
  <!--}],-->
  <!--yAxis: [{-->
  <!--name: '单位:%',-->
  <!--splitNumber: 4,-->
  <!--type: 'value'-->
  <!--}],-->
  <!--series: [-->
  <!--{-->
  <!--'name': '单位:%',-->
  <!--'type': 'line',-->
  <!--'data': lineChartYdata,-->
  <!--'color': 'blue',-->
  <!--'smooth': 0.3,-->
  <!--itemStyle: {-->
  <!--normal: {-->
  <!--// 拐点上显示数值-->
  <!--label: {-->
  <!--show: true,-->
  <!--formatter: '{c0}%'-->
  <!--},-->
  <!--borderColor: 'red', // 拐点边框颜色-->
  <!--lineStyle: {-->
  <!--color: 'blue', width: 3-->
  <!--}-->
  <!--}-->
  <!--}-->
  <!--},-->
  <!--{-->
  <!--name: '平行于y轴的趋势线',-->
  <!--type: 'line',-->
  <!--markLine: {-->
  <!--symbol: 'none', // 去掉箭头-->
  <!--silent: true,-->
  <!--data: [{-->
  <!--yAxis: 20,-->
  <!--lineStyle: {// 设置折线色颜色-->
  <!--width: 3-->
  <!--}-->
  <!--}],-->
  <!--label: {-->
  <!--show: false-->
  <!--}-->
  <!--}-->
  <!--}-->
  <!--],-->
  <!--visualMap: {-->
  <!--show: false,-->
  <!--pieces: [-->
  <!--{-->
  <!--gt: 0,-->
  <!--lte: linevalue, // 这儿设置基线上下颜色区分 基线下面为绿色-->
  <!--color: '#448c86'-->
  <!--},-->
  <!--{-->
  <!--gt: linevalue, // 这儿设置基线上下颜色区分 基线上面为红色-->
  <!--color: '#e91642'-->
  <!--}-->
  <!--]-->
  <!--}-->
  <!--})-->
  <!--},-->
  <!--// 给柱状图加数据-->
  <!--drawBarChart () {-->
  <!--let orgName = ['组1', '组2', '组3', '组4']-->
  <!--let linelossHighTgNum = this.barChartData.map(_ => _.linelossHighTgNum)-->
  <!--let linelossLowTgNum = this.barChartData.map(_ => _.linelossLowTgNum)-->
  <!--let noNormalTgNum = this.barChartData.map(_ => _.noNormalTgNum)-->
  <!--let normalTgNum = this.barChartData.map(_ => _.normalTgNum)-->
  <!--let linelossNocalcTgNum = this.barChartData.map(_ => _.linelossNocalcTgNum)-->
  <!--var myChart = echarts.init(document.getElementById('barChart'), 'light')-->
  <!--myChart.setOption({-->
  <!--grid: {-->
  <!--left: '10%', // 距离左边的距离-->
  <!--right: '1%', // 距离右边的距离-->
  <!--bottom: '0%', // 距离下边的距离-->
  <!--top: '20%', // 距离上边的距离-->
  <!--containLabel: true-->
  <!--},-->
  <!--xAxis: {-->
  <!--type: 'category',-->
  <!--data: orgName-->
  <!--},-->
  <!--yAxis: {-->
  <!--name: '单位:台区',-->
  <!--type: 'value',-->
  <!--min: 0-->
  <!--},-->
  <!--series: [-->
  <!--{-->
  <!--name: '高损台区数',-->
  <!--type: 'bar',-->
  <!--data: linelossHighTgNum-->
  <!--},-->
  <!--{-->
  <!--name: '负损台区数',-->
  <!--type: 'bar',-->
  <!--data: linelossLowTgNum-->
  <!--},-->
  <!--{-->
  <!--name: '异常台区数',-->
  <!--type: 'bar',-->
  <!--data: noNormalTgNum-->
  <!--},-->
  <!--{-->
  <!--name: '合格台区数',-->
  <!--type: 'bar',-->
  <!--data: normalTgNum-->
  <!--},-->
  <!--{-->
  <!--name: '不可算台区数',-->
  <!--type: 'bar',-->
  <!--data: linelossNocalcTgNum-->
  <!--}-->
  <!--]-->
  <!--}, true)-->
  <!--},-->
  <!--queryExceptLineLossAnalysis () {-->
  <!--axios.post('/sea-lineLose/custManagerAssess/queryExceptLineLossAnalysis', {-->
  <!--'analysisType': '',-->
  <!--'endDate': '',-->
  <!--'linelossType': '',-->
  <!--'startDate': '',-->
  <!--'tgNo': ''-->
  <!--}).then(response => {-->
  <!--this.barChartData = response.data.data-->
  <!--this.tableData = response.data.data-->
  <!--}).catch(error => {-->
  <!--console.log(error)-->
  <!--})-->
  <!--}-->
  <!--},-->
  <!--watch: {-->
  <!--dataFromFather () {-->
  <!--this.firstTableData = this.dataFromFather-->
  <!--},-->
  <!--firstTableData () {-->
  <!--this.drawLineChart()-->
  <!--},-->
  <!--barData () {-->
  <!--this.barChartData = this.barData-->
  <!--},-->
  <!--barChartData () {-->
  <!--this.drawBarChart()-->
  <!--},-->
  <!--day () {-->
  <!--this.queryExceptLineLossAnalysis()-->
  <!--},-->
  <!--lossType () {-->
  <!--this.queryExceptLineLossAnalysis()-->
  <!--let linelossTitle = ''-->
  <!--let tgNumKey = ''-->
  <!--if (this.lossType === 1) {-->
  <!--linelossTitle = '高损'-->
  <!--tgNumKey = 'linelossHighTgNum'-->
  <!--} else if (this.lossType === 2) {-->
  <!--linelossTitle = '负损'-->
  <!--tgNumKey = 'linelossLowTgNum'-->
  <!--} else if (this.lossType === 3) {-->
  <!--linelossTitle = '异常'-->
  <!--tgNumKey = 'noNormalTgNum'-->
  <!--} else if (this.lossType === 4) {-->
  <!--linelossTitle = '合格'-->
  <!--tgNumKey = 'normalTgNum'-->
  <!--} else if (this.lossType === 5) {-->
  <!--linelossTitle = '不可算'-->
  <!--tgNumKey = 'linelossNocalcTgNum'-->
  <!--}-->
  <!--this.constantAnalysisColumns[2] = {-->
  <!--title: linelossTitle,-->
  <!--key: 'lossHigh',-->
  <!--width: 60-->
  <!--}-->
  <!--this.constantAnalysisColumns[3] = {-->
  <!--title: '台区数',-->
  <!--key: tgNumKey,-->
  <!--width: 60-->
  <!--}-->
  <!--this.cumulativeAnalysisColumns[2] = {-->
  <!--title: linelossTitle,-->
  <!--key: 'lossHigh',-->
  <!--width: 60-->
  <!--}-->
  <!--this.cumulativeAnalysisColumns[3] = {-->
  <!--title: '台区数',-->
  <!--key: tgNumKey,-->
  <!--width: 60-->
  <!--}-->
  <!--let show = this.showFlag-->
  <!--this.showFlag = 1-->
  <!--this.$nextTick(() => (this.showFlag = show))-->
  <!--this.drawBarChart()-->
  <!--},-->
  <!--button () {-->
  <!--this.queryExceptLineLossAnalysis()-->
  <!--},-->
  <!--showFlag () {-->
  <!--if (this.showFlag === '2') {-->
  <!--this.queryExceptLineLossAnalysis()-->
  <!--}-->
  <!--if (this.showFlag === '3') {-->
  <!--this.queryExceptLineLossAnalysis()-->
  <!--}-->
  <!--}-->
  <!--}-->
  <!--}-->
  <!--</script>-->

  <!--<style lang="less">-->
  <!--.trendAnalysis #lineChart {-->
  <!--width: 400px;-->
  <!--height: 130px;-->
  <!--}-->
  <!--.trendAnalysis #barChart {-->
  <!--width: 400px;-->
  <!--height: 180px;-->
  <!--}-->
  <!--.trendAnalysis .top {-->
  <!--background-color: #448c86;-->
  <!--height: 30px;-->
  <!--width: 100%;-->
  <!--}-->
  <!--.trendAnalysis .h4 {-->
  <!--color: white;-->
  <!--font-size: 15px;-->
  <!--padding-left: 5px;-->
  <!--padding-top: 5px;-->
  <!--float: left;-->
  <!--}-->
  <!--.trendAnalysis .dayFont {-->
  <!--float: right;-->
  <!--color: white;-->
  <!--font-size: 15px;-->
  <!--padding-right: 15px;-->
  <!--padding-top: 5px;-->
  <!--}-->
  <!--.trendAnalysis .select {-->
  <!--width: 100px;-->
  <!--height: 30px;-->
  <!--float: right;-->
  <!--padding-top: 2px;-->
  <!--padding-right: 20px;-->
  <!--}-->
  <!--.trendAnalysis .ivu-table-header th{-->
  <!--text-align: center;-->
  <!--font-family:'Arial Negreta', 'Arial';-->
  <!--font-weight:700;-->
  <!--font-style:normal;-->
  <!--font-size:14px;-->
  <!--color:#009999;-->
  <!--height:40px;-->
  <!--}-->
  <!--.trendAnalysis td{-->
  <!--text-align: center;-->
  <!--}-->
  <!--.trendAnalysis .ivu-table-cell{-->
  <!--padding-left: 10px;-->
  <!--padding-right: 10px;-->
  <!--}-->
  <!--.trendAnalysis .table2 tr td:nth-last-child(2),.trendAnalysis .table3 tr td:nth-last-child(2){-->
  <!--text-decoration:underline;-->
  <!--color:#009999;-->
  <!--}-->

  <!--.trendAnalysis  .ivu-radio-wrapper-checked{-->
  <!--background:inherit;-->
  <!--background-color:rgba(252, 252, 252, 1);-->
  <!--border-width:1px;-->
  <!--border-style:solid;-->
  <!--border-color:rgba(0, 153, 153, 1);-->
  <!--border-radius:4px;-->
  <!--border-top-left-radius:0px;-->
  <!--border-bottom-left-radius:0px;-->
  <!--}-->
  <!--</style>-->

  <div class="trendAnalysis">
    <div class="left1">
      <!--折线图-->
      <echarts_LineChart_LineLossTrend :queryItems="queryItems"
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
                                              :refreshDataTrigger="refreshDataTrigger" />
    </div>
  </div>
</template>

<script>
import echarts_LineChart_LineLossTrend from './echarts_LineChart_LineLossTrend.vue'
import echarts_BarChart_LineLossAlarmAnalysis from './echarts_BarChart_LineLossAlarmAnalysis.vue'
import tableRight from './tableRight.vue'
import axios from '@/libs/api.request'
import { formatDate } from '@/libs/index.js'

export default {
  props: {
    refreshDataTrigger: {
      type: Boolean
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
    echarts_LineChart_LineLossTrend,
    echarts_BarChart_LineLossAlarmAnalysis,
    tableRight,
    axios
  },
  data () {
    return {
      axiosUrl: '',
      defaultRightTableQueryApiTail: 'lineLossTrendAnalysis',
      defaultRightTableQueryApiTailMonth: 'continueAnalysisMonth',
      param: {
        'numberOfDays': !this.queryItems['numberOfDays'] ? 3 : this.queryItems['numberOfDays'],
        'linelossType': !this.queryItems['linelossType'] ? 1 : this.queryItems['linelossType'],
        'dateType': this.queryItems.dateTypeHead,
        'startDate': formatDate(this.queryItems.dateHead, -7),
        'endDate': this.queryItems.dateHead,
        'custManager': this.queryItems['custManagerHead']
      }
    }
  },
  methods: {
    rightTableQueryFunction (showRightTableApiTail) {
      let apiUrl = '/queryLineLossTrend'
      if (showRightTableApiTail === 'continueAnalysis') {
        apiUrl = '/queryExceptLineLossAnalysis'
      }
      if (showRightTableApiTail === 'addupAnalysis') {
        apiUrl = '/queryExceptLineLossAnalysisAddUp'
      }

      this.axiosUrl = '/sea-lineLose/custManagerAssess' + apiUrl
      this.$nextTick(() => {
        this.$refs['table-right'].$refs.tables.queryTableData()
      })
    },
    // TODO
    initDataFunction () {
      if (this.queryDateRange.length !== 0) {
        this.param['startDate'] = this.queryDateRange[0]
        this.param['endDate'] = this.queryDateRange[1]

        this.param['dateType'] = this.queryItems.dateType
      }
      this.param.custManager = this.queryItems.custManagerHead
      // 头部 subTitle
      // let data = {
      //   startDate: this.queryItems['date'],
      //   endDate: this.queryItems['date'],
      //   dateType: this.queryItems['dateType'],
      //   custManager: this.queryItems.custManagerHead
      // }
      // axios.request({
      //   method: 'post',
      //   data: data,
      //   url: '/sea-lineLose/custManagerAssess/headInfo'
      // }).then(response => {
      //   let subTitle = "<div style='color: #fff; font-size: 13px'>" +
      //     "台区总数：" + 0 + ' | 在运台区数：' + 0 +
      //     ' | 线损合格率：' + 0 +
      //     '% | 线损率：' + 0+ '% | 较昨日下降:' +
      //     0+'% | 环比下降' + 0+ '%</div>'
      //   let title = '<div style="color: #fff; font-size: 18px">台区经理：' + '' + '</div>'
      //   if(response.data.data != null){
      //     title = '<div style="color: #fff; font-size: 18px">台区经理：' + response.data.data.custManagerName + '</div>'
      //     subTitle = "<div style='color: #fff; font-size: 13px'>" +
      //       "台区总数：" + response.data.data.tgNums + ' | 在运台区数：' + response.data.data.runTgNum +
      //       ' | 线损合格率：' + response.data.data.mtgLLSuccRate +
      //       '% | 线损率：' + response.data.data.lllr + '% | 较昨日下降:' +
      //       response.data.data.lllrDiff+'% | 环比下降' + response.data.data.lllrSequ + '%</div>'
      //   }
      //
      //   this.$emit('window-trend-analysis-subtitle', subTitle,title)
      // })
      this.rightTableQueryFunction(this.defaultRightTableQueryApiTailMonth)
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
      this.param.linelossType = lineLossQueryType
      this.$refs['table-right'].changeLineLossQueryType(lineLossQueryType)
      this.$emit('change-lineLoss-queryType', lineLossQueryType)
    },
    // 柱状图天数改变
    changeLineLossDay (lineLossQueryDay) {
      this.param.numberOfDays = lineLossQueryDay
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
    height: 39%;
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
    margin-top: 2px;
    width: 60%;
    height: 39%;
    float: left;
    background-color: white;
  }
</style>
