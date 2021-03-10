<template>
  <div class="lineLossModelDesign">
    <Form ref="formValidate" :model="form" :rules="ruleValidate" :label-width="100">
      <Row>
        <Col span="6">
          <FormItem label="选择节点:">
            <Select v-model="form.orgName" placeholder="--请选择--" clearable>
              <Option v-for="item in orgList" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="考核单元名称:">
            <Input v-model="form.chkunitName" clearable></Input>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="台区编号:">
            <Input v-model="form.objId" clearable></Input>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="组合标志:">
            <Select v-model="form.linkFlag" placeholder="--请选择--" clearable>
              <Option v-for="item in linkFlagList" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="考核单元状态:">
            <Select v-model="form.statusCode" placeholder="--请选择--" clearable>
              <Option v-for="item in statusCodeList" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="台区状态:">
            <Select v-model="form.runStatusName" placeholder="--请选择--" clearable>
              <Option v-for="item in runStatusNameList" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6" class="withoutLabel">
          <FormItem>
            <Button type="primary">查询</Button>
            <Button type="primary" style="margin-left: 20px">新建</Button>
          </FormItem>
        </Col>
      </Row>
    </Form>
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
    <div>
      <Modal
        width="900"
        title="线损考核单元编辑窗口"
        v-model="chkunitEdit"
        class-name="vertical-center-modal"
        footer-hide
      >
        <chkunit-edit :parentInfo=parentInfo></chkunit-edit>
      </Modal>
    </div>
  </div>
