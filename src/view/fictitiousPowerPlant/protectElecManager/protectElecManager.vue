<template>
  <div class="protectElecManager" style="position: relative" id="protectElecManager">
    <div class="protectElecAlertBar">保电管理查询</div>
    <div class="searchBar">
      <Form ref="searchBarForm" :rules="ruleValidate" :model="searchBarForm" :label-width="110">
        <Row>
          <i-col span="6">
            <FormItem label="电厂业主" prop="elecFacUser">
              <Select
                v-model="searchBarForm.elecFacUser"
                placeholder="请选择电厂业主"
                :clearable="false"
                style="width: 160px;"
              >
                <Option
                  v-for="item in elecFacUsers"
                  :value="item.ownerNo"
                  :key="item.ownerNo"
                >{{ item.ownerName }}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="6">
            <FormItem label="保电机组" prop="proElecMedicalGroup">
              <Select
                v-model="searchBarForm.proElecMedicalGroup"
                placeholder="请选择保电机组"
                :clearable="false"
                style="width: 160px;"
              >
                <Option
                  v-for="item in proElecMedicalGroups"
                  :value="item.unitNo"
                  :key="item.unitNo"
                >{{ item.unitName }}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="6">
            <FormItem label="保电开始时间" prop="protectStartDate">
              <DatePicker
                type="date"
                :value="searchBarForm.protectStartDate"
                :options="selectDateDayOptions"
                @on-change="changeStartDate"
                format="yyyy-MM-dd"
                :clearable="false"
                placeholder="默认上个月"
                style="width: 160px"
              ></DatePicker>
            </FormItem>
          </i-col>
          <i-col span="6">
            <FormItem label="保电结束时间" prop="protectEndDate">
              <DatePicker
                type="date"
                :value="searchBarForm.protectEndDate"
                :options="selectDateDayOptions"
                @on-change="changeEndDate"
                format="yyyy-MM-dd"
                :clearable="false"
                placeholder="默认前一天"
                style="width: 160px"
              ></DatePicker>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="24">
            <FormItem>
              <Button
                type="primary"
                style="width:100px;margin-right:35px;margin-top:8px;float:right;"
                @click="topPanelQuery('searchBarForm')"
              >查询</Button>
            </FormItem>
          </i-col>
        </Row>
      </Form>
    </div>
    <div class="protectElecResult">
      <div class="protectElecResultBar">保电管理列表</div>
      <div class="toolBar">
        <div class="addInfo" @click="openAddOrUpdateModal('add')">
          <div class="imgControl">
            <img src="./images/add.png" />
          </div>
          <span>新增</span>
        </div>
        <span class="toolMarginControl">|</span>
        <div class="modifyInfo" @click="openAddOrUpdateModal('modify')">
          <div class="imgControl">
            <img src="./images/modify.png" />
          </div>
          <span>修改</span>
        </div>
        <span class="toolMarginControl">|</span>
        <div class="deleteInfo" @click="deleteData">
          <div class="imgControl">
            <img src="./images/delete.png" />
          </div>
          <span>删除</span>
        </div>
      </div>
      <div class="protectTable">
        <Tables
          ref="protectTable"
          :height="tableHeight - 50"
          filename="保电管理列表"
          :columns="protectTable.columns"
          :axiosUrl="protectTable.axiosUrl"
          :axiosData="protectAjaxData"
          @on-load-data="onProtectLoadData"
          @on-load-data-page-info="onProtectLoadDataPageInfo"
          @on-selection-change="selectionChange"
          :loading="loading"
        />
      </div>

      <Modal
        width="900px"
        draggable
        :zIndex="901"
        v-model="showModalFlag"
        class-name="vertical-center-modal addOrUpdateModal"
        footer-hide
        :title="modalTitle"
      >
        <div class="addOrUpdateModalBody">
          <Form
            ref="modalSearchBarForm"
            :rules="modalSearchRuleValidate"
            :model="modalSearchBarForm"
            :label-width="110"
          >
            <Row>
              <i-col span="12">
                <FormItem label="保电机组" prop="protectMedicalGroup">
                  <Select
                    v-model="modalSearchBarForm.protectMedicalGroup"
                    placeholder="请选择保电机组"
                    :clearable="false"
                    style="width: 160px;"
                    :disabled="modalModel === 'modify'"
                    @on-change="changeUnitColumnData"
                  >
                    <Option
                      v-for="item in modalProtectMedicalGroups"
                      :value="item.unitNo"
                      :key="item.unitNo"
                    >{{ item.unitName }}</Option>
                  </Select>
                </FormItem>
              </i-col>
              <i-col span="12">
                <FormItem label="保电性质" prop="protectProperty">
                  <Select
                    v-model="modalSearchBarForm.protectProperty"
                    placeholder="请选择保电性质"
                    :clearable="false"
                    style="width: 160px;"
                    @on-change="changeModalProtectProperties"
                    :disabled="modalModel === 'modify'"
                  >
                    <Option
                      v-for="item in modalProtectProperties"
                      :value="item.code"
                      :key="item.code"
                    >{{ item.name }}</Option>
                  </Select>
                </FormItem>
              </i-col>
            </Row>
            <div class="modalTableBar">
              <span class="modalTitle">||| 保电设备列表</span>
              <span class="modalSubTitle" v-if="!isModalDevice">(红色列可编辑，机组有且仅有一行)</span>
              <span class="modalSubTitle" v-if="isModalDevice">(红色列可编辑)</span>
              <div class="toolBar" v-if="isModalDevice">
                <div class="addInfo" @click="addModalData">
                  <div class="imgControl">
                    <img src="./images/add.png" />
                  </div>
                  <span>新增</span>
                </div>
                <span class="toolMarginControl">|</span>
                <div class="deleteInfo" @click="deleteModalData">
                  <div class="imgControl">
                    <img src="./images/delete.png" />
                  </div>
                  <span>删除</span>
                </div>
              </div>
            </div>
            <div class="addOrUpdateModalTable">
              <Tables
                ref="addOrUpdateTable"
                :height="modalTableHeight - 50"
                filename="保电设备列表"
                v-model="addOrUpdateModalTableData"
                :columns="computeCol"
                @on-selection-change="addOrUpdateSelectionChange"
              />
            </div>
            <Row class="btnRow">
              <i-col span="12" class="submitBtnICol">
                <FormItem>
                  <Button
                    type="primary"
                    style="width:100px;"
                    @click="modalAddOrUpdate('modalSearchBarForm')"
                  >提交</Button>
                </FormItem>
              </i-col>
              <i-col span="12" class="cancelBtnICol">
                <FormItem>
                  <Button
                    type="primary"
                    style="width:100px;background-color:#F2F2F2;border:1px solid rgba(228, 228, 228, 1);border-radius:4px;color:#666666"
                    @click="closeProtectModal"
                  >取消</Button>
                </FormItem>
              </i-col>
            </Row>
          </Form>
        </div>
      </Modal>
      <Modal
        width="850px"
        draggable
        :zIndex="901"
        v-model="deviceModalShow"
        class-name="vertical-center-modal protectDeviceModal"
        footer-hide
        title="保电设备详情"
      >
        <div class="deviceModalBackGround">
          <div class="deviceModalMedicalGroupInfo">
            <div class="infoTitle">机组信息</div>
            <div class="modalMedicalinfoDiv">
              <span>机组名称：</span>
              <span class="infoValue">{{modalMedicalName}}</span>
            </div>
            <div class="modalMedicalinfoDiv">
              <span>所属业主：</span>
              <span class="infoValue">{{modalOwnUser}}</span>
            </div>
            <div class="modalMedicalinfoDiv">
              <span>所属区域：</span>
              <span class="infoValue">{{modalOwnArea}}</span>
            </div>
          </div>
          <div class="deviceModalBody">
            <div class="deviceTableTitle">设备保电信息</div>
            <Tables
              ref="modalDeviceTable"
              height="300px"
              filename="设备保电信息"
              :columns="deviceTable.columns"
              :loading="deviceModalTableLoading"
              :axiosUrl="deviceTable.axiosUrl"
              :axiosData="deviceAjaxData"
              @on-load-data="onDeviceLoadData"
              @on-load-data-page-info="onDeviceLoadDataPageInfo"
            />
          </div>
        </div>
      </Modal>
      <Modal
        width="700px"
        draggable
        :zIndex="905"
        v-model="addDeviceModalShowFlag"
        class-name="vertical-center-modal addDeviceModal"
        footer-hide
        title="新增保电设备弹窗"
      >
        <div class="addDeviceModalBody">
          <Form
            ref="addDeviceModalSearchBarForm"
            :model="addDeviceModalSearchBarForm"
            :label-width="110"
          >
            <Row>
              <i-col span="12">
                <FormItem label="设备名称" prop="deviceName">
                  <Input
                    v-model="addDeviceModalSearchBarForm.deviceName"
                    placeholder="请输入设备名称"
                    style="width: 160px;"
                  />
                </FormItem>
              </i-col>
              <i-col span="12">
                <FormItem label="设备类型" prop="deviceType">
                  <Select
                    v-model="addDeviceModalSearchBarForm.deviceType"
                    placeholder="请选择设备类型"
                    :clearable="false"
                    style="width: 160px;"
                  >
                    <Option
                      v-for="item in addDeviceModalDeviceTypes"
                      :value="item.value"
                      :key="item.value"
                    >{{ item.name }}</Option>
                  </Select>
                </FormItem>
              </i-col>
            </Row>
            <Row class="btnRow">
              <i-col span="24" class="queryBtnICol">
                <FormItem>
                  <Button
                    type="primary"
                    style="width:100px;float:right;margin-right: 65px;"
                    @click="queryAddDevice"
                  >查询</Button>
                </FormItem>
              </i-col>
            </Row>
            <div class="addDeviceModalTableBar">
              <span class="modalTitle">||| 保电设备列表</span>
            </div>
            <div class="addDeviceModalTable">
              <Tables
                ref="addDeviceTable"
                :height="modalTableHeight - 50"
                filename="保电设备列表"
                :columns="addDeviceModalTable.columns"
                :loading="addDeviceLoading"
                :axiosUrl="addDeviceModalTable.axiosUrl"
                :axiosData="addDeviceModalTableAjaxData"
                @on-load-data="onAddDeviceLoadData"
                @on-load-data-page-info="onAddDeviceLoadDataPageInfo"
                @on-selection-change="addDeviceSelectionChange"
              />
            </div>
            <Row class="btnRow">
              <i-col span="12" class="confirmBtnICol">
                <FormItem>
                  <Button type="primary" style="width:100px;" @click="addDevice">确认</Button>
                </FormItem>
              </i-col>
              <i-col span="12" class="cancelBtnICol">
                <FormItem>
                  <Button
                    type="primary"
                    style="width:100px;background-color:#F2F2F2;border:1px solid rgba(228, 228, 228, 1);border-radius:4px;color:#666666"
                    @click="closeAddDeviceModal"
                  >取消</Button>
                </FormItem>
              </i-col>
            </Row>
          </Form>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import * as commonApi from '@/api/fictitiousPowerPlant/common/mainview-data.js'
