<template>
  <div ref="dom" class="charts alarm-exp-pie"></div>
</template>

<script>
import echarts from "echarts";
import tdTheme from "../../../components/charts/theme.json";
import { off, on } from "@/libs/tools";
import { judgeNull } from "../util.js";

echarts.registerTheme("tdTheme", tdTheme);
export default {
  name: "alarmExpPie",
  props: {
    pieData: Array,
  },
  data() {
    return {
      dom: null,
      color: ["#FFC313", "#F46042"],
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
      // let _this = this
      this.$nextTick(() => {
        let option = {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter: function (params) {
              var result = "";
              result += params[0].name + "</br>";
              params.forEach(function (item) {
                result +=
                  item.marker + item.seriesName + ":" + item.data + "%</br>";
              });
              return result;
            },
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
            data: ["在线", "不在线"],
          },
          grid: {
            left: 0,
            top: 30,
            right: 20,
            bottom: 0,
            containLabel: true,
          },
          yAxis: [
            {
              name: "",
              type: "value",
              axisLabel: {
                show: true,
                interval: "auto",
                formatter: "{value} %",
              },
              min: 80,
              splitLine: {
                show: true,
              },
              max: 105,
              nameTextStyle: {
                fontSize: 12,
                fontWeight: 400,
                color: "#999999",
              },
              nameGap: 5,
            },
          ],
          xAxis: [
            {
              type: "category",
              xaxisLabel: {
                interval: 15,
              },
              data: ["工业", "商业", "居民"],
            },
          ],
          series: [
            {
              name: "在线",
              type: "bar",
              stack: "总量",
              barMaxWidth: 30,
              label: {
                show: true,
                position: "insideRight",
                formatter: "{c}%",
              },
              data: [90, 99, 90],
            },
            {
              name: "不在线",
              type: "bar",
              stack: "总量",
              barMaxWidth: 30,
              label: {
                show: true,
                position: "insideRight",
                formatter: "{c}%",
              },
              data: [10, 1, 10],
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
    pieData() {
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
