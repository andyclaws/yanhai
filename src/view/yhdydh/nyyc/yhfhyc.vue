<template>
  <div class="archiveManage-body">
    <div class="show-tree-btn" @click.stop="showTree">
      <Icon type="ios-arrow-forward" v-if="!showLeftTree" />
      <Icon type="ios-arrow-back" v-else />
    </div>
    <div
      class="left-tree"
      :class="showLeftTree ? 'show-tree' : 'hide-tree'"
      v-if="defaultshowLeftTree"
    >
      <Card>
        <div slot="title">
          <div>
            <span>选择用户</span>
          </div>
        </div>

        <div class="tree-box">
          <el-tree
            :data="treeData"
            :props="treeProps"
            node-key="id"
            :default-expanded-keys="[1]"
          ></el-tree>
          <!--          <Tree-->
          <!--            ref="tree"-->
          <!--            :data="treeData"-->
          <!--            :render="renderContent"-->
          <!--            @on-select-change="selectChangeNode"-->
          <!--          ></Tree>-->
          <!-- <div v-for="item in treeData" style="margin-bottom: 20px">
            <a class="leftButton" @click="changeData(item.index)">{{
              item.name
            }}</a>
          </div> -->
        </div>
      </Card>
    </div>
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
  0,
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
  25,
  26,
  27,
  28,
  29,
  30,
];
const xdata = ["4月", "5月", "6月"];
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  name: "yhfhyc",
  data() {
    return {
      ARIMA: [2.2, 2.2, 6.3],
      XCB: [2, 0.9, 6.2],
      IUMCXCB: [1.9, 1.7, 6.9],
      RF: [2.1, 2.1, 5.4],
      IUMCRF: [2.2, 1.3, 3.9],
      LGB: [2.3, 1.4, 3],
      IUMCLGB: [2.2, 1.3, 4.1],
      IUMCLightGBM: [
        3476,
        3030,
        3772,
        3144,
        3854,
        3304,
        3999,
        3379,
        3636,
        3168,
        3737,
        3764,
        3113,
        3079,
        3742,
        3294,
        3991,
        3533,
        3291,
        3208,
        3010,
        3047,
        3243,
        3482,
        3125,
        3629,
        3523,
        3676,
        3021,
        3730,
        3509,
      ],
      trueData: [
        3975,
        3113,
        3508,
        3423,
        3435,
        3598,
        3091,
        3821,
        3874,
        3500,
        3399,
        3789,
        3690,
        3709,
        3302,
        3649,
        3503,
        3685,
        3918,
        3784,
        3432,
        3299,
        3703,
        3233,
        3564,
        3507,
        3704,
        3694,
        3196,
        3410,
        3515,
      ],
      lightGBM: [
        3568,
        3541,
        3291,
        3026,
        3443,
        3260,
        3268,
        3035,
        3566,
        3188,
        3934,
        3734,
        3551,
        3411,
        3285,
        3207,
        3155,
        3421,
        3442,
        3152,
        3623,
        3320,
        3109,
        3463,
        3443,
        3034,
        3075,
        3427,
        3451,
        3085,
        3162,
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
          text: "工业用户短期负荷预测时间点",
          left: "30%",
          fontFamily: "Times New Roman",
        },
        tooltip: {},
        color: ["#6495ED", "#FF8C00", "#23a668"],
        legend: {
          orient: "vertical",
          data: ["True data", "lightGBM", "IUMC-LightGBM"],
          icon: "line",
          right: "25%",
        },
        xAxis: {
          axisLine: { show: false },
          axisTick: {
            show: false,
          },
          axisLabel: { interval: 4 },
          type: "category",
          data: xdata1,
        },
        yAxis: [
          {
            name: "P/MW",
            type: "value",
            position: "left",
            min: 3000,
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
            name: "True data",
            type: "line",
            yAxisIndex: 0,
            symbol: "circle",
            symbolSize: 10,
            lineStyle: {
              normal: {
                color: "#23a668",
                width: "2",
              },
            },
            data: this.trueData,
          },
          {
            name: "lightGBM",
            type: "line",
            yAxisIndex: 0,
            symbol: "triangle",
            symbolSize: 10,
            lineStyle: {
              normal: {
                color: "#FF8C00",
                width: "2",
              },
            },
            data: this.lightGBM,
          },
          {
            name: "IUMC-LightGBM",
            type: "line",
            yAxisIndex: 0,
            symbol: "rect",
            symbolSize: 10,
            lineStyle: {
              normal: {
                color: "#6495ED",
                width: "2",
              },
            },
            data: this.IUMCLightGBM,
          },
        ],
      }),
        myChart2.setOption({
          title: {
            text: "工业用户短期负荷预测时间点",
            left: "30%",
            fontFamily: "Times New Roman",
          },
          tooltip: {},
          legend: {
            orient: "vertical",
            data: ["ARIMA", "XCB", "IUMCXCB", "RF", "IUMCRF", "LGB", "IUMCLGB"],
            icon: "bar",
            left: "8%",
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
              name: "MAPE%",
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
              name: "ARIMA",
              type: "line",
              yAxisIndex: 0,
              symbol: "circle",
              barGap: 0,
              lineStyle: {
                normal: {
                  width: "2",
                },
              },
              data: this.ARIMA,
            },
            {
              name: "XCB",
              type: "line",
              yAxisIndex: 0,
              symbol: "circle",
              lineStyle: {
                normal: {
                  width: "2",
                },
              },
              data: this.XCB,
            },
            {
              name: "IUMCXCB",
              type: "line",
              yAxisIndex: 0,
              symbol: "circle",
              lineStyle: {
                normal: {
                  width: "2",
                },
              },
              data: this.IUMCXCB,
            },
            {
              name: "RF",
              type: "line",
              yAxisIndex: 0,
              symbol: "circle",
              lineStyle: {
                normal: {
                  width: "2",
                },
              },
              data: this.RF,
            },
            {
              name: "IUMCRF",
              type: "line",
              yAxisIndex: 0,
              symbol: "circle",
              lineStyle: {
                normal: {
                  width: "2",
                },
              },
              data: this.IUMCRF,
            },
            {
              name: "LGB",
              type: "line",
              yAxisIndex: 0,
              symbol: "circle",
              lineStyle: {
                normal: {
                  width: "2",
                },
              },
              data: this.LGB,
            },
            {
              name: "IUMCLGB",
              type: "line",
              yAxisIndex: 0,
              symbol: "circle",
              lineStyle: {
                normal: {
                  width: "2",
                },
              },
              data: this.IUMCLGB,
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
