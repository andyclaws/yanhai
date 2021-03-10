<template>
  <div class="rehearseSituation-echart" ref="dom"></div>
</template>
<script>
import echarts from "echarts";
import { off, on } from "@/libs/tools";
import { judgeNull } from "../util.js";
export default {
  name: "rehearseSituationEchart",
  props: {
    totalData: Object,
  },
  data() {
    return {
      dom: null,
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
          typeof _this.totalData === "undefined" ||
          _this.totalData === null
        ) {
          return;
        }
        console.log(888, _this.totalData);
        let aplantPForecasts = _this.totalData.drillValue;
        let aplantPRealtimes = _this.totalData.predictedValue;
        console.log(aplantPForecasts, aplantPRealtimes);
        let aXiosStartTime = _this.totalData.planStartDate;
        let aXiosEndTime = _this.totalData.planEndDate;
        console.log(aXiosStartTime, aXiosEndTime);
        let dataV = [
          [
            {
              name: "响应区间",
              xAxis: aXiosStartTime,
            },
            {
              xAxis: aXiosEndTime,
            },
          ],
        ];

        let option = {
          legend: {
            icon: "rectangle",
            textStyle: {
              fontSize: 12,
            },
            itemHeight: 13,
            itemWidth: 13,
            x: "center",
            y: "bottom",
            data: ["预测负荷曲线", "演练负荷曲线", "响应区间"],
          },
          grid: {
            top: "18%",
            left: "5%",
            right: "3%",
            bottom: "14%",
            containLabel: true,
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                textStyle: {
                  fontSize: 12,
                  fontWeight: 400,
                },
              },
            },
          },
          calculable: true,
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: [
                "00:00",
                "00:15",
                "00:30",
                "00:45",
                "01:00",
                "01:15",
                "01:30",
                "01:45",
                "02:00",
                "02:15",
                "02:30",
                "02:45",
                "03:00",
                "03:15",
                "03:30",
                "03:45",
                "04:00",
                "04:15",
                "04:30",
                "04:45",
                "05:00",
                "05:15",
                "05:30",
                "05:45",
                "06:00",
                "06:15",
                "06:30",
                "06:45",
                "07:00",
                "07:15",
                "07:30",
                "07:45",
                "08:00",
                "08:15",
                "08:30",
                "08:45",
                "09:00",
                "09:15",
                "09:30",
                "09:45",
                "10:00",
                "10:15",
                "10:30",
                "10:45",
                "11:00",
                "11:15",
                "11:30",
                "11:45",
                "12:00",
                "12:15",
                "12:30",
                "12:45",
                "13:00",
                "13:15",
                "13:30",
                "13:45",
                "14:00",
                "14:15",
                "14:30",
                "14:45",
                "15:00",
                "15:15",
                "15:30",
                "15:45",
                "16:00",
                "16:15",
                "16:30",
                "16:45",
                "17:00",
                "17:15",
                "17:30",
                "17:45",
                "18:00",
                "18:15",
                "18:30",
                "18:45",
                "19:00",
                "19:15",
                "19:30",
                "19:45",
                "20:00",
                "20:15",
                "20:30",
                "20:45",
                "21:00",
                "21:15",
                "21:30",
                "21:45",
                "22:00",
                "22:15",
                "22:30",
                "22:45",
                "23:00",
                "23:15",
                "23:30",
                "23:45",
                "24:00",
              ],
              splitArea: {
                show: false,
              },
              axisLabel: {
                interval: 15,
              },
              axisLine: {
                lineStyle: {
                  width: 1,
                  type: "dashed",
                  color: "rgb(153, 153, 153)",
                },
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              name: "单位：(kW)",
              position: "bottom",
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
            },
          ],
          series: [
            {
              name: "预测负荷曲线",
              type: "line",
              areaStyle: {
                normal: {
                  color: {
                    type: "linear", // 设置线性渐变
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#FF9933", // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#FBF4EF", // 100% 处的颜色
                      },
                    ],

                    globalCoord: false, // 缺省为 false
                  },
                },
              },
              data: aplantPForecasts,

              smooth: true,
            },
            {
              name: "演练负荷曲线",
              type: "line",
              areaStyle: {
                normal: {
                  color: {
                    type: "linear", // 设置线性渐变
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#0099FF", // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#E4F3FC", // 100% 处的颜色
                      },
                    ],

                    globalCoord: false, // 缺省为 false
                  },
                },
              },
              data: aplantPRealtimes,
              smooth: true,
            },
            {
              name: "响应区间",
              type: "line",
              color: "orange",
              markArea: {
                data: dataV,
              },
            },
          ],
        };
        this.dom = echarts.init(this.$refs.dom, "light");
        this.dom.setOption(option);
        on(window, "resize", this.resize);
      });
    },
  },
  watch: {
    totalData() {
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
<style lang="less" scoped>
@import "controlPractice.less";
</style>
