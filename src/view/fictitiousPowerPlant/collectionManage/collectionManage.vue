<template>
  <div class="collection-contanier">
    <div class="header">
      <p>
        <img src="./images/u2269.png" alt />
      </p>
      <p>
        <span :class="isChoose===0 ? 'add-border' : ''" @click="switchChoose(0)">终端参数设置</span>
        <span> | </span>
        <span :class="isChoose===1 ? 'add-border' : ''" @click="switchChoose(1)">数据召测</span>
      </p>
    </div>
    <div class="paramsBox" v-if="isChoose===0">
      <div class="leftBox">
        <div class="paramContent">
          <p>终端列表</p>
          <div class="searchBox">
            <Form ref="formValidate" :model="searchItem" :label-width="90">
              <row>
                <i-col span="7">
                  <FormItem label="终端名称:">
                    <Input v-model="searchItem.terminalName" style="width:100px">></Input>
                  </FormItem>
                </i-col>
                <i-col span="6">
                  <FormItem label="终端名称:">
                    <Select v-model="searchItem.terminalType" style="width:100px">
                      <Option v-for="item in searchItem.terminalTypeOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </FormItem>
                </i-col>
                <i-col span="5">
                  <FormItem label="规约:">
                    <Select v-model="searchItem.statute" style="width:100px">
                      <Option v-for="item in searchItem.StatuteOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </FormItem>
                </i-col>
                <i-col span="4">
                  <FormItem>
                    <div class="primary-btn" @click="topPanelQuery">查询</div>
                  </FormItem>
                </i-col>
              </row>
            </Form>
          </div>
          <div class="tableBox">
            <Tables
              border
              stripe
              :height="tableHeight"
              ref="terminalTable"
              :row-class-name="rowClassName"
              :columns="terminalListTable.terminalColumns"
              :axiosUrl="terminalListTable.axiosUrl"
              v-model="terminalAjaxData"
              :loading="loading"
              @on-load-data="onProtectLoadData"
              @on-load-data-page-info="onProtectLoadDataPageInfo"
              @on-selection-change="handleselectChecked"
              highlight-row
            ></Tables>
          </div>
        </div>
      </div>
      <div class="rightBox">
        <div class="paramContent">
          <p>终端参数设置</p>
          <div class="tableBox">
            <Table
              border
              stripe
              :columns="terminalParamTable.terminalParamColumns"
              :data="terminalParamTable.terminalParamData"
              width="100%"
            ></Table>
          </div>
          <div class="butn">
            <row>
              <i-col span="13">
                <div class="lowerHair-btn">下发</div>
              </i-col>
              <i-col span="6">
                <div class="callmeasure-btn">召测</div>
              </i-col>
            </row>
          </div>
        </div>
      </div>
    </div>
    <div class="callUpDataBox" v-if="isChoose===1">
      <div class="leftBox">
        <div class="paramContent1">
          <p>召测数据选择</p>
          <div class="search-div">
            <div>
              <span>选择终端 </span>
              <Select v-model="terminalType" style="width:120px">
                <Option v-for="item in terminalTypeOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <div class="button" @click="terminalSearchClick">终端...</div>
          </div>
          <div class="searchInfo">
            <p>终端地址：<span>地址d5sf98484</span></p>
            <p>规约类型：<span>A</span></p>
            <p>所属用户名称：<span>toop</span></p>
          </div>
          <div class="calltimes">
            <div>
              <span>召测时间范围 </span>
              <DatePicker type="datetime"  style="width: 120px"></DatePicker> ~
              <DatePicker type="datetime"  style="width: 120px"></DatePicker>
            </div>
            <div class="butn callup">召测</div>
            <div class="butn cancel">取消</div>
          </div>
        </div>
        <div class="paramContent2">
          <p>召测数据结果</p>
          <div class="resultLeft">
            <p>召测状态：<span>正在召测中...</span></p>
            <p>通信成功率：<span>89%</span></p>
            <p @click="lookOverMessage">查看原始报文</p>
          </div>
          <div class="resultRight">
            <div class="search-box">
              <Form ref="formValidate" :model="searchItem" :label-width="70">
                <row>
                  <i-col span="9">
                    <FormItem label="召测项:">
                      <Input v-model="searchItem.terminalName" style="width:80px"></Input>
                    </FormItem>
                  </i-col>
                  <i-col span="6">
                    <FormItem label="是否成功:">
                      <Select v-model="isSuccessValue" style="width:80px">
                        <Option v-for="item in isSuccessOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
                      </Select>
                    </FormItem>
                  </i-col>
                  <i-col span="6">
                    <FormItem>
                      <div class="primary-btn">查询</div>
                    </FormItem>
                  </i-col>
                </row>
              </Form>
            </div>
            <div class="table-box">
              <Table
                border
                stripe
                :columns="callUpResultTable.callUpResultColumns"
                :data="callUpResultTable.callUpResultColumnsData"
                width="100%"
                height="110"
              ></Table>
            </div>
          </div>
        </div>
      </div>
      <div class="rightBox">
        <div class="paramContent">
          <p>召测数据项</p>
          <div class="filter-tree-box">
            <span>筛选查找 </span>
            <Input v-model="filterValue" placeholder="请输入关键字进行过滤" style="width:150px"></Input>
          </div>
          <div class="treeBox">
            <Tree :data="treeDataItem" :render="renderContent" show-checkbox></Tree>
          </div>
        </div>
      </div>
    </div>
    <!--终端查询弹窗-->
    <Modal
    class="termnalSearch-modal"
    width="900"
    draggable
    :zIndex="1001"
    :value="showTerminalSearch"
    footer-hide
    closable
    @on-visible-change="closeTerminalModal($event)"
    title="终端查询">
    <div class="modal_searchBox">
      <Form ref="formValidate" :model="modalSearchItem" :label-width="120">
        <row>
          <i-col span="6">
            <FormItem label="终端名称:">
              <Input v-model="modalSearchItem.terminalName" style="width:150px">></Input>
            </FormItem>
          </i-col>
          <i-col span="6">
            <FormItem label="终端名称:">
              <Select v-model="modalSearchItem.terminalType" style="width:150px">
                <Option v-for="item in modalSearchItem.terminalTypeOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="6">
            <FormItem label="规约:">
              <Select v-model="modalSearchItem.statute" style="width:150px">
                <Option v-for="item in modalSearchItem.statuteOptions" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="6">
            <FormItem>
              <div class="primary-btn1" @click="modalPanelQuery">查询</div>
            </FormItem>
          </i-col>
        </row>
      </Form>
    </div>
    <div class="modal_tableBox">
      <Tables
        border
        stripe
        height="300"
        ref="modalTerminalTable"
        :columns="modalTerminalTable.terminalColumns"
        :axiosUrl="modalTerminalTable.axiosUrl"
        v-model="modalTerminalData"
        :loading="loading"
        @on-load-data="modalLoadData"
        @on-load-data-page-info="modalLoadDataPageInfo"
        highlight-row
      ></Tables>
    </div>
    <div class="modalConfirm-btn">
      <div>确认</div>
    </div>
  </Modal>
    <!--原始报文-->
    <Modal
      class="originalMessage-modal"
      width="900"
      draggable
      :zIndex="1001"
      :value="showOriginalMessage"
      footer-hide
      closable
      @on-visible-change="closeOriginalMessageModal($event)"
      title="原始报文">
      <div class="info">
        <p>终端名：<span>{{modalMessageSearchItem.terminalName}}</span></p>
        <p>规约类型：<span>{{modalMessageSearchItem.statuteType}}</span></p>
        <p>
          收发状态
          <Select v-model="modalMessageSearchItem.transceiverStatusValue" style="width:100px">
            <Option v-for="item in modalMessageSearchItem.transceiverStatusOption" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select></p>
      </div>
      <div class="timerange">
        <div>
          <span>时间范围 </span>
          <DatePicker type="datetime" format="yyyy-MM-dd HH:ss:mm" style="width: 170px" @on-change="startTimeChange"></DatePicker> ~
          <DatePicker type="datetime" format="yyyy-MM-dd HH:ss:mm" style="width: 170px" @on-change="endTimeChange"></DatePicker>
        </div>
        <div class="search-btn" @click="messagePanelQuery">查询</div>
      </div>
      <div class="message-table">
        <Tables
          border
          stripe
          height="300"
          ref="originalMessageTable"
          :columns="originalMessageTable.originalMessageColumns"
          :axiosUrl="originalMessageTable.axiosUrl"
          v-model="originalMessageData"
          :loading="loading"
          @on-load-data="modalOriginalMessageData"
          @on-load-data-page-info="modalOriginalMessageInfo"
          highlight-row
        ></Tables>
      </div>
      <div class="modalConfirm-btn">
        <div>确认</div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Tables from '_c/tables'
