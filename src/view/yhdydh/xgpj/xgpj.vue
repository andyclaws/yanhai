<template>
  <div>
    <table>
      <tr>
        <div class="myborder shadow" style="width: 1608px;height: 300px">
          <div style="margin-top:20px;margin-left: 20px">
            <span class="demonstration">查询时间：</span>
            <input type="date">
            <el-button style="margin-left: 15px" @click="select" size="mini">
              查询
            </el-button>
          </div>
          <br/>
          <div style="margin-bottom: 40px">
            <!--                        <el-table-->
            <!--                                :data="tableData"-->
            <!--                                border-->
            <!--                                height="97px"-->

            <!--                                style="width: 601px;margin-left: 487px">-->
            <!--                            <el-table-column-->
            <!--                                    prop="mb"-->
            <!--                                    label="目标"-->
            <!--                                    width="300">-->
            <!--                            </el-table-column>-->
            <!--                            <el-table-column-->
            <!--                                    prop="cj"-->
            <!--                                    label="场景"-->
            <!--                                    width="300">-->
            <!--                            </el-table-column>-->
            <!--                        </el-table>-->
            <table id="unit" name="bg" border="0" align="center" width="1400px">

              <th class="ath">目标</th>
              <th class="ath">场景</th>
              <tr class="atr1">
                <td class="atd">{{msg1}}</td>
                <td class="atd">{{msg2}}</td>
              </tr>
              <tr class="atr2">
                <td class="atd">----</td>
                <td class="atd">----</td>
              </tr>
              <tr class="atr1">
                <td class="atd">----</td>
                <td class="atd">----</td>
              </tr>
              <tr class="atr2">
                <td class="atd">----</td>
                <td class="atd">----</td>
              </tr>
            </table>
          </div>
        </div>
      </tr>
      <tr>
        <table>
          <tr>
            <td>
              <div class="myborder shadow" id="charts1" style="width:800px;height:450px;}"></div>
            </td>
            <td>
              <div class="myborder shadow" id="charts2" style="width:800px;height:450px;}"></div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="myborder shadow" style="width:800px;height: 260px">
                <h2 align="left" style="margin-left: 80px">用能概况（吨标准煤）</h2>
                <div class="infor_box1 infor_box fL"
                     style="width:180px;margin-left:52px;height:90px;margin-top:30px">
                  <p>
                    电能耗
                  </p>
                  <h5>
                    <span class="spa">34</span>
                  </h5>
                </div>
                <div class="infor_box2 infor_box fL"
                     style="width:180px;margin-left:32px;height:90px;margin-top:30px">
                  <p>
                    气能耗
                  </p>
                  <h5>
                    <span class="spa">3456</span>
                  </h5>
                </div>
                <div class="infor_box3 infor_box fL"
                     style="width:180px;margin-left:32px;height:90px;margin-top:30px">
                  <p>
                    其他能耗
                  </p>
                  <h5>
                    <span class="spa">786</span>
                  </h5>
                </div>
              </div>
            </td>
            <td>
              <div class="myborder shadow" style="width:800px;height: 260px">
                <h2 align="left" style="margin-left: 80px">电网概况</h2>
                <div class="infor_box4 infor_box fL"
                     style="width:180px;margin-left:32px;height:90px;margin-top:30px">
                  <p>
                    新能源消纳
                  </p>
                  <h5>
                    <span class="spa">34MW</span>
                  </h5>
                </div>
                <div class="infor_box5 infor_box fL"
                     style="width:180px;margin-left:32px;height:90px;margin-top:30px">
                  <p>
                    消纳率
                  </p>
                  <h5>
                    <span class="spa">70%</span>
                  </h5>
                </div>
                <div class="infor_box6 infor_box fL"
                     style="width:180px;margin-left:32px;height:90px;margin-top:30px;">
                  <p>
                    电网峰谷差
                  </p>
                  <h5>
                    <span class="spa">4MW</span>
                  </h5>
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
  var echarts = require('echarts');
  export default {
    data() {
      return {
        tableData: [],
        value1: '',
        msg1: '---',
        msg2: '---',
      };
    },
    methods: {
      select() {
        console.log("ceshi");

this.msg1='综合能耗最小';
this.msg2='供需平衡';
        //this.tableData = [{mb: '综合能耗最小', cj: '供需平衡'}];
      }
    },
    mounted() {
      var myChart1 = echarts.init(document.getElementById('charts1'));
      var myChart2 = echarts.init(document.getElementById('charts2'), 'light');
      myChart1.setOption({
        series: [
          {
            radius: '75%',
            center: ['50%', '50%'],
            name: '业务指标',
            type: 'gauge',
            detail: {formatter: '{value}'},
            data: [{value: 98, name: '效果评价'}]
          }
        ]
      });
      myChart2.setOption({
        tooltip: {},
        radar: {
          // shape: 'circle',
          name: {
            textStyle: {
              color: '#fff',
              backgroundColor: '#999',
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          indicator: [
            {name: '安全性评分', max: 100},
            {name: '光伏消纳评分', max: 100},
            {name: '用户舒适度评分', max: 100},
            {name: '环保性评分', max: 100},
            {name: '经济性评分', max: 100},
          ],
          radius: '75%',
          center: ['50%', '50%'],
        },
        series: [{
          type: 'radar',
          // areaStyle: {normal: {}},
          data: [
            {
              value: [70, 46, 57, 60, 87],
              name: '评分',
              label: {
                show: true,
              }
            },
          ]
        }]
      })
    }
  }
  ;
</script>
<style type="text/css" scoped>
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

  .fL, .fL_E > * {
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
    background-color: #4682B4;
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
    background-color: #B0C4DE;
    line-height: 30px;
  }

  .atr2 {
    background-color: #F0F8FF;
    line-height: 30px;
  }
</style>
