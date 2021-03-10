<template>
  <div>
    <el-row justify="start">
      <el-col :span="24">
        <div class="nxtopdate">
          <span>选择日期：</span>
          <el-date-picker
            v-model="value1"
            type="year"
            placeholder="选择年">
          </el-date-picker>
          <span>年</span>
          <el-date-picker
            v-model="value2"
            type="month"
            placeholder="选择月">
          </el-date-picker>
          <span>月</span>
          <el-date-picker
            type="dates"
            v-model="value3"
            placeholder="选择日期">
          </el-date-picker>
          <span>日期</span>
        </div>
      </el-col>
    </el-row>

    <table>
      <tr>
        <table>
          <tr>
            <td>
              <div
                class="myborder shadow"
                id="charts2"
                style="width:800px;height:450px;}"
              ></div>
            </td>

            <td>
              <div class="myborder shadow" style="width: 800px; height: 223px">
                <h5 align="left" style="margin-left: 80px">可再生能源能耗水平</h5>
                <div class="infor_box1 infor_box fL"
                     style="width:180px;margin-left:52px;height:90px;margin-top:30px">
                  <p>
                    新能源消纳
                  </p>
                  
                </div>
                <div class="infor_box2 infor_box fL"
                     style="width:180px;margin-left:32px;height:90px;margin-top:30px">
                  <p>
                    消纳率
                  </p>
                  
                </div>
                <div class="infor_box3 infor_box fL"
                     style="width:180px;margin-left:32px;height:90px;margin-top:30px">
                  <p>
                    电网峰谷差
                  </p>
                  
                </div>
              </div>
              <div class="myborder shadow" style="width: 800px; height: 223px">
                <h5 align="left" style="margin-left: 80px">沿海多源多荷系统电能效水平</h5>
                <div class="infor_box1 infor_box fL"
                     style="width:180px;margin-left:52px;height:90px;margin-top:30px">
                  <p>
                    多能源置换效率
                  </p>
                  
                </div>
                <div class="infor_box2 infor_box fL"
                     style="width:180px;margin-left:32px;height:90px;margin-top:30px">
                  <p>
                    电网负荷消减率
                  </p>
                  
                </div>
                <div class="infor_box3 infor_box fL"
                     style="width:180px;margin-left:32px;height:90px;margin-top:30px">
                  <p>
                    耗能成本
                  </p>
                  
                </div>
              </div>
            </td>
          </tr>
        </table>

        <table>
          <tr>
            <td>
              <div
                class="myborder shadow"
                id="charts1"
                style="width:800px;height:450px;}"
              ></div>
              
            </td>
            <td>
              <div class="myborder shadow" style="width: 800px; height: 450px">
                <!-- <h1 align="left" style="margin-left: 80px">环境</h1> -->
                <!-- class="infor_box6 infor_box fL" -->
                <div
                class="cinfor_box6 infor_box fL"
                  style="
                    width: 180px;
                    margin-left: 32px;
                    height: 90px;
                    margin-top: 30px;
                  "
                >
                  <el-card shadow="never">
                    <h5>沿海多源多荷系统</h5>
                    <h5>热能效水平</h5>
                  </el-card>
                  
                </div>
                <div
                class="cinfor_box6 infor_box fL"
                  style="
                    width: 180px;
                    margin-left: 302px;
                    height: 90px;
                    margin-top: 30px;
                  "
                >
                  <el-card shadow="never">
                    <h3>沿海多源多荷系统</h3>
                    <h3>冷能效水平</h3>
                  </el-card>
                  
                </div>
              </div>
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
    myChart1.setOption({
				title: {
					text: '储能系统能效水平',
					subtext: '储能出力占比',
					left: 'center'
				},
				tooltip: {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				legend: {
					orient: 'vertical',
					left: 'left',
					data: ['直接访问', '搜索引擎']
				},
				series: [{
					name: '访问来源',
					type: 'pie',
					radius: '55%',
					center: ['50%', '60%'],
					data: [{
						value: 335,
						name: '直接访问',
						itemStyle:{
							color:'#5b9bd5'
						}
					}, {
						value: 1548,
						name: '搜索引擎',
						itemStyle:{
							color:'#ed7d31'
						}
					}],
					emphasis: {
						itemStyle: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					}
				}]
			});
    myChart2.setOption({
				title: {
					text: '双向堆叠图'
				},
				tooltip: {
					trigger: 'axis',
					
				},
				// legend: {
				// 	//位置需要与color对应，方可得到相应颜色
				// 	data: ['海水淡化膜法工艺', '海水淡化热法工艺','公共母线交互功率','风力发电机组','分布式光伏','纯电负荷']
        // },
        legend:[
          {
            data:['海水淡化膜法工艺','分布式光伏','风力发电机组']
          },
          {
            top: '20',
            data:['海水淡化热法工艺','公共母线交互功率','纯电负荷']
          }
        ],
				grid: {
					left: '3%',
					right: '4%',
					bottom: '3%',
					containLabel: true
				},
				xAxis: [{
					type: 'category',
          // data: ['周一', '周二', '周三', '周四', '周五', '周二', '周三', '周四', '周六', '周日', '周五', '周六', '周日']
          data: ['0:00', '', '', '', '', '', 
                '6:00', '','', '', '', '',
                '12:00', '', '', '','', '', 
                '18:00', '', '', '', '24:00', 
                '24:00']

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
					name: '海水淡化热法工艺',
          type: 'bar',
          color: '#ed1f24',
					stack: '总量',
          // data: [-180, -262, -201, -154, -110, -230, -110, -262, -230, -110, -262, -201, -154]
          data: [-180, -262, -201, -154, -110, -230, -110, -262, -230, -110, -262, -201, -154, -262, -201, -154, -110, -230, -110, -262, -230, -110, -262, -201]
				}, {
					name: '公共母线交互功率',
          type: 'bar',
          color: '#61c332',
					stack: '总量',
          // data: [-320, -332, -301, -334, -390, -330, -320, -262, -201, -154, -154, -110, -230]
          data: [-320, -332, -301, -334, -390, -330, -320, -262, -201, -154, -154, -110, -230, -332, -301, -334, -390, -330, -320, -262, -201, -154, -154, -110]
				},{
					name: '分布式光伏',
          type: 'bar',
          color:'#231f20',
					stack: '总量',
					data: [0, 0, 0, 0, 0, 0, 0, 0, 170, 90, 280, 150, 0, 0, 0, 0]
				},{
					name: '风力发电机组',
          type: 'bar',
          color:'#eaed27',
					stack: '总量',
					data: [100, 150, 230, 90, 240, 70, 90, 80, -100, -110, -127, -254, 130, 150, 230, 90, 240, 70, 90, 80, 100, 110, 127, 254]
				},{
					name: '海水淡化膜法工艺',
          type: 'bar',
          color:'#3057af',
					stack: '总量',
					data: [150, 232, 201, 154, 190, 330, 410, 190, 330, 410, 201, 154, 270, 201, 154, 190, 330, 410, 190, 330, 410, 201, 154, 270]
				},{
          name:'纯电负荷',
          color:'#231f20',
					type: 'line',
					data: [100, 200, 150, 100, 120, 230, 350, 150, 100, 120, 230, 350, 100, 150, 100, 120, 230, 350, 150, 100, 120, 230, 350, 100]
					
				}, ]
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

.cinfor_box6 {
  background: #ffffff;
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

.cinfor_box6:after {
  background: #ffffff;
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
  .nxtopdate{
    float: right;
    padding-top:  10px;
}
</style>
