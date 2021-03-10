<template>
  <div>
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
                <h1 align="left" style="margin-left: 80px">电网</h1>
                <div
                  class="infor_box4 infor_box fL"
                  style="
                    width: 180px;
                    margin-left: 32px;
                    height: 90px;
                    margin-top: 30px;
                  "
                >
                  <p>减少电网投资</p>
                </div>
                <div
                  class="infor_box5 infor_box fL"
                  style="
                    width: 180px;
                    margin-left: 32px;
                    height: 90px;
                    margin-top: 30px;
                  "
                >
                  <p>降低运营成本</p>
                </div>
              </div>
              <div class="myborder shadow" style="width: 800px; height: 223px">
                <h1 align="left" style="margin-left: 80px">环境</h1>
                <div
                  class="infor_box6 infor_box fL"
                  style="
                    width: 180px;
                    margin-left: 32px;
                    height: 90px;
                    margin-top: 30px;
                  "
                >
                  <p>减少碳排放量</p>
                </div>
              </div>
            </td>
          </tr>
        </table>

        <table>
          <tr>
            <td>
              <div class="myborder shadow" style="width: 1670px; height: 320px">
                <h1 align="left" style="margin-left: 80px">环境</h1>
                <div
                  class="infor_box6 infor_box fL"
                  style="
                    width: 180px;
                    margin-left: 32px;
                    height: 90px;
                    margin-top: 30px;
                  "
                >
                  <p>节省电费</p>
                </div>
                <div
                  class="infor_box4 infor_box fL"
                  style="
                    width: 180px;
                    margin-left: 32px;
                    height: 90px;
                    margin-top: 30px;
                  "
                >
                  <p>新能源并网收益</p>
                </div>

                <div class="eltable">
                  <el-table
                    :data="tableData"
                    :border="true"
                    style="width: 90%"
                    :row-class-name="tableRowClassNameone"
                    :header-cell-style="{
                      background: '#4682B4',
                      color: 'white',
                    }"
                  >
                    <el-table-column prop="num" label="用户编号">
                    </el-table-column>
                    <el-table-column prop="name" label="用户名称">
                    </el-table-column>
                    <el-table-column prop="save" label="节省电费">
                    </el-table-column>
                    <el-table-column prop="ner" label="新能源并网收益">
                    </el-table-column>
                  </el-table>
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
    // var myChart1 = echarts.init(document.getElementById('charts1'));
    var myChart2 = echarts.init(document.getElementById("charts2"), "light");
    // myChart1.setOption({
    //   series: [
    //     {
    //       radius: '75%',
    //       center: ['50%', '50%'],
    //       name: '业务指标',
    //       type: 'gauge',
    //       detail: {formatter: '{value}'},
    //       data: [{value: 98, name: '效果评价'}]
    //     }
    //   ]
    // });
    myChart2.setOption({
      title: {
        align: "center",
        text: "经济效益",
      },
      tooltip: {},
      radar: {
        // shape: 'circle',
        name: {
          textStyle: {
            color: "#fff",
            backgroundColor: "#999",
            borderRadius: 3,
            padding: [3, 5],
          },
        },
        indicator: [
          { name: "降低运营成本", max: 100 },
          { name: "新能源并网收益", max: 100 },
          { name: "减少电网投资", max: 100 },
          { name: "节省电费", max: 100 },
          { name: "减少碳排放量", max: 100 },
        ],
        radius: "75%",
        center: ["50%", "50%"],
      },
      series: [
        {
          type: "radar",
          // areaStyle: {normal: {}},
          data: [
            {
              value: [70, 46, 57, 60, 87],
              name: "评分",
              label: {
                show: true,
              },
            },
          ],
        },
      ],
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
