<template>
  <div ref="dom" class="charts device-resolve"></div>
</template>

<script>
import echarts from 'echarts'
import tdTheme from '../../../components/charts/theme.json'
import { off, on } from '@/libs/tools'
import { judgeNull } from '../util.js'

echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'deviceResolve',
  props: {
    deviceData: Array
  },
  data () {
    return {
      dom: null,
      color: [
        '#97E9FD',
        '#8A72EB',
        '#9B92F1',
        '#9A66E4',
        '#E46CBB',
        '#E67AEB',
        '#ED3F14',
        '#F14392',
        '#FF9900',
        '#FFD200',
        '#9EED47',
        '#40F49A',
        '#00CCCC',
        '#47BFED',
        '#4597F1',
        '#49EDCC',
        '#6BDEE4',
        '#00CCFF'
      ]
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
      let _this = this
      this.$nextTick(() => {
        if (
          typeof _this.deviceData === 'undefined' ||
          _this.deviceData === null ||
          _this.deviceData.length === 0
        ) {
          return
        }
        let dataArr = [{ name: '用能设备' }]
        let linkArr = []
        for (let index = 0; index < _this.deviceData.length; index++) {
          let dataObj = {
            name: _this.deviceData[index].subdeviceTypeName
          }
          dataArr.push(dataObj)
          let obj = {
            source: '用能设备',
            target: _this.deviceData[index].subdeviceTypeName,
            // value: 2 * _this.deviceData[index].subdeviceNameList.length
            value: 10
          }
          linkArr.push(obj)
          // for (
          //   let innerIndex = 0;
          //   innerIndex < _this.deviceData[index].subdeviceNameList.length;
          //   innerIndex++
          // ) {
          //   let innerDataObj = {
          //     name: _this.deviceData[index].subdeviceNameList[innerIndex]
          //   };
          //   dataArr.push(innerDataObj);
          //   let innerObj = {
          //     source: _this.deviceData[index].subdeviceTypeName,
          //     target: _this.deviceData[index].subdeviceNameList[innerIndex],
          //     value: 2
          //   };
          //   linkArr.push(innerObj);
          // }
        }
        dataArr = dataArr
        linkArr = linkArr
        let option = {
          color: ['#07B7DB', '#07DB8A', '#FFC313', '#0791F9', '#FF9933'],
          series: {
            type: 'sankey',
            nodeWidth: 5,
            // -----TODO DELETE
            top: '35%',
            height: 50,
            // -----------------
            layout: 'none',
            focusNodeAdjacency: 'allEdges',
            label: {
              normal: {
                fontSize: 12,
                fontWeight: 400,
                color: '#6B6B6B'
              }
            },
            data: dataArr,
            links: linkArr,
            itemStyle: {
              normal: {
                color: '#07B7DB'
              }
            },
            lineStyle: {
              color: 'source',
              opacity: 0.5
            }
          }
        }
        this.dom = echarts.init(this.$refs.dom, 'tdTheme')
        this.dom.setOption(option)
        on(window, 'resize', this.resize)
      })
    }
  },
  watch: {
    deviceData () {
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
