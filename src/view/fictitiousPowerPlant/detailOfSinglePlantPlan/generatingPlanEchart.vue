<template>
  <div class="generatingPlan-echart-box">
    <div class="generatingPlan-echart" ref="dom"></div>
    <div class="right-icon-box">
            <span>图例完成率</span>
            <div class="icon-box1">
              <h5></h5>
              <h4>80%</h4>
            </div>
          </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import { off, on } from '@/libs/tools'
import { judgeNull } from '../util.js'
import { getFormatDate, formatDate } from '@/libs/index'
export default {
  name: 'loadAnalysis',
  props: {
    GeneratingPlanEchartData: Array
  },
  data () {
    return {
      dom: ''
    }
  },
  // mounted () {
  //   this.$nextTick(() => {
  //     let data = [
  //       {
  //         list: [
  //           {
  //             colorNum: 0,
  //             endTime: '2018-08-02 01:30:00',
  //             item: '100%',
  //             bgColor: '#07DB8A',
  //             startTime: '2018-08-02 00:00:00'
  //           },
  //           {
  //             colorNum: 1,
  //             endTime: '2018-08-02 08:00:00',
  //             item: '100%',
  //             bgColor: '#07DB8A',
  //             startTime: '2018-08-02 04:00:00'
  //           },
  //           {
  //             colorNum: 2,
  //             endTime: '2018-08-02 14:30:00',
  //             item: '0%',
  //             bgColor: '#07DB8A',
  //             startTime: '2018-08-02 13:00:00'
  //           }
  //         ],
  //         plant: '宝龙1号'
  //       },
  //       {
  //         list: [
  //           {
  //             colorNum: 0,
  //             endTime: '2018-08-02 04:30:00',
  //             item: '100%',
  //             bgColor: '#07DB8A',
  //             startTime: '2018-08-02 02:20:00'
  //           },
  //           {
  //             colorNum: 1,
  //             endTime: '2018-08-02 11:30:00',
  //             item: '(0%,100%)',
  //             bgColor: '#07DB8A',
  //             startTime: '2018-08-02 10:20:00'
  //           },
  //           {
  //             colorNum: 2,
  //             endTime: '2018-08-02 16:30:00',
  //             item: '0%',
  //             bgColor: '#07DB8A',
  //             startTime: '2018-08-02 15:00:00'
  //           }
  //         ],
  //         plant: '宝龙2号'
  //       },
  //       {
  //         list: [
  //           {
  //             colorNum: 0,
  //             endTime: '2018-08-02 02:00:00',
  //             item: '100%',
  //             bgColor: '#07DB8A',
  //             startTime: '2018-08-02 00:00:00'
  //           },
  //           {
  //             colorNum: 1,
  //             endTime: '2018-08-02 11:00:00',
  //             item: '100%',
  //             bgColor: '#07DB8A',
  //             startTime: '2018-08-02 07:00:00'
  //           },
  //           {
  //             colorNum: 2,
  //             endTime: '2018-08-02 19:30:00',
  //             item: '0%',
  //             bgColor: '#07DB8A',
  //             startTime: '2018-08-02 15:00:00'
  //           }
  //         ],
  //         plant: '宝龙3号'
  //       },
  //       {
  //         list: [
  //           {
  //             colorNum: 0,
  //             endTime: '2018-08-02 04:30:00',
  //             item: '100%',
  //             bgColor: '#07DB8A',
  //             startTime: '2018-08-02 01:30:00'
  //           },
  //           {
  //             colorNum: 1,
  //             endTime: '2018-08-02 11:30:00',
  //             item: '(0%,10%)',
  //             bgColor: '#07DB8A',
  //             startTime: '2018-08-02 09:00:00'
  //           },
  //           {
  //             colorNum: 2,
  //             endTime: '2018-08-02 21:00:00',
  //             item: '0%',
  //             bgColor: '#07DB8A',
  //             startTime: '2018-08-02 17:00:00'
  //           }
  //         ],
  //         plant: '宝龙4号'
  //       },
  //       {
  //         list: [
  //           {
  //             colorNum: 0,
  //             endTime: '2018-08-02 02:30:00',
  //             item: '100%',
  //             bgColor: '#07DB8A',
  //             startTime: '2018-08-02 01:30:00'
  //           },
  //           {
  //             colorNum: 1,
  //             endTime: '2018-08-02 10:30:00',
  //             item: '100%',
  //             bgColor: '#07DB8A',
  //             startTime: '2018-08-02 05:00:00'
  //           },
  //           {
  //             colorNum: 2,
  //             endTime: '2018-08-02 23:40:00',
  //             item: '0%',
  //             bgColor: '#07DB8A',
  //             startTime: '2018-08-02 22:00:00'
  //           }
  //         ],
  //         plant: '宝龙5号'
  //       }
  //     ]
  //     let start_ = '2018-08-02 00:00:00',
  //       end_ = '2018-08-02 24:00:00' // 自定义时间
  //     let seriesData = []
  //     let yAxisData_plant = [] // 工厂名

  //     data.forEach((item, index) => {
  //       yAxisData_plant.push(item.plant)
  //       item.list.forEach((listItem, listIndex) => {
  //         let startTime = new Date(listItem.startTime).getTime()
  //         let endTime = new Date(listItem.endTime).getTime()
  //         seriesData.push({
  //           name: listItem.item,
  //           value: [index, startTime, endTime],
  //           itemStyle: {
  //             normal: {
  //               color: listItem.bgColor
  //             }
  //           }
  //         })
  //       })
  //     })
  //     let option = {
  //       tooltip: {
  //         axisPointer: {
  //           type: 'cross',
  //           label: {
  //             textStyle: {
  //               fontSize: 14,
  //               fontWeight: 400
  //             }
  //           }
  //         }
  //       },
  //       // legend: {
  //       //   icon: 'rectangle',
  //       //   textStyle: {
  //       //     fontSize: 12
  //       //   },
  //       //   itemHeight: 13,
  //       //   itemWidth: 13,
  //       //   x: '90%',
  //       //   y: 60,
  //       //   orient: 'vertical',
  //       //   data: ['100%', '(0%,100%)', '0%']
  //       // },
  //       grid: {
  //         top: '10%',
  //         left: '2%',
  //         right: '12%',
  //         bottom: '2%',
  //         containLabel: true
  //       },
  //       xAxis: {
  //         type: 'time',
  //         min: new Date(start_).getTime(),
  //         max: new Date(end_).getTime(),
  //         splitNumber: 12,
  //         axisLine: {
  //           show: true,
  //           lineStyle: { color: '#949494' }
  //         },
  //         axisTick: {
  //           show: false
  //         },
  //         splitLine: {
  //           show: true,
  //           interval: 2,
  //           lineStyle: { color: '#949494', type: 'dashed' }
  //         }
  //       },
  //       yAxis: {
  //         axisTick: {
  //           show: false
  //         },
  //         axisLine: {
  //           show: true,
  //           lineStyle: { color: '#949494' }
  //         },
  //         axisLabel: {
  //           show: true,
  //           textStyle: { color: '#949494' },
  //           fontSize: 14
  //         },
  //         inverse: true,
  //         data: yAxisData_plant
  //       },
  //       series: [{
  //         type: 'custom',
  //         renderItem: function (params, api) {
  //           var categoryIndex = api.value(0)
  //           var start = api.coord([api.value(1), categoryIndex])
  //           var end = api.coord([api.value(2), categoryIndex])
  //           var height = api.size([0, 1])[1] * 0.6
  //           var rectShape = echarts.graphic.clipRectByRect({
  //             x: start[0],
  //             y: start[1] - 5,
  //             width: end[0] - start[0],
  //             height: 15
  //           }, {
  //             x: params.coordSys.x,
  //             y: params.coordSys.y,
  //             width: params.coordSys.width,
  //             height: params.coordSys.height
  //           })

  //           return rectShape && {
  //             type: 'rect',
  //             shape: rectShape,
  //             style: api.style()
  //           }
  //         },
  //         encode: {
  //           x: [1, 2],
  //           y: 0
  //         },
  //         data: seriesData
  //       }]
  //     }
  //     this.dom = echarts.init(this.$refs.dom, 'light')
  //     this.dom.setOption(option)
  //     on(window, 'resize', this.resize)
  //   })
  // },
  methods: {
    removeNull (val) {
      return judgeNull(val, '')
    },
    resize () {
      if (typeof this.dom !== 'undefined' && this.dom !== null) {
        this.dom.resize()
      }
    },
    draw () {
      let _this = this

      this.$nextTick(() => {
        if (
          typeof _this.GeneratingPlanEchartData === 'undefined' ||
          _this.GeneratingPlanEchartData === null
        ) {
          return
        }
        console.log(666, _this.GeneratingPlanEchartData)
        let lastMonDay =
          getFormatDate(new Date().getFullYear()) +
          '-' +
          getFormatDate(new Date().getMonth() + 1) +
          '-' +
          getFormatDate(new Date().getDate())

        let start_ = lastMonDay + ' ' + '00:00:00',
          end_ = lastMonDay + ' ' + '24:00:00'
        // console.log(start_, end_); // 自定义时间

        let seriesData = []
        let yAxisData_plant = [] // 工厂名
        let start = ''
        let end = ''
        _this.GeneratingPlanEchartData.forEach((item, index) => {
          yAxisData_plant.push(item.unitName)
          let startDate = lastMonDay + ' ' + item.beginTime.substring(12, 20)
          let endDate = lastMonDay + ' ' + item.endTime.substring(12, 20)
          start = startDate
          end = endDate
          console.log(start)
          let beginTime = new Date(startDate).getTime()
          let endTime = new Date(endDate).getTime()
          seriesData.push({
            name: item.finishRate,
            value: [index, beginTime, endTime],
            itemStyle: {
              normal: {
                color: '#07DB8A'
              }
            }
          })
        })
        let option = {
          tooltip: {
            axisPointer: {
              type: 'cross',
              label: {
                textStyle: {
                  fontSize: 14,
                  fontWeight: 400
                }
              }
            }
          },
          grid: {
            top: '20%',
            left: '2%',
            right: '12%',
            bottom: '4%',
            containLabel: true
          },
          xAxis: {
            type: 'time',
            min: new Date(start).getTime(),
            max: new Date(end).getTime(),
            splitNumber: 15,
            axisLine: {
              show: true,
              lineStyle: { color: '#949494' }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              interval: 2,
              lineStyle: { color: '#949494', type: 'dashed' }
            }
          },
          yAxis: {
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: { color: '#949494' }
            },
            axisLabel: {
              show: true,
              textStyle: { color: '#949494' },
              fontSize: 14
            },
            inverse: true,
            data: yAxisData_plant
          },
          series: [
            {
              type: 'custom',
              renderItem: function (params, api) {
                var categoryIndex = api.value(0)
                var start = api.coord([api.value(1), categoryIndex])
                var end = api.coord([api.value(2), categoryIndex])
                var height = api.size([0, 1])[1] * 0.6
                var rectShape = echarts.graphic.clipRectByRect(
                  {
                    x: start[0],
                    y: start[1] - 5,
                    width: end[0] - start[0],
                    height: 15
                  },
                  {
                    x: params.coordSys.x,
                    y: params.coordSys.y,
                    width: params.coordSys.width,
                    height: params.coordSys.height
                  }
                )

                return (
                  rectShape && {
                    type: 'rect',
                    shape: rectShape,
                    style: api.style()
                  }
                )
              },
              encode: {
                x: [1, 2],
                y: 0
              },
              data: seriesData
            }
          ]
        }
        this.dom = echarts.init(this.$refs.dom, 'light')
        this.dom.setOption(option)
        on(window, 'resize', this.resize)
      })
    }
  },
  watch: {
    GeneratingPlanEchartData () {
      this.draw()
    },
    change () {
      setTimeout(() => {
        this.resize()
      }, 200)
    }
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
<style lang="less">
@import "detailOfSinglePlantPlan.less";
.active {
  background: #009999;
  color: #fff !important;
}
</style>
