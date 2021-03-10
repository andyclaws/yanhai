<template>
  <div>

    <div>
      <el-table
        :data="tableDatatwo"
        :border="true"
        style="width: 80%">
        <el-table-column
          prop="date"
          label="输入"
          width="77px"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="1"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="2"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label=".。。"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="24"
          align="center">
        </el-table-column>
      </el-table>
    </div>

    <table>
      <tr>
        <table>
          <tr>
            <td>
              <div
                class="myborder shadow"
                id="charts1"
                style="width:1200px;height:450px;top:50px;}"
              ></div>
            </td>
          </tr>
        </table>

        <table>
          <tr>
            <td>
              <div
                class="myborder shadow"
                id="charts2"
                style="width:800px;height:450px;top:90px;}"
              ></div>
            </td>

            <td>
              <div
                class="myborder shadow"
                id="charts3"
                style="width:800px;height:450px;top:90px;}"
              ></div>
            </td>
          </tr>
        </table>

        
      </tr>
    </table>
  </div>
</template>

<script>
var echarts = require("echarts");
export default {
  data() {
    return {
      tableData: [
        {
          num: "1",
          name: "aaa",
          save: "18.4692703",
          ner: "15.56447043",
        },
        {
          num: "2",
          name: "bbb",
          save: "17.97715542",
          ner: "14.17189713",
        },
        {
          num: "3",
          name: "ccc",
          save: "18.38437378",
          ner: "17.0934327",
        },
        {
          num: "4",
          name: "ddd",
          save: "10.38765066",
          ner: "13.6048984",
        },
        {
          num: "5",
          name: "eee",
          save: "18.94939277",
          ner: "18.20956862",
        },
        {
          num: "6",
          name: "fff",
          save: "14.36561889",
          ner: "18.3814904",
        },
      ],
      value1: "",
      msg1: "---",
      msg2: "---",
    };
  },
  methods: {
    tableRowClassNameone({row, rowIndex}) {
        if ((rowIndex+1) %2 === 0) {
          return 'warning-row';
        } else if ((rowIndex+1) %2 !== 0) {
          return 'success-row';
        }
        return '';
      },
    select() {
      console.log("ceshi");

      this.msg1 = "综合能耗最小";
      this.msg2 = "供需平衡";
      //this.tableData = [{mb: '综合能耗最小', cj: '供需平衡'}];
    },
  },
  mounted() {
    var myChart1 = echarts.init(document.getElementById('charts1'));
    var myChart2 = echarts.init(document.getElementById("charts2"), "light");
    var myChart3 = echarts.init(document.getElementById('charts3'));

    myChart1.setOption({
          backgroundColor: "#fffcfc",
          title: {
            // text: "血糖达标率统计",
            left: "10px",
            textStyle: {
              color: "#333",
            },
          },
          name: "a",
          tooltip: {
            trigger: "axis", //按x轴显示
            show: true,
            formatter: function (params) {
              var name = params[0].name + "<br>";
              var barName =
                params[2].marker +
                params[2].seriesName +
                ":" +
                params[2].value +
                "%<br>";
              var lineName =
                params[1].marker +
                params[1].seriesName +
                ":" +
                params[1].value +
                "%<br>";
              var santName =
                params[0].marker +
                params[0].seriesName +
                ":" +
                params[0].value +
                "%";
              return name + barName + lineName + santName;
            },
            axisPointer: {
              type: "line",
              lineStyle: {
                width: 50,
                color: "rgba(255,255,255,.3)",
                extraCssText: "z-index: -111", //添加阴影
                symbolSize: 10,
              },
            },
            backgroundColor: "rgba(0,0,0,.5)",
            textStyle: {
              align: "left",
              fontSize: 12,
              color: "#fff",
            },
          },
          color: ["#D26962", "#41CBA6", "#D26FD6", "#4C91E3"],
          grid: {
            left: "5%",
            right: "6%",
            top: "20%",
            bottom: "6%",
            containLabel: true,
          },
          legend: {
            show: true,
            right: 45,
            shadowColor: "rgba(210, 105, 98, 1)",
            shadowBlur: 10,
            itemGap: 63,
            textStyle: {
              fontSize: 12,
              color: ["#D26962", "#41CBA6", "#D26FD6", "#4C91E3"],
            },
            data: ["最低蓄水量", "一", "用水需求", "最大蓄水量"],
          },
          xAxis: {
            show: true,
            type: "category",
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#2A2A2A",
              },
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#E0E0E0",
                type: "dashed",
              },
            },
            axisLabel: {
              rotate: 0,
              textStyle: {
                fontSize: "70%",
                color: "#aaa",
              },
            },
            data: [
              "4-1",
              "4-2",
              "4-3",
              "4-4",
              "4-5",
              "4-6",
              "4-7",
              "4-8",
              "4-9",
              "4-10",
              "4-11",
              "4-12",
              "4-13",
              "4-14",
            ],
          },
          yAxis: {
            
		            nameLocation: 'middle',
		            nameTextStyle: {
		                padding: 20
		            },
            show: true,
            name: "水量（l）",
            type: "value",
            splitNumber: 12,
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#aaa",
              },
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "#E0E0E0",
              },
            },
            axisLabel: {
              textStyle: {
                fontSize: "70%",
                color: "#aaa",
              },
            },
          },
          series: [
            {
              name: "最低蓄水量",
              type: "line",
              symbol: "circle",
              smooth:false,
              symbolSize: 3,
              data: [10, 32, 62, 62, 58, 37, 22, 41, 37, 42, 21, 51, 12, 62],
              itemStyle: {
                normal: {
                  shadowColor: "rgba(210, 111, 214, 1)",
                  shadowBlur: 10,
                },
              },
            },
            {
              name: "一",
              type: "line",
              symbol: "circle",
              smooth:false,
              symbolSize: 3,
              data: [31, 42, 52, 62, 48, 57, 52, 61, 57, 52, 61, 31, 42, 52],
              itemStyle: {
                normal: {
                  shadowColor: "rgba(210, 111, 214, 1)",
                  shadowBlur: 10,
                },
              },
            },
            {
              name: "用水需求",
              type: "line",
              symbol: "circle",
              smooth:false,
              symbolSize: 3,
              data: [29, 33, 44, 51, 40, 35, 55, 63, 57, 52, 61, 29, 33, 44],
              itemStyle: {
                normal: {
                  shadowColor: "rgba(65, 203, 166, 1)",
                  shadowBlur: 10,
                },
              },
            },
            {
              name: "最大蓄水量",
              type: "line",
              symbol: "circle",
              smooth:false,
              symbolSize: 3,
              data: [31, 43, 52, 52, 61, 47, 67, 35, 57, 52, 61, 31, 43, 52],
              itemStyle: {
                normal: {
                  shadowColor: "rgba(210, 105, 98, 1)",
                  shadowBlur: 10,
                },
              },
            },
            {
              name: "",
              type: "line",
              symbol: "circle",
              animation: false,
              symbolSize: 10,
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              lineStyle: {
                width: "0",
              },
            },
            {
              type: "bar",
              name: "",
              tooltip: {
                show: true,
              },
              animation: true,
              barWidth: 1,
              hoverAnimation: false,
              data: [13, 25, 57, 62, 38, 17, 51, 63, 57, 52, 61, 13, 25, 57],
              itemStyle: {
                normal: {
                  barBorderColor: "#e0e0e0",
                  barBorderWidth: 1,
                  barBorderRadius: 0,
                  borderType: "dashed",
                  label: {
                    show: false,
                  },
                },
              },
            },
          ],
        });
    myChart2.setOption({
				tooltip: {
					trigger: 'axis',
					axisPointer: { // 坐标轴指示器，坐标轴触发有效
						type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
					}
				},
				legend: {
					data: ['需求', '实际产出']
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
					data: ['1', '2', '3', '4', '5', '6', '7',
                  '8', '9', '10', '11', '12', '13', '14',
                  '15', '16', '17', '18', '19', '20', '21',
                  '22', '23', '24']
				}],
				yAxis: [{
					type: 'value'
				}],
				series: [{
					name: '需求',
					type: 'bar',
					color:'#00d9c1',
					barWidth: 10,
					stack: '搜索引擎',
					data: [620, 732, 701, 734, 1090, 1130, 1120,
                  620, 732, 701, 734, 1090, 1130, 1120,
                  620, 732, 701, 734, 1090, 1130, 1120,
                  620, 732, 701]
				}, {
					name: '实际产出',
					type: 'bar',
					color:'#62d1ff',
					barWidth: 10,
					stack: '搜索引擎',
					data: [120, 132, 101, 134, 290, 230, 220,
                  120, 132, 101, 134, 290, 230, 220,
                  120, 132, 101, 134, 290, 230, 220,
                  120, 132, 101]
				},]
			});
    myChart3.setOption({
				backgroundColor: '#fff',
				title: {
					text: "图表标题",
					left: "18px",
					top: "0",
					textStyle: {
						color: "#999",
						fontSize: 12,
						fontWeight: '400'
					}
				},
				color: ['#FF0000', '#FFCC33'],
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						},
						lineStyle: {
							type: 'dashed'
						}
					}
				},
				grid: {
					left: '25',
					right: '25',
					bottom: '24',
					top: '75',
					containLabel: true
				},
				legend: {
					data: ['最大功率', '最小功率'],
					orient: 'horizontal',
					icon: "rect",
					show: true,
					left: 20,
					top: 25,
				},
				xAxis: {
					type: 'category',
					data: ['1', '2', '3', '4', '5', '6', '7',
					'8', '9', '10', '11', '12', '13', '14',
					'15', '16', '17', '18', '19', '20', '21',
					'22', '23', '24'],
					splitLine: {
						show: false
					},
					axisTick: {
						show: false
					},
					axisLine: {
						show: false
					},
				},
				yAxis: {
					type: 'value',
					axisLabel: {
						color: '#FF0000',
						textStyle: {
							fontSize: 12
						},
					},
					splitLine: {
						show: true,
						lineStyle: {
							color: '#F3F4F4'
						}
					},
					axisTick: {
						show: false
					},
					axisLine: {
						show: false
					},
				},
				series: [{
						name: '最大功率',
						type: 'line',
						smooth: true,
						data: [3, 7, 2, 9, 2, 8, 1,
						3, 7, 2, 9, 2, 8, 1,
						3, 7, 2, 9, 2, 8, 1,
						3, 7, 2
						]
					}, {
						name: '最小功率',
						type: 'line',
						smooth: true,
						data: [5, 2, 6, 5, 10, 4, 9,
						5, 2, 6, 5, 10, 4, 9,
						5, 2, 6, 5, 10, 4, 9,
						5, 2, 6
						
						]
					}
				]
			});
  },
};
</script>
<style type="text/css">
.spa {
  font-size: 16px;
}

