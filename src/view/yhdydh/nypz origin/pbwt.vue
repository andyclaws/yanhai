<template>
  <div>
      <el-row :gutter="12">
        <el-col :span="25">
          <el-card shadow="hover" class="card1">
            <div slot="header">
                <div class="top1">
              <span>能源服务场景:<span class="input"><el-input type="text" value="供需平衡" disabled></el-input></span></span>
              <span>优化目标:<span class="input"><el-input type="text" value="综合能耗最小"disabled></el-input></span></span>
            </div>
            </div>
<!--            <div class="top">-->
<!--              <span>事件查询:</span>-->
<!--            <span><Select v-model="value1" placeholder="按时间" >-->
<!--               <Option label="事件一" value="事件一"></Option>-->
<!--               <Option label="事件二" value="事件二"></Option>-->
<!--            </Select>-->
<!--            </span>-->
<!--&lt;!&ndash;              <el-select v-model="value1" placeholder="按时间">&ndash;&gt;-->
<!--&lt;!&ndash;                <el-option label="事件一" value="事件一"></el-option>&ndash;&gt;-->
<!--&lt;!&ndash;                <el-option  label="事件二" value="事件二"></el-option>&ndash;&gt;-->
<!--&lt;!&ndash;              </el-select>&ndash;&gt;-->
<!--              <span><el-button type="info" plain>确定</el-button></span>-->
<!--            </div>-->
            <div class="tablecss">
              <el-table
                :data="tableData"
                :header-cell-style="{background:'#4682B4',color:'white',size:'10px'}"
                :row-style="{height:0+'px'}"
                :cell-style="{padding:0+'px'}"
                stripe
                border
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
            <br>
            <div>
              <el-button type="info" plain>确定</el-button>
            </div>
            <br>
          </el-card>
        </el-col>
      </el-row>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        value:'10',
        tableData: [{
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
        tableData1: [{
          id: '1',
          name: '',
          address: ''
        }, {
          id: '2',
          name: '',
          address: ''
        }, {
          id: '3',
          name: '',
          address: ''
        }, {
          id: '4',
          name: '',
          address: ''
        }]
      }
    }
  }
</script>
<style scoped>
  .el-table th,.el-table td{
    text-align:center
  }
  .tablecss{
    clear:left;
    margin-left: 100px;
    padding-top:  20px;
  }
  .input{
    display:inline-block;
    width:200px;
  }
  /*.top{*/
  /*  margin-left:100px;*/
  /*  float:left;*/
  /*}*/
  .top1{
    clear:both;
    margin-left:100px;
    margin-top:10px;
    float:left;
  }
  .card1{
    text-align: center;
  }
</style>
