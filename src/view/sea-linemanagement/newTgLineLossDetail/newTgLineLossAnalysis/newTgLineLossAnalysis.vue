<template>
  <div class="new-tg-lineloss-analysis">
    <!--顶部搜索面板-->
    <div class="searchBar" :style="{height: searchBarFlag ? '100px' : '0', overflow : 'hidden'}">
      <Form ref="searchBarForm" :model="searchBarForm" :rules="ruleValidate" :label-width="80"  style="width: 1600px;" >
        <Row>
          <Col span="6">
            <FormItem label="供电单位" prop="orgName">
              <Poptip trigger="click" placement="bottom"  v-model="showOrgFlag">
                <Input search enter-button v-model="searchBarForm.orgName"
                       :placeholder="$t('please_input_org')" style="width: 100%"/>
                <div slot="content" style="max-height: 300px; overflow-y: auto">
                  <orgs :show-refresh-text="false" @on-select="selectOrg"></orgs>
                </div>
              </Poptip>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="台区名称" prop="menuName">
              <Input v-model="searchBarForm.tgName" placeholder="请输入台区名称" clearable style="width: 186px;" ></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="台区编号">
              <Input v-model="searchBarForm.tgNo" placeholder="请输入台区编号" clearable style="width: 186px;" ></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem>
              <Button type="primary" style="margin-left: 30px;" @click="queryLoadData('searchBarForm')">查询</Button>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="6">
            <FormItem prop="selectDateType" label="时间纬度">
              <RadioGroup v-model="searchBarForm.selectDateType" @on-change="changeDayMonth">
                <Radio label="day"><span>日</span></Radio>
                <Radio label="month"><span>月</span></Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="选择日期">
              <DatePicker type="date"
                          :value="searchBarForm.selectDate"
                          v-if="searchBarForm.selectDateType === 'day'"
                          @on-change="selectDateChange"
                          :clearable=false
                          placeholder="选择日期"
                          style="width: 186px"></DatePicker>
              <DatePicker type="month"
                          :value="searchBarForm.selectDate"
                          v-if="searchBarForm.selectDateType === 'month'"
                          @on-change="selectDateChange"
                          :clearable=false
                          placeholder="选择月份"
                          style="width: 186px"></DatePicker>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="台区状态">
              <Select v-model="searchBarForm.tgStatus"  style="width: 186px;"  >
                <Option v-for="item in tgStatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
          <!--<Col span="6">
            <FormItem label="台区类型">
              <Select v-model="searchBarForm.tgFlag"  style="width: 186px;"  >
                <Option v-for="item in tgFlagList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>-->
        </Row>
      </Form>
    </div>
    <div style="position: relative">
     <!-- <Spin v-if="showLoad" size="large" style="display: inline-block;"> </Spin>-->
      <div v-for="(item, index) in tableData" :key="index" v-show="changeFlag">
        <div style="clear: both;" v-if="index % 2 === 0"></div>
        <cardItem
          ref="cardItem"
          @dateTypeChange="dateTypeChange"
          :item="item"
          :index="index"
          :dateType="searchBarForm.selectDateType"
        />
      </div>

      <div v-show="!changeFlag" style="padding: 20px;">
        <Tables
          ref="tables"
          border
          :columns="columns"
          :axiosUrl="initUrl"
          :filename="'台区线损分析表格'"
          :axiosData="loadAxiosData"
          stripe
          :height="tableHeight"
          @on-load-data="onLoadData"
          :row-class-name="rowClassName"
          :current="resTgListData.currPage"
          @on-load-data-page-info="getTablePageInfo"/>
      </div>
      <div v-if="changeFlag" style="clear: both; margin-left: 20px">
        <Page @on-change="changePage" @on-page-size-change="changePageSize"
              :current.sync="resTgListData.currPage"
              :total="parseInt(resTgListData.totalCount)"
              :page-size="resTgListData.pageSize"
              :page-size-opts="resTgListData.pageSizeOpts"
              size="small" prev-text="上一页" next-text="下一页"
              show-total   show-elevator />
      </div>

      <div class="buttonBox">
        <div class="buttonBoxDiv" @click="searchBarFlag=!searchBarFlag">
          <img class="buttonBoxImgSearch" src="../../images/u48796.png" alt="搜索"></img>
        </div>

        <div class="buttonBoxDiv buttonBoxDivChange" @click="changeFlag=!changeFlag">
          <p v-if="changeFlag">表格切换</p>
          <p v-if="!changeFlag">表单切换</p>
        </div>

        <div class="buttonBoxDiv buttonBoxDivFilter" :class="{ 'selected' : selected.highLoss }" @click="tabSelected('highLoss')">
          <img class="buttonBoxImg" src="../../images/noSelected_highLoss.png" v-show="!selected.highLoss" alt="高损"></img>
          <img class="buttonBoxImg" src="../../images/selected_highLoss.png" v-show="selected.highLoss" alt="高损"></img>
          <Row>高损</Row>
        </div>

        <div class="buttonBoxDiv buttonBoxDivFilter" :class="{ 'selected' : selected.normal }" @click="tabSelected('normal')">
          <img class="buttonBoxImg" src="../../images/noSelected_normal.png" v-show="!selected.normal" alt="正常"></img>
          <img class="buttonBoxImg" src="../../images/selected_normal.png" v-show="selected.normal" alt="正常"></img>
          <Row>正常</Row>
        </div>

        <div class="buttonBoxDiv buttonBoxDivFilter" :class="{ 'selected' : selected.all }" @click="tabSelected('all')">
          <img class="buttonBoxImg" src="../../images/noSelected_all.png" v-show="!selected.all" alt="全部"></img>
          <img class="buttonBoxImg" src="../../images/selected_all.png" v-show="selected.all" alt="全部"></img>
          <Row>全部</Row>
        </div>

        <div class="buttonBoxDiv buttonBoxDivFilter" :class="{ 'selected' : selected.alarm }" @click="tabSelected('alarm')">
          <img class="buttonBoxImg" src="../../images/noSelected_alarm.png" v-show="!selected.alarm" alt="负损"></img>
          <img class="buttonBoxImg" src="../../images/selected_alarm.png" v-show="selected.alarm" alt="负损"></img>
          <Row>负损</Row>
        </div>

        <div class="buttonBoxDiv buttonBoxDivFilter" :class="{ 'selected' : selected.noCount }" @click="tabSelected('noCount')">
          <img class="buttonBoxImg" src="../../images/noSelected_noCount.png" v-show="!selected.noCount" alt="不可算"></img>
          <img class="buttonBoxImg" src="../../images/selected_noCount.png" v-show="selected.noCount" alt="不可算"></img>
          <Row>不可算</Row>
        </div>

        <div class="menu-bottom">
          <div class="buttonBoxDiv buttonBoxImgMenuBackground" @click="linkBoxFlag=!linkBoxFlag">
            <img class="buttonBoxImgMenu" src="../../images/u48802.png" alt="菜单"></img>
          </div>
          <div class="linkBox" v-show="linkBoxFlag">
            <router-link to="newSyntheticalAnalysis" class="comprehensive" tag="div">
              <div>
                <img src="../../images/u48815.png"/>
              </div>
              线损模型维护
            </router-link>
            <router-link to="newTgLineLossAnalysis" class="tg-line-loss selected" tag="div">
              <div>
                <img src="../../images/u48824.png"/>
              </div>
              台区线损分析
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <sea-modal ref="seaModal"
               :width="boxWidth < 1100 ? '1000px' : boxWidth * 0.8 + 'px'"
               :title="title" :tgState="tgState" :seaModelItem="seaModelItem"
               :titleStyle="'1'" :subTitle="subTitle" :showOrg="false"
               :dateType="seaModalDateType" :score="scoreShow"
               :dateRange="seaModalDateRange" :date="seaModalDate" @change-date="seaModalChangeDate"
               :tabs="tabs" @change-tab="changeTab" @select-org="selectOrg"
               @sea-model-query="seaModelQuery" >

      <div slot="trendAnalysis" style="height: 100%">
        <line-loss-table  ref="lineLossTable"
                          :query1="query1" :query2="query2" :query3="query3">
        </line-loss-table>
        <line-loss-curve :dataFromFather="dataFromFather"
                         :seaModelItem="seaModelItem"
                         :dayLabel="dayLabel"
                         @set-sea-model-param="setSeaModelParam">

        </line-loss-curve>
      </div>
      <div slot="analysisReport">
        <analysis-report :seaModelItem="seaModelItemReport"></analysis-report>
      </div>
    </sea-modal>
    <!--所有明细弹窗-->
    <div>
      <Modal
        v-model="layerShow"
        :width="boxWidth < 1100 ? '1000px' : boxWidth * 0.9 + 'px'"
        :value="true"
        draggable
        footer-hide
        :title="modalTitle">
        <component
          :ref="componentRef"
          :is="componentName"
          :axiosUrl="axiosUrl"
          :queryData="queryData"/>
      </Modal>
    <!--<Modal v-model="layerShow.tgZMeter" title="台区电表明细" footer-hide width="1300px" draggable>
      <tg-elec-meter-detail ref="tgZMeter" :queryData="queryData" :axiosUrl="axiosUrl"></tg-elec-meter-detail>
    </Modal>
    <Modal v-model="layerShow.tgCons" title="低压居民明细" footer-hide width="1300px" draggable>
      <low-power-person-detail ref="tgCons" :queryData="queryData" :axiosUrl="axiosUrl"></low-power-person-detail>
    </Modal>
    <Modal v-model="layerShow.tgGcCons" title="分布式电源" footer-hide width="1300px" draggable>
      <distributed-power ref="tgGcCons" :queryData="queryData" :axiosUrl="axiosUrl"></distributed-power>
    </Modal>
    <Modal v-model="layerShow.tgTmnl" title="终端地址" footer-hide width="1300px" draggable>
      <terminal-id ref="tgTmnl" :queryData="queryData" :axiosUrl="axiosUrl"></terminal-id>
    </Modal>
    <Modal v-model="layerShow.tgLineLoseCalcModel" title="台区线损计算模型" footer-hide width="1300px" draggable>
      <tg-line-loss-count-model ref="tgLineLoseCalcModel" :queryData="queryData" :axiosUrl="axiosUrl"></tg-line-loss-count-model>
    </Modal>
    <Modal v-model="layerShow.tgLineLosePower" title="线损数据监测" footer-hide width="1300px" draggable>
      <line-loss-power ref="tgLineLosePower" :axiosUrl="axiosUrl" :queryData="queryData"></line-loss-power>
    </Modal>-->
    <Modal v-model="tgPpq" title="台区低压用户电量明细" footer-hide
           :width="boxWidth < 1100 ? '1000px' : boxWidth * 0.9 + 'px'"
           draggable>
      <p slot="header">
        <span>台区低压用户电量明细<b style="color: #66FFCC;" v-show="repairFlag">（修复）</b></span>
      </p>
      <tg-power-detail ref="tgPpq" :axiosUrl="axiosUrl" :queryData="queryData"></tg-power-detail>
    </Modal>
    <!--<Modal v-model="layerShow.tgLoadDetail" title="负载率统计" footer-hide width="1300px" draggable>
      <load-rate-statistics ref="tgLoadDetail" :queryData="queryData" :axiosUrl="axiosUrl"></load-rate-statistics>
    </Modal>
    <Modal v-model="layerShow.tgReadDetail" title="采集明细" footer-hide width="1300px" draggable>
      <collection-details ref="tgReadDetail" :queryData="queryData" :axiosUrl="axiosUrl"></collection-details>
    </Modal>
    <Modal v-model="layerShow.tgCoverDetail" title="采集覆盖明细" footer-hide width="1300px" draggable>
      <collection-cover-detail ref="tgCoverDetail" :queryData="queryData" :axiosUrl="axiosUrl"></collection-cover-detail>
    </Modal>
    <Modal v-model="layerShow.tgPowerCalcErrorDetail" title="电量计算失败明细" footer-hide width="1300px" draggable>
      <power-count-alarm ref="tgPowerCalcErrorDetail" :queryData="queryData" :axiosUrl="axiosUrl"></power-count-alarm>
    </Modal>
    <Modal v-model="layerShow.tgUncoverDetail" title="未覆盖电表明细" footer-hide width="1300px" draggable>
      <no-cover-elec-meter ref="tgUncoverDetail" :queryData="queryData" :axiosUrl="axiosUrl"></no-cover-elec-meter>
    </Modal>
    <Modal v-model="layerShow.tgPowerAbnormalDetail" title="用电异常" footer-hide width="1300px" draggable>
      <use-elec-alarm ref="tgPowerAbnormalDetail" :queryData="queryData" :axiosUrl="axiosUrl"></use-elec-alarm>
    </Modal>
    <Modal v-model="layerShow.tgDataAbnormalDetail" title="档案异常明细" footer-hide width="1300px" draggable>
      <file-alarm-detail ref="tgDataAbnormalDetail" :queryData="queryData" :axiosUrl="axiosUrl"></file-alarm-detail>
    </Modal>
    <Modal v-model="layerShow.tgDistributionAbnormalDetail" title="配变异常" footer-hide width="1300px" draggable>
      <distribution-transformer-alarm ref="tgDistributionAbnormalDetail" :queryData="queryData" :axiosUrl="axiosUrl"></distribution-transformer-alarm>
    </Modal>
    <Modal v-model="layerShow.tgZeroPowerDetail" title="零电量电表明细" footer-hide width="1300px" draggable>
      <zero-volume-meter-detail ref="tgZeroPowerDetail" :axiosUrl="axiosUrl" :queryData="queryData"></zero-volume-meter-detail>
    </Modal>
    <Modal v-model="layerShow.tgMeteringAbnormalDetail" title="计量异常" footer-hide width="1300px" draggable>
      <metering-alarm ref="tgMeteringAbnormalDetail" :axiosUrl="axiosUrl" :queryData="queryData"></metering-alarm>
    </Modal>
    <Modal v-model="layerShow.tgStealElectricityDetail" title="疑似窃电户明细" footer-hide width="1300px" draggable>
      <stealing-elec-detail ref="tgStealElectricityDetail" :axiosUrl="axiosUrl" :queryData="queryData"></stealing-elec-detail>
    </Modal>
    <Modal v-model="layerShow.tgChangeMetDetail" title="换表记录" footer-hide width="1300px" draggable>
      <change-met ref="tgChangeMetDetail" :axiosUrl="axiosUrl" :queryData="queryData"></change-met>
    </Modal>
    <Modal v-model="layerShow.tgChangeFactorDetail" title="换倍率记录" footer-hide width="1300px" draggable>
      <change-factor ref="tgChangeFactorDetail" :axiosUrl="axiosUrl" :queryData="queryData"></change-factor>
    </Modal>-->
    </div>
  </div>
