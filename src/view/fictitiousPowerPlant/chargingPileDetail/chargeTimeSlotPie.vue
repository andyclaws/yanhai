<template>
  <div class="pie-chart" ref="dom"></div>
</template>

<script>
import echarts from 'echarts'
import { off, on } from '@/libs/tools'
export default {
  name: 'chargeTimeSlot',
  props: {
  },
  data () {
    return {
      dom: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      let _this = this
      let data = [
        { value: 160, name: '尖充电量' },
        { value: 75, name: '峰充电量' },
        { value: 45, name: '平充电量' },
        { value: 20, name: '谷充电量' }
      ]
      let pieDataTotal = 0
      for (var i = 0; i < data.length; i++) {
        pieDataTotal += data[i].value
      }
      let option = {
        title: {
          text: '总   数',
          subtext: pieDataTotal,
          x: '17%',
          y: '22%',
          textStyle: {
            fontSize: 10,
            fontWeight: 400,
            color: '#115055'
          },
          subtextStyle: {
            fontSize: 16,
            fontWeight: 700,
            color: '#038C99'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          x: 'right',
          left: '45%',
          top: '5%',
          data: ['尖充电量', '峰充电量', '平充电量', '谷充电量'],
          textStyle: {
            color: '#009999',
            lineHeight: 10,
            fontSize: 11
          },
          formatter: function (name) {
            var total = 0
            var value
            for (var i = 0; i < data.length; i++) {
              total += data[i].value
              if (data[i].name === name) {
                value = data[i].value
              }
            }
            var percent = (value / total * 100).toFixed(2)
            return name + '    ' + percent + '%' + ' ' + '(' + value + ')'
          }
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            center: ['24%', '36%'],
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: data,
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
