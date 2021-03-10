<template>
  <div class="tgManagerRealte">
    <!--顶部搜索面板-->
    <div class="searchBar"
         :style="{height: searchBarFlag ? '100px' : '0',overflow: 'hidden'}">
      <Form ref="searchBarForm"
            :rules="ruleValidate"
            :model="searchBarForm"
            :label-width="100">
        <Row>
          <Col span="6">
            <FormItem label="供电单位"
                      prop="orgNo">
              <Poptip v-model="showOrgFlag"
                      trigger="click"
                      placement="bottom"
              >
                <Input search
                       enter-button
                       v-model="searchBarForm.orgName"
                       :placeholder="$t('please_input_org')"
                       style="width: 100%"/>
                <div slot="content"
                     style="max-height: 300px; overflow-y: auto">
                  <orgs :show-refresh-text="false"
                        @on-select="selectOrg"></orgs>
                </div>
              </Poptip>

            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="台区经理列表">
              <Select v-model="searchBarForm.managerNo" filterable clearable>
                <Option v-for="item in tmList" :value="item.managerNo" :key="item.managerNo">{{ item.managerName }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="台区经理账号">
              <Input v-model="searchBarForm.managerStaffNo" placeholder="请输入台区经理账号" clearable/>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="台区经理是否已绑定台区">
              <Select v-model="searchBarForm.managerIsTg" clearable>
                <Option v-for="item in tmAddTg" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="6">
            <FormItem label="台区编号">
              <Input v-model="searchBarForm.tgNo" placeholder="请输入台区编号" clearable/>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="台区名称">
              <Input v-model="searchBarForm.tgName" placeholder="请输入台区名称" clearable/>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="台区经理名称">
              <Input v-model="searchBarForm.managerName" placeholder="请输入台区经理名称" clearable/>
            </FormItem>
          </Col>
          <Col span="6">
          <FormItem>
            <Button type="primary"
                    class="margin-right-3"
                    @click="topPanelQuery('searchBarForm')">查询
            </Button>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </div>

    <div style="position:relative;">
      <div class="managerModaltableTitle">
        <span class="title">
          台区经理管辖台区列表
        </span>
        <span class="totalCount">
          共&nbsp;&nbsp;{{ totalCount }}&nbsp;&nbsp;条
        </span>
        <span class="setDatas" @click="setDatas">
          批量设置
        </span>
      </div>

      <Modal
        width="1200px"
        v-model="detailFlag"
        :title="'台区批量管辖'"
        class-name="vertical-center-modal"
        footer-hide>
        <div class="clearfix">
          <div class="header clearfix">
            <div class="managerSelect clearfix">
              <span class="managerLabel">台区经理：</span>
              <div class="managerSelectComp">
                <Select v-model="modalManagerNo" filterable @on-change="modalManagerChange">
                  <Option v-for="item in modalTmList" :value="item.managerNo" :key="item.managerNo">{{ item.managerName }}</Option>
                </Select>
              </div>
            </div>
            <div v-if="showManagerInfo" class="managerInfos">
              <span>
                台区经理基本信息：
              </span>
              <span style="padding: 0px 40px 0 15px">工号：{{ managerNo }}</span> |
              <span style="padding: 0px 50px 0 30px">部门：{{ managerDept }}</span> |
              <span style="padding: 0px 50px 0 30px">管辖台区数：{{ managerTgNums }}</span> |
              <span style="padding: 0px 50px 0 30px">角色：{{ managerActor }}</span>
            </div>

          </div>
          <div class="managerModalleftTable">
            <div>
              <div class="managerModaltableTitle">
                <span class="managerModaltitle">
                  供电单位下可供绑定台区经理的台区列表
                </span>
                <div class="noManagerTg">
                  模糊查找&nbsp;&nbsp;
                  <input
                    v-model="tgNoName"
                    class="noManagerTgInput"
                    placeholder="输入台区编号或名称模糊查询"
                  />
                  <Button type="primary" style="margin-left: 30px;" @click="leftTableQuery">查询</Button>
                </div>
              </div>

              <Col span="24">
                <Tables ref="leftTables"
                        border
                        :stripe=false
                        :columns="columnsLeft"
                        class="myLefttables"
                        :axiosUrl="leftInitialUrl"
                        :filename="'台区经理管辖台区维护'"
                        :axiosData="leftQueryItem"
                        :show-header="false"
                        @on-select="leftSelection"
                        @on-select-cancel="leftSelection"
                        @on-select-all="leftSelection"
                        @on-select-all-cancel="leftSelection"
                />
              </Col>
            </div>
          </div>
          <div class="centerButtons">
            <Button type="primary" :size="'large'" style="margin-left: 20%; margin-top: 150px;" @click="addToManager">添加&gt;&gt;</Button>
            <Button type="error" :size="'large'" style="margin-left: 20%; margin-top: 20px;" @click="removeToManager">&lt;&lt;移除</Button>
            <Button type="primary" :size="'large'" style="margin-left: 20%; margin-top: 20px;" @click="submitChange">[&nbsp;&nbsp;确定&nbsp;&nbsp;]</Button>

          </div>
          <div class="managerModalrightTable">
            <div>
              <div class="managerModaltableTitle">
                <span class="managerModaltitle">
                  台区经理以管辖台区列表
                </span>
                <span class="managerExistTg">
                  共{{ rightTableCount }}台区
                </span>
              </div>
              <Col span="24">
                <Tables ref="rightTables"
                        border
                        :stripe=false
                        :columns="columnsRight"
                        class="myRighttables"
                        :axiosUrl="rightInitialUrl"
                        :filename="'台区经理管辖台区维护'"
                        :axiosData="rightQueryItem"
                        @on-load-data-page-info="getRightTablePageInfo"
                        :show-header="false"
                        @on-select="rightSelection"
                        @on-select-cancel="rightSelection"
                        @on-select-all="rightSelection"
                        @on-select-all-cancel="rightSelection"
                />
              </Col>
            </div>
          </div>
        </div>

      </Modal>
      <div>
        <Col span="24">
          <Tables ref="tables"
                  border
                  :columns="columns"
                  class="mytables"
                  :axiosUrl="initialUrl"
                  :filename="'台区经理管辖台区维护'"
                  :axiosData="initialQueryItem"
                  stripe
                  :height="tableHeight"
                  @on-load-data-page-info="getTablePageInfo"
                  @on-select="getSelection"
                  @on-select-cancel="getCancelSelection"
                  @on-select-all="getAllSelection"
                  @on-select-all-cancel="getAllCancelSelection"
          />

        </Col>
      </div>

      <div class="buttonBox">
        <div class="buttonBoxDiv"
             @click="searchBarFlag=!searchBarFlag">
          <img class="buttonBoxImgSearch"
               src="../../../images/u48796.png"
               alt="搜索"/>
        </div>

        <div class="menu-bottom" style="margin-top: 80px;">
          <div class="buttonBoxDiv buttonBoxImgMenuBackground"
               @click="linkBoxFlag=!linkBoxFlag">
            <img class="buttonBoxImgMenu"
                 src="../../../images/u48802.png"
                 alt="菜单"/>
          </div>

          <div class="linkBox"
               v-show="linkBoxFlag">
            <router-link to="syntheticalAnalysis"
                         class="comprehensive"
                         tag="div">
              <div>
                <img src="../../../images/u48815.png"/>
              </div>
              综合分析
            </router-link>
            <router-link to="orgManagement"
                         class="org_Management  selected"
                         tag="div">
              <div>
                <img src="../../../images/u48824.png"/>
              </div>
              单位管控
            </router-link>
            <router-link to="managerAppraise"
                         class="manager_Appraise"
                         tag="div">
              <div>
                <img src="../../../images/u41495.png"/>
              </div>
              台区经理评价
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/libs/api.request'
import Tables from '_c/tables'
import Orgs from '_c/common-select-box/components/org/org.vue'
import Modals from '_c/modals'

export default {
  name: 'orgManagement',
  components: {
    Tables,
    Orgs,
    Modals,
    axios
  },
  props: {
    // 首次进入页面时初始化请求url地址
    initialUrl: {
      type: String,
      default () {
        return '/sea-lineLose/custManagerAssess/tgManagerRelate/index'
      }
    },
    // 初始化请求页面默认查询条件
    initialQueryItem: {
      type: Object,
      default () {
        return {
          'orgName': this.$store.state.auth.orgName,
          'orgNo': this.$store.state.auth.orgNo,
          'orgType': this.$store.state.auth.orgType
        }
      }
    }
  },
  data () {
    return {
      leftInitialUrl: '/sea-lineLose/custManagerAssess/tgManagerRelate/leftTable',
      rightInitialUrl: '/sea-lineLose/custManagerAssess/tgManagerRelate/rightTable',
      tgNoName: '',
      leftQueryItem: {
        orgNo: this.$store.state.auth.orgNo,
        orgType: this.$store.state.auth.orgType,
        leftTgIds: [],
        tgNoName: this.tgNoName
      },
      rightQueryItem: {
        orgType: this.initialQueryItem['orgType'],
        orgNo: this.initialQueryItem['orgNo'],
        managerNo: ''
      },
      tmAddTg: [
        {
          value: '1',
          label: '是'
        },
        {
          value: '2',
          label: '否'
        }
      ],
      modalManagerNo: '',
      modalTmList: [],
      tmList: [],
      tgManager: '',
      totalCount: 0,
      rightTableCount: 0,
      detailFlag: false,
      showManagerInfo: false,
      columnsLeft: [
        {
          title: '',
          key: 'select',
          minWidth: 20,
          align: 'center',
          type: 'selection'
        },
        {
          title: '台区编号',
          key: 'tgNo',
          minWidth: 130,
          align: 'center',
          sortable: true

        },
        {
          title: '台区名称',
          key: 'tgName',
          minWidth: 120,
          align: 'center',
          sortable: true
        }
      ],
      columnsRight: [
        {
          title: '',
          key: 'select',
          align: 'center',
          type: 'selection'
        },
        {
          title: '台区编号',
          key: 'tgNo',
          minWidth: 130,
          align: 'center',
          sortable: true

        },
        {
          title: '台区名称',
          key: 'tgName',
          minWidth: 120,
          align: 'center',
          sortable: true
        }
      ],
      columns: [
        {
          title: '',
          key: 'select',
          minWidth: 20,
          type: 'selection'
        },

        {
          title: '供电单位',
          key: 'orgName',
          minWidth: 120,
          sortable: true
        },
        {
          title: '台区经理账号',
          key: 'managerStaffNo',
          minWidth: 120,
          sortable: true
        },
        {
          title: '台区经理名称',
          key: 'managerName',
          minWidth: 120,
          sortable: true,
          render: (h, params) => {
            return h('div', [
              h('a', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {},
                on: {
                  click: () => {
                    this.setDatas(params.row.managerStaffNo)
                  }
                }
              }, params.row.managerName)
            ])
          }
        },
        {
          title: '台区经理是否已绑定台区',
          key: 'managerIsTg',
          minWidth: 150,
          sortable: true
        },
        {
          title: '台区编号',
          key: 'tgNo',
          minWidth: 130,
          sortable: true

        },
        {
          title: '台区名称',
          key: 'tgName',
          minWidth: 120,
          sortable: true
        },
        {
          title: '台区安装地址',
          key: 'tgInstAddress',
          minWidth: 120,
          sortable: true

        },
        {
          title: '台区所属单位',
          key: 'tgOrgName',
          minWidth: 120,
          sortable: true
        }
      ],
      linkBoxFlag: false,
      showOrgFlag: false,
      managerNo: '',
      managerDept: '',
      managerTgNums: '',
      managerActor: '',
      searchBarForm: {
        orgName: this.initialQueryItem['orgName'],
        orgNo: this.initialQueryItem['orgNo'],
        managerNo: '',
        managerIsTg: '',
        managerName: '',
        managerStaffNo: '',
        tgName: '',
        tgNo: '',
        orgType: this.initialQueryItem['orgType']
      },
      searchBarFlag: false,
      ruleValidate: {
        orgNo: [
          { required: true, message: '供电单位不能为空', trigger: 'blur' }
        ]
      },
      selectDatas: [],
      leftSelectionData: [],
      leftInsertData: [],
      rightSelectionData: [],
      rightInsertData: [],
      tableHeight: 600
    }
  },
  methods: {
    modalManagerChange (managerNo) {
      this.rightQueryItem.managerNo = managerNo || this.modalManagerNo
      if (managerNo) {
        axios.request({
          method: 'post',
          url: '/sea-lineLose/custManagerAssess/tgManagerRelate/modalManagerInfo',
          data: this.rightQueryItem
        }).then(res => {
          this.showManagerInfo = true
          this.managerNo = res.data.data.empNo
          this.managerTgNums = res.data.data.tgNums
        })
      } else {
        this.showManagerInfo = false
      }
      this.$refs['rightTables'].queryTableData()
    },
    leftTableQuery () {
      this.leftQueryItem.leftTgIds = []
      this.leftQueryItem.tgNoName = this.tgNoName
      this.$refs['leftTables'].queryTableData()
    },
    addToManager () {
      if (this.leftSelectionData.length > 0) {
        let rightTable = this.$refs['rightTables'].$refs['tablesMain']
        let leftTable = this.$refs['leftTables'].$refs['tablesMain']

        for (let i = 0; i < this.leftSelectionData.length; i++) {
          for (let j = 0; j < leftTable.data.length; j++) {
            if (this.leftSelectionData[i].orgNo !== leftTable.data[j].orgNo) {
              this.$Message.error('请选择与台区经理台区下相同供电单位的台区')
              return undefined
            }
          }
        }

        for (let i = 0; i < this.leftSelectionData.length; i++) {
          for (let j = 0; j < leftTable.data.length; j++) {
            if (this.leftSelectionData[i].tgNo === leftTable.data[j].tgNo) {
              leftTable.data.splice(j, 1)
            }
          }
          rightTable.data.push(this.leftSelectionData[i])
        }
        this.rightInsertData = this.$refs['rightTables'].$refs['tablesMain'].data
        this.rightTableCount = this.$refs['rightTables'].total + this.leftSelectionData.length
        this.$refs['leftTables'].total = this.$refs['leftTables'].total - this.leftSelectionData.length
        this.$refs['rightTables'].total = this.$refs['rightTables'].total + this.leftSelectionData.length
        this.leftSelectionData = []
      } else {
        this.$Message.error('请先勾选左侧数据！')
      }
    },
    removeToManager () {
      if (this.rightSelectionData.length > 0) {
        let leftTable = this.$refs['leftTables'].$refs['tablesMain']
        let rightTable = this.$refs['rightTables'].$refs['tablesMain']
        for (let i = 0; i < this.rightSelectionData.length; i++) {
          leftTable.data.push(this.rightSelectionData[i])
          rightTable.data.forEach((a, b, c) => {
            if (this.rightSelectionData[i].tgNo === a.tgNo) {
              rightTable.data.splice(b, 1)
            }
          })
        }
        this.leftInsertData = this.$refs['leftTables'].$refs['tablesMain'].data
        this.rightTableCount = this.$refs['rightTables'].total - this.rightSelectionData.length
        this.$refs['leftTables'].total = this.$refs['leftTables'].total + this.rightSelectionData.length
        this.$refs['rightTables'].total = this.$refs['rightTables'].total - this.rightSelectionData.length
        this.rightSelectionData = []
      } else {
        this.$Message.error('请先勾选右侧数据！')
      }
    },
    submitChange () {
      if (this.leftInsertData.length > 0) {
        axios.request({
          method: 'post',
          url: '/sea-lineLose/custManagerAssess/tgManagerRelate/removeFromTgManager',
          data: this.leftInsertData
        }).then(res => {
          if (res.data.data === true) {
            this.$Message.success('成功移除数据')
            this.$refs['leftTables'].queryTableData()
            this.rightQueryItem.managerNo = this.modalManagerNo
            this.$refs['rightTables'].queryTableData()
            axios.request({
              method: 'post',
              url: '/sea-lineLose/custManagerAssess/tgManagerRelate/modalManagerInfo',
              data: this.rightQueryItem
            }).then(res => {
              this.showManagerInfo = true
              this.managerNo = res.data.data.empNo
              this.managerTgNums = res.data.data.tgNums
            })
          }
        })
      } else {
        this.$Message.error('请先选择要移除的数据')
      }
      if (this.rightInsertData.length) {
        axios.request({
          method: 'post',
          url: '/sea-lineLose/custManagerAssess/tgManagerRelate/insertToTgManager',
          data: { 'tgs': this.rightInsertData, 'managerNo': this.modalManagerNo }
        }).then(res => {
          console.log(res.data)
          if (res.data.data === true) {
            this.$Message.success('成功增加数据')
            this.$refs['leftTables'].queryTableData()
            this.rightQueryItem.managerNo = this.modalManagerNo
            this.$refs['rightTables'].queryTableData()
            axios.request({
              method: 'post',
              url: '/sea-lineLose/custManagerAssess/tgManagerRelate/modalManagerInfo',
              data: this.rightQueryItem
            }).then(res => {
              this.showManagerInfo = true
              this.managerNo = res.data.data.empNo
              this.managerTgNums = res.data.data.tgNums
            })
          }
        })
      } else {
        this.$Message.error('请先选择要增加的数据')
      }
    },
    setDatas (managerNo) {
      let managerNos = []
      let openFlag = true
      let leftQueryTgIds = []
      for (let i = 0; i < this.selectDatas.length; i++) {
        let one = this.selectDatas[i]
        if (one.managerStaffNo && one.managerStaffNo != null) {
          if (managerNos.length === 0) {
            managerNos[0] = one.managerStaffNo
          } else {
            if (managerNos.indexOf(one.managerStaffNo) === -1) {
              openFlag = false
              break
            }
          }
        } else {
          leftQueryTgIds.push(one.tgId)
        }
      }
      if (openFlag) {
        this.detailFlag = true
        this.modalTmList = this.tmList
        this.leftQueryItem.leftTgIds = leftQueryTgIds.length > 0 ? leftQueryTgIds : []
        this.$refs['leftTables'].queryTableData()
        if (typeof managerNo === 'string') {
          this.rightQueryItem.managerNo = managerNo
          this.modalManagerNo = managerNo
          this.modalManagerChange(managerNo)
        } else {
          this.modalManagerNo = managerNos[0] ? managerNos[0] : ''
          if (managerNos[0]) {
            this.modalManagerChange(managerNos[0])
          }
          this.showManagerInfo = !!managerNos[0]
          this.rightQueryItem.managerNo = managerNos[0] ? managerNos[0] : ''
          this.$refs['rightTables'].queryTableData()
        }
        this.selectDatas = []
      } else {
        this.$Message.error('请不要同时勾选两个不同的台区经理下的台区')
      }
    },
    getTablePageInfo (currentPage, pageSize, pageTotalCount, totalPage) {
      this.totalCount = pageTotalCount
    },
    getRightTablePageInfo (currentPage, pageSize, pageTotalCount, totalPage) {
      this.rightTableCount = pageTotalCount
    },
    leftSelection (selection) {
      this.leftSelectionData = selection
    },
    rightSelection (selection) {
      this.rightSelectionData = selection
    },
    getSelection (selection, row) {
      console.log(row)
      this.selectDatas = selection
    },
    getCancelSelection (selection, row) {
      this.selectDatas = selection
    },
    getAllSelection (selection, row) {
      this.selectDatas = selection
    },
    getAllCancelSelection (selection, row) {
      this.selectDatas = selection
    },
    // 初始化页面function
    initOrgManagementPageQuery: function () {
      let data = {
        'orgNo': this.searchBarForm.orgNo,
        'orgType': this.searchBarForm.orgType
      }

      this.initialQueryItem['orgNo'] = this.searchBarForm.orgNo
      this.initialQueryItem['orgType'] = this.searchBarForm.orgType
      this.initialQueryItem['managerStaffNo'] = this.searchBarForm.managerStaffNo
      this.initialQueryItem['managerNo'] = this.searchBarForm.managerNo
      this.initialQueryItem['managerIsTg'] = this.searchBarForm.managerIsTg
      this.initialQueryItem['tgNo'] = this.searchBarForm.tgNo
      this.initialQueryItem['tgName'] = this.searchBarForm.tgName
      this.initialQueryItem['managerName'] = this.searchBarForm.managerName
      axios.request({
        method: 'post',
        url: '/sea-lineLose/custManagerAssess/tgManagerRelate/managerList',
        data: data
      }).then(res => {
        this.tmList = res.data.data
      })
      this.$refs['tables'].queryTableData()
      this.searchBarFlag = !this.searchBarFlag
    },
    topPanelQuery: function (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.initialQueryItem['orgNo'] = this.searchBarForm.orgNo
          this.initialQueryItem['orgType'] = this.searchBarForm.orgType
          this.initialQueryItem['managerStaffNo'] = this.searchBarForm.managerStaffNo
          this.initialQueryItem['managerNo'] = this.searchBarForm.managerNo
          this.initialQueryItem['managerIsTg'] = this.searchBarForm.managerIsTg
          this.initialQueryItem['tgNo'] = this.searchBarForm.tgNo
          this.initialQueryItem['tgName'] = this.searchBarForm.tgName
          this.initialQueryItem['managerName'] = this.searchBarForm.managerName
          this.initOrgManagementPageQuery()
        } else {
          this.$Message.error('请补充查询条件')
        }
      })
    },
    // 供电单位查询框框
    selectOrg (data) {
      this.searchBarForm.orgName = data.orgName
      this.searchBarForm.orgNo = data.orgNo
      this.searchBarForm.orgType = data.orgType
      this.showOrgFlag = false
    },
    changeHeight () {
      this.tableHeight = window.innerHeight > 800 ? window.innerHeight - 230 : 600
    }
  },
  mounted: function () {
    this.initOrgManagementPageQuery()
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

<style lang="less" scoped>
  @import "./main.less";
</style>
<style scoped>
.ivu-row{
  width: 1200px;
}
.managerModaltitle{
  color:  #448c86;
  font-size: 16px;
  font-weight:bold;
}
.managerModaltableTitle {
  padding: 12px;
  background-color: #fafafa;
  border: 1px solid #eaeaea;
  border-radius: 10px 10px 0 0;
}
.totalCount{
  color: #666666;
  font-size: 16px;
  font-weight: bold;
}
.setDatas{
  font-size: 16px;
  font-weight: bold;
  color:  #448c86;
  float: right;
  cursor: pointer;
}
.managerLabel{
  display: inline-block;
  float: left;
}
.managerSelect{
  float: left;
  margin: 10px 20px 10px 40px;
}
.managerSelectComp{
  float: left;
}
.clearfix::after{
  content: "";
  display: block;
  clear: both;
}
.managerInfos{
  float: left;
  border: 1px solid #eaeaea;
  border-radius: 20px;
  padding: 10px 20px 10px 40px;
}
.managerModalleftTable{
  float: left;
  width: 45%;
}
.centerButtons{
  float: left;
  width: 10%;
}
.managerModalrightTable{
  float: left;
  width: 45%;
}
.header{
  margin-bottom: 15px;
}
.noManagerTg{
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
}
.noManagerTgInput{
  border: 1px solid #cccccc;
  border-radius: 4px;
  padding-left: 7px;
}
</style>
