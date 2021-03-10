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
          <!--          <Tree-->
          <!--            ref="tree"-->
          <!--            :data="treeData"-->
          <!--            :render="renderContent"-->
          <!--            @on-select-change="selectChangeNode"-->
          <!--          ></Tree>-->
          <div v-for="item in treeData" style="margin-bottom: 20px">
            <a class="leftButton" @click="changeData(item.index)">{{
              item.name
            }}</a>
          </div>
        </div>
      </Card>
    </div>

    <div class="info-body">
      <div class="statistical-info">
        <div class="statistical-title">{{ userName }}统计信息</div>
        <div class="choose-user">
          <div class="bottom-chart-title">
            <div>{{ userName }}用能统计</div>
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
                    <div id="tj1" style="font-size: 20px">
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
                    <div id="tj2" style="font-size: 20px">
                      同比：{{ userData.gf_tongbi }}<br />
                      环比：{{ userData.gf_huanbi }}<br />
                      总量：{{ userData.gf_zongliang }}
                    </div>
                  </td>

                  <td class="middle">
                    <div class="middle" :style="backgroundDiv3">
                      <div class="icon_title">储能</div>
                      <div class="icon_num">（kWh）</div>
                    </div>
                  </td>
                  <td>
                    <div id="tj3" style="font-size: 20px">
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
                    <div id="tj4" style="font-size: 20px">
                      同比：{{ userData.fd_tongbi }}<br />
                      环比：{{ userData.fd_huanbi }}<br />
                      总量：{{ userData.fd_zongliang }}
                    </div>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div class="statistical-top">
          <div class="left-box">
            <div class="charts-title">
              <div>{{ userName }}用能占比</div>
              <div
                id="echarts4"
                style="
                  width: 750px;
                  height: 220px;
                  margin-top: 40px;
                  margin-right: -50px;
                "
              ></div>
            </div>
          </div>

          <div class="right-box">
            <div class="right-chart-title">
              <div>{{ userName }}能源消耗</div>
              <div id="echarts" style="width: 750px; height: 220px"></div>
            </div>
          </div>
        </div>
        <div class="statistical-bottom">
          <div class="bottom-left">
            <div class="bottom-chart-title">
              <div class="cardTitle">{{ userName }}负荷曲线</div>
              <div
                id="echarts1"
                style="
                  width: 750px;
                  height: 220px;
                  margin-top: -20px;
                  margin-left: 15px;
                "
              ></div>
            </div>
          </div>
          <div class="bottom-right">
            <div class="bottom-chart-title">
              <div class="cardTitle">{{ userName }}单元能耗排名</div>
              <div
                id="echarts3"
                style="
                  width: 750px;
                  height: 220px;
                  margin-top: -20px;
                  margin-left: 40px;
                "
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import indexdata from "./data.json";