import * as protectElecManagerApi from '@/api/fictitiousPowerPlant/protectElecManager/mainview-data.js'
import '@/view/fictitiousPowerPlant/protectElecManager/protectElecManager.less'
import { getLastMonthMaxDay, formatDate, arrToMap } from '@/libs/index'
import { judgeNull } from '../util.js'
import Tables from '_c/tables'

export default {
  name: 'protect-elec-manager',
  components: {
    Tables
  },
  props: {},
  data () {
    return {
      tableHeight: 500,
      modalTableHeight: 300,
      loading: false,
      deleteFlag: false,
      addOrUpdateFlag: false,
      selectDateDayOptions: {
        shortcuts: [
          {
            text: '今天',
            value () {
              return formatDate('', 0)
            }
          },
          {
            text: '昨日',
            value () {
              return formatDate('', -1)
            }
          },
          {
            text: '上周',
            value () {
              return formatDate('', -7)
            }
          }
        ]
      },
      searchBarForm: {
        protectStartDate: getLastMonthMaxDay(),
        protectEndDate: formatDate(undefined, -1)
      },
      elecFacUsers: [{ ownerNo: 'all', ownerName: '全部' }],
      proElecMedicalGroups: [{ unitNo: 'all', unitName: '全部' }],
      proElecMedicalMap: {},
      unitIdNoMaps: {},
      modalProtectMedicalGroups: [],
      ruleValidate: {
        protectStartDate: [
          { required: true, message: '保电开始时间不能为空', trigger: 'blur' }
        ],
        protectEndDate: [
          { required: true, message: '保电结束时间不能为空', trigger: 'blur' }
        ]
      },
      protectTable: {
        columns: [
          {
            width: 100,
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
              return h(
                'span',
                this.showTableIndex(params, this.current, this.pageSize)
              )
            }
          },
          {
            title: '保电事件编号',
            key: 'protectUnitNo',
            width: 200,
            align: 'center'
          },
          {
            title: '保电机组名称',
            key: 'unitName',
            width: 200,
            align: 'center'
          },
          {
            title: '所属业主',
            key: 'ownerNo',
            width: 120,
            align: 'center'
          },
          {
            title: '保电性质',
            key: 'protectAttr',
            width: 100,
            align: 'center'
          },
          {
            title: '参与设备',
            key: 'subdeviceNo',
            width: 200,
            align: 'center',
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
                      this.showDeviceDetail(params)
                    }
                  }
                },
                params.row.subdeviceNo
              )
            }
          },
          {
            title: '保电开始时间',
            key: 'protectBeginDate',
            width: 200,
            align: 'center'
          },
          {
            title: '保电结束时间',
            key: 'protectEndDate',
            width: 200,
            align: 'center'
          },
          {
            title: '申请时间',
            key: 'applyDate',
            width: 200,
            align: 'center'
          },
          {
            title: '保电原因',
            key: 'protectReason',
            width: 200,
            align: 'center'
          }
        ],
        axiosUrl: 'pmc/powerManagementQuery'
      },
      addOrUpdateTable: {
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
              return h('span', this.showTableIndex(params, 0, 0))
            }
          },
          {
            title: '机组名称',
            key: 'unitName',
            width: 200,
            align: 'center'
          },
          {
            title: '设备名称',
            key: 'subdeviceName',
            width: 200,
            align: 'center'
          },
          {
            title: '设备类型',
            key: 'subdeviceType',
            width: 200,
            align: 'center'
          },
          {
            title: '保电开始时间',
            key: 'protectBeginDate',
            width: 200,
            align: 'center',
            render: (h, params) => {
              let _this = this
              return h('input', {
                domProps: {
                  value: params.row.protectBeginDate
                },
                on: {
                  input: function (event) {
                    _this.addOrUpdateModalTableData[
                      params.index
                    ].protectBeginDate = event.target.value
                    params.row.protectBeginDate = event.target.value
                  }
                }
              })
            }
          },
          {
            title: '保电结束时间',
            key: 'protectEndDate',
            width: 200,
            align: 'center',
            render: (h, params) => {
              let _this = this
              return h('input', {
                domProps: {
                  value: params.row.protectEndDate
                },
                on: {
                  input: function (event) {
                    _this.addOrUpdateModalTableData[
                      params.index
                    ].protectEndDate = event.target.value
                    params.row.protectEndDate = event.target.value
                  }
                }
              })
            }
          },
          {
            title: '保电原因',
            key: 'protectReason',
            width: 200,
            align: 'center',
            render: (h, params) => {
              let _this = this
              return h('input', {
                domProps: {
                  value: params.row.protectReason
                },
                on: {
                  input: function (event) {
                    _this.addOrUpdateModalTableData[
                      params.index
                    ].protectReason = event.target.value
                    params.row.protectReason = event.target.value
                  }
                }
              })
            }
          }
        ]
      },
      addDeviceModalTable: {
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
              return h(
                'span',
                this.showTableIndex(
                  params,
                  this.addDeviceCurrent,
                  this.addDevicePageSize
                )
              )
            }
          },
          {
            title: '设备名称',
            key: 'subdeviceName',
            width: 200,
            align: 'center'
          },
          {
            title: '设备类型',
            key: 'subdeviceType',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h(
                'span',
                this.deviceTypeMaps.get(params.row.subdeviceType)
              )
            }
          },
          {
            title: '额定功率(kW)',
            key: 'ratedP',
            width: 200,
            align: 'center'
          }
          // {
          //   title: "响应方式",
          //   key: "responseWay",
          //   width: 200,
          //   align: "center"
          // }
        ],
        axiosUrl: 'pmc/powerManagementAdd_unit_listEequs'
      },
      selectDatas: [],
      addOrUpdateSelectDatas: [],
      addDeviceSelectDatas: [],
      protectAjaxData: {},
      current: 1,
      pageSize: 25,
      total: 0,
      showModalFlag: false,
      modalTitle: '',
      modalModel: '',
      isModalDevice: false,
      modalSearchBarForm: {
        protectUnitId: '',
        protectMedicalGroup: '',
        protectProperty: '0'
      },
      modalProtectProperties: [
        { code: '0', name: '机组' },
        { code: '1', name: '设备' }
      ],
      modalSearchRuleValidate: {
        protectMedicalGroup: [
          { required: true, message: '请选择保电机组', trigger: 'blur' }
        ],
        protectProperty: [
          { required: true, message: '请选择保电性质', trigger: 'blur' }
        ]
      },
      deviceModalShow: false,
      deviceModalTableLoading: false,
      unitBeginDate: '',
      unitEndDate: '',
      deviceIsUnit: 0,
      deviceTable: {
        columns: [
          {
            title: '序号',
            key: 'tableNo',
            width: 100,
            sortable: true,
            align: 'center',
            render: (h, params) => {
              return h(
                'span',
                this.showTableIndex(
                  params,
                  this.deviceCurrent,
                  this.devicePageSize
                )
              )
            }
          },
          {
            title: '设备名',
            key: 'subdeviceName',
            width: 100,
            align: 'center'
          },
          {
            title: '设备类型',
            key: 'subdeviceType',
            width: 100,
            align: 'center'
          },
          {
            title: '保电开始时间',
            key: 'protectBeginDate',
            width: 150,
            align: 'center',
            render: (h, params) => {
              if (this.deviceIsUnit === 1) {
                return h('span', this.unitBeginDate)
              } else {
                return h('span', params.row.protectBeginDate)
              }
            }
          },
          {
            title: '保电结束时间',
            key: 'protectEndDate',
            width: 150,
            align: 'center',
            render: (h, params) => {
              if (this.deviceIsUnit === 1) {
                return h('span', this.unitEndDate)
              } else {
                return h('span', params.row.protectEndDate)
              }
            }
          },
          {
            title: '保电原因',
            key: 'protectReason',
            width: 200,
            align: 'center'
          },
          {
            title: '申请时间',
            key: 'applyDate',
            width: 150,
            align: 'center'
          }
        ],
        axiosUrl: 'pmc/powerManagementDetail'
      },
      deviceAjaxData: {},
      modalMedicalName: '',
      modalOwnUser: '',
      modalOwnArea: '',
      deviceCurrent: 1,
      devicePageSize: 25,
      deviceTotal: 0,
      addDeviceModalShowFlag: false,
      addDeviceModalSearchBarForm: {
        unitId: '',
        deviceName: '',
        deviceType: 'all'
      },
      addDeviceModalDeviceTypes: [{ value: 'all', name: '全部' }],
      deviceTypeMaps: {},
      addDeviceLoading: false,
      addDeviceModalTableAjaxData: {},
      addDeviceCurrent: 1,
      addDevicePageSize: 25,
      addDeviceTotal: 0,
      addOrUpdateModalTableData: []
    }
  },
  methods: {
    removeNull (val) {
      return judgeNull(val, '')
    },
    changeStartDate (date) {
      this.searchBarForm.protectStartDate = date
    },
    changeEndDate (date) {
      this.searchBarForm.protectEndDate = date
    },
    changeModalStartDate (date) {
      this.modalSearchBarForm.protectStartDate = date
    },
    changeModalEndDate (date) {
      this.modalSearchBarForm.protectEndDate = date
    },
    // 序号展示
    showTableIndex (params, current, pageSize) {
      return (
        (current > 0 ? current - 1 : current) * pageSize + params.index + 1
      )
    },
    onProtectLoadData () {
      this.loading = false
    },
    onProtectLoadDataPageInfo (tmpCurrent, tmpPageSize, total, totalPage) {
      this.current = tmpCurrent
      this.pageSize = tmpPageSize
      this.total = total
    },
    topPanelQuery: function (name = 'searchBarForm') {
      let _this = this
      this.$refs[name].validate(valid => {
        if (valid) {
          _this.protectAjaxData = _this.cloneSearch()
          _this.current = 1
          setTimeout(_this.getTableData, 100)
        } else {
          _this.$Message.error('请补充查询条件!')
        }
      })
    },
    getTableData () {
      this.$refs.protectTable.onPageChange(this.current, this.pageSize)
    },
    selectionChange (data) {
      this.selectDatas = data
    },
    deleteData () {
      let _this = this
      if (_this.deleteFlag) {
        return
      }
      if (_this.selectDatas.length === 0) {
        _this.$Message.error('请选中需要删除的数据!')
      } else {
        _this.deleteFlag = true
        let protectUnitIds = _this.selectDatas.map(_ =>
          _this.removeNull(_.protectUnitId)
        )
        let ajaxData = {
          protectUnitIds: protectUnitIds
        }
        protectElecManagerApi
          .deleteProtectData(ajaxData)
          .then(res => {
            let isSuccess = res.data.success
            if (isSuccess) {
              _this.current = 1
              _this.getTableData()
              _this.selectDatas = []
              _this.$Message.info('删除成功！')
            } else {
              _this.$Message.error('删除失败！')
            }
          })
          .catch(err => {
            _this.$Message.error('删除失败！')
          })
          .finally(() => {
            _this.deleteFlag = false
          })
      }
    },
    addOrUpdateSelectionChange (data) {
      this.addOrUpdateSelectDatas = data
    },
    addDeviceSelectionChange (data) {
      this.addDeviceSelectDatas = data
    },
    updateModalMounted () {
      let unitInfo = this.selectDatas[0]
      this.modalSearchBarForm.protectMedicalGroup = unitInfo.unitNo
      if (unitInfo.protectAttr === '机组') {
        this.changeModalProtectProperties('0', 'modify')
        let obj = {
          unitNo: unitInfo.unitNo,
          unitName: unitInfo.unitName,
          protectUnitNo: unitInfo.protectUnitNo,
          protectBeginDate: unitInfo.protectBeginDate,
          protectEndDate: unitInfo.protectEndDate,
          protectReason: unitInfo.protectReason
        }
        this.addOrUpdateModalTableData.push(obj)
      } else {
        this.changeModalProtectProperties('1', 'modify')
        this.modalSearchBarForm.protectUnitId = unitInfo.protectUnitId
        let modifyAjaxData = {
          protectUnitId: unitInfo.protectUnitId
        }
        let _this = this
        protectElecManagerApi
          .getModifyList(modifyAjaxData)
          .then(res => {
            let list = res.data.data
            this.addOrUpdateModalTableData = list
          })
          .catch(err => {
            _this.$Message.error('查询失败！')
          })
      }
    },
    modalAddOrUpdate: function (name = 'modalSearchBarForm') {
      let _this = this
      if (this.addOrUpdateFlag) {
        return
      }
      if (this.modalModel === 'add') {
        if (this.addOrUpdateModalTableData.length === 0) {
          _this.$Message.error('至少有一条数据！')
          return
        }
        this.addOrUpdateFlag = true
        if (!this.isModalDevice) {
          let ajaxData = this.addOrUpdateModalTableData[0]
          protectElecManagerApi
            .addProtectUnit(ajaxData)
            .then(res => {
              let isSuccess = res.data.success
              if (isSuccess) {
                _this.current = 1
                _this.getTableData()
                _this.selectDatas = []
                _this.closeProtectModal()
                _this.$Message.info('新增成功！')
              } else {
                _this.$Message.error('新增失败！')
              }
            })
            .catch(err => {
              _this.$Message.error('新增失败！')
            })
            .finally(() => {
              _this.addOrUpdateFlag = false
            })
        } else {
          let powerManagementAddSubdeviceListReqs = this
            .addOrUpdateModalTableData
          let unitNo = this.addOrUpdateModalTableData[0].unitNo
          let unitName = this.addOrUpdateModalTableData[0].unitName
          let ajaxData = {
            powerManagementAddSubdeviceListReqs: powerManagementAddSubdeviceListReqs,
            unitNo: unitNo,
            unitName: unitName
          }
          protectElecManagerApi
            .addProtectDevice(ajaxData)
            .then(res => {
              let isSuccess = res.data.success
              if (isSuccess) {
                _this.current = 1
                _this.getTableData()
                _this.selectDatas = []
                _this.closeProtectModal()
                _this.$Message.info('新增成功！')
              } else {
                _this.$Message.error('新增失败！')
              }
            })
            .catch(err => {
              _this.$Message.error('新增失败！')
            })
            .finally(() => {
              _this.addOrUpdateFlag = false
            })
        }
      } else {
        if (!this.isModalDevice) {
          let ajaxData = this.addOrUpdateModalTableData[0]
          protectElecManagerApi
            .modifyProtectUnit(ajaxData)
            .then(res => {
              let isSuccess = res.data.success
              if (isSuccess) {
                _this.current = 1
                _this.getTableData()
                _this.selectDatas = []
                _this.closeProtectModal()
                _this.$Message.info('修改成功！')
              } else {
                _this.$Message.error('修改失败！')
              }
            })
            .catch(err => {
              _this.$Message.error('修改失败！')
            })
            .finally(() => {
              _this.addOrUpdateFlag = false
            })
        } else {
          let powerManagementAddSubdeviceListReqs = this
            .addOrUpdateModalTableData
          let protectUnitId = this.modalSearchBarForm.protectUnitId
          let ajaxData = {
            powerManagementAddSubdeviceListReqs: powerManagementAddSubdeviceListReqs,
            protectUnitId: protectUnitId
          }
          protectElecManagerApi
            .modifyProtectDevice(ajaxData)
            .then(res => {
              let isSuccess = res.data.success
              if (isSuccess) {
                _this.current = 1
                _this.getTableData()
                _this.selectDatas = []
                _this.closeProtectModal()
                _this.$Message.info('修改成功！')
              } else {
                _this.$Message.error('修改失败！')
              }
            })
            .catch(err => {
              _this.$Message.error('修改失败！')
            })
            .finally(() => {
              _this.addOrUpdateFlag = false
            })
        }
      }
    },
    openAddOrUpdateModal (model) {
      this.modalModel = model
      if (model === 'modify') {
        if (this.selectDatas.length === 0 || this.selectDatas.length > 1) {
          this.$Message.error('请选中一条数据!')
        } else {
          this.modalTitle = '修改弹窗'
          this.updateModalMounted()
          this.showModalFlag = true
        }
      } else {
        this.showModalFlag = true
        this.modalTitle = '新增弹窗'
      }
    },
    changeUnitColumnData (val) {
      if (val === '' || val === undefined) {
        return
      }
      this.addOrUpdateModalTableData = []
      if (this.isModalDevice) {
        return
      }
      let unitNo = val
      let unitName = this.proElecMedicalMap.get(val)
      let protectBeginDate = this.protectFormatDate()
      let protectEndDate = this.protectFormatDate()
      let protectReason = ''
      let obj = {
        unitNo: unitNo,
        unitName: unitName,
        protectBeginDate: protectBeginDate,
        protectEndDate: protectEndDate,
        protectReason: protectReason
      }
      this.addOrUpdateModalTableData.push(obj)
    },
    changeModalProtectProperties (value, modal = 'add') {
      if (
        (value === '0' && !this.isModalDevice) ||
        (value === '1' && this.isModalDevice)
      ) {
        return
      }
      if (value === '1') {
        this.isModalDevice = true
        this.modalSearchBarForm.protectProperty = '1'
      } else {
        this.isModalDevice = false
        this.modalSearchBarForm.protectProperty = '0'
      }
      if (modal === 'add') {
        this.modalSearchBarForm.protectMedicalGroup = ''
      }
      this.addOrUpdateModalTableData = []
    },
    addModalData () {
      if (
        this.modalSearchBarForm.protectMedicalGroup === '' ||
        this.modalSearchBarForm.protectMedicalGroup === undefined
      ) {
        this.$Message.error('请选择机组名称！')
        return
      }
      this.addDeviceCurrent = 1
      this.addDevicePageSize = 25
      this.addDeviceTotal = 0
      this.addDeviceModalSearchBarForm.unitId = this.modalSearchBarForm.protectMedicalGroup
      this.queryAddDevice()
      this.addDeviceModalShowFlag = true
    },
    queryAddDevice () {
      this.addDeviceCurrent = 1
      this.addDeviceModalTableAjaxData = this.cloneAddDeviceSearch()
      setTimeout(this.getAddDeviceTableData, 100)
    },
    onAddDeviceLoadData () {
      this.addDeviceLoading = true
    },
    onAddDeviceLoadDataPageInfo (tmpCurrent, tmpPageSize, total, totalPage) {
      this.addDeviceCurrent = tmpCurrent
      this.addDevicePageSize = tmpPageSize
      this.addDeviceTotal = total
    },
    getAddDeviceTableData () {
      this.$refs.addDeviceTable.onPageChange(
        this.addDeviceCurrent,
        this.addDevicePageSize
      )
    },
    closeProtectModal () {
      this.showModalFlag = false
    },
    resetModalData () {
      this.isModalDevice = 0
      this.modalSearchBarForm.protectUnitId = ''
      this.modalSearchBarForm.protectMedicalGroup = ''
      this.modalSearchBarForm.protectProperty = '0'
      this.addOrUpdateModalTableData = []
    },
    closeAddDeviceModal () {
      this.addDeviceModalShowFlag = false
      this.addDeviceModalSearchBarForm.unitId = ''
      this.addDeviceModalSearchBarForm.deviceName = ''
      this.addDeviceModalSearchBarForm.deviceType = 'all'
    },
    addDevice () {
      let data = this.addDeviceSelectDatas
      let unitNo = this.unitIdNoMaps.get(
        this.addDeviceModalSearchBarForm.unitId
      )
      let unitName = this.proElecMedicalMap.get(unitNo)
      for (let addIndex = 0; addIndex < data.length; addIndex++) {
        let obj = {
          unitNo: unitNo,
          unitName: unitName,
          subdeviceNo: data[addIndex].subdeviceNo,
          subdeviceName: data[addIndex].subdeviceName,
          subdeviceType: this.deviceTypeMaps.get(data[addIndex].subdeviceType),
          protectBeginDate: this.protectFormatDate(),
          protectEndDate: this.protectFormatDate(),
          protectReason: ''
        }
        this.addOrUpdateModalTableData.push(obj)
      }
      this.closeAddDeviceModal()
    },
    deleteModalData () {
      if (this.addOrUpdateSelectDatas.length === 0) {
        this.$Message.error('请选中需要删除的数据!')
      } else {
        let arr = []
        let tableArr = []
        for (
          let arrIndex = 0;
          arrIndex < this.addOrUpdateModalTableData.length;
          arrIndex++
        ) {
          for (
            let innerIndex = 0;
            innerIndex < this.addOrUpdateSelectDatas.length;
            innerIndex++
          ) {
            if (
              this.addOrUpdateModalTableData[arrIndex].initRowIndex ===
              this.addOrUpdateSelectDatas[innerIndex].initRowIndex
            ) {
              arr.push(arrIndex)
              break
            }
          }
        }
        for (
          let realIndex = 0;
          realIndex < this.addOrUpdateModalTableData.length;
          realIndex++
        ) {
          if (arr.indexOf(realIndex) !== -1) {
            continue
          }
          tableArr.push(this.addOrUpdateModalTableData[realIndex])
        }
        this.addOrUpdateModalTableData = tableArr
        this.addOrUpdateSelectDatas = []
      }
    },
    showDeviceDetail (params) {
      let _this = this
      _this.modalMedicalName = params.row.unitName
      _this.modalOwnUser = params.row.ownerNo
      _this.modalOwnArea = params.row.areaNo
      _this.unitBeginDate = params.row.protectBeginDate
      _this.unitEndDate = params.row.protectEndDate
      _this.deviceCurrent = 1
      _this.devicePageSize = 25
      _this.deviceTotal = 0
      let isUnit = params.row.protectAttr === '机组' ? 1 : 0
      let unitNo = params.row.unitNo
      let protectUnitId = params.row.protectUnitId
      _this.deviceIsUnit = isUnit
      _this.deviceAjaxData = {
        protectUnitId: protectUnitId,
        unitNo: unitNo,
        isUnit: isUnit
      }
      _this.deviceModalShow = true
      setTimeout(_this.queryDeviceDetail, 100)
    },
    onDeviceLoadData () {
      this.deviceModalTableLoading = false
    },
    onDeviceLoadDataPageInfo (tmpCurrent, tmpPageSize, total, totalPage) {
      this.deviceCurrent = tmpCurrent
      this.devicePageSize = tmpPageSize
      this.deviceTotal = total
    },
    queryDeviceDetail () {
      this.$refs.modalDeviceTable.onPageChange(
        this.deviceCurrent,
        this.devicePageSize
      )
    },
    cloneSearch () {
      let clone = {}
      let elecFacUser = this.searchBarForm.elecFacUser
      let proElecMedicalGroup = this.searchBarForm.proElecMedicalGroup
      let protectStartDate = this.searchBarForm.protectStartDate
      let protectEndDate = this.searchBarForm.protectEndDate
      clone.ownerNo = elecFacUser
      clone.unitNo = proElecMedicalGroup
      clone.protectBeginDate = protectStartDate
      clone.protectEndDate = protectEndDate
      return clone
    },
    cloneDeviceSearch () {
      let clone = {}
      let protectMedicalGroup = this.searchBarForm.protectMedicalGroup
      let protectProperty = this.searchBarForm.protectProperty
      let protectStartTime = this.searchBarForm.protectStartTime
      let protectEndTime = this.searchBarForm.protectEndTime
      let protectReason = this.searchBarForm.protectReason
      clone.protectMedicalGroup = protectMedicalGroup
      clone.protectProperty = protectProperty
      clone.protectStartTime = protectStartTime
      clone.protectEndTime = protectEndTime
      clone.protectReason = protectReason
      return clone
    },
    cloneAddDeviceSearch () {
      let clone = {}
      let unitId = this.addDeviceModalSearchBarForm.unitId
      let subdeviceName = this.addDeviceModalSearchBarForm.deviceName
      let subdeviceType = this.addDeviceModalSearchBarForm.deviceType
      clone.unitId = unitId
      clone.subdeviceName = subdeviceName
      clone.subdeviceType = subdeviceType
      return clone
    },
    getUserList () {
      let _this = this
      commonApi
        .getUserList({})
        .then(res => {
          let list = res.data.data
          if (typeof list !== 'undefined' && list !== null && list.length > 0) {
            _this.elecFacUsers = _this.elecFacUsers.concat(list)
          }
        })
        .catch(err => {
          _this.$Message.error('下拉框查询失败！')
        })
    },
    getUnitNameList () {
      let _this = this
      commonApi
        .getUnitNameList({})
        .then(res => {
          let list = res.data.data
          if (typeof list !== 'undefined' && list !== null && list.length > 0) {
            _this.proElecMedicalGroups = _this.proElecMedicalGroups.concat(
              list
            )
            _this.modalProtectMedicalGroups = list
            _this.proElecMedicalMap = arrToMap(list, 'unitNo', 'unitName')
            _this.unitIdNoMaps = arrToMap(list, 'unitId', 'unitNo')
          }
        })
        .catch(err => {
          _this.$Message.error('下拉框查询失败！')
        })
    },
    getSubDeviceList () {
      let _this = this
      commonApi
        .getDropDownDatas({ type: 'SUB_DEVICE_TYPE' })
        .then(res => {
          let list = res.data.data
          if (typeof list !== 'undefined' && list !== null && list.length > 0) {
            _this.addDeviceModalDeviceTypes = _this.addDeviceModalDeviceTypes.concat(
              list
            )
          }
          _this.deviceTypeMaps = arrToMap(list)
        })
        .catch(err => {
          _this.$Message.error('下拉框查询失败！')
        })
    },
    protectFormatDate () {
      let date = new Date()
      let year = date.getFullYear()
      let month = ('0' + (date.getMonth() + 1)).slice(-2)
      let day = ('0' + date.getDate()).slice(-2)
      return year + '-' + month + '-' + day
    },
    changeHeight: function () {
      this.tableHeight =
        window.innerHeight > 800 ? window.innerHeight - 340 : 500
    }
  },
  created () {},
  watch: {
    showModalFlag (val) {
      if (!val) {
        this.resetModalData()
      }
    }
  },
  computed: {
    computeCol () {
      let columns = this.columns
      if (!this.isModalDevice) {
        columns = this.addOrUpdateTable.columns.filter(
          col =>
            col.key !== 'subdeviceType' &&
            col.key !== 'subdeviceName' &&
            col.key !== 'select'
        )
      }
      if (this.isModalDevice) {
        columns = this.addOrUpdateTable.columns.filter(
          col => col.key !== 'unitName'
        )
      }
      return columns
    }
  },
  mounted () {
    this.topPanelQuery()
    this.getUserList()
    this.getUnitNameList()
    this.getSubDeviceList()
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
.protectElecManager .searchBar {
  height: 94px;
  background: #fcfcfc;
  border: 1px solid rgba(215, 215, 215, 1);
  border-radius: 4px;
  padding: 5px 5px 5px 5px;
  margin-bottom: 5px;
  position: relative;
}

.protectElecManager .protectElecResult {
  position: relative;
}

.protectElecManager .protectElecAlertBar,
.protectElecManager .protectElecResultBar {
  font-weight: 650;
  font-size: 16px;
  color: #009999;
  line-height: 40px;
  margin-bottom: 0;
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

.protectElecManager .toolBar {
  display: inline-block;
  position: absolute;
  top: 0px;
  right: 12px;
}

.protectElecManager .toolBar .addInfo,
.protectElecManager .toolBar .modifyInfo,
.protectElecManager .toolBar .deleteInfo {
  display: inline-block;
  cursor: pointer;
  line-height: 45px;
  height: 45px;
}

.protectElecManager .toolBar span {
  font-size: 14px;
  color: #009999;
  font-weight: 700;
  display: inline-block;
  height: 45px;
  line-height: 45px;
  vertical-align: top;
}

.protectElecManager .toolBar .imgControl {
  display: inline-block;
  margin-right: 5px;
}

.protectElecManager .toolBar .imgControl img {
  vertical-align: middle;
}

.protectElecManager .toolBar .toolMarginControl {
  margin: 0 10px 0 10px;
}

.addOrUpdateModal .modalTableBar .modalTitle {
  font-weight: 700;
  font-size: 13px;
  color: #009999;
  margin-right: 5px;
}

.addOrUpdateModal .modalTableBar .modalSubTitle {
  font-weight: 400;
  font-size: 12px;
  color: #cccccc;
}

.addOrUpdateModal .modalTableBar {
  position: relative;
  height: 20px;
  margin-bottom: 10px;
}

.addOrUpdateModal .modalTableBar .toolBar {
  display: inline-block;
  position: absolute;
  top: 0px;
  right: 12px;
}

.addOrUpdateModal .modalTableBar .toolBar .addInfo,
.addOrUpdateModal .modalTableBar .toolBar .deleteInfo {
  display: inline-block;
  cursor: pointer;
  line-height: 20px;
  height: 20px;
}

.addOrUpdateModal .modalTableBar .toolBar span {
  font-size: 13px;
  color: #009999;
  font-weight: 700;
  display: inline-block;
  height: 20px;
  line-height: 24px;
  vertical-align: top;
}

.addOrUpdateModal .modalTableBar .toolBar .imgControl {
  display: inline-block;
  margin-right: 5px;
}

.addOrUpdateModal .modalTableBar .toolBar .imgControl img {
  vertical-align: middle;
}

.addOrUpdateModal .modalTableBar .toolBar .toolMarginControl {
  margin: 0 10px 0 10px;
  line-height: 20px;
}

.addDeviceModal .addDeviceModalBody .addDeviceModalTableBar {
  position: relative;
  height: 20px;
  margin-bottom: 10px;
}

.addDeviceModal .addDeviceModalBody .addDeviceModalTableBar .modalTitle {
  font-weight: 700;
  font-size: 13px;
  color: #009999;
}

.addOrUpdateModal .addOrUpdateModalBody .addOrUpdateModalTable {
  margin-bottom: 10px;
}
</style>
