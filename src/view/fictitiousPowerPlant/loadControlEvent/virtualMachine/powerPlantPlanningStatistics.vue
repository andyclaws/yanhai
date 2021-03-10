<template>
  <div class="powerPlantPlanningStatistics">
    <div class="powerPlantPlanningStatistics-header">
      <div class="searchLine1">
        <span>机组名称:</span>
        <i-select style="width:150px" v-model="searchBarForm.unitName" @on-change="selectUnitName">
          <i-option
            v-for="(item,index) in unitNameList"
            :value="item.unitNo"
            :key="index"
          >{{ item.unitName }}</i-option>
        </i-select>
      </div>
      <div class="searchLine1 searchLine2">
        <span>开始时间</span>
        <DatePicker
          type="date"
          v-model="searchBarForm.beginTime"
          @on-change="selectBeginTime"
          :value="searchBarForm.beginTime"
          format="yyyy-MM-dd"
          :clearable="false"
          style="width: 160px"
        ></DatePicker>
      </div>
      <div class="searchLine1 searchLine3">
        <span>结束时间</span>
        <DatePicker
          type="date"
          v-model="searchBarForm.endTime"
          @on-change="selectEndTime"
          :value="searchBarForm.endTime"
          format="yyyy-MM-dd"
          :clearable="false"
          style="width: 160px"
        ></DatePicker>
      </div>
      <div class="powerPlantPlanningStatistics-header-btn" @click="searchBtn">查询</div>
    </div>
    <Row class="powerPlantPlanningStatistics-contain1">
      <!-- 基础信息 -->
      <i-col span="12">
        <Card class="basicInformation">
          <div slot="title" class="basicInformation-header">
            <p>基础信息</p>
          </div>
          <div class="basicInformation-box">
            <div class="basicInformation-box-left">
              <p class="p1">
                <span>响应目标值：</span>
                <span>{{basicInfoList.allPlanPq}}</span>
              </p>
              <p class="p1 p2">
                <span>响应实际值：</span>
                <span>{{basicInfoList.allRealPq}}</span>
              </p>
              <p class="p1 p3">
                <span>事件完成数：</span>
                <span>{{basicInfoList.allRealCnt}}</span>
              </p>
              <p class="p1 p4">
                <span>节约标煤：</span>
                <span>{{basicInfoList.saveCoal}}</span>
              </p>
            </div>
            <img src="@/assets/images/u37299.png" alt class="centerImg" />
            <div class="basicInformation-box-left basicInformation-box-right">
              <p class="p1 p5">
                <span>响应负荷完成率：</span>
                <span>{{basicInfoList.pqRate}}</span>
              </p>
              <p class="p1 p6">
                <span>事件总数：</span>
                <span>{{basicInfoList.allPlanCnt}}</span>
              </p>
              <p class="p1 p7">
                <span>参与虚拟机组数：</span>
                <span>{{basicInfoList.allPlanPq}}</span>
              </p>
              <p class="p1 p8">
                <span>减排CO2：</span>
                <span>{{basicInfoList.saveCo2}}</span>
              </p>
            </div>
          </div>
        </Card>
      </i-col>
      <!-- 事件类型 || 响应目标值 || 响应负荷完成率 -->
      <i-col span="12">
        <!-- <UnitResponseMode /> -->
        <Card class="virtualMachine-left">
          <div slot="title" class="virtualMachine-left-header">
            <p @click="click3" :class="{active:isActive3}">事件类型</p>
            <span>|</span>
            <p @click="click4" :class="{active:isActive4}">响应目标值</p>
            <span>|</span>
            <p @click="click2" :class="{active:isActive2}">响应负荷完成率</p>
            <!-- 事件类型 -->
            <PlaneType v-if="isShow3" :planeTypeData='planeTypeData'/>
            <!-- 响应目标值 -->
            <ElectricityCompletionRate v-if="isShow2" :electricityCompletionRateData='electricityCompletionRateData'/>
            <!-- 响应负荷完成率 -->
            <PlannedValueDistributionInterval v-if="isShow4" :plannedValueDistributionIntervalData='plannedValueDistributionIntervalData'/>
          </div>
        </Card>
      </i-col>
    </Row>
    <!-- 削峰填谷 -->
    <PeakPeel :peakPeelData='peakPeelData'/>
  </div>
