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
          title: {
            text: "年运行时长",
            left: "10px",
            textStyle: {
              color: "#333",
            },
          },
          xAxis: {
            type: "category",
            data: ["设备1", "设备2", "设备3", "设备4", "设备5", "设备6", "设备7"],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: [190, 280, 150, 80, 70, 110, 230],
              type: "bar",
              barWidth: 20,
              color: "#0099FF",
              showBackground: true,
              backgroundStyle: {
                color: "rgba(220, 220, 220, 0.8)",
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
