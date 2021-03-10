<template>
  <div ref="dom" class="charts real-time-curve"></div>
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
    curveDatas: Array
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
      this.$nextTick(() => {
        if (
          typeof _this.curveDatas === "undefined" ||
          _this.curveDatas === null
        ) {
          return;
        }
        let curve = [
          { divine: 10245, real: 9815, upLoad: 952, downLoad: 958 },
          { divine: 7245, real: 7359, upLoad: 848, downLoad: 869 },
          { divine: 25341, real: 26874, upLoad: 763, downLoad: 956 },
          { divine: 22318, real: 23487, upLoad: 645, downLoad: 2145 },
          { divine: 15414 },
          { divine: 14599 },
          { divine: 8849 }
        ];
        let divines = curve.map(_ => _this.removeNull(_.divine));
        let reals = curve.map(_ => _this.removeNull(_.real));
        let upLoads = curve.map(_ => _this.removeNull(_.upLoad));
        let downLoads = curve.map(_ => _this.removeNull(_.downLoad));

        let times = [
          "00:00",
          "04:00",
          "08:00",
          "12:00",
          "16:00",
          "20:00",
          "24:00"
        ];
        // let legendData = [];
        // let seriesData = [];
        // for (var index = 0; index < _this.curveDatas.length; index++) {
        //   legendData.push(_this.curveDatas[index].name);
        //   let obj = {
        //     name: _this.curveDatas[index].name,
        //     type: "bar",
        //     data: _this.curveDatas[index].value,
        //     stack: "divisorType",
        //     barWidth: "50%",
        //     barGap: "20%"
        //   };
        //   seriesData.push(obj);
        // }

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
            padding: 15,
            formatter: function(params) {
              let res = "";
              if (params.length === 0) {
                return;
              }
              let index = params[0].dataIndex;
              res += params[0].axisValue + "</br>";
              if (index >= _this.removeEndNull(reals).length) {
                res +=
                  "<span style='color:rgba(7, 219, 138, 1)" +
                  "'>预测负荷: " +
                  divines[index] +
                  "kW</span>";
              } else {
                res +=
                  "<span style='color:rgba(7, 219, 138, 1)" +
                  "'>预测值: " +
                  divines[index] +
                  "kW</span></br>" +
                  "<span style='color:#FFC313" +
                  "'>实际值: " +
                  reals[index] +
                  "kW</span>";
              }
              return res;
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
            left: 20,
            top: 45,
            right: 15,
            bottom: 0,
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: false,
              data: times
            }
          ],
          yAxis: [
            {
              name: "  单位: kW",
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
