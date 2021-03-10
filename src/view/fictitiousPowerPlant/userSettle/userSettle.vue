<template>
  <div class="userSettle" :style="mainHeight" id="userSettle">
    <div class="chooseBar">
      <div :class="isChoose === 0 ? 'isChoose' : '' " @click="changeChoose(0)">交易视角</div>
      <span>|</span>
      <div :class="isChoose === 1 ? 'isChoose' : '' " @click="changeChoose(1)">业主视角</div>
    </div>
    <tradeView v-if="isChoose === 0" :tableHeight="tableHeight" />
    <userView v-if="isChoose === 1" :tableHeight="innerTableHeight" />
  </div>
</template>

<script>
import tradeView from './tradeView.vue'
import userView from './userView.vue'
export default {
  name: 'userSettle',
  components: {
    tradeView,
    userView
  },
  props: {},
  data () {
    let boxWidth = window.innerWidth
    return {
      boxWidth: boxWidth,
      mainHeight: 'height: 820px;',
      tableHeight: 500,
      isChoose: 0
    }
  },
  methods: {
    changeChoose (isChoose) {
      if (isChoose !== this.isChoose) {
        this.isChoose = isChoose
      }
    },
    changeHeight: function () {
      this.mainHeight = 'height: ' + (window.innerHeight - 140) + 'px'
      this.tableHeight =
        window.innerHeight > 800 ? window.innerHeight - 360 : 500
      this.innerTableHeight =
        window.innerHeight > 800 ? window.innerHeight - 360 : 370
    }
  },
  created () {},
  watch: {},
  mounted () {
    this.changeHeight()
    let that = this
    window.onresize = () => {
      return (() => {
        that.changeHeight()
      })()
    }
  }
}
</script>

<style scoped>
.userSettle {
  position: relative;
}

.userSettle .chooseBar div {
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
}

.userSettle .chooseBar {
  height: 45px;
  background: linear-gradient(
    180deg,
    rgba(252, 252, 252, 1) 0%,
    rgba(252, 252, 252, 1) 0%,
    rgba(246, 246, 246, 1) 100%,
    rgba(246, 246, 246, 1) 100%
  );
  margin-bottom: 5px;
  border: 1px solid rgba(226, 226, 226, 1);
  border-radius: 4px;
  padding-left: 10px;
}

.userSettle .chooseBar div.isChoose {
  border-bottom: 2px solid #009999;
}

.userSettle .chooseBar span {
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  color: #009999;
}
</style>
