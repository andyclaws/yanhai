<template>
  <div class="userMeasurement" :style="mainHeight" id="userMeasurement">
    <Row :gutter="10" style="height:100%;">
      <i-col span="18" style="height:100%;">
        <Card>
          <div class="tableBarTitle">业主结算信息</div>
          <div class="barToolBox">
            <div style="display:none;" @click="settlePublic">
              <img src="./images/u33045.png" />
              <span>结算发布</span>
            </div>
            <img style="display:none;" src="./images/u12932.png" class="lineImg" />
            <div @click="showModifyModal">
              <img src="./images/u33045.png" />
              <span>修订</span>
            </div>
          </div>
          <div class="userMeasurementTable">
            <Tables
              ref="userMeasurementTable"
              filename="业主结算信息"
              :height="tableHeight - 50"
              :columns="userMeasurementColumns.columns"
              :axiosUrl="userMeasurementColumns.axiosUrl"
              :axiosData="userMeasurementAjaxData"
              :loading="userMeasurementTableLoading"
              @on-load-data="onUserMeasurementLoadData"
              @on-selection-change="selectionChange"
              @on-load-data-page-info="onUserMeasurementLoadDataPageInfo"
            />
          </div>
        </Card>
      </i-col>
      <i-col span="6" class="rightCol">
        <Card class="rightCard">
          <div class="infoTitleBar">电厂计量结算信息</div>
          <div class="infoBody">
            <div class="infoRow">
              <span>交易编号:&nbsp;</span>
              <span class="markValueFont">{{tradeNo}}</span>
            </div>
            <div class="infoRow">
              <span>结算电量(kWh):&nbsp;</span>
              <span>{{settleElecs}}</span>
            </div>
            <div class="infoRow">
              <span>结算总价(元):&nbsp;</span>
              <span>{{settleElecPrice}}</span>
            </div>
            <div class="infoRow">
              <span>合同完成率(%):&nbsp;</span>
              <span>{{agreementComplateRate}}</span>
            </div>
          </div>
        </Card>
      </i-col>
    </Row>
    <Modal
      width="600px"
      draggable
      :zIndex="901"
      v-model="showModalFlag"
      class-name="vertical-center-modal userMeasurementModal"
      footer-hide
      title="修订"
    >
      <div class="modifyModalBody">
        <div class="topInfo">
          <div class="topInfoTitle">||| 业主及机组信息</div>
          <div class="infoDiv">业主名：{{modalUserName}}</div>
          <div class="infoDiv">机组名：{{modalMedicalGroupName}}</div>
          <div class="infoDiv">目标发电量（kWh）：{{modalSupportElec}}</div>
        </div>
        <div class="middleInfo">
          <div class="middleInfoTitle">||| 修订内容</div>
          <Form
            ref="modifySearchBarForm"
            :rules="modifyFormRuleValidate"
            :model="modifySearchBarForm"
          >
            <Row style="margin-bottom:10px;">
              <i-col span="24">
                <FormItem label="实际发电量(kWh): " prop="actualElec">
                  <Input
                    v-model="modifySearchBarForm.actualElec"
                    placeholder="请输入虚拟发电量"
                    style="width: 160px;"
                    @on-blur="setTotalSettle"
                  />
                </FormItem>
              </i-col>
            </Row>
            <Row style="margin-bottom:10px;">
              <i-col span="24">
                <FormItem label="结算电价(元): " prop="settleElecPrice">
                  <Input
                    v-model="modifySearchBarForm.settleElecPrice"
                    placeholder="请输入结算电价"
                    style="width: 160px;"
                    @on-blur="setTotalSettle"
                  />
                </FormItem>
              </i-col>
            </Row>
            <Row style="margin-bottom:10px;">
              <i-col span="24">
                <FormItem label="调节金额(元): " prop="changePrice">
                  <Input
                    v-model="modifySearchBarForm.changePrice"
                    placeholder="请输入结算电价"
                    style="width: 160px;"
                    @on-blur="setTotalSettle"
                  />
                </FormItem>
              </i-col>
            </Row>
            <Row style="margin-bottom:10px;">
              <i-col span="24" class="settleTotalICol">
                <FormItem label="结算总额(元)：" prop="settleTotal">
                  <span class="settleTotalValue">{{modifySearchBarForm.settleTotal}}</span>
                  <span class="settleTotalInfoFont">（依据上面输入参数计算而成）</span>
                </FormItem>
              </i-col>
            </Row>
            <Row :gutter="50">
              <i-col span="12" class="leftButtonControl">
                <FormItem>
                  <Button
                    type="primary"
                    style="width:100px;"
                    @click="modifySettle('modifySearchBarForm')"
                  >修订</Button>
                </FormItem>
              </i-col>
              <i-col span="12">
                <FormItem>
                  <Button
                    type="primary"
                    style="width:100px;background-color:#F2F2F2;border:1px solid rgba(228, 228, 228, 1);border-radius:4px;color:#666666"
                    @click="closeModifyModal"
                  >取消</Button>
                </FormItem>
              </i-col>
            </Row>
          </Form>
        </div>
      </div>
    </Modal>
    <Modal
      width="800px"
      draggable
      :zIndex="901"
      v-model="showBattleModalFlag"
      class-name="vertical-center-modal battleModal"
      footer-hide
      title="业主争议处理"
    >
      <div class="battleModalBody">
        <div class="userSettleInfo">
          <div class="userSettleInfoTitle">||| 业主结算信息</div>
          <Row :gutter="50">
            <i-col span="6">
              <span class="userSettleInfoText">业主名:&nbsp;</span>
              <span class="userSettleInfoValue">{{battleSelectionData.user}}</span>
            </i-col>
            <i-col span="6">
              <span class="userSettleInfoText">实际发电量(kWh):&nbsp;</span>
              <span class="userSettleInfoValue">{{battleSelectionData.realSupportElec}}</span>
            </i-col>
          </Row>
          <Row :gutter="50">
            <i-col span="6">
              <span class="userSettleInfoText">结算总额(元):&nbsp;</span>
              <span class="userSettleInfoValue">{{battleSelectionData.battleSettleTotalPrice}}</span>
            </i-col>
            <i-col span="6">
              <span class="userSettleInfoText">结算状态:&nbsp;</span>
              <span class="userSettleInfoValue">{{battleSelectionData.battleSettleStatus}}</span>
            </i-col>
          </Row>
        </div>
        <div class="topInfo">
          <div class="topInfoTitle">||| 机组结算信息</div>
          <div class="topInfoTable">
            <Row :gutter="6" class="topInfoRow">
              <i-col class="topInfoCol" span="3">
                <span>机组名称</span>
              </i-col>
              <i-col class="topInfoCol" span="4">
                <span>虚拟发电量(kWh)</span>
              </i-col>
              <i-col class="topInfoCol" span="11">
                <span>发电时间段</span>
              </i-col>
              <i-col class="topInfoCol" span="3">
                <span>结算电价(元)</span>
              </i-col>
              <i-col class="topInfoCol" span="3">
                <span>结算金额(元)</span>
              </i-col>
            </Row>
            <Row
              :gutter="6"
              class="topInfoValueRow"
              v-for="(item, index) in battleSelectionData.unitInfos"
              :key="index"
            >
              <i-col class="topInfoValueCol" span="3">
                <span>{{item.medicalGroupName}}</span>
              </i-col>
              <i-col class="topInfoValueCol" span="4">
                <span>{{item.virtualSupportElecs}}</span>
              </i-col>
              <i-col class="topInfoValueCol" span="11">
                <span>{{item.supportElecTimes}}</span>
              </i-col>
              <i-col class="topInfoValueCol" span="3">
                <span>{{item.settleElecPrice}}</span>
              </i-col>
              <i-col class="topInfoValueCol" span="3">
                <span>{{item.settleTotal}}</span>
              </i-col>
            </Row>
          </div>
        </div>
        <div class="modalMiddle">
          <div class="middleTitle">||| 争议内容</div>
          <div class="battleBodyControl">
            <div class="battleBody">
              <div class="battleContentDiv">
                <Row class="battleChat" v-for="(item, index) in battleChats" :key="index">
                  <i-col span="2" class="cavControlCol">
                    <div v-if="item.batter === '01'" class="battleUserCav collBackCav">回</div>
                    <div v-if="item.batter === '02'" class="battleUserCav">争</div>
                  </i-col>
                  <i-col span="22">
                    <div class="battleContentBody">
                      <div class="battlerName">
                        <span v-if="item.batter === '01'">中心回复</span>
                        <span v-if="item.batter === '02'">电厂争议</span>
                      </div>
                      <!-- <div class="battleIntro">{{item.intro}}</div> -->
                      <div class="battleContent">{{item.content}}</div>
                      <div class="battleDate">{{item.battleDate}}</div>
                    </div>
                  </i-col>
                </Row>
              </div>
            </div>
          </div>
        </div>
        <div class="modalBottom">
          <div class="bottomTitle">||| 争议回复</div>
          <div class="battleEditArea">
            <Form ref="battleForm" :model="battleForm">
              <FormItem prop="battleSendContent">
                <Input
                  style="width:100%;"
                  v-model="battleForm.battleSendContent"
                  placeholder="请输入回复内容"
                  type="textarea"
                  :rows="3"
                />
                <Row :gutter="18">
                  <i-col span="12" class="sendCol">
                    <FormItem>
                      <Button type="primary" style="width:100px;" @click="sendBattleContent">回复</Button>
                    </FormItem>
                  </i-col>
                  <i-col span="12">
                    <FormItem>
                      <Button
                        type="primary"
                        style="width:100px;background-color:#cccccc;border:1px solid rgba(228, 228, 228, 1);border-radius:4px;font-weight: 400;color:#ffffff"
                        @click="closeBattleModal"
                      >取消</Button>
                    </FormItem>
                  </i-col>
                </Row>
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import * as api from '@/api/fictitiousPowerPlant/userMeasurement/mainview-data.js'
import '@/view/fictitiousPowerPlant/userMeasurement/userMeasurement.less'
import { dateToString } from '@/libs/index'
import Tables from '_c/tables'

