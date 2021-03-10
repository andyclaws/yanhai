<template>
  <div ref="dom" class="charts spread-map"></div>
</template>

<script>
import echarts from 'echarts'
// eslint-disable-next-line no-unused-vars
import * as api from '@/api/fictitiousPowerPlant/home/mainview-data.js'
import { off, on } from '@/libs/tools'
import { judgeNull } from '../util.js'
import shanghai from './maps/shanghai.json'
import tianjin from './maps/tianjin.json'
echarts.registerMap('上海市', shanghai)
echarts.registerMap('天津市', tianjin)
export default {
  name: 'spreadMap',
  props: {
    mapData: Array,
    barData: Array,
    area: String
  },
  data () {
    return {
      dom: null,
      color: ['#0099FF', '#FF9933', 'rgb(32, 223, 150)'],
      hoverName: ''
    }
  },
  methods: {
    removeNull (val) {
      return judgeNull(val, '')
    },
    resize () {
      if (typeof this.dom !== 'undefined' && this.dom !== null) {
        this.dom.resize()
      }
    },
    changeMap (mapModel, mapName) {
      this.$emit('changeMap', mapModel, mapName)
    },
    draw () {
      let _this = this
      this.$nextTick(() => {
        if (
          typeof _this.mapData === 'undefined' ||
          _this.mapData === null ||
          _this.mapData.length === 0
        ) {
          return
        }
        let center = []
        let zoom = ''
        if (_this.area === '天津市') {
          center = [117.364143, 39.400474]
          zoom = 1.0
        } else if (_this.area === '上海市') {
          center = [121.487756, 31.255984]
          zoom = 1.0
        }
        var option = {
          left: 20,
          visualMap: {
            min: 0,
            // max: 200,
            left: 0,
            top: 10,
            text: ['', ''],
            textStyle: {
              color: '#666666',
              fontWeight: 400,
              fontSize: 13
            },
            itemWidth: 15,
            itemHeight: 100,
            seriesIndex: [0],
            textGap: 20,
            align: 'left',
            inRange: {
              color: ['#DFF7F7', '#4EDCDC']
            },
            calculable: true
          },
          series: [
            {
              // 地图配置
              name: '',
              type: 'map',
              map: _this.area,
              zoom: zoom,
              mapType: _this.area,
              selectedMode: false,
              center: center,
              roam: true, // 是否开启平游或缩放
              itemStyle: {
                normal: {
                  show: true,
                  areaColor: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#DFF7F7' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#DFF7F7' // 100% 处的颜色
                      }
                    ],
                    globalCoord: false // 缺省为 false
                  },
                  label: {
                    show: false,
                    color: '#ffffff',
                    fontSize: 12,
                    fontWeight: 400,
                    backgroundColor: '#4EDCDC',
                    width: 60,
                    height: 20,
                    lineHeight: 20
                  },
                  borderColor: '#fff',
                  borderWidth: 1,
                  shadowColor: '#009999',
                  shadowBlur: 2
                },
                emphasis: {
                  label: {
                    show: true,
                    color: '#ffffff',
                    fontSize: 13,
                    fontWeight: 400,
                    backgroundColor: '#4EDCDC',
                    shadowColor: '#009999',
                    shadowBlur: 10,
                    padding: 5,
                    borderRadius: 4,
                    lineHeight: 25
                  },
                  areaColor: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: '#009999' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#fff' // 100% 处的颜色
                      }
                    ],
                    globalCoord: false
                  }
                }
              },
              data: _this.mapData
            }
          ]
        }
        this.dom = echarts.init(this.$refs.dom, 'shanghai')
        // this.dom.on('click', function (params) {
        //   console.log(params)
        //   if (params.componentSubType === 'map') {
        //     this.hoverName = ''
        //     $('.mapBarTip').remove()
        //     _this.changeMap(1, params.name)
        //   }
        // })
        // this.dom.on('mouseout', function (params) {
        //   if (params.componentSubType === 'map') {
        //     this.hoverName = ''
        //     $('.mapBarTip').remove()
        //     _this.changeMapLegShow(false)
        //   }
        // })
        // this.dom.on('mousemove', function (params) {
        //   if (params.componentSubType === 'map') {
        //     if (this.hoverName !== params.name) {
        //       this.hoverName = params.name
        //       $('.mapBarTip').remove()
        //       var divObj = document.createElement('div')
        //       $(divObj).addClass('mapBarTip')
        //       divObj.id = 'mapBarTip'
        //       let divX = _this.getMousePos()['x']
        //       let divY = _this.getMousePos()['y']
        //       $(divObj)
        //         .css({
        //           width: 150,
        //           height: 180,
        //           position: 'absolute',
        //           backgroundColor: 'rgba(50,50,50,0.7)',
        //           top: divY + 20,
        //           left: divX + 20,
        //           borderRadius: '4px',
        //           zIndex: '20'
        //         })
        //         .appendTo('.content-wrapper')
        //       let realBarData = [0, 0]
        //       for (var index = 0; index < _this.barData.length; index++) {
        //         if (_this.barData[index].areaName === params.name) {
        //           realBarData = [
        //             _this.barData[index].unitNum,
        //             Number(
        //               (Number(_this.barData[index].unitNum) === 0 ||
        //               Number(_this.barData[index].unitNum) % 1 !== 0
        //                 ? 0
        //                 : (Number(_this.barData[index].onlineNum) * 100) /
        //                   Number(_this.barData[index].unitNum)
        //               ).toFixed(3)
        //             )
        //           ]
        //         }
        //       }
        //       let barMapName = params.name
        //       if (realBarData.length === 0) {
        //         barMapName = '      ' + barMapName
        //       }
        //       _this.createBar(realBarData, barMapName)
        //     } else {
        //       let divX = _this.getMousePos()['x']
        //       let divY = _this.getMousePos()['y']
        //       $('.mapBarTip').css({ top: divY + 20, left: divX + 20 })
        //     }
        //     _this.changeMapLegShow(true)
        //   } else {
        //     this.hoverName = ''
        //     $('.mapBarTip').remove()
        //     _this.changeMapLegShow(false)
        //   }
        // })
        this.dom.setOption(option)
        on(window, 'resize', this.resize)
      })
    },
    // 获取横纵坐标
    getMousePos (e) {
      e = event || window.event
      var scrollX =
        document.documentElement.scrollLeft || document.body.scrollLeft
      var scrollY =
        document.documentElement.scrollTop || document.body.scrollTop
      var x = e.pageX || e.clientX + scrollX
      var y = e.pageY || e.clientY + scrollY
      return { x: x, y: y }
    },
    createBar (barData, mapName) {
      var bar = echarts.init(document.getElementById('mapBarTip'))
      let barOption = {
        grid: {
          left: 20,
          top: 45,
          right: 30,
          bottom: 20,
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['机组数', '在线率'],
            splitLine: {
              show: false
            },
            axisLabel: {
              interval: 0,
              rotate: -45,
              color: '#54DDDD'
            },
            axisLine: {
              fontSize: 12,
              fontWeight: 400,
              lineStyle: {
                color: '#54DDDD'
              }
            }
          }
        ],
        yAxis: [
          {
            name: mapName,
            nameGap: 20,
            type: 'value',
            min: 0,
            splitLine: {
              show: false
            },
            nameTextStyle: {
              color: '#54DDDD',
              fontSize: 13,
              fontWeight: 400
            },
            axisLine: {
              fontSize: 12,
              fontWeight: 400,
              lineStyle: {
                color: '#54DDDD'
              }
            }
          }
        ],
        series: [
          {
            yAxisIndex: 0,
            type: 'bar',
            barWidth: '40%',
            barGap: '10%',
            label: {
              normal: {
                show: true,
                position: 'top',
                formatter: function (param) {
                  if (param.name === '在线率') {
                    return param.value + '%'
                  } else {
                    return param.value + '个'
                  }
                }
              }
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = ['#ff9933', '#07db8a']
                  return colorList[params.dataIndex]
                }
              }
            },
            data: barData
          }
        ]
      }
      bar.setOption(barOption)
    },
    changeMapLegShow (isShow) {
      this.$emit('changeMapLegShow', isShow)
    }
  },
  watch: {
    mapData () {
      this.draw()
    },
    barData () {
      this.draw()
    },
    change () {
      setTimeout(() => {
        this.resize()
      }, 200)
    }
  },
  beforeDestroy () {
    $('.mapBarTip').remove()
    off(window, 'resize', this.resize)
  }
}
</script>