.infor_box {
  width: 342px;
  height: 132px;
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  color: #fff;
  position: relative;
}

.infor_box1 {
  background: #69bdb3;
}

.infor_box2 {
  background: #abce65;
}

.infor_box3 {
  background: #e6bc57;
}

.infor_box4 {
  background: #62c9d8;
}

.infor_box5 {
  background: #69bdb3;
}

.infor_box6 {
  background: #e6bc57;
}

.infor_box p {
  font-size: 20px;
  line-height: 28px;
  width: 163px;
  margin: 3px auto 0 auto;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  margin-bottom: 0;
}

.infor_box h6 {
  font-size: 52px;
  line-height: 30px;
  font-weight: 400;
}

.infor_box:after {
  content: "";
  display: block;
  width: 100%;
  height: 15px;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
}

.infor_box1:after {
  background: #5db3a8;
}

.infor_box2:after {
  background: #a0c659;
}

.infor_box3:after {
  background: #e1b24c;
}

.infor_box4:after {
  background: #56c0d1;
}

.infor_box5:after {
  background: #5db3a8;
}

.infor_box6:after {
  background: #e1b24c;
}

.fL,
.fL_E > * {
  float: left;
}

b {
  display: inline-block;
}

.d2 {
  border-style: solid;
}

.myborder {
  border: 1px solid #ccc;
  border-radius: 15px;
}

.shadow:hover {
  -webkit-box-shadow: #ccc 0px 4px 4px;
  -moz-box-shadow: #ccc 0px 4px 4px;
  box-shadow: #ccc 0px 4px 4px;
}

.ath {
  background-color: #4682b4;
  line-height: 40px;
  color: white;
  width: 800px;
}

.atd {
  height: 40px;
  text-align: center;
  vertical-align: middle;
}

.atr1 {
  background-color: #b0c4de;
  line-height: 30px;
}

.atr2 {
  background-color: #f0f8ff;
  line-height: 30px;
}
.eltable {
  margin-left: 650px;
}
  .el-table .warning-row {
      background: #ffffff;
    }
  .el-table .success-row {
    background: #B0C4DE;
  }
  .el-table tbody tr { 
    pointer-events:none; 
  }
</style>
