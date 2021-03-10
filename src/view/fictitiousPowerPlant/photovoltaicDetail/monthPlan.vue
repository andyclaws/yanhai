<template>
  <div class="month-plan" ref="dom"></div>
</template>
<script>
import echarts from "echarts";
import { off, on } from "@/libs/tools";
import { judgeNull } from "../util.js";

export default {
  name: "monthPlan",
  props: {
    monthData: Array
  },
  data() {
    return {
      dom: null,
      color: ["#07DB8A", "#FEA348", "#0099FF"]
    };
  },
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
      let _this = this;
      this.$nextTick(() => {
        if (
          typeof _this.monthData === "undefined" ||
          _this.monthData === null
        ) {
          return;
        }
        let planNames = _this.monthData.map(_ => _this.removeNull(_.planName));
        let peakPlans = _this.monthData.map(_ => _this.removeNull(_.peakPlan));
        let peakReals = _this.monthData.map(_ => _this.removeNull(_.peakReal));
        let option = {
          dataZoom: [
            {
              type: "inside",
              xAxisIndex: [0],
              filterMode: "filter",
              throttle: "50",
              // // minValueSpan: 10,
              // start: 0,
              // end: 60,
              // zoomLock: true
            }
          ],
          tooltip: {
            trigger: "axis",
            padding: 15,
            formatter: function(params) {
              let res = "";
              if (params.length === 0) {
                return;
              }
              res += params[0].axisValue + " :</br>";
              for (var i = 0; i < params.length; i++) {
                res +=
                  "<span style='color:" +
                  params[i].color +
                  ";'>" +
                  params[i].seriesId +
                  "  :  " +
                  params[i].value;
                if (params[i].seriesType === "line") {
                  res += "%";
                } else {
                  res += " kW";
                }
                res += "</span>";
                if (i !== params.length - 1) {
                  res += "</br>";
                }
              }
              return res;
            }
          },
          legend: {
            right: "10px",
            itemGap: 5,
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
              fontSize: 12,
              fontWeight: 400,
              color: "#666666"
            },
            data: ["预测值", "实际值"]
          },
          grid: {
            top: "35%",
            left: "1%",
            right: "3%",
            bottom: "2%",
            containLabel: true
          },
          calculable: true,
          xAxis: [
            {
              type: "category",
              data: planNames,
              triggerEvent: true,
              splitLine: {
                show: false
              },
              splitArea: {
                show: false
              },
              axisTick: {
                show: false
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              name: "   单位: kWh",
              scale: true,
              axisLine: {
                show: true,
                lineStyle: {
                  type: "dotted"
                }
              },
              splitArea: {
                show: false
              },
              splitLine: {
                show: true,
                lineStyle: {
                  type: "dashed"
                }
              },
              axisTick: {
                show: false
              },
              nameTextStyle: {
                fontSize: 12,
                fontWeight: 400,
                color: "#999999"
              },
              min: 0
            }
          ],
          series: [
            {
              id: "预测值",
              name: "预测值",
              type: "bar",
              yAxisIndex: 0,
              data: peakPlans
            },
            {
              id: "实际值",
              name: "实际值",
              type: "bar",
              yAxisIndex: 0,
              data: peakReals
            }
          ],
          color: _this.color
        };
        this.dom = echarts.init(this.$refs.dom, "tdTheme");
        // this.dom.on('click', function (params) {
        //   if (params.componentType === 'xAxis') {
        //     _this.$router.push({
        //       name: 'historyPowerGenerationEvent',
        //       query: {
        //         planName: params.value
        //       }
        //     })
        //   }
        // })
        this.dom.setOption(option);
        on(window, "resize", this.resize);
      });
    }
  },
  watch: {
    monthData() {
      this.draw();
    },
    change() {
      setTimeout(() => {
        this.resize();
      }, 200);
    }
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
  }
};
</script>