</template>

<script>
// import CommonSelectBox from '_c/common-select-box'
// import SeaModal from '_c/sea-modal'
// import analysisReport from './layerSub/analysisReport.vue'
// import tgElecMeterDetail from './layerSub/tgElecMeterDetail.vue'
// import lowPowerPersonDetail from './layerSub/lowPowerPersonDetail.vue'
// import distributedPower from './layerSub/distributedPower.vue'
// import terminalId from './layerSub/terminalId.vue'
// import tgLineLossCountModel from './layerSub/tgLineLossCountModel.vue'
// import lineLossPower from './layerSub/lineLossPower.vue'
// import tgPowerDetail from './layerSub/tgPowerDetail.vue'
// import loadRateStatistics from './layerSub/loadRateStatistics.vue'
// import collectionDetails from './layerSub/collectionDetails.vue'
// import collectionCoverDetail from './layerSub/collectionCoverDetail.vue'
// import powerCountAlarm from './layerSub/powerCountAlarm.vue'
// import noCoverElecMeter from './layerSub/noCoverElecMeter.vue'
// import useElecAlarm from './layerSub/useElecAlarm.vue'
// import fileAlarmDetail from './layerSub/fileAlarmDetail.vue'
// import distributionTransformerAlarm from './layerSub/distributionTransformerAlarm.vue'
// import zeroVolumeMeterDetail from './layerSub/zeroVolumeMeterDetail.vue'
// import meteringAlarm from './layerSub/meteringAlarm.vue'
// import stealingElecDetail from './layerSub/stealingElecDetail.vue'
// import lineLossTable from './layerSub/lineLossTable.vue'
// import lineLossCurve from './layerSub/lineLossCurve.vue'
// import changeFactor from './layerSub/changeFactor.vue'
// import changeMet from './layerSub/changeMet.vue'
import axios from '@/libs/api.request'
import Tables from '_c/tables'
import cardItem from './card-item'
import { modalsData } from './modalsData'
// eslint-disable-next-line no-unused-vars
import { formatDate, dateToString } from '@/libs/index'
// import Orgs from '_c/common-select-box/components/org/org.vue'
import { ruleValidate, tgStatusList, tgFlagList, nullObj, getExceptType, getExStatus } from './newTgLineLossAnalysisUtil.js'

