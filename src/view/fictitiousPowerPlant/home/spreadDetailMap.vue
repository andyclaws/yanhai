<template>
  <div ref="dom" class="charts spread-detail-map"></div>
</template>

<script>
import echarts from 'echarts'
import * as api from '@/api/fictitiousPowerPlant/home/mainview-data.js'
import { off, on } from '@/libs/tools'
import { judgeNull } from '../util.js'
import chongming from './maps/chongming.json'
import jiading from './maps/jiading.json'
import baoshan from './maps/baoshan.json'
import huangpu from './maps/huangpu.json'
import fengxian from './maps/fengxian.json'
import jinshan from './maps/jinshan.json'
import minxing from './maps/minxing.json'
import pudong from './maps/pudong.json'
import putuo from './maps/putuo.json'
import qingpu from './maps/qingpu.json'
import songjiang from './maps/songjiang.json'
import xuhui from './maps/xuhui.json'
import yangpu from './maps/yangpu.json'
import jingan from './maps/jingan.json'
import hongkou from './maps/hongkou.json'
import changning from './maps/changning.json'
import baodi from './maps/宝坻区.json'
import beichen from './maps/北辰区.json'
import binhai from './maps/滨海新区.json'
import dongli from './maps/东丽区.json'
import heping from './maps/和平区.json'
import hebei from './maps/河北区.json'
import hedong from './maps/河东区.json'
import hexi from './maps/河西区.json'
import hongqiao from './maps/红桥区.json'
import jizhou from './maps/蓟州区.json'
import jinnan from './maps/津南区.json'
import jinghai from './maps/静海区.json'
import nankai from './maps/南开区.json'
import ninghe from './maps/宁河区.json'
import wuqing from './maps/武清区.json'
import xiqing from './maps/西青区.json'

