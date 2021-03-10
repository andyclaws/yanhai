<template>
  <div class="plantPlanEnquiry">
    <div class="plantPlanEnquiry-list">
      <Row class="plantPlanEnquiry-listOne">
        <i-col span="6">
          <div class="searchLine1">
            <span>事件名称</span>
            <i-select
              style="width:150px"
              v-model="searchDataList.planName"
              @change="selectUnitNameType"
            >
              <i-option
                v-for="(item,index) in planNameList"
                :value="item.value"
                :key="index"
              >{{ item.name}}</i-option>
            </i-select>
          </div>
        </i-col>
        <i-col span="6">
          <div class="searchLine1">
            <span>事件编号</span>
            <i-input
              style="width: 150px"
              placeholder=" 请输入计划编号"
              v-model="searchDataList.planNo"
              @change="selectplanNoType"
            ></i-input>
          </div>
        </i-col>
        <i-col span="6">
          <div class="searchLine1 searchLine2">
            <span>目标值</span>
            <i-select
              style="width:150px"
              v-model="searchDataList.planValue"
              @change="selectplanValueType"
            >
              <i-option
                v-for="(item,index) in planValueList"
                :value="item.value"
                :key="index"
              >{{ item.name }}</i-option>
            </i-select>
          </div>
        </i-col>
        <i-col span="6">
          <div class="searchLine1">
            <span>执行方式</span>
            <i-select
              style="width:150px"
              v-model="searchDataList.planMode"
              @change="selectplanModeType"
            >
              <i-option
                v-for="(item,index) in executionmodelist"
                :value="item.value"
                :key="index"
              >{{ item.name }}</i-option>
            </i-select>
          </div>
        </i-col>
      </Row>
      <Row class="plantPlanEnquiry-listOne">
        <i-col span="6"></i-col>
        <i-col span="6">
          <div class="searchLine1 searchLine2">
            <span>完成率</span>
            <i-select
              style="width:150px"
              v-model="searchDataList.finishRate"
              @change="selectFinishRateType"
            >
              <i-option
                v-for="(item,index) in completionRateList"
                :value="item.value"
                :key="index"
              >{{ item.name }}</i-option>
            </i-select>
          </div>
        </i-col>
        <i-col span="6">
          <div class="searchLine1">
            <span>开始时间</span>
            <Date-picker
              type="date"
              placeholder="选择日期"
              style="width: 150px"
              @change="planStartDateStatus"
              v-model="searchDataList.planStartDate"
              format="yyyy-MM-dd"
            ></Date-picker>
          </div>
        </i-col>
        <i-col span="6">
          <div class="searchLine1">
            <span>结束时间</span>
            <Date-picker
              type="date"
              placeholder="选择日期"
              style="width: 150px"
              @change="planEndDateStatus"
              v-model="searchDataList.planEndDate"
              format="yyyy-MM-dd"
            ></Date-picker>
          </div>
        </i-col>
        <i-col span="6">
          <div class="plantPlanEnquiry-list-btn" @click="topPanelQuery">查询</div>
        </i-col>
      </Row>
    </div>

    <!-- 整体控制事件列表 -->
    <Card class="historyList">
      <div slot="title" class="header">
        <img src="../images/u2269.png" />
        <p>整体控制事件列表</p>
      </div>
      <div class="form">
        <Tables
          border
          ref="selectedTable"
          height="380"
          :columns="tableList.historyListColumns"
          :loading="selectedResultLoading"
          :axiosUrl="tableList.axiosUrl"
          :axiosData="tableList.historyListData"
          @on-load-data="onSelectedLoadData"
          @on-load-data-page-info="onSelectedLoadDataPageInfo"
        ></Tables>
      </div>
    </Card>
  </div>