export default {
  name: 'userMeasurement',
  components: {
    Tables
  },
  props: {},
  data () {
    return {
      mainHeight: 'height: 820px;',
      tableHeight: 525,
      tradeNo: '',
      settleElecs: '',
      settleElecPrice: '',
      agreementComplateRate: '',
      userMeasurementColumns: {
        columns: [
          {
            width: 50,
            key: 'select',
            align: 'center',
            type: 'selection'
          },
          {
            title: '序号',
            key: 'tableNo',
            width: 100,
            sortable: true,
            align: 'center',
            render: (h, params) => {
              return h('span', this.showTableIndex(params))
            }
          },
          {
            title: '业主名称',
            key: 'ownerName',
            width: 150,
            align: 'center'
          },
          {
            title: '业主结算金额(元)',
            key: 'settleAmt',
            width: 150,
            align: 'center'
          },
          {
          //   title: '用户电费',
          //   key: 'clientFee',
          //   width: 150,
          //   align: 'center'
          // },
          // {
          //   title: '虚拟电厂电费',
          //   key: 'xndcFee',
          //   width: 150,
          //   align: 'center'
          // },
          // {
            title: '结算状态',
            key: 'controlType',
            width: 200,
            align: 'center',
            render: (h, params) => {
              if (params.row.controlType !== '争议') {
                return h('span', params.row.controlType)
              } else {
                return h(
                  'a',
                  {
                    props: {
                      href: '#',
                      type: 'primary'
                    },
                    on: {
                      click: () => {
                        this.showBattleModal(params)
                      }
                    }
                  },
                  params.row.controlType
                )
              }
            }
          },
          {
            title: '目标发电量(kWh)',
            key: 'targetP',
            width: 150,
            align: 'center'
          },
          {
            title: '虚拟发电量(kWh)',
            key: 'virGenEnergy',
            width: 200,
            align: 'center'
          },
          {
            title: '计划完成率(%)',
            key: 'finishRate',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('span', params.row.finishRate + '%')
            }
          },
          {
            title: '响应时间段',
            key: 'duration',
            width: 250,
            align: 'center'
          }
        ],
        axiosUrl: 'uac/accountMeasurementSettlement'
      },
      userMeasurementTableLoading: false,
      userMeasurementAjaxData: {},
      current: 1,
      pageSize: 25,
      total: 0,
      selectDatas: [],
      showModalFlag: false,
      modalUserName: '',
      modalMedicalGroupName: '',
      modalSupportElec: '',
      modifyFormRuleValidate: {
        actualElec: [
          { required: true, message: '请输入实际发电量', trigger: 'blur' }
        ],
        settleElecPrice: [
          { required: true, message: '请输入结算电价', trigger: 'blur' }
        ]
      },
      modifySearchBarForm: {
        ownerSettleId: '',
        actualElec: '',
        settleElecPrice: '',
        changePrice: '',
        settleTotal: 0
      },
      modifying: false,
      showBattleModalFlag: false,
      battleSelectionData: {
        user: '',
        realSupportElec: '',
        battleSettleTotalPrice: '',
        battleSettleStatus: '',
        ownerSettleId: '',
        unitInfos: []
      },
      battleChats: [],
      battleForm: {
        battleSendContent: ''
      },
      sendFlag: false,
      quaryTradeNo: ''
    }
  },
  methods: {
    showTableIndex (params) {
      return (
        (this.current > 0 ? this.current - 1 : this.current) * this.pageSize +
        params.index +
        1
      )
    },
    onUserMeasurementLoadData () {
      this.userMeasurementTableLoading = false
    },
    onUserMeasurementLoadDataPageInfo (
      tmpCurrent,
      tmpPageSize,
      total,
      totalPage
    ) {
      this.current = tmpCurrent
      this.pageSize = tmpPageSize
      this.total = total
    },
    getTableData () {
      this.$refs.userMeasurementTable.onPageChange(this.current, this.pageSize)
    },
    selectionChange (data) {
      this.selectDatas = data
    },
    showModifyModal () {
      if (this.selectDatas.length !== 1) {
        this.$Message.error('请选择一条数据!')
        return
      }
      this.modalUserName = this.selectDatas[0].ownerName
      this.modalMedicalGroupName = this.selectDatas[0].unitName
      this.modalSupportElec = this.selectDatas[0].targetP
      this.modifySearchBarForm.ownerSettleId = this.selectDatas[0].ownerSettleId
      this.modifySearchBarForm.actualElec = this.selectDatas[0].actualP
      this.modifySearchBarForm.settleElecPrice = this.selectDatas[0].settleAmt
      this.setTotalSettle()
      if (!this.showModalFlag) {
        this.showModalFlag = true
      }
    },
    closeModifyModal () {
      this.showModalFlag = false
    },
    resetModifyModalData () {
      this.modalUserName = ''
      this.modalMedicalGroupName = ''
      this.modalSupportElec = ''
      this.modifySearchBarForm.actualElec = ''
      this.modifySearchBarForm.settleElecPrice = ''
      this.modifySearchBarForm.changePrice = ''
      this.modifySearchBarForm.settleTotal = 0
    },
    setTotalSettle () {
      let actualElec = this.modifySearchBarForm.actualElec
      let settleElecPrice = this.modifySearchBarForm.settleElecPrice
      let changePrice = this.modifySearchBarForm.changePrice
      if (
        typeof actualElec !== 'undefined' &&
        typeof settleElecPrice !== 'undefined' &&
        actualElec !== '' &&
        settleElecPrice !== '' &&
        actualElec % 1 === 0 &&
        settleElecPrice % 1 === 0
      ) {
        if (
          typeof changePrice !== 'undefined' &&
          changePrice % 1 === 0 &&
          changePrice !== ''
        ) {
          this.modifySearchBarForm.settleTotal =
            actualElec * settleElecPrice + Number(changePrice)
        } else {
          this.modifySearchBarForm.settleTotal = actualElec * settleElecPrice
        }
      } else {
        this.modifySearchBarForm.settleTotal = 0
      }
    },
    modifySettle: function (name = 'modifySearchBarForm') {
      let _this = this
      if (_this.modifying) {
        return
      }
      _this.$refs[name].validate(valid => {
        if (valid) {
          _this.modifying = true
          api
            .getSettleInfoRevise({
              actualP: _this.modifySearchBarForm.actualElec,
              ownerSettleId: _this.modifySearchBarForm.ownerSettleId,
              settleAmt: _this.modifySearchBarForm.settleElecPrice,
              settlePrice: _this.modifySearchBarForm.settleTotal
            })
            .then(res => {
              let isSuccess = res.data.data
              if (isSuccess) {
                _this.$Message.info('修订成功!')
              } else {
                _this.$Message.error('修订失败！')
              }
            })
            .catch(err => {
              _this.$Message.error('修订失败！')
            })
            .finally(() => {
              _this.modifying = false
              _this.showModalFlag = false
              _this.current = 1
              _this.selectDatas = []
              _this.getTableData()
            })
        } else {
          _this.$Message.error('请补充查询条件!')
        }
      })
    },
    settlePublic () {
      let _this = this
      if (_this.selectDatas.length === 0) {
        _this.$Message.error('请选择数据!')
        return
      }
      // TODO Ajax
      // let ajaxData = _this.selectDatas;
      setTimeout(() => {
        let isOk = true
        if (isOk) {
          _this.$Message.info('结算成功!')
        } else {
          // TODO DATA.MESSAGE
          _this.$Message.error('结算失败!')
        }
        _this.modifying = false
      }, 100)
    },
    showBattleModal (params) {
      this.battleSelectionData.user = params.row.ownerName
      this.battleSelectionData.realSupportElec = params.row.actualP
      this.battleSelectionData.battleSettleTotalPrice = params.row.settleAmt
      this.battleSelectionData.battleSettleStatus = params.row.controlType
      this.battleSelectionData.ownerSettleId = params.row.ownerSettleId
      this.getUnitSettleInfo(params.row.ownerNo, this.quaryTradeNo)
      this.getSettlementDispute(params.row.ownerSettleId)
      this.showBattleModalFlag = true
    },
    closeBattleModal () {
      this.showBattleModalFlag = false
    },
    resetBattleModal () {
      this.battleSelectionData.user = ''
      this.battleSelectionData.realSupportElec = ''
      this.battleSelectionData.battleSettleTotalPrice = ''
      this.battleSelectionData.battleSettleStatus = ''
      this.battleSelectionData.ownerSettleId = ''
      this.battleSelectionData.unitInfos = []
      this.battleChats = []
      this.battleForm.battleSendContent = ''
    },
    sendBattleContent () {
      let _this = this
      if (_this.sendFlag) {
        return
      }
      if (
        typeof _this.battleForm.battleSendContent !== 'undefined' &&
        _this.battleForm.battleSendContent.length > 0
      ) {
        _this.sendFlag = true
        api
          .setDisputeReply({
            ownerSettleId: _this.battleSelectionData.ownerSettleId,
            replyContent: _this.battleForm.battleSendContent
          })
          .then(res => {
            let isSuccess = res.data.data
            if (isSuccess) {
              let obj = {
                batter: '01',
                content: _this.battleForm.battleSendContent,
                battleDate: dateToString(new Date(), false)
              }
              _this.battleChats.push(obj)
              _this.battleForm.battleSendContent = ''
              _this.$nextTick(() => {
                let offsetHeight = document
                  .getElementsByClassName('battleModalBody')[0]
                  .getElementsByClassName('battleContentDiv')[0].offsetHeight
                document
                  .getElementsByClassName('battleModalBody')[0]
                  .getElementsByClassName('battleBody')[0].scrollTop = Number(
                    offsetHeight
                  )
              })
              _this.$Message.info('回复成功!')
            } else {
              _this.$Message.error('回复失败！')
            }
          })
          .catch(err => {
            _this.$Message.error('回复失败！')
          })
          .finally(() => {
            _this.sendFlag = false
          })
      } else {
        _this.$Message.error('请输入回复内容!')
      }
    },
    getSettleMentInfo (tradeNo) {
      let _this = this
      api
        .getSettleMentInfo({
          tradeNo: tradeNo
        })
        .then(res => {
          let data = res.data.data
          if (typeof data !== 'undefined' && data !== null) {
            _this.tradeNo = data.tradeNo
            _this.settleElecs = data.settleEnergy
            _this.settleElecPrice = data.settlePrice
            _this.agreementComplateRate = data.finishRate
          }
        })
        .catch(err => {
          _this.$Message.error('结算列表查询失败！')
        })
    },
    getUnitSettleInfo (ownerNo, tradeNo) {
      let _this = this
      api
        .getUnitSettleInfo({
          ownerNo: ownerNo,
          tradeNo: tradeNo
        })
        .then(res => {
          let list = res.data.data
          if (typeof list !== 'undefined' && list !== null && list.length > 0) {
            _this.battleSelectionData.unitInfos = []
            for (let index = 0; index < list.length; index++) {
              let obj = {
                medicalGroupName: list[index].unitName,
                virtualSupportElecs: list[index].virGenEnergy,
                supportElecTimes:
                  list[index].beginTime + '~' + list[index].endTime,
                settleElecPrice: list[index].settlePrice,
                settleTotal: list[index].settleAmt
              }
              _this.battleSelectionData.unitInfos.push(obj)
            }
          }
        })
        .catch(err => {
          _this.$Message.error('机组结算数据获取失败！')
        })
    },
    getSettlementDispute (ownerSettleId) {
      let _this = this
      api
        .getSettlementDispute({
          ownerSettleId: ownerSettleId
        })
        .then(res => {
          let list = res.data.data
          if (typeof list !== 'undefined' && list !== null && list.length > 0) {
            _this.battleChats = []
            for (let index = 0; index < list.length; index++) {
              let obj = {
                batter: list[index].argueSubject,
                content: list[index].replyContent,
                battleDate: list[index].replaTime
              }
              _this.battleChats.push(obj)
            }
          }
        })
        .catch(err => {
          _this.$Message.error('争议数据获取失败！')
        })
    },
    getMountedData () {
      let _this = this
      let query = _this.$route.query
      if (query.from === 'measurment') {
        _this.quaryTradeNo = query.tradeNo
        let tradeNo = query.tradeNo
        _this.userMeasurementAjaxData = {
          limit: 25,
          page: 1,
          tradeNo: tradeNo
        }
        _this.getSettleMentInfo(tradeNo)
        _this.$nextTick(() => {
          _this.getTableData()
        })
      }
    },
    changeHeight: function () {
      this.mainHeight = 'height: ' + (window.innerHeight - 140) + 'px'
      this.tableHeight =
        window.innerHeight > 800 ? window.innerHeight - 198 : 525
    }
  },
  created () {},
  watch: {
    $route (newRoute) {
      let _this = this
      const { name, query, params, meta } = newRoute
      if (query.from === 'measurment') {
        _this.quaryTradeNo = query.tradeNo
        _this.userMeasurementAjaxData = {
          limit: 25,
          page: 1,
          tradeNo: query.tradeNo
        }
        _this.getSettleMentInfo(query.tradeNo)
        _this.$nextTick(() => {
          _this.getTableData()
        })
      }
    },
    showModalFlag (val) {
      if (!val) {
        this.resetModifyModalData()
      }
    },
    showBattleModalFlag (val) {
      if (!val) {
        this.resetBattleModal()
      }
    }
  },
  mounted () {
    this.getMountedData()
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
.userMeasurement {
  position: relative;
}

.userMeasurement .tableBarTitle,
.userMeasurement .infoTitleBar {
  font-weight: 650;
  font-size: 16px;
  color: #009999;
  line-height: 40px;
  padding-left: 12px;
  margin-bottom: 0;
  height: 45px;
  background: linear-gradient(
    180deg,
    rgba(252, 252, 252, 1) 0%,
    rgba(252, 252, 252, 1) 0%,
    rgba(246, 246, 246, 1) 100%,
    rgba(246, 246, 246, 1) 100%
  );
  border: 1px solid rgba(226, 226, 226, 1);
  border-radius: 4px;
  padding-left: 20px;
}

.userMeasurement .barToolBox {
  display: inline-block;
  position: absolute;
  top: 12px;
  right: 25px;
}

.userMeasurement .barToolBox div {
  display: inline-block;
  cursor: pointer;
}

.userMeasurement .barToolBox span {
  font-weight: 400;
  font-style: normal;
  font-size: 13px;
  color: #009999;
  vertical-align: top;
  margin-left: 5px;
}

.userMeasurement .barToolBox .lineImg {
  display: inline-block;
  height: 20px;
  margin: 0 10px 0 10px;
}

.userMeasurement .userMeasurementTable {
  padding: 16px 16px 0 16px;
  background-color: #fcfcfc;
}

.userMeasurement .rightCol {
  height: 100%;
}

.userMeasurement .rightCol .rightCard {
  height: 100%;
  background-color: #fcfcfc;
  overflow-y: auto;
}

.userMeasurement .rightCol .rightCard .infoBody {
  padding: 25px 25px 25px 45px;
}

.userMeasurement .rightCol .rightCard .infoBody .infoRow {
  margin-bottom: 10px;
}

.userMeasurement .rightCol .rightCard .infoBody span {
  color: #666666;
  font-size: 13px;
  word-break: break-all;
  vertical-align: top;
}

.userMeasurement .rightCol .rightCard .infoBody span.markValueFont {
  display: inline-block;
  width: 150px;
  color: #00aeae;
}

.userMeasurementModal .modifyModalBody {
  background-color: rgba(252, 252, 252, 1);
  box-sizing: border-box;
  border: 1px solid rgba(215, 215, 215, 1);
  border-radius: 4px;
  padding: 10px;
}

.userMeasurementModal .middleInfo {
  margin-top: 20px;
}

.userMeasurementModal .modifyModalBody .topInfo .topInfoTitle,
.userMeasurementModal .modifyModalBody .middleInfo .middleInfoTitle,
.battleModal .userSettleInfo .userSettleInfoTitle,
.battleModal .topInfo .topInfoTitle,
.battleModal .modalMiddle .middleTitle,
.battleModal .modalBottom .bottomTitle {
  font-weight: 650;
  font-style: normal;
  font-size: 16px;
  color: #009999;
  margin-bottom: 15px;
}

.battleModal .modalBottom .bottomTitle {
  margin-top: 10px;
}

.battleModal .modalMiddle .middleTitle {
  margin-top: 10px;
}

.userMeasurementModal .modifyModalBody .topInfo .infoDiv {
  font-weight: 400;
  font-size: 14px;
  color: #333333;
  padding-left: 15px;
  margin-bottom: 10px;
}

.userMeasurementModal .settleTotalValue {
  font-weight: 700;
  color: #009999;
  font-size: 16px;
}

.userMeasurementModal .settleTotalInfoFont {
  font-weight: 400;
  font-size: 14px;
  color: #999999;
  margin-left: 10px;
}

.userMeasurementModal .leftButtonControl {
  text-align: right;
}

.battleModal .battleModalBody {
  padding: 10px 16px 0 16px;
  background-color: #fcfcfc;
}

.battleModal .topInfoTable .topInfoRow {
  border-bottom: 2px solid #e8f4f4;
  height: 30px;
  line-height: 25px;
}

.battleModal .topInfoTable .topInfoValueRow {
  border-bottom: 2px solid #e8f4f4;
  min-height: 30px;
  line-height: 25px;
}

.battleModal .topInfoTable .topInfoCol,
.battleModal .topInfoTable .topInfoValueCol {
  text-align: center;
}

.battleModal .topInfoTable .topInfoCol span {
  font-weight: 400;
  font-size: 14px;
  color: #333333;
}

.battleModal .topInfoTable .topInfoValueCol span {
  font-weight: 400;
  font-size: 14px;
  color: #009999;
  word-break: break-word;
  display: inline-block;
}

.battleModal .battleBodyControl {
  padding: 0 5px 0px 5px;
}

.battleModal .battleBody {
  background-color: rgba(255, 255, 255, 1);
  box-sizing: border-box;
  border: 1px solid rgba(204, 204, 204, 1);
  border-radius: 4px;
  color: #cccccc;
  padding: 5px 5px 10px 5px;
  height: 185px;
  overflow-y: scroll;
}

.battleModal .battleBody .battleUserCav {
  display: inline-block;
  border-radius: 50%;
  background-color: #07b7db;
  width: 30px;
  height: 30px;
  font-weight: 400;
  font-size: 20px;
  color: #ffffff;
  line-height: 20px;
  padding: 4px 5px 5px 6px;
  margin-left: 5px;
  margin-top: 3px;
}
.battleModal .battleBody .battleUserCav.collBackCav {
  padding: 4px 5px 5px 5px;
  background-color: #00cccc;
}

.battleModal .battleBody::-webkit-scrollbar {
  width: 3px;
}
.battleModal .battleBody::-webkit-scrollbar-track-piece {
  background-color: #ffffff;
} /* 滚动条的内层滑轨背景颜色 */

.battleModal .battleBody::-webkit-scrollbar-track {
  background-color: #fff;
} /* 滚动条的外层滑轨背景颜色 */

.battleModal .battleBody::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 4px;
} /* 滚动条的内层滑块颜色 */

