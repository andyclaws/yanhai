<template>
  <div class="userView">
    <Row :gutter="10" class="mainRow">
      <i-col :span="4" :style="isUserListShow ? '' : 'width: 0;'" class="userViewICol">
        <Card class="userList">
          <div class="userListInput">
            <Icon type="ios-search" class="searchIcon" @click="likeSearchUser"></Icon>
            <Input v-model="filterValue" placeholder="请输入关键字筛选" size="default" />
          </div>
          <div class="userListTitle">业主名称</div>
          <div class="infoArea">
            <div :class="['userInfos', userList.length > 0 ? 'isNotBlank' : '']">
              <div
                class="userInfo"
                v-for="(item, index) in userList"
                :key="index"
                @click="chooseUser(item.id)"
              >
                <div :class="['circle', isUserChoose === item.id ? 'circleChoosed' : '']"></div>
                <div
                  :class="['userName', isUserChoose === item.id ? 'userNameChoosed' : '']"
                >{{item.name}}</div>
              </div>
            </div>
          </div>
          <div class="showBtn" @click="changeMenuWidth">
            <img src="./images/u1456.png" />
          </div>
        </Card>
      </i-col>
      <i-col :span="20" :style="isUserListShow ? '' : 'width:99%;'" class="userViewICol">
        <Card class="settleList">
          <div class="searchBar">
            <Form
              ref="searchBarForm"
              :rules="ruleValidate"
              :model="searchBarForm"
              :label-width="120"
              style="width:100%"
            >
              <Row class="searchBarRowControl">
                <i-col span="7">
                  <FormItem label="结算生成时间" prop="startDate">
                    <DatePicker
                      type="date"
                      :value="searchBarForm.startDate"
                      :options="selectDateDayOptions"
                      @on-change="changeStartDate"
                      format="yyyy-MM-dd"
                      :clearable="false"
                      placeholder="默认上月"
                      style="width: 160px"
                    ></DatePicker>
                  </FormItem>
                </i-col>
                <i-col span="5">
                  <FormItem label="~" prop="endDate" class="endDateForm">
                    <DatePicker
                      type="date"
                      :value="searchBarForm.endDate"
                      :options="selectDateDayOptions"
                      @on-change="changeEndDate"
                      format="yyyy-MM-dd"
                      :clearable="false"
                      placeholder="默认前一天"
                      style="width: 160px"
                    ></DatePicker>
                  </FormItem>
                </i-col>
                <i-col span="5">
                  <FormItem label="结算状态" prop="settleType">
                    <Select
                      v-model="searchBarForm.settleType"
                      placeholder="请选择"
                      style="width: 160px;"
                    >
                      <Option
                        v-for="item in settleTypes"
                        :value="item.value"
                        :key="item.value"
                      >{{ item.name }}</Option>
                    </Select>
                  </FormItem>
                </i-col>
                <i-col span="4" class="buttonControl">
                  <FormItem>
                    <Button
                      type="primary"
                      class="margin-right-3"
                      style="width:100px;"
                      @click="topPanelQuery('searchBarForm')"
                    >查询</Button>
                  </FormItem>
                </i-col>
              </Row>
            </Form>
          </div>
          <Card class="settleTableCard">
            <div class="tableBarTitle">计量结算列表</div>
            <div class="userViewTable">
              <Tables
                ref="userViewTable"
                filename="计量结算列表"
                :height="tableHeight - 50"
                :columns="userViewTable.columns"
                :axiosUrl="userViewTable.axiosUrl"
                :axiosData="userViewTableAjaxData"
                :loading="userViewTableTableLoading"
                @on-load-data="onUserViewTableLoadData"
                @on-selection-change="selectionChange"
                @on-load-data-page-info="onUserViewTableLoadDataPageInfo"
              />
            </div>
          </Card>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import * as api from '@/api/fictitiousPowerPlant/common/mainview-data.js'
import * as userSettleApi from '@/api/fictitiousPowerPlant/userSettle/mainview-data.js'
import '@/view/fictitiousPowerPlant/userSettle/userSettle.less'
import { getLastMonthMaxDay, formatDate, arrToMap } from '@/libs/index'
import Tables from '_c/tables'

