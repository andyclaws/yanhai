<template>
  <div class="electricity-chart" ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { off, on } from "@/libs/tools";
import { judgeNull } from "../util.js";
export default {
  name: "electricityStatisticsCharts",
  props: {
    electricityStatisticsData: Array,
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
      this.$nextTick(() => {
        if (
          typeof this.electricityStatisticsData === "undefined" ||
          this.electricityStatisticsData === null
        ) {
          return;
        }
        let option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow",
            },
          },
          legend: {
            data: ["需求", "实际产出"],
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              data: ["L01", "L02", "L03", "L04", "L05", "L06", "L07"],
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            {
              name: "需求",
              color: "#00FFCC",
              type: "bar",
              barWidth: 25,
              stack: "搜索引擎",
              data: [320, 432, 201, 234, 390, 530, 520],
            },
            {
              name: "实际产出",
              color: "#00CCFF",
              type: "bar",
              stack: "搜索引擎",
              data: [120, 132, 101, 134, 290, 230, 220],
            },
            {
              name: "需求",
              color: "#00FFCC",
              type: "bar",
              stack: "工单二",
              data: [120, 110, 130, 134, 150, 520, 220],
            },
            {
              name: "实际产出",
              stack: "工单二",
              color: "#00CCFF",
              type: "bar",
              data: [330, 240, 460, 224, 320, 20, 120],
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
    electricityStatisticsData() {
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
