<template>
  <div class="lightDetail-contanier">
    <el-row justify="start">
      <el-col :span="24">
        <div class="topdate">
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
    

    <!-- <div>
      <table id="unit" name="bg" border="0" align="center" width="1400px">
        <th valign="middle" style="color:#000">目标\场景</th>
        <th>供需平衡</th>
        <th>新能源平抑消纳</th>
        <th>削峰填谷</th>
        <th>提高用户舒适度</th>
        <tr>
          <td>用能成本最低</td>
          <td>----</td>
          <td>----</td>
          <td>----</td>
          <td><input type="checkbox" id="checkbox1" v-model="datas" value="0" disabled="false" @click="visible"></td>
        </tr>
        <tr>
          <td>经济收益最大</td>
          <td><input type="checkbox" id="checkbox2" v-model="datas" value="1"></td>
          <td><input type="checkbox" id="checkbox3" v-model="datas" value="2"></td>
          <td>----</td>
          <td>----</td>
        </tr>
        <tr>
          <td>消纳量最大</td>
          <td>----</td>
          <td><input type="checkbox" id="checkbox4" v-model="datas" value="3"></td>
          <td>----</td>
          <td>----</td>
        </tr>
        <tr>
          <td>综合能耗最小</td>
          <td><input type="checkbox" id="checkbox5" v-model="datas" value="4"></td>
          <td>----</td>
          <td>----</td>
          <td>----</td>
        </tr>
        <tr>
          <td>电网峰谷差最小</td>
          <td><input type="checkbox" id="checkbox6" v-model="datas" value="5"></td>
          <td>----</td>
          <td><input type="checkbox" id="checkbox7" v-model="datas" value="6"></td>
          <td>----</td>
        </tr>
      </table>
    </div> -->

    
    <div class="cardsp">
      <el-row>
        <el-col :span="4">
          <el-card shadow="always" align="center" >
            <span style="font-size:20px">目标选择</span>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div>
      <el-table
        :data="tableData"
        :border="true"
        style="width: 100%"
        :row-class-name="tableRowClassNameone"
        :header-cell-style="{background:'#4682B4',color:'white'}">
        <el-table-column
          prop="date"
          label="目标\场景"
          style="color: black;"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="供需平衡">
          <!-- <template slot-scope="scope">
                  <el-checkbox v-model="tableData[scope.$index].isDelete"   @change="selectRadio(scope.$index,scope.row)" :disabled="tableData[scope.$index].disabled"></el-checkbox>
              </template> -->
        </el-table-column>        
        <el-table-column
          prop="aname"
          label="新能源平抑消纳"
          align="center">
        </el-table-column>        
        <el-table-column
          prop="bname"
          label="削峰填谷"
          align="center">
        </el-table-column>
        <el-table-column
          prop="cname"
          label="提高用户舒适度"
          align="center">
        </el-table-column>
      </el-table>
    </div>
    <div class="button1">
      <el-button type="primary" @click="xianshishuju">确定</el-button>
    </div>

    <div class="cardsp">
      <el-row>
        <el-col :span="4">
          <el-card shadow="always" align="center" >
            <span style="font-size:20px">策略生成</span>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div>
      <el-table
        :data="tableDatatwo"
        :border="true"
        style="width: 100%"
        :header-cell-style="{background:'#4682B4',color:'white'}">
        <el-table-column
          prop="date"
          label="顺序"
          width="77px"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="设备名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="目标"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="场景"
          align="center">
        </el-table-column>
      </el-table>
    </div>

    <!-- <div 
          class="tablecss" v-if="visi">
      <el-table
        :data="tableData1"
        :header-cell-style="{background:'#4682B4',color:'white',size:'10px'}"
        stripe
        border
        style="width:100%"
      >
        <el-table-column
          label="顺序"
          type="index"
          width="50"
          align="center">
        </el-table-column>
        <el-table-column
          prop="name"
          label="设备名称"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="goal"
          label="目标"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="scene"
          label="场景"
          align="center"
        >
        </el-table-column>
      </el-table>
    </div> -->
    
    <div class="cardsp">
      <el-row>
        <el-col :span="4">
          <el-card shadow="always" align="center" >
            <span style="font-size:20px">配比微调</span>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="tablecss">
      <el-table
        :data="tableDatathree"
        :header-cell-style="{background:'#4682B4',color:'white',size:'10px'}"
        :row-style="{height:0+'px'}"
        :cell-style="{padding:0+'px'}"
        stripe
        :border="true"
        style="width:90%"
      >
        <el-table-column
          prop="id"
          label="序号"
        >
        </el-table-column>
        <el-table-column
          prop="energysource"
          label="能源来源"
        >
        </el-table-column>
        <el-table-column
          prop="volume"
          label="出力容量(MW)"
        >
        </el-table-column>
        <el-table-column
          prop="percent"
          label="出力占比(%)">
          <template slot-scope="scope">
            <el-slider v-model="scope.row.percent"></el-slider>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="cardsp">
      <el-row>
        <el-col :span="4">
          <el-card shadow="always" align="center" >
            <span style="font-size:20px">配比微调</span>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <el-card style="width:100%" :style="cardHeight" shadow="never">
      <div slot="header">
        <div class="content-box" :style="contentHeight">
          
          <div class="right-box">
            <div class="curve-box">
              
              <div class="power-charts-box">
                <alternating-power-charts :alternatingPowerData="alternatingPowerData"></alternating-power-charts>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </el-card>


  </div>

