<template>
  <div class="user-details">
    <Form ref="formItem"
          :model="formItem"
          :rules="ruleValidate"
          :label-width="100">
      <Row>
        <Col span="5">
          <FormItem label="终端地址:"
                    prop="consNo">
            <Input placeholder="终端地址"
                   clearable
                   v-model="parentInfo"></Input>
          </FormItem>
        </Col>

        <Col span="5">
          <FormItem label="台区编号:"
                    prop="consName">
            <Input v-model="formItem.consName"
                   placeholder="请输入台区编号"
                   clearable></Input>
          </FormItem>
        </Col>

        <Col span="5">
          <FormItem label="台区名称:"
                    prop="terminalAddr">
            <Input v-model="formItem.terminalAddr"
                   placeholder="请输入台区名称"
                   clearable></Input>
          </FormItem>
        </Col>
        <Col span="6" pull="1">
          <FormItem>
            <Button type="primary"
                    class="search"
                    @click="handleSubmit('formItem')">查询</Button>
          </FormItem>
        </Col>
      </Row>

    </Form>
    <!-- 表格 -->
    <card class="my-card" >
      <Tables
        ref="tables"
        height="300"
        v-model="nowData"
        :columns="columns"
        :current="current"
        :total="total"
        :pageSizeOpts="pageSizeOpts"
        :pageSize="pageSize"
        :bottomTools="bottomTools"
        @on-change="pageChange"
        @on-page-change="pageChange"
      >
      </Tables>
    </card>
    <Row>
      <!-- <Col span="12">
      <Button type="primary"
              size="large"
              @click="exportData(1)"
              style="margin-left:180px;">
        <Icon type="ios-download-outline"></Icon> 导出源数据
      </Button>
      <Button type="primary"
              size="large"
              @click="exportData(2)"
              style="margin-left:30px;">
        <Icon type="ios-download-outline"></Icon> 导出排序和筛选后的数据
      </Button>
      </Col> -->
    </Row>
  </div>
</template>

<script>
import Tables from '_c/tables'
export default {
  name: 'userDetails',
  components: {
    Tables
  },
  props: ['parentInfo'],
  data () {
    return {
      bottomTools: ['page', 'export'],
      // 分页
      pageSize: 5, // 每页显示多少条
      total: 0, // 总条数
      current: 1, // 当前页
      pageSizeOpts: [2, 5, 10, 20, 40, 100],
      // 表格数据
      nowData: [],
      tableData: [],
      // 表单元素
      formItem: {
        // 供电单位
        orgName: '',
        // 异常事件
        errName: '',
        // 异常等级
        errLevel: '',
        // 告警类别
        alarmType: '',
        // 异常来源
        errSource: '',
        // 用户编号
        consNo: '',
        // 用户名称
        consName: '',
        // 终端地址
        terminalAddr: '',
        // 待处理、已处理、关闭
        operation: ['待处理'],
        // 告警日期起点
        alarmDateStart: '',
        // 告警日期终点
        alarmDateEnd: '',
        // 台区名称
        tgName: ''
      },
      // 表单验证
      ruleValidate: {
        tgName: [
          { required: true, message: '请输入台区名称', trigger: 'blur' }
        ]
      },

      // 三种处理单选按钮
      handle: '',
      // 表头
      columns: [
        // {
        //   type: 'selection',
        //   width: 60,
        //   align: 'center'
        // },
        // {
        //   title: '序号',
        //   key: 'id',
        //   width: 90,
        //   sortable: true
        // },
        {
          title: '供电单位',
          width: 100,
          key: 'alarmType'
        },
        {
          title: '用户编号',
          width: 100,
          key: 'alarmName'
        },
        {
          title: '用户名称',
          width: 100,
          key: 'orgName'
        },
        {
          title: '电能表资产编号',
          width: 150,
          key: 'errLevel'
        },
        {
          title: '终端类型',
          width: 100,
          key: 'consCode'
        },
        {
          title: '台区编号',
          width: 100,
          key: 'consName'
        },
        {
          title: '台区名称',
          width: 100,
          key: 'tgName'
        },
        {
          title: '用电地址',
          width: 100,
          key: 'terminalAddr'
        },
        {
          title: '采集器资产号',
          width: 150,
          key: 'P_ORG_NAME'
        }
      ]

    }
  },
  created () {
    this._getData()
  },
  methods: {
    _getData () {
      // 所有数据
      this.tableData = []
      for (let i = 0; i < 25; i++) {
        let data = {
          id: i + 1,
          alarmType: '',
          alarmName: '',
          orgName: '',
          errLevel: '',
          consCode: '',
          consName: '',
          terminalAddr: '',
          alarmDate: ''
        }
        this.tableData.push(data)
      }
      // 分页显示所有数据总数
      this.total = this.tableData.length
      // 循环展示页面刚加载时需要的数据条数
      this.nowData = []
      for (let i = 0; i < this.pageSize; i++) {
        this.nowData.push(this.tableData[i])
      }
    },
    // 点击，切换页面
    pageChange (current, pageSize) {
      this.current = current
      this.pageSize = pageSize
      let _start = (current - 1) * this.pageSize
      let _end = current * this.pageSize
      this.nowData = this.tableData.slice(_start, _end)

      // // 需要显示开始数据的index,(因为数据是从0开始的，页码是从1开始的，需要-1)
      // let _start = (index - 1) * this.pageSize
      // // 需要显示结束数据的index
      // let _end = index * this.pageSize
      // // 截取需要显示的数据
      // this.nowData = this.tableData.slice(_start, _end)
      // // 储存当前页
      // this.pageCurrent = index
    },
    // 每页显示的数据条数
    _nowPageSize (index) {
      let _start = (this.pageCurrent - 1) * index
      // 需要显示结束数据的index
      let _end = index * this.pageCurrent
      // 截取需要显示的数据
      this.nowData = this.tableData.slice(_start, _end)
      // 实时获取当前需要显示的条数
      this.pageSize = index
    },

    // exportData (type) {
    //   // 导出源数据
    //   if (type === 1) {
    //     this.$refs.tables.exportCsv({
    //       filename: '计量在线监测_异常处理_代办事项_源数据',
    //       columns: this.columns,
    //       data: this.tableData
    //     })
    //   } else if (type === 2) { // 导出排序和筛选后的数据
    //     this.$refs.tables.exportCsv({
    //       filename: '计量在线监测_异常处理_代办事项_排序和筛选后的数据',
    //       original: false
    //     })
    //   }
    // },
    // 查询按钮点击事件
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
  }
}
</script>
<style lang="less">
  .user-details .ivu-card-body{
    position: relative
  }
  .user-details .ivu-poptip{
    position: absolute;
    bottom: 16px;
    right: 80px;
    z-index: 999;
  }
  .user-details .ivu-card-body{
    padding: 8px 16px 16px 16px;
  }
  .user-details .ivu-card-head button{
    margin-right: 10px;
    margin-bottom: 8px;
  }
  .ivu-table-tbody td,.ivu-table-header th{
    text-align: center;
  }
</style>
