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
    <el-row :gutter="12">
      <el-col :span="12">
        <el-card shadow="hover">
          <div class="typeTitle">{{ name }}|||光照强度</div>
          <div id="main1" style="width: 750px; height: 350px"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <div class="typeTitle">{{ name }}|||风速</div>
          <div id="main3" style="width: 100%; height: 350px"></div>
        </el-card>
      </el-col>
    </el-row>
    <br />
    <el-row :gutter="12">
      <el-col :span="12">
        <el-card shadow="hover">
          <div class="typeTitle">{{ name }}|||光伏出力</div>
          <div id="main2" style="width: 750px; height: 350px"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <div class="typeTitle">{{ name }}|||风电出力</div>
          <div id="main4" style="width: 750px; height: 350px"></div>
        </el-card>
      </el-col>
    </el-row>
    <br />
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="hover">
          <div class="typeTitle">{{ name }}|||用电预测</div>
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
const xdata = [
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
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  data() {
    return {
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
      var myChart3 = echarts.init(document.getElementById("main3"));
      var myChart4 = echarts.init(document.getElementById("main4"));
      var myChart5 = echarts.init(document.getElementById("main5"));
      // 绘制图表
      myChart1.setOption({
        title: {
          text: "",
          left: "45%",
        },
        xAxis: {
          name: "时间/h",
          type: "category",
          data: gfycxdata,
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          name: "单位/Lx",
          type: "value",
          min: "0",
          max: "60000",
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            data: gfycdata,
            type: "bar",
            showBackground: false,
            barWidth: 10,
            itemStyle: {
              normal: {
                color: "#483D8B",
              },
            },
          },
        ],
      });
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
          max: "900",
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
            lineStyle: {
              normal: {
                color: "#6495ED",
                width: "2",
              },
            },
          },
        ],
      });
      myChart3.setOption({
        title: {
          text: "",
          left: "45%",
        },
        xAxis: {
          name: "时间/h",
          type: "category",
          data: fdycxdata,
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          name: "单位(m/s)",
          type: "value",
          min: 0,
          max: 12,
          axisTick: {
            show: false,
          },
        },
        series: [
          {
            data: fdycdata,
            type: "bar",
            showBackground: false,
            barWidth: 10,
            itemStyle: {
              normal: {
                color: "#483D8B",
              },
            },
          },
        ],
      });
      myChart4.setOption({
        title: {
          text: "",
          left: "45%",
        },
        xAxis: {
          type: "category",
          axisTick: {
            show: false,
          },
          data: fdycxdata1,
        },
        yAxis: {
          name: "单位/Kw",
          type: "value",
          min: "0",
          max: "900",
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
            data: fdycdata1,
            type: "line",
            symbol: "none",
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
        color: ["#6495ED", "#FF8C00"],
        legend: {
          orient: "vertical",
          data: ["负荷基线", "可调潜力"],
          icon: "line",
          right: "20%",
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
            max: 900,
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
          right: "2%",
          bottom: "16%", // 这几个属性可以控制图表上下左右的空白尺寸，可以自己试试。
          containLabel: true,
        },
        series: [
          {
            name: "负荷基线",
            type: "line",
            yAxisIndex: 0,
            symbol: "circle",
            lineStyle: {
              normal: {
                color: "#6495ED",
                width: "2",
              },
            },
            data: [
              100,
              200,
              300,
              250,
              450,
              600,
              354,
              525,
              852,
              252,
              652,
              852,
              642,
              422,
              650,
              450,
              600,
              354,
              252,
              652,
              852,
              650,
              450,
              630,
            ],
          },
          {
            name: "可调潜力",
            type: "line",
            yAxisIndex: 0,
            symbol: "circle",
            lineStyle: {
              normal: {
                color: "#FF8C00",
                width: "2",
              },
            },
            data: [
              200,
              200,
              862,
              452,
              242,
              654,
              456,
              354,
              456,
              631,
              456,
              552,
              653,
              458,
              786,
              684,
              462,
              786,
              457,
              577,
              752,
              684,
              224,
              645,
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
</style>
