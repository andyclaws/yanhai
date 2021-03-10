<template>
  <div class="controlPractice" style="position: relative" id="controlPractice">
    <Card class="controlPractice-container">
      <div slot="title" class="controlPractice-container-header">
        <img src="../historyPowerGenerationEvent/images/u2269.png" alt />
        <p>控制演练</p>
      </div>
      <Row class="header-rightBox">
        <i-col span="12">
          <div class="container-header-box-left">
            <img src="./images/u22288.png" />
            <span @click="historyPracticeEvent">历史演练</span>
            <span>|</span>
          </div>
        </i-col>
        <i-col span="12">
          <div class="container-header-box-left container-header-box-right">
            <img src="./images/u22293.png" />
            <span @click="exportHistoryPracticeEvent">导出演练</span>
          </div>
        </i-col>
      </Row>
      <!-- 演练事件基本信息 -->
      <div class="practiceName">
        <div class="practiceName-title">
          <span>演练事件基本信息</span>
        </div>
        <Row class="practiceName-container">
          <i-col span="5">
            <span>当前事件:&nbsp;</span>
            <i-select style="max-width:150px; width:50%;" v-model="testValue" @on-change="changeEventName">
              <i-option
                v-for="(item,index) in list"
                :value="item.eventNo"
                :key="index"
              >{{ item.eventName }}</i-option>
            </i-select>
          </i-col>
          <i-col span="5">
            <span>开始时间:&nbsp;</span>
            <span>{{basicInfoList.beginTime}}</span>
          </i-col>
          <i-col span="5">
            <span>结束时间:&nbsp;</span>
            <span>{{basicInfoList.endTime}}</span>
          </i-col>
          <i-col span="5">
            <span>演练当前时间:&nbsp;</span>
            <span>{{basicInfoList.nowTime}}</span>
          </i-col>
          <i-col span="4">
            <span>执行模式:&nbsp;</span>
            <span>{{basicInfoList.planMode}}</span>
          </i-col>
        </Row>
      </div>
      <!-- 演练策略||演练情况 -->
      <Row class="controlPractice-top">
        <i-col span="12">
          <!-- 演练策略 -->
          <Card class="controlexecuteBreakdownPlan">
            <div slot="title" class="executeBreakdownPlan-header">
              <img src="../historyPowerGenerationEvent/images/u2269.png" alt />
              <p>演练策略</p>
            </div>
            <div class="executeBreakdownPlan-box">
              <div class="radio">
                <p>|||演练策略:</p>
                <RadioGroup v-model="radioValue" @on-change="selectRadioValue">
                  <Radio label="调控成本最小">
                    <span>调控成本最小</span>
                  </Radio>
                  <Radio label="调控机组最少">
                    <span>调控机组最少</span>
                  </Radio>
                  <Radio label="舒适度影响最小">
                    <span>舒适度影响最小</span>
                  </Radio>
                </RadioGroup>
              </div>
              <div class="input">
                <span>备用容量(至少)：</span>
                <i-input placeholder="请输入..." style="width: 150px" v-model="backupValue"></i-input>
                <i-button type="primary" class="inputBtn" @click="startPractice">开始演练</i-button>
              </div>
              <div class="decompositionPlan-title">
                <span>|||</span>
                <span>备用信息</span>
              </div>
            </div>
            <div class="decompositionPlanTable">
              <i-table
                border
                :columns="breakdownPlan.columns"
                :data="breakdownPlan.data"
                height="100"
              ></i-table>
            </div>
          </Card>
        </i-col>
        <i-col span="12">
          <!-- 演练情况 -->
          <Card class="rehearseSituation">
            <div slot="title" class="rehearseSituation-header">
              <img src="../historyPowerGenerationEvent/images/u2269.png" alt />
              <p>演练情况</p>
            </div>
            <Row class="rehearseSituation-span">
              <i-col span="8">
                <div class="rehearseSituation-right-box1">
                  <span>目标值:</span>
                  <span>{{rehearseSituationList.planValue}}</span>
                </div>
              </i-col>
              <i-col span="8">
                <div class="rehearseSituation-right-box1">
                  <span>完成值:</span>
                  <span>{{rehearseSituationList.actualValue}}</span>
                </div>
              </i-col>
              <i-col span="8">
                <div class="rehearseSituation-right-box1">
                  <span>完成率:</span>
                  <span>{{rehearseSituationList.finishRate}}</span>
                </div>
              </i-col>
            </Row>
            <RehearseSituationEchart :totalData="totalData" />
          </Card>
        </i-col>
      </Row>
      <!-- 控制演练计划 -->
      <Card class="actualControlUnitSecond">
        <div slot="title" class="actualControlUnitSecond-header">
          <img src="../historyPowerGenerationEvent/images/u2269.png" alt />
          <p>控制演练计划</p>
          <div class="actualControlUnitSecond-box">
            <span @click="btn1" :class="{active:isActive}">表格</span>
            <span @click="btn2" :class="{active:!isActive}">图表</span>
          </div>
        </div>
        <!-- 图表 -->
        <div class="actualControlUnitSecond-echart-box" v-show="isShow1">
          <ActualControlUnit :actualControl="actualControl" />
          <div class="right-icon-box">
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
        <!-- 表格 -->
        <div class="decompositionPlan" v-show="!isShow1">
          <i-table
            border
            :columns="decompositionPlan.columns"
            :data="decompositionPlan.data"
            height="200"
          ></i-table>
        </div>
      </Card>
    </Card>
    <!-- 历史演练 -->
    <Modal
      width="750"
      draggable
      footer-hide
      title="历史演练事件"
      :value="showHistoryPracticeEvent"
      @on-visible-change="closeModal($event)"
    >
      <div class="historyPracticeEvent">
        <div class="historyPracticeEvent-top">
          <span>演练执行时间从</span>
          <Date-picker
              type="date"
              placeholder="选择日期"
              style="width: 150px"
              v-model="searchList.planStartDate"
              @on-change="inputPlanStartDate"
              format="yyyy-MM-dd"
            ></Date-picker>
          <span>至</span>
          <Date-picker
              type="date"
              placeholder="选择日期"
              style="width: 150px"
              v-model="searchList.planEndDate"
              @on-change="inputPlanEndDate"
              format="yyyy-MM-dd"
            ></Date-picker>
          <i-button class="historyPracticeEvent-top-btn" @click="topPanelQuery">查询</i-button>
        </div>
        <div class="historyPracticeEvent-table">
          <span>|||</span>
          <span>演练事件</span>
          <Tables
            border
            ref="selectedTable"
            :columns="historyPractice.columns"
            :axiosData="historyPractice.data"
            :axiosUrl="historyPractice.axiosUrl"
            @on-load-data="onSelectedLoadData"
            @on-load-data-page-info="onSelectedLoadDataPageInfo"
            height="230"
          ></Tables>
        </div>
      </div>
    </Modal>
    <!-- 导出演练事件 -->
    <Modal
      width="800"
      draggable
      footer-hide
      title="导出演练详情"
      :value="showExportHistoryPracticeEvent"
      @on-visible-change="closeModal($event)"
    >
      <div class="exportHistoryPracticeEvent">
        <div class="exportHistoryPracticeEvent-top">
          <Row>
            <i-col span="12">
              <span>演练事件：</span>
              <span>{{PracticeEvent}}</span>
            </i-col>
          </Row>
        </div>
        <div class="exportHistoryPracticeEvent-table">
          <span>|||</span>
          <span>演练详情</span>
          <Tables
            border
            ref="selectedTable2"
            :columns="exportHistory.columns"
            :axiosData="exportHistory.data"
            :axiosUrl="exportHistory.axiosUrl"
            @on-load-data="onSelectedLoadData"
            @on-load-data-page-info="onSelectedLoadDataPageInfo"
            height="230"
          ></Tables>
        </div>
      </div>
    </Modal>

    <!-- 详情 -->
    <Modal
      width="800"
      draggable
      footer-hide
      title="导出演练详情"
      :value="showDetailsBox"
      @on-visible-change="closeModal2($event)"
    >
      <div class="exportHistoryPracticeEvent showDetailsBox">
        <div class="exportHistoryPracticeEvent-top">
          <Row>
            <i-col span="12">
              <span>演练事件：</span>
              <span>{{PracticeEvent}}</span>
            </i-col>
          </Row>
        </div>
        <div class="exportHistoryPracticeEvent-table">
          <span>|||</span>
          <span>演练详情</span>
          <Tables
            border
            ref="selectedTable3"
            :columns="exportHistory2.columns"
            :axiosData="exportHistory2.data"
            :axiosUrl="exportHistory2.axiosUrl"
            @on-load-data="onSelectedLoadData"
            @on-load-data-page-info="onSelectedLoadDataPageInfo"
            height="230"
          ></Tables>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables'
