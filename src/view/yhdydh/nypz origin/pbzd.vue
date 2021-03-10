<template>
  <div>
    <div>
      <table  id="unit" name="bg" border="0" align="center" width="1400px">
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
          <td><input type="checkbox" id="checkbox1" v-model="datas" value="0"></td>
        </tr>
        <tr>
          <td>经济收益最大</td>
          <td><input type="checkbox"id="checkbox2" v-model="datas"value="1"></td>
          <td><input type="checkbox"id="checkbox3" v-model="datas"value="2"></td>
          <td>----</td>
          <td>----</td>
        </tr>
        <tr>
          <td>消纳量最大</td>
          <td>----</td>
          <td><input type="checkbox" id="checkbox4" v-model="datas"value="3"></td>
          <td>----</td>
          <td>----</td>
        </tr>
        <tr>
          <td>综合能耗最小</td>
          <td><input type="checkbox"id="checkbox5" v-model="datas"value="4"></td>
          <td>----</td>
          <td>----</td>
          <td>----</td>
        </tr>
        <tr>
          <td>电网峰谷差最小</td>
          <td><input type="checkbox"id="checkbox6"v-model="datas" value="5"></td>
          <td>----</td>
          <td><input type="checkbox"id="checkbox7"v-model="datas" value="6"></td>
          <td>----</td>
        </tr>
      </table>
    </div>
    <div class="button1">
      <el-button type="primary" @click="xianshishuju">确定</el-button>
    </div>
    <div class="tablecss" v-if="visi">
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
      <div class="button1">
        <el-button type="primary" @click="tiaozhuan">配比微调</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import $ from 'jquery'
  const name=['市电','光伏','风电','市电','光伏','风电','市电']
  const goal=['用能成本最低','经济收益最大','经济收益最大','消纳量最大','综合能效最小','电网峰谷差最小','电网峰谷差最小']
  const scene=['提高用户舒适度','供需平衡','新能源平抑消纳','新能源平抑消纳','供需平衡','供需平衡','削峰填谷']
  export default {
    data() {
      return {
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
      }
    },
    methods:{
      xianshishuju: function () {
        console.log(this.datas)
        this.visi=true
        this.tableData1.push({
          name:name[this.datas],
          goal:goal[this.datas],
          scene:scene[this.datas]
        })
        //this.tableData1.push(this.datas)
      },
      tiaozhuan:function()
      {
        this.$router.push("pbwt")
      }
    }
  }
</script>
<style scoped>
  .el-table th,.el-table td{
    text-align:center;
    line-height:30px
  }
  th{background-color:#4682B4;
    line-height: 40px;
    color:white;}
  td{ height:40px;
    text-align:center;
    vertical-align:middle;}
  table tr:nth-child(even) {
    background-color:#B0C4DE;
    line-height: 30px;
  }
  table tr:nth-child(odd) {
    background-color:#F0F8FF;
    line-height: 30px;
  }
  input[type=checkbox]
  {
    display: inline-block;
    height:20px;
    width:20px;
  }
  .button1{
    margin-top:10px;
    margin-left:90%;
  }
</style>
