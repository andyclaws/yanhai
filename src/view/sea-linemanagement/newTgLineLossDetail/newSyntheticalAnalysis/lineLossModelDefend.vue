<template>
<div class="lineLossModelDefend" style="width: 1366px">
  <Card class="my-card">
    <p slot="title" class="headTitle">查询条件</p>
    <p slot="extra" @click="showQueryForm = !showQueryForm" style="cursor: pointer" class="fold">
      <Tooltip :content="showQueryForm ? '折叠' : '展开'">
        <Icon v-if="showQueryForm" :size="30" type="md-arrow-dropdown-circle"/>
        <Icon v-if="!showQueryForm" :size="30" type="md-arrow-dropup-circle"/>
      </Tooltip>
    </p>

    <div v-if="showQueryForm" style="margin-top: 7px">
      <Form :model="form" :label-width="100" :rules="ruleValidate" ref="formRef">
        <Row>
          <Col span="6">
            <FormItem :label="$t('org')" prop="orgNo">
              <Poptip trigger="click" placement="bottom" width="241" v-model="showOrgFlag" >
                <Input
                  search
                  enter-button
                  v-model="form.orgName"
                  :placeholder="$t('please_input_org')"
                  style="width: 241px"
                />
                <div slot="content" style="max-height: 500px; overflow-y: auto">
                  <orgs :show-refresh-text="false" @on-select="selectOrgs"></orgs>
                </div>
              </Poptip>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="台区编号:">
              <Input v-model="form.tgNo" placeholder="请输入台区编号" clearable></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="台区名称:">
              <Input v-model="form.tgName" placeholder="请输入台区名称" clearable></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="6">
            <FormItem label="责任人编号:">
              <Input v-model="form.responsiblePersonNo" placeholder="请输入责任人编号" clearable></Input>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="计算状态:" prop="calcStatus">
              <Select v-model="form.calcStatus" placeholder="请选择计算状态">
                <Option v-for="item in statusList" :value="item.code" :key="item.code">{{ item.name }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="已建线损模型:" prop="builtModel">
              <RadioGroup v-model="form.builtModel">
                <Radio label="是"></Radio>
                <Radio label="否"></Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="2">
            <FormItem>
              <Button type="primary" @click="query('formRef')">查询</Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </div>
  </Card>

  <Card>
    <p slot="title" class="headTitle">台区线损模型</p>
    <span v-if="cardMode" class="menu-right" slot="title" style="margin-bottom: 5px">
      <p class="cursor" @click="sortByShouldCollMeterCnt">应采表数<img src="../../images/u4111.png" width="6px" height="13px"></p>

      <p class="cursor" style="margin-left: 9px" @click="batchSetting">批量设置</p>
      <img src="../../images/u4115.png">
      <p class="cursor" @click="createLineLoseModel">生成线损模型</p>

      <img src="../../images/menu_table.png" title="卡片模式" @click="cardMode = true" width="18px" height="18px" class="cursor" style="margin-left: 9px">
      <img src="../../images/u4115.png">
      <img src="../../images/menu_list.png" title="表格模式" @click="cardMode = false" width="18px" height="18px" class="cursor">

      <p style="margin-left: 9px">数量：<span style="color: #e43e31">{{resTgListData.totalCount}}</span><span>&lt;{{resTgListData.currPage}}/{{resTgListData.totalPage}}&gt;</span></p>
    </span>

    <span v-if="!cardMode" class="menu-right-simple" slot="title" style="margin-bottom: 5px">
      <img src="../../images/menu_table.png" title="卡片模式" @click="cardMode = true" width="18px" height="18px" class="cursor" style="margin-left: 9px">
      <img src="../../images/u4115.png">
      <img src="../../images/menu_list.png" title="表格模式" @click="cardMode = false" width="18px" height="18px" class="cursor">
    </span>

    <div v-show="cardMode" style="overflow: scroll; overflow-x: hidden; width: 100%; height: 484px;">
      <Row>
        <CheckboxGroup v-model="selectedTgList">
          <div title="双击显示详情" v-for="(item, index) in resTgListData.list" :key="index" >
            <Col span="4" class="cardDiv">
              <Card class="cardhover">
                <div class="box">
                  <Checkbox :label="item.tgId"></Checkbox>
                </div>
                <div style="text-align: center; cursor: pointer; height: 250px;" @dblclick="getTgDetailTree(item)">
                  <p style="color: #009999">台区名称：{{item.tgName}}</p>
                  责任人：<span style="color: #e43e31">{{item.responsible}}</span><br>
                  供电单位: <span>{{item.orgName}}</span><br>
                  台区编号：<span>{{item.tgNo}}</span><br>
                  配变数：<span>{{item.distributionNo}}</span><br>
                  考核表数：<span>{{item.checkMetNo}}</span><br>
                  应采表数：<span style="color: #e43e31">{{item.shouldCollMetNo}}</span><br>
                  告警值：<span>{{item.warnValue}}</span><br>
                  计算状态：<span>{{showCalcStatus(item.calcStatus)}}</span><br>
                  已建线损模型：<span>{{item.isBuildModal}}</span>
                </div>
              </Card>
            </Col>
          </div>
        </CheckboxGroup>
      </Row>
    </div>

    <Row v-show="!cardMode">
      <Tables
        ref="tableModeRef"
        :columns="tableModeCols"
        :axiosUrl="url"
        :axiosData="form"
        :current="resTgListData.currPage"
        @on-load-data="getTableDataList"
        @on-load-data-page-info="getPageInfo"
      />
    </Row>
    <Row  v-if="cardMode" class="sameLine" style="margin-top: 20px; margin-bottom: 20px">
      <Col span="16" offset="3">
        <Page @on-change="changePage" :current.sync="resTgListData.currPage" :total="parseInt(resTgListData.totalCount)" :page-size="resTgListData.pageSize"
              size="small" prev-text="上一页" next-text="下一页" />
      </Col>
      <Col class="sameLine" span="2">
        <img src="../../images/u4115.png">
        <Dropdown style="float: right" @on-click="exportFile">
          <Button type="primary">
            {{$t('export.export')}}
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="exportCurrentCvs">{{$t('export.exportCurrentCvs')}}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Col>
    </Row>
  </Card>

  <Modal
    width="1000px"
    v-model="detailFlag"
    class-name="vertical-center-modal"
    footer-hide>
    <p slot="header" style="width: 55%;" class="title-left">
      <span>台区线损模型明细</span>
    </p>
    <p slot="header" style="width: 45%;">
      <span>{{rightTitle}}</span>
    </p>
    <div style="overflow: auto; height: 430.5px; background-color: white;">
      <div style=" float: left; width: 55%; height: 100%; padding-left: 15px; padding-top: 0px">
        <Form>
          <Row class="sameLine">
            <Col span="10">
              <FormItem label="快速定位" style="display: flex;">
                <Input style="width: 100%" v-model="keyWord" clearable></Input>
              </FormItem>
            </Col>
            <Col span="4">
              <img class="searchButton" @click="quickLocate(keyWord.trim())" src="../../images/u48796.png" alt="搜索" style="cursor: pointer;"></img>
            </Col>
          </Row>
        </Form>
        <div style="overflow: scroll;width: 100%; height: 388.5px;">
          <Tree :data="showTgDetailTree" @on-select-change="changeRightContent"></Tree>
        </div>
      </div>
      <div style=" float: right; width: 45%; height: 100%;">
        <div>
          <Table border :columns="cols" :show-header="false" :data="levelData"></Table>
        </div>
      </div>
    </div>
  </Modal>

  <Modal
    width="600px"
    v-model="settingsFlag"
    class-name="vertical-center-modal"
    title="批量设置"
    footer-hide>
    <div>
      <Form label-position="right" :label-width="200">
        <Row>
          <Col span="17">
            <FormItem label="是否告警">
              <Select v-model="settingsForm.isWarning" placeholder="请选择是否告警">
                <Option value="0" key="0">是</Option>
                <Option value="1" key="1">否</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="17">
            <FormItem label="告警限值(%)">
              <Input v-model="settingsForm.threshold" placeholder="请输入告警限值(%)" clearable></Input>
            </FormItem>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Button type="primary" @click="saveSettings">保存</Button>
          <Button type="primary" @click="settingsFlag = !settingsFlag" style="margin-left: 50px">关闭</Button>
        </Row>
      </Form>
    </div>
  </Modal>

</div>
</template>
<script>
import Modals from '_c/modals'
import axios from '@/libs/api.request'
import Orgs from '_c/common-select-box/components/org'
import { deepCopy } from '@/libs/util'
import Tables from '_c/tables'
export default {
  name: 'lineLossModelDefend',
  components: {
    Modals,
    axios,
    Orgs,
    deepCopy,
    Tables
  },
  data () {
    return {
      showOrgFlag: false,
      showTest: [],
      ruleValidate: {
        orgNo: [
          { required: true, message: '供电单位不能为空', trigger: 'blur' }
        ],
        calcStatus: [
          { required: true, message: '请选择计算状态', trigger: 'blur' }
        ],
        builtModel: [
          { required: true, message: '请选择是否已建线损模型', trigger: 'blur' }
        ]
      },

      currentPage: 1,
      form: {
        orgNo: this.$store.state.auth.orgNo,
        orgName: this.$store.state.auth.orgName,
        orgType: this.$store.state.auth.orgType,
        tgId: '',
        tgNo: '',
        tgName: '',
        responsiblePersonNo: '',
        calcStatus: '1',
        builtModel: '是',
        sortFlag: false
      },
      resTgListData: {
        list: [],
        currPage: 1,
        pageSize: 25,
        totalCount: 0,
        totalPage: 0
      },

      selectedTgList: [],

      tgDetailTree: [],
      showTgDetailTree: [],

      statusList: [ // code必须从零开始逐一递增
        { code: '0', name: '未采集' },
        { code: '1', name: '可计算' },
        { code: '2', name: '空台区' },
        { code: '3', name: '不合理' },
        { code: '4', name: '不可计算' }
      ],
      showQueryForm: true,
      url: 'sea-lineLose/lineLoseModel/tgLineLoseDetail',
      settingsFlag: false,
      settingsForm: {
        isWarning: '0',
        threshold: null
      },
      selectedLevel: 0,
      rightTitle: '配变信息',
      levelData: [],
      cols: [
        {
          key: 'name',
          render: (h, params) => {
            return h('span',
              { style: { color: '#009999', fontWeight: 'bold' } },
              params.row.name)
          }
        },
        {
          key: 'value'
        }
      ],
      level0Data: [
        {
          name: '变压器名称',
          value: null
        },
        {
          name: '变压器资产号',
          value: null
        },
        {
          name: '变压器地址',
          value: null
        },
        {
          name: '变压器容量',
          value: null
        }
      ],
      level1Data: [
        {
          name: '计量点编号',
          value: null
        },
        {
          name: '计量点性质',
          value: null
        },
        {
          name: '计量点名称',
          value: null
        },
        {
          name: '计量点地址',
          value: null
        }
      ],
      level2Data: [
        {
          name: '用户编号',
          value: null
        },
        {
          name: '用户名称',
          value: null
        },
        {
          name: '电表资产号',
          value: null
        },
        {
          name: '综合倍率',
          value: null
        },
        {
          name: '用电地址',
          value: null
        },
        {
          name: '前一日冻结示值',
          value: null
        },
        {
          name: '前二日冻结示值',
          value: null
        },
        {
          name: '前三日冻结示值',
          value: null
        }
      ],

      detailFlag: false,
      keyWord: '',

      cardMode: true,
      tableModeCols: [
        {
          title: '供电单位',
          key: 'orgName',
          width: 120
        },
        {
          title: '责任人',
          key: 'responsible',
          width: 120
        },
        /* {
          title: '考核单元编号',
          key: 'chkunitNo',
          width: 120
        }, */
        {
          title: '台区名称',
          key: 'tgName',
          width: 120
        },
        {
          title: '台区编号',
          key: 'tgId',
          width: 120
        },
        {
          title: '配变数',
          key: 'distributionNo',
          width: 120
        },
        {
          title: '考核表数',
          key: 'checkMetNo',
          width: 120
        },
        {
          title: '应采表数',
          key: 'shouldCollMetNo',
          width: 120
        },
        {
          title: '告警值',
          key: 'warnValue',
          width: 120
        },
        {
          title: '计算状态',
          key: 'calcStatus',
          width: 120,
          render: (h, params) => h('span', {}, this.showCalcStatus(params.row.calcStatus))
        },
        {
          title: '已建考核单元',
          key: 'builtModel',
          width: 120,
          render: (h, params) => h('span', {}, params.row.isBuildModal)
        }
      ]
    }
  },
  methods: {
    getSinglePageList (pageNo) {
      this.$refs['tableModeRef'].queryTableData(pageNo)
    },
    // 从表格中获取数据集合，赋值给resTgListData
    getTableDataList (tableDataList) {
      this.resTgListData.list = tableDataList
      for (let i = 0; i < this.resTgListData.list.length; i++) {
        axios.request({
          method: 'post',
          data: { tgId: this.resTgListData.list[i].tgId },
          url: 'sea-lineLose/lineLoseModel/showTranCnt'
        }).then(res => {
          this.resTgListData.list[i].distributionNo = res.data.data.cnt
        })
        axios.request({
          method: 'post',
          data: { tgId: this.resTgListData.list[i].tgId },
          url: 'sea-lineLose/lineLoseModel/showChkMeterCnt'
        }).then(res => {
          this.resTgListData.list[i].checkMetNo = res.data.data.cnt
        })
        axios.request({
          method: 'post',
          data: { tgId: this.resTgListData.list[i].tgId },
          url: 'sea-lineLose/lineLoseModel/showShouldCollMeterCnt'
        }).then(res => {
          this.resTgListData.list[i].shouldCollMetNo = res.data.data.cnt
        })
      }
    },
    getPageInfo (currentPage, pageSize, pageTotalCount, totalPage) {
      this.resTgListData.currPage = currentPage
      this.resTgListData.totalCount = pageTotalCount
      this.resTgListData.pageSize = pageSize
      this.resTgListData.totalPage = totalPage
    },
    changePage (pageNo) {
      this.getSinglePageList(pageNo)
    },
    selectOrgs (data) {
      this.form.orgNo = data.orgNo
      this.form.orgName = data.orgName
      this.form.orgType = data.orgType
      this.showOrgFlag = false
    },
    exportFile () {
      this.$refs['tableModeRef'].exportCsv({})
    },

    batchSetting () {
      if (this.selectedTgList.length > 0) {
        this.settingsFlag = !this.settingsFlag
      } else {
        this.$Message.error('请先选择要操作的台区')
      }
    },
    saveSettings () {
      let settingsData = {
        tgIds: this.selectedTgList,
        isAlarm: this.settingsForm.isWarning,
        alarmValue: this.settingsForm.threshold
      }
      console.log(settingsData)
      axios.request({
        method: 'post',
        data: settingsData,
        url: 'sea-lineLose/lineLoseModel/batchSetting'
      }).then(res => {
        let tempData = res.data.data
        this.settingsFlag = !this.settingsFlag
        if (tempData) {
          this.$Message.info('保存成功')
        } else {
          this.$Message.error('保存失败')
        }
      })
    },

    createLineLoseModel () {
      if (this.selectedTgList.length > 0) {
        axios.request({
          method: 'post',
          data: { tgIds: this.selectedTgList },
          url: 'sea-lineLose/lineLoseModel/createLineLoseModel'
        }).then(res => {
          let tempData = res.data.data
          this.selectedTgList = []
          if (tempData) {
            this.$Message.info('生成线损模型成功')
          } else {
            this.$Message.error('生成线损模型失败')
          }
        })
      } else {
        this.$Message.error('请先选择要操作的台区')
      }
    },

    sortByShouldCollMeterCnt () {
      this.form.sortFlag = !this.form.sortFlag
      this.form.pageNo = 1
      if (this.form.sortFlag === true) {
        this.$Message.info('按应采表数排序')
      } else {
        this.$Message.info('默认排序')
      }
      this.getSinglePageList()
    },

    getTgDetailTree (item) {
      this.selectedLevel = 0
      this.rightTitle = '配变信息'
      this.levelData = this.level0Data
      axios.request({
        method: 'post',
        data: { 'tgId': item.tgId },
        url: 'sea-lineLose/lineLoseModel/tgDetailTree'
      }).then(res => {
        let tempData = res.data.data
        this.showTgDetailTree = [
          {
            title: tempData[0].tgName + '[终端地址：' + tempData[0].tmnlAddr +
              '|终端资产号：' + tempData[0].tmnlAssetNo + ']',
            expand: true,
            level: 0,
            tmnlAddr: tempData[0].tmnlAddr,
            children: []
          }
        ]
        for (let i = 0; i < tempData.length; i++) {
          let oneData = tempData[i]
          let children = {
            title: oneData.mpName + '[计量点编号：' + oneData.mpNo + ']',
            mpNo: oneData.mpNo,
            expand: true,
            level: 1,
            children: [
              {
                title: oneData.consName + '[用户编号：' + oneData.consNo +
                  '|电表资产号：' + oneData.assetNo + ']',
                meterId: oneData.meterId,
                level: 2
              }
            ]
          }
          this.showTgDetailTree[0].children.push(children)
          this.tgDetailTree = this.showTgDetailTree
        }
        this.getTransformerInfo(tempData[0].tmnlAddr)
        this.detailFlag = !this.detailFlag
      })
    },

    getTransformerInfo (transformerAssetNo) {
      axios.request({
        method: 'post',
        data: { 'tmnlAddr': transformerAssetNo },
        url: 'sea-lineLose/lineLoseModel/transformerInfo'
      }).then(res => {
        let tempData = res.data.data
        this.level0Data[0].value = tempData.transformerName
        this.level0Data[1].value = tempData.transformerAssetNo
        this.level0Data[2].value = tempData.transformerAddr
        this.level0Data[3].value = tempData.transformerCap
      })
    },

    changeRightContent (selectedNode) {
      console.log(selectedNode)
      this.selectedLevel = selectedNode[0].level
      switch (this.selectedLevel) {
        case 0: { this.rightTitle = '配变信息'
          this.levelData = this.level0Data
          this.getTransformerInfo(selectedNode[0].tmnlAddr)
          break }
        case 1: { this.rightTitle = '计量点信息'
          this.levelData = this.level1Data
          this.getCmpInfo(selectedNode[0].mpNo)
          break }
        case 2: { this.rightTitle = '电能表信息'
          this.levelData = this.level2Data
          this.getMeterInfo(selectedNode[0].meterId)
          break }
      }
    },

    getCmpInfo (mpNo) {
      axios.request({
        method: 'post',
        data: { 'mpNo': mpNo },
        url: 'sea-lineLose/lineLoseModel/cmpInfo'
      }).then(res => {
        let tempData = res.data.data
        this.level1Data[0].value = tempData.mpNo
        this.level1Data[1].value = tempData.mpAttrName
        this.level1Data[2].value = tempData.mpName
        this.level1Data[3].value = tempData.mpAddr
      })
    },

    getMeterInfo (meterId) {
      axios.request({
        method: 'post',
        data: { 'meterId': meterId },
        url: 'sea-lineLose/lineLoseModel/meterInfo'
      }).then(res => {
        let tempData = res.data.data
        this.level2Data[0].value = tempData.consNo
        this.level2Data[1].value = tempData.consName
        this.level2Data[2].value = tempData.metAssetNo
        this.level2Data[3].value = tempData.tfactor
        this.level2Data[4].value = tempData.commAddr
        this.level2Data[5].value = tempData.oneDayBeforeRead
        this.level2Data[6].value = tempData.twoDayBeforeRead
        this.level2Data[7].value = tempData.threeDayBeforeRead
      })
    },

    quickLocate (keyWord) {
      let tempData = deepCopy(this.tgDetailTree)
      for (let i = 0; i < tempData.length; i++) {
        let tran = tempData[i]
        for (let j = 0; j < tran.children.length; j++) {
          let mp = tran.children[j]
          for (let k = 0; k < mp.children.length; k++) {
            let meter = mp.children[k]
            if (!meter.title.includes(keyWord)) {
              mp.children.splice(k, 1)
              k--
            }
          }
          if (mp.children.length <= 0 && !mp.title.includes(keyWord)) {
            tran.children.splice(j, 1)
            j--
          }
        }
        if (tran.children.length <= 0 && !tran.title.includes(keyWord)) {
          tempData.splice(i, 1)
          i--
        }
      }
      this.showTgDetailTree = tempData
    },

    query: function (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.form.sortFlag = false
          this.getSinglePageList()
          this.cardMode = true
        } else {
          this.$Message.error('请补充查询条件')
        }
      })
    },

    showCalcStatus (code) {
      return this.statusList[code].name
    },
    showBuiltModel (code) {
      console.log(code)
      return (code === '0' ? '是' : '否')
    }
  },
  mounted () {
    this.getSinglePageList()
  },
  watch: {
    settingsFlag (newValue) {
      if (!newValue) {
        this.selectedTgList = []
      }
    }
    /* showTgDetailTree () {
      this.rightTitle = '配变信息'
      this.showTgDetailTree[0].selected = true
      this.levelData = this.level0Data
      this.getTransformerInfo(this.showTgDetailTree[0].tmnlAssetNo)
    } */
  }
}
</script>
<style lang="less">
@import "./lineLossModelDefend.less";
.demo-split{
  height: 200px;
  border: 1px solid #dcdee2;
}
.demo-split-pane{
  padding: 10px;
}
</style>
