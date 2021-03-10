<template>
  <div class="chart" ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { off, on } from '@/libs/tools'
export default {
  name: 'unitPlanFactorCharts',
  props: {
    unitPlanFactorData: Array
  },
  data () {
    return {
      dom: null,
    }
  },
  mounted () {
    this.$nextTick(() => {
      let _this = this
      let pieDataTotal  = 0
      for (var i = 0; i < _this.unitPlanFactorData.length; i++) {
        pieDataTotal += _this.unitPlanFactorData[i].value
      }
      let option = {
        title: {
          text: '总发电量',
          subtext: pieDataTotal + 'kWh',
          x: 'center',
          y: '23%',
          textStyle: {
            fontSize: 12,
            fontWeight: 400,
            color: '#115055'
          },
          subtextStyle: {
            fontSize: 14,
            fontWeight: 700,
            color: '#038C99'
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c}kWh ({d}%)'
        },
        legend: [
          {
            orient: 'horizontal',
            x: 'center',
            y: '65%',
            data: ['空调', '照明'],
            textStyle: {
              color: '#009999',
              fontSize: 10,
              lineHeight: 10,
            },
            formatter: function (name) {
              var total = 0
              var value
              for (var i = 0; i < _this.unitPlanFactorData.length; i++) {
                total += _this.unitPlanFactorData[i].value
                if (_this.unitPlanFactorData[i].name === name) {
                  value = _this.unitPlanFactorData[i].value
                }
              }
              var percent = (value / total * 100).toFixed(2)
              return name + '    ' + percent + '%' + ' ' + '(' + value + 'kWh)'
            }
          },
          {
            orient: 'horizontal',
            x: 'center',
            y: '75%',
            data: ['特殊', '动力'],
            textStyle: {
              color: '#009999',
              fontSize: 10,
              lineHeight: 10
            },
            formatter: function (name) {
              var total = 0
              var value
              for (var i = 0; i < _this.unitPlanFactorData.length; i++) {
                total += _this.unitPlanFactorData[i].value
                if (_this.unitPlanFactorData[i].name === name) {
                  value = _this.unitPlanFactorData[i].value
                }
              }
              var percent = (value / total * 100).toFixed(2)
              return name + '    ' + percent + '%' + ' ' + '(' + value + 'kWh)'
            }
          }
        ],
        series: [
          {
            name: '访问来源',
            type: 'pie',
            center: ['50%', '30%'],
            radius: ['35%', '55%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              // emphasis: {
              //   show: true,
              //   formatter:function(val){
              //     return '总发电量'+ '\n' + '\n' + val.value + 'kWh'
              //   },
              //   textStyle: {
              //     fontSize: '14',
              //     fontWeight: 'bold'
              //   }
              // }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: _this.unitPlanFactorData,
            color: [
              '#07db8a',
              '#07b7db',
              '#ff9933',
              '#f46042'
            ]
          }
        ]
      }
      this.dom = echarts.init(this.$refs.dom, 'light')
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    })
  },
  methods: {
    resize () {
      if (typeof this.dom !== 'undefined' && this.dom !== null) {
        this.dom.resize()
      }
    }
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