</template>
<script>
  import $ from 'jquery'
  import alternatingPowerCharts from './alternatingPowerCharts'
  const name=['市电','光伏','风电','市电','光伏','风电','市电']
  const goal=['用能成本最低','经济收益最大','经济收益最大','消纳量最大','综合能效最小','电网峰谷差最小','电网峰谷差最小']
  const scene=['提高用户舒适度','供需平衡','新能源平抑消纳','新能源平抑消纳','供需平衡','供需平衡','削峰填谷']
  export default {
    name: "lightingDetail",
    props: {},
    data() {
      return {
        cardHeight: 'height: 850px;',
        contentHeight: 'height: 750px;',
        currentPower: 1400,
        maxDesignPower: 2000,
        sameDayElectricity: 402,
        yesterdayElectricity: 1000,
        activeIndex: 0,
        alternatingPowerData: [],
        dimensionValue: 'day',
        datas:[],
        visi:false,
        tableData: [{
          id: '用能成本最低',
          disabledvalue:'true',
          checked:'true',
        }, {
          id: '经济收益最大',
          disabledvalue:'false',
        }, {
          id: '消纳量最大',
          disabledvalue:'true',
        }, {
          id: '综合能耗最小',
          disabledvalue:'true',
        },
          {
            id: '电网峰谷差最小',
            disabledvalue:'true',
          }
        ],
        tableData1:[],
        value1:'',
        value2:'',
        value3:'',
        tableData: [{
          date: '用能成本最低',
          name: '----',
          aname: '----',
          bname: '----',
          cname: 'c王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '经济收益最大',
          name: '2王小虎',
          aname: 'a王小虎',
          bname: '----',
          cname: '----',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '消纳量最大',
          name: '----',
          aname: 'b王小虎',
          bname: '----',
          cname: '----',
          address: '上海市普陀区金沙江路 1518 弄',
        }, {
          date: '综合能耗最小',
          name: '王小虎',
          aname: '----',
          bname: '----',
          cname: '----',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '电网峰谷差最小',
          name: '王小虎',
          aname: '----',
          bname: 'b王小虎',
          cname: '----',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        tableDatathree: [{
          id: '1',
          energysource: '市电',
          volume: '10',
          percent:50
        }, {
          id: '2',
          energysource: '光伏',
          volume: '3',
          percent:15
        }, {
          id: '3',
          energysource: '风电',
          volume: '1',
          percent:5
        }, {
          id: '4',
          energysource: '其他',
          volume: '6',
          percent:30
        }],
        tableDatatwo: [{
          date: '1',
          name: '',
          address: '',
        }, {
          date: '2',
          name: '',
          address: ''
        }, {
          date: '3',
          name: '',
          address: ' ',
        }, {
          date: '4',
          name: '',
          address: ''
        }, {
          date: '5',
          name: '',
          address: ''
        }]
      
      }
    },
    components: {
      alternatingPowerCharts
    },
    mounted() {
      this.changeHeight()
      let that = this
      window.onresize = () => {
        return (() => {
          that.changeHeight()
        })()
      }
      this.alternatingPowerData = [820, 932, 901, 934, 1290, 1330, 1320]
    },
    methods:{
      tableRowClassNameone({row, rowIndex}) {
        if ((rowIndex+1) %2 === 0) {
          return 'warning-row';
        } else if ((rowIndex+1) %2 !== 0) {
          return 'success-row';
        }
        return '';
      },
      changeHeight: function () {
        this.cardHeight =
          window.innerHeight > 800
            ? 'height: ' + (window.innerHeight - 80) + 'px'
            : 'height: 850px'
        this.contentHeight =
          window.innerHeight > 800
            ? 'height: ' + (window.innerHeight - 160) + 'px'
            : 'height: 750px'
      },
    }
  }
</script>
<style lang="less">
@import "lightingDetail.less";
.el-table .warning-row {
    background: #ffffff;
  }

  .el-table .success-row {
    background: #B0C4DE;
  }
  /* element关闭鼠标悬停行内换色 */
  .el-table tbody tr { 
    pointer-events:none; 
  }
  .button1{
    margin-top:10px;
    margin-left:90%;
  }
  .tablecss{
    clear:left;
    margin-left: 100px;
    padding-top:  20px;
  }
  .topdate{
    float: right;
    padding-top:  10px;
  }
</style>