export default {
  name: 'spreadDetailMap',
  props: {
    mapData: Array,
    mapName: ''
  },
  data () {
    return {
      dom: null,
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
    draw () {
      let center = [121.250333, 31.383524]
      switch (this.mapName) {
        case '崇明区':
          echarts.registerMap('detailMap', chongming)
          center = [121.599934, 31.548896]
          break
        case '嘉定区':
          echarts.registerMap('detailMap', jiading)
          center = [121.250333, 31.353524]
          break
        case '宝山区':
          echarts.registerMap('detailMap', baoshan)
          center = [121.419934, 31.398896]
          break
        case '黄浦区':
          echarts.registerMap('detailMap', huangpu)
          center = [121.485317, 31.216771]
          break
        case '奉贤区':
          echarts.registerMap('detailMap', fengxian)
          center = [121.568472, 30.892345]
          break
        case '金山区':
          echarts.registerMap('detailMap', jinshan)
          center = [121.230736, 30.814697]
          break
        case '闵行区':
          echarts.registerMap('detailMap', minxing)
          center = [121.415972, 31.121678]
          break
        case '浦东新区':
          echarts.registerMap('detailMap', pudong)
          center = [121.727706, 31.078944]
          break
        case '普陀区':
          echarts.registerMap('detailMap', putuo)
          center = [121.390499, 31.260001]
          break
        case '青浦区':
          echarts.registerMap('detailMap', qingpu)
          center = [121.083021, 31.11309]
          break
        case '松江区':
          echarts.registerMap('detailMap', songjiang)
          center = [121.203543, 31.02487]
          break
        case '徐汇区':
          echarts.registerMap('detailMap', xuhui)
          center = [121.44752, 31.158973]
          break
        case '杨浦区':
          echarts.registerMap('detailMap', yangpu)
          center = [121.532797, 31.295755]
          break
        case '静安区':
          echarts.registerMap('detailMap', jingan)
          center = [121.458224, 31.269003]
          break
        case '虹口区':
          echarts.registerMap('detailMap', hongkou)
          center = [121.493832, 31.27897]
          break
        case '长宁区':
          echarts.registerMap('detailMap', changning)
          center = [121.3852, 31.210113]
          break
        case '宝坻区':
          echarts.registerMap('detailMap', baodi)
          center = [117.405517, 39.60949]
          break
        case '北辰区':
          echarts.registerMap('detailMap', beichen)
          center = [117.173461, 39.25348]
          break
        case '滨海新区':
          echarts.registerMap('detailMap', binhai)
          center = [117.597627, 38.911769]
          break
        case '东丽区':
          echarts.registerMap('detailMap', dongli)
          center = [117.409531, 39.133692]
          break
        case '和平区':
          echarts.registerMap('detailMap', heping)
          center = [117.196207, 39.118993]
          break
        case '河北区':
          echarts.registerMap('detailMap', hebei)
          center = [117.213791, 39.167182]
          break
        case '河东区':
          echarts.registerMap('detailMap', hedong)
          center = [117.256682, 39.122406]
          break
        case '河西区':
          echarts.registerMap('detailMap', hexi)
          center = [117.229132, 39.079232]
          break
        case '红桥区':
          echarts.registerMap('detailMap', hongqiao)
          center = [117.155648, 39.164723]
          break
        case '蓟州区':
          echarts.registerMap('detailMap', jizhou)
          center = [117.434983, 40.003468]
          break
        case '津南区':
          echarts.registerMap('detailMap', jinnan)
          center = [117.386068, 38.964355]
          break
        case '静海区':
          echarts.registerMap('detailMap', jinghai)
          center = [116.966349, 38.85579]
          break
        case '南开区':
          echarts.registerMap('detailMap', nankai)
          center = [117.155046, 39.109368]
          break
        case '宁河区':
          echarts.registerMap('detailMap', ninghe)
          center = [117.62828, 39.328886]
          break
        case '武清区':
          echarts.registerMap('detailMap', wuqing)
          center = [117.028202, 39.451194]
          break
        case '西青区':
          echarts.registerMap('detailMap', xiqing)
          center = [117.119175, 39.028703]
          break
        default:
          center = [121.250333, 31.383524]
          echarts.registerMap('detailMap', jiading)
      }
      let _this = this
      this.$nextTick(() => {
        var option = {
          left: 20,
          series: [
            {
              // 地图配置
              name: '',
              type: 'map',
              map: 'detailMap',
              zoom: 1.2,
              mapType: 'detailMap',
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
                        color: '#A7EEEE' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#51DDDD' // 100% 处的颜色
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
                    lineHeight: 25,
                    zlevel: 15
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
                        color: '#A7EEEE' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#51DDDD' // 100% 处的颜色
                      }
                    ],
                    globalCoord: false // 缺省为 false
                  }
                }
              },
              markPoint: {
                // 数据全是markPoint
                symbol:
                  'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAADSklEQVRIiaWWy2/cVBTGf7bvjD1xHGc0QyVSNQlqBa3YtiiK+AcQUnlswr6CBRUVCwQsKlEhCLBqRVV2IBBvFqCKHZuqEEVVQ6uyAKEWkYeIaKqJPJ4ZJ54Z25fFnWTGsact6pFGY9/j833n8zn3XGvylwpDbdOdQURnKEZHKUTjGImBRBIZXWKjQUdcoyvmqfo/D4PQcgk23Rms9jfY4dRw9gELrFVC8wUq/pW9Lj3zsOe8Q7m5eN/gAHY4RbmxiOec3+tKK/BHv8dtPXffwHnm2xdxg2d3bvsKPOfcA4MDuMEzeM65nVulYNOdodxYRJcaAJOvw8RLkLRBdiHeygczRkArgG7Cxpew/JZaTzSJNzZLxb+iCAJrGTuc3g18sgY3X4bGVTBsEG4+QeRDHIB9BI58DgvVvi+w1rDDKUHNnaXqT6cD63DnO3U99oRSBCBlT7cSysrbEPwO4QqEy2lyO5yk5s4KitHpTGZiHKrHobEEURNW58EYJdN0SQjFh2HkUbAeySosRqcFhehYxrH+ERw6C8m2qkMSqlrIBOhlj1SvTjdBL8Htz7IEheiYJi/tixCxkXGa+1XW5gF4/Cu4Ngvbf6WfKR1URU62IFzLEkRGLDCSLDhAe139b90CdJh8Azr/9pKPoXUDahdzQ3fNSIzsTs5YAjdPQtxUtRHjYE3D4Y+h8NA9o4e/IjEG+ogi6NxJ+/QizPwNf56A1m+qRlE9ix4ZsSZ/mqhRaqcn3oHXYOJFkFGvyEG/RQE0XSmRMWhC/Ta+hpUzaYJtsyboiquU2k+lHFNvwq1XoXVddYgo70lNQuSprpIdKB2Cw59kCbpiSdAR80CaIKrDxhfq2jkK+09m5WsarL4PjRsQ/JHdaAAdMS+o+gu9bT256xDjUHkamksQt+Cfs9lgUKOiuA9GHstutMBao+ovCABCc45Suz/s1i/AwQ/UnEnaqoPyzBgF3VJD7/an/fVEk4TmHHY4cB54zoeUm6/kI/1P85zzlJunYHC4lJun8Ed/eGBw3/5xBzxNAOC2nsdz3iXRZSbwXpZokrpzATc4Prh8t0P/21Th72aBtUZozuUd+vkEg0R7P1sAYj2mK+p0xK9E4j0q/uVhEP8BellEn7hCIgEAAAAASUVORK5CYII=',
                symbolSize: 30, // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                itemStyle: {
                  normal: {
                    label: {
                      show: true,
                      color: '#fcfcfc',
                      backgroundColor: '#43DADA',
                      fontSize: 12,
                      fontWeight: 400,
                      shadowColor: '#666666',
                      shadowBlur: 10,
                      padding: 5,
                      borderRadius: 4,
                      position: 'bottom',
                      opacity: '0.5',
                      formatter: function (params) {
                        return params.name
                      }
                    }
                  },
                  emphasis: {
                    shadowBlur: 5,
                    label: {
                      show: false
                    }
                  }
                },
                effect: {
                  show: true,
                  shadowBlur: 0
                },
                data: _this.mapData
              },
              data: []
            }
          ]
        }
        this.dom = echarts.init(this.$refs.dom, 'detailMap')
        this.dom.setOption(option)
        on(window, 'resize', this.resize)
        this.dom.on('mouseout', function (params) {
          if (params.componentType === 'markPoint') {
            this.hoverName = ''
            $('.mapBarTip').remove()
          }
        })
        this.dom.on('mousemove', function (params) {
          if (params.componentType === 'markPoint') {
            if (this.hoverName !== params.name) {
              this.hoverName = params.name
              $('.mapBarTip').remove()
              var divObj = document.createElement('div')
              $(divObj).addClass('mapBarTip')
              divObj.id = 'mapBarTip'
              let divX = _this.getMousePos()['x']
              let divY = _this.getMousePos()['y']
              $(divObj)
                .css({
                  width: 220,
                  height: 180,
                  position: 'absolute',
                  backgroundColor: 'rgba(50,50,50,0.7)',
                  top: divY + 20,
                  left: divX + 20,
                  borderRadius: '4px',
                  zIndex: '20'
                })
                .appendTo('.content-wrapper')
              var loadingDivObj = document.createElement('div')
              $(loadingDivObj).append(
                "<div style='color:#fcfcfc;text-align:center;margin-top:80px;'>加载中...</div>"
              )
              $(loadingDivObj)
                .addClass('barLoading')
                .appendTo('.mapBarTip')
              api
                .getUnitRealTimeFuhe({ unitNo: params.data.unitNo })
                .then(res => {
                  let obj = res.data.data
                  if (typeof obj !== 'undefined' && obj !== null) {
                    $('.barLoading').remove()
                    let realBarData = []
                    realBarData.push(obj.actualP)
                    realBarData.push(obj.upAdjEnergy)
                    realBarData.push(obj.downAdjEnergy)
                    let markName = params.name
                    if (realBarData.length === 0) {
                      markName = '      ' + markName
                    }
                    _this.createBar(realBarData, markName)
                  }
                })
                .catch(err => {
                  console.log(err)
                  $('.barLoading').remove()
                  _this.$Message.error('负荷信息查询失败！')
                })
            } else {
              let divX = _this.getMousePos()['x']
              let divY = _this.getMousePos()['y']
              $('.mapBarTip').css({ top: divY + 20, left: divX + 20 })
            }
          } else {
            this.hoverName = ''
            $('.mapBarTip').remove()
          }
        })
        this.dom.on('click', function (params) {
          if (params.componentType === 'markPoint') {
            _this.$router.push({
              name: 'machineDetails',
              query: {
                unitNo: params.data.unitNo
              }
            })
            $('.mapBarTip').remove()
          }
        })
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
    createBar (barData, markName) {
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
            data: ['实时负荷', '可上调裕度', '可下调裕度'],
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
            name: markName,
            nameGap: 20,
            type: 'value',
            min: 0,
            splitLine: {
              show: false
            },
            nameTextStyle: {
              color: '#FFC313',
              fontSize: 14,
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
                position: 'top'
              }
            },
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = ['#ff6633', '#ff9933', '#07db8a']
                  return colorList[params.dataIndex]
                }
              }
            },
            data: barData
          }
        ]
      }
      bar.setOption(barOption)
    }
  },
  watch: {
    mapName () {
      this.draw()
    },
    mapData () {
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
