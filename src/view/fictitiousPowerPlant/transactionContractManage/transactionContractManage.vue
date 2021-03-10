<template>
  <div>
    <div class="tcm-header-box">
      <p><img src="./images/u2269.png" alt=""></p>
      <p><span>查询条件</span></p>
    </div>
    <div class="tcm-search-box">
      <Form ref="formValidate" :model="searchItem" :label-width="120">
        <Row>
          <Col span="4">
            <FormItem label="查询类型:">
              <Select v-model="searchItem.contractTypeValue" placeholder="请选择" style="width:150px" @on-change="selectContractType">
                <Option v-for="item in searchItem.contractType" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="">
              <Input v-model="searchItem.contractNameOrNo" style="width:150px"></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="合同周期:">
              <Select v-model="searchItem.contractPeriodValue" placeholder="请选择" style="width:150px" @on-change="selectContractPeriod">
                <Option v-for="item in searchItem.contractPeriod" :value="item.value" :key="item.value">{{ item.name }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="合同状态:">
              <Select v-model="searchItem.contractStatusValue" placeholder="请选择" style="width:150px" @on-change="selectContractStatus">
                <Option v-for="item in searchItem.contractStatus" :value="item.value" :key="item.value">{{ item.name }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="16">
            <FormItem label="合约生成时间:">
              <DatePicker :value="searchItem.contractCreateDate" @on-change="contractCreateDateChange" format="yyyy-MM-dd HH:ss:mm" type="datetime" placeholder="年/月/日" style="width: 160px"></DatePicker>
               ~ <DatePicker :value="searchItem.contractEndDate" @on-change="contractEndDateChange" format="yyyy-MM-dd HH:ss:mm" type="datetime" placeholder="年/月/日" style="width: 160px"></DatePicker>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem>
              <div style="display: flex;">
                <div class="primary-btn" @click="topPanelQuery">查询</div>
                <!--<div class="primary-btn" @click="topPanelQuery">导出</div>-->
              </div>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="tcm-header-box tcm-table-header">
      <div>
        <p><img src="./images/u2269.png" alt=""></p>
        <p><span>交易合同管理列表</span></p>
      </div>
      <div @click="modifyClick">
        <!--<p><img src="./images/u30080.png" alt=""></p>-->
        <!--<p><span>变更</span></p>-->
      </div>
    </div>
    <div class="tcm-table-box">
      <Tables
        border
        stripe
        height="500"
        ref="contractTable"
        :columns="contractTable.contractColumns"
        :axiosUrl="contractTable.axiosUrl"
        :axiosData="contractTable.contractAjaxData"
        :loading="loading"
        @on-load-data="onProtectLoadData"
        @on-load-data-page-info="onProtectLoadDataPageInfo"></Tables>
    </div>
    <!--变更弹窗-->
    <Modal
      class="modify-modal"
      width="700"
      draggable
      :zIndex="1000"
      :value="showContractModifyFlag"
      footer-hide
      closable
      @on-visible-change="closeContractModifyModal($event)"
      title="变更">
      <div class="contract-modify-box">
        <div class="contract-info">
          <p class="m_title">||| 合同信息</p>
          <div class="m_form">
            <div class="info_top">
              <p>合同编号：HT-201909190001</p>
              <p>合同时间：20190919</p>
            </div>
            <div class="info_form">
              <Form :model="modifyForm" :label-width="120">
                <row>
                  <i-col span="13">
                    <FormItem label="合约电量">
                      <Input v-model="modifyForm.contractElectricQuantity" size="large" style="width: 150px;"></Input>
                    </FormItem>
                  </i-col>
                  <i-col span="11">
                    <FormItem label="合约电价">
                      <Input v-model="modifyForm.contractElectricPrice" size="large" style="width: 150px;"></Input>
                    </FormItem>
                  </i-col>
                </row>
                <row>
                  <i-col span="13">
                    <FormItem label="调控开始时间">
                      <DatePicker type="date" size="large" @on-change="selectRegulationStartDate" style="width: 150px;"></DatePicker>
                    </FormItem>
                  </i-col>
                  <i-col span="11">
                    <FormItem label="调控结束时间">
                      <DatePicker type="date" size="large" @on-change="selectRegulationEndDate" style="width: 150px;"></DatePicker>
                    </FormItem>
                  </i-col>
                </row>
              </Form>
            </div>
          </div>
        </div>
        <div class="modify-explain">
          <p class="m_title">||| 变更说明</p>
          <div class="modify-content">
            <p>变更内容：</p>
            <p>
              <Input v-model="modifyForm.modifyContent" type="textarea" style="width: 530px;"/>
            </p>
          </div>
          <div class="modify-reason">
            <p>变更原因：</p>
            <p>
              <Input v-model="modifyForm.modifyReason" type="textarea" style="width: 530px;"/>
            </p>
          </div>
        </div>
      </div>
      <div class="modify-btn">
        <div @click="applyModify">申请变更</div>
        <div @click="cancelModify">取消</div>
      </div>
    </Modal>
    <!--合同详情处理弹窗-->
    <Modal
      class="contract-detail-modal"
      width="900"
      draggable
      :zIndex="1000"
      :value="showContractDetailHandleFlag"
      footer-hide
      closable
      @on-visible-change="closeContractDetailModal($event)"
      title="合同详情处理">
      <div class="contract-detail-box">
        <div class="contract-table-box">
          <div class="title">
            ||| 合同信息
          </div>
          <div class="table-box">
            <Table :row-class-name="rowClassName" :columns="contractInfoTable.contractInfoColumn" :data="contractInfoTable.contractInfoData"></Table>
          </div>
        </div>
        <div class="dispute-communicate-box ">
          <div class="title">
            ||| 争议沟通内容
          </div>
          <div class="content-box">
            <div class="content" v-for="(item, index) in contractArgueData">
              <div class="left" v-if="item.argueType==='01'"><div class="dispute">争</div></div>
              <div class="left" v-if="item.argueType==='02'"><div class="dispute">回</div></div>
              <div class="right">
                <div class="header" v-if="item.argueType==='01'">
                  <p>电厂争议:</p>
                  <p>2019-09-18</p>
                </div>
                <div class="header" v-if="item.argueType==='02'">
                  <p>中心回复:</p>
                  <p>{{item.replaTime}}</p>
                </div>
                <div class="content-detail">
                  <p>{{item.argueSubject}}</p>
                  <p>{{item.replyContent}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="content-editor-box">
          <div class="title">
            ||| 争议内容填写
          </div>
          <div>
            <Input v-model="contractContentEditorValue" show-word-limit type="textarea" placeholder="可编辑" style="width: 100%" />
          </div>
        </div>
      </div>
      <div class="contract-button-box">
        <div>
          <div class="examine">审核通过</div>
          <div class="report">上报争议</div>
          <div class="cancel" @click="cancelContractDetailModal">取消</div>
        </div>
      </div>
    </Modal>
    <!--合同展示弹窗-->
    <Modal
      width="600"
      draggable
      :zIndex="1000"
      :value="showContractExhibitionFlag"
      footer-hide
      closable
      @on-visible-change="closeContractExhibitionModal($event)"
      title="合同展示">
      <div class="contract-exhibition-box">
        <div class="header_1">
          <p>合约编号：{{detailContractNo}}</p>
          <p>合约状态：{{detailContractStatus}}</p>
        </div>
        <div class="header_2"><p>合约内容：</p></div>
        <div class="contract-content">
          <div class="contract-title">供销合同</div>
          <p>甲方(买方)：</p>
          <p>乙方(卖方)：</p>
          <p>根据《中华人民共和国合同法》及有关法律、法规规定，甲、乙双方本着平等、自愿、公平、互惠互利和诚实守信的原则，就产品供销的 有关事宜协商一致订立本合同，以便共同遵守。</p>
          <p>一、合同内容</p>
          <p>甲方购买如下产品:</p>
          <div class="content-table">
            <Table border :columns="contractContentTable.contractContentColumn" :data="contractContentTable.contractContentData"></Table>
          </div>
          <p>乙方必须每日供给甲方方坯100吨。</p>
          <p>二、合同价款及付款方式:</p>
          <p>本合同总价款为人民币_________。本合同签订后，甲方向乙方支付定金_________。</p>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables'
import axios from '@/libs/api.request'
import { accordTypeEvaluation } from '../util'
export default {
  name: 'transactionContractManage',
  props: {},
  components: {
    Tables
  },
  data () {
    return {
      searchItem: {
        contractNameOrNo: '',
        contractType: [
          {
            value: 'contractNo',
            label: '合约编号'
          },
          {
            value: 'contractName',
            label: '合约名称'
          }
        ],
        contractTypeValue: 'contractNo',
        contractPeriod: [],
        contractPeriodValue: '',
        contractStatus: [],
        contractStatusValue: '',
        contractCreateDate: '',
        contractEndDate: '',
      },
      contractTable: {
        contractColumns: [
          {
            width: '50',
            align: 'center',
            type: 'selection'
          },
          {
            title: '序号',
            type: 'index',
            key: 'tableNo',
            width: '100',
            align: 'center',
            sortable: true
          },
          {
            title: '合约编号',
            key: 'contractNo',
            align: 'center',
            width: '170'
          },
          {
            title: '合约名称',
            key: 'contractName',
            align: 'center',
            width: '170'
          },
          {
            title: '交易编号',
            key: 'tradeNo',
            align: 'center',
            width: '150'
          },
          {
            title: '合同周期',
            key: 'contractCycle',
            align: 'center',
            width: '100',
            render: (h, params) => {
              return h('span', accordTypeEvaluation(this.searchItem.contractPeriod, params.row.contractCycle, 'name', 'value'))
            }
          },
          {
            title: '合约时间段数',
            key: 'contractSegNo',
            align: 'center',
            width: '120'
          },
          {
            title: '合同状态',
            key: 'contractStatus',
            align: 'center',
            width: '100',
            render: (h, params) => {
              return h(
                'a',
                {
                  props: {
                    href: '#',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.goToStatusDetail(params)
                    }
                  }
                },
                accordTypeEvaluation(this.searchItem.contractStatus, params.row.contractStatus, 'name', 'value')
              )
            }
          },
          {
            title: '合约生成时间',
            key: 'contractDate',
            align: 'center',
            width: '120'
          },
          {
            title: '附件',
            key: 'enclosure',
            align: 'center',
            width: '100',
            render: (h, params) => {
              return h(
                'a',
                {
                  props: {
                    href: '#',
                    type: 'primary'
                  },
                  on: {
                    click: () => {
                      this.goToEnclosureDetail(params)
                    }
                  }
                },
                '查看'
              )
            }
          }
        ],
        // TODO AJAX URL
        axiosUrl: 'tcmc/transactionContractManagementList',
        contractAjaxData: {},
      },
      loading: false,
      current: 1,
      pageSize: 25,
      total: 0,
      showContractModifyFlag: false,
      showContractDetailHandleFlag: false,
      contractInfoTable: {
        contractInfoColumn: [
          {
            title: '分段',
            key: 'segmentNo',
            align: 'center',
            width: '80'
          },
          {
            title: '出清电量(kWh)',
            key: 'clareEnergy',
            align: 'center',
            width: '150'
          },
          {
            title: '已执行电量(kWh)',
            key: 'executedEnergy',
            align: 'center',
            width: '150'
          },
          {
            title: '开始时间',
            key: 'beginDate',
            align: 'center',
            width: '180'
          },
          {
            title: '结束时间',
            key: 'endDate',
            align: 'center',
            width: '180'
          },
          {
            title: '合同电价(元)',
            key: 'contractPrice',
            align: 'center',
            width: '120'
          }
        ],
        contractInfoData: []
      },
      contractArgueData: [],
      contractContentEditorValue: '',
      showContractExhibitionFlag: false,
      detailContractNo: '',
      detailContractStatus: '',
      contractContentTable: {
        contractContentColumn: [
          {
            title: '名称',
            key: 'name',
            align: 'center'
          },
          {
            title: '型号',
            key: 'model',
            align: 'center'
          },
          {
            title: '单位',
            key: 'unit',
            align: 'center'
          },
          {
            title: '单价(元)',
            key: 'unitPrice',
            align: 'center'
          },
          {
            title: '数量',
            key: 'number',
            align: 'center'
          },
          {
            title: '总价',
            key: 'totalPrices',
            align: 'center'
          }
        ],
        contractContentData: [
        ]
      },
      modifyForm: {
        contractElectricQuantity: '',
        contractElectricPrice: '',
        regulationStartDate: '',
        regulationEndDate: '',
        modifyContent: '',
        modifyReason: ''
      }
    }
  },
  mounted () {
    // 合同列表查询
    this.topPanelQuery()
    // 合同周期下拉查询
    this.contractPeriodQuery()
    // 合同状态下拉查询
    this.contractStatusQuery()
  },
  watch: {},
  methods: {
    onProtectLoadData () {
      this.loading = false
    },
    onProtectLoadDataPageInfo (tmpCurrent, tmpPageSize, total, totalPage) {
      this.current = tmpCurrent
      this.pageSize = tmpPageSize
      this.total = total
    },
    topPanelQuery () {
      let _this = this
      _this.contractTable.contractAjaxData = _this.cloneSearch()
      _this.current = 1
      setTimeout(() => {
        _this.getTableData()
      }, 100)
    },
    cloneSearch () {
      let clone = {}
      let contractCycle = this.searchItem.contractPeriodValue
      let contractDateBegin = this.searchItem.contractCreateDate
      let contractDateEnd = this.searchItem.contractEndDate
      let contractStatus = this.searchItem.contractStatusValue
      let contractName = this.searchItem.contractNameOrNo
      let contractNo = this.searchItem.contractNameOrNo
      if(this.searchItem.contractTypeValue === 'contractName') {
        clone.contractName = contractName
      }
      if(this.searchItem.contractTypeValue === 'contractNo') {
        clone.contractNo = contractNo
      }
      clone.contractCycle = contractCycle
      clone.contractDateBegin = contractDateBegin
      clone.contractDateEnd = contractDateEnd
      clone.contractStatus = contractStatus
      return clone
    },
    getTableData () {
      this.$refs.contractTable.onPageChange(this.current, this.pageSize)
    },
    // 合同周期下拉查询
    contractPeriodQuery() {
      axios.request({
        url: 'ddlc/dropDownListQuery?type=CONTRACT_CYCLE',
        method: 'get'
      }).then(res => {
        if(res.data.code === 200) {
          this.searchItem.contractPeriod = res.data.data
        }
      })
    },

    // 合同状态下拉查询
    contractStatusQuery() {
      axios.request({
        url: 'ddlc/dropDownListQuery?type=CONTRACT_STATUS',
        method: 'get'
      }).then(res => {
        if(res.data.code === 200) {
          this.searchItem.contractStatus = res.data.data
        }
      })
    },
    // 变更-调控开始时间
    selectRegulationStartDate (date) {
      this.modifyForm.regulationStartDate = date
    },
    // 变更-调控结束时间
    selectRegulationEndDate (date) {
      this.modifyForm.regulationEndDate = date
    },
    // 查询类型
    selectContractType (value) {
      this.searchItem.contractNameOrNo = ''
      this.searchItem.contractTypeValue = value
    },
    // 合同周期
    selectContractPeriod (value) {
      this.searchItem.contractPeriodValue = value
    },
    // 合同状态
    selectContractStatus (value) {
      this.searchItem.contractStatusValue = value
    },
    // 合同生成日期
    contractCreateDateChange (date) {
      this.searchItem.contractCreateDate = date
    },
    // 合同生成日期
    contractEndDateChange (date) {
      this.searchItem.contractEndDate = date
    },
    // 变更
    modifyClick () {
      this.showContractModifyFlag = true
    },
    closeContractModifyModal (val) {
      if (val === false) {
        this.showContractModifyFlag = false
      }
    },
    applyModify () {
      this.showContractModifyFlag = false
    },
    cancelModify () {
      this.showContractModifyFlag = false
    },
    // 合同状态点击
    goToStatusDetail (params) {
      this.showContractDetailHandleFlag = true
      axios.request({
        url: 'tcmc/contractDetailsProcessing',
        data: params.row.contractId,
        method: 'post',
      }).then(res => {
        if(res.data.code === 200 && res.data.data) {
          this.contractInfoTable.contractInfoData = res.data.data.tradeContractDetailResps
          this.contractArgueData = res.data.data.contractArgueResps
        }
      })
    },
    closeContractDetailModal (val) {
      if (val === false) {
        this.showContractDetailHandleFlag = false
      }
    },
    cancelContractDetailModal() {
      this.showContractDetailHandleFlag = false
    },
    // 附件查看点击
    goToEnclosureDetail (params) {
      this.showContractExhibitionFlag = true
      this.detailContractNo = params.row.contractNo
      this.detailContractStatus = accordTypeEvaluation(this.searchItem.contractStatus, params.row.contractStatus, 'name', 'value')
    },
    closeContractExhibitionModal (val) {
      if (val === false) {
        this.showContractExhibitionFlag = false
      }
    },
    rowClassName (row, index) {
      return 'declaration-price-table-info-cell'
    }
  }
}
</script>

<style lang="less">
 @import "transactionContractManage.less";
</style>
