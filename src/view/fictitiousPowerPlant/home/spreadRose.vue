<template>
  <div ref="dom" class="charts spread-rose"></div>
</template>

<script>
import echarts from "echarts";
import tdTheme from "../../../components/charts/theme.json";
import { off, on } from "@/libs/tools";
import { judgeNull } from "../util.js";

echarts.registerTheme("tdTheme", tdTheme);
export default {
  name: "spreadRose",
  props: {
    roseData: Array,
    totalSize: String,
  },
  data() {
    return {
      dom: null,
      color: [
        "#07DB8A",
        "#5FBEFE",
        "#F46042",
        "#FFC313",
        "#E46CBB",
        "#E67AEB",
        "#ED3F14",
        "#F14392",
        "#FF9900",
        "#FFD200",
        "#9EED47",
        "#40F49A",
        "#00CCCC",
        "#47BFED",
        "#4597F1",
        "#49EDCC",
        "#6BDEE4",
        "#00CCFF",
      ],
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
        if (typeof _this.roseData === "undefined" || _this.roseData === null) {
          return;
        }
        var map = new Map();
        let legendData = [];
        for (var index = 0; index < _this.roseData.length; index++) {
          map.set(_this.roseData[index].name, _this.roseData[index].value);
          legendData.push(_this.roseData[index].name);
        }
        let option = {
          tooltip: {
            trigger: "axis",
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
              color: "#666666",
            },
            data: ["海水淡化", "其他"],
          },
          grid: {
            left: 20,
            top: 40,
            right: 15,
            bottom: 25,
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              xaxisLabel: {
                interval: 15,
              },
              data: ["7月1日", "7月2日", "7月3日"],
            },
          ],
          yAxis: [
            {
              name: "单位: kWh",
              type: "value",
              min: 0,
              max: 250,
              splitLine: {
                show: true,
              },
              nameTextStyle: {
                fontSize: 12,
                fontWeight: 400,
                color: "#999999",
              },
              nameGap: 5,
            },
          ],
          series: [
            {
              name: "海水淡化",
              type: "line",
              smooth: false,
              data: [190, 200, 195],
            },
            {
              name: "其他",
              type: "line",
              smooth: false,
              data: [120, 98, 105],
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
    totalSize() {
      this.draw();
    },
    roseData() {
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
