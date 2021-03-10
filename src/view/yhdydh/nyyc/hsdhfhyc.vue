<template>
  <div class="archiveManage-body">
    <div class="date">
      <span style="font-size: 18px; margin-right: 10px">选择日期</span>
      <Date-picker style="margin-bottom: 8px; margin-right: 50px"></Date-picker>
    </div>
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="hover">
          <div
            id="main1"
            style="width: 1500px; height: 300px"
          ></div> </el-card></el-col
    ></el-row>
    <br />
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="hover">
          <div
            id="main2"
            style="width: 1500px; height: 300px"
          ></div> </el-card></el-col
    ></el-row>
  </div>
</template>
<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
const gfycxdata = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
];
const gfycxdata1 = [
  "1:00",
  "2:00",
  "3:00",
  "4:00",
  "5:00",
  "6:00",
  "7:00",
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
  "24:00",
];
const gfycdata = [
  0,
  0,
  0,
  0,
  0,
  0,
  13000,
  41411,
  44444,
  50000,
  51000,
  52000,
  53525,
  55000,
  52000,
  48000,
  46000,
  20000,
  100,
  0,
  0,
  0,
  0,
  0,
];
const gfycdata1 = [
  0,
  0,
  0,
  0,
  0,
  0,
  820,
  832,
  701,
  634,
  855,
  900,
  900,
  850,
  750,
  720,
  350,
  200,
  0,
  0,
  0,
  0,
  0,
  0,
];
const fdycxdata = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
];
const fdycxdata1 = [
  "1:00",
  "2:00",
  "3:00",
  "4:00",
  "5:00",
  "6:00",
  "7:00",
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
  "24:00",
];
const fdycdata = [
  2,
  5,
  8,
  6,
  4,
  9,
  8,
  5,
  7,
  2,
  1,
  6,
  5,
  2,
  9,
  5,
  8,
  10,
  5,
  4,
  8,
  4,
  4,
  1,
];
const fdycdata1 = [
  418,
  515,
  161,
  166,
  551,
  415,
  848,
  155,
  151,
  848,
  484,
  488,
  494,
  118,
  551,
  266,
  616,
  649,
  495,
  214,
  414,
  261,
  616,
  164,
];
const xdata1 = [
  "0:00",
  "1:00",
  "2:00",
  "3:00",
  "4:00",
  "5:00",
  "6:00",
  "7:00",
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
  "24:00",
];
const xdata = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
  "24",
  "25",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
  "33",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
  "49",
  "50",
];
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  name: "hsdhfhyc",
  data() {
    return {
      diff: [
        "0.064",
        "0.037",
        "-0.004",
        "0.047",
        "0.035",
        "0.05",
        "-0.009",
        "0.011",
        "0.073",
        "0.029",
        "0.009",
        "-0.008",
        "0.015",
        "0.073",
        "0.074",
        "0.05",
        "0.019",
        "0.048",
        "-0.027",
        "0.009",
        "0.064",
        "0.051",
        "-0.077",
        "0.024",
        "0.043",
        "-0.07",
        "0.006",
        "0.063",
        "-0.022",
        "0.024",
        "0.058",
        "0.071",
        "0.072",
        "-0.067",
        "0.053",
        "0.026",
        "0.005",
        "0.032",
        "0.059",
        "-0.011",
        "-0.031",
        "0.04",
        "0.014",
        "-0.062",
        "0.061",
        "0.006",
        "-0.04",
        "0.043",
        "-0.024",
      ],
      vmDiff: [
        "0.026",
        "0.026",
        "0.044",
        "0.039",
        "-0.058",
        "0.066",
        "0.014",
        "0.026",
        "-0.069",
        "0.018",
        "0.022",
        "-0.003",
        "0.02",
        "-0.079",
        "-0.059",
        "0.002",
        "0.035",
        "0.046",
        "0.075",
        "0.06",
        "0.059",
        "-0.044",
        "0.023",
        "0.052",
        "0.052",
        "0.048",
        "0.045",
        "0.029",
        "0.064",
        "0.046",
        "0.022",
        "-0.026",
        "0.005",
        "0.063",
        "0.013",
        "0.045",
        "0.068",
        "-0.032",
        "0.059",
        "0.026",
        "0.064",
        "-0.031",
        "0.076",
        "0.022",
        "0.015",
        "0.065",
        "-0.025",
        "0.053",
        "0.024",
      ],
      lightData: [
        3.3,
        3.5,
        3.7,
        3.9,
        3.1,
        3.3,
        3.5,
        3.7,
        3.9,
        4.1,
        4.3,
        5.3,
        5.5,
        5.7,
        5.9,
        6.1,
        10.7,
        10.9,
        11.1,
        11.3,
        11.5,
        11.7,
        6.3,
        6.5,
        6.7,
        6.9,
        7.1,
        7.3,
        10.5,
        8.3,
        8.5,
        8.7,
        8.9,
        9.1,
        11.6,
        11.1,
        4.5,
        4.7,
        4.9,
        5.1,
        7.5,
        7.7,
        7.9,
        8.1,
        9.3,
        9.5,
        9.7,
        9.9,
        9.5,
      ],
      windData: [
        3.3,
        3.5,
        4.3,
        5.3,
        5.5,
        7.1,
        7.3,
        6.5,
        8.3,
        8.5,
        8.7,
        8.9,
        9.1,
        6.1,
        8.2,
        10.7,
        10.9,
        11.1,
        11.3,
        10.5,
        11.7,
        8.3,
        11.5,
        10.1,
        10.5,
        6.7,
        4.9,
        6.1,
        7.5,
        4.7,
        4.9,
        6.7,
        3.9,
        5.5,
        5.7,
        5.9,
        4.1,
        4.3,
        3.5,
        3.7,
        3.9,
        4.1,
        7.7,
        7.9,
        8.1,
        9.3,
        9.5,
        9.7,
        9.9,
      ],

      showLeftTree: false,
      defaultshowLeftTree: false,
      name: "海水淡化厂",
      treeData: [
        {
          id: 1,
          label: "天津滨海新区",
          children: [
            {
              label: "海水淡化厂",
              children: [
                { label: "设备1" },
                { label: "设备2" },
                { label: "设备3" },
              ],
            },
            { label: "工厂1" },
            { label: "工厂2" },
            { label: "工厂3" },
            { label: "居民1" },
            { label: "居民2" },
          ],
        },
      ],
      gfycname: "海水淡化厂|||用户一",
      fdycname: "海水淡化厂|||用户一",
      ydycname: "海水淡化厂|||用户一",
    };
  },
  created() {},
  mounted() {
    this.initData();
  },
  methods: {
    changeData(index) {
      this.showLeftTree = !this.showLeftTree;
      this.defaultshowLeftTree = !this.defaultshowLeftTree;
      this.name = this.treeData[index - 1].name;
      console.log(this.name);
    },
    showTree() {
      this.showLeftTree = !this.showLeftTree;
      console.log(this.showLeftTree);
      this.defaultshowLeftTree = true;
    },
    //初始化数据
    initData() {
      // 基于准备好的dom，初始化echarts实例
      var myChart1 = echarts.init(document.getElementById("main1"));
      var myChart2 = echarts.init(document.getElementById("main2"));

      // 绘制图表
      myChart1.setOption({
        title: {
          text: "海水曲线",
          left: "30%",
          fontFamily: "Times New Roman",
        },
        tooltip: {},
        color: ["#6495ED", "#FF8C00"],
        legend: {
          orient: "vertical",
          data: [
            { name: "实际负荷", icon: "line" },
            { name: "预测负荷", icon: "line" },
            { name: "实际负荷值", icon: "circle" },
            { name: "预测负荷值", icon: "circle" },
          ],
          right: "25%",
        },
        xAxis: {
          name: "时间/0.5h",
          type: "category",
          axisLine: { show: false },
          axisTick: {
            show: false,
          },
          axisLabel: { interval: 4 },
          data: xdata,
        },
        yAxis: [
          {
            name: "功率/Mw",
            type: "value",
            position: "left",
            min: 3,
            max: 12,
            interval: 3,

            axisTick: {
              inside: true,
              show: true,
            },
            axisLine: { show: true },
            axisLabel: {
              formatter: "{value} ",
            },
          },
        ],
        grid: {
          left: "3%",
          right: "25%",
          bottom: "16%", // 这几个属性可以控制图表上下左右的空白尺寸，可以自己试试。
          containLabel: true,
        },
        series: [
          {
            name: "实际负荷",
            type: "line",
            yAxisIndex: 0,
            symbol: "circle",
            lineStyle: {
              normal: {
                color: "#6495ED",
                width: "2",
              },
            },
            data: this.lightData,
          },
          {
            name: "预测负荷",
            type: "line",
            yAxisIndex: 0,
            symbol: "circle",
            lineStyle: {
              normal: {
                color: "#FF8C00",
                width: "2",
              },
            },
            data: this.windData,
          },
          {
            name: "实际负荷值",
            type: "scatter",
            yAxisIndex: 0,
            symbol: "circle",
            lineStyle: {
              normal: {
                color: "#6495ED",
                width: "2",
              },
            },
            data: this.lightData,
          },
          {
            name: "预测负荷值",
            type: "scatter",
            yAxisIndex: 0,
            symbol: "circle",
            lineStyle: {
              normal: {
                color: "#6495ED",
                width: "2",
              },
            },
            data: this.windData,
          },
        ],
      }),
        myChart2.setOption({
          title: {
            text: "相对误差曲线",
            left: "30%",
            fontFamily: "Times New Roman",
          },
          tooltip: {},
          color: ["#6495ED", "#FF8C00"],
          legend: {
            orient: "vertical",
            data: ["PSO-LSS VM误差", "LSSVM误差"],
            right: "25%",
          },
          xAxis: {
            name: "时间/0.5h",
            axisLine: { show: false },
            axisTick: {
              show: false,
            },
            axisLabel: { interval: 4 },
            type: "category",
            data: xdata,
          },
          yAxis: [
            {
              name: "相对误差",
              type: "value",
              position: "left",

              axisTick: {
                show: false,
              },
              axisLine: { show: false },
              axisLabel: {
                formatter: "{value} ",
              },
            },
          ],
          grid: {
            left: "3%",
            right: "25%",
            bottom: "16%", // 这几个属性可以控制图表上下左右的空白尺寸，可以自己试试。
            containLabel: true,
          },
          series: [
            {
              name: "PSO-LSS VM误差",
              type: "line",
              yAxisIndex: 0,
              symbol: "circle",
              lineStyle: {
                normal: {
                  color: "#6495ED",
                  width: "2",
                },
              },
              data: this.vmDiff,
            },
            {
              name: "LSSVM误差",
              type: "line",
              yAxisIndex: 0,
              symbol: "circle",
              lineStyle: {
                normal: {
                  color: "#FF8C00",
                  width: "2",
                },
              },
              data: this.diff,
            },
          ],
        });
    },
  },
};
</script>
<style lang="less" scoped>
@import "nyyc.less";
.typeTitle {
  text-align: left;
  color: #2e8b57;
  font-weight: bold;
}
.middle {
  color: black;
  height: 200px;
  width: 200px;
  background: no-repeat center top;
  background-size: contain;
  text-align: center;
  margin-right: 20px;
}
.icon_title {
  line-height: 200px;
  font-size: 32px;
}
.icon_num {
  font-size: 32px;
  margin-top: -70px;
}

.leftButton {
  border: 0px;
  margin-bottom: 20px;
  font-size: 22px;
}
.cardTitle {
  width: 30%;
  text-align: left;
  line-height: 40px;
  font-size: 12px;
  color: #009999;
  margin-left: 20px;
}
a:link {
  color: green;
}
a:visited {
  color: green;
}
a:hover {
  color: red;
}
a:active {
  color: purple;
}

.show-tree-btn,
hide-tree-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  text-align: center;
  line-height: 40px;
  background: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 265px;
  left: 0px;
  z-index: 100;
  cursor: pointer;
}
.ivu-icon {
  color: #009999;
  font-size: 27px;
}
.date {
  position: relative;
  right: 0px;
  text-align: right;
}
</style>
