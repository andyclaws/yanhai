<template>
  <div class="powerPlantPlanningStatistics">
    <!-- 搜索 -->
    <div class="powerPlantPlanningStatistics-header">
      <div class="searchLine1">
        <span>时间维度:</span>
        <RadioGroup v-model="formData.dateType" @on-change="changeDateType">
          <Radio label="day">
            <span>日</span>
          </Radio>
          <Radio label="month">
            <span>月</span>
          </Radio>
          <Radio label="year">
            <span>年</span>
          </Radio>
        </RadioGroup>
      </div>
      <div class="searchLine1 searchLine2">
        <span>开始时间：</span>
        <DatePicker
          type="date"
          :value="formData.date1"
          v-if="formData.dateType === 'day'"
          placeholder="默认当前日"
          @on-change="changeDate1"
          format="yyyy-MM-dd"
          :clearable="false"
          style="width: 150px"
        ></DatePicker>
        <DatePicker
          type="month"
          :value="formData.date1"
          v-if="formData.dateType === 'month'"
          placeholder="默认当前月"
          @on-change="changeDate1"
          format="yyyy-MM"
          :clearable="false"
          style="width: 150px"
        ></DatePicker>
        <DatePicker
          type="year"
          :value="formData.date1"
          v-if="formData.dateType === 'year'"
          placeholder="默认当年"
          @on-change="changeDate1"
          format="yyyy"
          :clearable="false"
          style="width: 150px"
        ></DatePicker>
      </div>
      <div class="searchLine1 searchLine3">
        <span>结束时间：</span>
        <DatePicker
          type="date"
          :value="formData.date2"
          v-if="formData.dateType === 'day'"
          placeholder="默认当前日"
          @on-change="changeDate2"
          format="yyyy-MM-dd"
          :clearable="false"
          style="width: 150px"
        ></DatePicker>
        <DatePicker
          type="month"
          :value="formData.date2"
          v-if="formData.dateType === 'month'"
          placeholder="默认当前月"
          @on-change="changeDate2"
          format="yyyy-MM"
          :clearable="false"
          style="width: 150px"
        ></DatePicker>
        <DatePicker
          type="year"
          :value="formData.date2"
          v-if="formData.dateType === 'year'"
          placeholder="默认当年"
          @on-change="changeDate2"
          format="yyyy"
          :clearable="false"
          style="width: 150px"
        ></DatePicker>
      </div>
      <div class="powerPlantPlanningStatistics-header-btn" @click="searchForm">查询</div>
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
                <span>参与机组数：</span>
                <span>{{basicInfoList.joinUnit}}</span>
              </p>
              <p class="p1 p8">
                <span>减排CO2：</span>
                <span>{{basicInfoList.saveCo2}}</span>
              </p>
            </div>
          </div>
        </Card>
      </i-col>
      <!-- 机组执行方式||响应负荷完成率||事件类型||目标值分布区间 -->
      <i-col span="12">
        <Card class="unitResponseMode">
          <div slot="title" class="unitResponseMode-header">
            <p @click="click1" :class="{active:isActive1}">机组执行方式</p>
            <span>|</span>
            <p @click="click2" :class="{active:isActive2}">响应负荷完成率</p>
            <span>|</span>
            <p @click="click3" :class="{active:isActive3}">事件类型</p>
            <span>|</span>
            <p @click="click4" :class="{active:isActive4}">目标值分布区间</p>

            <!-- 机组执行方式 -->
            <div>
              <UnitResponseType v-if="isShow1" :unitResponseTypeData="unitResponseTypeData" />
              <div class="unitResponseMode-btn" v-show="showBtn1">
                <div class="leftBtn" :class="{buttonActive:isActiveBtn}" @click="leftBtnT1">削峰</div>
                <div class="rightBtn" :class="{buttonActive:!isActiveBtn}" @click="rightBtnT1">填谷</div>
              </div>
            </div>
            <!-- 响应负荷完成率 -->
            <div>
              <ElectricityCompletionRate
                v-if="isShow2"
                :electricityCompletionRateData="electricityCompletionRateData"
              />
              <div class="unitResponseMode-btn" v-show="showBtn2">
                <div class="leftBtn" :class="{buttonActive:isActiveBtn}" @click="leftBtnT2">削峰</div>
                <div class="rightBtn" :class="{buttonActive:!isActiveBtn}" @click="rightBtnT2">填谷</div>
              </div>
            </div>

            <!-- 事件类型 -->
            <div>
              <PlaneType v-if="isShow3" :planeTypeData="planeTypeData" />
              <div class="unitResponseMode-btn" v-show="showBtn3">
                <div class="leftBtn" :class="{buttonActive:isActiveBtn}">削峰</div>
                <div class="rightBtn" :class="{buttonActive:!isActiveBtn}">填谷</div>
              </div>
            </div>
            <!-- 目标值分布区间 -->
            <div>
              <PlannedValueDistributionInterval
                v-if="isShow4"
                :plannedValueDistributionIntervalData="plannedValueDistributionIntervalData"
              />
              <div class="unitResponseMode-btn" v-show="showBtn3">
                <div class="leftBtn" :class="{buttonActive:isActiveBtn}" @click="leftBtnT3">削峰</div>
                <div class="rightBtn" :class="{buttonActive:!isActiveBtn}" @click="rightBtnT3">填谷</div>
              </div>
            </div>
          </div>
        </Card>
      </i-col>
    </Row>
    <!-- 削峰填谷 -->
    <PeakPeel :peakPeelData="peakPeelData" />
  </div>
