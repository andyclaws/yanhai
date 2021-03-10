<template>
  <div class="lightDetail-contanier">
    <Card style="width:100%" :style="cardHeight">
      <div slot="title">
        <div>
          <div><img src="./images/u2269.png" alt=""></div>
          <div><span>宝龙1号机组照明系统</span></div>
        </div>
      </div>
      <div class="content-box" :style="contentHeight">
        <div class="left-box">
          <div class="power-gauge">
            <div class="title">|||实时功率</div>
            <real-time-power-gauge :powerDataPercent="powerDataPercent"></real-time-power-gauge>
            <div class="currentPower">
              <p>设备当前功率</p>
              <p>{{currentPower}}kWh</p>
            </div>
            <div class="maxDesignPower">
              <p>最大设计功率</p>
              <p>{{maxDesignPower}}kWh</p>
            </div>
            <div></div>
          </div>
          <div class="power-gauge">
            <div class="title">|||实时用电</div>
            <real-time-electricity-gauge :electricityDataPercent="electricityDataPercent"></real-time-electricity-gauge>
            <div class="currentPower">
              <p>设备当日用电</p>
              <p>{{sameDayElectricity}}kWh</p>
            </div>
            <div class="maxDesignPower">
              <p>设备昨日用电</p>
              <p>{{yesterdayElectricity}}kWh</p>
            </div>
            <div></div>
          </div>
          <div class="run-data-box">
            <p>运行数据</p>
            <div>
              <p>亮灯率：<span>66%</span></p>
              <p>环境温度：<span>22℃</span></p>
              <p>湿度：<span>55%</span></p>
              <p>环境照度：<span>1000tx</span></p>
            </div>
            <div>
              <p>故障数：<span>0</span></p>
              <p>峰值功率：<span>163.8kW</span></p>
              <p>峰值电压：<span>253.4V</span></p>
              <p>谷值电压：<span>202.5V</span></p>
            </div>
          </div>
        </div>
        <div class="right-box">
          <div class="curve-box">
            <div class="header">
              <div>||| 实时曲线</div>
              <div>
                <p @click="changeChoose(0)" :class="activeIndex===0 ? 'bg-color' : 0">交流功率</p>
                <p @click="changeChoose(1)" :class="activeIndex===1 ? 'bg-color' : 0">交流电压</p>
                <p @click="changeChoose(2)" :class="activeIndex===2 ? 'bg-color' : 0">交流电流</p>
              </div>
            </div>
            <div class="power-charts-box">
              <alternating-power-charts :alternatingPowerData="alternatingPowerData"></alternating-power-charts>
            </div>
          </div>
          <div class="curve-box">
            <div class="header">
              <div>||| 用电统计(kWh)</div>
            </div>
            <div class="search">
              <row>
                <i-col span=7 style="width: 26%;">
                  <span>统计维度</span>
                  <RadioGroup v-model="dimensionValue" @on-change="selectDimension">
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
                </i-col>
                <i-col span="15" style="width: 63%;">
                  <span>统计时间段 </span>
                  <DatePicker type="datetime" style="width: 159px"></DatePicker> ~
                  <DatePicker type="datetime" style="width: 159px"></DatePicker>
                </i-col>
                <i-col span="2" style="width: 11%; margin-top: 3px">
                  <div class="search-btn">查询</div>
                </i-col>
              </row>
            </div>
            <div class="electric-charts-box">
              <electricity-statistics-charts :electricityStatisticsData="electricityStatisticsData"></electricity-statistics-charts>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
  import realTimePowerGauge from './realTimePowerGauge'
  import realTimeElectricityGauge from './realTimeElectricityGauge'
  import alternatingPowerCharts from './alternatingPowerCharts'
  import electricityStatisticsCharts from './electricityStatisticsCharts'
  export default {
    name: "lightingDetail",
    props: {},
    data() {
      return {
        cardHeight: 'height: 850px;',
        contentHeight: 'height: 750px;',
        currentPower: 1400,
        maxDesignPower: 2000,
        sameDayElectricity: 402,
        yesterdayElectricity: 1000,
        powerDataPercent: '',
        electricityDataPercent: '',
        activeIndex: 0,
        alternatingPowerData: [],
        electricityStatisticsData: [],
        dimensionValue: 'day'
      }
    },
    components: {
      realTimePowerGauge,
      realTimeElectricityGauge,
      alternatingPowerCharts,
      electricityStatisticsCharts
    },
    mounted() {
      this.changeHeight()
      let that = this
      window.onresize = () => {
        return (() => {
          that.changeHeight()
        })()
      }
      this.powerDataPercent = (this.currentPower / this.maxDesignPower) * 100
      this.electricityDataPercent = (this.sameDayElectricity / this.yesterdayElectricity) * 100
      this.alternatingPowerData = [820, 932, 901, 934, 1290, 1330, 1320]
      this.electricityStatisticsData = [90, 56, 82, 88, 50, 40, 63, 81, 45, 62, 73, 59, 80]
    },
    watch: {},
    methods: {
      changeHeight: function () {
        this.cardHeight =
          window.innerHeight > 800
            ? 'height: ' + (window.innerHeight - 80) + 'px'
            : 'height: 850px'
        this.contentHeight =
          window.innerHeight > 800
            ? 'height: ' + (window.innerHeight - 160) + 'px'
            : 'height: 750px'
      },
      changeChoose(index) {
        this.activeIndex = index
      },
      selectDimension(val) {
        this.dimensionValue = val
      }
    }
  }
</script>

<style lang="less">
  @import "lightingDetail.less";
</style>
