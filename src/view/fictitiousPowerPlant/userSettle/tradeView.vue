<template>
  <div class="measurement" id="measurement">
    <div class="searchBar">
      <Form
        ref="searchBarForm"
        :rules="ruleValidate"
        :model="searchBarForm"
        :label-width="120"
        style="width:100%"
      >
        <Row class="searchBarRowControl">
          <i-col span="6">
            <FormItem label="交易编号" prop="tradeNo">
              <Input
                v-model="searchBarForm.tradeNo"
                placeholder="请输入交易编号"
                style="max-width: 160px;"
              />
            </FormItem>
          </i-col>
          <i-col span="6">
            <FormItem label="业主结算状态" prop="controlType">
              <Select
                v-model="searchBarForm.controlType"
                placeholder="请选择"
                style="max-width: 160px;"
              >
                <Option
                  v-for="item in controlTypes"
                  :value="item.value"
                  :key="item.value"
                >{{ item.name }}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="6">
            <FormItem label="结算生成时间" prop="settleStartDate">
              <DatePicker
                type="date"
                :value="searchBarForm.settleStartDate"
                :options="selectDateDayOptions"
                @on-change="changeStartDate"
                format="yyyy-MM-dd"
                :clearable="false"
                placeholder="默认上月"
                style="max-width: 160px"
              ></DatePicker>
            </FormItem>
          </i-col>
          <i-col span="6">
            <FormItem label="~" prop="settleEndDate" class="endDateForm">
              <DatePicker
                type="date"
                :value="searchBarForm.settleEndDate"
                :options="selectDateDayOptions"
                @on-change="changeEndDate"
                format="yyyy-MM-dd"
                :clearable="false"
                placeholder="默认前一天"
                style="max-width: 160px"
              ></DatePicker>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="20" class="buttonControl">
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
    <div class="measurementTable">
      <div class="measurementTableBar">计量结算列表</div>
      <div class="measurementTable">
        <Tables
          ref="measurementTable"
          :height="tableHeight - 50"
          filename="计量结算列表"
          :loading="measurementTableLoading"
          :columns="measurementColumns.columns"
          :axiosUrl="measurementColumns.axiosUrl"
          :axiosData="measurementAjaxData"
          @on-load-data="onMeasurementLoadData"
          @on-load-data-page-info="onMeasurementLoadDataPageInfo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import * as api from '@/api/fictitiousPowerPlant/common/mainview-data.js'
import '@/view/fictitiousPowerPlant/measurement/measurement.less'
import { getLastMonthMaxDay, formatDate, arrToMap } from '@/libs/index'
import Tables from '_c/tables'

