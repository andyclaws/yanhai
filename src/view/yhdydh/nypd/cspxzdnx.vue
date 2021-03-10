<template>
  <div class="lightDetail-contanier">
    <!-- <el-row justify="start">
      <el-col :span="24">
        <div class="topdate">
          <span>选择日期：</span>
          <el-date-picker v-model="value1" type="year" placeholder="选择年">
          </el-date-picker>
          <span>年</span>
          <el-date-picker v-model="value2" type="month" placeholder="选择月">
          </el-date-picker>
          <span>月</span>
          <el-date-picker type="dates" v-model="value3" placeholder="选择日期">
          </el-date-picker>
          <span>日期</span>
        </div>
      </el-col>
      <el-col class="selecto">
        <span>选择设备：</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row> -->

    <el-card style="width: 100%" :style="cardHeight" shadow="never">
      
      <div slot="header">


        <div class="content-box" :style="contentHeight">
          <div class="right-box">
            <div class="curve-box">


              <div class="topdate">
          <span>选择日期：</span>
          <el-date-picker v-model="value1" type="year" placeholder="选择年">
          </el-date-picker>
          <span>年</span>
          <el-date-picker v-model="value2" type="month" placeholder="选择月">
          </el-date-picker>
          <span>月</span>
          <el-date-picker type="dates" v-model="value3" placeholder="选择日期">
          </el-date-picker>
          <span>日期</span>
          <br>
          <br>
          <span>选择设备：</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>

        </div>
              
              <div class="electric-charts-box">
                <electricity-statistics-charts
                  :electricityStatisticsData="electricityStatisticsData"
                ></electricity-statistics-charts>
              </div>

              <div class="power-charts-box">
                <alternating-power-charts
                  :alternatingPowerData="alternatingPowerData"
                ></alternating-power-charts>
              </div>

            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
import $ from "jquery";
import alternatingPowerCharts from "./alternatingPowerCharts";
import electricityStatisticsCharts from "./electricityStatisticsCharts";
const name = ["市电", "光伏", "风电", "市电", "光伏", "风电", "市电"];
const goal = [
  "用能成本最低",
  "经济收益最大",
  "经济收益最大",
  "消纳量最大",
  "综合能效最小",
  "电网峰谷差最小",
  "电网峰谷差最小",
];
const scene = [
  "提高用户舒适度",
  "供需平衡",
  "新能源平抑消纳",
  "新能源平抑消纳",
  "供需平衡",
  "供需平衡",
  "削峰填谷",
];
export default {
  name: "lightingDetail",
  props: {},
  data() {
    return {
      cardHeight: "height: 850px;",
      contentHeight: "height: 750px;",
      currentPower: 1400,
      maxDesignPower: 2000,
      sameDayElectricity: 402,
      yesterdayElectricity: 1000,
      powerDataPercent: "",
      electricityDataPercent: "",
      activeIndex: 0,
      alternatingPowerData: [],
      electricityStatisticsData: [],
      dimensionValue: "day",
      datas: [],
      visi: false,
      tableData: [
        {
          id: "用能成本最低",
          disabledvalue: "true",
          checked: "true",
        },
        {
          id: "经济收益最大",
          disabledvalue: "false",
        },
        {
          id: "消纳量最大",
          disabledvalue: "true",
        },
        {
          id: "综合能耗最小",
          disabledvalue: "true",
        },
        {
          id: "电网峰谷差最小",
          disabledvalue: "true",
        },
      ],
      tableData1: [],
      value1: "",
      value2: "",
      value3: "",
      tableDatatwo: [
        {
          date: "用水需求",
          name: "",
          aname: "",
          bname: "",
          cname: "",
          address: "",
        },
        {
          date: "蓄水量",
          name: "",
          aname: "",
          bname: "",
          cname: "",
          address: "",
        },
      ],
    };
  },
  components: {
    alternatingPowerCharts,
    electricityStatisticsCharts,
  },
  mounted() {
    this.changeHeight();
    let that = this;
    window.onresize = () => {
      return (() => {
        that.changeHeight();
      })();
    };
    this.alternatingPowerData = [820, 932, 901, 934, 1290, 1330, 1320];
    this.electricityStatisticsData = [
      90,
      56,
      82,
      88,
      50,
      40,
      63,
      81,
      45,
      62,
      73,
      59,
      80,
    ];
  },
  methods: {
    tableRowClassNameone({ row, rowIndex }) {
      if ((rowIndex + 1) % 2 === 0) {
        return "warning-row";
      } else if ((rowIndex + 1) % 2 !== 0) {
        return "success-row";
      }
      return "";
    },
    changeHeight: function () {
      this.cardHeight =
        window.innerHeight > 800
          ? "height: " + (window.innerHeight - 80) + "px"
          : "height: 850px";
      this.contentHeight =
        window.innerHeight > 800
          ? "height: " + (window.innerHeight - 160) + "px"
          : "height: 750px";
    },
  },
};
</script>
<style lang="less">
@import "zznxingDetail.less";
.el-table .warning-row {
  background: #ffffff;
}

.el-table .success-row {
  background: #b0c4de;
}
/* element关闭鼠标悬停行内换色 */
.el-table tbody tr {
  pointer-events: none;
}
.button1 {
  margin-top: 10px;
  margin-left: 90%;
}
.tablecss {
  clear: left;
  margin-left: 100px;
  padding-top: 20px;
}
.topdate{
  float: left;
  padding-top:  30px;
}
.selecto {
  padding-top: 30px;
}
</style>