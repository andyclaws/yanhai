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
				backgroundColor: '#fff',
				title: {
					text: "订单量（个）",
					left: "18px",
					top: "0",
					textStyle: {
						color: "#999",
						fontSize: 12,
						fontWeight: '400'
					}
				},
				color: ['#FF0000', '#FFCC33'],
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						},
						lineStyle: {
							type: 'dashed'
						}
					}
				},
				grid: {
					left: '25',
					right: '25',
					bottom: '24',
					top: '75',
					containLabel: true
				},
				legend: {
					data: ['订单总笔数', '钱包笔数', '借呗笔数'],
					orient: 'horizontal',
					icon: "rect",
					show: true,
					left: 20,
					top: 25,
				},
				xAxis: {
					type: 'category',
					data: ['01-01', '01-02', '01-03', '01-04', '01-05', '01-06', '01-07'],
					splitLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					axisLine: {
						show: false
					},
				},
				yAxis: {
					type: 'value',
					// max: max_value>=100? max_value + 100: max_value+10,
					// max: max_value > 100 ? max_value * 2 : max_value + 10,
					// interval: 10,
					// nameLocation: "center",
					axisLabel: {
						color: '#FF0000',
						textStyle: {
							fontSize: 12
						},
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: '#F3F4F4'
						}
					},
					axisTick: {
						show: false
					},
					axisLine: {
						show: false
					},
				},
				series: [{
						name: '订单总笔数',
						type: 'line',
						smooth: true,
						data: [3, 7, 2, 9, 2, 8, 1]
					}, {
						name: '钱包笔数',
						type: 'line',
						smooth: true,
						data: [5, 2, 6, 5, 10, 4, 9]
					}
				]
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
