<template>
  <div class="chart" ref="dom"></div>
</template>

<script>
import echarts from "echarts";
import { off, on } from "@/libs/tools";
import { judgeNull } from "../util.js";
export default {
  name: "archiveManageUnitPieCharts",
  props: {
    unitNatureData: Array,
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
        let pieDataTotal = 0;
        for (var i = 0; i < _this.unitNatureData.length; i++) {
          pieDataTotal += _this.unitNatureData[i].value * 1;
        }
        let option = {
          title: {
            text: "总   数",
            subtext: pieDataTotal + "台",
            x: "29%",
            y: "32%",
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
            formatter: "{b}: {c} 台 ({d}%)",
          },
          legend: {
            orient: "vertical",
            x: "right",
            left: "57%",
            top: "10%",
            data: ["办公建筑", "商场建筑", "综合建筑", "宾馆建筑"],
            textStyle: {
              color: "#009999",
              lineHeight: 25,
              fontSize: 10,
            },
            formatter: function (name) {
              var total = 0;
              var value;
              for (var i = 0; i < _this.unitNatureData.length; i++) {
                total += _this.unitNatureData[i].value * 1;
                if (_this.unitNatureData[i].name === name) {
                  value = _this.unitNatureData[i].value * 1;
                }
              }
              var percent = ((value / total) * 100).toFixed(2);
              return name + "    " + percent + "%" + "  " + value + "台";
            },
          },
          series: [
            {
              name: "",
              type: "pie",
              center: ["30%", "40%"],
              radius: ["38%", "62%"],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: "center",
                },
              },
              labelLine: {
                normal: {
                  show: false,
                },
              },
              data: _this.unitNatureData,
              color: ["#07db8a", "#07b7db", "#ff9933", "#f46042"],
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
    unitNatureData() {
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
