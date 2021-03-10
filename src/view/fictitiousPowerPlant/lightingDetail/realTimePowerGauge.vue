<template>
  <div ref="dom" class="power-charts"></div>
</template>

<script>
  import echarts from 'echarts'
  import { off, on } from '@/libs/tools'
  import { judgeNull } from '../util.js'
  export default {
    name: "realTimePowerGauge",
    props: ['powerDataPercent'],
    data() {
      return {
        dom: null,
      }
    },
    mounted() {
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
          let option = {
            tooltip : {
              formatter: "{a} <br/>{b} : {c}%"
            },
            series: [
              {
                type: 'gauge',
                radius:	"95%",
                center: ['50%', '60%'],
                axisLine: { // 坐标轴线
                  lineStyle: {
                    color: [[1, '#15dd8f']],
                    width : 2 //表盘宽度
                  }
                },
                detail: { // 仪表盘详情，用于显示数据。
                  show: false,
                },
                splitLine: {	// 分隔线样式。
                  show: false,
                },
                axisTick: { // 坐标轴小标记
                  show: false,
                },
                axisLabel: { // 刻度标签。
                  show: false,
                },
              },
              {
                name: '实时功率',
                type: 'gauge',
                center: ['50%', '60%'],
                radius:	"85%",
                splitNumber:4,
                axisLine: {            // 坐标轴线
                  lineStyle: {       // 属性lineStyle控制线条样式
                    color: [[1, '#15dd8f']],
                    width : 20//表盘宽度
                  }
                },
                detail: {				// 仪表盘详情，用于显示数据。
                  show: true,				// 是否显示详情,默认 true。
                  offsetCenter: [0,"30%"],// 相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
                  color: "#15dd8f",			// 文字的颜色,默认 auto。
                  fontSize: 14,			// 文字的字体大小,默认 15。
                  formatter: "{value}%",	// 格式化函数或者字符串
                },
                data: [
                  {
                    value: _this.powerDataPercent,
                    name: '功率占比'
                  }
                ],
                splitLine: {			// 分隔线样式。
                  show: true,		// 是否显示分隔线,默认 true。
                  length: 15,		// 分隔线线长。支持相对半径的百分比,默认 30。
                },
                axisLabel: {			// 刻度标签。
                  show: true,
                  distance: 8,			// 标签与刻度线的距离,默认 5。
                  color: "#000000",	// 文字的颜色,默认 #fff。
                  fontSize: 10,			// 文字的字体大小,默认 5。
                  formatter: "{value}",	// 刻度标签的内容格式器，支持字符串模板和回调函数两种形式。 示例:// 使用字符串模板，模板变量为刻度默认标签 {value},如:formatter: '{value} kg'; // 使用函数模板，函数参数分别为刻度数值,如formatter: function (value) {return value + 'km/h';}
                },
                itemStyle: {			// 仪表盘指针样式。
                  color: "#15dd8f",	// 指针颜色，默认(auto)取数值所在的区间的颜色
                },
                title: {				// 仪表盘标题。
                  show: true,	// 是否显示标题,默认 true。
                  offsetCenter: [0, "70%"],//相对于仪表盘中心的偏移位置，数组第一项是水平方向的偏移，第二项是垂直方向的偏移。可以是绝对的数值，也可以是相对于仪表盘半径的百分比。
                  color: "#15dd8f",	// 文字的颜色,默认 #333。
                  fontSize: 12,			// 文字的字体大小,默认 15。
                },
              }
            ]
          };
          this.dom = echarts.init(this.$refs.dom, 'tdTheme')
          this.dom.setOption(option)
          on(window, 'resize', this.resize)
        })
      }
    },
    watch: {
      powerDataPercent() {
        this.draw()
      }
    },
    beforeDestroy () {
      off(window, 'resize', this.resize)
    }
  }
</script>

<style lang="less" scoped>

</style>
