<template>
  <div class="tgLineLossDetail">
    <Form ref="formValidate" :model="form" :rules="ruleValidate" :label-width="100">
      <Row>
        <Col span="6">
          <FormItem label="供电单位:">
            <Select v-model="form.org" placeholder="--请选择--" clearable>
              <Option v-for="item in orgList" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="10">
          <FormItem label="采集覆盖率:">
            <Select v-model="form.collCoverRange1" @on-change="changeCollCoverRange1" style="width: 20%">
              <Option v-for="item in range1" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
            <Input v-model="form.collCoverRange1Value" clearable style="width: 20%; margin-left: 5px"></Input>%
            <Select v-model="form.collCoverRange2" :disabled="form.collCoverRange2Flag" style="width: 20%">
              <Option v-for="item in range2" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
            <Input v-model="form.collCoverRange2Value" clearable :disabled="form.collCoverRange2Flag" style="width: 20%; margin-left: 5px"></Input>%
          </FormItem>
        </Col>
        <Col span="4" class="withoutLabel">
          <FormItem>
            <RadioGroup v-model="form.timeDimension">
              <Radio label="按日"></Radio>
              <Radio label="按月"></Radio>
            </RadioGroup>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="台区编号:">
            <Input v-model="form.tgNo" clearable></Input>
          </FormItem>
        </Col>
        <Col span="10">
          <FormItem label="采集成功率:">
            <Select v-model="form.collSuccRange1" @on-change="changeCollSuccRange1" style="width: 20%">
              <Option v-for="item in range1" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
            <Input v-model="form.collSuccRange1Value" clearable style="width: 20%; margin-left: 5px"></Input>%
            <Select v-model="form.collSuccRange2" :disabled="form.collSuccRange2Flag" style="width: 20%">
              <Option v-for="item in range2" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
            <Input v-model="form.collSuccRange2Value" clearable :disabled="form.collSuccRange2Flag" style="width: 20%; margin-left: 5px"></Input>%
          </FormItem>
        </Col>
        <Col span="4">
          <FormItem label="查询日期:">
            <DatePicker type="date" placeholder="--按日--" v-if="form.timeDimension == '按日'"></DatePicker>
            <DatePicker type="month" placeholder="--按月--" v-if="form.timeDimension == '按月'"></DatePicker>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="台区名称:">
            <Input v-model="form.tgName" clearable></Input>
          </FormItem>
        </Col>
        <Col span="10">
          <FormItem label="同期线损率:">
            <Select v-model="form.corPeriodLLRange1" @on-change="changeCorPeriodLLRange1" style="width: 20%">
              <Option v-for="item in range1" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
            <Input v-model="form.corPeriodLLRange1Value" clearable style="width: 20%; margin-left: 5px"></Input>%
            <Select v-model="form.corPeriodLLRange2" :disabled="form.corPeriodLLRange2Flag" style="width: 20%">
              <Option v-for="item in range2" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
            <Input v-model="form.corPeriodLLRange2Value" clearable :disabled="form.corPeriodLLRange2Flag" style="width: 20%; margin-left: 5px"></Input>%
          </FormItem>
        </Col>
        <Col span="4" class="withoutLabel">
          <FormItem>
            <Button type="primary">查询</Button>
          </FormItem>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <FormItem label="责任人工号:">
            <Input v-model="form.PicNo" clearable></Input>
          </FormItem>
        </Col>
        <Col span="10" class="withoutLabel">
          <FormItem>
            <CheckboxGroup v-model="form.checkBoxExpr" @on-change="changeCheckBoxExpr">
              <Checkbox label="不可算"></Checkbox>
              <Checkbox label="<=-1"></Checkbox>
              <Checkbox label="-1~0"></Checkbox>
              <Checkbox label="1~4"></Checkbox>
              <Checkbox label="4~7"></Checkbox>
              <Checkbox label="7~10"></Checkbox>
              <Checkbox label="10~15"></Checkbox>
              <Checkbox label=">15"></Checkbox>
            </CheckboxGroup>
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
  </div>