</template>
<script>
import echarts from 'echarts'
import { off, on } from '@/libs/tools'
import axios from '@/libs/api.request'
import ElectricityCompletionRate from './electricityCompletionRate.vue'
import PlaneType from './planeType.vue'
import PlannedValueDistributionInterval from './plannedValueDistributionInterval.vue'
import PeakPeel from './peakPeel'
import { getFormatDate, formatDate } from '@/libs/index'
export default {
  name: 'powerPlantPlanningStatistics',
  components: {
    ElectricityCompletionRate,
    PlaneType,
    PlannedValueDistributionInterval,
    PeakPeel,
    axios
  },
  data () {
    let lastMonDay =
      getFormatDate(new Date().getFullYear()) +
      '-' +
      getFormatDate(new Date().getMonth()) +
      '-' +
      getFormatDate(new Date().getDate())
    return {
      planeTypeData: [],
      electricityCompletionRateData: [],
      plannedValueDistributionIntervalData: [],
      peakPeelData: [],
      dom: '',
      isShow2: false,
      isShow3: true,
      isShow4: false,
      isActive2: false,
      isActive3: true,
      isActive4: false,
      isActive5: false,
      unitNameList: [],
      basicInfoList: {
        allPlanPq: '', // 事件发电总量
        allRealPq: '', // 实际完成发电总量
        allRealCnt: '', // 事件完成数
        saveCoal: '', // 节约标煤
        pqRate: '', // 发电量完成率
        allPlanCnt: '', // 事件总数
        joinUnit: '', // 参与虚拟机组数
        saveCo2: '' // 减排CO2
      },
      searchBarForm: {
        beginTime: '',
        endTime: '',
        unitName: ''
      }
    }
  },
  mounted () {
    this.getUnitNameList()
  },
  methods: {
    click2 () {
      this.isShow2 = true
      this.isShow3 = false
      this.isShow4 = false
      this.isActive2 = true
      this.isActive3 = false
      this.isActive4 = false
      this.isActive5 = !this.isActive5
      this.searchBtn()
    },
    click3 () {
      this.isShow2 = false
      this.isShow3 = true
      this.isShow4 = false
      this.isActive2 = false
      this.isActive3 = true
      this.isActive4 = false
      this.searchBtn()
    },
    click4 () {
      this.isShow2 = false
      this.isShow3 = false
      this.isShow4 = true
      this.isActive2 = false
      this.isActive3 = false
      this.isActive4 = true
      this.searchBtn()
    },
    selectUnitName (val) {
      this.searchBarForm.unitName = val
    },
    selectBeginTime (val) {
      this.searchBarForm.beginTime = val
    },
    selectEndTime (val) {
      this.searchBarForm.endTime = val
    },
    // 机组名称下拉框
    getUnitNameList () {
      var _this = this
      axios
        .request({
          method: 'get',
          url: 'hpgec/unitList'
        })
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            _this.unitNameList = res.data.data
          }
        })
    },
    searchBtn () {
      var _this = this
      let data = {
        beginTime: this.searchBarForm.beginTime,
        endTime: this.searchBarForm.endTime,
        unitName: this.searchBarForm.unitName
      }
      axios
        .request({
          method: 'post',
          data: data,
          url: 'hpgec/unitStatistics'
        })
        .then(res => {
          console.log(res)
          if (res.status === 200) {
            _this.basicInfoList = res.data.data
            _this.peakPeelData = res.data.data.peakShavingValleyFillings
            _this.planeTypeData = res.data.data.unitControlTypeOrderResps
            _this.electricityCompletionRateData = res.data.data.unitControlTypeOrderResps
            _this.plannedValueDistributionIntervalData = res.data.data.unitControlTypeOrderResps
          }
        })
    }
  }
}
</script>
<style lang="less" scoped>
@import "../loadControlEvent.less";
.active {
  border-bottom: 2px solid #009999;
}
</style>
