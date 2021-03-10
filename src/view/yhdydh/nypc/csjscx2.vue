<template>
  <div>
    <el-row justify="start">
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
    </el-row>

    <table>
      <tr>
        <table>
          <td>
            <div
              class="shadow myborder"
              id="charts1"
              style="width:800px;height:400px;}"
            ></div>
          </td>
          <td>
            <div
              class="shadow myborder"
              id="charts3"
              style="width:800px;height:400px;}"
            ></div>
          </td>
        </table>
      </tr>
      <tr>
        <td width="1500px">
          <div
            class="myborder shadow"
            id="charts2"
            style="width:800px;height:400px;}"
          ></div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
var a1 = [
  296,
  272,
  279,
  295,
  364,
  452,
  425,
  458,
  389,
  407,
  454,
  452,
  362,
  257,
  403,
  408,
  213,
  225,
  295,
  382,
  307,
  209,
  294,
  244,
];
var a2 = [
  119,
  106,
  118,
  81,
  95,
  86,
  111,
  112,
  92,
  104,
  94,
  104,
  81,
  83,
  111,
  86,
  118,
  101,
  86,
  117,
  109,
  108,
  95,
  103,
];
var a3 = [
  0.85,
  0.78,
  0.94,
  0.85,
  0.96,
  0.8,
  0.97,
  0.75,
  0.72,
  0.93,
  0.99,
  0.92,
  0.72,
  0.97,
  0.95,
  0.74,
  0.93,
  0.96,
  0.93,
  0.88,
  0.82,
  0.8,
  0.79,
  0.77,
];
var a4 = [
  193,
  258,
  287,
  330,
  170,
  283,
  127,
  251,
  211,
  239,
  343,
  160,
  224,
  332,
  256,
  247,
  278,
  173,
  313,
  217,
  330,
  226,
  248,
  165,
];
var echarts = require("echarts");
export default {
  name: "jscx2",
  mounted() {
    var myChart1 = echarts.init(document.getElementById("charts1"), "light");
    var myChart2 = echarts.init(document.getElementById("charts2"), "light");
    var myChart3 = echarts.init(document.getElementById("charts3"), "light");
    myChart1.setOption({
				title: {
					text: '双向堆叠图'
				},
				tooltip: {
					trigger: 'axis',
					
				},
				legend: {
					//位置需要与color对应，方可得到相应颜色
					data: ['上行', '下行','品类2','风力发电','分布式','折线']
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					data: ['周一', '周二', '周三', '周四', '周五', '周二', '周三', '周四', '周六', '周日', '周五', '周六', '周日']
				}],
				yAxis: [{
					name: 'p/kw',
		            nameLocation: 'middle',
		            nameTextStyle: {
		                padding: 20
		            },
					type: 'value',
					axisLabel: {
						formatter: function(v) {
							return v > 0 ? v : -v;
						}
					}
				}],
				series: [{
					name: '下行',
					type: 'bar',
					stack: '总量',
					data: [-180, -262, -201, -154, -110, -230, -110, -262, -230, -110, -262, -201, -154]
				}, {
					name: '品类2',
					type: 'bar',
					stack: '总量',
					data: [-320, -332, -301, -334, -390, -330, -320, -262, -201, -154, -154, -110, -230]
				},{
					name: '分布式',
					type: 'bar',
					stack: '总量',
					data: [0, 0, 0, 0, 0, 170, 90, 280, 150, 0, 0, 0, 0]
				},{
					name: '风力发电',
					type: 'bar',
					stack: '总量',
					data: [100, 150, 230, 90, 240, 70, 90, 80, 100, 110, 127, 254, 130]
				},{
					name: '上行',
					type: 'bar',
					stack: '总量',
					data: [150, 232, 201, 154, 190, 330, 410, 190, 330, 410, 201, 154, 270]
				},{
					name:'折线',
					type: 'line',
					data: [100, 200, 150, 100, 120, 230, 350, 150, 100, 120, 230, 350, 100]
					
				}, ]
			});
    myChart2.setOption({
      title: {
        text: "储能系统能效水平",
        subtext: "储能出力占比",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        left: "left",
        data: ["储能", "电源"],
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: "55%",
          center: ["50%", "60%"],
          data: [
            {
              value: 335,
              name: "储能",
              itemStyle: {
                color: "#5b9bd5",
              },
            },
            {
              value: 1548,
              name: "电源",
              itemStyle: {
                color: "#ed7d31",
              },
            },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    });
    myChart3.setOption({
      title: {
        x: "center",
        text: "工业用户：储能情况",
      },
      tooltip: {
        trigger: "axis",
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
        name: "储能（kWh）",
        type: "value",
        max: 1000,
        min: 0,
        splitNumber: 10,
        axisLine: { show: false },
        axisTick: { show: false },
      },

      series: {
        name: "储能",

        data: a4,

        type: "line",
        symbol: "circle",
      },
    });
  },
};
</script>

<style scoped>
.myborder {
  border: 1px solid #ccc;
  border-radius: 15px;
}

.shadow:hover {
  -webkit-box-shadow: #ccc 0px 4px 4px;
  -moz-box-shadow: #ccc 0px 4px 4px;
  box-shadow: #ccc 0px 4px 4px;
}
.topdate {
  float: right;
  padding-top: 10px;
}
</style>