export default {
  name: 'newTgLineLossAnalysis',
  components: {
    Tables,
    cardItem: cardItem,
    CommonSelectBox: () => import('_c/common-select-box'),
    SeaModal: () => import('_c/sea-modal'),
    analysisReport: () => import('./layerSub/analysisReport'),
    tgElecMeterDetail: () => import('./layerSub/tgElecMeterDetail.vue'),
    lowPowerPersonDetail: () => import('./layerSub/lowPowerPersonDetail.vue'),
    distributedPower: () => import('./layerSub/distributedPower.vue'),
    terminalId: () => import('./layerSub/terminalId.vue'),
    tgLineLossCountModel: () => import('./layerSub/tgLineLossCountModel.vue'),
    lineLossPower: () => import('./layerSub/lineLossPower.vue'),
    tgPowerDetail: () => import('./layerSub/tgPowerDetail.vue'),
    loadRateStatistics: () => import('./layerSub/loadRateStatistics.vue'),
    collectionDetails: () => import('./layerSub/collectionDetails.vue'),
    collectionCoverDetail: () => import('./layerSub/collectionCoverDetail.vue'),
    powerCountAlarm: () => import('./layerSub/powerCountAlarm.vue'),
    noCoverElecMeter: () => import('./layerSub/noCoverElecMeter.vue'),
    useElecAlarm: () => import('./layerSub/useElecAlarm.vue'),
    fileAlarmDetail: () => import('./layerSub/fileAlarmDetail.vue'),
    distributionTransformerAlarm: () => import('./layerSub/distributionTransformerAlarm.vue'),
    zeroVolumeMeterDetail: () => import('./layerSub/zeroVolumeMeterDetail.vue'),
    meteringAlarm: () => import('./layerSub/meteringAlarm.vue'),
    stealingElecDetail: () => import('./layerSub/stealingElecDetail.vue'),
    lineLossTable: () => import('./layerSub/lineLossTable.vue'),
    lineLossCurve: () => import('./layerSub/lineLossCurve.vue'),
    changeFactor: () => import('./layerSub/changeFactor.vue'),
    changeMet: () => import('./layerSub/changeMet.vue'),
    datas96: () => import('./layerSub/96datas.vue'),
    Orgs: () => import('_c/common-select-box/components/org/org.vue')
  },
  filters: {
    numFilter (value) {
      let realVal = parseFloat(value).toFixed(1)
      return realVal
    }
  },
  props: {
    // 首次进入页面时初始化请求url地址
    initUrl: {
      type: String,
      default () {
        return '/sea-lineLose/tgLineLoseDetail/lineLoseQuery'
      }
    },
    // 初始化请求页面默认查询条件
    initialQueryItem: {
      type: Object,
      default () {
        return {
          'orgName': this.$store.state.auth.orgName,
          'orgNo': this.$store.state.auth.orgNo,
          'orgType': this.$store.state.auth.orgType,
          'statDate': formatDate(new Date(), -1), // 首次进入页面时初始化默认时间
          'dateType': 'day'// 初始化页面默认查询日维度
        }
      }
    },
    initTgUrl: {
      type: String,
      default () {
        return '/sea-lineLose/tgLineLoseDetail/lineLoseQuery/queryOrgTg'
      }
    }
  },
  data () {
    let boxWidth = window.innerWidth
    return {
      boxWidth: boxWidth,
      showLoad: true,
      dayLabel: '天数',
      dataFromFather: [],
      query1: {},
      query2: {},
      query3: {},
      bottomTools: [],
      dataCount: 0, // 总条数
      pageCurrent: 1, // 当前页
      pageSize: 25, // 每页显示多少条
      resTgListData: {
        pageSizeOpts: [25, 50, 100, 200, 500],
        currPage: 1,
        pageSize: 25,
        totalCount: 0,
        totalPage: 0
      },
      // 表格数据
      nowData: [],
      tableData: [],
      modalTitle: '',
      componentName: '',
      componentRef: '',
      tgPpq: false,
      columns: [
        { title: '台区名称', key: 'tgName', minWidth: 200, sortable: true },
        { title: '台区编号', key: 'tgNo', minWidth: 120, sortable: true },
        { title: '台区经理', key: 'accountManagerName', minWidth: 120, sortable: true },
        { title: '台区经理编号', key: 'accountManagerNo', minWidth: 140, sortable: true },
        { title: '台区状态',
          key: 'tgStatus',
          minWidth: 100,
          sortable: true,
          render: (h, { row, column, index }) => {
            let data = ''
            if (row.tgStatus === '01') {
              data = '投运'
            } else if (row.tgStatus === '02') {
              data = '停运'
            } else if (row.tgStatus === '03') {
              data = '拆除'
            }
            return h('div', data)
          }
        },
        { title: '台区总表数',
          key: 'zongMetCnt',
          minWidth: 120,
          sortable: true,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.showTableLayerTgZMeter('tgZMeter', params.row)
                  }
                }
              }, params.row.zongMetCnt)
            ])
          }
        },
        { title: '低压居民数',
          key: 'lowConsCnt',
          minWidth: 120,
          sortable: true,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.showTableLayerTgZMeter('tgCons', params.row)
                  }
                }
              }, params.row.lowConsCnt)
            ])
          }
        },
        { title: '分布式电源',
          key: 'gcMetCnt',
          minWidth: 120,
          sortable: true,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.showTableLayerTgZMeter('tgGcCons', params.row)
                  }
                }
              }, params.row.gcMetCnt)
            ])
          }
        },
        { title: '终端地址',
          key: 'tmnlAddr',
          minWidth: 120,
          sortable: true,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.showTableLayerTgZMeter('tgTmnl', params.row)
                  }
                }
              }, params.row.tmnlAddr)
            ])
          }
        },
        // { title: '台区安装地址', key: 'instAddr', minWidth: 90, sortable: true },
        { title: '线损电量(kWh)',
          key: 'lineLoseElec',
          minWidth: 120,
          sortable: true,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.showTableLayerTarget('tgLineLosePower', params.row)
                  }
                }
              }, params.row.lineLoseElec)
            ])
          }
        },
        { title: '线损率(%)',
          key: 'lllr',
          minWidth: 120,
          sortable: true,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.showTableLayerTarget('tgLineLoseRate', params.row)
                  }
                }
              }, params.row.lllr)
            ])
          }
        },
        { title: '供电量(kWh)',
          key: 'ppq',
          minWidth: 120,
          sortable: true,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.showTableLayer('tgPpq', params.row)
                  }
                }
              }, params.row.ppq)
            ])
          }
        },
        { title: '售电量(kWh)',
          key: 'spq',
          minWidth: 120,
          sortable: true,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.showTableLayer('tgSpq', params.row)
                  }
                }
              }, params.row.spq)
            ])
          }
        },
        { title: '发电量(kWh)',
          key: 'gpq',
          minWidth: 120,
          sortable: true,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.showTableLayer('tgGpq', params.gpq)
                  }
                }
              }, params.row.gpq)
            ])
          }
        },
        { title: '负载率(%)',
          key: 'tgLoadRate',
          minWidth: 120,
          sortable: true,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.showTableLayer('tgLoadDetail', params.row)
                  }
                }
              }, params.row.tgLoadRate)
            ])
          }
        },
        { title: '采集成功率(%)',
          key: 'readSuccRate',
          minWidth: 120,
          sortable: true,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.showTableLayer('tgReadDetail', params.row)
                  }
                }
              }, params.row.readSuccRate)
            ])
          }
        },
        { title: '采集覆盖率(%)',
          key: 'coverMetRate',
          minWidth: 120,
          sortable: true,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.showTableLayer('tgCoverDetail', params.row)
                  }
                }
              }, params.row.coverMetRate)
            ])
          }
        },
        { title: '电量计算失败数',
          key: 'calcErrorCnt',
          minWidth: 120,
          sortable: true,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.showTableLayer('tgPowerCalcErrorDetail', params.row)
                  }
                }
              }, params.row.calcErrorCnt)
            ])
          }
        },
        { title: '未覆盖电表数',
          key: 'unCoverCnt',
          minWidth: 120,
          sortable: true,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.showTableLayer('tgUncoverDetail', params.row)
                  }
                }
              }, params.row.unCoverCnt)
            ])
          }
        },
        { title: '零电量电表数',
          key: 'zeroPowerCnt',
          minWidth: 150,
          sortable: true,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.showTableLayer('tgZeroPowerDetail', params.row)
                  }
                }
              }, params.row.zeroPowerCnt)
            ])
          }
        },
        { title: '计量异常数',
          key: 'meteringAbnormalCnt',
          minWidth: 130,
          sortable: true,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.showTableLayer('tgMeteringAbnormalDetail', params.row)
                  }
                }
              }, params.row.meteringAbnormalCnt)
            ])
          }
        },
        { title: '用电异常数',
          key: 'powerAbnormalCnt',
          minWidth: 120,
          sortable: true,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.showTableLayer('tgPowerAbnormalDetail', params.row)
                  }
                }
              }, params.row.powerAbnormalCnt)
            ])
          }
        },
        { title: '配变异常数',
          key: 'distributionAbnormalCnt',
          minWidth: 120,
          sortable: true,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.showTableLayer('tgDistributionAbnormalDetail', params.row)
                  }
                }
              }, params.row.distributionAbnormalCnt)
            ])
          }
        },
        { title: '档案异常数',
          key: 'dataAbnormalCnt',
          minWidth: 120,
          sortable: true,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.showTableLayer('tgDataAbnormalDetail', params.row)
                  }
                }
              }, params.row.dataAbnormalCnt)
            ])
          }
        },
        { title: '疑似窃电户',
          key: 'stealElecCnt',
          minWidth: 120,
          sortable: true,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.showTableLayer('tgStealElectricityDetail', params.row)
                  }
                }
              }, params.row.stealElecCnt)
            ])
          }
        },
        { title: '换表记录',
          key: 'replaceMetCnt',
          minWidth: 100,
          sortable: true,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.showTableLayer('tgChangeMetDetail', params.row)
                  }
                }
              }, params.row.replaceMetCnt)
            ])
          }
        },
        { title: '换倍率记录',
          key: 'replaceTFactor',
          minWidth: 120,
          sortable: true,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                },
                on: {
                  click: () => {
                    this.showTableLayer('tgChangeFactorDetail', params.row)
                  }
                }
              }, params.row.replaceTFactor)
            ])
          }
        }
      ],
      linkBoxFlag: false,
      searchBarForm: {
        orgName: this.initialQueryItem['orgName'],
        orgNo: this.initialQueryItem['orgNo'],
        orgType: this.initialQueryItem['orgType'],
        selectDate: this.initialQueryItem['statDate'],
        selectDateType: this.initialQueryItem['dateType'],
        tgName: '',
        tgNo: '',
        tgStatus: '01',
        tgFlag: '01'
      },
      searchBarFlag: true,
      ruleValidate: ruleValidate,
      showOrgFlag: false,
      tgStatusList: tgStatusList,
      tgFlagList: tgFlagList,
      changeFlag: true,
      timeDimension: '日',
      selected: {
        highLoss: false,
        alarm: false,
        normal: false,
        all: true,
        noCount: false
      },
      modal1: false,
      fullscreen: true,
      draggable: false,
      consSelectMore: true,
      tmnlSelectMore: true,
      showComponents: ['org', 'cons', 'tmnl'],
      title: `<div style="color: #fff; font-size: 20px">恒大绿洲1-5号配电室2号台区</div>`,
      tgState: ``,
      seaModelItem: {},
      seaModelItemReport: {},
      days: 3, // 弹窗的参数
      extType: 1, // 弹窗的参数
      subTitle: ``,
      date: '2019-0101',
      score: '',
      scoreShow: '',
      tabs: [
        { title: '趋势分析', name: 'trendAnalysis', pic: 'errorAnalysisPic', activePic: 'errorAnalysisActivePic', active: true },
        { title: '分析报告', name: 'analysisReport', pic: 'lineLoseAnalysisPic', activePic: 'lineLoseAnalysisActivePic' }
      ],
      imgP: false,
      imgT: false,
      layerShow: false,
      exStatus: '-1', // 异常类型
      requestName: '',
      repairFlag: false,
      seaModalDateType: 'dateRange', // dateRange,date
      seaModalDate: '',
      seaModalDateRange: [],
      queryData: {}, // 传递到子组件的查询参数
      layerTotalCount: 0, // 传递到子组件的总条数
      axiosUrl: '', // 弹窗接口的地址
      loadAxiosData: {}, // 初始化页面表格的数据
      loadTgParam: {},
      tgArr: [],
      tableHeight: 600
    }
  },
  methods: {
    // 台区线损明细主表的数据查询
    loadData () {
      this.seaModalDateRange = [formatDate(this.searchBarForm.selectDate, -7), formatDate(this.searchBarForm.selectDate, 0)]
      let data = {
        orgNo: this.searchBarForm.orgNo,
        orgType: this.searchBarForm.orgType,
        tgName: this.searchBarForm.tgName,
        tgNo: this.searchBarForm.tgNo,
        statDate: this.searchBarForm.selectDate,
        dateType: this.searchBarForm.selectDateType,
        exStatus: this.exStatus,
        tgStatus: this.searchBarForm.tgStatus,
        tgFlag: this.searchBarForm.tgFlag

      }
      this.loadAxiosData = data
      this.$nextTick(() => {
        this.$refs.tables.queryTableData()
      })
      // this.onLoadData()
      setTimeout(() => {
        this.searchBarFlag = false
      }, 1200)
    },
    dateTypeChange (item, key, dateType) {
      let queryData = {
        tgId: item.tgId,
        date: dateType === 'day' ? item.dataDate.substring(0, 7) + '-01' : item.dataDate.substring(0, 7),
        dateType: dateType,
        exStatus: item.status
      }
      axios.request({
        method: 'post',
        data: queryData,
        url: '/sea-lineLose/tgLineLoseDetail/linLoseDateChange'
      }).then(res => {
        if (res.status === 200 && res.data.data) {
          console.log(key)
          this.tableData[key] = res.data.data
          this.tableData.push()
        } else {
          this.$Message.success('查询失败!')
        }
      })
    },
    // 检索框的查询方法
    queryLoadData (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.loadData()
          // this.loadTgData()
        } else {
          this.$Message.error('请补充查询条件')
        }
      })
    },
    // 台区线损明细主表的数据响应
    onLoadData (insideTableData) {
      if (insideTableData) {
        if (insideTableData.length > 0) {
          this.tableData = []
          for (let i = 0; i < insideTableData.length; i++) {
            this.tableData[i] = insideTableData[i]
          }
        } else {
          this.setNullCard()
        }
      }
    },
    // 切换右侧高损负损等tab
    tabSelected (name) {
      for (let i in this.selected) {
        this.selected[i] = false
      }
      this.selected[name] = true
      this.exStatus = getExStatus(name)
      this.loadData()
      // this.loadTgData()
    },
    showSeaModal (item) {
      // 清空旧数据
      let tabs = this.$refs['seaModal'].copyTabs
      this.title = `<div style="color: #fff; font-size: 20px">${this.removeNullName(item.tgName)}</div>`
      this.seaModelItem = item
      this.seaModelItemReport = item
      this.seaModalDate = formatDate(this.searchBarForm.selectDate, 0)
      if (this.searchBarForm.selectDate.length === 7) {

      } else {
        this.seaModalDate = this.searchBarForm.selectDate
      }
      if (tabs[0].active === true) {
        this.dataFromFather = []
        // 设默认时间类型和默认tab
        if (item.dateType === 'month') {
          yestString = '较上月'
          this.dayLabel = '月数'
          this.seaModalDateType = 'month'
          let endMonth = (item.dataDate.substring(5, 7) - 2 + '').length === 1
            ? '0' + (item.dataDate.substring(5, 7) - 2) : (item.dataDate.substring(5, 7) - 2)
          this.$refs['seaModal'].dateRangeTmp = [item.dataDate, item.dataDate.substring(0, 4) + '-' + endMonth]
          this.seaModalDateRange = [item.dataDate, item.dataDate.substring(0, 4) + '-' + endMonth]
          this.$refs['seaModal'].monthDateE = item.dataDate
          this.$refs['seaModal'].monthDateS = item.dataDate.substring(0, 4) + '-' + endMonth
        } else {
          yestString = '较昨日'
          this.dayLabel = '天数'
          this.seaModalDateType = 'dateRange'
          this.$refs['seaModal'].dateRangeTmp = [formatDate(this.searchBarForm.selectDate, -7), formatDate(this.searchBarForm.selectDate, 0)]
        }
        this.$refs['seaModal'].dateRangeTmp = [formatDate(this.searchBarForm.selectDate, -7), formatDate(this.searchBarForm.selectDate, 0)]
        if (item.status === '1') {
          this.tgState = `<div style="color: #fff; font-size: 15px;margin: 0;">高损台区</div>`
        } else if (item.status === '0') {
          this.tgState = `<div style="color: #fff; font-size: 15px;margin: 0;">正常台区</div>`
        } else if (item.status === '2') {
          this.tgState = `<div style="color: #fff; font-size: 15px;margin: 0;">负损台区</div>`
        } else if (item.status === '3') {
          this.tgState = `<div style="color: #fff; font-size: 15px;margin: 0;">不可算台区</div>`
        }
        this.queryTgConsNum(item.tgId, item.dateType, item.dataDate)
        // this.score = item.healthScore
        yestString += item.downFromYesterday > 0 ? '下降' : '上升'
        let toYesterdayDecline = item.downFromYesterday > 0
          ? item.downFromYesterday : -(item.downFromYesterday)
        let linkRatioDecline = item.linkRelativeDown > 0
          ? item.linkRelativeDown : -(item.linkRelativeDown)
        let raioString = '环比'
        raioString += item.lativeDown > 0 ? '下降' : '上升'
        this.title = `<div style="color: #fff; font-size: 20px">${this.removeNullName(item.tgName)}</div>`
        this.subTitle = `<div class="subtitle">` +
          `供电量：${this.removeNullVal(item.ppq)}kWh` +
          ` | 售电量：${this.removeNullVal(item.spq)}kWh` +
          ` | 线损率：${this.removeNullVal(item.lllr)}%` +
          ` | ${yestString}：${this.removeNullVal(toYesterdayDecline)}%` +
          ` | ${raioString}：${this.removeNullVal(linkRatioDecline)}%</div>`
        this.$refs.seaModal.showModal()
        let data = {
          startTime: this.seaModalDateRange[0],
          endTime: this.seaModalDateRange[1],
          tgId: item.tgId,
          dateType: item.dateType
        }
        // 点击详情，查右边两个表格
        let exParam = {
          days: this.days,
          dateType: item.dateType,
          extType: this.extType,
          startTime: this.seaModalDateRange[0],
          endTime: this.seaModalDateRange[1],
          tgId: item.tgId
        }
        this.querySeaModelTabLeft(data, data, exParam, exParam)
      } else if (tabs[1].active === true) {
        if (this.searchBarForm.selectDate.length === 7) {

        }
        this.queryTgConsNum(item.tgId, item.dateType, item.dataDate)
        this.seaModalDateType = 'date'
        // this.$refs['seaModal'].date = '2019-09-09'
        this.subTitle = `<div class="subtitle">` +
          `管理单位：${this.removeNullName(this.seaModelItem.tgOrgName)}` +
          ` | 台区容量：${this.removeNullVal(this.seaModelItem.tgCap)}` +
          ` | 台区户数：${this.removeNullVal(this.seaModelItem.tgHomeNum)}</div>`
        this.$refs.seaModal.showModal()
      }
    },
    changeTab (clickedTab, clickedTabName) {
      this.title = `<div style="color: #fff; font-size: 20px">${this.removeNullName(this.seaModelItem.tgName)}</div>`
      if (clickedTabName === 'analysisReport') {
        // 设时间类型
        this.seaModalDateType = 'date'
        this.subTitle = `<div class="subtitle">` +
                        `管理单位：${this.removeNullName(this.seaModelItem.tgOrgName)}` +
                        ` | 台区容量：${this.removeNullVal(this.seaModelItem.tgCap)}` +
                        ` | 台区户数：${this.removeNullVal(this.seaModelItem.tgHomeNum)}</div>`
      } else if (clickedTabName === 'trendAnalysis') {
        // 设默认时间类型
        this.seaModalDateType = this.seaModelItem.dateType === 'month' ? 'month' : 'dateRange'
        let yestString = this.seaModelItem.dateType === 'month' ? '较上月' : '较昨日'
        yestString += this.seaModelItem.downFromYesterday > 0 ? '下降' : '上升'
        let toYesterdayDecline =
          this.seaModelItem.downFromYesterday > 0
            ? this.seaModelItem.downFromYesterday : -(this.seaModelItem.downFromYesterday)
        let linkRatioDecline = this.seaModelItem.linkRelativeDown > 0
          ? this.seaModelItem.linkRelativeDown : -(this.seaModelItem.linkRelativeDown)
        let raioString = '环比'
        raioString += this.seaModelItem.linkRelativeDown > 0 ? '下降' : '上升'
        this.subTitle = `<div class="subtitle">` +
                        `供电量：${this.removeNullVal(this.seaModelItem.ppq)}kWh` +
                        ` | 售电量：${this.removeNullVal(this.seaModelItem.spq)}kWh` +
                        ` | 线损率：${this.removeNullVal(this.seaModelItem.lllr)}%` +
                        ` | ${yestString}：${this.removeNullVal(toYesterdayDecline)}%` +
                        ` | ${raioString}：${this.removeNullVal(linkRatioDecline)}%</div>`
      }
    },
    selectOrg (data) {
      this.searchBarForm.orgName = data.orgName
      this.searchBarForm.orgNo = data.orgNo
      this.searchBarForm.orgType = data.orgType
      this.showOrgFlag = false
    },
    showTableLayer (tableName, item) {
      this.queryData = {
        'date': this.searchBarForm.selectDate,
        'dateType': this.searchBarForm.selectDateType,
        'orgNo': item.tgOrgNo,
        'tgId': item.tgId
      }
      let exceptType = getExceptType(tableName)
      if (exceptType === '') {
        this.axiosUrl = 'sea-lineLose/tgLineLoseDetail/' + tableName
      } else {
        this.queryData['exceptType'] = exceptType
        this.axiosUrl = 'sea-lineLose/tgLineLoseDetail/tgExDetail'
      }

      if (tableName === 'tgSpq' || tableName === 'tgSpqRepair' || tableName === 'tgGpq' || tableName === 'tgPpq') {
        this.tgPpq = true
        if (tableName === 'tgSpqRepair') {
          this.repairFlag = true
        } else {
          this.repairFlag = false
        }
        this.$nextTick(() => {
          this.$refs['tgPpq'].$refs.tables.queryTableData()
        })
      } else {
        this.modalTitle = modalsData[tableName].title
        this.componentName = modalsData[tableName].componentName
        this.componentRef = tableName
        this.layerShow = true
        setTimeout(() => {
          this.$refs[tableName].$refs.tables.queryTableData()
          if (exceptType !== '') {
            this.$refs[tableName].tgExDetailCount()
          }
        }, 500)
        /* this.$nextTick(() => {
          this.$refs[tableName].$refs.tables.queryTableData()
          if (exceptType !== '') {
            this.$refs[tableName].tgExDetailCount()
          }
        }) */
      }
    },
    showTableLayerTgZMeter (tableName, item) { // 基本档案
      this.layerShow = true
      this.modalTitle = modalsData[tableName].title
      this.componentName = modalsData[tableName].componentName
      this.componentRef = tableName

      this.queryData = {
        date: this.searchBarForm.selectDate,
        orgNo: item.tgOrgNo,
        tgId: item.tgId,
        dateType: this.searchBarForm.selectDateType
      }
      this.axiosUrl = 'sea-lineLose/tgLineLoseDetail/' + tableName
      /* this.$nextTick(() => {
        this.$refs[tableName].$refs.tables.queryTableData()
      }) */
      setTimeout(() => {
        this.$refs[tableName].$refs.tables.queryTableData()
      }, 500)
    },
    showTableLayerTarget (tableName, item) { // 指标信息
      this.layerShow = true
      this.queryData = {
        date: this.searchBarForm.selectDate,
        dateType: this.searchBarForm.selectDateType,
        orgNo: item.tgOrgNo,
        endDate: '',
        startDate: '',
        tgId: item.tgId
      }
      this.axiosUrl = 'sea-lineLose/tgLineLoseDetail/' + tableName
      if (tableName === 'tgLineLoseRate' || tableName === 'tgLineLoseRateRepair' || tableName === 'tgLineLoseDataMonitor') {
        this.modalTitle = '线损数据监测'
        this.componentName = 'line-loss-power'
        this.componentRef = 'tgLineLosePower'
        setTimeout(() => {
          this.$refs['tgLineLosePower'].$refs.tables.queryTableData()
        }, 500)
        /* this.$nextTick(() => {
          this.$refs['tgLineLosePower'].$refs.tables.queryTableData()
        }) */
      } else {
        this.modalTitle = modalsData[tableName].title
        this.componentName = modalsData[tableName].componentName
        this.componentRef = tableName
        setTimeout(() => {
          this.$refs[tableName].$refs.tables.queryTableData()
        }, 500)
        /* this.$nextTick(() => {
          this.$refs[tableName].$refs.tables.queryTableData()
        }) */
      }
    },
    seaModelQuery (value, item) {
      if (this.seaModalDateType === 'dateRange' || this.seaModalDateType === 'month') {
        this.seaModalDateRange = value
        if (this.seaModalDateType === 'dateRange') {
          if (this.seaModalDateRange[0].substr(0, 7) === this.seaModalDateRange[1].substr(0, 7)) {
            let paramCur = {
              startTime: this.seaModalDateRange[0],
              endTime: this.seaModalDateRange[1],
              tgId: item.tgId,
              dateType: item.dateType
            }
            // 点击弹窗的查询按钮，查右边两个表格
            let exParam = {
              days: this.days,
              extType: this.extType,
              dateType: item.dateType,
              startTime: this.seaModalDateRange[0],
              endTime: this.seaModalDateRange[1],
              tgId: item.tgId
            }
            this.querySeaModelTabLeft(paramCur, paramCur, exParam, exParam)
          } else {
            this.$Message.error('选择日期需要在同一个月')
          }
        }
        if (this.seaModalDateType === 'month') {
          if (this.seaModalDateRange[0].substr(0, 4) === this.seaModalDateRange[1].substr(0, 4)) {
            let paramCur = {
              startTime: this.seaModalDateRange[0],
              endTime: this.seaModalDateRange[1],
              tgId: item.tgId,
              dateType: item.dateType
            }
            // 点击弹窗的查询按钮，查右边两个表格
            let exParam = {
              days: this.days,
              extType: this.extType,
              dateType: item.dateType,
              startTime: this.seaModalDateRange[0],
              endTime: this.seaModalDateRange[1],
              tgId: item.tgId
            }
            console.log(exParam)
            console.log(paramCur)
            this.querySeaModelTabLeft(paramCur, paramCur, exParam, exParam)
          } else {
            this.$Message.error('选择日期需要在同一年')
          }
        }
      } else {
        this.analysisQuery(item)
      }
    },
    analysisQuery (item) {
      let data = {
        orgNo: this.searchBarForm.orgNo,
        orgType: this.searchBarForm.orgType,
        tgNo: item.tgNo,
        statDate: this.seaModalDate,
        dateType: 'day',
        exStatus: this.exStatus,
        tgStatus: this.searchBarForm.tgStatus,
        tgFlag: this.searchBarForm.tgFlag
      }
      axios.request({
        method: 'post',
        data: data,
        url: '/sea-lineLose/tgLineLoseDetail/lineLoseQuery'
      }).then(res => {
        if (res.status === 200 && res.data.data) {
          this.seaModelItemReport = res.data.data.list[0]
        } else {
          this.$Message.success('查询失败!')
        }
      })
    },
    changeDayMonth (value) {
      if (value === 'day') {
        this.searchBarForm.selectDate = this.searchBarForm.selectDate + '-01'
      } else if (value === 'month') {
        this.searchBarForm.selectDate = this.searchBarForm.selectDate.substring(0, 7)
      }
      for (let i = 0; i < this.$refs.cardItem.length; i++) {
        this.$refs.cardItem[i].changeDateType(value)
      }
    },
    selectDateChange (value) {
      this.searchBarForm.selectDate = value
      this.seaModalDateRange = [formatDate(this.searchBarForm.selectDate, -7), formatDate(this.searchBarForm.selectDate, 0)]
    },
    seaModalChangeDate (value) {
      this.seaModalDate = value
    },
    // 表格行变色方法
    rowClassName (row, index) {
      if (row.lllr > 10) {
        return 'high-row'
      } else if (row.lllr < 0) {
        return 'alarm-row'
      }
      return ''
    },
    setSeaModelParam (exParam) {
      this.days = exParam.days
      this.extType = exParam.extType
    },
    querySeaModelTabLeft (paCur, pa1, pa2, pa3) {
      axios.request({
        method: 'post',
        data: paCur,
        url: '/sea-lineLose/tgLineLoseDetail/trendAnalysis/lineLoseRateTrend'
      }).then(res => {
        if (res.status === 200 && res.data.data) {
          this.dataFromFather = res.data.data
        } else {
          this.$Message.success('查询失败!')
        }
      })
      this.query1 = pa1
      this.query2 = pa2
      this.query3 = pa3
      this.$nextTick(() => {
        this.$refs.lineLossTable.$refs.table1.queryTableData()
        this.$refs.lineLossTable.$refs.table2.queryTableData()
        this.$refs.lineLossTable.$refs.table3.queryTableData()
      })
    },
    /* 根据台区查台区用户数(台区线损明细--卡片详情弹窗--分析报告--小标题--台区户数) */
    queryTgConsNum (tgId, dateType, dataDate) {
      axios.request({
        method: 'post',
        url: '/sea-lineLose/tgLineLoseDetail/lineLoseQuery/queryTgConsNum',
        data: {
          tgId: tgId,
          dateType: dateType,
          dataDate: dataDate
        }
      }).then(res => {
        if (res.status === 200 && res.data.data) {
          // 返回天数（int）
          if (res.data.data) {
            this.seaModelItem.tgHomeNum = res.data.data.tgHomeNum
          }
        }
      })
    },
    setNullCard () {
      // 为了页面不空白，展示空卡片
      let arr = []
      for (let i = 0; i < 1; i++) {
        arr.push(nullObj)
      }
      this.tableData = arr
      this.$Message.info('台区线损明细无数据!')
    },
    // loadTgData () {
    //   // orgTgDetail
    //   let param = {
    //     orgNo: this.searchBarForm.orgNo,
    //     orgType: this.searchBarForm.orgType,
    //     tgName: this.searchBarForm.tgName,
    //     tgNo: this.searchBarForm.tgNo
    //   }
    //   this.loadAxiosData = param
    //   this.$nextTick(() => {
    //     this.$refs.tables.queryTableData()
    //   })
    //   this.onLoadTgData()
    //   setTimeout(() => {
    //     this.searchBarFlag = false
    //   }, 1200)
    // },
    onLoadTgData (insideTableData) {
      if (insideTableData) {
        if (insideTableData.length > 0) {
          this.tableData = insideTableData
          this.queryLineLossDetail(insideTableData)
        } else {
          this.setNullCard()
        }
      }
    },
    queryLineLossDetail (insideTableData) {
      this.tableData = insideTableData
      let tgInfo = ''
      insideTableData.forEach(obj => {
        tgInfo += `${obj.tgId},`
      })
      let data = {
        orgNo: this.searchBarForm.orgNo,
        orgType: this.searchBarForm.orgType,
        statDate: this.searchBarForm.selectDate,
        dateType: this.searchBarForm.selectDateType,
        tgStr: tgInfo,
        exStatus: this.exStatus
      }
      axios.request({
        method: 'post',
        url: '/sea-lineLose/tgLineLoseDetail/lineLoseQuery/queryLineLossDetail',
        data: data
      }).then(res => {
        if (res.status === 200 && res.data.data) {
          // 返回天数（int）
          if (res.data.data) {
            let resMap = res.data.data
            if (Object.keys(resMap).length > 0) {
              for (let i = 0; i < this.tableData.length; i++) {
                for (let k in resMap) {
                  if (this.tableData[i].tgId === k) {
                    this.tableData[i] = resMap[k]
                    // 重新渲染
                    this.tableData.push()
                  }
                }
              }
            } else {
              if (this.exStatus !== '' && this.exStatus !== '-1') {
                this.setNullCard()
              }
            }
          }
        }
      })
    },
    changePage (current) {
      this.resTgListData.currPage = current
      this.queryTableByPage()
    },
    changePageSize (pageSize) {
      this.resTgListData.pageSize = pageSize
      this.queryTableByPage()
    },
    queryTableByPage () {
      this.$refs['tables'].queryTableData(this.resTgListData.currPage, this.resTgListData.pageSize)
    },
    getTablePageInfo (currentPage, pageSize, pageTotalCount, totalPage) {
      this.resTgListData.currPage = currentPage
      this.resTgListData.totalCount = pageTotalCount
      this.resTgListData.pageSize = pageSize
      this.resTgListData.totalPage = totalPage
    },
    removeNullVal (val) {
      let result = '0'
      if (val != null && val !== '') {
        result = val
      }
      return result
    },
    removeNullName (val) {
      let result = '-'
      if (val != null && val !== '') {
        result = val
      }
      return result
    },
    changeHeight () {
      this.tableHeight = window.innerHeight > 800 ? window.innerHeight - 205 : 600
    }
  },
  created () {
    // this.loadTgData()
    this.loadData()
  },
  mounted: function () {
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

<style lang='less' scoped>
  @import "./newTgLineLossAnalysis.less";
</style>
