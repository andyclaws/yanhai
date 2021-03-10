<template>
  <div ref="dom" class="chart"></div>
</template>

<script>
import echarts from "echarts";
import tdTheme from "../../../components/charts/theme.json";
import { off, on } from "@/libs/tools";
import { judgeNull } from "../util.js";
echarts.registerTheme("tdTheme", tdTheme);
export default {
  name: "achiveMedicalTypePie",
  props: {
    unitTypeData: Array,
  },
  data() {
    return {
      dom: null,
      color: [
        "rgba(7, 219, 138, 1)",
        "rgba(7, 183, 219, 1)",
        "rgba(255, 195, 19, 1)",
      ],
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
      let _this = this;
      this.$nextTick(() => {
        let pieDataTotal = 0;
        for (let i = 0; i < _this.unitTypeData.length; i++) {
          pieDataTotal += _this.unitTypeData[i].value * 1;
        }
        pieDataTotal = pieDataTotal + "台";
        let option = {
          title: {
            text: "机组数",
            subtext: pieDataTotal,
            x: "44%",
            y: "49%",
            textAlign: "center",
            textStyle: {
              fontSize: 14,
              fontWeight: 400,
              color: "#115055",
            },
            subtextStyle: {
              fontSize: 14,
              fontWeight: 700,
              color: "#038C99",
            },
          },
          tooltip: {
            trigger: "item",
            formatter: "{b} : {c}个 ({d}%)",
          },
          legend: {
            right: 10,
            top: 0,
            bottom: 0,
            itemGap: 10,
            textStyle: {
              fontSize: 12,
              fontWeight: 400,
              color: "#666666",
            },
            itemWidth: 8,
            itemHeight: 8,
            data: ["DR", "ADR", "DR&ADR"],
          },
          series: [
            {
              type: "pie",
              radius: ["40%", "68%"],
              center: ["45%", "60%"],
              data: _this.unitTypeData,
              itemStyle: {
                borderColor: "white",
                borderWidth: 1,
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
              },
              labelLine: {
                normal: {
                  show: true,
                  length: 15,
                  length2: 25,
                },
              },
              label: {
                normal: {
                  formatter: "{d}%({c}台)\n\n{b}",
                },
              },
              color: _this.color,
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
    unitTypeData() {
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
