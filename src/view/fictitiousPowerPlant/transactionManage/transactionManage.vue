<template>
  <div>
    <div v-show="!showChangePage">
      <div class="tm_header">
        <p>
          <img src="./images/u2269.png" alt />
        </p>
        <p>
          <span>交易管理查询</span>
        </p>
      </div>
      <div class="tm-search-box">
        <Form ref="formValidate" :model="searchItem" :label-width="120">
          <Row>
            <Col span="6">
              <FormItem label="交易编号:">
                <Input
                  v-model="searchItem.transactionCode"
                  placeholder="请输入交易编号"
                  style="width:150px"
                ></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem label="调控类型:">
                <Select
                  v-model="searchItem.regulationTypeValue"
                  style="width:150px"
                  @on-change="selectRegulationType"
                >
                  <Option
                    v-for="item in searchItem.regulationType"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.name }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem label="交易生成日期:">
                <DatePicker
                  v-model="searchItem.transactionStartTime"
                  @on-change="transactionCreateDateChange"
                  format="yyyy-MM-dd"
                  type="date"
                  placeholder="年-月-日"
                  style="width: 150px"
                  :clearable="false"
                ></DatePicker>至
                <DatePicker
                  v-model="searchItem.transactionEndTime"
                  @on-change="transactionEndDateChange"
                  format="yyyy-MM-dd"
                  type="date"
                  placeholder="年-月-日"
                  style="width: 150px"
                  :clearable="false"
                ></DatePicker>
              </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="12">
              <FormItem label="交易阶段:">
                <Select
                  v-model="searchItem.transactionStageValue"
                  style="width:150px"
                  @on-change="selectTransactionStage($event)"
                >
                  <Option
                    v-for="item in searchItem.transactionStage"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.name }}</Option>
                </Select>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem>
                <div class="primary-btn" @click="topPanelQuery">查询</div>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div class="tm_header tm_table_header">
        <p>
          <img src="./images/u2269.png" alt />
        </p>
        <p>
          <span>交易管理列表</span>
        </p>
      </div>
      <div class="tm_table_box">
        <Tables
          border
          stripe
          height="500"
          :row-class-name="rowClassName"
          ref="transactionTable"
          :columns="transactionTable.tansactionColumns"
          :axiosUrl="transactionTable.axiosUrl"
          :axiosData="transactionTable.transactionAjaxData"
          :loading="loading"
          @on-load-data="onProtectLoadData"
          @on-load-data-page-info="onProtectLoadDataPageInfo"
        ></Tables>
      </div>
    </div>
    <!--交易详情-->
    <div v-if="showChangePage">
      <div class="transaction-detail-content">
        <div class="transaction-list-box">
          <Card style="width:100%; height: 550px;">
            <div slot="title">
              <div>
                <img src="./images/u2269.png" alt />
              </div>
              <div>
                <span>交易列表</span>
              </div>
            </div>
            <div class="td-info">
              <div class="td-search-box">
                <Icon type="ios-search" @click="searchTradeNo"></Icon>
                <Input
                  v-model="filterTradeValue"
                  placeholder="请输入模糊搜索内容"
                  style="width: 100%"
                  size="large"
                ></Input>
              </div>
              <div class="list-box">
                <p>交易编号</p>
                <div>
                  <ul>
                    <li
                      v-for="(item, index) in transactionList"
                      :key="index"
                      @click="changeTransactionNo(item.tradeNo, index)"
                    >
                      <span class="circle" :class="activeIndex===index ? 'bg-color' : ''"></span>
                      <span
                        class="transaction-no"
                        :class="activeIndex===index ? 'bg-color' : ''"
                      >{{item.tradeNo}}</span>
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
              <div>
                <img src="./images/u2269.png" alt />
              </div>
              <div>
                <span>交易进程</span>
              </div>
            </div>
            <div class="process-content">
              <div class="tr-process">
                <div class="process publicity" @click="transactionPublicityFun">交易公示</div>
                <div class="tr-arrow">
                  <div></div>
                  <div></div>
                </div>
                <div
                  class="process declaration"
                  :class="{'isClearOut':isClearOut}"
                  @click="transactionDeclarationFun"
                >交易申报</div>
                <div class="tr-arrow">
                  <div></div>
                  <div></div>
                </div>
                <div class="process clearout" v-if="!isClearOut && !isSign">交易出清</div>
                <div
                  class="process isClearOut"
                  v-if="isClearOut && !isSign"
                  @click="clearOutFun"
                >交易出清</div>
                <div class="process isSign" v-if="isSign" @click="clearOutFun">交易出清</div>
                <div class="tr-arrow">
                  <div></div>
                  <div></div>
                </div>
                <div class="process contract" v-if="!isSign">合约签订</div>
                <div
                  class="process contract-sign"
                  v-if="isSign && !isSettlement"
                  @click="contractSignFun"
                >合约签订</div>
                <div
                  class="process settlement-sign"
                  v-if="isSettlement"
                  @click="contractSignFun"
                >合约签订</div>
                <div class="tr-arrow">
                  <div></div>
                  <div></div>
                </div>
                <div class="process settlement" v-if="!isSettlement">交易结算</div>
                <div
                  class="process issettlement"
                  :class="{'isSettlementEnd':isSettlementEnd}"
                  v-if="isSettlement"
                  @click="transactionSettlementFun"
                >交易结算</div>
              </div>
              <div class="pro-date">
                <div>
                  <p>{{transactionPublicityData.pulishDate}}</p>
                  <!--<p>00:00:00</p>-->
                </div>
                <div v-show="showDeclarationDate">
                  <p>{{ transactionDeclareData.declareEndDate }}</p>
                </div>
                <div v-show="showClearOutDate">
                  <p>{{transactionClearanceData.examineDate}}</p>
                </div>
                <div v-show="showSignDate">
                  <p>{{transactionTradeData.contractEndDate}}</p>
                </div>
                <div v-show="showSettlementDate">
                  <p>{{transactionMeasSettleData.settleDate}}</p>
                </div>
              </div>
              <div class="pro-detail-title">||| 详细信息</div>
              <div class="detail-content">
                <!--交易公示-->
                <div class="publicity-box" v-if="showTransactionPublicity">
                  <div class="pub-title">需求信息</div>
                  <div class="pub-detail">
                    <div>
                      <p>
                        交易名称：
                        <span>{{transactionPublicityData.noticeName}}</span>
                      </p>
                      <p>
                        交易编号：
                        <span>{{transactionPublicityData.tradeNo}}</span>
                      </p>
                      <p>
                        发布时间：
                        <span>{{transactionPublicityData.pulishDate}}</span>
                      </p>
                      <p>
                        申报开始时间：
                        <span>{{transactionPublicityData.validBeginDate}}</span>
                      </p>
                      <p>
                        申报结束时间：
                        <span>{{transactionPublicityData.validEndDate}}</span>
                      </p>
                      <p>
                        调控类型：
                        <span>{{transactionPublicityData.contrlType}}</span>
                      </p>
                    </div>
                    <div>
                      <Table
                        :row-class-name="rowClassNamerequired"
                        :columns="requiredTable.requiredColumn"
                        :data="requiredTable.requiredData"
                      ></Table>
                    </div>
                  </div>
                </div>
                <div class="declaration-box" v-if="showTransactionDeclaration">
                  <!--申报标题-->
                  <div class="dec-title" v-if="isDeclarationClick">
                    <span v-if="isDeclarationClick">申报信息</span>
                    <!--<span v-if="isClearOutClick">出清信息</span>-->
                    <span>
                      交易编号:
                      <span>{{ transactionDeclareData.tradeNo }}</span>
                    </span>
                    <span>
                      申报时间:
                      <span>{{ transactionDeclareData.declareDate }}</span>
                    </span>
                    <span>
                      调控类型:
                      <span>{{ transactionDeclareData.contrlType }}</span>
                    </span>
                    <span>
                      当前状态:
                      <span>{{ transactionDeclareData.declareStatusName }}</span>
                    </span>
                    <div v-if="transactionDeclareData.declareStatus==='02'">
                      通过时间:
                      <span>{{ transactionDeclareData.declareEndDate }}</span>
                    </div>
                  </div>
                  <!--出清标题-->
                  <div class="clear-title" v-if="isClearOutClick">
                    <span v-if="isClearOutClick">出清信息</span>
                    <span>
                      交易编号:
                      <span>{{ transactionClearanceData.tradeNo }}</span>
                    </span>
                    <span>
                      发布时间:
                      <span>{{ transactionClearanceData.clearDate }}</span>
                    </span>
                    <span>
                      调控类型:
                      <span>{{ transactionClearanceData.contrlType }}</span>
                    </span>
                    <span>
                      当前状态:
                      <span>{{ transactionClearanceData.clearStatusName }}</span>
                    </span>
                    <div
                      v-if="transactionClearanceData.declareStatus ==='03' || transactionClearanceData.declareStatus ==='02'"
                    >
                      审核时间:
                      <span>{{transactionClearanceData.examineDate}}</span>
                    </div>
                  </div>
                  <!--申报详情-->
                  <div class="dec-detail-box" v-if="isDeclarationClick">
                    <div>报价详情</div>
                    <div>
                      <div>
                        <Table
                          max-height="160"
                          :row-class-name="rowClassNameDetail"
                          :columns="quoteDetailTable.quotePriceColumn"
                          :data="quoteDetailTable.quotePriceData"
                        ></Table>
                      </div>
                      <div v-if="transactionDeclareData.declareStatus==='01'"></div>
                      <div
                        v-show="transactionDeclareData.declareStatus==='03' && transactionDeclareData.jiaoYiJieDuan!=='05' && isClickGiveUpBtn"
                      >
                        <div class="giveupBtn" @click="giveUpDeclare">放弃</div>
                      </div>
                      <div v-if="transactionDeclareData.declareStatus==='02'">
                        <div class="clearoutBtn" @click="clearOutClick">
                          交易出清
                          <img src="./images/u2509.png" alt />
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--出清详情-->
                  <div class="clear-detail-box" v-if="isClearOutClick && !isSignClick">
                    <div v-if="isClearOutClick">出清详情</div>
                    <div>
                      <div>
                        <Table
                          max-height="160"
                          :row-class-name="rowClassNameDetail"
                          :columns="clearDetailTable.clearDetailColumn"
                          :data="clearDetailTable.clearDetailData"
                        ></Table>
                      </div>
                      <div v-if="isGiveUpClearOut"></div>
                      <div
                        v-show="!isAcceptClearOut && !isGiveUpClearOut && transactionClearanceData.declareStatus==='01'"
                      >
                        <div class="acceptBtn" @click="acceptClearOutClick">接受</div>
                        <div class="giveup-Btn" @click="giveUpclearOutClick">放弃</div>
                      </div>
                      <div v-if="transactionClearanceData.declareStatus==='02'">
                        <div class="signBtn" @click="contractSignClick">
                          合约签订
                          <img src="./images/u2509.png" alt />
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--合约签订-->
                  <div class="contract-box" v-if="isSignClick && !isSettlementClick">
                    <div class="pub-title">合同信息</div>
                    <div class="contract-detail">
                      <div>
                        <p>
                          合同编号：
                          <span>{{ transactionTradeData.contractNo}}</span>
                        </p>
                        <p>
                          交易编号：
                          <span>{{ transactionTradeData.tradeNo }}</span>
                        </p>
                        <p>
                          调控类型：
                          <span>{{ transactionTradeData.contrlType }}</span>
                        </p>
                      </div>
                      <div>
                        <p>
                          生成时间：
                          <span>{{ transactionTradeData.contractDate }}</span>
                        </p>
                        <p>
                          合同类型：
                          <span>{{ transactionTradeData.contractCycle }}</span>
                        </p>
                        <p>
                          合同电量(kWh)：
                          <span>{{ transactionTradeData.clareEnergy }}</span>
                        </p>
                      </div>
                      <div>
                        <p>
                          当前状态：
                          <span>{{ transactionTradeData.contractStatusName }}</span>
                        </p>
                        <p
                          class="ct-detail"
                          v-if="transactionTradeData.contractStatus==='01' || transactionTradeData.contractStatus==='02'"
                          @click="goToContractDetail"
                        >
                          <a href="javaScript:void(0)">合同详情</a>
                        </p>
                        <p>
                          合同金额(元)：
                          <span>{{ transactionTradeData.contractPrice }}</span>
                        </p>
                      </div>
                      <div class="settlement" v-if="transactionTradeData.contractStatus==='03'">
                        <div @click="settlementClick">
                          交易结算
                          <img src="./images/u2509.png" alt />
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--交易结算-->
                  <div class="contract-box" v-if="isSettlementClick">
                    <div class="pub-title">交易结算</div>
                    <div class="contract-detail">
                      <div>
                        <p>
                          结算编号：
                          <span>{{transactionMeasSettleData.tradeId}}</span>
                        </p>
                        <p>
                          合同编号：
                          <span>{{transactionMeasSettleData.contractNo }}</span>
                        </p>
                        <p>
                          结算总价(元)：
                          <span>{{transactionMeasSettleData.settlePrice}}</span>
                        </p>
                      </div>
                      <div>
                        <p>
                          当前状态：
                          <span>{{transactionMeasSettleData.settleStatusName}}</span>
                        </p>
                        <p>
                          完成率：
                          <span>{{transactionMeasSettleData.finishRate}}</span>
                        </p>
                        <p>
                          结算电量(kWh)：
                          <span>{{transactionMeasSettleData.settleEnergy}}</span>
                        </p>
                      </div>
                      <div v-if="transactionMeasSettleData.controlType==='01'">
                        <p class="ct-detail" @click="goToUserMeasurement">
                          <a href="javaScript:void(0)">用户结算详情</a>
                        </p>
                      </div>
                      <div class="settlement" v-if="!isSettlementEnd">
                        <div @click="settlementEndClick">
                          交易完结
                          <img src="./images/u2509.png" alt />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div class="goback-primary">
        <div class="primary" @click="goback">返回</div>
      </div>
    </div>
    <!--合同详情处理弹窗-->
    <Modal
      class="contract-detail-modal"
      width="1000"
      draggable
      :zIndex="1000"
      :value="showContractDetailHandleFlag"
      footer-hide
      closable
      @on-visible-change="closeContractDetailModal($event)"
      title="合同详情处理"
    >
      <div class="contract-detail-box">
        <div class="contract-table-box">
          <div class="title">||| 合同信息</div>
          <div class="table-box">
            <Table
              :row-class-name="contractRowClassName"
              :columns="contractInfoTable.contractInfoColumn"
              :data="contractInfoTable.contractInfoData"
            ></Table>
          </div>
        </div>
        <div class="dispute-communicate-box">
          <div class="title">||| 争议沟通内容</div>
          <div class="content-box">
            <div class="content" v-for="(item, index) in contractArgueData">
              <div class="left" v-if="item.argueType==='01'">
                <div class="dispute">争</div>
              </div>
              <div class="left" v-if="item.argueType==='02'">
                <div class="dispute">回</div>
              </div>
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
          <div class="title">||| 争议内容填写</div>
          <div>
            <Input
              v-model="contractContentEditorValue"
              show-word-limit
              type="textarea"
              placeholder="可编辑"
              style="width: 100%"
            />
          </div>
        </div>
      </div>
      <div class="contract-button-box">
        <div>
          <div class="examine">审核通过</div>
          <div class="report">上报争议</div>
          <div class="cancel" @click="showContractDetailHandleFlag=false">取消</div>
        </div>
      </div>
    </Modal>
    <!--详情弹窗-->
    <!--<transaction-detail :showTransactionDetailFlag="showTransactionDetailFlag" @closeModalFun="closeModalFun"></transaction-detail>-->
  </div>
