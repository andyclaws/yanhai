<template>
  <div class="lightDetail-contanier">
    <div>
      <el-table
        :data="tableDatatwo"
        :border="true"
        style="width: 80%">
        <el-table-column
          prop="date"
          label="输入"
          width="77px"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="1"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="2"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label=".。。"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="24"
          align="center">
        </el-table-column>
      </el-table>
    </div>

    <el-card style="width:100%" :style="cardHeight" shadow="never">
      <div slot="header">
        <div class="content-box" :style="contentHeight">
          <div class="right-box">
            <div class="curve-box">

              <div class="power-charts-box">
                <alternating-power-charts :alternatingPowerData="alternatingPowerData"></alternating-power-charts>
              </div>
        
              <div class="electric-charts-box">
                <electricity-statistics-charts :electricityStatisticsData="electricityStatisticsData"></electricity-statistics-charts>
              </div>

              
              

            </div>
          </div>
        </div>
      </div>
    </el-card>
    <el-card>
      <div slot="header">
        <div class="content-box" :style="contentHeight">
          <div class="right-box">
            <div class="curve-box">
        <div class="power-charts-box">
                <twoing-power-charts :alternatingPowerData="alternatingPowerData"></twoing-power-charts>
              </div>
              </div>
              </div>
              </div>
      </div>
    </el-card>


  </div>
</template>
<script>
  import $ from 'jquery'
  import alternatingPowerCharts from './alternatingPowerCharts'
  import twoingPowerCharts from './twoingPowerCharts'
  import electricityStatisticsCharts from './electricityStatisticsCharts'
  const name=['市电','光伏','风电','市电','光伏','风电','市电']
  const goal=['用能成本最低','经济收益最大','经济收益最大','消纳量最大','综合能效最小','电网峰谷差最小','电网峰谷差最小']
  const scene=['提高用户舒适度','供需平衡','新能源平抑消纳','新能源平抑消纳','供需平衡','供需平衡','削峰填谷']
  export default {
    name: "lightingDetail",
    props: {},
    data() {
      return {
        cardHeight: 'height: 850px;',
        contentHeight: 'height: 750px;',
        currentPower: 1400,
        maxDesignPower: 2000,
        sameDayElectricity: 402,
        yesterdayElectricity: 1000,
        powerDataPercent: '',
        electricityDataPercent: '',
        activeIndex: 0,
        alternatingPowerData: [],
        electricityStatisticsData: [],
        dimensionValue: 'day',
        datas:[],
        visi:false,
        tableData: [{
          id: '用能成本最低',
          disabledvalue:'true',
          checked:'true',
        }, {
          id: '经济收益最大',
          disabledvalue:'false',
        }, {
          id: '消纳量最大',
          disabledvalue:'true',
        }, {
          id: '综合能耗最小',
          disabledvalue:'true',
        },
          {
            id: '电网峰谷差最小',
            disabledvalue:'true',
          }
        ],
        tableData1:[],
        value1:'',
        value2:'',
        value3:'',
        tableDatatwo: [{
          date: '用水需求',
          name: '',
          aname: '',
          bname: '',
          cname: '',
          address: '',
        }, {
          date: '蓄水量',
          name: '',
          aname: '',
          bname: '',
          cname: '',
          address: ''
        }],
      
      }
    },
    components: {
      alternatingPowerCharts,
      twoingPowerCharts,
      electricityStatisticsCharts
    },
    mounted() {
      this.changeHeight()
      let that = this
      window.onresize = () => {
        return (() => {
          that.changeHeight()
        })()
      }
      this.alternatingPowerData = [820, 932, 901, 934, 1290, 1330, 1320]
      this.electricityStatisticsData = [90, 56, 82, 88, 50, 40, 63, 81, 45, 62, 73, 59, 80]
    },
    methods:{
      tableRowClassNameone({row, rowIndex}) {
        if ((rowIndex+1) %2 === 0) {
          return 'warning-row';
        } else if ((rowIndex+1) %2 !== 0) {
          return 'success-row';
        }
        return '';
      },
      changeHeight: function () {
        this.cardHeight =
          window.innerHeight > 800
            ? 'height: ' + (window.innerHeight - 80) + 'px'
            : 'height: 850px'
        this.contentHeight =
          window.innerHeight > 800
            ? 'height: ' + (window.innerHeight - 160) + 'px'
            : 'height: 750px'
      },
    }
  }
</script>
<style lang="less">
@import "lightingDetail.less";
.el-table .warning-row {
    background: #ffffff;
  }

  .el-table .success-row {
    background: #B0C4DE;
  }
  /* element关闭鼠标悬停行内换色 */
  .el-table tbody tr { 
    pointer-events:none; 
  }
  .button1{
    margin-top:10px;
    margin-left:90%;
  }
  .tablecss{
    clear:left;
    margin-left: 100px;
    padding-top:  20px;
  }
  .topdate{
    float: right;
    padding-top:  10px;
  }
</style>