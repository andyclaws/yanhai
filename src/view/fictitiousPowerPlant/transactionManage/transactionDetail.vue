<template>
  <div>
    <Modal
      class="transaction-detail-modal"
      :width="boxWidth < 1100 ? '1000px' : boxWidth * 0.9"
      draggable
      :zIndex="901"
      :value="showTransactionDetailFlag"
      class-name="vertical-center-modal"
      footer-hide
      closable
      @on-visible-change="closeModal($event)"
      title="交易详情">
      <div class="transaction-detail-content">
        <div class="transaction-list-box">
          <Card style="width:100%; height: 550px;">
            <div slot="title">
              <div><img src="./images/u2269.png" alt=""></div>
              <div><span>交易列表</span></div>
            </div>
            <div class="td-info">
              <div class="td-search-box">
                <Icon type="ios-search"></Icon>
                <Input v-model="filterValue" placeholder="请输入模糊搜索内容" style="width: 100%" size="large"></Input>
              </div>
              <div class="list-box">
                <p>交易编号</p>
                <div>
                  <ul>
                    <li v-for="(item, index) in 6" :key="index" @click="changeTransactionNo(index)">
                      <span class="circle" :class="activeIndex===index ? 'bg-color' : ''"></span>
                      <span class="transaction-no" :class="activeIndex===index ? 'bg-color' : ''">JY-201909190001</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div class="transaction-process-box">
          <Card style="width:100%; height: 550px;">
            <div slot="title">
              <div><img src="./images/u2269.png" alt=""></div>
              <div><span>交易进程</span></div>
            </div>
            <div class="process-content">
              <div class="tr-process">
                <div class="process publicity" @click="transactionPublicityFun">交易公示</div>
                <div class="tr-arrow"><div></div><div></div></div>
                <div class="process declaration" @click="TransactionDeclarationFun">交易申报</div>
                <div class="tr-arrow"><div></div><div></div></div>
                <div class="process clearout">交易出清</div>
                <div class="tr-arrow"><div></div><div></div></div>
                <div class="process contract">合约签订</div>
                <div class="tr-arrow"><div></div><div></div></div>
                <div class="process settlement">交易结算</div>
              </div>
              <div class="pro-date">
                <p>2019-10-01</p>
                <p>00:00:00</p>
              </div>
              <div class="pro-detail-title">||| 详细信息</div>
              <div class="detail-content">
                <!--交易公示-->
                <div class="publicity-box" v-if="showTransactionPublicity">
                  <div class="pub-title">需求信息</div>
                  <div class="pub-detail">
                    <div>
                      <p>公示名称：<span>XXXXX</span></p>
                      <p>公示编号：<span>XXXXX</span></p>
                      <p>发布时间：<span>XXXXXXXX</span></p>
                      <p>有效时间：<span>XXXXXXXX</span></p>
                    </div>
                    <div>
                      <p>1段需求电量(kWh)：<span>XXXXX</span></p>
                      <p>2段需求电量(kWh)：<span>XXXXX</span></p>
                      <p>3段需求电量(kWh)发布时间：<span>XXXXXXXX</span></p>
                      <p>调控类型：<span>调峰/调谷</span></p>
                    </div>
                    <div>
                      <p>时间段：<span>XXXXX</span></p>
                      <p>时间段：<span>XXXXX</span></p>
                      <p>时间段：<span>XXXXX</span></p>
                    </div>
                  </div>
                </div>
                <!--交易申报-->
                <div class="declaration-box" v-if="showTransactionDeclaration">
                  <div class="dec-title">
                    <span>申报信息</span>
                    <span>交易编号: <span>XXXX</span></span>
                    <span>申报时间: <span>XXXX</span></span>
                    <span>调控类型: <span>XXXX</span></span>
                    <span v-if="!showReapplyBtnFlag">当前状态: <span>已申请</span></span>
                    <span v-if="showReapplyBtnFlag">当前状态: <span>已驳回</span></span>
                  </div>
                  <div class="dec-detail">
                    <div>报价详情</div>
                    <div>
                      <Table :row-class-name="rowClassName" :columns="quotePriceColumn" :data="quotePriceData"></Table>
                    </div>
                    <div v-if="showDeclareBtnFlag && !showReapplyBtnFlag">
                      <div>申报通过</div>
                      <div class="dismissal" @click="declarationDismissal">申报驳回</div>
                    </div>
                    <div v-if="showReapplyBtnFlag">
                      <div>重新申请</div>
                      <div class="giveup">放弃</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'transactionDetail',
  props: ['showTransactionDetailFlag'],
  data () {
    let boxWidth = window.innerWidth
    return {
      boxWidth: boxWidth,
      filterValue: '',
      activeIndex: 0,
      quotePriceColumn: [
        {
          title: '分段',
          key: 'section',
          align: 'center',
          width: '50'
        },
        {
          title: '申报电量(kWh)',
          key: 'declaredElectricity',
          align: 'center',
          width: '100'
        },
        {
          title: '时间段',
          key: 'timeSlot',
          align: 'center',
          width: '200'
        },
        {
          title: '申报电价(元)',
          key: 'declaredElectricityPrice',
          align: 'center',
          width: '100'
        }
      ],
      quotePriceData: [
        {
          section: '1',
          declaredElectricity: 100,
          timeSlot: '20190919 08:00:00~20190919 09:00:00',
          declaredElectricityPrice: '8'
        },
        {
          section: '2',
          declaredElectricity: 200,
          timeSlot: '20190919 08:00:00~20190919 09:00:00',
          declaredElectricityPrice: '10'
        },
        {
          section: '3',
          declaredElectricity: 300,
          timeSlot: '20190919 08:00:00~20190919 09:00:00',
          declaredElectricityPrice: '12'
        }
      ],
      showTransactionPublicity: true,
      showTransactionDeclaration: false,
      showDeclareBtnFlag: true,
      showReapplyBtnFlag: false
    }
  },
  mounted () {
  },
  methods: {
    closeModal (e) {
      this.$emit('closeModalFun', e)
    },
    changeTransactionNo (index) {
      this.activeIndex = index
    },
    // 交易公示
    transactionPublicityFun () {
      this.showTransactionPublicity = true
      this.showTransactionDeclaration = false
      this.showDeclareBtnFlag = true
    },
    // 交易申报
    TransactionDeclarationFun () {
      if (this.showReapplyBtnFlag) {
        this.showDeclareBtnFlag = false
      } else {
        this.showDeclareBtnFlag = true
      }
      this.showTransactionDeclaration = true
      this.showTransactionPublicity = false
    },
    // 申报驳回
    declarationDismissal () {
      this.showDeclareBtnFlag = false
      this.showReapplyBtnFlag = true
    },
    rowClassName (row, index) {
      if (index === 0 || index === 1 || index === 2) {
        return 'declaration-price-table-info-cell'
      }
    }
  }
}
</script>

<style lang="less">
</style>
