<template>
  <div
    class="loadExecutionDecomposition"
    style="position: relative"
    id="loadExecutionDecomposition"
  >
    <Card class="loadExecutionDecomposition-contain">
      <div slot="title" class="loadExecutionDecomposition-contain-header">
        <img src="../historyPowerGenerationEvent/images/u2269.png" />
        <p>负荷执行分解</p>
      </div>
      <!-- 发电事件基本信息 -->
      <div class="machineName">
        <div class="machineName-body">
          <div class="machineName-title">发电事件基本信息</div>
          <Row>
            <i-col span="5">
              <div class="box1">
                <span>当前事件：</span>
                <span>{{machineNameList.eventNo}}</span>
              </div>
            </i-col>
            <i-col span="5">
              <div class="box1">
                <span>开始时间：</span>
                <span>{{machineNameList.beginTime}}</span>
              </div>
            </i-col>
            <i-col span="5">
              <div class="box1">
                <span>结束时间：</span>
                <span>{{machineNameList.endTime}}</span>
              </div>
            </i-col>
            <i-col span="5">
              <div class="box1">
                <span>当前时间：</span>
                <span>{{machineNameList.currentTime}}</span>
              </div>
            </i-col>
            <i-col span="4">
              <div class="box1">
                <span>执行模式：</span>
                <span>{{machineNameList.mode}}</span>
              </div>
            </i-col>
          </Row>
        </div>
      </div>
      <!-- 执行分解计划 || 执行情况 -->
      <Row>
        <i-col span="12">
          <!-- 执行分解计划 -->
          <Card class="executeBreakdownPlan">
            <div slot="title" class="executeBreakdownPlan-header">
              <img src="../historyPowerGenerationEvent/images/u2269.png" />
              <p>执行分解计划</p>
            </div>
            <div class="executeBreakdown-form">
              <i-table border :columns="loadAnalysisColumns" :data="loadAnalysisData" height="200"></i-table>
            </div>
          </Card>
        </i-col>
        <i-col span="12">
          <!-- 执行情况 -->
          <Card class="loadAnalysisOne">
            <div slot="title" class="header">
              <img src="../historyPowerGenerationEvent/images/u2269.png" />
              <p>执行情况</p>
            </div>
            <Row class="loadAnalysisOne-right">
              <i-col span="8">
                <div class="loadAnalysisOne-right-box1">
                  <span>目标值:</span>
                  <span>{{loadAnalysisList.targetValue}}</span>
                </div>
              </i-col>
              <i-col span="8">
                <div class="loadAnalysisOne-right-box1">
                  <span>完成值:</span>
                  <span>{{loadAnalysisList.finishValue}}</span>
                </div>
              </i-col>
              <i-col span="8">
                <div class="loadAnalysisOne-right-box1">
                  <span>完成率:</span>
                  <span>{{loadAnalysisList.finishRate}}</span>
                </div>
              </i-col>
            </Row>
            <loadAnalysisOneEchart :totalData="totalData" />
          </Card>
        </i-col>
      </Row>
      <!-- 实际在控机组 -->
      <Row>
        <i-col span="24">
          <Card class="actualControlUnit">
            <div slot="title" class="actualControlUnit-header">
              <img src="../historyPowerGenerationEvent/images/u2269.png" alt />
              <p>实际在控机组</p>
              <div class="actualControlUnit-box">
                <span @click="btn1" :class="{active:!isActive}">表格</span>
                <span @click="btn2" :class="{active:isActive}">图表</span>
              </div>
            </div>
            <!-- 表格 -->
            <div class="actualControlForm" v-show="!isShow">
              <i-table
                border
                :columns="actualControlColumns"
                :data="actualControlData"
                width="80px"
                height="180"
              ></i-table>
            </div>
            <!--echart图  -->
            <div>
              <actualControlUnitEchart v-show="isShow" :actualControlData="actualControlData" />
              <div class="right-icon-box" v-show="showBox">
                <span>图例完成率</span>
                <div class="icon-box1">
                  <h5></h5>
                  <h4>100%</h4>
                </div>
                <div class="icon-box1 icon-box2">
                  <h5></h5>
                  <h4>(0%,100%)</h4>
                </div>
                <div class="icon-box1 icon-box3">
                  <h5></h5>
                  <h4>0%</h4>
                </div>
              </div>
            </div>
          </Card>
        </i-col>
      </Row>
    </Card>
  </div>
</template>

