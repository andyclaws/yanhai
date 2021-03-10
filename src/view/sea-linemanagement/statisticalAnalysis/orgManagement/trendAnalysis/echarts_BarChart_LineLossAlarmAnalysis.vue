<!--异常线损分析 柱状图-->
<template>
  <div class="echarts_BarChart_LineLossAlarmAnalysis">
    <div class="top">
      <h4 class="h4">异常线损分析</h4>

      <label>
        <Select class="select"
                v-model="lineLossQueryType">
          <Option v-for="item in lineLossQueryTypeList"
                  :value="item.value"
                  :key="item.value">{{ item.label }}</Option>
        </Select>
      </label>

      <h5 class="dayFont">{{ this.queryItems.dateType === 'month' ? monthDate : dayDate}}</h5>
      <label>
        <Select class="select"
                v-model="queryDayNum">
          <Option v-for="item in dayList"
                  :value="item.value"
                  :key="item.value">{{ item.label }}</Option>
        </Select>
      </label>
      <h5 class="dayFont">{{continuedOrCumulative}}</h5>
    </div>

    <RadioGroup v-model="continuedOrCumulative"
                type="button"
                size="large">
      <Radio label="持续"
             true></Radio>
      <Radio label="累计"></Radio>
    </RadioGroup>

    <div id="echartbox" v-bind:style="{width: width.split('px')[0] * 0.55 + 'px'}">
    </div>

  </div>
</template>

<script>
import echarts from 'echarts'
import axios from '@/libs/api.request'
export default {
  components: {
    axios
  },
  props: {
    queryItems: {
      type: Object,
      default () {
        return {}
      }
    },
    width: {
      type: String
    },
    refreshDataTrigger: {
      type: Boolean
    }
  },
  data () {
    return {
      continuedOrCumulative: '持续',
      queryDayNum: 3,
      monthDate: '月',
      dayDate: '天',
      dayList: [
        {
          value: 3, // 实际的
          label: '3'// 显示的
        }, {
          value: 5,
          label: '5'
        }, {
          value: 7,
          label: '7'
        }
      ],
      lineLossQueryType: 1,
      lineLossQueryTypeList: [
        { value: 1, label: '高损' }, { value: 2, label: '负损' }, { value: 0, label: '合格' }, { value: 3, label: '不可算' }
      ],
      option: {
        dataset: {
          source: []
        },
        grid: {
          left: '10%', // 距离左边的距离
          right: '1%', // 距离右边的距离
          bottom: '0%', // 距离下边的距离
          top: '12%', // 距离上边的距离
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            show: true,
            interval: 0
          }
        },
        yAxis: {
        },
        series: [
          {
            type: 'bar',
            encode: {
              x: 'orgName',
              y: 'tgNums'
            }
          }
        ]
      }
    }
  },
  methods: {
    // 根据表格的持续累计按钮，切换本组件的按钮
    changeBarButton (showRightTableApiTail) {
      if (showRightTableApiTail === 'continueAnalysis') {
        this.continuedOrCumulative = '持续'
      }
      if (showRightTableApiTail === 'addupAnalysis') {
        this.continuedOrCumulative = '累计'
      }
    },
    publicFunction () {
      let myECharts = echarts.init(document.getElementById('echartbox'), 'light')
      let urlTail
      if (this.continuedOrCumulative === '持续') {
        urlTail = '/abnormalLinelossAnalysisContinue'
      } else {
        urlTail = '/abnormalLinelossAnalysisAddup'
      }
      this.queryItems['anomalyLinelossAnalysisDay'] = this.queryDayNum
      this.queryItems['anomalyLinelossAnalysisType'] = this.lineLossQueryType
      axios.request({
        url: '/sea-lineLose/unitControl/trendAnalysis' + urlTail,
        method: 'post',
        data: {
          'anomalyLinelossAnalysisDay': this.queryDayNum,
          'anomalyLinelossAnalysisType': this.lineLossQueryType,
          'dateType': this.queryItems['modDateType'],
          'startDate': this.$parent.queryDateRange[0],
          'endDate': this.$parent.queryDateRange[1],
          'orgType': this.queryItems['modOrgType'],
          'orgNo': this.queryItems['modOrgNo']
        }
      }).then(response => {
        console.log(response.data.data)
        let orgS = []
        let orgDatas = []
        for (let i = 0; i < response.data.data.length; i++) {
          let one = response.data.data[i]
          orgS[i] = one.orgName
          orgDatas[i] = one.tgNums
        }
        this.option.dataset.source = response.data.data
        // 异步请求
        this.$nextTick(() => {
          myECharts.setOption(this.option)
        })
      })
      // 根据窗口的大小变动图表 --- 重点
      // window.onresize = function () {
      //   myECharts.resize() // 若有多个图表变动，可多写
      // }
    }
  },
  watch: {
    // 查询下拉菜单变化 （高损、负损、异常、合格、不可算）
    lineLossQueryType: function () {
      this.publicFunction()
      this.$parent.changeLineLossQueryType(this.lineLossQueryType)
    },
    // 持续和累计 切换
    continuedOrCumulative: function () {
      this.publicFunction()
      let urlTail = ''
      if (this.continuedOrCumulative === '持续') {
        urlTail = 'continueAnalysis'
      } else {
        urlTail = 'addupAnalysis'
      }
      this.$parent.changeShowRightTableApiTail(urlTail)
    },
    // 日期 变化
    queryDayNum: function () {
      this.publicFunction()
      this.$parent.changeLineLossDay(this.queryDayNum)
      // this.$parent.rightTableQueryFunction
    },
    // orgManagement中该属性变化时，触发数据加载
    refreshDataTrigger () {
      this.publicFunction()
    }
  },
  created () {
    console.log(this.width)
  }
}
</script>

<style scoped>
#echartbox {
  width: 700px;
  height: 210px;
}
.top {
  background-color: #448c86;
  height: 30px;
  width: 100%;
}
.h4 {
  color: white;
  font-size: 15px;
  padding-left: 5px;
  padding-top: 5px;
  float: left;
}
.dayFont {
  float: right;
  color: white;
  font-size: 15px;
  padding-right: 15px;
  padding-top: 5px;
}
.select {
  width: 100px;
  height: 30px;
  float: right;
  padding-top: 2px;
  padding-right: 20px;
}
</style>