import axios from '@/libs/api.request'
import RehearseSituationEchart from './rehearseSituationEchart.vue'
import ActualControlUnit from './actualControlUnit.vue'
import { getFormatDate, formatDate } from '@/libs/index'
export default {
  name: 'controlPractice',
  components: {
    Tables,
    axios,
    RehearseSituationEchart,
    ActualControlUnit
  },
  props: {},
  data () {
    return {
      current: 1,
      pageSize: 25,
      total: 0,
      selectedResultLoading: false,
      planNumber: '', // 导出演练事件名
      historyPlanNumber: '', // 历史演练事件名
      PracticeEvent: '',
      searchList: {
        currPage: 1,
        pageSize: 10,
        planStartDate: '',
        planEndDate: ''
      },
      searchList2: {
        currPage: 1,
        pageSize: 10,
        planNo: ''
      },
      totalData: {},
      actualControl: [],
      testValue: '',
      radioValue: '',
      backupValue: '',
      list: [],
      rehearseSituationList: {
        planValue: '',
        actualValue: '',
        finishRate: ''
      },
      basicListData: [],
      isActive: true,
      isShow1: true,
      historyDetails: false,
      showHistoryPracticeEvent: false,
      showExportHistoryPracticeEvent: false,
      showDetailsBox: false,
      // 基本信息
      basicInfoList: {
        beginTime: '',
        endTime: '',
        planMode: '',
        nowTime: ''
      },
      historyPractice: {
        columns: [
          {
            title: '序号',
            type: 'index',
            key: 'number',
            width: '75',
            align: 'center'
          },
          {
            title: '事件编号',
            key: 'planNo',
            width: '120',
            align: 'center'
          },
          {
            title: '演练执行时间',
            key: 'planStartDate',
            width: '100',
            align: 'center'
          },
          {
            title: '演练控制策略',
            key: 'planReason',
            width: '100',
            align: 'center'
          },
          {
            title: '演练执行详情',
            key: 'rehearsalExecutionDetails',
            width: '100',
            align: 'center',
            render: (h, params) => {
              return h(
                'a',
                {
                  props: {
                    href: '#',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.goToDetail(params)
                    }
                  }
                },
                '详情'
              )
            }
          }
        ],
        data: {},
        axiosUrl: 'cdc/historicalDrillEvents'
      },
      exportHistory: {
        columns: [
          {
            title: '序号',
            type: 'index',
            key: 'number',
            width: '70',
            align: 'center'
          },
          {
            title: '机组名称',
            key: 'unitNo',
            width: '100',
            align: 'center'
          },
          {
            title: '开始时间',
            key: 'planStartDate',
            width: '100',
            align: 'center'
          },
          {
            title: '结束时间',
            key: 'planEndDate',
            width: '100',
            align: 'center'
          },
          {
            title: '执行模式',
            key: 'planMode',
            width: '100',
            align: 'center'
          },
          {
            title: '目标值',
            key: 'unitPlanValue',
            width: '80',
            align: 'center'
          },
          {
            title: '完成值',
            key: 'unitActualValue',
            width: '80',
            align: 'center'
          },
          {
            title: '完成率',
            key: 'unitFinishRate',
            width: '80',
            align: 'center'
          }
        ],
        data: {},
        axiosUrl: 'cdc/drillEventsDetails'
      },
      exportHistory2: {
        columns: [
          {
            title: '序号',
            type: 'index',
            key: 'number',
            width: '70',
            align: 'center'
          },
          {
            title: '机组名称',
            key: 'unitNo',
            width: '100',
            align: 'center'
          },
          {
            title: '开始时间',
            key: 'planStartDate',
            width: '100',
            align: 'center'
          },
          {
            title: '结束时间',
            key: 'planEndDate',
            width: '100',
            align: 'center'
          },
          {
            title: '执行模式',
            key: 'planMode',
            width: '100',
            align: 'center'
          },
          {
            title: '目标值',
            key: 'unitPlanValue',
            width: '80',
            align: 'center'
          },
          {
            title: '完成值',
            key: 'unitActualValue',
            width: '80',
            align: 'center'
          },
          {
            title: '完成率',
            key: 'unitFinishRate',
            width: '80',
            align: 'center'
          }
        ],
        data: {},
        axiosUrl: 'cdc/drillEventsDetails'
      },
      breakdownPlan: {
        columns: [
          {
            title: '序号',
            type: 'index',
            key: 'serialNumber',
            align: 'center',
            width: '65'
          },
          {
            title: '机组名称',
            key: 'unitName',
            align: 'center',
            width: '160'
          },
          {
            title: '开始时间',
            key: 'planStartDate',
            align: 'center',
            width: '100'
          },
          {
            title: '结束时间',
            key: 'planEndDate',
            align: 'center',
            width: '100'
          },
          {
            title: '执行模式',
            key: 'planMode',
            align: 'center',
            width: '100'
          },
          {
            title: '下调裕度(kW)',
            key: 'downAdjEnergy',
            align: 'center',
            width: '140'
          }
        ],
        data: []
      },
      decompositionPlan: {
        columns: [
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
            key: 'planStartDate',
            align: 'center',
            width: '120'
          },
          {
            title: '结束时间',
            key: 'planEndDate',
            align: 'center',
            width: '120'
          },
          {
            title: '执行模式',
            key: 'planMode',
            align: 'center',
            width: '120'
          },
          {
            title: '目标值',
            key: 'unitPlanValue',
            align: 'center',
            width: '120'
          },
          {
            title: '完成值',
            key: 'unitActualValue',
            align: 'center',
            width: '120'
          },
          {
            title: '完成率',
            key: 'unitFinishRate',
            align: 'center',
            width: '120'
          }
        ],
        data: []
      }
    }
  },
  mounted () {
    this.getNowEventListData() // 当前事件下拉框
  },
  methods: {
    inputPlanStartDate (val) {
      this.searchList.planStartDate = val
    },
    inputPlanEndDate (val) {
      this.searchList.planEndDate = val
    },
    btn1 () {
      this.isShow1 = !this.isShow1
      this.isActive = !this.isActive
    },
    btn2 () {
      this.isShow1 = !this.isShow1
      this.isActive = !this.isActive
    },
    // 历史演练
    historyPracticeEvent () {
      this.showHistoryPracticeEvent = true
      this.topPanelQuery()
    },
    // 演练详情
    exportHistoryPracticeEvent () {
      this.showExportHistoryPracticeEvent = true
      // this.getOutPracticeData()
      this.topPanelQuery2()
      this.PracticeEvent = this.planNumber
    },
    closeModal (val) {
      if (val === false) {
        this.showHistoryPracticeEvent = false
        this.showExportHistoryPracticeEvent = false
      }
    },
    closeModal2 (val) {
      if (val === false) {
        this.showDetailsBox = false
      }
    },
    // 历史演练里的详情按钮
    goToDetail (data) {
      this.showHistoryPracticeEvent = false
      this.showDetailsBox = true
      this.topPanelQuery3()
      let planNo2 = data.row.planNo
      this.historyPlanNumber = planNo2
      this.PracticeEvent = this.historyPlanNumber
      console.log(planNo2)
    },

    // 当前事件下拉框
    getNowEventListData () {
      var _this = this
      axios
        .request({
          method: 'post',
          url: 'cdc/drillEventChoose'
        })
        .then(res => {
          // console.log(res);
          if (res.data.code === 200) {
            for (let i = 0; i < res.data.data.length; i++) {
              let listData = {}
              listData.eventNo = res.data.data[i].eventNo
              listData.eventName = res.data.data[i].eventName
              _this.list.push(listData)
              let basicData = {}
              basicData.beginTime = res.data.data[i].beginTime
              basicData.endTime = res.data.data[i].endTime
              basicData.planMode = res.data.data[i].planMode
              _this.basicListData.push(basicData)
            }
            // console.log(_this.list);
            // console.log(_this.basicListData);
          }
        })
    },

    // 选择下拉框的值
    changeEventName (val) {
      // console.log(val);
      for (let i = 0; i < this.list.length; i++) {
        for (let i = 0; i < this.basicListData.length; i++) {
          if (val === this.list[i].eventNo) {
            this.planNumber = this.list[i].eventNo

            this.basicInfoList.beginTime = this.basicListData[i].beginTime
            this.basicInfoList.endTime = this.basicListData[i].endTime
            this.basicInfoList.planMode = this.basicListData[i].planMode
            let nowDate =
              getFormatDate(new Date().getHours()) +
              ':' +
              getFormatDate(new Date().getMinutes())
            this.basicInfoList.nowTime = nowDate
          }
        }
      }
    },

    // 演练策略单选框
    selectRadioValue (val) {
      console.log(val)
      this.radioValue = val
    },

    // 开始演练按钮
    startPractice () {
      var _this = this
      _this.breakdownPlan.data = []
      _this.decompositionPlan.data = []
      _this.actualControl = []
      let data = {
        backupValue: _this.backupValue,
        planNo: _this.testValue,
        planReason: _this.radioValue
      }
      console.log(data)
      axios
        .request({
          method: 'post',
          data: data,
          url: 'cdc/generationStrategy'
        })
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            // _this.tradeOffStatusList = res.data.data;
          }
        })
      this.getBackupValueData() // 备用信息接口
      this.getRehearseSituationData() // 演练情况
    },

    // 备用信息接口
    getBackupValueData () {
      var _this = this
      let data = {
        backupValue: _this.backupValue,
        planNo: _this.testValue,
        planReason: _this.radioValue
      }
      console.log(data)
      axios
        .request({
          method: 'post',
          data: data,
          url: 'cdc/backUpInfo'
        })
        .then(res => {
          console.log(res)
          if (res.data.code === 200) {
            for (let i = 0; i < res.data.data.length; i++) {
              let dataList1 = {}
              dataList1.unitName = res.data.data[i].unitName
              dataList1.planStartDate = res.data.data[i].planStartDate
              dataList1.planEndDate = res.data.data[i].planEndDate
              dataList1.planMode = res.data.data[i].planMode
              dataList1.downAdjEnergy = res.data.data[i].downAdjEnergy
              _this.breakdownPlan.data.push(dataList1)

              let dataList2 = {}
              dataList2.unitName = res.data.data[i].unitName
              dataList2.planStartDate = res.data.data[i].planStartDate
              dataList2.planEndDate = res.data.data[i].planEndDate
              dataList2.planMode = res.data.data[i].planMode
              dataList2.unitPlanValue = res.data.data[i].unitPlanValue
              dataList2.unitActualValue = res.data.data[i].unitActualValue
              dataList2.unitFinishRate = res.data.data[i].unitFinishRate
              _this.decompositionPlan.data.push(dataList2)

              let dataList3 = {}
              dataList3.unitName = res.data.data[i].unitName
              dataList3.planStartDate = res.data.data[i].planStartDate
              dataList3.planEndDate = res.data.data[i].planEndDate
              dataList3.unitFinishRate = res.data.data[i].unitFinishRate
              _this.actualControl.push(dataList3)
              console.log(_this.actualControl)
            }
          }
        })
    },

    // 演练情况
    getRehearseSituationData () {
      var _this = this

      let data = {
        backupValue: _this.backupValue,
        planNo: _this.testValue,
        planReason: _this.radioValue
      }
      console.log(data)
      axios
        .request({
          method: 'post',
          data: data,
          url: 'cdc/drillImplement'
        })
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            _this.totalData = res.data.data

            _this.rehearseSituationList.planValue = res.data.data.planValue
            _this.rehearseSituationList.actualValue = res.data.data.actualValue
            _this.rehearseSituationList.finishRate = res.data.data.finishRate
          }
        })
    },

    onSelectedLoadData () {
      this.selectedResultLoading = false
    },
    onSelectedLoadDataPageInfo (tmpCurrent, tmpPageSize, total, totalPage) {
      this.current = tmpCurrent
      this.pageSize = tmpPageSize
      this.total = total
    },
    topPanelQuery () {
      let _this = this
      _this.historyPractice.data = _this.cloneSearch()
      _this.current = 1
      setTimeout(() => {
        _this.getTableData()
      }, 100)
    },
    topPanelQuery2 () {
      let _this = this
      _this.exportHistory.data = _this.cloneSearch2()
      _this.current = 1
      setTimeout(() => {
        _this.getTableData2()
      }, 100)
    },
    topPanelQuery3 () {
      let _this = this
      _this.exportHistory2.data = _this.cloneSearch3()
      _this.current = 1
      setTimeout(() => {
        _this.getTableData3()
      }, 100)
    },
    getTableData () {
      this.$refs.selectedTable.onPageChange(this.current, this.pageSize)
    },
    getTableData2 () {
      this.$refs.selectedTable2.onPageChange(this.current, this.pageSize)
    },
    getTableData3 () {
      this.$refs.selectedTable3.onPageChange(this.current, this.pageSize)
    },
    cloneSearch () {
      let clone = {}
      let planStartDate = this.searchList.planStartDate
      let planEndDate = this.searchList.planEndDate

      clone.planStartDate = planStartDate
      clone.planEndDate = planEndDate
      return clone
    },
    cloneSearch2 () {
      let clone = {}
      let planNo = this.planNumber
      clone.planNo = planNo
      return clone
    },
    cloneSearch3 () {
      let clone = {}
      let planNo = this.historyPlanNumber
      clone.planNo = planNo
      return clone
    }
  }
}
</script>

<style lang="less" scoped>
@import "controlPractice.less";
.active {
  background: #009999;
  color: #fff !important;
}
</style>
