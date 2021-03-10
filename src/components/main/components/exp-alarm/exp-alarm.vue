<template>
  <div class="exp-alarm">
    <Tooltip content="告警信息" placement="bottom">
      <Icon @click="openAlarmModal" type="ios-alert" :size="23"></Icon>
    </Tooltip>
    <div class="alertNot" v-if="isHaveAlarmNew"></div>
    <Modal
      width="500px"
      draggable
      :zIndex="905"
      v-model="isAlarmModalShow"
      class-name="vertical-center-modal expAlarmModal"
      title="告警信息"
      footer-hide
    >
      <div class="modalBody">
        <div class="modalTitle">|||最近告警信息</div>
        <div class="infoArea">
          <div class="noInfoText" v-if="isNotNew">无最新告警信息</div>
          <div class="alertInfo" v-for="(item, index) in alertInfos" :key="index">
            <div>
              <span>{{index + 1}}.&nbsp;终端编号</span>
              <span class="infoValueSpan" @click="gotoAlarm(item)">{{item.deviceId}}</span>
              <span>{{getFormatDateStr(item.alarmBeginTime)}}</span>
              <span class="infoAlertSpan">{{item.subdeviceTypeName}}</span>
              <span>，请快速处理</span>
              <span>！！！</span>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from '@/api/fictitiousPowerPlant/expAlarm/mainview-data.js'

export default {
  name: 'expAlarm',
  props: {},
  data () {
    return {
      timer: {},
      isNotNew: false,
      isAlarmModalShow: false,
      alertInfos: [],
      isHaveAlarmNew: false
    }
  },
  computed: {},
  methods: {
    getNewAlarms () {
      let _this = this
      api
        .getNewAlarms({})
        .then(res => {
          let list = res.data.data
          if (typeof list !== 'undefined' && list !== null && list.length > 0) {
            _this.isNotNew = false
            _this.alertInfos = list
          } else {
            _this.isNotNew = true
            _this.alertInfos = []
          }
        })
        .catch(err => {
          _this.$Message.error('最新告警信息查询失败！')
        })
    },
    getFormatDateStr (date) {
      let arr = date.split('-')
      if (arr.length === 3) {
        return arr[0] + '年' + arr[1] + '月' + arr[2] + '日'
      } else {
        return ''
      }
    },
    openAlarmModal () {
      this.isAlarmModalShow = true
    },
    gotoAlarm (item) {
      this.$router.push({
        name: 'exceptionAlarm',
        query: {
          from: 'expModal'
        },
        params: {
          tmnlName: item.deviceName,
          alarmBeginTime: item.alarmBeginTime,
          subdeviceType: item.subdeviceType
        }
      })
      this.isAlarmModalShow = false
    }
  },
  mounted () {
    // let that = this
    // that.getNewAlarms()
    // that.timer = setInterval(that.getNewAlarms, 300000)
  }
}
</script>

<style lang="less">
.exp-alarm {
  margin-right: 12px;
  cursor: pointer;
  position: relative;
}

.exp-alarm .alertNot {
  position: absolute;
  width: 6px;
  height: 6px;
  background-color: #ff0000;
  top: 22px;
  left: 16px;
  border-radius: 50%;
}

.expAlarmModal .ivu-modal-body {
  padding: 10px 5px;
}

.expAlarmModal .modalBody {
  position: relative;
  padding: 5px 10px;
  box-sizing: border-box;
  border: 1px solid rgba(215, 215, 215, 1);
  border-radius: 4px;
}

.expAlarmModal .modalBody .modalTitle {
  font-weight: 400;
  font-size: 16px;
  color: #009999;
  margin-bottom: 6px;
}

.expAlarmModal .modalBody .infoArea {
  min-height: 200px;
  max-height: 250px;
  overflow-x: none;
  overflow-y: scroll;
}

.expAlarmModal .modalBody .infoArea::-webkit-scrollbar {
  width: 3px;
}
.expAlarmModal .modalBody .infoArea::-webkit-scrollbar-track-piece {
  background-color: #ffffff;
} /* 滚动条的内层滑轨背景颜色 */

.expAlarmModal .modalBody .infoArear::-webkit-scrollbar-track {
  background-color: #fff;
} /* 滚动条的外层滑轨背景颜色 */

.expAlarmModal .modalBody .infoArea::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 4px;
} /* 滚动条的内层滑块颜色 */

.expAlarmModal .modalBody .infoArea::-webkit-scrollbar-button {
  background-color: #fff;
  display: none;
}

.expAlarmModal .modalBody .infoArea .alertInfo {
  border-bottom: 1px solid #e8f4f4;
  margin-bottom: 2px;
}

.expAlarmModal .modalBody .infoArea .alertInfo span {
  font-weight: 400;
  line-height: 32px;
  color: #666666;
  font-size: 14px;
}

.expAlarmModal .modalBody .infoArea .alertInfo span.infoValueSpan {
  text-decoration: underline;
  color: #009999;
  cursor: pointer;
}

.expAlarmModal .modalBody .infoArea .alertInfo span.infoAlertSpan {
  color: #ff0000;
}

.expAlarmModal .modalBody .infoArea .noInfoText {
  text-align: center;
  margin-top: 65px;
  font-weight: 400;
  line-height: 32px;
  color: #666666;
  font-size: 14px;
}
</style>
