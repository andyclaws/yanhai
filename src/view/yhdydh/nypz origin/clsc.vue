<template>
  <div>
    <el-table
      :data="tableData"
      :header-cell-style="{background:'#4682B4',color:'white',size:'10px'}"
      stripe
      border
      style="width:90%"
      class="tablecss">
      <el-table-column
        prop="id"
        label="序号"
        width="100px"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="用户名称"
      >
      </el-table-column>
      <el-table-column
        prop="address"
        label="互动策略"
      >
      </el-table-column>
    </el-table>
    <br>
    <div class="button1">
      <el-button type="primary">策略下发</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [{
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
    margin-left:5%;
  }
  .button1{
    margin-top:10px;
    margin-left:88%;
  }
</style>