</template>
<script>
import Tables from '_c/tables'
export default {
  components: {
    Tables
  },
  data () {
    return {
      orgList: [
        { code: 0, name: '安徽省供电公司' },
        { code: 1, name: 'a市供电公司' },
        { code: 2, name: 'b市供电公司' },
        { code: 3, name: 'c市供电公司' }
      ],
      range1: [
        { code: 0, name: '大于' },
        { code: 1, name: '大于等于' },
        { code: 2, name: '等于' },
        { code: 3, name: '小于等于' },
        { code: 4, name: '小于' }
      ],
      range2: [
        { code: 0, name: '小于等于' },
        { code: 1, name: '小于' }
      ],
      columns: [
        {
          title: '供电单位',
          key: 'ORG_NAME',
          width: 120
        },
        {
          title: '台区编号',
          key: 'TG_NO',
          width: 120
        },
        {
          title: '台区名称',
          key: 'TG_NAME',
          width: 120
        },
        {
          title: '考核单元名称',
          key: 'CHKUNIT_NAME',
          width: 120
        },
        {
          title: '责任人工号',
          key: 'PRP_OPER_ID',
          width: 120
        },
        {
          title: '责任人名称',
          key: 'USER_NAME',
          width: 120
        },
        {
          title: '时间周期',
          key: 'STAT_DATE',
          width: 120
        },
        {
          title: '采集覆盖率',
          key: 'COVER_RATE',
          width: 120
        },
        {
          title: '采集成功率',
          key: 'SUCC_RATE',
          width: 120
        },
        {
          title: '供电量(kWh)',
          key: 'PPQ',
          width: 120
        },
        {
          title: '发行售电量(kWh)',
          key: 'FXSDL',
          width: 120
        },
        {
          title: '统计线损率(%)',
          key: 'STAT_LLR',
          width: 120
        },
        {
          title: '同期用电量',
          key: 'UPQ',
          width: 120
        },
        {
          title: '补全后用电量(kWh)',
          key: 'BQ',
          width: 120
        },
        {
          title: '同期线损率(%)',
          key: 'LINELOSS_RATE',
          width: 120
        },
        {
          title: '技术线损合理值(%)',
          key: 'JS',
          width: 120
        },
        {
          title: '不可算天数',
          key: 'BKS',
          width: 120
        },
        {
          title: '零电量表数',
          key: 'ZERO_Q_MET_CNT',
          width: 120
        },
        {
          title: '低电量表数1',
          key: 'LOW_Q1_MET_CNT',
          width: 120
        },
        {
          title: '低电量表数2',
          key: 'LOW_Q2_MET_CNT',
          width: 120
        },
        {
          title: '负载率',
          key: 'LOAD_RATE',
          width: 120
        },
        {
          title: '平均负载率',
          key: 'AVG_LOAD_RATE',
          width: 120
        },
        {
          title: '电压不平衡',
          key: 'A00118',
          width: 120
        },
        {
          title: '电流不平衡',
          key: 'A00112',
          width: 120
        },
        {
          title: 'A相负载率',
          key: 'IA_LOAD_RATE',
          width: 120
        },
        {
          title: 'B相负载率',
          key: 'IB_LOAD_RATE',
          width: 120
        },
        {
          title: 'C相负载率',
          key: 'IC_LOAD_RATE',
          width: 120
        },
        {
          title: '电能表飞走和突变',
          key: 'A00104',
          width: 120
        },
        {
          title: '电能表倒走',
          key: 'A00106',
          width: 120
        },
        {
          title: '电能表示值停走',
          key: 'A00107',
          width: 120
        },
        {
          title: '时钟偏差',
          key: 'A00108',
          width: 120
        },
        {
          title: '开表大盖',
          key: 'A00109',
          width: 120
        },
        {
          title: '磁场异常',
          key: 'A0010E',
          width: 120
        },
        {
          title: '在线监测率',
          key: 'IS_MONITOR',
          width: 120
        }
      ],
      tableData: [
        { ORG_NAME: 'aa' },
        { ORG_NAME: 'bb' },
        { ORG_NAME: 'cc' }
      ],
      nowData: [],
      current: 1,
      total: 0,
      pageSizeOpts: [5, 10, 20, 30, 40, 50],
      pageSize: 10,
      bottomTools: ['page', 'export'],
      form: {
        org: null,
        tgNo: null,
        tgName: null,
        PicNo: null,

        collCoverRange1: 3,
        collCoverRange1Value: null,
        collCoverRange2Flag: true,
        collCoverRange2: 0,
        collCoverRange2Value: null,

        collSuccRange1: 3,
        collSuccRange1Value: null,
        collSuccRange2Flag: true,
        collSuccRange2: 0,
        collSuccRange2Value: null,

        corPeriodLLRange1: 3,
        corPeriodLLRange1Value: null,
        corPeriodLLRange2Flag: true,
        corPeriodLLRange2: 0,
        corPeriodLLRange2Value: null,

        timeDimension: '按日',
        checkBoxExpr: []
      },
      ruleValidate: {}
    }
  },
  methods: {
    changeCollCoverRange1 () {
      if (this.form.collCoverRange1 === 2 || this.form.collCoverRange1 === 3 || this.form.collCoverRange1 === 4) {
        this.form.collCoverRange2Flag = true
      } else {
        this.form.collCoverRange2Flag = false
      }
    },
    changeCollSuccRange1 () {
      if (this.form.collSuccRange1 === 2 || this.form.collSuccRange1 === 3 || this.form.collSuccRange1 === 4) {
        this.form.collSuccRange2Flag = true
      } else {
        this.form.collSuccRange2Flag = false
      }
    },
    changeCorPeriodLLRange1 () {
      if (this.form.corPeriodLLRange1 === 2 || this.form.corPeriodLLRange1 === 3 || this.form.corPeriodLLRange1 === 4) {
        this.form.corPeriodLLRange2Flag = true
      } else {
        this.form.corPeriodLLRange2Flag = false
      }
    },
    changeCheckBoxExpr () {
      console.log(this.form.checkBoxExpr)
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
.tgLineLossDetail .ivu-form .ivu-select, .tgLineLossDetail .ivu-form .ivu-date-picker{
  width: 80%;
}
.tgLineLossDetail .ivu-form .ivu-form-item-content>.ivu-input-wrapper{
  width: 80%;
}
.tgLineLossDetail .ivu-table th, .tgLineLossDetail .ivu-table td{
  height: 40px;
  text-align: center;
}
.tgLineLossDetail .ivu-card-body{
  position: relative
}
.tgLineLossDetail .ivu-poptip{
  position: absolute;
  bottom: 16px;
  right: 80px;
  z-index: 999;
}
.tgLineLossDetail .ivu-card-body{
  padding: 16px;
}
.tgLineLossDetail .withoutLabel .ivu-form-item-content{
  margin-left: 50px !important;
}
</style>
