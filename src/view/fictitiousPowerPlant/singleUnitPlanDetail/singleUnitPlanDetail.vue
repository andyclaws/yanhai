<template>
  <div>
    <div class="header">
      <p><img src="./images/u2269.png" alt=""></p>
      <p><span>查询条件</span></p>
    </div>
    <div class="sup-search-box">
      <Form ref="formValidate" :model="searchItem" :label-width="120">
        <Row>
          <Col span="8">
            <FormItem label="机组名称:">
              <Select v-model="searchItem.unitSelectValue" style="width:200px">
                <Option v-for="item in unitOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="事件名称:">
              <Select v-model="searchItem.planSelectValue" style="width:200px">
                <Option v-for="item in planOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem>
              <div class="primary-btn" @click="handleSubmit('formValidate')">查询</div>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="unitcontent-box">
      <div class="unit-plan-info">
        <Card style="width:100%; height: 42%;">
          <div slot="title">
            <div><span>机组执行本次事件信息</span></div>
          </div>
          <div class="up_info">
            <div class="detail-box">
              <div>
                <p>机组名称：<span>机组A</span></p>
                <p>目标值：<span>500kW</span></p>
                <p>完成率：<span>100%</span></p>
                <p>结算金额：<span>20元</span></p>
                <p>日期：<span>2019年10月1日</span></p>
                <p style="width: 160px;">时间：<span>12:00:00 - 13:00:00</span></p>
              </div>
              <div>
                <p>事件名称：<span>事件A</span></p>
                <p>实际值：<span>500kW</span></p>
                <p>爬坡率：<span>2.5%/min</span></p>
              </div>
            </div>
          </div>
        </Card>
        <Card style="width:100%; height: 50%; margin-top: 20px">
          <div slot="title">
            <div><span>机组执行本次事件出力分解</span></div>
          </div>
          <div class="up_info_chart">
            <unit-plan-factor-charts :unitPlanFactorData="unitPlanFactorData"></unit-plan-factor-charts>
          </div>
        </Card>
      </div>
      <div class="unit-plan-monitor">
        <Card style="width:100%">
          <div slot="title">
            <!--<div><img src="./images/u2269.png" alt=""></div>-->
            <div><span>机组执行本次事件监测</span></div>
          </div>
          <div class="monitor_chart">
            <div class="monitor-title">
              <p>图形分析</p>
            </div>
            <unit-plan-monitor-charts></unit-plan-monitor-charts>
          </div>
          <div class="monitor_table">
            <div class="monitor-title m_table">
              <p>数据列表</p>
            </div>
            <div class="table-box">
              <Table border stripe :columns="unitMonitorColumns" :data="unitMonitorData"></Table>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/libs/api.request'
import unitPlanFactorCharts from './unitPlanFactorCharts'
import unitPlanMonitorCharts from './unitPlanMonitorCharts'
export default {
  // 组件名
  name: 'singleUnitPlanDetail',
  props: {},
  data () {
    return {
      searchItem: {
        unitSelectValue: '',
        planSelectValue: ''
      },
      unitOption: [
        {
          value: '机组A',
          label: '机组A'
        },
        {
          value: '机组B',
          label: '机组B'
        },
        {
          value: '机组C',
          label: '机组C'
        }
      ],
      planOption: [
        {
          value: '事件A',
          label: '事件A'
        },
        {
          value: '事件B',
          label: '事件B'
        },
        {
          value: '事件C',
          label: '事件C'
        }
      ],
      unitPlanFactorData: [ // 设备因子分类数据
        { value: 6600, name: '空调' },
        { value: 4500, name: '照明' },
        { value: 4000, name: '特殊' },
        { value: 2000, name: '动力' }
      ],
      unitMonitorColumns: [
        {
          title: '时间',
          key: '时间',
          width: '100px',
          align: 'center',
          className: 'first-row-column-date',
          render: (h, params) => {
            if (params.index == 0) {
              return h('div', { style: { width: '100px', height: '50px', background: '#f2f2f2', marginLeft: '-18px', lineHeight: '50px', fontWeight: 'bold' } }, '预测负荷')
            }
            if (params.index == 1) {
              return h('div', { style: { width: '100px', height: '50px', background: '#f2f2f2', marginLeft: '-18px', lineHeight: '50px', fontWeight: 'bold' } }, '实际负荷')
            }
          }
        },
        {
          title: '12:00',
          key: '12:00',
          align: 'center',
          width: '100'
        },
        {
          title: '12:10',
          key: '12:10',
          align: 'center',
          width: '100'
        },
        {
          title: '12:15',
          key: '12:15',
          align: 'center',
          width: '100'
        },
        {
          title: '12:30',
          key: '12:30',
          align: 'center',
          width: '100'
        },
        {
          title: '12:35',
          key: '12:35',
          align: 'center',
          width: '100'
        },
        {
          title: '12:40',
          key: '12:40',
          align: 'center',
          width: '100'
        },
        {
          title: '12:45',
          key: '12:45',
          align: 'center',
          width: '100'
        },
        {
          title: '12:50',
          key: '12:50',
          align: 'center',
          width: '100'
        },
        {
          title: '12:55',
          key: '12:55',
          align: 'center',
          width: '100'
        }
      ],
      unitMonitorData: [
        {
          '12:00': 22,
          '12:10': 34,
          '12:15': 6,
          '12:30': 78,
          '12:35': 89,
          '12:40': 25,
          '12:45': 34,
          '12:50': 82,
          '12:55': 18
        },
        {
          '12:00': 33,
          '12:10': 56,
          '12:15': 12,
          '12:30': 76,
          '12:35': 54,
          '12:40': 18,
          '12:45': 29,
          '12:50': 60,
          '12:55': 43
        }
      ],
      planNo: '',
      planName: ''
    }
  },
  components: {
    unitPlanFactorCharts,
    unitPlanMonitorCharts
  },
  mounted () {
    this.planNo = this.$route.params.planNo
    this.planName = this.$route.params.planName
    this.loadUnitPlantData(this.planNo, this.planName)
  },
  methods: {
    loadUnitPlantData (planNo, planName) {
      let params = {
        planNo: planNo,
        unitName: planName
      }
      axios.request({
        url: 'hpgec/unitSinglePlan',
        data: params,
        method: 'post'
      }).then(res => {
        console.log(55, res)
      })
    }
  },
  watch: {
    $route (to, from) {
      if (from.name === 'historyPowerGenerationEvent') {
        this.planNo = this.$route.params.planNo
        this.planName = this.$route.params.planName
        this.loadUnitPlantData(this.planNo, this.planName)
      }
    }
  }
}
</script>

<style lang="less">
  @import "singleUnitPlanDetail.less";
</style>
