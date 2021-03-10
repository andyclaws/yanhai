<template>
  <div class="tgLineLossMonitor">
    <Form ref="formValidate" :model="form" :rules="ruleValidate" :label-width="100">
      <Row>
        <Col span="6">
          <FormItem label="供电单位:" prop="orgName">
            <Select v-model="form.orgList" placeholder="--请选择供电单位--" clearable>
              <Option v-for="item in orgList" :value="item.code" :key="item.code">{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Col>
        <Col span="6">
          <FormItem label="指标类型:" prop="type">
            <Input v-model="form.tgNo" placeholder="--请输入指标类型--" clearable></Input>
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
    <h5>台区线损监测</h5>
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
import echarts from './echarts.vue'

export default {
  name: 'tgLineLossMonitor',
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
      current: 1, // 当前页
      pageSize: 5, // 每页显示多少条
      total: 0, // 总条数
      // 表格数据
      nowData: [],
      tableData: [],
      columns: [{
        title: '供电单位',
        key: 'org',
        width: 120
      }, {
        title: '1日',
        key: 'day1',
        width: 100
      }, {
        title: '2日',
        key: 'day2',
        width: 100
      }, {
        title: '3日',
        key: 'day3',
        width: 100
      }, {
        title: '4日',
        key: 'day4',
        width: 100
      }, {
        title: '5日',
        key: 'day5',
        width: 100
      }, {
        title: '6日',
        key: 'day6',
        width: 100
      }, {
        title: '7日',
        key: 'day7',
        width: 100
      }, {
        title: '8日',
        key: 'day8',
        width: 100
      }, {
        title: '9日',
        key: 'day9',
        width: 100
      }, {
        title: '10日',
        key: 'day10',
        width: 100
      }, {
        title: '11日',
        key: 'day11',
        width: 100
      }, {
        title: '12日',
        key: 'day12',
        width: 100
      }, {
        title: '13日',
        key: 'day13',
        width: 100
      }, {
        title: '14日',
        key: 'day14',
        width: 100
      }, {
        title: '15日',
        key: 'day15',
        width: 100
      }, {
        title: '16日',
        key: 'day16',
        width: 100
      }, {
        title: '17日',
        key: 'day17',
        width: 100
      }, {
        title: '18日',
        key: 'day18',
        width: 100
      }, {
        title: '19日',
        key: 'day19',
        width: 100
      }, {
        title: '20日',
        key: 'day20',
        width: 100
      }, {
        title: '21日',
        key: 'day21',
        width: 100
      }, {
        title: '22日',
        key: 'day22',
        width: 100
      }, {
        title: '23日',
        key: 'day23',
        width: 100
      }, {
        title: '24日',
        key: 'day24',
        width: 100
      }, {
        title: '25日',
        key: 'day25',
        width: 100
      }, {
        title: '26日',
        key: 'day26',
        width: 100
      }, {
        title: '27日',
        key: 'day27',
        width: 100
      }, {
        title: '28日',
        key: 'day28',
        width: 100
      }, {
        title: '29日',
        key: 'day29',
        width: 100
      }, {
        title: '30日',
        key: 'day30',
        width: 100
      }, {
        title: '31日',
        key: 'day31',
        width: 100
      }
      ],
      form: {
        orgList: '',
        tgNo: '',
        dateType: 'day'
      },
      orgList: [
        {
          code: '0',
          name: '合肥供电公司'
        },
        {
          code: '1',
          name: '南京供电公司'
        }
      ]
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
      // ruleValidate: {},
      // orgList: [],
      // dimensionList: [],
    }
  },
  methods: {
    _getData () {
      // 给数据
      this.tableData = []
      for (let i = 0; i < 25; i++) {
        let data = {
          org: '南京供电所',
          day1: '99',
          day2: '99',
          day3: '99',
          day4: '99',
          day5: '99',
          day6: '99',
          day7: '99',
          day8: '99',
          day9: '99',
          day10: '99',
          day11: '99',
          day12: '99',
          day13: '99',
          day14: '99',
          day15: '99',
          day16: '99',
          day17: '99',
          day18: '99',
          day19: '99',
          day20: '99',
          day21: '99',
          day22: '99',
          day23: '99',
          day24: '99',
          day25: '99',
          day26: '99',
          day27: '99',
          day28: '99',
          day29: '99',
          day30: '99',
          day31: '99'

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
  created () {
    this._getData()
  }
}
</script>
<style>
  .tgLineLossMonitor .ivu-form .ivu-select, .tgLineLossMonitor .ivu-form .ivu-date-picker{
    width: 80%;
  }
  .tgLineLossMonitor .ivu-form .ivu-form-item-content>.ivu-input-wrapper{
    width: 80%;
  }
  .tgLineLossMonitor .ivu-table th, .tgLineLossMonitor .ivu-table td{
    height: 40px;
    text-align: center;
  }
  .tgLineLossMonitor .ivu-card-body{
    position: relative
  }
  .tgLineLossMonitor .ivu-poptip{
    position: absolute;
    bottom: 16px;
    right: 80px;
    z-index: 999;
  }
  .tgLineLossMonitor .ivu-card-body{
    padding: 16px;
  }
  .tgLineLossMonitor .withoutlabel .ivu-form-item-content{
    margin-left: 50px !important;
  }

</style>