</template>
<script>
import Tables from '_c/tables'
import chkunitEdit from './chkunitEdit'
export default {
  components: {
    Tables,
    chkunitEdit
  },
  data () {
    return {
      chkunitEdit: false,
      tgInfo: false,

      parentInfo: {
        chkunitName: null,
        orgName: null,
        respEmpNo: null,
        examFlag: null,
        chkCycle: null,
        chkunitTypeCode: null,
        linkFlag: null,
        REMARK: null
      },

      orgList: [
        { code: '0', name: '安徽省供电公司' },
        { code: '1', name: 'a市供电公司' },
        { code: '2', name: 'b市供电公司' },
        { code: '3', name: 'c市供电公司' }
      ],
      linkFlagList: [
        { code: '1', name: '是' },
        { code: '0', name: '否' }
      ],
      statusCodeList: [
        { code: '1', name: '启用' },
        { code: '0', name: '停用' }
      ],
      runStatusNameList: [
        { code: '-1', name: '全部' },
        { code: '01', name: '运行' },
        { code: '02', name: '停运' }
      ],

      columns: [
        {
          title: '管理单位',
          key: 'orgName',
          width: 120
        },
        {
          title: '考核单元名称',
          key: 'chkunitName',
          width: 120
        },
        {
          title: '考核单元分类',
          key: 'chkunitTypeCode',
          width: 120,
          render: (h, params) => {
            let tmp = ''
            if (params.row.chkunitTypeCode === '01') {
              tmp = '线路'
            } else if (params.row.chkunitTypeCode === '02') {
              tmp = '台区'
            } else if (params.row.chkunitTypeCode === '03') {
              tmp = '分压'
            } else if (params.row.chkunitTypeCode === '04') {
              tmp = '分区'
            }
            return h('span', {}, tmp)
          }
        },
        {
          title: '台区编号',
          key: 'objId',
          width: 120
        },
        {
          title: '台区状态',
          key: 'runStatusName',
          width: 120
        },
        {
          title: '考核周期',
          key: 'chkCycle',
          width: 150,
          render: (h, params) => {
            return h('span', {}, '日,周,月,季,半年,年')
          }
        },
        {
          title: '考核标志',
          key: 'examFlag',
          width: 120
        },
        {
          title: '负责人',
          key: 'respEmpNo',
          width: 120
        },
        {
          title: '组合标志',
          key: 'linkFlag',
          width: 120
        },
        {
          title: '考核单元状态',
          key: 'statusCode',
          width: 120
        },
        {
          title: '配置考核单元',
          width: 240,
          render: (h, params) => {
            return h('span', [
              h('a', {
                on: {
                  click: () => {
                    this.parentInfo.chkunitName = params.row.chkunitName
                    this.parentInfo.orgName = params.row.orgName
                    this.parentInfo.respEmpNo = params.row.respEmpNo
                    this.parentInfo.examFlag = params.row.examFlag
                    this.parentInfo.chkCycle = params.row.chkCycle
                    this.parentInfo.chkunitTypeCode = params.row.chkunitTypeCode
                    this.parentInfo.linkFlag = params.row.linkFlag
                    this.parentInfo.REMARK = params.row.REMARK
                    this.chkunitEdit = true
                  }
                }
              }, '[考核单元修改]'),
              h('a', {
                on: {
                  click: () => {
                    this.tgInfo = true
                  }
                }
              }, '[台区用户]')
            ])
          }
        }
      ],
      tableData: [
        {
          orgName: 'aaa1',
          chkunitName: 'bbb1',
          chkunitTypeCode: '01',
          objId: 'ddd1',
          runStatusName: 'eee1',
          chkCycle: 'fff1',
          examFlag: 'ggg1',
          respEmpNo: 'hhh1',
          linkFlag: 'iii1',
          statusCode: 'jjj1'
        },
        {
          orgName: 'aaa',
          chkunitName: 'bbb',
          chkunitTypeCode: '02',
          objId: 'ddd',
          runStatusName: 'eee',
          chkCycle: 'fff',
          examFlag: 'ggg',
          respEmpNo: 'hhh',
          linkFlag: 'iii',
          statusCode: 'jjj'
        }
        // ,
        // {
        //   orgName: 'aaa',
        //   chkunitName: 'bbb',
        //   chkunitTypeCode: '03',
        //   objId: 'ddd',
        //   runStatusName: 'eee',
        //   chkCycle: 'fff',
        //   examFlag: 'ggg',
        //   respEmpNo: 'hhh',
        //   linkFlag: 'iii',
        //   statusCode: 'jjj'
        // },
        // {
        //   orgName: 'aaa',
        //   chkunitName: 'bbb',
        //   chkunitTypeCode: '04',
        //   objId: 'ddd',
        //   runStatusName: 'eee',
        //   chkCycle: 'fff',
        //   examFlag: 'ggg',
        //   respEmpNo: 'hhh',
        //   linkFlag: 'iii',
        //   statusCode: 'jjj'
        // },
        // {
        //   orgName: 'aaa',
        //   chkunitName: 'bbb',
        //   chkunitTypeCode: 'ccc',
        //   objId: 'ddd',
        //   runStatusName: 'eee',
        //   chkCycle: 'fff',
        //   examFlag: 'ggg',
        //   respEmpNo: 'hhh',
        //   linkFlag: 'iii',
        //   statusCode: 'jjj'
        // },
        // {
        //   orgName: 'aaa',
        //   chkunitName: 'bbb',
        //   chkunitTypeCode: 'ccc',
        //   objId: 'ddd',
        //   runStatusName: 'eee',
        //   chkCycle: 'fff',
        //   examFlag: 'ggg',
        //   respEmpNo: 'hhh',
        //   linkFlag: 'iii',
        //   statusCode: 'jjj'
        // },
        // {
        //   orgName: 'aaa',
        //   chkunitName: 'bbb',
        //   chkunitTypeCode: 'ccc',
        //   objId: 'ddd',
        //   runStatusName: 'eee',
        //   chkCycle: 'fff',
        //   examFlag: 'ggg',
        //   respEmpNo: 'hhh',
        //   linkFlag: 'iii',
        //   statusCode: 'jjj'
        // },
        // {
        //   orgName: 'aaa',
        //   chkunitName: 'bbb',
        //   chkunitTypeCode: 'ccc',
        //   objId: 'ddd',
        //   runStatusName: 'eee',
        //   chkCycle: 'fff',
        //   examFlag: 'ggg',
        //   respEmpNo: 'hhh',
        //   linkFlag: 'iii',
        //   statusCode: 'jjj'
        // },
        // {
        //   orgName: 'aaa',
        //   chkunitName: 'bbb',
        //   chkunitTypeCode: 'ccc',
        //   objId: 'ddd',
        //   runStatusName: 'eee',
        //   chkCycle: 'fff',
        //   examFlag: 'ggg',
        //   respEmpNo: 'hhh',
        //   linkFlag: 'iii',
        //   statusCode: 'jjj'
        // },
        // {
        //   orgName: 'aaa',
        //   chkunitName: 'bbb',
        //   chkunitTypeCode: 'ccc',
        //   objId: 'ddd',
        //   runStatusName: 'eee',
        //   chkCycle: 'fff',
        //   examFlag: 'ggg',
        //   respEmpNo: 'hhh',
        //   linkFlag: 'iii',
        //   statusCode: 'jjj'
        // },
        // {
        //   orgName: 'aaa',
        //   chkunitName: 'bbb',
        //   chkunitTypeCode: 'ccc',
        //   objId: 'ddd',
        //   runStatusName: 'eee',
        //   chkCycle: 'fff',
        //   examFlag: 'ggg',
        //   respEmpNo: 'hhh',
        //   linkFlag: 'iii',
        //   statusCode: 'jjj'
        // }
      ],
      nowData: [],
      current: 1,
      total: 0,
      pageSizeOpts: [5, 10, 20, 30, 40, 50],
      pageSize: 10,
      bottomTools: ['page', 'export'],

      form: {
        orgName: null,
        chkunitName: null,
        objId: null,
        linkFlag: null,
        statusCode: null,
        runStatusName: null
      },
      ruleValidate: {}
    }
  },
  methods: {
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
.lineLossModelDesign .ivu-form .ivu-select, .lineLossModelDesign .ivu-form .ivu-date-picker{
  width: 80%;
}
.lineLossModelDesign .ivu-form .ivu-form-item-content>.ivu-input-wrapper{
  width: 80%;
}
.lineLossModelDesign .ivu-table th, .lineLossModelDesign .ivu-table td{
  height: 40px;
  text-align: center;
}
.lineLossModelDesign .ivu-card-body{
  position: relative
}
.lineLossModelDesign .ivu-poptip{
  position: absolute;
  bottom: 16px;
  right: 80px;
  z-index: 999;
}
.lineLossModelDesign .ivu-card-body{
  padding: 16px;
}
.lineLossModelDesign .withoutLabel .ivu-form-item-content{
  margin-left: 50px !important;
}
</style>
