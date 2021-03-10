<template>
  <div class="version-info">
    <Tooltip content="版本信息" placement="bottom">
      <Icon @click="openVersionInfo" type="ios-leaf" :size="23"></Icon>
    </Tooltip>
    <Modal
      width="400px"
      draggable
      :zIndex="905"
      v-model="isVersionShow"
      class-name="vertical-center-modal versionInfoModal"
      footer-hide
    >
      <div class="modalBody">
        <div class="versionTitle">
          <img class="backgroundImg" src="./images/background.png" />
          <img class="backgroundImg" src="./images/background1.png" />
          <img class="backgroundImg" src="./images/background2.png" />
          <img class="backgroundImg" src="./images/background3.png" />
          <img class="circleImg" src="./images/circle.png" />
          <img class="globalImg" src="./images/u60241.png" />
          <div class="titleText">国网上海市经研院虚拟电厂平台</div>
        </div>
        <div class="mainText">虚拟电厂平台用于模拟常规电厂特性，实现资源分类聚合、资源控制策略形成、资源编组、交易申报、远程测控等功能，满足虚拟电厂运营自动响应需求</div>
        <img class="lineImg" src="./images/u60198.png" />
        <div class="modalFooter">
          <p>当前版本:&nbsp;{{versionNo}}</p>
          <p>发布日期:&nbsp;{{publicDate}}</p>
          <p>国电南瑞科技股份有限公司&nbsp;版权所有</p>
          <p>Copyright&nbsp;©&nbsp;2019&nbsp;NARI.&nbsp;All&nbsp;rights&nbsp;reserved</p>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'versionInfo',
  props: {},
  data () {
    return {
      isVersionShow: false,
      versionNo: 'V1.0.1',
      publicDate: '2019.09.19'
    }
  },
  computed: {},
  methods: {
    openVersionInfo () {
      this.isVersionShow = true
    }
  }
}
</script>

<style lang="less">
.version-info {
  margin-right: 12px;
  cursor: pointer;
}

.versionInfoModal .ivu-modal-body {
  padding: 0;
}

.versionInfoModal .modalBody {
  position: relative;
}

.versionInfoModal .modalBody .versionTitle {
  position: relative;
  height: 150px;
  width: 100%;
}

.versionInfoModal .modalBody .versionTitle .backgroundImg {
  position: absolute;
  width: 100.5%;
  top: 0;
  margin-left: -0.25%;
  margin-top: -0.5%;
  height: 140px;
}

.versionInfoModal .modalBody .versionTitle .circleImg {
  z-index: 10;
  position: absolute;
  left: 10%;
  width: 20%;
  top: 12%;
}

.versionInfoModal .modalBody .versionTitle .globalImg {
  z-index: 10;
  position: absolute;
  left: 11.5%;
  width: 18%;
  top: 15%;
}

.versionInfoModal .modalBody .versionTitle .titleText {
  position: absolute;
  font-weight: 700;
  font-size: 28px;
  color: #ffffff;
  line-height: 40px;
  display: inline-block;
  right: 6%;
  top: 10%;
  width: 250px;
}

.versionInfoModal .modalBody .mainText {
  padding: 15px;
  font-weight: 400;
  font-size: 13px;
  color: #666666;
}

.versionInfoModal .modalBody .lineImg {
  display: inline-block;
  margin-left: 2.5%;
  width: 95%;
}

.versionInfoModal .modalBody .modalFooter {
  padding: 15px;
  text-align: right;
  font-weight: 400;
  font-size: 12px;
  color: #666666;
}
</style>
