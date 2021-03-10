<template>
  <div class="exceptionAlarmMain" :style="mainHeight" id="exceptionAlarmMain">
    <div class="chooseBar">
      <!-- <div :class="isChoose === 0 ? 'isChoose' : '' " @click="changeChoose(0)">告警统计</div>
      <span>|</span>-->
      <!-- <div :class="isChoose === 1 ? 'isChoose' : '' " @click="changeChoose(1)">告警查询</div> -->
      <div class="selectTitle">告警查询</div>
    </div>
    <!-- <AlarmStatistics v-if="isChoose === 0" /> -->
    <!-- <AlarmSelected v-if="isChoose === 1" :tableHeight="tableHeight" /> -->
    <AlarmSelected ref="alarmSelected" :tableHeight="tableHeight" />
  </div>
</template>

<script>
import '@/view/fictitiousPowerPlant/exceptionAlarm/exceptionAlarm.less'
// import AlarmStatistics from "./alarmStatistics.vue";
import AlarmSelected from './alarmSelected.vue'
import { getFormatDate, formatDate } from '@/libs/index'
import { judgeNull } from '../util.js'

export default {
  name: 'exceptionAlarm',
  components: {
    // AlarmStatistics,
    AlarmSelected
  },
  props: {},
  data () {
    let boxWidth = window.innerWidth
    return {
      boxWidth: boxWidth,
      mainHeight: 'height: 820px;',
      tableHeight: 500,
      isChoose: 1
    }
  },
  methods: {
    removeNull (val, initStr = '') {
      return judgeNull(val, initStr)
    },
    changeChoose (isChoose) {
      if (isChoose !== this.isChoose) {
        this.isChoose = isChoose
      }
    },
    changeHeight: function () {
      this.mainHeight = 'height: ' + (window.innerHeight - 140) + 'px'
      // this.tableHeight =
      //   window.innerHeight > 800 ? window.innerHeight - 350 : 500;
      this.tableHeight =
        window.innerHeight > 800 ? window.innerHeight - 330 : 430
    }
  },
  created () {},
  mounted () {
    let from = this.$route.query.from
    let params = this.$route.params
    if (from === 'expModal') {
      this.$refs.alarmSelected.searchBarForm.tmnlName = _this.removeNull(
        params.tmnlName
      )
      this.$refs.alarmSelected.searchBarForm.startDate = _this.removeNull(
        params.alarmBeginTime
      )
      this.$refs.alarmSelected.searchBarForm.alarmType = _this.removeNull(
        params.subdeviceType
      )
      // this.isChoose = 1;
    }
    this.changeHeight()
    let that = this
    window.onresize = () => {
      return (() => {
        that.changeHeight()
      })()
    }
  },
  watch: {
    $route (newRoute) {
      const { name, query, params, meta } = newRoute
      if (query.from === 'expModal') {
        let _this = this
        _this.$refs.alarmSelected.searchBarForm.tmnlName = _this.removeNull(
          params.tmnlName
        )
        _this.$refs.alarmSelected.searchBarForm.startDate = _this.removeNull(
          params.alarmBeginTime
        )
        _this.$refs.alarmSelected.searchBarForm.alarmType = _this.removeNull(
          params.subdeviceType
        )
        _this.$nextTick(() => {
          _this.$refs.alarmSelected.topPanelQuery()
        })
        // this.isChoose = 1;
      }
    }
  }
}
</script>

<style scoped>
.exceptionAlarmMain {
  position: relative;
}

/* .exceptionAlarmMain .chooseBar div {
  display: inline-block;
  line-height: 40px;
  font-family: "PingFangSC-Regular", "PingFang SC";
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #009999;
  height: 40px;
  box-sizing: border-box;
  padding: 0 5px 0 5px;
  cursor: pointer;
} */
.exceptionAlarmMain .chooseBar div.isChoose {
  border-bottom: 2px solid #009999;
}
.exceptionAlarmMain .chooseBar span {
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #009999;
}

.exceptionAlarmMain .selectTitle {
  font-weight: 650;
  font-size: 16px;
  color: #009999;
  line-height: 40px;
  margin-bottom: 0;
  display: inline-block;
  height: 40px;
  box-sizing: border-box;
  padding: 0 5px 0 5px;
}
</style>
