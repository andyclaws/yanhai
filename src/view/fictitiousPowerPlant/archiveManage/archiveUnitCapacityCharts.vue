<template>
  <div class="chart" ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { off, on } from "@/libs/tools";
import { judgeNull } from "../util.js";
export default {
  name: "archiveUserUnitCharts",
  props: {
    unitCapacityName: Array,
    unitCapacityData: Array,
    nodeStatus: Number,
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
        let option = {
          title: {
            text: "kW",
            textStyle: {
              fontWeight: "normal",
              color: "#9ea7b4",
              fontSize: "12",
            },
            left: "5%",
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "15%",
            top: "10%",
            containLabel: true,
          },
          legend: {
            data: ["机组容量"],
            align: "left",
            top: "-2%",
            left: "80%",
          },
          xAxis: {
            type: "category",
            data: _this.unitCapacityName,
            axisTick: {
              show: false, // 隐藏横坐标刻度
            },
            axisLine: {
              lineStyle: {
                color: "#999999",
              },
            },
          },
          yAxis: {
            type: "value",
            axisTick: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                color: "#999999",
              },
            },
          },
          series: [
            {
              name: "机组容量",
              data: _this.unitCapacityData,
              type: "bar",
              barWidth: 30,
              itemStyle: {
                normal: {
                  color: "#40f49a",
                },
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
    unitCapacityName() {
      this.draw();
    },
    unitCapacityData() {
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