</template>
<script>
import Tables from '_c/tables'
import axios from '@/libs/api.request'
import { accordTypeEvaluation } from '../../util.js'
export default {
  name: 'plantPlanEnquiry',
  components: {
    Tables,
    axios
  },
  data () {
    return {
      selectedResultLoading: false,
      current: 1,
      pageSize: 25,
      total: 0,
      planNameList: [],
      planValueList: [],
      executionmodelist: [],
      completionRateList: [],
      tableList: {
        historyListColumns: [
          {
            title: '序号',
            type: 'index',
            key: 'serialNumber',
            align: 'center',
            width: '75'
          },
          {
            title: '事件编号',
            key: 'planNo',
            align: 'center',
            width: '110'
          },
          {
            title: '事件名称',
            key: 'planName',
            align: 'center',
            width: '110'
          },
          {
            title: '事件开始时间',
            key: 'planStartDate',
            align: 'center',
            width: '190'
          },
          {
            title: '事件结束时间',
            key: 'planEndDate',
            align: 'center',
            width: '190'
          },
          {
            title: '目标值(kW)',
            key: 'planValue',
            align: 'center',
            width: '125'
          },
          {
            title: '实际值(kW)',
            key: 'actualValue',
            align: 'center',
            width: '125'
          },
          {
            title: '执行方式',
            key: 'planMode',
            align: 'center',
            width: '110',
            render: (h, params) => {
              return h(
                'span',
                accordTypeEvaluation(
                  this.executionmodelist,
                  params.row.planMode,
                  'name',
                  'value'
                )
              )
            }
          },
          {
            title: '完成率(%)',
            key: 'finishRate',
            align: 'center',
            width: '120'
          },
          // {
          //   title: '结算金额(元)',
          //   key: 'settleAccount',
          //   align: 'center',
          //   width: '140'
          // },
          {
            title: '事件详情',
            key: 'planeDetails',
            align: 'center',
            width: '110',
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
                      this.goToSinglePlantPlanDetail(params)
                    }
                  }
                },
                // params.row.planeDetails
                '查看'
              )
            }
          }
        ],
        historyListData: {},
        axiosUrl: 'hpgec/powerPlantPlanningQuery'
      },
      searchDataList: {
        planStartDate: '',
        currentPage: 1,
        planEndDate: '',
        planName: '',
        planNo: '',
        finishRate: '',
        planMode: '',
        pageSize: 10,
        planValue: ''
      },
      planeNameList: {}
    }
  },
  mounted () {
    this.unitNameSelectType()
    this.planValueType()
    this.modelType()
    this.finishRateType()
    this.topPanelQuery()
  },
  methods: {
    onProtectLoadData () {
      this.loading = false
    },

    selectUnitNameType (val) {
      console.log(val)
      this.searchDataList.planName = val
    },
    selectplanNoType (val) {
      this.searchDataList.planNo = val
    },
    selectplanValueType (val) {
      this.searchDataList.planValue = val
    },
    selectplanModeType (val) {
      this.searchDataList.planMode = val
    },
    selectFinishRateType (val) {
      this.searchDataList.finishRate = val
    },
    planStartDateStatus (val) {
      this.searchDataList.planStartDate = val
    },
    planEndDateStatus (val) {
      this.searchDataList.planEndDate = val
    },

    onSelectedLoadData () {
      this.selectedResultLoading = false
    },
    onSelectedLoadDataPageInfo (tmpCurrent, tmpPageSize, total, totalPage) {
      this.current = tmpCurrent
      this.pageSize = tmpPageSize
      this.total = total
    },
    // 点击搜索按钮
    topPanelQuery () {
      let _this = this
      _this.tableList.historyListData = _this.cloneSearch()
      // _this.planeNameList = _this.tableList.historyListData.planName;
      console.log(_this.tableList.historyListData)
      _this.current = 1
      setTimeout(() => {
        _this.getTableData()
      }, 100)
    },
    getTableData () {
      this.$refs.selectedTable.onPageChange(this.current, this.pageSize)
    },
    cloneSearch () {
      let clone = {}
      let planName = this.searchDataList.planName
      let planNo = this.searchDataList.planNo
      let planValue = this.searchDataList.planValue
      let planMode = this.searchDataList.planMode
      let finishRate = this.searchDataList.finishRate
      let planStartDate = this.searchDataList.planStartDate
      let planEndDate = this.searchDataList.planEndDate
      clone.planName = planName
      clone.planNo = planNo
      clone.planValue = planValue
      clone.planMode = planMode
      clone.finishRate = finishRate
      clone.planStartDate = planStartDate
      clone.planEndDate = planEndDate
      return clone
    },
    // 事件名称下拉框
    unitNameSelectType () {
      var _this = this
      axios
        .request({
          method: 'post',
          url: 'hpgec/getPlanNames'
        })
        .then(res => {
          // console.log(res);
          if (res.status === 200) {
            _this.planNameList = res.data.data
            _this.planNameList.unshift({
              value: 'all',
              name: '-全部-'
            })
          }
        })
    },
    // 目标值下拉框
    planValueType () {
      var _this = this
      axios
        .request({
          method: 'get',
          url: 'ddlc/dropDownListQuery?type=LSFDSJ_PLANT_MBZ'
        })
        .then(res => {
          // console.log(res);
          if (res.status === 200) {
            _this.planValueList = res.data.data
            _this.planValueList.unshift({
              value: 'all',
              name: '-全部-'
            })
          }
        })
    },
    // 执行方式下拉框
    modelType () {
      var _this = this
      axios
        .request({
          method: 'get',
          url: 'ddlc/dropDownListQuery?type=LSFDSJ_PLANT_ZXFS'
        })
        .then(res => {
          // console.log(res);
          if (res.status === 200) {
            _this.executionmodelist = res.data.data
            _this.executionmodelist.unshift({
              value: 'all',
              name: '-全部-'
            })
          }
        })
    },
    // 完成率下拉框
    finishRateType () {
      var _this = this
      axios
        .request({
          method: 'get',
          url: 'ddlc/dropDownListQuery?type=LSFDSJ_PLANT_WCL'
        })
        .then(res => {
          // console.log(res);
          if (res.status === 200) {
            _this.completionRateList = res.data.data
            _this.completionRateList.unshift({
              value: 'all',
              name: '-全部-'
            })
          }
        })
    },
    // 点击查看
    goToSinglePlantPlanDetail (data) {
      var _this = this
      // console.log(data)
      this.$router.push({
        name: 'detailOfSinglePlantPlan',
        params: { planNo: data.row.planNo }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import "../loadControlEvent.less";
</style>
