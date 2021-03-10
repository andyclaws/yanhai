<template>
  <div class="chkunitEdit">
    <Menu mode="horizontal" theme="light" active-name="1" @on-select="tabSelected">
      <MenuItem name="1">考核单元信息及流入电量定义</MenuItem>
      <MenuItem name="2">考核单元组件列表</MenuItem>
    </Menu>
      <div v-show="showFlag == 1">
        <Form ref="formValidate" :model="parentInfo" :rules="ruleValidate" :label-width="100">
          <Row>
            <Col span="8">
              <FormItem label="考核单元名称">
                <Input v-model="parentInfo.chkunitName" clearable></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="供电单位">
                <Input v-model="parentInfo.orgName" clearable></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="负责人">
                <Select v-model="parentInfo.respEmpNo" placeholder="--请选择--">
                  <Option v-for="item in respEmpNoList" :value="item.code" :key="item.code">{{ item.name }}</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="考核标志">
                <Select v-model="parentInfo.examFlag" placeholder="--请选择--">
                  <Option v-for="item in examFlagList" :value="item.code" :key="item.code">{{ item.name }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="16">
              <FormItem label="考核周期">
                <CheckboxGroup v-model="parentInfo.chkCycle">
                  <Checkbox label="日"></Checkbox>
                  <Checkbox label="周"></Checkbox>
                  <Checkbox label="月"></Checkbox>
                  <Checkbox label="季"></Checkbox>
                  <Checkbox label="半年"></Checkbox>
                  <Checkbox label="年"></Checkbox>
                </CheckboxGroup>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="8">
              <FormItem label="考核单元分类">
                <Input v-model="parentInfo.chkunitTypeCode" clearable></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="组合标志">
                <Input v-model="parentInfo.linkFlag" clearable></Input>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="标记">
                <Input v-model="parentInfo.REMARK" clearable></Input>
              </FormItem>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col class="withoutLabel">
              <FormItem>
                <Button type="primary">保存</Button>
                <Button type="primary" style="margin-left: 20px">关闭</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>

      <div v-show="showFlag == 2">
        <!--<h1>test</h1>-->
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
      </div>
  </div>
</template>

<script>
import Tables from '_c/tables'
export default {
  components: {
    Tables
  },
  name: 'chkunitEdit',
  props: ['parentInfo'],
  data () {
    return {
      columns: [
        {
          type: 'selection',
          // width: 60,
          align: 'center'
        },
        {
          title: '供电单位',
          key: 'ORG_NAME'
          // width: 120
        },
        {
          title: '对象类型',
          key: 'OBJ_TYPE_CODE'
          // width: 120,
        },
        {
          title: '对象编号',
          key: 'OBJ_NO'
          // width: 120
        },
        {
          title: '对象名称',
          key: 'OBJ_NAME'
          // width: 120
        },
        {
          title: '对象运行状态',
          key: 'RUN_STATUS_CODE'
          // width: 120
        }
      ],
      tableData: [
        { OBJ_NO: '1' },
        { OBJ_NO: '2' },
        { OBJ_NO: '3' }
      ],
      nowData: [],
      current: 1,
      total: 0,
      pageSizeOpts: [5, 10, 20, 30, 40, 50],
      pageSize: 5,
      bottomTools: ['page', 'export'],

      showFlag: '1',
      respEmpNoList: [],
      examFlagList: [],

      // parentInfo: {
      //   chkunitName: null,
      //   orgName: null,
      //   respEmpNo: null,
      //   examFlag: null,
      //   chkCycle: null,
      //   chkunitTypeCode: null,
      //   linkFlag: null,
      //   REMARK: null
      // },
      ruleValidate: {}
    }
  },
  methods: {
    tabSelected (name) {
      this.showFlag = name
    },
    getTableData () {
      this.total = this.tableData.length
      const limit = Math.min(this.total, this.pageSize)
      this.nowData = []
      for (let i = 0; i < limit; i++) {
        this.nowData.push(this.tableData[i])
      }
    },
    pageChange (current, pageSize) {
      this.current = current
      this.pageSize = pageSize
      let _start = (current - 1) * this.pageSize
      let _end = current * this.pageSize
      this.nowData = this.tableData.slice(_start, _end)
    }
  },
  created () {
    this.getTableData()
  }
}
</script>

<style>
.chkunitEdit .ivu-form .ivu-select, .chkunitEdit .ivu-form .ivu-date-picker{
  width: 80%;
}
.chkunitEdit .ivu-form .ivu-form-item-content>.ivu-input-wrapper{
  width: 80%;
}
.chkunitEdit .ivu-table th, .chkunitEdit .ivu-table td{
  height: 40px;
  text-align: center;
}
.chkunitEdit .ivu-card-body{
  position: relative
}
.chkunitEdit .ivu-poptip{
  position: absolute;
  bottom: 16px;
  right: 80px;
  z-index: 999;
}
.chkunitEdit .ivu-card-body{
  padding: 16px;
}
.chkunitEdit .withoutLabel .ivu-form-item-content{
  margin-left: 0px !important;
}
.chkunitEdit .ivu-menu-horizontal{
  height: 18px;
  line-height: 0px;
}
</style>