export default {
  name: 'collectionManage',
  components: {
    Tables
  },
  data () {
    return {
      isChoose: 0,
      loading: false,
      current: 1,
      pageSize: 25,
      total: 0,
      searchItem: {
        terminalName: '',
        terminalTypeOptions: [
          {
            value: '楼宇控制类',
            label: '楼宇控制类'
          },
          {
            value: 'B类',
            label: 'B类'
          },
          {
            value: 'C类',
            label: 'C类'
          }
        ],
        terminalType: '',
        StatuteOptions: [
          {
            value: 'A',
            label: 'A'
          },
          {
            value: 'B',
            label: 'B'
          },
          {
            value: 'C',
            label: 'C'
          }
        ],
        statute: ''
      },
      terminalListTable: {
        terminalColumns: [
          {
            width: '50',
            align: 'center',
            type: 'selection'
          },
          {
            title: '序号',
            key: 'tableNo',
            width: '90',
            align: 'center',
            sortable: true
          },
          {
            title: '终端名',
            key: 'terminalName',
            width: '120',
            align: 'center'
          },
          {
            title: '终端编号',
            key: 'terminalNo',
            width: '120',
            align: 'center'
          },
          {
            title: '终端类型',
            key: 'terminalType',
            width: '120',
            align: 'center'
          },
          {
            title: '规约',
            key: 'statute',
            width: '80',
            align: 'center'
          },
          {
            title: '状态',
            key: 'status',
            width: '120',
            align: 'center'
          },
          {
            title: '上次通信时间',
            key: 'communicateTimes',
            width: '120',
            align: 'center'
          }
        ],
        // TODO AJAX URL
        axiosUrl: 'sea-antiTheftElectricity/antiTheftTgDetail/tgTmnl'
      },
      terminalAjaxData: [
        {
          tableNo: '1',
          terminalName: 'G1665Fmk',
          terminalNo: 'nrNR5156',
          terminalType: '楼宇控制器',
          statute: 'A',
          status: '正常',
          communicateTimes: '2019/08/12'
        },
        {
          tableNo: '2',
          terminalName: 'G1665Fmk',
          terminalNo: 'nrNR5156',
          terminalType: 'A类',
          statute: 'C',
          status: '正常',
          communicateTimes: '2019/08/12'
        },
        {
          tableNo: '3',
          terminalName: 'G1665Fmk',
          terminalNo: 'nrNR5156',
          terminalType: 'B类',
          statute: 'A',
          status: '失联',
          communicateTimes: '2019/08/12'
        },
        {
          tableNo: '4',
          terminalName: 'G1665Fmk',
          terminalNo: 'nrNR5156',
          terminalType: '楼宇控制器',
          statute: 'B',
          status: '正常',
          communicateTimes: '2019/08/12'
        }
      ],
      terminalAjaxDataObj: {},
      tableHeight: '290',
      terminalParamTable: {
        terminalParamColumns: [
          {
            title: '参数项',
            key: 'parameterTerm',
            width: '100px',
            align: 'center',
            className: 'first-row-column-date'
          },
          {
            title: '平台历史值',
            key: 'platformHistoryValue',
            width: '110',
            align: 'center'
          },
          {
            title: '平台值',
            key: 'platformValue',
            width: '90',
            align: 'center',
            render: (h, params) => {
              if (params.row.$isEdit) {
                return h('Input', {
                  props: {
                    type: 'text',
                    value: params.row.platformValue
                  },
                  on: {
                    'on-blur': event => {
                      params.row.platformValue = event.target.value
                      this.terminalParamTable.terminalParamData[params.index].platformValue = event.target.value
                      this.$set(params.row, '$isEdit', false)
                    }
                  }
                })
              } else {
                return h('div', {
                  on: {
                    click: () => {
                      this.$set(params.row, '$isEdit', true)
                    }
                  }
                }, params.row.platformValue)
              }
            }
          },
          {
            title: '终端值',
            key: 'terminalValue',
            width: '90',
            align: 'center',
            render: (h, params) => {
              if (params.row.terminalValue !== params.row.platformValue) {
                return h(
                  'span',
                  {
                    style: {
                      color: '#ec1c24'
                    }
                  },
                  params.row.terminalValue
                )
              } else {
                return h(
                  'span',
                  params.row.terminalValue
                )
              }
            }
          }
        ],
        terminalParamData: [
          {
            parameterTerm: '终端参数1',
            platformHistoryValue: 55,
            platformValue: 42,
            terminalValue: 48
          },
          {
            parameterTerm: '终端参数2',
            platformHistoryValue: 68,
            platformValue: 45,
            terminalValue: 45
          },
          {
            parameterTerm: '终端参数2',
            platformHistoryValue: 97,
            platformValue: 36,
            terminalValue: 34
          }
        ]
      },
      checkedIndexArr: [],
      // 数据召测
      terminalTypeOption: [
        {
          value: '终端01',
          label: '终端01'
        },
        {
          value: '终端02',
          label: '终端02'
        },
        {
          value: '终端03',
          label: '终端03'
        }
      ],
      terminalType: '',
      isSuccessOption: [
        {
          value: '是',
          label: '是'
        },
        {
          value: '否',
          label: '否'
        },
        {
          value: '全部',
          label: '全部'
        }
      ],
      isSuccessValue: '',
      callUpResultTable: {
        callUpResultColumns: [
          {
            title: '序号',
            key: 'tableNo',
            width: '70',
            align: 'center'
          },
          {
            title: '召测项',
            key: 'callItem',
            width: '80px',
            align: 'center',
            className: 'first-row-column-date'
          },
          {
            title: '召测值',
            key: 'callValue',
            width: '80',
            align: 'center'
          },
          {
            title: '是否成功',
            key: 'isSuccess',
            width: '90',
            align: 'center'
          },
          {
            title: '时间',
            key: 'time',
            width: '90',
            align: 'center'
          }
        ],
        callUpResultColumnsData: [
          {
            tableNo: '1',
            callItem: '----',
            callValue: 56464,
            isSuccess: '是',
            time: '2019/09/09'
          },
          {
            tableNo: '2',
            callItem: '----',
            callValue: 56464,
            isSuccess: '是',
            time: '2019/09/09'
          },
          {
            tableNo: '3',
            callItem: '----',
            callValue: 56464,
            isSuccess: '是',
            time: '2019/09/09'
          },
          {
            tableNo: '4',
            callItem: '----',
            callValue: 56464,
            isSuccess: '是',
            time: '2019/09/09'
          },
          {
            tableNo: '5',
            callItem: '----',
            callValue: 56464,
            isSuccess: '是',
            time: '2019/09/09'
          }
        ]
      },
      showTerminalSearch: false,
      modalSearchItem: {
        terminalName: '',
        terminalTypeOptions: [
          {
            value: '楼宇控制类',
            label: '楼宇控制类'
          },
          {
            value: 'B类',
            label: 'B类'
          },
          {
            value: 'C类',
            label: 'C类'
          }
        ],
        terminalType: '',
        statuteOptions: [
          {
            value: 'A',
            label: 'A'
          },
          {
            value: 'B',
            label: 'B'
          },
          {
            value: 'C',
            label: 'C'
          }
        ],
        statute: ''
      },
      modalTerminalTable: {
        terminalColumns: [
          {
            width: '50',
            align: 'center',
            type: 'selection'
          },
          {
            title: '序号',
            key: 'tableNo',
            width: '100',
            align: 'center',
            sortable: true
          },
          {
            title: '终端名',
            key: 'terminalName',
            align: 'center'
          },
          {
            title: '终端编号',
            key: 'terminalNo',
            align: 'center'
          },
          {
            title: '终端类型',
            key: 'terminalType',
            align: 'center'
          },
          {
            title: '规约',
            key: 'statute',
            align: 'center'
          },
          {
            title: '状态',
            key: 'status',
            align: 'center'
          },
          {
            title: '上次通信时间',
            key: 'communicateTimes',
            align: 'center'
          }
        ],
        // TODO AJAX URL
        axiosUrl: 'sea-antiTheftElectricity/antiTheftTgDetail/tgTmnl'
      },
      modalTerminalData: [
        {
          tableNo: '1',
          terminalName: 'G1665Fmk',
          terminalNo: 'nrNR5156',
          terminalType: '楼宇控制器',
          statute: 'A',
          status: '正常',
          communicateTimes: '2019/08/12'
        },
        {
          tableNo: '2',
          terminalName: 'G1665Fmk',
          terminalNo: 'nrNR5156',
          terminalType: 'A类',
          statute: 'C',
          status: '正常',
          communicateTimes: '2019/08/12'
        },
        {
          tableNo: '3',
          terminalName: 'G1665Fmk',
          terminalNo: 'nrNR5156',
          terminalType: 'B类',
          statute: 'A',
          status: '失联',
          communicateTimes: '2019/08/12'
        },
        {
          tableNo: '4',
          terminalName: 'G1665Fmk',
          terminalNo: 'nrNR5156',
          terminalType: '楼宇控制器',
          statute: 'B',
          status: '正常',
          communicateTimes: '2019/08/12'
        }
      ],
      modalTerminalDataObj: {},
      showOriginalMessage: false,
      modalMessageSearchItem: {
        terminalName: 'DfGe342',
        statuteType: '规约1',
        startTime: '',
        endTime: '',
        transceiverStatusOption: [
          {
            value: '收',
            label: '收'
          },
          {
            value: '发',
            label: '发'
          }
        ],
        transceiverStatusValue: ''
      },
      originalMessageTable: {
        originalMessageColumns: [
          {
            width: '50',
            align: 'center',
            type: 'selection'
          },
          {
            title: '序号',
            key: 'tableNo',
            width: '100',
            align: 'center',
            sortable: true
          },
          {
            title: '收发状态',
            width: '100',
            key: 'transceiverStatus',
            align: 'center'
          },
          {
            title: '时间',
            width: '100',
            key: 'time',
            align: 'center'
          },
          {
            title: '报文内容',
            width: '150',
            key: 'messageContent',
            align: 'center'
          }
        ],
        // TODO AJAX URL
        axiosUrl: 'sea-antiTheftElectricity/antiTheftTgDetail/tgTmnl'
      },
      originalMessageData: [
        {
          tableNo: '1',
          transceiverStatus: '收',
          time: '2019/09/08',
          messageContent: '参数测试'
        },
        {
          tableNo: '2',
          transceiverStatus: '发',
          time: '2019/09/08',
          messageContent: '参数测试'
        }
      ],
      originalMessageDataObj: {},
      filterValue: '',
      treeDataItem: [
        {
          title: '我的常用数据项',
          expand: true,
          render: (h, { root, node, data }) => {
            return h('span', {
              style: {
                display: 'inline-block',
                width: '100%'
              }
            }, [
              h('span', [
                h('Icon', {
                  props: {
                    type: 'ios-folder-outline'
                  },
                  style: {
                    marginRight: '8px'
                  }
                }),
                h('span', data.title)
              ])
            ])
          },
          children: [
            {
              title: 'F2终端日历时钟...',
              expand: true
            },
            {
              title: 'F4终端通信状态...',
              expand: true
            },
            {
              title: 'F5终端控制设置...',
              expand: true
            }
          ]
        }
      ],
      buttonProps: {
        type: 'default',
        size: 'small'
      }
    }
  },
  mounted () {
    this.changeHeight()
    let that = this
    window.onresize = () => {
      return (() => {
        that.changeHeight()
      })()
    }
  },
  watch: {},
  methods: {
    changeHeight: function () {
      this.tableHeight = window.innerHeight > 700 ? window.innerHeight - 300 : 290
    },
    switchChoose (val) {
      this.isChoose = val
    },
    onProtectLoadData () {
      this.loading = false
    },
    onProtectLoadDataPageInfo (tmpCurrent, tmpPageSize, total, totalPage) {
      this.current = tmpCurrent
      this.pageSize = tmpPageSize
      this.total = total
      this.getTableData()
    },
    topPanelQuery () {
      let _this = this
      _this.terminalAjaxDataObj = _this.cloneSearch()
      _this.current = 1
      setTimeout(() => {
        _this.getTableData()
      }, 100)
    },
    cloneSearch () {
      let clone = {}
      let terminalName = this.searchItem.terminalName
      let terminalType = this.searchItem.terminalType
      let statute = this.searchItem.statute
      clone.terminalName = terminalName
      clone.terminalType = terminalType
      clone.statute = statute
      return clone
    },
    getTableData () {
      this.$refs.terminalTable.onPageChange(this.current, this.pageSize)
    },
    handleselectChecked (arr) {
      this.checkedIndexArr = []
      for (let i = 0; i < arr.length; i++) {
        this.checkedIndexArr.push(arr[i].initRowIndex)
      }
    },
    rowClassName (row, index) {
      for (let i = 0; i < this.checkedIndexArr.length; i++) {
        if (index === this.checkedIndexArr[i]) {
          return 'table-info-row'
        }
      }
    },
    // ---------数据召测----------
    terminalSearchClick () {
      this.showTerminalSearch = true
    },
    closeTerminalModal (val) {
      if (val === false) {
        this.showTerminalSearch = false
      }
    },
    modalLoadData () {
      this.loading = false
    },
    modalLoadDataPageInfo (tmpCurrent, tmpPageSize, total, totalPage) {
      this.current = tmpCurrent
      this.pageSize = tmpPageSize
      this.total = total
      this.getTerminalTableData()
    },
    modalPanelQuery () {
      let _this = this
      _this.modalTerminalDataObj = _this.cloneTerminalSearch()
      _this.current = 1
      setTimeout(() => {
        _this.getTerminalTableData()
      }, 100)
    },
    cloneTerminalSearch () {
      let clone = {}
      let terminalName = this.modalSearchItem.terminalName
      let terminalType = this.modalSearchItem.terminalType
      let statute = this.modalSearchItem.statute
      clone.terminalName = terminalName
      clone.terminalType = terminalType
      clone.statute = statute
      return clone
    },
    getTerminalTableData () {
      this.$refs.modalTerminalTable.onPageChange(this.current, this.pageSize)
    },
    // 原始报文弹窗事件
    lookOverMessage () {
      this.showOriginalMessage = true
    },
    closeOriginalMessageModal (val) {
      if (val === false) {
        this.showOriginalMessage = false
      }
    },
    modalOriginalMessageData () {
      this.loading = false
    },
    modalOriginalMessageInfo (tmpCurrent, tmpPageSize, total, totalPage) {
      this.current = tmpCurrent
      this.pageSize = tmpPageSize
      this.total = total
      this.getMessageTableData()
    },
    messagePanelQuery () {
      let _this = this
      _this.originalMessageDataObj = _this.cloneMessageSearch()
      _this.current = 1
      setTimeout(() => {
        _this.getMessageTableData()
      }, 100)
    },
    cloneMessageSearch () {
      let clone = {}
      let terminalName = this.modalMessageSearchItem.terminalName
      let statuteType = this.modalMessageSearchItem.statuteType
      let startTime = this.modalMessageSearchItem.startTime
      let endTime = this.modalMessageSearchItem.endTime
      let transceiverStatusValue = this.modalMessageSearchItem.transceiverStatusValue
      clone.terminalName = terminalName
      clone.statuteType = statuteType
      clone.startTime = startTime
      clone.endTime = endTime
      clone.transceiverStatusValue = transceiverStatusValue
      return clone
    },
    getMessageTableData () {
      this.$refs.originalMessageTable.onPageChange(this.current, this.pageSize)
    },
    startTimeChange (date) {
      this.modalMessageSearchItem.startTime = date
    },
    endTimeChange (date) {
      this.modalMessageSearchItem.endTime = date
    },
    renderContent (h, { root, node, data }) {
      return h('span', {
        style: {
          display: 'inline-block',
          width: '100%'
        }
      }, [
        h('span', [
          h('Icon', {
            props: {
              type: 'ios-paper-outline'
            },
            style: {
              marginRight: '0px'
            }
          }),
          h('span', data.title)
        ]),
        h('span', {
          style: {
            display: 'inline-block'
          }
        }, [
          h('Icon', {
            props: {
              type: 'ios-information-circle',
              color: '#009999'
            },
            style: {
              fontSize: '20px'
            }
          }),
          h('Icon', {
            props: {
              type: 'ios-trash',
              color: '#009999'
            },
            style: {
              marginRight: '8px',
              fontSize: '23px'
            },
            on: {
              click: () => { this.remove(root, node, data) }
            }
          })
        ])
      ])
    },
    remove (root, node, data) {
      const parentKey = root.find(el => el === node).parent
      const parent = root.find(el => el.nodeKey === parentKey).node
      const index = parent.children.indexOf(data)
      parent.children.splice(index, 1)
    }
  }
}
</script>

<style lang="less">
@import "./collectionManage.less";
</style>
