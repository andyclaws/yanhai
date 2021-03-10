<template>
  <div class="chart" ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { off, on } from "@/libs/tools";
import { judgeNull } from "../util.js";
export default {
  name: "archiveManageAreaCharts",
  props: {
    areaData: Array,
  },
  data() {
    return {
      dom: null,
    };
  },
  mounted() {},
  methods: {
    removeNull(val) {
      return judgeNull(val, "");
    },
    resize() {
      if (typeof this.dom !== "undefined" && this.dom !== null) {
        this.dom.resize();
      }
    },
    draw() {
      this.$nextTick(() => {
        let _this = this;
        let legendData = [];
        let seriesData = [];
        for (var index = 0; index < _this.areaData.length; index++) {
          let valueArr = [];
          valueArr.push(_this.areaData[index].value);
          let obj = {
            type: "bar",
            data: valueArr,
            coordinateSystem: "polar",
            name: _this.areaData[index].area,
          };
          legendData.push(_this.areaData[index].area);
          seriesData.push(obj);
        }
        let option = {
          angleAxis: {
            type: "category",
            axisLine: {
              show: true,
              lineStyle: {
                color: "#e2e2e2",
              },
            },
          },
          radiusAxis: {
            axisLine: {
              show: false, // 是否显示坐标轴轴线
            },
            axisTick: {
              show: false, // 是否显示坐标轴刻度。
            },
            axisLabel: {
              show: false, // 坐标轴刻度标签是否显示
            },
          },
          polar: {
            show: true,
            center: ["22%", "41%"],
          },
          series: seriesData,
          legend: {
            show: true,
            type: "scroll",
            orient: "vertical",
            data: legendData,
            right: "13%",
            top: "8%",
            width: "200",
            height: "140",
            formatter: function (name) {
              let result;
              let total = 0;
              let value;
              for (var index = 0; index < _this.areaData.length; index++) {
                total += _this.areaData[index].value;
                if (name === _this.areaData[index].area) {
                  value = _this.areaData[index].value;
                }
              }
              let percent = ((value / total) * 100).toFixed(2);
              result = name + "  " + value + "  " + "( " + percent + "% )";
              // for (var index = 0; index < _this.areaData.length; index++) {
              //   percent = (_this.areaData[index].value / total * 100).toFixed(2)
              //   if (name === _this.areaData[index].area) {
              //     result = name + '    ' + _this.areaData[index].value + '(' + percent + '%)'
              //   }
              // }
              return result;
            },
            textStyle: {
              color: "#009999",
              fontSize: 10,
            },
          },
        };
        this.dom = echarts.init(this.$refs.dom, "light");
        this.dom.setOption(option, true);
        on(window, "resize", this.resize);
      });
    },
  },
  watch: {
    areaData() {
      this.draw();
    },
    change() {
      setTimeout(() => {
        this.resize();
      }, 200);
    },
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
  },
};
</script>
