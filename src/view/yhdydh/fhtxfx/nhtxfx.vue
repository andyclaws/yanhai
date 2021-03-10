<template>
  <div class="archiveManage-body">
    <div class="date">
      <span style="font-size: 18px; margin-right: 10px">选择日期</span>
      <Date-picker style="margin-bottom: 8px; margin-right: 50px"></Date-picker>
    </div>
    <el-row :gutter="12">
      <el-col :span="14">
        <el-card shadow="hover">
          <div id="main5" style="width: 875px; height: 450px"></div>
        </el-card>
      </el-col>
      <el-col :span="10">
        <el-card class="rightbox" shadow="hover">
          <div
            style="display: flex; flex-wrap: wrap; width: 100%; height: 474px"
          >
            <el-card
              class="EnergyUseStatistics"
              style="height: 260px; width: 540px; margin-bottom: 5px"
            >
              <div slot="header">
                <span><strong>用能统计</strong></span>
              </div>
              <div>
                <table>
                  <tr>
                    <td class="middle">
                      <div class="middle" :style="backgroundDiv1">
                        <div class="icon_title">市电</div>
                        <div class="icon_num">（kWh）</div>
                      </div>
                    </td>
                    <td>
                      <div id="tj1" style="font-size: 18px">
                        同比：{{ userData.sd_tongbi }}<br />
                        环比：{{ userData.sd_huanbi }}<br />
                        总量：{{ userData.sd_zongliang }}
                      </div>
                    </td>
                    <td class="middle">
                      <div class="middle" :style="backgroundDiv2">
                        <div class="icon_title">光伏</div>
                        <div class="icon_num">（kWh）</div>
                      </div>
                    </td>
                    <td>
                      <div id="tj2" style="font-size: 18px">
                        同比：{{ userData.gf_tongbi }}<br />
                        环比：{{ userData.gf_huanbi }}<br />
                        总量：{{ userData.gf_zongliang }}
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="middle">
                      <div class="middle" :style="backgroundDiv3">
                        <div class="icon_title">储能</div>
                        <div class="icon_num">（kWh）</div>
                      </div>
                    </td>
                    <td>
                      <div id="tj3" style="font-size: 18px">
                        同比：{{ userData.cn_tongbi }}<br />
                        环比：{{ userData.cn_huanbi }}<br />
                        总量：{{ userData.cn_zongliang }}
                      </div>
                    </td>
                    <td class="middle">
                      <div class="middle" :style="backgroundDiv4">
                        <div class="icon_title">风电</div>
                        <div class="icon_num">（kWh）</div>
                      </div>
                    </td>
                    <td>
                      <div id="tj4" style="font-size: 18px">
                        同比：{{ userData.fd_tongbi }}<br />
                        环比：{{ userData.fd_huanbi }}<br />
                        总量：{{ userData.fd_zongliang }}
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </el-card>
            <el-card
              class="right-bottom-box"
              style="height: 210px; width: 540px"
            >
              <div slot="header">
                <span><strong>用能占比</strong></span>
              </div>
              <div id="echarts4" style="width: 500px; height: 200px"></div>
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
const xdata1 = ["12:15", "14:15", "16:15", "18:15"];
const xdata = [
  "0:00",
  "0:50",
  "1:40",
  "2:30",
  "3:20",
  "4:10",
  "5:00",
  "5:50",
  "6:40",
  "7:30",
  "8:20",
  "9:10",
  "10:00",
  "10:50",
  "11:40",
  "12:30",
  "13:20",
  "14:10",
  "15:00",
  "15:50",
  "16:40",
  "17:30",
  "18:20",
  "19:10",
  "20:00",
  "20:50",
  "21:40",
  "22:30",
  "23:20",
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
      var myChart5 = echarts.init(document.getElementById("main5"));
      var myChart4 = echarts.init(document.getElementById("echarts4"));
      myChart4.setOption({
        legend: {
          top: "32%",
          right: "10%",
          data: ["储能", "市电", "", "风电", "光伏"],
        },
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} ({d}%)",
        },
        series: [
          {
            name: "用能占比",
            type: "pie",
            radius: "65%",
            center: ["40%", "50%"],
            data: [
              { value: 5, name: "储能" },
              { value: 70, name: "市电" },
              { value: 10, name: "风电" },
              { value: 15, name: "光伏" },
            ],
          },
        ],
      });
      // 绘制图表
      myChart1.setOption({
        title: {
          text: "新能源消纳量",
          left: "30%",
          fontFamily: "Times New Roman",
        },
        tooltip: {},
        color: ["#6495ED", "#FF8C00"],
        legend: {
          orient: "vertical",
          data: ["分布式电源"],
          icon: "line",
          right: "25%",
        },
        xAxis: {
          axisLine: { show: false },
          axisTick: {
            show: false,
          },
          type: "category",
          data: xdata,
        },
        yAxis: [
          {
            name: "单位/Kw",
            type: "value",
            position: "left",
            min: 0,

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
            name: "分布式电源",
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
            data: this.lightData,
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
            data: ["总负荷", "光伏负荷", "风电负荷", "市电负荷", "储能负荷"],
            icon: "line",
            right: "25%",
          },
          xAxis: {
            axisLine: { show: false },
            axisTick: {
              show: false,
            },
            type: "category",
            data: xdata1,
          },
          yAxis: [
            {
              type: "value",
              position: "left",
              min: 0,

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
              name: "光伏负荷",
              type: "line",
              yAxisIndex: 0,
              symbol: "circle",
              lineStyle: {
                normal: {
                  width: "2",
                },
              },
              data: this.lightLoad,
            },
            {
              name: "风电负荷",
              type: "line",
              yAxisIndex: 0,
              symbol: "circle",
              lineStyle: {
                normal: {
                  width: "2",
                },
              },
              data: this.windLoad,
            },
            {
              name: "市电负荷",
              type: "line",
              yAxisIndex: 0,
              symbol: "circle",
              lineStyle: {
                normal: {
                  width: "2",
                },
              },
              data: this.cityLoad,
            },
            {
              name: "储能负荷",
              type: "line",
              yAxisIndex: 0,
              symbol: "circle",
              lineStyle: {
                normal: {
                  width: "2",
                },
              },
              data: this.storeLoad,
            },
            {
              name: "总负荷",
              type: "line",
              yAxisIndex: 0,
              symbol: "circle",
              lineStyle: {
                normal: {
                  width: "2",
                },
              },
              data: [
                this.lightLoad[0] +
                  this.cityLoad[0] +
                  this.windLoad[0] +
                  this.storeLoad[0],
                this.lightLoad[1] +
                  this.cityLoad[1] +
                  this.windLoad[1] +
                  this.storeLoad[1],
                this.lightLoad[2] +
                  this.cityLoad[2] +
                  this.windLoad[2] +
                  this.storeLoad[2],
                this.lightLoad[3] +
                  this.cityLoad[3] +
                  this.windLoad[3] +
                  this.storeLoad[3],
              ],
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
  padding: 8px 8px;
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