export default {
  name: 'userView',
  components: {
    Tables
  },
  props: {
    tableHeight: {
      default: 370,
      type: Number
    }
  },
  data () {
    let boxWidth = window.innerWidth
    return {
      boxWidth: boxWidth,
      isUserListShow: false,
      filterValue: '',
      isUserChoose: '',
      userList: [],
      userListBak: [],
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
        settleType: '',
        startDate: getLastMonthMaxDay(),
        endDate: formatDate(undefined, -1)
      },
      settleTypes: [{ value: 'all', name: '全部' }],
      settleMaps: {},
      ruleValidate: {
        startDate: [
          {
            required: true,
            message: '合同生成查询开始时间不能为空',
            trigger: 'blur'
          }
        ],
        endDate: [
          {
            required: true,
            message: '合同生成查询结束时间不能为空',
            trigger: 'blur'
          }
        ]
      },
      userViewTable: {
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
            title: '交易编号',
            key: 'tradeNo',
            width: 150,
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
                      this.showDetailModal(params)
                    }
                  }
                },
                params.row.tradeNo
              )
            }
          },
          {
            title: '结算总额(元)',
            key: 'settleAmt',
            width: 150,
            align: 'center'
          },
          {
            title: '结算状态',
            key: 'controlType',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('span', this.settleMaps.get(params.row.controlType))
            }
          },
          {
            title: '目标发电量(kWh)',
            key: 'targetP',
            width: 200,
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
            align: 'center'
          },
          {
            title: '响应时间段',
            key: 'duration',
            width: 250,
            align: 'center'
          }
        ],
        axiosUrl: 'uac/transactionUserSettlement'
      },
      userViewTableTableLoading: false,
      userViewTableAjaxData: {},
      selectDatas: [],
      current: 1,
      pageSize: 25,
      total: 0
    }
  },
  methods: {
    chooseUser (id) {
      this.isUserChoose = id
      if (this.userViewTableAjaxData.ownerNo === undefined) {
        this.topPanelQuery()
      } else {
        this.userViewTableAjaxData.ownerNo = id
        this.current = 1
        this.getTableData()
      }
    },
    changeMenuWidth () {
      this.isUserListShow = !this.isUserListShow
    },
    changeStartDate (date) {
      this.searchBarForm.startDate = date
    },
    changeEndDate (date) {
      this.searchBarForm.endDate = date
    },
    showTableIndex (params) {
      return (
        (this.current > 0 ? this.current - 1 : this.current) * this.pageSize +
        params.index +
        1
      )
    },
    showDetailModal (params) {
      this.$router.push({
        name: 'transactionManage',
        query: {
          from: 'userSettle',
          tradeNo: params.row.tradeNo
        }
      })
    },
    topPanelQuery: function (name = 'searchBarForm') {
      let _this = this
      this.$refs[name].validate(valid => {
        if (valid) {
          _this.userViewTableAjaxData = _this.cloneSearch()
          _this.current = 1
          setTimeout(() => {
            _this.getTableData()
          }, 100)
        } else {
          _this.$Message.error('请补充查询条件!')
        }
      })
    },
    onUserViewTableLoadData () {
      this.userViewTableTableLoading = false
    },
    selectionChange (data) {
      this.selectDatas = data
    },
    onUserViewTableLoadDataPageInfo (tmpCurrent, tmpPageSize, total, totalPage) {
      this.current = tmpCurrent
      this.pageSize = tmpPageSize
      this.total = total
    },
    getTableData () {
      this.$refs.userViewTable.onPageChange(this.current, this.pageSize)
    },
    likeSearchUser () {
      let filterValue = this.filterValue.trim()
      if (filterValue === '') {
        this.userList = this.userListBak
        return
      }
      let arr = []
      arr = this.userListBak
      let filterArr = []
      for (let index = 0; index < arr.length; index++) {
        if (arr[index].name.indexOf(filterValue) > -1) {
          filterArr.push(arr[index])
        }
      }
      this.userList = filterArr
    },
    getSettleTypes () {
      let _this = this
      api
        .getDropDownDatas({
          type: 'USER_MEASURE_CONTROL_TYPE'
        })
        .then(res => {
          let list = res.data.data
          if (typeof list !== 'undefined' && list !== null && list.length > 0) {
            _this.settleTypes = _this.settleTypes.concat(list)
          }
          _this.settleMaps = arrToMap(list)
        })
        .catch(err => {
          _this.$Message.error('下拉框查询失败！')
        })
    },
    getUserList () {
      let _this = this
      userSettleApi
        .getOwnerList({})
        .then(res => {
          let list = res.data.data
          if (typeof list !== 'undefined' && list !== null && list.length > 0) {
            for (let index = 0; index < list.length; index++) {
              let obj = {
                id: list[index].ownerNo,
                name: list[index].ownerName
              }
              _this.userList.push(obj)
              _this.userListBak.push(obj)
            }
            _this.isUserChoose = list[0].ownerNo
          }
        })
        .catch(err => {
          _this.$Message.error('用户列表查询失败！')
        })
    },
    cloneSearch () {
      let clone = {}
      let ownerNo = this.isUserChoose
      let controlType = this.searchBarForm.settleType
      let settleStartDate = this.searchBarForm.startDate
      let settleEndDate = this.searchBarForm.endDate
      clone.ownerNo = ownerNo
      clone.controlType = controlType
      clone.settleStartDate = settleStartDate
      clone.settleEndDate = settleEndDate
      return clone
    }
  },
  created () {},
  watch: {},
  mounted () {
    this.getUserList()
    this.getSettleTypes()
    this.topPanelQuery()
  }
}
</script>

