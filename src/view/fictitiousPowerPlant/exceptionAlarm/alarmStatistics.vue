<template>
  <div class="alarmStatisticsMain" id="alarmStatisticsMain">
    <div class="searchBar">
      <Form ref="searchBarForm" :rules="ruleValidate" :model="searchBarForm" :label-width="120">
        <Row>
          <i-col span="8">
            <FormItem label="机组名称" prop="unitName">
              <Input v-model="searchBarForm.unitName" placeholder="请输入机组名称" style="width: 160px;" />
            </FormItem>
          </i-col>
          <i-col span="8">
            <FormItem label="开始时间" prop="alarmBeginTime">
              <DatePicker
                type="date"
                :value="searchBarForm.alarmBeginTime"
                :options="selectDateDayOptions"
                @on-change="changeStartDate"
                format="yyyy-MM-dd"
                :clearable="false"
                placeholder="默认上月"
                style="width: 170px"
              ></DatePicker>
            </FormItem>
          </i-col>
          <i-col span="8">
            <FormItem label="结束时间" prop="alarmEndTime">
              <DatePicker
                type="date"
                :value="searchBarForm.alarmEndTime"
                :options="selectDateDayOptions"
                @on-change="changeEndDate"
                format="yyyy-MM-dd"
                :clearable="false"
                placeholder="默认前一天"
                style="width: 170px"
              ></DatePicker>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="8" style="float: right;">
            <FormItem>
              <Button
                type="primary"
                class="margin-right-3"
                style="width:100px;"
                @click="topPanelQuery('searchBarForm')"
              >查询</Button>
            </FormItem>
          </i-col>
        </Row>
      </Form>
    </div>
    <div class="statisticsResult">
      <div class="statisticsResultBar">异常告警统计结果</div>
      <Row :gutter="6" style="height: calc(50% - 22.5px);">
        <i-col span="11" style="height:100%;">
          <div class="alarmTypeStatistics">
            <AlarmStatisticsResult :totalData="totalData" style="height: 100%" />
            <div
              class="statisticsResultCount"
              v-if="typeof totalData !== 'undefined' && totalData !== null && totalData.length > 0"
            >
              <div class="pieCenterText">总数</div>
              <div class="pieCenterValue">{{statisticsResultCount}}</div>
            </div>
            <div
              class="unitDiv expPie"
              v-if="typeof totalData !== 'undefined' && totalData !== null && totalData.length > 0"
            >单位： 个</div>
          </div>
        </i-col>
        <i-col span="13" style="height:100%;">
          <div class="divisorTypeStatistics">
            <DivisorTypeStatistics :divisorTypeData="divisorTypeData" style="height: 100%" />
            <div
              class="divisorCount"
              v-if="typeof divisorTypeData !== 'undefined' && divisorTypeData !== null && divisorTypeData.length > 0"
            >
              <div class="pieCenterText">总数</div>
              <div class="pieCenterValue">{{divisorTypeCount}}</div>
            </div>
            <div
              class="unitDiv"
              v-if="typeof divisorTypeData !== 'undefined' && divisorTypeData !== null && divisorTypeData.length > 0"
            >单位： 个</div>
          </div>
        </i-col>
      </Row>
      <Row style="height: calc(54% - 22.5px);">
        <div class="alarmTimeSpread">
          <AlarmTimeSpread :barData="barData" style="height: 100%" />
        </div>
      </Row>
    </div>
  </div>
</template>

