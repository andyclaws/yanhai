<template>
  <div class="trade-notice">
    <Tooltip content="交易公告" placement="bottom">
      <Icon @click="openTradeModal" type="ios-copy" :size="23"></Icon>
    </Tooltip>
    <div class="alertNot" v-if="isHaveTradeNew"></div>
    <Modal
      width="550px"
      draggable
      :zIndex="905"
      v-model="isTradeModalShow"
      class-name="vertical-center-modal tradeNoticeModal"
      title="交易公告"
      footer-hide
    >
      <div class="modalBody">
        <div class="modalTitle">|||最近交易公告</div>
        <div class="infoArea">
          <div class="noInfoText" v-if="isNotNew">无最新交易公告</div>
          <div class="tradeInfo" v-for="(item, index) in tradeInfos" :key="index">
            <div>
              <span>{{index + 1}}.</span>
              <span class="infoValueSpan">{{item.tradeNo}}</span>
              <span>最新公告，点击查看详情。</span>
              <div class="goDetailDiv" @click="gotoTrade(item)">
                <span class="goDetailText">查看详情&nbsp;》</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from '@/api/fictitiousPowerPlant/tradeNotice/mainview-data.js'

export default {
  name: 'expAlarm',
  props: {},
  data () {
    return {
      isTradeModalShow: false,
      tradeInfos: [],
      isHaveTradeNew: false,
      timer: {},
      isNotNew: false
    }
  },
  computed: {},
  methods: {
    getNewTrades () {
      let _this = this
      api
        .getNewTrades({})
        .then(res => {
          let list = res.data.data
          if (typeof list !== 'undefined' && list !== null && list.length > 0) {
            _this.isNotNew = false
            _this.tradeInfos = list
          } else {
            _this.isNotNew = true
            _this.tradeInfos = []
          }
        })
        .catch(err => {
          _this.$Message.error('最新交易公告查询失败！')
        })
    },
    openTradeModal () {
      this.isTradeModalShow = true
    },
    gotoTrade (item) {
      this.$router.push({
        name: 'tradeAnnouncement',
        query: {
          from: 'tradeModal'
        },
        params: {
          noticeName: item.noticeName,
          pulishDate: item.pulishDate,
          contrlType: item.contrlType,
          pulishState: item.pulishState
        }
      })
      this.isTradeModalShow = false
    }
  },
  mounted () {
    // let that = this
    // that.getNewTrades()
    // that.timer = setInterval(that.getNewTrades, 300000)
  }
}
</script>

<style lang="less">
.trade-notice {
  margin-right: 12px;
  cursor: pointer;
  position: relative;
}

.trade-notice .alertNot {
  position: absolute;
  width: 6px;
  height: 6px;
  background-color: #ff0000;
  top: 22px;
  left: 16px;
  border-radius: 50%;
}

.tradeNoticeModal .ivu-modal-body {
  padding: 10px 5px;
}

.tradeNoticeModal .modalBody {
  position: relative;
  padding: 5px 10px;
  box-sizing: border-box;
  border: 1px solid rgba(215, 215, 215, 1);
  border-radius: 4px;
}

.tradeNoticeModal .modalBody .modalTitle {
  font-weight: 400;
  font-size: 16px;
  color: #009999;
  margin-bottom: 6px;
}

.tradeNoticeModal .modalBody .infoArea {
  min-height: 200px;
  max-height: 250px;
  overflow-x: none;
  overflow-y: scroll;
}

.tradeNoticeModal .modalBody .infoArea::-webkit-scrollbar {
  width: 3px;
}
.tradeNoticeModal .modalBody .infoArea::-webkit-scrollbar-track-piece {
  background-color: #ffffff;
} /* 滚动条的内层滑轨背景颜色 */

.tradeNoticeModal .modalBody .infoArear::-webkit-scrollbar-track {
  background-color: #fff;
} /* 滚动条的外层滑轨背景颜色 */

.tradeNoticeModal .modalBody .infoArea::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 4px;
} /* 滚动条的内层滑块颜色 */

.tradeNoticeModal .modalBody .infoArea::-webkit-scrollbar-button {
  background-color: #fff;
  display: none;
}

.tradeNoticeModal .modalBody .infoArea .tradeInfo {
  border-bottom: 1px solid #e8f4f4;
  margin-bottom: 2px;
  padding-right: 70px;
}

.tradeNoticeModal .modalBody .infoArea .tradeInfo span {
  font-weight: 400;
  line-height: 32px;
  color: #666666;
  font-size: 14px;
}

.tradeNoticeModal .modalBody .infoArea .tradeInfo span.infoValueSpan {
  color: #ff6633;
}

.tradeNoticeModal .modalBody .infoArea .tradeInfo .goDetailDiv {
  display: inline-block;
  right: 10px;
  cursor: pointer;
  position: absolute;
}

.tradeNoticeModal .modalBody .infoArea .tradeInfo .goDetailDiv span {
  font-size: 12px;
  color: #009999;
}

.tradeNoticeModal .modalBody .infoArea .noInfoText {
  text-align: center;
  margin-top: 65px;
  font-weight: 400;
  line-height: 32px;
  color: #666666;
  font-size: 14px;
}
</style>
