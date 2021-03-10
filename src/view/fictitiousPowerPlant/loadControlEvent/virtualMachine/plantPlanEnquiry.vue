<template>
  <div class="plantPlanEnquiry">
    <div class="plantPlanEnquiry-list">
      <Row class="plantPlanEnquiry-listOne">
        <i-col span="6">
          <div class="searchLine1">
            <span>机组名称</span>
            <i-select
              style="width:150px"
              placeholder="请选择机组名称"
              v-model="searchDataList.unitNo"
              @change="selectunitNoType"
            >
              <i-option
                v-for="(item,index) in unitNoList"
                :value="item.value"
                :key="index"
              >{{ item.name }}</i-option>
            </i-select>
          </div>
        </i-col>
        <i-col span="6">
          <div class="searchLine1">
            <span>事件名称</span>
            <i-select
              style="width:150px"
              placeholder="请选择事件名称"
              v-model="searchDataList.planName"
              @change="selectplanNameType"
            >
              <i-option
                v-for="(item,index) in planNameList"
                :value="item.value"
                :key="index"
              >{{ item.name }}</i-option>
            </i-select>
          </div>
        </i-col>
        <i-col span="6">
          <div class="searchLine1">
            <span>事件编号</span>
            <i-input
              placeholder="请输入事件编号"
              style="width: 150px"
              v-model="searchDataList.planNo"
              @change="selectplanNoType"
            ></i-input>
          </div>
        </i-col>
        <i-col span="6">
          <div class="searchLine1">
            <span>完成率</span>
            <i-select
              style="width:150px"
              v-model="searchDataList.unitFinishRate"
              @change="selectunitFinishRateType"
            >
              <i-option
                v-for="(item,index) in unitFinishRateList"
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
            <span>目标值</span>
            <i-select
              style="width:150px"
              v-model="searchDataList.unitPlanValue"
              @change="selectunitPlanValueType"
            >
              <i-option
                v-for="(item,index) in unitPlanValueList"
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
            ></Date-picker>
          </div>
        </i-col>
        <i-col span="6">
          <div class="plantPlanEnquiry-list-btn" @click="topPanelQuery">查询</div>
        </i-col>
      </Row>
    </div>

    <!-- 机组控制事件列表 -->
    <Card class="historyList">
      <div slot="title" class="header">
        <img src="../images/u2269.png" />
        <p>机组控制事件列表</p>
      </div>
      <div class="form">
        <Tables
          border
          height="380"
          ref="pantEnquiry"
          :columns="tableList.unitColumns"
          :loading="selectedResultLoading"
          :axiosUrl="tableList.axiosUrl"
          :axiosData="tableList.unitData"
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
import { accordTypeEvaluation } from '../../util'
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
      searchDataList: {
        planStartDate: '',
        currentPage: 1,
        planEndDate: '',
        planName: '',
        planNo: '',
        unitFinishRate: '',
        unitNo: '',
        pageSize: 10,
        unitPlanValue: ''
      },
      unitNoList: [],
      planNameList: [],
      unitFinishRateList: [],
      unitPlanValueList: [],
      tableList: {
        unitColumns: [
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
            title: '事件类型',
            key: 'contrlType',
            align: 'center',
            width: '110',
            render: (h, params) => {
              return h(
                'span',
                accordTypeEvaluation(
                  this.cityList2,
                  params.row.contrlType,
                  'name',
                  'value'
                )
              )
            }
          },
          {
            title: '事件开始时间',
            key: 'planStartDate',
            align: 'center',
            width: '200'
          },
          {
            title: '事件结束时间',
            key: 'planEndDate',
            align: 'center',
            width: '200'
          },
          {
            title: '整体目标值(kW)',
            key: 'plantPlanValue',
            align: 'center',
            width: '150'
          },
          {
            title: '整体实际值(kW)',
            key: 'plantPlanValue',
            align: 'center',
            width: '150'
          },
          {
            title: '机组目标值(kW)',
            key: 'unitPlanValue',
            align: 'center',
            width: '150'
          },
          {
            title: '机组实际值(kW)',
            key: 'unitActualValue',
            align: 'center',
            width: '150'
          },
          {
            title: '完成率(%)',
            key: 'unitFinishRate',
            align: 'center',
            width: '120'
          },
          // {
          //   title: '结算金额(元)',
          //   key: 'finalPrice',
          //   align: 'center',
          //   width: '130'
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
                '详情'
              )
            }
          }
        ],
        unitData: {},
        axiosUrl: 'hpgec/unitPlanInquiry'
      },
      cityList2: []
    }
  },
  mounted () {
    this.unitNoSelectType()
    this.planNameSelectType()
    this.unitFinishRateSelectType()
    this.unitPlanValueSelectType()
    this.getPlanControlType()
    this.topPanelQuery()
  },
  methods: {
    onProtectLoadData () {
      this.loading = false
    },
    selectunitNoType (val) {
      this.searchDataList.unitNo = val
    },
    selectplanNameType (val) {
      this.searchDataList.planName = val
    },
    selectplanNoType (val) {
      this.searchDataList.planNo = val
    },
    selectunitFinishRateType (val) {
      this.searchDataList.unitFinishRate = val
    },
    selectunitPlanValueType (val) {
      this.searchDataList.unitPlanValue = val
    },
    planStartDateStatus (val) {
      this.searchDataList.planStartDate = val
    },
    planEndDateStatus (val) {
      this.searchDataList.planEndDate = val
    },
    // 机组名称
    unitNoSelectType () {
      var _this = this
      axios
        .request({
          method: 'post',
          url: 'hpgec/getUnitNames'
        })
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            _this.unitNoList = res.data.data
            _this.unitNoList.unshift({
              value: 'all',
              name: '-全部-'
            })
          }
        })
    },
    // 事件名称下拉框
    planNameSelectType () {
      var _this = this
      axios
        .request({
          method: 'post',
          url: 'hpgec/getUnitPlanNames'
        })
        .then(res => {
          // console.log(res)
          if (res.status === 200) {
            _this.planNameList = res.data.data
            _this.planNameList.unshift({
              value: 'all',
              name: '-全部-'
            })
          }
        })
    },
    // 完成率下拉框
    unitPlanValueSelectType () {
      var _this = this
      axios
        .request({
          method: 'get',
          url: 'ddlc/dropDownListQuery?type=LSFDSJ_UNIT_WCL'
        })
        .then(res => {
          // console.log(res)
          if (res.status === 200) {
            _this.unitFinishRateList = res.data.data
            _this.unitFinishRateList.unshift({
              value: 'all',
              name: '-全部-'
            })
          }
        })
    },
    // 目标值下拉框
    unitFinishRateSelectType () {
      var _this = this
      axios
        .request({
          method: 'get',
          url: 'ddlc/dropDownListQuery?type=LSFDSJ_UNIT_MBZ'
        })
        .then(res => {
          // console.log(res)
          if (res.status === 200) {
            _this.unitPlanValueList = res.data.data
            _this.unitPlanValueList.unshift({
              value: 'all',
              name: '-全部-'
            })
          }
        })
    },
    // 事件类型接口
    getPlanControlType () {
      var _this = this
      axios
        .request({
          method: 'get',
          url: 'ddlc/dropDownListQuery?type=CONTRL_TYPE'
        })
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            _this.cityList2 = res.data.data
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
    // 点击搜索按钮
    topPanelQuery () {
      let _this = this
      _this.tableList.unitData = _this.cloneSearch()
      _this.current = 1
      setTimeout(() => {
        _this.getTableData()
      }, 100)
    },
    getTableData () {
      this.$refs.pantEnquiry.onPageChange(this.current, this.pageSize)
    },
    cloneSearch () {
      let clone = {}
      let planName = this.searchDataList.planName
      let planNo = this.searchDataList.planNo
      let unitPlanValue = this.searchDataList.unitPlanValue
      let unitNo = this.searchDataList.unitNo
      let unitFinishRate = this.searchDataList.unitFinishRate
      let planStartDate = this.searchDataList.planStartDate
      let planEndDate = this.searchDataList.planEndDate
      clone.planName = planName
      clone.planNo = planNo
      clone.unitPlanValue = unitPlanValue
      clone.unitNo = unitNo
      clone.unitFinishRate = unitFinishRate
      clone.planStartDate = planStartDate
      clone.planEndDate = planEndDate
      return clone
    },
    // 点击查看
    goToSinglePlantPlanDetail (data) {
      var _this = this
      console.log(data)
      this.$router.push({
        name: 'singleUnitPlanDetail',
        params: { planNo: data.row.planNo }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import "../loadControlEvent.less";
</style>
