<template>
  <div class="lineLossCalcModelManage">
    <Form ref="formValidate" :model="form" :rules="ruleValidate" :label-width="100">
      <Row>
        <Col span="7">
          <FormItem label="选择节点" prop="menuName">
            <Select v-model="form.node" placeholder="请选择节点" clearable>
              <Option v-for="item in node" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="台内运行状态" prop="menuName">
            <Select v-model="form.status" placeholder="请选择台内运行状态" clearable>
              <Option v-for="item in userStatus" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="台区编码" prop="menuName">
            <Input v-model="form.coding" placeholder="请输入台区编码" clearable></Input>
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="台区名称" prop="menuName">
            <Input v-model="form.name" placeholder="请输入台区名称" clearable></Input>
          </FormItem>
        </Col>
        <Col span="7">
          <FormItem label="责任人工号" prop="menuName">
            <Input v-model="form.num" placeholder="请输入责任人工号" clearable></Input>
          </FormItem>
        </Col>
        <Col span="9">
          <FormItem :label-width="20">
            <Button type="primary" @click="handleSubmit('formValidate')">{{$t('inquiry')}}</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>

    <h5>同期线损计算模型明细</h5>
    <card class="my-card">
      <Tables
        class="table"
        ref="tables"
        :columns="columns"
        v-model="nowData"
        :current="current"
        :total="total"
        :pageSizeOpts="pageSizeOpts"
        :pageSize="pageSize"
        :bottomTools="bottomTools"
        @on-page-change="pageChange"
      />
    </card>
    <!--<Row>-->
      <!--<Col span="10" >-->
    <!--<Page :total="dataCount"-->
          <!--:page-size="pageSize"-->
          <!--@on-change="changepage"-->
          <!--@on-page-size-change="_nowPageSize"-->
          <!--show-total-->
          <!--show-sizer-->
          <!--show-elevator />-->
      <!--</Col>-->
      <!--<Col span="6">-->
    <!--<Button type="primary"-->
            <!--size="large"-->
            <!--@click="exportData(1)"-->
            <!--style="margin-left:180px;">-->
      <!--<Icon type="ios-download-outline"></Icon> 导出源数据-->
    <!--</Button>-->
      <!--</Col>-->
      <!--<Col span="3">-->
    <!--<Button type="primary"-->
            <!--size="large"-->
            <!--@click="exportData(2)"-->
            <!--style="margin-left:60px;">-->
      <!--<Icon type="ios-download-outline"></Icon> 导出排序和筛选后的数据-->
    <!--</Button>-->
      <!--</Col>-->
    <!--</Row>-->
  </div>
</template>

<script>
import Tables from '_c/tables'
export default {
  name: 'lineLossCalcModelManage',
  components: {
    Tables
  },
  data () {
    return {
      // 分页
      pageSize: 5, // 每页显示多少条
      total: 0, // 总条数
      current: 1, // 当前页
      pageSizeOpts: [2, 5, 10, 20, 40, 100],
      // 表格数据
      nowData: [],
      tableData: [],
      bottomTools: ['page', 'export'],
      columns: [
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          title: '管理单位',
          key: 'name'
        },
        {
          title: '台区编码',
          key: 'num'
        },
        { title: '台区名称',
          key: 'type'
        },
        {
          title: '台区容量',
          key: 'size'
        },
        {
          title: '安装地址',
          key: 'address'
        },
        {
          title: '运行状态',
          key: 'status'
        },
        {
          title: '线损责任人',
          width: 120,
          key: 'people'
        },
        {
          title: '公变信息',
          key: 'change'
        },
        {
          title: '低压信息',
          key: 'pressure'
        },
        {
          title: '分布式信息',
          width: 120,
          key: 'distributed'
        }
      ],
      node: [
        {
          code: '0',
          name: '节点1'
        },
        {
          code: '1',
          name: '节点2'
        }
      ],
      userStatus: [
        {
          code: '0',
          name: '状态1'
        },
        {
          code: '1',
          name: '状态2'
        }
      ],
      form: {
        node: '',
        status: '',
        coding: '',
        name: '',
        num: ''
      }
    }
  },
  created () {
    this._getData()
  },
  methods: {
    _getData () {
      // 所有数据
      this.tableData = []
      for (let i = 0; i < 15; i++) {
        let data = {
          id: i,
          name: '淮北供电所',
          num: '1211111',
          type: '小绿H23HH配变',
          size: '222',
          address: '淮北',
          status: '运行',
          people: '编辑',
          change: '1',
          pressure: '111',
          distributed: '0'
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
    //       filename: '线损管理_线损模型维护_线损模型设计_源数据',
    //       columns: this.columns,
    //       data: this.tableData
    //     })
    //   } else if (type === 2) { // 导出排序和筛选后的数据
    //     this.$refs.tables.exportCsv({
    //       filename: '线损管理_线损模型维护_线损模型设计排序和筛选后的数据',
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

<style>
  .lineLossCalcModelManage .ivu-form .ivu-select, .lineLossCalcModelManage .ivu-form .ivu-date-picker{
    width: 80%;
  }
  .lineLossCalcModelManage .ivu-form .ivu-form-item-content>.ivu-input-wrapper{
    width: 80%;
  }
  .lineLossCalcModelManage .ivu-table th, .lineLossCalcModelManage .ivu-table td{
    height: 40px;
    text-align: center;
  }
  .lineLossCalcModelManage .ivu-card-body{
    position: relative
  }
  .lineLossCalcModelManage .ivu-poptip{
    position: absolute;
    bottom: 16px;
    right: 80px;
    z-index: 999;
  }
  .lineLossCalcModelManage .ivu-card-body{
    padding: 16px;
  }
  .lineLossCalcModelManage .withoutLabel .ivu-form-item-content{
    margin-left: 50px !important;
  }
</style>
