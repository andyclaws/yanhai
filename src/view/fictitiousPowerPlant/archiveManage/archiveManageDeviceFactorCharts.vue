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
    deviceFactorData: Array,
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
        for (var i = 0; i < _this.deviceFactorData.length; i++) {
          pieDataTotal += _this.deviceFactorData[i].value * 1;
        }
        let option = {
          title: {
            text: "设 备 总 数",
            subtext: pieDataTotal + "台",
            x: "29%",
            y: "35%",
            textAlign: "center",
            textStyle: {
              fontSize: 12,
              fontWeight: 400,
              color: "#115055",
            },
            subtextStyle: {
              fontSize: 12,
              fontWeight: 700,
              color: "#038C99",
            },
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)",
          },
          legend: {
            orient: "vertical",
            x: "right",
            left: "60%",
            top: "12%",
            data: ["空调", "照明", "特殊", "动力"],
            textStyle: {
              color: "#009999",
              lineHeight: 25,
              fontSize: 10,
            },
            formatter: function (name) {
              var total = 0;
              var value;
              for (var i = 0; i < _this.deviceFactorData.length; i++) {
                total += _this.deviceFactorData[i].value * 1;
                if (_this.deviceFactorData[i].name === name) {
                  value = _this.deviceFactorData[i].value * 1;
                }
              }
              var percent = ((value / total) * 100).toFixed(2);
              return name + "    " + percent + "%" + "  " + value + "台";
            },
          },
          series: [
            {
              name: "访问来源",
              type: "pie",
              center: ["30%", "45%"],
              radius: ["40%", "70%"],
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
              data: _this.deviceFactorData,
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
    deviceFactorData() {
      this.draw();
    },
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
  },
};
</script>