<script>
import echarts from 'echarts'
import axios from '@/libs/api.request'
import { off, on } from '@/libs/tools'
import LoadAnalysisOneEchart from './loadAnalysisOneEchart.vue'
import ActualControlUnitEchart from './actualControlUnitEchart.vue'
export default {
  name: 'loadExecutionDecomposition',
  components: {
    LoadAnalysisOneEchart,
    ActualControlUnitEchart,
    axios
  },
  props: {},
  data () {
    return {
      machineNameList: {
        eventNo: '',
        beginTime: '',
        endTime: '',
        currentTime: '',
        mode: 'ADR'
      },
      loadAnalysisList: {
        targetValue: '',
        finishValue: '',
        finishRate: ''
      },
      loading: false,
      eventId: '',
      isActive: true,
      isShow: true,
      showBox: true,
      loadAnalysisColumns: [
        {
          title: '序号',
          key: 'serialNumber',
          type: 'index',
          align: 'center',
          width: '75'
        },
        {
          title: '机组名称',
          key: 'unitName',
          align: 'center',
          width: '120'
        },
        {
          title: '开始时间',
          key: 'beginTime',
          width: '200',
          align: 'center'
        },
        {
          title: '结束时间',
          key: 'endTime',
          width: '200',
          align: 'center'
        },
        {
          title: '执行模式',
          key: 'mode',
          width: '120',
          align: 'center'
        },
        {
          title: '目标值',
          key: 'targetValue',
          align: 'center',
          width: '120'
        }
      ],
      loadAnalysisData: [],
      actualControlColumns: [
        {
          title: '序号',
          type: 'index',
          key: 'serialNumber',
          align: 'center',
          width: '75'
        },
        {
          title: '机组名称',
          key: 'unitName',
          align: 'center',
          width: '120'
        },
        {
          title: '开始时间',
          key: 'beginTime',
          align: 'center',
          width: '190'
        },
        {
          title: '预计结束时间',
          key: 'endTimeF',
          align: 'center',
          width: '190'
        },
        {
          title: '执行模式',
          key: 'mode1',
          align: 'center',
          width: '120'
        },
        {
          title: '实时负荷',
          key: 'prt',
          align: 'center',
          width: '120'
        },
        {
          title: '目标值',
          key: 'targetValue',
          align: 'center',
          width: '120'
        },
        {
          title: '完成值',
          key: 'finishValue',
          align: 'center',
          width: '120'
        },
        {
          title: '完成率',
          key: 'finishRate',
          align: 'center',
          width: '120'
        }
      ],
      actualControlData: [],
      totalData: {}
    }
  },

  mounted () {
    let _this = this
    _this.$nextTick(() => {
      _this.getMachineNameData()
      // _this.getExecuteBreakdownPlanData()
    })
  },
  methods: {
    btn1 () {
      this.isShow = !this.isShow
      this.isActive = !this.isActive
      this.showBox = false
    },
    btn2 () {
      this.isShow = !this.isShow
      this.isActive = !this.isActive
      this.showBox = !this.showBox
    },
    // 发电事件基本信息
    getMachineNameData () {
      var _this = this
      axios
        .request({
          method: 'get',
          url: 'ldedc/loadEventBaseInfo'
        })
        .then(res => {
          console.log(res)
          if (res.data.code === 200 && res.data.data !== null) {
            _this.machineNameList = res.data.data
            let eventId = res.data.data.eventNo
            _this.eventId = eventId
            console.log(_this.eventId)
            _this.getLoadAnalysisData(_this.eventId)
            _this.getActualControlUnitData(_this.eventId)
            _this.getExecuteBreakdownPlanData(_this.eventId)
          } else {
          }
        })
        .catch(err => {
          console.log('err:' + err)
        })
    },
    // 执行分解计划
    getExecuteBreakdownPlanData (eventId) {
      var _this = this
      axios
        .request({
          method: 'post',
          data: eventId,
          url: 'ldedc/loadUnitBaseInfo'
        })
        .then(res => {
          // console.log(res)
          if (res.data.code === 200 && res.data.data !== null) {
            _this.loadAnalysisData = res.data.data
          }
        })
        .catch(err => {
          console.log('err:' + err)
        })
    },
    // 执行情况
    getLoadAnalysisData (eventId) {
      var _this = this
      axios
        .request({
          method: 'post',
          data: eventId,
          url: 'ldedc/loadExecutionDecompositionQuery'
        })
        .then(res => {
          // console.log(res);
          if (res.data.code === 200 && res.data.data !== null) {
            _this.loadAnalysisList.targetValue = res.data.data.targetValue
            _this.loadAnalysisList.finishValue = res.data.data.finishValue
            _this.loadAnalysisList.finishRate = res.data.data.finishRate
            _this.totalData = res.data.data
            // console.log(_this.totalData)
          }
        })
        .catch(err => {
          console.log('err:' + err)
        })
    },
    // 实际在控机组
    getActualControlUnitData (eventId) {
      var _this = this
      axios
        .request({
          method: 'post',
          data: eventId,
          url: 'ldedc/loadrealityBaseInfo'
        })
        .then(res => {
          console.log(res)
          if (res.data.code === 200 && res.data.data !== null) {
            _this.actualControlData = res.data.data
            console.log(_this.actualControlData)
          }
        })
        .catch(err => {
          console.log('err:' + err)
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import "loadExecutionDecomposition.less";
.active {
  background: #009999;
  color: #fff !important;
}
</style>