export default {
  name: 'measurement',
  components: {
    Tables
  },
  props: {
    tableHeight: {
      default: 500,
      type: Number
    }
  },
  data () {
    return {
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
        tradeNo: '',
        controlType: '',
        settleStartDate: getLastMonthMaxDay(),
        settleEndDate: formatDate(undefined, -1)
      },
      controlTypes: [{ value: 'all', name: '全部' }],
      controlMaps: {},
      ruleValidate: {
        settleStartDate: [
          {
            required: true,
            message: '结算生成查询开始时间不能为空',
            trigger: 'blur'
          }
        ],
        settleEndDate: [
          {
            required: true,
            message: '结算生成查询结束时间不能为空',
            trigger: 'blur'
          }
        ]
      },
      measurementColumns: {
        columns: [
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
            width: 200,
            align: 'center'
          },
          {
            title: '合同编号',
            key: 'contractNo',
            width: 200,
            align: 'center'
          },
          {
            title: '合同总价(元)',
            key: 'contractPrice',
            width: 150,
            align: 'center'
          },
          {
            title: '结算总价(元)',
            key: 'settlePrice',
            width: 150,
            align: 'center'
          },
          {
            title: '完成率(%)',
            key: 'finishRate',
            width: 150,
            align: 'center'
          },
          {
            title: '业主结算状态',
            key: 'userControlType',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('span', this.controlMaps.get(params.row.userControlType))
            }
          },
          {
            title: '结算生成时间',
            key: 'settleDate',
            width: 200,
            align: 'center'
          },
          {
            title: '业主结算详情',
            key: 'settleDetail',
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
                      this.goToDetail(params)
                    }
                  }
                },
                '详情'
              )
            }
          }
        ],
        axiosUrl: 'uac/transactionMeteringSettlement'
      },
      measurementTableLoading: false,
      measurementAjaxData: {},
      current: 1,
      pageSize: 25,
      total: 0,
      exportLoading: false
    }
  },
  methods: {
    changeStartDate (date) {
      this.searchBarForm.settleStartDate = date
    },
    changeEndDate (date) {
      this.searchBarForm.settleEndDate = date
    },
    showTableIndex (params) {
      return (
        (this.current > 0 ? this.current - 1 : this.current) * this.pageSize +
        params.index +
        1
      )
    },
    onMeasurementLoadData () {
      this.measurementTableLoading = false
    },
    onMeasurementLoadDataPageInfo (tmpCurrent, tmpPageSize, total, totalPage) {
      this.current = tmpCurrent
      this.pageSize = tmpPageSize
      this.total = total
    },
    topPanelQuery: function (name = 'searchBarForm') {
      let _this = this
      this.$refs[name].validate(valid => {
        if (valid) {
          _this.measurementAjaxData = _this.cloneSearch()
          _this.current = 1
          setTimeout(() => {
            _this.getTableData()
          }, 100)
        } else {
          _this.$Message.error('请补充查询条件!')
        }
      })
    },
    getTableData () {
      this.$refs.measurementTable.onPageChange(this.current, this.pageSize)
    },
    goToDetail (params) {
      this.$router.push({
        name: 'userMeasurement',
        query: {
          tradeNo: params.row.tradeNo,
          from: 'measurment'
        }
      })
    },
    getControlTypes () {
      let _this = this
      api
        .getDropDownDatas({
          type: 'USER_MEASURE_CONTROL_TYPE'
        })
        .then(res => {
          let list = res.data.data
          if (typeof list !== 'undefined' && list !== null && list.length > 0) {
            _this.controlTypes = _this.controlTypes.concat(list)
          }
          _this.controlMaps = arrToMap(list)
        })
        .catch(err => {
          _this.$Message.error('下拉框查询失败！')
        })
    },
    cloneSearch () {
      let clone = {}
      let tradeNo = this.searchBarForm.tradeNo
      let controlType = this.searchBarForm.controlType
      let settleStartDate = this.searchBarForm.settleStartDate
      let settleEndDate = this.searchBarForm.settleEndDate
      clone.tradeNo = tradeNo
      clone.controlType = controlType
      clone.settleStartDate = settleStartDate
      clone.settleEndDate = settleEndDate
      return clone
    }
  },
  created () {},
  watch: {},
  mounted () {
    this.getControlTypes()
    this.topPanelQuery()
  }
}
</script>

<style scoped>
.measurement {
  position: relative;
  height: calc(100% - 50px);
}

.measurement .searchBar {
  min-height: 120px;
  background: #fcfcfc;
  border: 1px solid rgba(215, 215, 215, 1);
  border-radius: 4px;
  padding: 0.5% 5px 1% 40px;
  margin-bottom: 10px;
  position: relative;
  height: 16.5%;
}
.measurement .selectTitleBar,
.measurement .measurementTableBar {
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
.measurement .searchBar .searchBarRowControl {
  margin-top: 1.3%;
  margin-bottom: 5px;
}
/* .measurement .searchBar .endDateForm { */
/* margin-left: -20px; */
/* } */

.measurement .searchBar .buttonControl {
  text-align: right;
  margin-left: 40px;
}
</style>