</template>

<script>
import Tables from "_c/tables";
import transactionDetail from "./transactionDetail";
import axios from "@/libs/api.request";
import { accordTypeEvaluation } from "../util";
export default {
  name: "transactionManage",
  props: {},
  components: {
    Tables,
    transactionDetail
  },
  data() {
    return {
      searchItem: {
        transactionCode: "",
        transactionStartTime: "",
        transactionEndTime: "",
        startTimeOptions: {}, // 开始日期约束
        endTimeOptions: {}, // 结束日期约束
        regulationType: [{ name: "-全部-", value: "all" }],
        regulationTypeValue: "all",
        transactionStage: [{ name: "-全部-", value: "all" }],
        transactionStageValue: "all"
      },
      transactionTable: {
        tansactionColumns: [
          {
            title: "序号",
            type: "index",
            key: "index",
            width: "100",
            align: "center",
            sortable: true
          },
          {
            title: "交易编号",
            key: "tradeNo",
            width: "150",
            align: "center"
          },
          {
            title: "调控类型",
            key: "controlType",
            align: "center",
            render: (h, params) => {
              return h(
                "span",
                accordTypeEvaluation(
                  this.searchItem.regulationType,
                  params.row.controlType,
                  "name",
                  "value"
                )
              );
            }
          },
          {
            title: "生成时间",
            key: "jiaoYiRiQi",
            width: "200",
            align: "center"
          },
          {
            title: "交易阶段",
            key: "jiaoYiJieDuan",
            align: "center",
            render: (h, params) => {
              return h(
                "span",
                accordTypeEvaluation(
                  this.searchItem.transactionStage,
                  params.row.jiaoYiJieDuan,
                  "name",
                  "value"
                )
              );
            }
          },
          {
            title: "当前状态",
            key: "statusCode",
            align: "center"
          },
          {
            title: "详情",
            key: "detail",
            align: "center",
            render: (h, params) => {
              if (params.row.currentStatus === "已申请") {
                return h(
                  "a",
                  {
                    style: {
                      color: "#ec1c24"
                    },
                    props: {
                      href: "#",
                      type: "primary"
                    },
                    on: {
                      click: () => {
                        this.goToDetail(params);
                      }
                    }
                  },
                  "详情"
                );
              } else {
                return h(
                  "a",
                  {
                    props: {
                      href: "#",
                      type: "primary"
                    },
                    on: {
                      click: () => {
                        this.goToDetail(params);
                      }
                    }
                  },
                  "详情"
                );
              }
            }
          }
        ],
        // TODO AJAX URL
        axiosUrl: "tmc/transactionManagement",
        transactionAjaxData: {}
      },
      loading: false,
      current: 1,
      pageSize: 25,
      total: 0,
      showTransactionDetailFlag: false,
      showChangePage: false,
      // ------交易详情--------
      filterTradeValue: "",
      activeIndex: 0,
      // 申报阶段--报价详情table
      quoteDetailTable: {
        quotePriceColumn: [
          {
            title: "分段",
            key: "segmentNo",
            align: "center",
            width: "70"
          },
          {
            title: "开始时间",
            key: "beginDate",
            align: "center",
            width: "200"
          },
          {
            title: "结束时间",
            key: "endDate",
            align: "center",
            width: "200"
          },
          {
            title: "申报电量(kWh)",
            key: "declareEnergy",
            align: "center",
            width: "150"
          },
          {
            title: "申报电价(元)",
            key: "declarePrice",
            align: "center",
            width: "120"
          }
        ],
        quotePriceData: []
      },
      // 出清阶段=出清详情table
      clearDetailTable: {
        clearDetailColumn: [
          {
            title: "分段",
            key: "segmentNo",
            align: "center",
            width: "70"
          },
          {
            title: "开始时间",
            key: "beginDate",
            align: "center",
            width: "200"
          },
          {
            title: "结束时间",
            key: "endDate",
            align: "center",
            width: "200"
          },
          {
            title: "申报电量(kWh)",
            key: "clareEnergy",
            align: "center",
            width: "150"
          },
          {
            title: "申报电价(元)",
            key: "clarePrice",
            align: "center",
            width: "120"
          }
        ],
        clearDetailData: []
      },
      requiredTable: {
        requiredColumn: [
          {
            title: "分段",
            key: "segmentNo",
            align: "center",
            width: "100"
          },
          {
            title: "需求电量(kWh)",
            key: "requireEnergy",
            align: "center",
            width: "150"
          },
          {
            title: "开始时间",
            key: "requireEnergyBeginDate",
            align: "center",
            width: "200"
          },
          {
            title: "结束时间",
            key: "requireEnergyEndDate",
            align: "center",
            width: "200"
          }
        ],
        requiredData: [
          // {
          //   section: '1',
          //   requiredElectricity: 100,
          //   startTime: '20190919-08:00:00',
          //   endTime: '20190919-12:00:00'
          // },
          // {
          //   section: '2',
          //   requiredElectricity: 200,
          //   startTime: '20190919-12:00:00',
          //   endTime: '20190919-16:00:00'
          // },
          // {
          //   section: '3',
          //   requiredElectricity: 300,
          //   startTime: '20190919-16:00:00',
          //   endTime: '20190919-20:00:00'
          // }
        ]
      },
      contractInfoTable: {
        contractInfoColumn: [
          {
            title: "分段",
            key: "segmentNo",
            align: "center",
            width: "80"
          },
          {
            title: "出清电量(kWh)",
            key: "clareEnergy",
            align: "center",
            width: "150"
          },
          {
            title: "已执行电量(kWh)",
            key: "executedEnergy",
            align: "center",
            width: "150"
          },
          {
            title: "开始时间",
            key: "beginDate",
            align: "center",
            width: "180"
          },
          {
            title: "结束时间",
            key: "endDate",
            align: "center",
            width: "180"
          },
          {
            title: "合同电价(元)",
            key: "contractPrice",
            align: "center",
            width: "120"
          }
        ],
        contractInfoData: []
      },
      contractArgueData: [],
      currentContractId: "",
      currentTreadeNo: "",
      transactionList: [],
      transactionPublicityData: {},
      transactionDeclareData: {},
      transactionClearanceData: {},
      transactionTradeData: {},
      transactionMeasSettleData: {},
      declareStatus: [],
      clearStatus: [],
      contractStatus: [],
      contractPeriod: [],
      settlementStatus: [],
      contractContentEditorValue: "",
      showTransactionPublicity: true,
      showTransactionDeclaration: false,
      showReapplyBtnFlag: false,
      currentStatus: "已申请",
      isClearOut: false, // 详情-是否是交易出清
      isClearOutClick: false, // 进程按钮-交易出清是否点击
      isDeclarationClick: false, // 进程按钮-交易申报是否点击
      isAcceptClearOut: false, // 详情-接受出清
      isGiveUpClearOut: false, // 详情-放弃出清
      isSignClick: false, // 进程按钮-交易出清是否点击
      isSign: false, // 详情-合约签订
      isSettlementClick: false, // 详情-交易结算
      isSettlement: false, // 详情-交易结算
      isSettlementEnd: false, // 详情-交易结算
      contractStatus: "待接收",
      showDeclarationDate: false,
      showClearOutDate: false,
      showSignDate: false,
      showSettlementDate: false,
      showContractDetailHandleFlag: false, // 合同详情处理弹窗
      isClickGiveUpBtn: true
    };
  },
  mounted() {
    let query = this.$route.query;
    if (query.from === "userSettle") {
      this.searchItem.transactionCode = query.tradeNo;
    }
    // 交易管理查询
    this.topPanelQuery();
    // 调控类型下拉查询
    this.regulationTypeQuery();
    // 交易阶段下拉查询
    this.transactionStageQuery();
    // 申报状态下拉查询
    this.declareStatusQuery();
    // 交易出清状态查询
    this.clearStatusQuery();
    // 合同状态查询
    this.contractStatusQuery();
    // 合同周期状态查询
    this.contractPeriodQuery();
    // 结算状态查询
    this.settlementStatusQuery();
    // 交易列表查询
    this.transactionListQuery();
  },
  watch: {
    $route(newRoute) {
      let _this = this;
      const { name, query, params, meta } = newRoute;
      if (query.from === "userSettle") {
        this.searchItem.transactionCode = query.tradeNo;
        this.topPanelQuery();
      }
    }
  },
  methods: {
    onProtectLoadData() {
      this.loading = false;
    },
    onProtectLoadDataPageInfo(tmpCurrent, tmpPageSize, total, totalPage) {
      this.current = tmpCurrent;
      this.pageSize = tmpPageSize;
      this.total = total;
    },
    // 查询
    topPanelQuery() {
      let _this = this;
      _this.transactionTable.transactionAjaxData = _this.cloneSearch();
      _this.current = 1;
      setTimeout(() => {
        _this.getTableData();
      }, 100);
    },
    cloneSearch() {
      let clone = {};
      let controlType = this.searchItem.regulationTypeValue;
      let jiaoYiJieDuan = this.searchItem.transactionStageValue;
      let jiaoYiRiQiBegin = this.searchItem.transactionStartTime;
      let jiaoYiRiQiEnd = this.searchItem.transactionEndTime;
      let tradeNo = this.searchItem.transactionCode;
      clone.controlType = controlType;
      clone.jiaoYiJieDuan = jiaoYiJieDuan;
      clone.jiaoYiRiQiBegin = jiaoYiRiQiBegin;
      clone.jiaoYiRiQiEnd = jiaoYiRiQiEnd;
      clone.tradeNo = tradeNo;
      return clone;
    },
    getTableData() {
      this.$refs.transactionTable.onPageChange(this.current, this.pageSize);
    },
    // 调控类型下拉查询
    regulationTypeQuery() {
      axios
        .request({
          url: "ddlc/dropDownListQuery?type=CONTRL_TYPE",
          method: "get"
        })
        .then(res => {
          if (res.data.code === 200) {
            for (let i = 0; i < res.data.data.length; i++) {
              this.searchItem.regulationType.push(res.data.data[i]);
            }
          }
        });
    },
    // 交易阶段下拉查询
    transactionStageQuery() {
      axios
        .request({
          url: "ddlc/dropDownListQuery?type=JIAO_YI_JIE_DUAN",
          method: "get"
        })
        .then(res => {
          if (res.data.code === 200) {
            for (let i = 0; i < res.data.data.length; i++) {
              this.searchItem.transactionStage.push(res.data.data[i]);
            }
          }
        });
    },
    // 申报状态查询
    declareStatusQuery() {
      axios
        .request({
          url: "ddlc/dropDownListQuery?type=DECLARE_STATUS",
          method: "get"
        })
        .then(res => {
          if (res.data.code === 200) {
            this.declareStatus = res.data.data;
          }
        });
    },
    // 交易出清状态
    clearStatusQuery() {
      axios
        .request({
          url: "ddlc/dropDownListQuery?type=CLARE_STATUS",
          method: "get"
        })
        .then(res => {
          if (res.data.code === 200) {
            this.clearStatus = res.data.data;
          }
        });
    },
    // 合同状态下拉查询
    contractStatusQuery() {
      axios
        .request({
          url: "ddlc/dropDownListQuery?type=CONTRACT_STATUS",
          method: "get"
        })
        .then(res => {
          if (res.data.code === 200) {
            this.contractStatus = res.data.data;
          }
        });
    },
    // 合同周期下拉查询
    settlementStatusQuery() {
      axios
        .request({
          url: "ddlc/dropDownListQuery?type=CONTRACT_CYCLE",
          method: "get"
        })
        .then(res => {
          if (res.data.code === 200) {
            this.contractPeriod = res.data.data;
          }
        });
    },
    // 结算状态查询
    contractPeriodQuery() {
      axios
        .request({
          url: "ddlc/dropDownListQuery?type=MEASURE_CONTROL_TYPE",
          method: "get"
        })
        .then(res => {
          if (res.data.code === 200) {
            this.settlementStatus = res.data.data;
          }
        });
    },
    selectRegulationType(value) {
      this.searchItem.regulationTypeValue = value;
    },
    selectTransactionStage(value) {
      this.searchItem.transactionStageValue = value;
    },
    transactionCreateDateChange(e) {
      this.searchItem.transactionStartTime = e;
      // this.searchItem.endTimeOptions = {
      //   disabledDate(date) {
      //     let startTime = this.searchItem.transactionStartTime ? new Date(this.searchItem.transactionStartTime).valueOf() : '';
      //     return date && (date.valueOf() < startTime);
      //     // return date && (date.valueOf() < startDate-86400000 || date.valueOf() > Date.now()-86400000) ;  此约束为当日之前开始日期之后
      //   }
      // }
    },
    transactionEndDateChange(e) {
      this.searchItem.transactionEndTime = e;
      // this.searchItem.startTimeOptions = {
      //   disabledDate(date) {
      //     let endTime = this.searchItem.transactionEndTime ? new Date(this.searchItem.transactionEndTime).valueOf() - 1 * 24 * 60 * 60 * 1000 : '';
      //     return date && date.valueOf() > endTime;
      //   }
      // }
    },
    // 列表点击详情
    goToDetail(params) {
      this.filterTradeValue = "";
      this.showChangePage = true;
      this.currentTreadeNo = params.row.tradeNo;
      for (let i = 0; i < this.transactionList.length; i++) {
        if (params.row.tradeNo === this.transactionList[i].tradeNo) {
          this.activeIndex = i;
          this.changeTransactionNo(this.transactionList[i].tradeNo, i);
        }
      }
      this.restData();
    },
    searchTradeNo() {
      this.transactionListQuery();
    },
    // 交易列表查询
    transactionListQuery() {
      axios
        .request({
          url: "tmc/transactionList?tradeNo=" + this.filterTradeValue,
          method: "get"
        })
        .then(res => {
          if (res.data.code === 200) {
            this.transactionList = res.data.data;
          }
        });
    },
    // 交易公示详细信息
    transactionPublicityQuery(tradeNo) {
      axios
        .request({
          url: "tmc/transactionPublicityDetails",
          data: tradeNo,
          method: "post"
        })
        .then(res => {
          if (res.data.code === 200 && res.data.data) {
            this.transactionPublicityData = res.data.data;
            this.transactionPublicityData.contrlType = accordTypeEvaluation(
              this.searchItem.regulationType,
              this.transactionPublicityData.contrlType,
              "name",
              "value"
            );
            this.requiredTable.requiredData =
              res.data.data.transactionPublicityDetailsResps;
          }
        });
    },
    // 交易申报详细信息
    transactionDeclareQuery(tradeNo) {
      axios
        .request({
          url: "tmc/transactionDeclareDetails",
          data: tradeNo,
          method: "post"
        })
        .then(res => {
          if (res.data.code === 200 && res.data.data) {
            this.transactionDeclareData = res.data.data;
            this.quoteDetailTable.quotePriceData =
              res.data.data.quotationDetailsResps;
            this.transactionDeclareData.contrlType = accordTypeEvaluation(
              this.searchItem.regulationType,
              res.data.data.contrlType,
              "name",
              "value"
            );
            this.transactionDeclareData.declareStatusName = accordTypeEvaluation(
              this.declareStatus,
              res.data.data.declareStatus,
              "name",
              "value"
            );
          }
        });
    },
    // 放弃申报
    giveUpDeclare() {
      axios
        .request({
          url: "tmc/transactionDeclareGiveUp",
          data: this.currentTreadeNo,
          method: "post"
        })
        .then(res => {
          if (res.data.code === 200) {
            this.getTableData();
            this.isClickGiveUpBtn = false;
          }
        });
    },
    // 交易出清详细信息
    transactionClearQuery(tradeNo) {
      axios
        .request({
          url: "tmc/transactionClearanceDetails",
          data: tradeNo,
          method: "post"
        })
        .then(res => {
          if (res.data.code === 200 && res.data.data) {
            this.transactionClearanceData = res.data.data;
            this.clearDetailTable.clearDetailData =
              res.data.data.clearDetailResps;
            this.transactionClearanceData.contrlType = accordTypeEvaluation(
              this.searchItem.regulationType,
              res.data.data.contrlType,
              "name",
              "value"
            );
            this.transactionClearanceData.clearStatusName = accordTypeEvaluation(
              this.clearStatus,
              res.data.data.declareStatus,
              "name",
              "value"
            );
          }
        });
    },
    // 交易合同详细信息
    transactionTradeQuery(tradeNo) {
      axios
        .request({
          url: "tmc/transactionTradeDetails",
          data: tradeNo,
          method: "post"
        })
        .then(res => {
          if (res.data.code === 200 && res.data.data) {
            this.transactionTradeData = res.data.data;
            this.transactionTradeData.contrlType = accordTypeEvaluation(
              this.searchItem.regulationType,
              res.data.data.contrlType,
              "name",
              "value"
            );
            this.transactionTradeData.contractStatusName = accordTypeEvaluation(
              this.contractStatus,
              res.data.data.contractStatus,
              "name",
              "value"
            );
            this.transactionTradeData.contractCycle = accordTypeEvaluation(
              this.contractPeriod,
              res.data.data.contractCycle,
              "name",
              "value"
            );
          }
        });
    },
    // 交易结算详细信息
    transactionMeasSettleQuery(tradeNo) {
      axios
        .request({
          url: "tmc/transactionMeasSettleDetails",
          data: tradeNo,
          method: "post"
        })
        .then(res => {
          if (res.data.code === 200 && res.data.data) {
            this.transactionMeasSettleData = res.data.data;
            this.transactionMeasSettleData.settleStatusName = accordTypeEvaluation(
              this.settlementStatus,
              res.data.data.controlType,
              "name",
              "value"
            );
          }
        });
    },
    closeModalFun(val) {
      if (val === false) {
        this.showTransactionDetailFlag = false;
      }
    },
    rowClassName(row, index) {
      if (row.currentStatus === "已申请") {
        return "tm-table-info-row";
      }
    },

    // -------------交易详情---------------
    // 重置数据
    restData() {
      this.showTransactionPublicity = true;
      this.showTransactionDeclaration = false;

      this.isClearOut = false;
      this.isClearOutClick = false;
      this.isDeclarationClick = false;
      this.isAcceptClearOut = false;
      this.isGiveUpClearOut = false;
      this.isSignClick = false;
      this.isSign = false;
      this.isSettlementClick = false;
      this.isSettlement = false;
      this.isSettlementEnd = false;
      this.showDeclarationDate = false;
      this.showClearOutDate = false;
      this.showSignDate = false;
      this.showSettlementDate = false;
    },
    // 点击左侧交易编号
    changeTransactionNo(tradeNo, index) {
      this.restData();
      this.activeIndex = index;
      // 交易公示详细信息
      this.transactionPublicityQuery(tradeNo);
      // 交易申报详细信息
      this.transactionDeclareQuery(tradeNo);
      // 交易出清详细信息
      this.transactionClearQuery(tradeNo);
      // 交易合同详细信息
      this.transactionTradeQuery(tradeNo);
      // 交易结算详细信息
      this.transactionMeasSettleQuery(tradeNo);

      // if (index === 0) {
      //   this.currentStatus = '已申请'
      // }
      // if (index === 1) {
      //   this.currentStatus = '已驳回'
      // }
      // if (index === 2 || index === 3 || index === 4 || index === 5) {
      //   this.currentStatus = '已通过'
      // }
      // if (index === 3) {
      //   this.contractStatus = '已接收'
      // }
      // if (index === 4) {
      //   this.contractStatus = '争议处理'
      // }
      // if (index === 5) {
      //   this.contractStatus = '已签约'
      // }
    },
    // 交易公示
    transactionPublicityFun() {
      this.showTransactionPublicity = true;
      this.showTransactionDeclaration = false;
      this.isDeclarationClick = false;
      this.isSignClick = false;
      this.isClearOutClick = false;
      this.isSettlementClick = false;
    },
    // 交易申报
    transactionDeclarationFun() {
      this.isDeclarationClick = true;
      this.showTransactionDeclaration = true;
      this.isClearOutClick = false;
      this.showTransactionPublicity = false;
      this.isSignClick = false;
      this.isSettlementClick = false;
      // 已经进入交易出清进程时
      if (this.isClearOut) {
        this.currentStatus = "已通过";
      }
    },
    // 交易出清
    clearOutFun() {
      this.isClearOutClick = true;
      this.isDeclarationClick = false;
      this.isSignClick = false;
      this.isSettlementClick = false;
      this.showTransactionPublicity = false;
      this.showTransactionDeclaration = true;
      // if ((this.isClearOut = true)) {
      //   this.currentStatus = '待操作'
      // }
      // if (this.isAcceptClearOut) {
      //   this.currentStatus = '已接受'
      // }
      // if (this.isGiveUpClearOut) {
      //   this.currentStatus = '未达成'
      // }
      // if (this.isSign) {
      //   this.currentStatus = '已接受'
      // }
    },
    // 合约签订
    contractSignFun() {
      this.isSignClick = true;
      this.isSettlementClick = false;
      this.isDeclarationClick = false;
      this.isClearOutClick = false;
      this.showTransactionPublicity = false;
      this.showTransactionDeclaration = true;
    },
    // 交易结算
    transactionSettlementFun() {
      this.isSettlementClick = true;
      this.isDeclarationClick = false;
      this.isClearOutClick = false;
      this.isSignClick = false;
      this.showTransactionPublicity = false;
      this.showTransactionDeclaration = true;
    },
    // 详情-交易出清点击事件
    clearOutClick() {
      this.isClearOut = true;
      this.isClearOutClick = true;
      this.isDeclarationClick = false;
      this.currentStatus = "待操作";
      // if (this.isAcceptClearOut) {
      //   this.currentStatus = '已接受'
      // }
      // if (this.isGiveUpClearOut) {
      //   this.currentStatus = '未达成'
      // }
      this.showDeclarationDate = true;
    },
    // 详情-接受出清点击
    acceptClearOutClick() {
      this.isGiveUpClearOut = false;
      this.isAcceptClearOut = true;
      let params = {
        declareStatus: "02",
        tradeNo: this.currentTreadeNo
      };
      axios
        .request({
          url: "tmc/transactionClearanceExamine",
          data: params,
          method: "post"
        })
        .then(res => {
          if (res.data.code === 200) {
            // this.getTableData()
            this.transactionClearQuery(this.currentTreadeNo);
          }
        });
      // this.transactionClearanceData.clearStatusName = '已接受'
    },
    // 详情-放弃出清点击
    giveUpclearOutClick() {
      let params = {
        declareStatus: "03",
        tradeNo: this.currentTreadeNo
      };
      axios
        .request({
          url: "tmc/transactionClearanceExamine",
          data: params,
          method: "post"
        })
        .then(res => {
          if (res.data.code === 200) {
            this.getTableData();
            this.transactionClearQuery(this.currentTreadeNo);
          }
        });
      // this.transactionClearanceData.clearStatusName = '未达成'
      this.isGiveUpClearOut = true;
    },
    // 详情-合约签订
    contractSignClick() {
      this.isSignClick = true;
      this.isSign = true;
      // 详情头部信息显示/隐藏
      this.isClearOutClick = false;
      this.isDeclarationClick = false;
      this.showClearOutDate = true;
    },
    // 合同详情处理弹窗跳转
    goToContractDetail() {
      axios
        .request({
          url: "tcmc/contractDetailsProcessing",
          data: this.transactionTradeData.contractId,
          method: "post"
        })
        .then(res => {
          if (res.data.code === 200 && res.data.data) {
            this.contractInfoTable.contractInfoData =
              res.data.data.tradeContractDetailResps;
            this.contractArgueData = res.data.data.contractArgueResps;
          }
        });
      this.showContractDetailHandleFlag = true;
    },
    contractRowClassName() {
      return "declaration-price-table-info-cell";
    },
    closeContractDetailModal(val) {
      if (val === false) {
        this.showContractDetailHandleFlag = false;
      }
    },
    // 详情-交易结算
    settlementClick() {
      this.isSettlement = true;
      this.isSettlementClick = true;
      this.showSignDate = true;
    },
    // 用户结算详情跳转
    goToUserMeasurement() {
      this.$router.push({
        name: "userMeasurement",
        query: {
          tradeNo: this.currentTreadeNo,
          from: "measurment"
        }
      });
    },
    // 详情-交易完结
    settlementEndClick() {
      this.isSettlementEnd = true;
      this.showSettlementDate = true;
    },
    rowClassNamerequired() {
      return "declaration-price-table-info-cell";
    },
    rowClassNameDetail(row, index) {
      if (index === 0 || index === 1 || index === 2) {
        return "declaration-price-table-info-cell";
      }
    },
    // 返回
    goback() {
      this.showChangePage = false;
    }
  }
};
</script>

<style lang="less">
@import "transactionManage.less";
</style>