var my1 = [
  831,
  876,
  704,
  743,
  743,
  820,
  788,
  890,
  646,
  728,
  832,
  808,
  781,
  751,
  709,
  695,
  695,
  750,
  804,
  843,
  778,
  718,
  840,
  698,
];
var my2 = [
  65,
  141,
  127,
  141,
  118,
  129,
  87,
  117,
  61,
  60,
  89,
  104,
  122,
  91,
  81,
  107,
  77,
  143,
  61,
  130,
  85,
  100,
  109,
  76,
];
var my3 = [
  101,
  116,
  91,
  95,
  94,
  80,
  96,
  96,
  100,
  108,
  109,
  112,
  92,
  97,
  112,
  105,
  106,
  99,
  116,
  95,
  88,
  115,
  119,
  100,
];
var my4 = [
  597,
  528,
  430,
  414,
  413,
  534,
  513,
  567,
  415,
  485,
  538,
  473,
  482,
  455,
  458,
  432,
  460,
  434,
  524,
  541,
  542,
  415,
  528,
  417,
];
var my5 = [
  86,
  91,
  56,
  93,
  118,
  85,
  92,
  110,
  70,
  75,
  96,
  119,
  95,
  108,
  58,
  51,
  52,
  74,
  103,
  77,
  63,
  88,
  84,
  105,
];
var echarts = require("echarts");
export default {
  name: "nhtxfx",
  data() {
    return {
      userName: indexdata.treedata[0].name,
      userData: indexdata.userData[0],
      showLeftTree: false,
      defaultshowLeftTree: false,
      filterTreeValue: "",
      treeData: indexdata.treedata,
      backgroundDiv1: {
        backgroundImage: "url(" + require("./img/1.png") + ")",
        width: 50 + "px",
      },
      backgroundDiv2: {
        backgroundImage: "url(" + require("./img/2.png") + ")",
        width: 50 + "px",
      },
      backgroundDiv3: {
        backgroundImage: "url(" + require("./img/3.png") + ")",
        width: 50 + "px",
      },
      backgroundDiv4: {
        backgroundImage: "url(" + require("./img/4.png") + ")",
        width: 50 + "px",
      },
    };
  },
  mounted() {
    var myChart1 = echarts.init(document.getElementById("echarts1"));
    var myChart3 = echarts.init(document.getElementById("echarts3"));
    var myChart4 = echarts.init(document.getElementById("echarts4"));
    echarts.init(document.getElementById("echarts")).setOption({
      title: {
        text: "能源消耗",
        x: "center",
        background: "",
      },
      // backgroundColor: "#fff",
      color: ["#800080"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      xAxis: {
        type: "category",
        data: ["市电", "分布式电能", "储能"],
        axisTick: { show: false },
      },
      yAxis: [
        {
          name: "单位/MW",
          min: 0,
          type: "value",
          x: "left",
          axisTick: { show: false },
          axisLine: { show: false },
        },
      ],
      series: [
        {
          name: "",
          type: "bar",
          symbol: "none",
          barWidth: 50,
          data: [7, 2, 1],
        },
      ],
    });
    myChart1.setOption({
      tooltip: {
        trigger: "axis",
      },
      legend: {
        x: "center",
        y: "bottom",
        data: ["总负荷", "光伏负荷", "风电负荷", "市电负荷", "储能负荷"],
      },
      xAxis: {
        type: "category",
        data: [
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
        ],
      },
      yAxis: {
        name: "单位/KW",
        axisTick: { show: false },
        type: "value",
        max: 1000,
        min: 0,
        splitNumber: 10,
        axisLine: { show: false },
      },
      series: [
        {
          name: "总负荷",
          data: my1,
          type: "line",
          symbol: "circle",
        },
        {
          name: "光伏负荷",
          data: my2,
          type: "line",
          symbol: "circle",
        },
        {
          name: "风电负荷",
          data: my3,
          type: "line",
          symbol: "circle",
        },
        {
          name: "市电负荷",
          data: my4,
          type: "line",
          symbol: "circle",
        },
        {
          name: "储能负荷",
          data: my5,
          type: "line",
          symbol: "circle",
        },
      ],
    });
    myChart3.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      xAxis: {
        type: "category",
        data: [
          "4栋",
          "6栋",
          "2栋",
          "8栋",
          "16栋",
          "1栋",
          "3栋",
          "5栋",
          "7栋",
          "9栋",
        ],
      },
      yAxis: {
        name: "单位/KW",
        axisTick: { show: false },
        type: "value",
        max: 90000,
        min: 0,
        splitNumber: 9,
        axisLine: { show: false },
      },
      series: [
        {
          data: [
            80000,
            75000,
            70000,
            65000,
            60000,
            55000,
            50000,
            45000,
            30000,
            20000,
          ],
          type: "bar",
        },
      ],
    });
    myChart4.setOption({
      legend: {
        x: "left",
        y: "50%",
        left: "0%",
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
  },
  methods: {
    showTree() {
      this.showLeftTree = !this.showLeftTree;
      this.defaultshowLeftTree = true;
    },
    changeData(index) {
      this.showLeftTree = !this.showLeftTree;
      this.defaultshowLeftTree = !this.defaultshowLeftTree;
      this.userData = indexdata.userData[index - 1];
      this.userName = indexdata.treedata[index - 1].name;
    },
  },
};
</script>

<style lang="less" scoped>
@import "nyjc.less";
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
.choose-user:hover {
  box-shadow: 2px 2px 5px #666666;
}
.left-box:hover {
  box-shadow: 2px 2px 5px #666666;
}
.right-box:hover {
  box-shadow: 2px 2px 5px #666666;
}
.bottom-left:hover {
  box-shadow: 2px 2px 5px #666666;
}
.bottom-right:hover {
  box-shadow: 2px 2px 5px #666666;
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
</style>
