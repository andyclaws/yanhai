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
      <el-col :span="18">
        <el-card shadow="hover">
          <div class="typeTitle">用户负荷监测</div>
          <div id="main5" style="width: 1125px; height: 350px"></div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="hover">
          <div
            style="display: flex; flex-wrap: wrap; width: 100%; height: 350px"
          >
            <el-card
              style="
                height: 160px;
                width: 540px;
                margin-top: 10px;
                margin-right: 12px;
                margin-bottom: 5px;
              "
            >
              <div slot="header">
                <span style="font-size: 30px">今日最大负荷</span>
              </div>
              <div style="font-size: 30px">100kW</div>
            </el-card>
            <el-card
              style="
                height: 160px;
                width: 540px;
                margin-top: 10px;
                margin-right: 12px;
                margin-bottom: 5px;
              "
            >
              <div slot="header">
                <span style="font-size: 30px">历史最大负荷</span>
              </div>
              <div style="font-size: 30px">80kW</div>
            </el-card>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <br />
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="hover">
          <div slot="header">
            <h1>实时监测</h1>
          </div>
          <el-table :data="devicePower" style="width: 100%" max-height="500">
            <el-table-column label="设备名称" width="190">
              <template slot-scope="scope">
                <a @click="changeDevice(scope.$index)">{{
                  scope.row.deviceName
                }}</a>
              </template>
            </el-table-column>
            <el-table-column label="三相电压(V)">
              <el-table-column prop="Ua" label="Ua" width="100">
              </el-table-column>
              <el-table-column prop="Ub" label="Ub" width="100">
              </el-table-column>
              <el-table-column prop="Uc" label="Uc" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column label="三相电压(A)">
              <el-table-column prop="Ia" label="Ia" width="100">
              </el-table-column>
              <el-table-column prop="Ib" label="Ib" width="100">
              </el-table-column>
              <el-table-column prop="Ic" label="Ic" width="100">
              </el-table-column>
            </el-table-column>
            <el-table-column label="三相有功功率(kW)">
              <el-table-column prop="Pa" label="Pa" width="100">
              </el-table-column>
              <el-table-column prop="Pb" label="Pb" width="100">
              </el-table-column>
              <el-table-column prop="Pc" label="Pc" width="100">
              </el-table-column>
              <el-table-column prop="Ptatol" label="Ptatol" width="100">
              </el-table-column>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="12">
      <el-col :span="24">
        <el-card shadow="hover">
          <div
            id="main1"
            style="width: 1500px; height: 350px"
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
  name: "yhfhjc",
  data() {
    return {
      devicePower: [
        {
          deviceName: "atpx6954",
          Ua: 25,
          Ub: 3,
          Uc: 4,
          Ia: 6,
          Ib: 200333,
          Ic: 66,
          Pa: 5,
          Pb: 9,
          Pc: 6,
          Ptatol: 15,
          deviceDetail: [
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
        },
        {
          deviceName: "atpx6964",
          Ua: 25,
          Ub: 5,
          Uc: 5,
          Ia: 1,
          Ib: 200333,
          Ic: 66,
          Pa: 5,
          Pb: 9,
          Pc: 6,
          Ptatol: 15,
          deviceDetail: [
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
            35,
            55,
            35,
            45,
            63,
            60,
            62,
            53,
            51,
            40,
          ],
        },
        {
          deviceName: "atpx6964",
          Ua: 25,
          Ub: 3,
          Uc: 4,
          Ia: 8,
          Ib: 200333,
          Ic: 66,
          Pa: 5,
          Pb: 9,
          Pc: 6,
          Ptatol: 15,
          deviceDetail: [
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
            63,
            60,
            62,
            53,
            51,
            40,
          ],
        },
        {
          deviceName: "atpx6924",
          Ua: 25,
          Ub: 3,
          Uc: 5,
          Ia: 8,
          Ib: 200333,
          Ic: 66,
          Pa: 5,
          Pb: 9,
          Pc: 6,
          Ptatol: 15,
          deviceDetail: [
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
        },
        {
          deviceName: "atpx6929",
          Ua: 25,
          Ub: 5,
          Uc: 1,
          Ia: 8,
          Ib: 200333,
          Ic: 66,
          Pa: 5,
          Pb: 9,
          Pc: 6,
          Ptatol: 15,
          deviceDetail: [
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
            34,
            42,
            65,
            45,
            60,
            45,
            25,
            35,
            25,
            35,
            45,
            63,
            60,
            62,
            53,
            51,
            10,
          ],
        },
        {
          deviceName: "atpx9527",
          Ua: 25,
          Ub: 8,
          Uc: 9,
          Ia: 8,
          Ib: 200333,
          Ic: 66,
          Pa: 5,
          Pb: 9,
          Pc: 6,
          Ptatol: 15,
          deviceDetail: [
            10,
            20,
            30,
            35,
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
            63,
            40,
            62,
            53,
            51,
            40,
          ],
        },
        {
          deviceName: "atpx89757",
          Ua: 25,
          Ub: 5,
          Uc: 8,
          Ia: 8,
          Ib: 200333,
          Ic: 66,
          Pa: 5,
          Pb: 9,
          Pc: 6,
          Ptatol: 15,
          deviceDetail: [
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
            15,
            25,
            35,
            55,
            35,
            45,
            63,
            50,
            62,
            53,
            51,
            70,
          ],
        },
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
    changeDevice(index) {
      console.log(index);
      var myChart1 = echarts.init(document.getElementById("main1"));
      // 绘制图表
      myChart1.setOption({
        title: {
          text: this.devicePower[index].deviceName,
          left: "30%",
          fontFamily: "Times New Roman",
        },
        tooltip: {},
        color: ["#6495ED"],
        legend: {
          orient: "vertical",
          data: [this.devicePower[index].deviceName],
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
            name: this.devicePower[index].deviceName,
            type: "line",
            yAxisIndex: 0,
            symbol: "circle",
            lineStyle: {
              normal: {
                color: "#6495ED",
                width: "2",
              },
            },
            data: this.devicePower[index].deviceDetail,
          },
        ],
      });
    },
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
      // 绘制图表
      myChart1.setOption({
        title: {
          text: this.devicePower[0].deviceName,
          left: "30%",
          fontFamily: "Times New Roman",
        },
        tooltip: {},
        color: ["#6495ED"],
        legend: {
          orient: "vertical",
          data: [this.devicePower[0].deviceName],
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
            name: this.devicePower[0].deviceName,
            type: "line",
            yAxisIndex: 0,
            symbol: "circle",
            lineStyle: {
              normal: {
                color: "#6495ED",
                width: "2",
              },
            },
            data: this.devicePower[0].deviceDetail,
          },
        ],
      }),
        myChart5.setOption({
          title: {
            text: "",
            left: "45%",
            fontFamily: "Times New Roman",
          },
          tooltip: {},
          color: ["#6495ED", "#FF8C00", "#1aa15f"],
          legend: {
            orient: "vertical",
            data: ["海水淡化", "工业", "居民"],
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
            right: "25%",
            bottom: "16%", // 这几个属性可以控制图表上下左右的空白尺寸，可以自己试试。
            containLabel: true,
          },
          series: [
            {
              name: "海水淡化",
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
                600,
                620,
                530,
                510,
                400,
              ],
            },
            {
              name: "工业",
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
                630,
                600,
                620,
                530,
                510,
                400,
              ],
            },
            {
              name: "居民",
              type: "line",
              yAxisIndex: 0,
              symbol: "circle",
              lineStyle: {
                normal: {
                  color: "#1aa15f",
                  width: "2",
                },
              },
              data: [
                100,
                100,
                262,
                152,
                142,
                154,
                256,
                154,
                156,
                231,
                156,
                252,
                153,
                158,
                186,
                284,
                262,
                186,
                157,
                177,
                252,
                184,
                124,
                145,
                157,
                177,
                252,
                184,
                124,
                145,
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
