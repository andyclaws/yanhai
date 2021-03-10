<template>
  <div class="archiveManage-body">
    <div class="date">
      <span style="font-size: 18px; margin-right: 10px">选择日期</span>
      <Date-picker style="margin-bottom: 8px; margin-right: 50px"></Date-picker>
    </div>
    <el-row :gutter="12">
      <el-col :span="14">
        <el-card shadow="hover">
          <div id="main5" style="width: 820px; height: 450px"></div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card class="rightbox" shadow="hover">
          <div
            style="display: flex; flex-wrap: wrap; width: 100%; height: 450px"
          >
            <el-card
              class="EnergyUseStatistics"
              style="
                height: 225px;
                width: 220px;
                margin-bottom: 5px;
                margin-right: 8px;
              "
            >
              <div slot="header">
                <span
                  ><strong style="font-size: 25px"
                    >最高负荷/负载率:</strong
                  ></span
                >
              </div>
              <div>
                <div style="text-align: center; font-size: 30px">0.0kW/--</div>
                <br />
                <div
                  style="
                    text-align: center;
                    font-size: 28px;
                    font-weight: bolder;
                  "
                >
                  发生时间:
                </div>
                <hr color="#ebeef5" />
                <div style="text-align: center; font-size: 28px">00:00</div>
              </div>
            </el-card>
            <el-card
              class="EnergyUseStatistics"
              style="height: 225px; width: 220px; margin-bottom: 5px"
            >
              <div slot="header">
                <span
                  ><strong style="font-size: 25px"
                    >最高负荷/负载率:</strong
                  ></span
                >
              </div>
              <div>
                <div style="text-align: center; font-size: 30px">0.0kW/--</div>
                <br />
                <div
                  style="
                    text-align: center;
                    font-size: 28px;
                    font-weight: bolder;
                  "
                >
                  发生时间:
                </div>
                <hr color="#ebeef5" />
                <div style="text-align: center; font-size: 28px">00:00</div>
              </div>
            </el-card>
            <el-card
              class="right-bottom-box"
              style="height: 140px; width: 340px; margin-left: 60px"
            >
              <div slot="header">
                <div style="text-align: center">
                  <strong style="font-size: 28px">日最大峰谷差</strong>
                </div>
              </div>
              <div style="text-align: center; font-size: 28px">0.0kW</div>
            </el-card>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <br />
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
import indexdata from "./data.json";
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
  "00:00",
  "01:45",
  "03:30",
  "05:15",
  "07:00",
  "08:45",
  "10:30",
  "12:15",
  "14:00",
  "15:45",
  "17:30",
  "19:15",
  "21:00",
  "22:45",
];
const xdata2 = [
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
  "2019-09",
  "2019-10",
  "2019-11",
  "2019-12",
  "2020-01",
  "2020-02",
  "2020-03",
  "2020-04",
  "2020-05",
  "2020-06",
  "2020-07",
  "2020-08",
];
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  name: "xnyfdjc",
  data() {
    return {
      userName: indexdata.treedata[0].name,
      userData: indexdata.userData[0],
      backgroundDiv1: {
        backgroundImage: "url(" + require("./img/1.png") + ")",
        width: 100 + "px",
      },
      backgroundDiv2: {
        backgroundImage: "url(" + require("./img/2.png") + ")",
        width: 100 + "px",
      },
      backgroundDiv3: {
        backgroundImage: "url(" + require("./img/3.png") + ")",
        width: 100 + "px",
      },
      backgroundDiv4: {
        backgroundImage: "url(" + require("./img/4.png") + ")",
        width: 100 + "px",
      },
      windLoad: [100, 105, 100, 125],
      lightLoad: [100, 105, 115, 20],
      cityLoad: [400, 540, 600, 450],
      storeLoad: [100, 115, 105, 50],
      lightData: [
        10,
        20,
        30,
        25,
        45,
        60,
        35,
        52,
        55,
        25,
        65,
        55,
        64,
        42,
        65,
        45,
        60,
        35,
        25,
        65,
        55,
        65,
        45,
        63,
        60,
        62,
        53,
        51,
        40,
      ],
      windData: [
        10,
        20,
        30,
        65,
        45,
        60,
        25,
        52,
        35,
        25,
        65,
        55,
        64,
        42,
        65,
        45,
        60,
        35,
        25,
        35,
        55,
        35,
        45,
        33,
        60,
        62,
        23,
        61,
        40,
      ],

      showLeftTree: false,
      defaultshowLeftTree: false,
      name: "海水淡化厂",

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
      var myChart5 = echarts.init(document.getElementById("main5"));

      // 绘制图表
      myChart1.setOption({
        title: {
          text: "年度峰谷差",
          left: "30%",
          fontFamily: "Times New Roman",
        },
        tooltip: {},
        color: ["#6495ED", "#FF8C00"],
        legend: {
          orient: "vertical",
          data: ["最大负荷", "最小负荷", "日最大峰谷差"],
          icon: "line",
          right: "25%",
        },
        xAxis: {
          name: "日期",
          axisLine: { show: false },
          axisTick: {
            show: false,
          },
          type: "category",
          data: xdata,
        },
        yAxis: [
          {
            name: "负荷/kW",
            type: "value",
            position: "left",
            min: 0,

            axisTick: {
              show: true,
            },
            axisLine: { show: true },
            axisLabel: {
              formatter: "{value}kW ",
            },
          },
        ],
        tooltip: { show: "true", trigger: "axis" },
        grid: {
          left: "3%",
          right: "25%",
          bottom: "16%", // 这几个属性可以控制图表上下左右的空白尺寸，可以自己试试。
          containLabel: true,
        },
        series: [
          {
            name: "最大负荷",
            type: "line",
            yAxisIndex: 0,
            symbol: "circle",
            symbolSize: 12,
            lineStyle: {
              normal: {
                color: "#6495ED",
                width: "2",
              },
            },
            data: [0],
          },
          {
            name: "最小负荷",
            type: "line",
            yAxisIndex: 0,
            symbol: "circle",
            symbolSize: 12,
            lineStyle: {
              normal: {
                color: "#6495ED",
                width: "2",
              },
            },
            data: [0],
          },
          {
            name: "日最大峰谷差",
            type: "line",
            yAxisIndex: 0,
            symbol: "circle",
            symbolSize: 12,
            lineStyle: {
              normal: {
                color: "#6495ED",
                width: "2",
              },
            },
            data: [0],
          },
        ],
      }),
        myChart2.setOption({
          title: {
            left: "30%",
            fontFamily: "Times New Roman",
          },
          tooltip: {},
          color: ["#6495ED", "#FF8C00"],
          legend: {
            orient: "vertical",
            data: [
              { name: "热负荷", icon: "circle" },
              { name: "纯电负荷", icon: "triangle" },
            ],
            right: "25%",
          },
          xAxis: {
            axisLine: { show: true },
            axisTick: {
              show: true,
              alignWithLabel: true,
              interval: 5,
            },
            axisLabel: {
              interval: 5,
            },

            type: "category",
            data: xdata2,
          },
          yAxis: [
            {
              name: "P/kW",
              type: "value",
              position: "left",
              min: 0,
              max: 160,
              interval: 20,
              axisTick: {
                show: true,
              },
              axisLine: { show: true },
              axisLabel: {
                formatter: "{value} ",
              },
            },
          ],
          tooltip: { show: "true", trigger: "axis" },
          grid: {
            left: "3%",
            right: "25%",
            bottom: "16%", // 这几个属性可以控制图表上下左右的空白尺寸，可以自己试试。
            containLabel: true,
          },
          series: [
            {
              name: "热负荷",
              type: "line",
              smooth: true,
              yAxisIndex: 0,
              symbol: "circle",
              symbolSize: 12,
              lineStyle: {
                normal: {
                  color: "#6495ED",
                  width: "2",
                },
              },
              data: [
                57,
                51,
                59,
                57,
                53,
                52,
                59,
                53,
                54,
                54,
                58,
                59,
                52,
                57,
                57,
                53,
                52,
                58,
                50,
                55,
                53,
                56,
                59,
                55,
                54,
              ],
            },
            {
              name: "纯电负荷",
              type: "line",
              smooth: true,
              yAxisIndex: 0,
              symbol: "triangle",
              symbolSize: 12,
              lineStyle: {
                normal: {
                  color: "#FF8C00",
                  width: "2",
                },
              },
              data: [
                40,
                40,
                42,
                40,
                41,
                43,
                48,
                53,
                80,
                100,
                110,
                85,
                87,
                103,
                118,
                119,
                115,
                100,
                80,
                73,
                68,
                62,
                59,
                50,
                45,
                40,
              ],
            },
          ],
        }),
        myChart5.setOption({
          title: {
            text: "",
            left: "45%",
            fontFamily: "Times New Roman",
          },
          tooltip: {
            axisPointer: { type: "line" },
          },
          legend: {
            data: [],
            icon: "line",
            right: "25%",
          },
          xAxis: {
            name: "时间(H)",
            axisLine: { show: true },
            axisTick: {
              show: false,
            },
            type: "category",
            data: xdata1,
          },
          yAxis: [
            {
              name: "负荷KW",
              type: "value",
              position: "left",
              min: 0,
              show: true,
              axisLine: { show: true },

              axisTick: {
                show: false,
              },

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
  height: 110px;
  width: 110px;
  background: no-repeat center top;
  background-size: contain;
  text-align: center;
  margin-right: 20px;
}
.icon_title {
  line-height: 100px;
  font-size: 20px;
}
.icon_num {
  font-size: 20px;
  margin-top: -35px;
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
</style>
<style scoped>
.EnergyUseStatistics >>> .el-card__header {
  padding: 8px 8px;
}
.EnergyUseStatistics >>> .el-card__body {
  padding: 0 8px;
}
.rightbox >>> .el-card__body {
  padding: 20px 20px;
}
.right-bottom-box >>> .el-card__header {
  padding: 8px 8px;
}
#echarts4 {
  margin-left: -20px;
  margin-top: -12px;
}
.date {
  position: relative;
  right: 0px;
  text-align: right;
}
</style>
