<template>
  <!--线损率趋势折线图-->
  <div class="lineLossCurve">
    <div class="nav-title">
      <p>{{ this.dayLabel }}：</p>
      <Select class="select" v-model="queryDayNum" style="margin-right: 10px;" @on-change="setSeaModelParam">
        <Option v-for="item in dayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <Select class="select" v-model="lineLossQueryType" @on-change="setSeaModelParam">
        <Option v-for="item in lineLossQueryTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <!--<InputNumber class="select" v-model="queryDayNum" @on-change="setSeaModelParam" :max="100" :min="1"/>-->
    </div>
    <div style="padding-top: 20px;">
      <div id="echartContainer">
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { formatDate } from '@/libs/index.js'
import axios from '@/libs/api.request'
import { on } from '@/libs/tools'
export default {
  props: ['dataFromFather', 'queryData', 'seaModelItem', 'dayLabel'],
  data () {
    return {
      dom: null,
      lineChartXdata: [],
      lineChartYdata: [],
      queryDayNum: 3,
      lineLossQueryType: 1,
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
      // '0' 正常 '1' 高损 '2' 负损 '3' 线损不可算"
      lineLossQueryTypeList: [
        { value: 0, label: '合格' }, { value: 1, label: '高损' }, { value: 2, label: '负损' }, { value: 3, label: '线损不可算' }
      ],
      lineLossRateData: []
    }
  },
  mounted () {
    this.showEchart()
  },
  methods: {
    resize () {
      this.dom.resize()
    },
    showEchart () {
      this.lineChartXdata = this.lineLossRateData.map(_ => _.date.substr(-5).replace('-', '/'))
      this.lineChartYdata = this.lineLossRateData.map(_ => _.lineLoseRate)
      var linevalue = 20
      let option = {
        title: {
          text: '线损率趋势 ',
          textStyle: {
            color: '#448c86'
          },
          x: 'center',
          y: '0'
        },
        tooltip: {
          trigger: 'axis',
          show: true,
          showContent: true,
          formatter: '日期：{b0}<br>线损率：{c0}%'

        },
        grid: {
          left: '10%', // 距离左边的距离
          right: '9%', // 距离右边的距离
          bottom: '0%', // 距离下边的距离
          top: '10%', // 距离上边的距离
          containLabel: true
        },
        xAxis: [{
          axisLine: {
            interval: '0'
            // lineStyle: { color: 'rgb(20, 31, 97)', width: 3 }
          },
          splitLine: {
            show: true
          },
          type: 'category',
          boundaryGap: false,
          data: this.lineChartXdata
        }],
        yAxis: [{
          name: '线损率(%)',
          splitNumber: 4,
          type: 'value'
          // max: 40
        }],
        series: [
          {
            'name': '线损率(%)',
            'type': 'line',
            'data': this.lineChartYdata,
            'color': 'blue',
            'smooth': 0.3,
            itemStyle: {
              normal: {
                // 拐点上显示数值
                label: {
                  show: true,
                  formatter: '{c0}%',
                  position: 'top',
                  distance: 5,
                  rotate: 30
                },
                borderColor: 'red', // 拐点边框颜色
                lineStyle: {
                  color: 'blue', width: 3
                }
              }
            }/*,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            } */
          },
          {
            name: '平行于y轴的趋势线',
            type: 'line',
            markLine: {
              symbol: 'none', // 去掉箭头
              silent: true,
              data: [{
                yAxis: 20,
                lineStyle: {// 设置折线色颜色
                  width: 3
                }
              }],
              label: {
                show: false
              }
            }
          }
        ],

        visualMap: {
          show: false,
          pieces: [
            {
              gt: 0,
              lte: linevalue, // 这儿设置基线上下颜色区分 基线下面为绿色
              color: '#448c86'
            }, {
              gt: linevalue, // 这儿设置基线上下颜色区分 基线上面为红色
              color: '#e91642'
            }]
        }
      }
      this.dom = echarts.init(document.getElementById('echartContainer'), 'light')
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    },
    lineLossCurve () {
      let endTime = formatDate('', 0)
      let startTime = formatDate('', -this.queryDayNum)
      let data = {
        endTime: endTime,
        startTime: startTime,
        tgId: this.seaModelItem.tgId,
        alarmType: this.lineLossQueryType,
        dateType: 'day'
      }
      axios.request({
        method: 'post',
        data: data,
        url: '/sea-lineLose/tgLineLoseDetail/trendAnalysis/lineLoseRateTrend'
      }).then(res => {
        if (res.status === 200 && res.data.data) {
          this.lineLossRateData = res.data.data
          this.showEchart()
        } else {
          this.$Message.success('查询失败!')
        }
      })
    },
    setSeaModelParam () {
      let exParam = {
        days: this.queryDayNum,
        extType: this.lineLossQueryType,
        endTime: '',
        startTime: '',
        tgId: this.seaModelItem.tgId
      }
      this.$emit('set-sea-model-param', exParam)
    }
  },
  watch: {
    dataFromFather () {
      this.lineLossRateData = this.dataFromFather
      this.showEchart()
    }
  }
}
</script>
<style lang="less">
.lineLossCurve {
  height: 100%;
  width: 100%;
  .nav-title{
    display: flex;
    float: right;
    margin-right: 20px;
    .ivu-select.ivu-select-single.ivu-select-small{
      width: 80px;
    }
    p{
      line-height: 24px;
    }
  }
  #echartContainer {
    width: 500px;
    height: 410px;
  }
}
</style>