</template>
<script>
import echarts from 'echarts'
import axios from '@/libs/api.request'
import { off, on } from '@/libs/tools'
import UnitResponseType from './unitResponseType.vue'
import ElectricityCompletionRate from './electricityCompletionRate.vue'
import PlaneType from './planeType.vue'
import PlannedValueDistributionInterval from './plannedValueDistributionInterval.vue'
import PeakPeel from './peakPeel'
import { getFormatDate, formatDate } from '@/libs/index'
export default {
  name: 'powerPlantPlanningStatistics',
  components: {
    UnitResponseType,
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
      unitResponseTypeData: [],
      electricityCompletionRateData: [],
      planeTypeData: [],
      plannedValueDistributionIntervalData: [],
      peakPeelData: [],
      dom: '',
      isShow1: true,
      isShow2: false,
      isShow3: false,
      isShow4: false,
      isActive1: true,
      isActive2: false,
      isActive3: false,
      isActive4: false,
      isActive5: false,
      showBtn1: true,
      showBtn2: false,
      showBtn3: false,
      formData: {
        dateType: '',
        date1: '',
        data2: ''
      },
      searchBarForm: {
        alarmBeginTime: formatDate(lastMonDay, -1),
        alarmEndTime: formatDate(undefined, -1),
        unitName: ''
      },
      basicInfoList: {
        allPlanPq: '', // 发电目标值
        allRealPq: '', // 实际完成发电总量
        allRealCnt: '', // 事件完成数
        saveCoal: '', // 节约标煤
        pqRate: '', // 发电量完成率
        allPlanCnt: '', // 事件总数
        joinUnit: '', // 参与虚拟机组数
        saveCo2: '' // 减排CO2
      },
      xiaofengData: [],
      tianguData: [],
      isActiveBtn: true,
      radioValue: ''
    }
  },
  mounted () {

  },
  methods: {
    click1 () {
      this.isShow1 = true
      this.isShow2 = false
      this.isShow3 = false
      this.isShow4 = false
      this.isActive1 = true
      this.isActive2 = false
      this.isActive3 = false
      this.isActive4 = false
      this.showBtn1 = true
      this.showBtn2 = false
      this.showBtn3 = false
      this.searchForm()
    },
    click2 () {
      this.isShow1 = false
      this.isShow2 = true
      this.isShow3 = false
      this.isShow4 = false
      this.isActive1 = false
      this.isActive2 = true
      this.isActive3 = false
      this.isActive4 = false
      this.isActive5 = !this.isActive5
      this.showBtn1 = false
      this.showBtn2 = true
      this.showBtn3 = false
      this.searchForm()
    },
    click3 () {
      this.isShow1 = false
      this.isShow2 = false
      this.isShow3 = true
      this.isShow4 = false
      this.isActive1 = false
      this.isActive2 = false
      this.isActive3 = true
      this.isActive4 = false
      this.showBtn1 = false
      this.showBtn2 = false
      this.showBtn3 = false
      this.searchForm()
    },
    click4 () {
      this.isShow1 = false
      this.isShow2 = false
      this.isShow3 = false
      this.isShow4 = true
      this.isActive1 = false
      this.isActive2 = false
      this.isActive3 = false
      this.isActive4 = true
      this.showBtn1 = false
      this.showBtn2 = false
      this.showBtn3 = true

      this.searchForm()
    },
    changeDateType (val) {
      this.radioValue = val
      this.formData.date1 = ''
      this.formData.date2 = ''
    },
    changeDate1 (date) {
      this.formData.date1 = date
      if (this.radioValue === 'day') {
        this.formData.date1 =
          this.formData.date1.length === 10
            ? this.formData.date1
            : this.formData.date1 + '-01'
      } else if (this.radioValue === 'month') {
        this.formData.date1 =
          this.formData.date1.length === 7
            ? this.formData.date1
            : this.formData.date1.substring(0, 7)
      } else {
        this.formData.date1 =
          this.formData.date1.length === 4
            ? this.formData.date1
            : this.formData.date1.substring(0, 4)
      }
    },
    changeDate2 (date) {
      this.formData.date2 = date
      if (this.radioValue === 'day') {
        this.formData.date2 =
          this.formData.date2.length === 10
            ? this.formData.date2
            : this.formData.date2 + '-01'
      } else if (this.radioValue === 'month') {
        this.formData.date2 =
          this.formData.date2.length === 7
            ? this.formData.date2
            : this.formData.date2.substring(0, 7)
      } else {
        this.formData.date2 =
          this.formData.date2.length === 4
            ? this.formData.date2
            : this.formData.date2.substring(0, 4)
      }
    },
    searchForm () {
      var _this = this
      let data = {
        endDate: this.formData.date2,
        startDate: this.formData.date1,
        timeDimension: this.formData.dateType
      }
      axios
        .request({
          method: 'post',
          data: data,
          url: 'hpgec/plantPlanningStatistics'
        })
        .then(res => {
          console.log(res)
          if (res.status === 200 && res.data.data !== null) {
            _this.basicInfoList =
              res.data.data.plantPlanningStatistics_basicInfo === null
                ? {}
                : res.data.data.plantPlanningStatistics_basicInfo

            _this.peakPeelData = res.data.data.controlTypeResps === null
              ? []
              : res.data.data.controlTypeResps

            _this.unitResponseTypeData = _this.electricityCompletionRateData = _this.planeTypeData = _this.plannedValueDistributionIntervalData =
              res.data.data.controlTypeOrderResps === null
                ? []
                : res.data.data.controlTypeOrderResps

            _this.unitResponseTypeData.forEach((item, index) => {
              if (item.controlType === '01') {
                _this.xiaofengData.push(item)
              } else if (item.controlType === '02') {
                _this.tianguData.push(item)
              }
            })

            _this.electricityCompletionRateData.forEach((item, index) => {
              if (item.controlType === '01') {
                _this.xiaofengData.push(item)
              } else if (item.controlType === '02') {
                _this.tianguData.push(item)
              }
            })

            _this.plannedValueDistributionIntervalData.forEach(
              (item, index) => {
                if (item.controlType === '01') {
                  _this.xiaofengData.push(item)
                } else if (item.controlType === '02') {
                  _this.tianguData.push(item)
                }
              }
            )
          }
        })
    },
    leftBtnT1 () {
      let _this = this
      _this.isActiveBtn = !this.isActiveBtn
      _this.unitResponseTypeData = _this.xiaofengData
    },
    rightBtnT1 () {
      let _this = this
      _this.isActiveBtn = !this.isActiveBtn
      _this.unitResponseTypeData = _this.tianguData
    },
    leftBtnT2 () {
      let _this = this
      _this.isActiveBtn = !this.isActiveBtn
      _this.electricityCompletionRateData = _this.xiaofengData
    },
    rightBtnT2 () {
      let _this = this
      _this.isActiveBtn = !this.isActiveBtn
      _this.electricityCompletionRateData = _this.tianguData
    },
    leftBtnT3 () {
      let _this = this
      _this.isActiveBtn = !this.isActiveBtn
      _this.plannedValueDistributionIntervalData = _this.xiaofengData
    },
    rightBtnT3 () {
      let _this = this
      _this.isActiveBtn = !this.isActiveBtn
      _this.plannedValueDistributionIntervalData = _this.tianguData
    }
  }
}
</script>
<style lang="less" scoped>
@import "../loadControlEvent.less";
.active {
  border-bottom: 2px solid #009999;
}
.buttonActive {
  background-color: #009999;
  color: #ffffff;
}
</style>
