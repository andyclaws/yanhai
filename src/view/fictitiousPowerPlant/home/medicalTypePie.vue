<template>
  <div ref="dom" class="charts medical-type-pie"></div>
</template>

<script>
import echarts from "echarts";
import tdTheme from "../../../components/charts/theme.json";
import { off, on } from "@/libs/tools";
import { judgeNull } from "../util.js";

echarts.registerTheme("tdTheme", tdTheme);
export default {
  name: "medicalTypePie",
  props: {
    upList: Array,
    downList: Array,
    aplantPForecasts: Array,
    aplantPRealtimes: Array,
  },
  data() {
    return {
      dom: null,
      color: ["#0099FF", "#FF9933"],
    };
  },
  methods: {
    removeNull(val, initStr = "") {
      return judgeNull(val, initStr);
    },
    resize() {
      if (typeof this.dom !== "undefined" && this.dom !== null) {
        this.dom.resize();
      }
    },
    removeEndNull(arr) {
      let noEndNullArr = [];
      let isEnd = true;
      for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] !== "" || !isEnd) {
          noEndNullArr.push(arr[i]);
          isEnd = false;
        }
      }
      return noEndNullArr.reverse();
    },
    draw() {
      let _this = this;
      this.$nextTick(() => {
        // if (
        //   typeof _this.upList === 'undefined' ||
        //   _this.upList === null ||
        //   typeof _this.downList === 'undefined' ||
        //   _this.downList === null ||
        //   typeof _this.aplantPForecasts === 'undefined' ||
        //   _this.aplantPForecasts === null ||
        //   typeof _this.aplantPRealtimes === 'undefined' ||
        //   _this.aplantPRealtimes === null
        // ) {
        //   return
        // }
        // let divines = _this.aplantPForecasts.map(_ =>
        //   _this.removeNull(_.pointValue)
        // )
        // let reals = _this.aplantPRealtimes.map(_ =>
        //   _this.removeNull(_.pointValue)
        // )
        // let upLoads = _this.upList.map(_ => _this.removeNull(_.pointValue))
        // let downLoads = _this.downList.map(_ => _this.removeNull(_.pointValue))

        let times = ["7月1日", "7月2日", "7月3日"];
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
            data: ["电网供电", "分布式发电"],
          },
          grid: {
            left: 20,
            top: 40,
            right: 15,
            bottom: 0,
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: true,
              xaxisLabel: {
                interval: 15,
              },
              data: times,
            },
          ],
          yAxis: [
            {
              name: "  单位: kW",
              type: "value",
              min: 0,
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
              name: "电网供电",
              type: "line",
              smooth: false,
              data: [210, 280, 250],
            },
            {
              name: "分布式发电",
              type: "line",
              smooth: false,
              data: [100, 90, 95],
            },
          ],
          color: _this.color,
        };
        this.dom = echarts.init(this.$refs.dom, "tdTheme");
        this.dom.setOption(option);
        on(window, "resize", this.resize);
      });
    },
    getNotEmptyVal(val, modal = "") {
      if (val === undefined || val === null) {
        val = modal;
      }
      return val;
    },
  },
  watch: {
    upList() {
      this.draw();
    },
    downList() {
      this.draw();
    },
    aplantPForecasts() {
      this.draw();
    },
    aplantPRealtimes() {
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
