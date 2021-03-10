<template>
  <div class="archiveManage-body">
    <div class="show-tree-btn" @click.stop="showTree">
      <Icon type="ios-arrow-forward" v-if="!showLeftTree"/>
      <Icon type="ios-arrow-back" v-else />
    </div>
    <div class="left-tree" :class="showLeftTree ? 'show-tree' : 'hide-tree'" v-if="defaultshowLeftTree">
      <Card>
        <div slot="title">
          <div>
            <img src="./images/u2269.png" alt />
          </div>
          <div>
            <span>查询</span>
          </div>
        </div>
        <div class="input-box">
          <Icon type="ios-search" @click="searchTree"></Icon>
          <Input v-model="filterTreeValue" placeholder="请输入模糊搜索内容" style="width: 100%" size="large"></Input>
        </div>
        <div class="tree-box">
          <!--<Tree-->
            <!--ref="tree"-->
            <!--:data="treeData"-->
            <!--:load-data="loadTreeData"-->
            <!--@on-select-change="selectChangeNode"-->
          <!--&gt;</Tree>-->
          <Tree
            ref="tree"
            :data="treeData"
            :render="renderContent"
            @on-select-change="selectChangeNode"
          ></Tree>
        </div>
        <div class="add-btn" @click="addForm">新增</div>
      </Card>
    </div>
    <!--新增表单信息-->
    <add-form
      :nodeStatus="nodeStatus"
      :showForm="showForm"
      :showAddFormModal="showAddFormModal"
      :addFormTitle="addFormTitle"
      :userParentNodeId="userParentNodeId"
      :unitPrentNodeId="unitPrentNodeId"
      :deviceParentNodeId="deviceParentNodeId"
      @changeNodeStatus="changeNodeStatus"
      @closeModalFun="closeModalFun"
      @resetLoadTree="resetLoadTree"
    ></add-form>
    <div class="info-body">
      <!--基本信息-->
      <archive-manage-base-info
        :nodeStatus="nodeStatus"
        :virtualPowerPlantFormItem="virtualPowerPlantFormItem"
        :virtualPowerPlantBaseInfo="virtualPowerPlantBaseInfo"
        :userFormItem="userFormItem"
        :userBaseInfo="userBaseInfo"
        :virtualUnitFormItem="virtualUnitFormItem"
        :unitBaseInfo="unitBaseInfo"
        :deviceFormItem="deviceFormItem"
        :deviceBaseInfo="deviceBaseInfo"
        :currentNodeId="currentNodeId"
        :currentUserNodeId="currentUserNodeId"
        :currentUnitNodeId="currentUnitNodeId"
        :currentDeviceNodeId="currentDeviceNodeId"
        @modifyPowerPlantInfo="modifyPowerPlantInfo"
        @modifyUserInfo="modifyUserInfo"
        @modifyUnitInfo="modifyUnitInfo"
        @modifyDeviceInfo="modifyDeviceInfo"
        @resetLoadPowerPlantData="resetLoadPowerPlantData"
        @resetLoadUserData="resetLoadUserData"
        @resetLoadUnitData="resetLoadUnitData"
        @resetLoadDeviceData="resetLoadDeviceData"
      ></archive-manage-base-info>
      <div class="statistical-info" v-if="nodeStatus===1 || nodeStatus===2 || nodeStatus===3">
        <div class="statistical-title">统计信息</div>
        <div class="statistical-top">
          <div class="left-box">
            <div class="charts-title" v-if="nodeStatus===1">
              <div>
                区域分布
              </div>
              <div>
                <div class="user-btn" :class="isChoose=== 1 ? 'bg-color' : 0" @click="areaChangeChoose(1)">业主</div>
                <div class="group-btn" :class="isChoose=== 0 ? 'bg-color' : 0" @click="areaChangeChoose(0)">机组</div>
              </div>
            </div>
            <div class="charts-title" v-if="nodeStatus===2">
              <div>机组性质分布</div>
            </div>
            <div class="factor-title" v-if="nodeStatus===3">
              <div>设备因子分类</div>
            </div>
            <!--区域分布-->
            <div v-if="nodeStatus===1" class="charts-box">
              <archive-manage-area-charts :areaData="areaData"></archive-manage-area-charts>
              <div class="area-total">
                <p v-if="isChoose===1">业主总数：<span>{{userTotal}}户</span></p>
                <p v-else>机组总数：<span>{{unitTotal}}台</span></p>
              </div>
            </div>
            <!--机组分布-->
            <div v-if="nodeStatus===2">
              <archive-manage-unit-nature-charts :unitNatureData="unitNatureData"></archive-manage-unit-nature-charts>
            </div>
            <div v-if="nodeStatus===3">
              <archive-manage-device-factor-charts :deviceFactorData="deviceFactorData"></archive-manage-device-factor-charts>
            </div>
          </div>
          <div class="right-box">
            <div class="right-chart-title" v-if="nodeStatus===1 || nodeStatus===2">
              <div>机组类型分布</div>
              <achive-medical-type-pie :unitTypeData="unitTypeData"></achive-medical-type-pie>
            </div>
            <div class="right-chart-title" v-if="nodeStatus===3">
              <div >因子容量排名前五</div>
              <archive-rate-capacity-charts :factorCapacityName="factorCapacityName" :factorCapacityData="factorCapacityData" v-if="nodeStatus===3"></archive-rate-capacity-charts>
            </div>
          </div>
        </div>
        <div class="statistical-bottom" v-if="nodeStatus===1">
          <div>
            <div class="bottom-chart-title">
              <div>机组性质分布</div>
            </div>
            <archive-manage-unit-nature-charts :unitNatureData="unitNatureData"></archive-manage-unit-nature-charts>
          </div>
          <div>
            <div class="bottom-chart-title">
              <div>机组容量排名前五</div>
            </div>
            <archive-unit-capacity-charts :unitCapacityName="unitCapacityName" :unitCapacityData="unitCapacityData" :nodeStatus="nodeStatus"></archive-unit-capacity-charts>
          </div>
        </div>
        <div class="choose-user" v-if="nodeStatus===2">
          <div class="bottom-chart-title">
            <div>机组容量排名前五</div>
          </div>
          <archive-unit-capacity-charts :unitCapacityName="unitCapacityName" :unitCapacityData="unitCapacityData" :nodeStatus="nodeStatus"></archive-unit-capacity-charts>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/libs/api.request'
