<template>
  <div class="tgLineLossStatical">
    <Form ref="formValidate" :model="form" :rules="ruleValidate" :label-width="100">
      <Row>
        <Col span="6">
          <FormItem label="供电单位:" prop="orgName">
            <Select v-model="form.orgName" placeholder="--请选择供电单位--" clearable>
              <Option v-for="item in orgList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="线损维度:" prop="dimension">
            <Select v-model="form.dimension" placeholder="--全部--" clearable>
              <Option v-for="item in dimensionList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="10" class="withoutlabel">
          <FormItem>
            <RadioGroup v-model="form.dateType">
              <Radio label="day"><span>按日统计</span></Radio>
              <Radio label="month"><span>按月统计</span></Radio>
            </RadioGroup>
            <DatePicker v-if="form.dateType=='day'" label="查询日期:" prop="day" style="width: 40%;" type="date" placeholder="--请选择--" :options="options"></DatePicker>
            <DatePicker v-if="form.dateType=='month'" label="查询日期:" prop="month" style="width: 40%;" type="month" v-model="form.month" placeholder="--请选择--"></DatePicker>
          </FormItem>
        </Col>
        <Col>
          <FormItem>
          <Button type="primary" @click="handleSubmit('formValidate')">{{$t('inquiry')}}</Button>
        </FormItem>
        </Col>
      </Row>
    </Form>
    <echarts></echarts>
    <card class="my-card">
      <h5>台区线损分段统计</h5>
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
import echarts from './echarts.vue'

export default {
  name: 'tgLineLossStatical',
  components: {
    Tables,
    echarts
  },
  data () {
    return {
      // flag: 1, // 切换视图的标识
      // showflag: 1,
      // split1: 0.75,
      pageSizeOpts: [2, 5, 10, 20, 40, 100],
      bottomTools: ['page', 'export'],
      // 分页
      pageSize: 5, // 每页显示多少条
      total: 0, // 总条数
      current: 1, // 当前页
      // 表格数据
      nowData: [],
      tableData: [],
      columns: [{
        title: '供电单位',
        key: 'org',
        width: 120
      }, {
        title: '台区数',
        key: 'sum',
        width: 120
      }, {
        title: '台区数',
        key: 'num',
        width: 120
      }, {
        title: '占比(%)',
        key: 'proportion',
        width: 120
      }, {
        title: '小于-1',
        key: 'interval1',
        width: 120
      }, {
        title: '大于等于-1小于0',
        key: 'interval2',
        width: 120
      }, {
        title: '大于等于0小于4',
        key: 'interval3',
        width: 120
      }, {
        title: '大于等于4小于7',
        key: 'interval4',
        width: 120
      }, {
        title: '大于等于7小于10',
        key: 'interval5',
        width: 120
      }, {
        title: '大于等于10小于15',
        key: 'interval6',
        width: 120
      }, {
        title: '大于等于15',
        key: 'interval7',
        width: 120
      }, {
        title: '日期',
        key: 'data',
        width: 120
      }
      ],
      // orgList: [
      //   {
      //     code: '合肥供电公司',
      //     name: '合肥供电公司'
      //   },
      //   {
      //     code: '南京供电公司',
      //     name: '南京供电公司'
      //   }
      // ],
      // tableData: [
      //   {
      //     org:"南京供电单位"
      //   },
      //   {
      //     org: "南京供电单位"
      //   },
      //   {
      //     org: "南京供电单位"
      //   },
      //   {
      //     org: "南京供电单位"
      //   }
      // ],
      // current: 1,
      // total: 5,
      // pageSizeOpts: [5, 10, 20, 30, 40, 50],
      // pageSize: 5,
      // bottomTools: ['page', 'export'],
      form: {
        orgName: '',
        dimension: '',
        dateType: 'day'
      },
      ruleValidate: {},
      orgList: [],
      dimensionList: []
    }
  },
  methods: {
    _getData () {
      // 给数据
      this.tableData = []
      for (let i = 0; i < 25; i++) {
        let data = {
          // TG_NO: i
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
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    }
    // tabSelected (name) {
    //   this.flag = name
    // }
  },
  mounted () {
    this._getData()
  }
}
</script>
<style>
  .tgLineLossStatical .ivu-form .ivu-select, .tgLineLossStatical .ivu-form .ivu-date-picker{
    width: 80%;
  }
  .tgLineLossStatical .ivu-form .ivu-form-item-content>.ivu-input-wrapper{
    width: 80%;
  }
  .tgLineLossStatical .ivu-table th, .tgLineLossStatical .ivu-table td{
    height: 40px;
    text-align: center;
  }
  .tgLineLossStatical .ivu-card-body{
    position: relative
  }
  .tgLineLossStatical .ivu-poptip{
    position: absolute;
    bottom: 16px;
    right: 80px;
    z-index: 999;
  }
  .tgLineLossStatical .ivu-card-body{
    padding: 16px;
  }
  .tgLineLossStatical .withoutlabel .ivu-form-item-content{
    margin-left: 50px !important;
  }

</style>
