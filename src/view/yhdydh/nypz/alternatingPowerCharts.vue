<template>
  <div class="chart" ref="dom"></div>
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
    alternatingPowerData: Array,
  },
  data() {
    return {
      dom: null,
      color: ["#0099FF", "#FF9933"],
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
      _this.$nextTick(() => {
        if (
          typeof _this.alternatingPowerData === "undefined" ||
          _this.alternatingPowerData === null
        ) {
          return;
        }

        let times = [
          "00:00",
          "04:00",
          "08:00",
          "12:00",
          "16:00",
          "20:00",
          "24:00",
        ];
        let option = {
          title: {
            text: "策略调整",
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["市电", "风力", "光伏", "储能"],
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            axisLabel: {
              interval: 0,
              rotate: 40,
            },
            type: "category",
            boundaryGap: false,
            // data: ['','0:00:00', '0:50:00', '1:40:00', '2:30:00', '3:20:00', '4:10:00', '5:00:00', '6:40:00', '7:30:00', '8:20:00']
            data: [
              "",
              "0:00:00",
              "0:50:00",
              "1:40:00",
              "2:30:00",
              "3:20:00",
              "4:10:00",
              "5:00:00",
              "6:40:00",
              "7:30:00",
              "8:20:00",
              "0:00:00",
              "0:50:00",
              "1:40:00",
              "2:30:00",
              "3:20:00",
              "4:10:00",
              "5:00:00",
              "6:40:00",
              "7:30:00",
              "8:20:00",
              "1:40:00",
              "2:30:00",
              "3:20:00",
              "4:10:00",
              "5:00:00",
              "6:40:00",
              "7:30:00",
              "8:20:00",
            ],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "市电",
              type: "line",
              stack: "总量",
              smooth:false,
              data: [, 120, 132, 101, 134, 90, 230, 210, 90, 230, 210, 132, 101, 134, 90, 230, 210,122, 120, 132, 101, 134, 90, 230, 210, 90, 230, 210, 132],
            },
            // {
            //   name: "联盟广告",
            //   type: "line",
            //   stack: "总量",
            //   smooth:false,
            //   data: [, 220, 182, 191, 234, 290, 330, 310, 190, 231, 290],
            // },
            {
              name: "风力",
              type: "line",
              stack: "总量",
              smooth:false,
              data: [, 150, 232, 201, 154, 190, 330, 410, 290, 223, 276, 232, 201, 154, 190, 330, 410,100, 150, 232, 201, 154, 190, 330, 410, 290, 223, 276, 232],
            },
            {
              name: "光伏",
              type: "line",
              stack: "总量",
              smooth:false,
              data: [, 320, 332, 301, 334, 390, 330, 320, 490, 330, 110, 332, 301, 334, 390, 330, 320,150, 332, 301, 334, 390, 330, 320, 490, 330, 110, 332, 301],
            },
            {
              name: "储能",
              type: "line",
              stack: "总量",
              smooth:false,
              data: [, 820, 932, 901, 934, 1290, 1330, 1320, 690, 130, 710, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290, 1330, 1320, 690, 130, 710, 901, 934, 1290],
            },
          ],
        };
        this.dom = echarts.init(this.$refs.dom, "tdTheme");
        this.dom.setOption(option);
        on(window, "resize", this.resize);
      });
    },
  },
  watch: {
    alternatingPowerData() {
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