.battleModal .battleBody::-webkit-scrollbar-button {
  background-color: #fff;
  display: none;
}

.battleModal .battleBody .battleChat {
  margin-bottom: 10px;
}

.battleModal .battleBody .battlerName span {
  font-weight: 400;
  font-size: 14px;
  color: #333333;
}

.battleModal .battleBody .battleIntro,
.battleModal .battleBody .battleContent {
  font-weight: 400;
  font-size: 13px;
  line-height: 13px;
  word-break: break-all;
  margin-top: 2px;
}

.battleModal .battleBody .battleIntro {
  color: #666666;
}
.battleModal .battleBody .battleDate {
  display: inline-block;
  position: absolute;
  top: 0px;
  right: 5px;
}

.battleModal .battleEditArea {
  padding: 5px 5px 10px 5px;
  margin-top: -10px;
}

.battleModal .battleEditArea .sendCol {
  text-align: right;
}

.battleModal .userSettleInfo {
  margin-bottom: 10px;
}

.battleModal .userSettleInfo .userSettleInfoTitle {
  margin-bottom: 5px;
}

.battleModal .userSettleInfoText,
.battleModal .userSettleInfoValue {
  color: #333333;
  font-weight: 400;
  line-height: 28px;
}

.battleModal .userSettleInfoValue {
  color: #009999;
}
</style>