<style scoped>
.userView {
  position: relative;
  height: calc(100% - 50px);
  padding-top: 10px;
}

.userView .mainRow {
  height: 100%;
}

.userView .userViewICol {
  overflow: hidden;
  transition: width 0.3s !important;
  height: 100%;
}

.userView .userViewICol .settleList {
  overflow-x: hidden;
  overflow-y: scroll;
}

.userView .userList {
  height: 100%;
}

.userView .userListInput {
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  position: relative;
}

.userView .userListInput .searchIcon {
  color: #009999;
  font-size: 25px;
  position: absolute;
  top: 4px;
  left: 80%;
  z-index: 10;
  font-weight: 600;
  cursor: pointer;
}

.userView .infoArea {
  height: calc(100% - 70px);
  overflow-x: hidden;
  overflow-y: scroll;
  padding-left: 10px;
}

.userView .infoArea::-webkit-scrollbar,
.userView .userViewICol .settleList::-webkit-scrollbar {
  width: 3px;
}
.userView .infoArea::-webkit-scrollbar-track-piece,
.userView .userViewICol .settleList::-webkit-scrollbar-track-piece {
  background-color: #ffffff;
} /* 滚动条的内层滑轨背景颜色 */

.userView .infoArear::-webkit-scrollbar-track,
.userView .userViewICol .settleList::-webkit-scrollbar-track {
  background-color: #fff;
} /* 滚动条的外层滑轨背景颜色 */

.userView .infoArea::-webkit-scrollbar-thumb,
.userView .userViewICol .settleList::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 4px;
} /* 滚动条的内层滑块颜色 */

.userView .infoArea::-webkit-scrollbar-button,
.userView .userViewICol .settleList::-webkit-scrollbar-button {
  background-color: #fff;
  display: none;
}

.userView .userListTitle {
  font-weight: 400;
  font-size: 14px;
  color: #666666;
  padding-left: 10px;
}

.userView .infoArea .userInfos {
  position: relative;
  margin-left: 15px;
  padding: 0px 5px 5px 15px;
  margin-top: 5px;
}

.userView .infoArea .userInfos.isNotBlank {
  border-left: 1px solid #999999;
}

.userView .infoArea .userInfo {
  margin-top: 8px;
  cursor: pointer;
  position: relative;
}

.userView .infoArea .userInfos .userName {
  display: inline-block;
  font-weight: 400;
  font-size: 13px;
  color: #999999;
}

.userView .infoArea .userInfos .userName.userNameChoosed {
  color: #009999;
}

.userView .infoArea .userInfos .circle {
  position: absolute;
  background-color: #999999;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  left: -21px;
  top: 5px;
}

.userView .infoArea .userInfos .circle.circleChoosed {
  background-color: #009999;
}

.userView .showBtn {
  z-index: 15;
  display: inline-block;
  position: absolute;
  width: 13px;
  height: 90px;
  background-color: #b7dee8;
  border-radius: 6px;
  right: -5px;
  top: 40%;
  cursor: pointer;
}

.userView .showBtn img {
  display: inline-block;
  width: 8px;
  margin-top: 35px;
  margin-left: 2.5px;
}

.userView .settleList {
  height: 100%;
  position: relative;
}

.userView .searchBar {
  background: #fcfcfc;
  position: relative;
}

.userView .searchBar .searchBarRowControl {
  margin-top: 1.3%;
  margin-bottom: 5px;
}

.userView .searchBar .buttonControl {
  text-align: right;
  margin-left: 40px;
}

.userView .tableBarTitle {
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

.userView .settleTableCard {
  margin-bottom: 10px;
}

.userView .userViewTable {
  padding: 10px;
}
</style>