<script>
import * as alarmExp from '@/api/fictitiousPowerPlant/alarmExp/mainview-data.js'
import '@/view/fictitiousPowerPlant/exceptionAlarm/exceptionAlarm.less'
import AlarmStatisticsResult from './alarmStatisticsResult.vue'
import DivisorTypeStatistics from './divisorTypeStatistics.vue'
import AlarmTimeSpread from './alarmTimeSpread.vue'
import { formatDate, getLastMonthMaxDay } from '@/libs/index'
export default {
  name: 'alarmStatistics',
  components: {
    AlarmStatisticsResult,
    DivisorTypeStatistics,
    AlarmTimeSpread
  },
  props: {},
  data () {
    let boxWidth = window.innerWidth
    return {
      boxWidth: boxWidth,
      selectDateDayOptions: {
        shortcuts: [
          {
            text: '今天',
            value () {
              return formatDate('', 0)
            }
          },
          {
            text: '昨日',
            value () {
              return formatDate('', -1)
            }
          },
          {
            text: '上周',
            value () {
              return formatDate('', -7)
            }
          }
        ]
      },
      searchBarForm: {
        alarmBeginTime: getLastMonthMaxDay(),
        alarmEndTime: formatDate(undefined, -1),
        unitName: ''
      },
      ruleValidate: {
        alarmBeginTime: [
          { required: true, message: '开始日期不能为空', trigger: 'blur' }
        ],
        alarmEndTime: [
          { required: true, message: '开始日期不能为空', trigger: 'blur' }
        ]
      },
      totalData: [],
      divisorTypeData: [],
      divisorTypeCount: '',
      statisticsResultCount: '',
      barData: [],
      loading: false
    }
  },
  methods: {
    getAlarmStatistics () {
      let _this = this
      _this.loading = true
      _this.totalData = []
      _this.divisorTypeData = []
      _this.divisorTypeCount = ''
      _this.statisticsResultCount = ''
      _this.barData = []
      alarmExp
        .getAlarmStatistics(_this.searchBarForm)
        .then(res => {
          console.log(res)
          _this.totalData = res.data.data.alarmTypeResps
          _this.divisorTypeData = res.data.data.factorClassificationResps
          _this.barData = res.data.data.distributionOfAlarms
          let resultCount = 0
          if (
            typeof res.data.data.alarmTypeResps !== 'undefined' &&
            res.data.data.alarmTypeResps !== null
          ) {
            for (
              let resultIndex = 0;
              resultIndex < res.data.data.alarmTypeResps.length;
              resultIndex++
            ) {
              resultCount += res.data.data.alarmTypeResps[resultIndex].expCnt
            }
          }
          _this.statisticsResultCount = resultCount

          let typeCount = 0
          if (
            typeof res.data.data.factorClassificationResps !== 'undefined' &&
            res.data.data.factorClassificationResps !== null
          ) {
            for (
              let typeIndex = 0;
              typeIndex < res.data.data.factorClassificationResps.length;
              typeIndex++
            ) {
              typeCount +=
                res.data.data.factorClassificationResps[typeIndex]
                  .factorClassificationNums
            }
          }
          _this.divisorTypeCount = typeCount
        })
        .catch(err => {
          _this.$Message.error('查询失败！')
        })
        .finally(() => {
          _this.loading = false
        })
    },
    changeStartDate (date) {
      this.searchBarForm.alarmBeginTime = date
    },
    changeEndDate (date) {
      this.searchBarForm.alarmEndTime = date
    },
    topPanelQuery: function (name = 'searchBarForm') {
      let _this = this
      this.$refs[name].validate(valid => {
        if (valid) {
          if (_this.loading) {
            return
          }
          _this.getAlarmStatistics()
        } else {
          _this.$Message.error('请补充查询条件!')
        }
      })
    }
  },
  created () {
    var _this = this
    this.$nextTick(() => {
      _this.getAlarmStatistics()
    })
  },
  watch: {},
  mounted () {}
}
</script>

<style scoped>
.alarmStatisticsMain {
  position: relative;
  height: calc(100% - 50px);
}

.alarmStatisticsMain .searchBar {
  min-height: 92px;
  background: #fcfcfc;
  border: 1px solid rgba(215, 215, 215, 1);
  border-radius: 4px;
  padding: 0.5% 5% 0.5% 5%;
  margin-bottom: 5px;
  position: relative;
  height: 12%;
}

.alarmStatisticsMain .statisticsResult {
  min-height: 655px;
  height: calc(87.5% - 50px);
}

.alarmStatisticsMain .statisticsResultBar {
  font-weight: 650;
  font-size: 16px;
  color: #009999;
  line-height: 40px;
  padding-left: 12px;
  margin-bottom: 0;
}
.alarmStatisticsMain .alarmTypeStatistics,
.alarmStatisticsMain .divisorTypeStatistics,
.alarmStatisticsMain .alarmTimeSpread {
  background: #fcfcfc;
  min-height: 300px;
  border-radius: 4px;
  margin-bottom: 5px;
  padding: 5px;
  border-width: 1px;
  border-style: solid;
  border-color: rgba(215, 215, 215, 1);
  height: calc(100% - 5px);
}

.alarmStatisticsMain .statisticsResultCount {
  display: inline-block;
  position: absolute;
  bottom: 40%;
  left: 30.5%;
  transform: translateX(-50%);
  font-size: 14px;
  text-align: center;
}

.alarmStatisticsMain .divisorCount {
  display: inline-block;
  position: absolute;
  bottom: 40%;
  left: 30.5%;
  transform: translateX(-50%);
  font-size: 14px;
  text-align: center;
}

.alarmStatisticsMain .divisorCount .pieCenterText,
.alarmStatisticsMain .statisticsResultCount .pieCenterText {
  font-weight: 400;
  font-size: 16px;
  color: #115055;
}

.alarmStatisticsMain .divisorCount .pieCenterValue,
.alarmStatisticsMain .statisticsResultCount .pieCenterValue {
  font-weight: 700;
  font-size: 28px;
  color: #038c99;
}

.alarmStatisticsMain .unitDiv {
  display: inline-block;
  position: absolute;
  right: 178px;
  top: 20%;
  font-size: 14px;
}

.alarmStatisticsMain .unitDiv.expPie {
  right: 150px;
  top: 25%;
}
</style>
