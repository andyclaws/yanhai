<template>
  <div ref="dom" class="charts alarm-time-spread"></div>
</template>

<script>
import echarts from "echarts";
import tdTheme from "../../../components/charts/theme.json";
import { off, on } from "@/libs/tools";
import { judgeNull } from "../util.js";

echarts.registerTheme("tdTheme", tdTheme);
export default {
  name: "alarmTimeSpread",
  props: {
    barData: Array
  },
  data() {
    return {
      dom: null,
      color: ["#6890D3", "#7464C5", "#C378C1", "#E1425C", "#FF9933"],
      selectName: "单位 :  次"
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
        if (typeof _this.barData === "undefined" || _this.barData === null) {
          return;
        }
        let times = [];
        let legendData = [];
        let seriesData = [];
        let map = new Map();
        let mainArr = Array.apply(null, Array(_this.barData.length)).map(
          () => ""
        );
        for (let index = 0; index < _this.barData.length; index++) {
          times.push(_this.barData[index].alarmTime);
          for (
            let innerIndex = 0;
            innerIndex < _this.barData[index].alarmTypeResp.length;
            innerIndex++
          ) {
            if (
              legendData.indexOf(
                _this.barData[index].alarmTypeResp[innerIndex].alarmType
              ) === -1
            ) {
              legendData.push(
                _this.barData[index].alarmTypeResp[innerIndex].alarmType
              );
              let clone = mainArr.slice(0);
              clone[index] =
                _this.barData[index].alarmTypeResp[innerIndex].expCnt;
              map.set(
                _this.barData[index].alarmTypeResp[innerIndex].alarmType,
                clone
              );
            } else {
              map.get(_this.barData[index].alarmTypeResp[innerIndex].alarmType)[
                index
              ] = _this.barData[index].alarmTypeResp[innerIndex].expCnt;
            }
          }
        }
        map.forEach(function(value, key) {
          let obj = {
            name: key,
            type: "bar",
            data: value,
            stack: "divisorType",
            barWidth: "50%",
            barGap: "20%"
          };
          seriesData.push(obj);
        });

        let option = {
          title: {
            text: "告警时段分布",
            y: "top",
            top: 10,
            left: 5,
            textStyle: {
              fontSize: 18,
              fontWeight: 400,
              color: "#009999"
            }
          },
          legend: {
            top: 30,
            itemGap: 50,
            itemWidth: 15,
            itemHeight: 15,
            textStyle: {
              fontSize: 14
            },
            data: legendData
          },
          grid: {
            left: 25,
            top: 75,
            right: 20,
            bottom: 0,
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              data: times,
              splitLine: {
                show: true
              },
              axisLabel: {
                interval: 0,
                rotate: 0
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              name: _this.selectName,
              min: 0,
              splitLine: {
                show: true
              }
            }
          ],
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
              type: "shadow"
            },
            padding: 15,
            formatter: function(params) {
              let res = "";
              if (params.length === 0) {
                return;
              }
              res += params[0].axisValue + " :</br>";
              for (var i = 0; i < params.length; i++) {
                if (params[i].value === "" || params[i].value === 0) {
                  continue;
                }
                res +=
                  "<div style='display:inline-block;width:12px;height:12px;margin-top:5px;margin-right:8px;border-radius:50%;background-color:" +
                  params[i].color +
                  ";'></div><span style='color:#fff;vertical-align:top;'>" +
                  params[i].seriesName +
                  "  :  " +
                  params[i].value +
                  "次";
                res += "</span>";
                if (i !== params.length - 1) {
                  res += "</br>";
                }
              }
              return res;
            }
          },
          series: seriesData,
          color: _this.color
        };
        this.dom = echarts.init(this.$refs.dom, "tdTheme");
        this.dom.setOption(option);
        on(window, "resize", this.resize);
      });
    }
  },
  watch: {
    barData() {
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