import archiveManageAreaCharts from './archiveManageAreaCharts'
import archiveUnitCapacityCharts from './archiveUnitCapacityCharts'
import archiveManageBaseInfo from './archiveManageBaseInfo'
import archiveManageUnitTypeCharts from './archiveManageUnitTypeCharts'
import archiveManageUnitNatureCharts from './archiveManageUnitNatureCharts'
import archiveManageDeviceFactorCharts from './archiveManageDeviceFactorCharts'
import archiveRateCapacityCharts from './archiveRateCapacityCharts'
import achiveMedicalTypePie from './achiveMedicalTypePie'
import addForm from './addForm'
import { deepCopy } from '@/libs/util'
export default {
  name: 'achiveManage',
  components: {
    archiveManageAreaCharts,
    archiveUnitCapacityCharts,
    archiveManageBaseInfo,
    archiveManageUnitTypeCharts,
    archiveManageUnitNatureCharts,
    archiveRateCapacityCharts,
    archiveManageDeviceFactorCharts,
    achiveMedicalTypePie,
    addForm
  },
  data () {
    return {
      isChoose: 1,
      areaData: [],
      areaTotalData: [],
      areaUserData: [],
      areaUnitData: [],
      userTotal: 0,
      unitTotal: 0,
      unitCapacityData: [], // 机组容量数据
      unitCapacityName: [],
      unitFactorData: [87, 78, 65, 50, 32], // 机组因子数据
      factorRateCapacityData: [87, 78, 65, 50, 32], // 因子额定容量数据
      // generElectricData: [20, 34, 38, 50, 75, 80, 95, 93, 88, 75, 64, 40, 25], // 发电时段分布数据
      showLeftTree: false,
      defaultshowLeftTree: false,
      filterTreeValue: '',
      treeData: [],
      nodeStatus: 1, // 1-虚拟电厂， 2-业主， 3-虚拟机组， 4-空调、设备
      virtualPowerPlantFormItem: {}, // 电厂表单信息
      virtualPowerPlantBaseInfo: {}, // 电厂基本信息
      userFormItem: {}, // 业主表单信息
      userBaseInfo: {}, // 业主基本信息
      virtualUnitFormItem: {}, // 机组表单信息
      unitBaseInfo: {}, // 机组基本信息
      deviceFormItem: {}, // 设备表单信息
      deviceBaseInfo: {}, // 设备基本信息
      unitTypeData: [], // 机组类型数据
      unitNatureData: [], // 机组性质数据
      deviceFactorData: [],
      factorCapacityName: [],
      factorCapacityData: [],
      showAddFormModal: false,
      addFormTitle: '',
      showForm: {
        showPower: false,
        showUser: false,
        showUnit: false,
        showDevice: false
      },
      currentNodeId: '', // 电厂Id
      currentUserNodeId: '', // 业主Id
      currentUnitNodeId: '', // 机组Id
      currentDeviceNodeId: '', // 设备Id
      userParentNodeId: '', // 业主父节点Id
      unitPrentNodeId: '', // 机组父节点Id
      deviceParentNodeId: ''// 设备父节点Id
    }
  },
  mounted () {
    this.loadTreeData()
    // 默认加载电厂信息
    this.loadPowerPlantData()
  },
  methods: {
    selectChangeNode (node) {
      this.currentNodeId = node[0].plantId
      this.currentUserNodeId = node[0].ownerId
      this.currentUnitNodeId = node[0].unitId
      this.currentDeviceNodeId = node[0].subdeviceId
      this.showLeftTree = false
      if (node[0].type === '01') {
        this.nodeStatus = 1
        this.showForm.showPower = true
        this.showForm.showUser = false
        this.showForm.showUnit = false
        this.showForm.showDevice = false
        this.loadPowerPlantData()
      }
      if (node[0].type === '02') {
        this.userParentNodeId = node[0].plantId
        this.nodeStatus = 2
        this.showForm.showUser = true
        this.showForm.showPower = false
        this.showForm.showUnit = false
        this.showForm.showDevice = false
        this.loadUserData()
      }
      if (node[0].type === '03') {
        this.unitPrentNodeId = node[0].ownerNo
        this.nodeStatus = 3
        this.showForm.showUnit = true
        this.showForm.showPower = false
        this.showForm.showUser = false
        this.showForm.showDevice = false
        this.loadUnitData()
      }
      if (node[0].type === '04') {
        this.deviceParentNodeId = node[0].unitId
        this.nodeStatus = 4
        this.showForm.showDevice = true
        this.showForm.showPower = false
        this.showForm.showUser = false
        this.showForm.showUnit = false
        this.loadDeviceData()
      }
    },
    // 加载电厂信息
    loadPowerPlantData () {
      let params = {
        virtualPowerPlantId: this.currentNodeId
      }
      axios.request({
        url: 'armac/virtualPowerPlantFileInformation',
        data: params,
        method: 'post'
      }).then(res => {
        if (res.status === 200) {
          this.unitTypeData = []
          this.unitNatureData = []
          this.unitCapacityName = []
          this.unitCapacityData = []
          this.virtualPowerPlantFormItem = res.data.virtualPowerPlantInformation_BasicInformationResp === null ? this.virtualPowerPlantFormItem : res.data.virtualPowerPlantInformation_BasicInformationResp
          this.virtualPowerPlantBaseInfo = JSON.parse(JSON.stringify(this.virtualPowerPlantFormItem))
          // 机组类型数据处理
          let DRItem = {
            name: 'DR',
            value: 0
          }
          let ADRItem = {
            name: 'ADR',
            value: 0
          }
          let DRAndADRItem = {
            name: 'DR&ADR',
            value: 0
          }
          let unitTypeArr = res.data.virtualPowerPlantInformation_UnitType
          if (unitTypeArr !== null && unitTypeArr.length !== 0) {
            for (let i = 0; i < unitTypeArr.length; i++) {
              if (unitTypeArr[i].unitType === '01') {
                DRItem.value = unitTypeArr[i].nums
              }
              if (unitTypeArr[i].unitType === '02') {
                ADRItem.value = unitTypeArr[i].nums
              }
              if (unitTypeArr[i].unitType === '03') {
                DRAndADRItem.value = unitTypeArr[i].nums
              }
            }
            this.unitTypeData.push(DRItem, ADRItem, DRAndADRItem)
          }
          // 机组性质数据处理
          let officeItem = {
            name: '办公建筑',
            value: 0
          }
          let marketItem = {
            name: '商场建筑',
            value: 0
          }
          let complexItem = {
            name: '综合建筑',
            value: 0
          }
          let hotelItem = {
            name: '宾馆建筑',
            value: 0
          }
          let unitNatureArr = res.data.virtualPowerPlantInformation_natureOfUnit
          if (unitNatureArr !== null && unitNatureArr.length !== 0) {
            for (let i = 0; i < unitNatureArr.length; i++) {
              if (unitNatureArr[i].unitAttr === '01') {
                officeItem.value = unitNatureArr[i].nums
              }
              if (unitNatureArr[i].unitAttr === '02') {
                marketItem.value = unitNatureArr[i].nums
              }
              if (unitNatureArr[i].unitAttr === '03') {
                complexItem.value = unitNatureArr[i].nums
              }
              if (unitNatureArr[i].unitAttr === '04') {
                hotelItem.value = unitNatureArr[i].nums
              }
            }
            this.unitNatureData.push(officeItem, marketItem, complexItem, hotelItem)
          }
          // 机组容量排名数据处理
          let unitCapacityRank = res.data.virtualPowerPlantInformation_unitCapacityRanking
          if (unitCapacityRank !== null && unitCapacityRank.length !== 0) {
            for (let i = 0; i < unitCapacityRank.length; i++) {
              this.unitCapacityName.push(unitCapacityRank[i].unitName)
              this.unitCapacityData.push(unitCapacityRank[i].nums * 1)
            }
          }
          // 区域分布数据
          this.areaTotalData = res.data.virtualPowerPlantInformation_StatisticsInformation_arealDistributionResps
          if (this.areaTotalData !== null && this.areaTotalData.length !== 0) {
            for (let i = 0; i < this.areaTotalData.length; i++) {
              if (this.areaTotalData[i].type === '业主') {
                this.areaUserData = this.areaTotalData[i].virtualPowerPlantInformation_StatisticsInformationNums
              }
              if (this.areaTotalData[i].type === '机组') {
                this.areaUnitData = this.areaTotalData[i].virtualPowerPlantInformation_StatisticsInformationNums
              }
            }
            this.areaData = this.areaUserData
            for (let i = 0; i < this.areaUserData.length; i++) {
              this.userTotal += this.areaUserData[i].value
            }
            for (let i = 0; i < this.areaUnitData.length; i++) {
              this.unitTotal += this.areaUnitData[i].value
            }
          }
        }
      })
    },
    // 加载业主信息
    loadUserData () {
      axios.request({
        url: 'armac/userProfileInformation',
        data: this.currentUserNodeId,
        method: 'post'
      }).then(res => {
        this.unitTypeData = []
        this.unitNatureData = []
        this.unitCapacityName = []
        this.unitCapacityData = []
        if (res.status === 200) {
          this.userFormItem = res.data.userProfileInformation_basicInformationResp === null ? this.userFormItem : res.data.userProfileInformation_basicInformationResp
          this.userBaseInfo = JSON.parse(JSON.stringify(this.userFormItem))
          // 机组类型数据处理
          let DRItem = {
            name: 'DR',
            value: 0
          }
          let ADRItem = {
            name: 'ADR',
            value: 0
          }
          let DRAndADRItem = {
            name: 'DR&ADR',
            value: 0
          }
          let unitTypeArr = res.data.userProfileInformation_UnitType
          if (unitTypeArr !== null && unitTypeArr.length !== 0) {
            for (let i = 0; i < unitTypeArr.length; i++) {
              if (unitTypeArr[i].unitType === '01') {
                DRItem.value = unitTypeArr[i].nums
              }
              if (unitTypeArr[i].unitType === '02') {
                ADRItem.value = unitTypeArr[i].nums
              }
              if (unitTypeArr[i].unitType === '03') {
                DRAndADRItem.value = unitTypeArr[i].nums
              }
            }
            this.unitTypeData.push(DRItem, ADRItem, DRAndADRItem)
          }
          // 机组性质数据处理
          let unitNatureArr = res.data.userProfileInformation_natureOfUnit
          let officeItem = {
            name: '办公建筑',
            value: 0
          }
          let marketItem = {
            name: '商场建筑',
            value: 0
          }
          let complexItem = {
            name: '综合建筑',
            value: 0
          }
          let hotelItem = {
            name: '宾馆建筑',
            value: 0
          }
          if (unitNatureArr !== null && unitNatureArr.length !== 0) {
            for (let i = 0; i < unitNatureArr.length; i++) {
              if (unitNatureArr[i].unitAttr === '01') {
                officeItem.value = unitNatureArr[i].nums
              }
              if (unitNatureArr[i].unitAttr === '02') {
                marketItem.value = unitNatureArr[i].nums
              }
              if (unitNatureArr[i].unitAttr === '03') {
                complexItem.value = unitNatureArr[i].nums
              }
              if (unitNatureArr[i].unitAttr === '04') {
                hotelItem.value = unitNatureArr[i].nums
              }
            }
            this.unitNatureData.push(officeItem, marketItem, complexItem, hotelItem)
          }
          // 机组容量排名数据处理
          let unitCapacityRank = res.data.userProfileInformation_unitCapacityRanking
          if (unitCapacityRank !== null && unitCapacityRank.length !== 0) {
            for (let i = 0; i < unitCapacityRank.length; i++) {
              this.unitCapacityName.push(unitCapacityRank[i].unitName)
              this.unitCapacityData.push(unitCapacityRank[i].nums * 1)
            }
          }
        }
      })
    },
    // 加载机组信息
    loadUnitData () {
      axios.request({
        url: 'armac/unitFileInformation',
        data: this.currentUnitNodeId,
        method: 'post'
      }).then(res => {
        if (res.status === 200) {
          this.virtualUnitFormItem = res.data.unitFileInformation_basicInformationResp === null ? this.virtualUnitFormItem : res.data.unitFileInformation_basicInformationResp
          this.unitBaseInfo = JSON.parse(JSON.stringify(this.virtualUnitFormItem))
          // 设备因子分类数据处理
          let deviceFactorArr = res.data.unitFileInformation_StatisticsInformation1_DeviceFactorClassificationResps
          if (deviceFactorArr !== null && deviceFactorArr.length !== 0) {
            let airItem = {
              name: '空调',
              value: 0
            }
            let lightItem = {
              name: '照明',
              value: 0
            }
            let specialItem = {
              name: '特殊',
              value: 0
            }
            let motiveItem = {
              name: '动力',
              value: 0
            }
            for (let i = 0; i < deviceFactorArr.length; i++) {
              if (deviceFactorArr[i].type === '01') {
                airItem.value = deviceFactorArr[i].nums
              }
              if (deviceFactorArr[i].type === '02') {
                lightItem.value = deviceFactorArr[i].nums
              }
              if (deviceFactorArr[i].type === '03') {
                specialItem.value = deviceFactorArr[i].nums
              }
              if (deviceFactorArr[i].type === '04') {
                motiveItem.value = deviceFactorArr[i].nums
              }
            }
            this.deviceFactorData.push(airItem, lightItem, specialItem, motiveItem)
          }
          // 因子容量排名数据处理
          let factorCapacityArr = res.data.unitFileInformation_StatisticsInformation2Resps
          if (factorCapacityArr !== null && factorCapacityArr.length !== 0) {
            for (let i = 0; i < factorCapacityArr.length; i++) {
              this.factorCapacityName.push(factorCapacityArr[i].device)
              this.factorCapacityData.push(factorCapacityArr[i].ratedCap * 1)
            }
          }
        }
      })
    },
    // 加载设备信息
    loadDeviceData () {
      let params = {
        subdeviceId: this.currentDeviceNodeId
      }
      axios.request({
        url: 'armac/equipmentFileInformation',
        data: params,
        method: 'post'
      }).then(res => {
        if (res.data.code === 200) {
          this.deviceFormItem = res.data.data === null ? this.deviceFormItem : res.data.data
          this.deviceBaseInfo = JSON.parse(JSON.stringify(this.deviceFormItem))
        }
      })
    },
    // 重新加载树信息
    resetLoadTree () {
      this.loadTreeData()
    },
    // 重新加载电厂信息
    resetLoadPowerPlantData (data) {
      this.virtualPowerPlantFormItem = data
      this.virtualPowerPlantBaseInfo = JSON.parse(JSON.stringify(data))
    },
    // 重新加载业主信息
    resetLoadUserData (data) {
      this.userFormItem = data
      this.userBaseInfo = JSON.parse(JSON.stringify(data))
    },
    // 重新加载机组信息
    resetLoadUnitData (data) {
      this.virtualUnitFormItem = data
      this.unitBaseInfo = JSON.parse(JSON.stringify(data))
    },
    // 重新加载设备信息
    resetLoadDeviceData (data) {
      this.deviceFormItem = data
      this.deviceBaseInfo = JSON.parse(JSON.stringify(data))
    },
    // 查询树信息
    searchTree () {
      let params = {
        param1: this.filterTreeValue.trim()
      }
      axios.request({
        url: 'armac/OperationManagementTree2',
        data: params,
        method: 'post'
      }).then(res => {
        if (res.status === 200) {
          if (res.data.treePlants !== null && res.data.treePlants.length !== 0) {
            this.treeData = this.resetTreeDatas(res.data.treePlants)
          }
        }
      })
    },
    // 加载树信息
    loadTreeData () {
      axios.request({
        url: 'armac/OperationManagementTree',
        method: 'get'
      }).then(res => {
        if (res.status === 200) {
          if (res.data.treePlants !== null && res.data.treePlants.length !== 0) {
            this.treeData = this.resetTreeDatas(res.data.treePlants)
            this.currentNodeId = res.data.treePlants[0].plantId
          }
        }
      })
    },
    // 处理树数据
    resetTreeDatas (data) {
      let treeData = data
      if (treeData.length !== 0) {
        for (let i = 0; i < treeData.length; i++) {
          treeData[i].expand = true
          // 业主
          let userTree = treeData[i].children
          if (userTree.length !== 0) {
            for (let j = 0; j < userTree.length; j++) {
              userTree[j].expand = true
              // 机组
              let unitTree = userTree[j].children
              if (unitTree.length !== 0) {
                for (let k = 0; k < unitTree.length; k++) {
                  unitTree[k].expand = true
                }
              }
            }
          }
        }
      }
      return treeData
    },
    renderContent (h, { root, node, data }) {
      if (node.node.type === '01') {
        return h('span', {
          style: {
            display: 'inline-block',
            width: 'auto',
            cursor: 'pointer',
            background: node.node.selected ? '#dae8e7' : '#fff' // 根据选中状态设置样式
          },
          domProps: {
            className: 'btn'
          },
          on: {
            click: () => {
              if (!node.node.selected) {
                this.$refs.tree.handleSelect(node.nodeKey)
              } // 手动选择树节点
            }
          }
        }, [
          h('span', [
            h('Icon', {
              props: {
                type: 'ios-home',
                color: '#009999'
              },
              style: {
                marginRight: '8px'
              }
            }),
            h('span', data.title)
          ])
        ]
        )
      } else if (node.node.type === '02') {
        return h('span', {
          style: {
            display: 'inline-block',
            width: 'auto',
            cursor: 'pointer',
            background: node.node.selected ? '#dae8e7' : '#fff' // 根据选中状态设置样式
          },
          domProps: {
            className: 'btn'
          },
          on: {
            click: () => {
              if (!node.node.selected) {
                this.$refs.tree.handleSelect(node.nodeKey)
              } // 手动选择树节点
            }
          }
        }, [
          h('span', [
            h('Icon', {
              props: {
                type: 'md-person',
                color: '#009999'
              },
              style: {
                marginRight: '8px'
              }
            }),
            h('span', data.title)
          ])
        ]
        )
      } else if (node.node.type === '03') {
        return h('span', {
          style: {
            display: 'inline-block',
            width: 'auto',
            cursor: 'pointer',
            background: node.node.selected ? '#dae8e7' : '#fff' // 根据选中状态设置样式
          },
          domProps: {
            className: 'btn'
          },
          on: {
            click: () => {
              if (!node.node.selected) {
                this.$refs.tree.handleSelect(node.nodeKey)
              } // 手动选择树节点
            }
          }
        }, [
          h('span', [
            h('Icon', {
              props: {
                type: 'ios-switch',
                // type: 'ios-calculator-outline',
                color: '#009999'
              },
              style: {
                marginRight: '8px'
              }
            }),
            h('span', data.title)
          ])
        ]
        )
      } else if (node.node.type === '04') {
        return h('span', {
          style: {
            display: 'inline-block',
            width: 'auto',
            cursor: 'pointer',
            background: node.node.selected ? '#dae8e7' : '#fff' // 根据选中状态设置样式
          },
          domProps: {
            className: 'btn'
          },
          on: {
            click: () => {
              if (!node.node.selected) {
                this.$refs.tree.handleSelect(node.nodeKey)
              } // 手动选择树节点
            }
          }
        }, [
          h('span', [
            h('Icon', {
              props: {
                type: 'ios-paper',
                color: '#009999'
              },
              style: {
                marginRight: '8px'
              }
            }),
            h('span', data.title)
          ])
        ]
        )
      }
    },
    // 新增节点对应表单信息
    addForm () {
      if (this.treeData.length === 0) {
        return this.$Message.warning('暂无数据！')
      } else {
        if (this.nodeStatus === 1) {
          this.showAddFormModal = true
          this.addFormTitle = '新增虚拟电厂'
          this.showForm.showPower = true
        }
        if (this.nodeStatus === 2) {
          this.showAddFormModal = true
          this.addFormTitle = '新增业主'
          this.showForm.showUser = true
        }
        if (this.nodeStatus === 3) {
          this.showAddFormModal = true
          this.addFormTitle = '新增机组'
          this.showForm.showUnit = true
        }
        if (this.nodeStatus === 4) {
          this.showAddFormModal = true
          this.addFormTitle = '新增设备'
          this.showForm.showDevice = true
        }
      }
    },
    // 选择头部档案类型--加载对应表单
    changeNodeStatus (val) {
      if (val === 1) {
        this.addFormTitle = '新增虚拟电厂'
        this.showForm.showPower = true
        this.showForm.showUser = false
        this.showForm.showUnit = false
        this.showForm.showDevice = false
      }
      if (val === 2) {
        this.addFormTitle = '新增业主'
        this.showForm.showUser = true
        this.showForm.showPower = false
        this.showForm.showUnit = false
        this.showForm.showDevice = false
      }
      if (val === 3) {
        this.addFormTitle = '新增机组'
        this.showForm.showUnit = true
        this.showForm.showPower = false
        this.showForm.showUser = false
        this.showForm.showDevice = false
      }
      if (val === 4) {
        this.addFormTitle = '新增设备'
        this.showForm.showDevice = true
        this.showForm.showPower = false
        this.showForm.showUser = false
        this.showForm.showUnit = false
      }
    },
    closeModalFun (val) {
      if (val === false) {
        this.showAddFormModal = false
        this.showForm.showPower = false
        this.showForm.showUser = false
        this.showForm.showUnit = false
        this.showForm.showDevice = false
      }
    },
    areaChangeChoose (isChoose) {
      if (isChoose !== this.isChoose) {
        this.isChoose = isChoose
      }

      if (isChoose === 1) {
        this.areaData = this.areaUserData
      }
      if (isChoose === 0) {
        this.areaData = this.areaUnitData
      }
    },
    showTree () {
      this.showLeftTree = !this.showLeftTree
      this.defaultshowLeftTree = true
    },
    // 修改电厂信息
    modifyPowerPlantInfo (val) {
      axios.request({
        url: 'armac/virtualPowerPlantFileInformationModify',
        data: val,
        method: 'post'
      }).then(res => {
        if (res.data.code === 200) {
          this.loadPowerPlantData()
          this.loadTreeData()
          this.$Message.success('修改成功!')
        } else {
          this.$Message.warning('修改失败!')
        }
      })
    },
    // 修改业主信息
    modifyUserInfo (val) {
      axios.request({
        url: 'armac/userProfileInformationModify',
        data: val,
        method: 'post'
      }).then(res => {
        if (res.data.code === 200) {
          this.loadUserData()
          this.loadTreeData()
          this.$Message.success('修改成功!')
        } else {
          this.$Message.warning('修改失败!')
        }
      })
    },
    // 修改机组信息
    modifyUnitInfo (val) {
      axios.request({
        url: 'armac/UnitFileInformationModify',
        data: val,
        method: 'post'
      }).then(res => {
        if (res.data.code === 200) {
          this.loadUnitData()
          this.loadTreeData()
          this.$Message.success('修改成功!')
        } else {
          this.$Message.warning('修改失败!')
        }
      })
    },
    // 修改设备信息
    modifyDeviceInfo (val) {
      axios.request({
        url: 'armac/equipmentFileInformationModify',
        data: val,
        method: 'post'
      }).then(res => {
        if (res.data.code === 200) {
          this.loadDeviceData()
          this.loadTreeData()
          this.$Message.success('修改成功!')
        } else {
          this.$Message.warning('修改失败!')
        }
      })
    }
  },
  watch: {}
}
</script>

<style lang="less">
@import "archiveManage.less";
</style>
