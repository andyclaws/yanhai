<template>
  <Card class="realTimeLoad">
    <p slot="title" class="title">实时负荷曲线(kW)</p>
    <div ref="dom" class="echarts1"></div>
  </Card>
</template>

<script>
import echarts from "echarts";
import tdTheme from "../../../components/charts/theme.json";
import { off, on } from "@/libs/tools";
import { judgeNull } from "../util.js";

echarts.registerTheme("tdTheme", tdTheme);
export default {
  name: "realTimeCurve",
  props: {
    curveDatas: Object
  },
  data() {
    return {
      dom: null,
      color: ["#0099FF", "#FF9933"]
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
    removeEndNull(arr) {
      let noEndNullArr = [];
      let isEnd = true;
      for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] !== "" || !isEnd) {
          noEndNullArr.push(arr[i]);
          isEnd = false;
        }
      }
      return noEndNullArr.reverse();
    },
    draw() {
      let _this = this;
      console.log(_this.curveDatas);
      this.$nextTick(() => {
        if (
          typeof _this.curveDatas === "undefined" ||
          _this.curveDatas === null
        ) {
          return;
        }

        let divines = [];
        if (_this.curveDatas.actualValue !== null) {
          for (let i = 0; i < _this.curveDatas.actualValue.length; i++) {
            divines.push(_this.curveDatas.actualValue[i]);
          }
        }

        let reals = [];
        if (_this.curveDatas.predictedValue !== null) {
          for (let i = 0; i < _this.curveDatas.predictedValue.length; i++) {
            reals.push(_this.curveDatas.predictedValue[i]);
          }
        }

        let option = {
          dataZoom: [
            {
              type: "inside",
              xAxisIndex: [0],
              filterMode: "filter"
            }
          ],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                textStyle: {
                  fontSize: 12,
                  fontWeight: 400
                }
              }
            }
          },
          legend: {
            top: 0,
            right: 10,
            itemGap: 10,
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
            left: 25,
            top: 50,
            right: 15,
            bottom: 15,
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: [
                "00:00",
                "04:00",
                "08:00",
                "12:00",
                "16:00",
                "20:00",
                "24:00"
              ]
            }
          ],
          yAxis: [
            {
              name: "  单位: (kW)",
              type: "value",
              min: 0,
              splitLine: {
                show: true
              },
              nameTextStyle: {
                fontSize: 12,
                fontWeight: 400,
                color: "#999999"
              },
              nameGap: 15
            }
          ],
          series: [
            {
              name: "预测值",
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
                        color: "#0099FF" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#E4F3FC" // 100% 处的颜色
                      }
                    ],

                    globalCoord: false // 缺省为 false
                  }
                }
              },
              data: divines
            },
            {
              name: "实际值",
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
                        color: "#FF9933" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#FBF4EF" // 100% 处的颜色
                      }
                    ],

                    globalCoord: false // 缺省为 false
                  }
                }
              },
              data: reals
            }
          ],
          color: _this.color
        };
        this.dom = echarts.init(this.$refs.dom, "tdTheme");
        this.dom.setOption(option);
        on(window, "resize", this.resize);
      });
    }
  },
  watch: {
    curveDatas() {
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

<style lang="less" scoped>
@import "machineDetails.less";
</style>
