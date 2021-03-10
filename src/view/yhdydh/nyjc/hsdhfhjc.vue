<template>
  <div class="archiveManage-body">
    <div><h1 class="title">天津大港新泉海水淡化厂</h1></div>
    <DatePicker class="datePicker"></DatePicker>

    <el-row :gutter="12">
      <el-col :span="12">
        <el-card shadow="hover">
          <div class="typeTitle">{{ name }}|||一次接线图</div>
          <div class="pic" style="width: 750px; height: 350px"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <div class="typeTitle">{{ name }}|||数据展示</div>
          <div
            style="display: flex; flex-wrap: wrap; width: 100%; height: 350px"
          >
            <el-card
              style="
                height: 160px;
                width: 270px;
                margin-top: 10px;
                margin-right: 12px;
                margin-bottom: 5px;
              "
            >
              <div slot="header">
                <span style="font-size: 30px">实时电压监测</span>
              </div>
              <div style="font-size: 30px">100V</div>
            </el-card>
            <el-card
              style="
                height: 160px;
                width: 270px;
                margin-top: 10px;
                margin-right: 12px;
                margin-bottom: 5px;
              "
            >
              <div slot="header">
                <span style="font-size: 30px">最大负荷</span>
              </div>
              <div style="font-size: 30px">80</div>
            </el-card>
            <el-card
              style="
                height: 160px;
                width: 270px;
                margin-right: 12px;
                margin-bottom: 5px;
              "
            >
              <div slot="header">
                <span style="font-size: 30px">用电量监测</span>
              </div>
              <div style="font-size: 30px">80</div>
            </el-card>
            <el-card
              style="
                height: 160px;
                width: 270px;
                margin-right: 12px;
                margin-bottom: 5px;
              "
            >
              <div slot="header">
                <span style="font-size: 30px">峰谷比</span>
              </div>
              <div style="font-size: 30px">80</div>
            </el-card>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <br />
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="hover">
          <div class="typeTitle">{{ name }}|||实时负荷监测</div>
          <div id="main2" style="width: 1500x; height: 350px"></div>
        </el-card>
      </el-col>
    </el-row>
    <br />
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="hover">
          <div class="typeTitle">{{ name }}|||用能来源</div>
          <div id="main5" style="width: 1500px; height: 350px"></div>
        </el-card>
      </el-col>
    </el-row>
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
  "0:00",
  "1:10",
  "2:20",
  "3:30",
  "4:40",
  "5:50",
  "7:00",
  "8:10",
  "9:20",
  "10:30",
  "11:40",
  "12:50",
  "14:00",
  "15:10",
  "16:20",
  "17:30",
  "18:40",
  "19:50",
  "21:00",
  "22:10",
  "23:20",
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
  20000,
  20050,
  19991,
  20050,
  19991,
  19981,
  15000,
  16020,
  16060,
  0,
  15000,
  15000,
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
  "1:10",
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
//last echarts
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
  name: "hsdhfhjc",
  data() {
    return {
      showLeftTree: false,
      defaultshowLeftTree: false,
      name: "海水淡化厂",
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

      var myChart2 = echarts.init(document.getElementById("main2"));
      var myChart5 = echarts.init(document.getElementById("main5"));
      // 绘制图表

      myChart2.setOption({
        title: {
          text: "",
          left: "45%",
        },
        xAxis: {
          type: "category",
          axisTick: {
            show: false,
          },
          data: gfycxdata1,
        },
        yAxis: {
          name: "单位/Kw",
          type: "value",
          min: "0",
          max: "25000",
          axisTick: {
            show: false,
          },
        },
        dataZoom: [
          {
            show: true,
            type: "slider",
            realtime: true,
            height: "6%",
            bottom: "6%",
          },
        ],
        series: [
          {
            data: gfycdata1,
            type: "line",
            symbol: "none",
            smooth: true,
            lineStyle: {
              normal: {
                color: "#6495ED",
                width: "2",
              },
            },
          },
        ],
      });

      myChart5.setOption({
        title: {
          text: "",
          left: "45%",
          fontFamily: "Times New Roman",
        },
        tooltip: {},
        color: ["#6495ED", "#FF8C00", "#2f4554"],
        legend: {
          data: ["市电", "风力", "光伏"],
          icon: "bar",
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
        dataZoom: [
          {
            show: true,
            type: "slider",
            realtime: true,
            height: "6%",
            bottom: "6%",
          },
        ],
        grid: {
          left: "3%",
          right: "23%",
          bottom: "16%", // 这几个属性可以控制图表上下左右的空白尺寸，可以自己试试。
          containLabel: true,
        },
        series: [
          {
            name: "市电",
            type: "bar",
            yAxisIndex: 0,
            symbol: "circle",
            lineStyle: {
              normal: {
                color: "#6495ED",
                width: "1",
              },
            },
            data: [
              10,
              20,
              30,
              25,
              45,
              60,
              35,
              52,
              65,
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
              85,
              65,
              45,
              63,
              55,
              40,
              41,
              42,
              23,
            ],
          },
          {
            name: "风力",
            type: "bar",
            yAxisIndex: 0,
            symbol: "circle",
            lineStyle: {
              normal: {
                color: "#FF8C00",
                width: "1",
              },
            },
            data: [
              20,
              20,
              56,
              45,
              24,
              65,
              45,
              35,
              45,
              63,
              45,
              55,
              65,
              45,
              68,
              68,
              46,
              68,
              45,
              57,
              75,
              68,
              22,
              64,
              65,
              66,
              67,
              68,
              69,
            ],
          },
          {
            name: "光伏",
            type: "bar",
            yAxisIndex: 0,
            symbol: "circle",
            lineStyle: {
              normal: {
                color: "#2f4554",
                width: "1",
              },
            },
            data: [
              20,
              20,
              56,
              45,
              24,
              65,
              45,
              35,
              45,
              63,
              45,
              55,
              65,
              45,
              48,
              68,
              46,
              38,
              45,
              57,
              75,
              68,
              22,
              64,
              64,
              68,
              70,
              30,
              32,
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
.title {
  text-align: center;
}
.datePicker {
  position: absolute;
  right: 50px;
  top: 0;
}
.pic {
  background: url(./img/5.png) no-repeat;
  background-size: 75% 100%;
}
</style>
