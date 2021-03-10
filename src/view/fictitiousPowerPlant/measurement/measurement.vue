<template>
  <div class="measurement" :style="mainHeight" id="measurement">
    <div class="selectTitleBar">查询条件</div>
    <div class="searchBar">
      <Form
        ref="searchBarForm"
        :rules="ruleValidate"
        :model="searchBarForm"
        :label-width="110"
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
            <FormItem label="结算状态" prop="controlType">
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
          <!-- <i-col span="3">
            <FormItem>
              <Button
                type="primary"
                class="margin-right-3"
                style="width:100px; margin-left:-92px;"
                @click="exportExcel"
              >导出</Button>
            </FormItem>
          </i-col>-->
        </Row>
      </Form>
    </div>
    <div class="measurementTable">
      <div class="measurementTableBar">计量结算列表</div>
      <div class="measurementTable">
        <Tables
          ref="measurementTable"
          :height="tableHeight - 50"
          filename="交易结算列表"
          :columns="measurementColumns.columns"
          :loading="measurementTableLoading"
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
import * as api from "@/api/fictitiousPowerPlant/common/mainview-data.js";
import "@/view/fictitiousPowerPlant/measurement/measurement.less";
import { getLastMonthMaxDay, formatDate, arrToMap } from "@/libs/index";
// import excel from '@/libs/excel'
import Tables from "_c/tables";

export default {
  name: "measurement",
  components: {
    Tables
  },
  props: {},
  data() {
    return {
      mainHeight: "height: 820px;",
      tableHeight: 500,
      selectDateDayOptions: {
        shortcuts: [
          {
            text: "今天",
            value() {
              return formatDate("", 0);
            }
          },
          {
            text: "昨日",
            value() {
              return formatDate("", -1);
            }
          },
          {
            text: "上周",
            value() {
              return formatDate("", -7);
            }
          }
        ]
      },
      searchBarForm: {
        tradeNo: "",
        controlType: "",
        settleStartDate: getLastMonthMaxDay(),
        settleEndDate: formatDate(undefined, -1)
      },
      controlTypes: [{ name: "全部", value: "all" }],
      controlMaps: {},
      ruleValidate: {
        settleStartDate: [
          {
            required: true,
            message: "结算生成查询开始时间不能为空",
            trigger: "blur"
          }
        ],
        settleEndDate: [
          {
            required: true,
            message: "结算生成查询结束时间不能为空",
            trigger: "blur"
          }
        ]
      },
      measurementColumns: {
        columns: [
          {
            title: "序号",
            key: "tableNo",
            width: 100,
            sortable: true,
            align: "center",
            render: (h, params) => {
              return h("span", this.showTableIndex(params));
            }
          },
          {
            title: "交易编号",
            key: "tradeNo",
            width: 200,
            align: "center"
          },
          {
            title: "响应电量（kWh）",
            key: "responseEnergy",
            width: 200,
            align: "center"
          },
          {
            title: "合同编号",
            key: "contractNo",
            width: 200,
            align: "center"
          },
          {
            title: "合同总价(元)",
            key: "contractPrice",
            width: 150,
            align: "center"
          },
          {
            title: "结算总价(元)",
            key: "settlePrice",
            width: 150,
            align: "center"
          },
          {
            title: "完成率(%)",
            key: "finishRate",
            width: 150,
            align: "center"
          },
          {
            title: "结算状态",
            key: "controlType",
            width: 200,
            align: "center",
            render: (h, params) => {
              return h("span", this.controlMaps.get(params.row.controlType));
            }
          },
          {
            title: "结算生成时间",
            key: "settleDate",
            width: 200,
            align: "center"
          },
          {
            title: "业主结算详情",
            key: "settleDetail",
            width: 200,
            align: "center",
            render: (h, params) => {
              if (this.controlMaps.get(params.row.controlType) === "待结算") {
                return h("span", "N/A");
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
        axiosUrl: "msc/settlementInfoList"
      },
      measurementTableLoading: false,
      measurementAjaxData: {},
      current: 1,
      pageSize: 25,
      total: 0,
      exportLoading: false
    };
  },
  methods: {
    changeStartDate(date) {
      this.searchBarForm.settleStartDate = date;
    },
    changeEndDate(date) {
      this.searchBarForm.settleEndDate = date;
    },
    showTableIndex(params) {
      return (
        (this.current > 0 ? this.current - 1 : this.current) * this.pageSize +
        params.index +
        1
      );
    },
    getControlTypes() {
      let _this = this;
      api
        .getDropDownDatas({
          type: "MEASURE_CONTROL_TYPE"
        })
        .then(res => {
          let list = res.data.data;
          if (typeof list !== "undefined" && list !== null && list.length > 0) {
            _this.controlTypes = _this.controlTypes.concat(list);
          }
          _this.controlMaps = arrToMap(list);
        })
        .catch(err => {
          _this.$Message.error("下拉框查询失败！");
        });
    },
    // exportExcel () {
    //   let tableData = this.$refs.measurementTable._data.insideTableData
    //   if (tableData.length) {
    //     this.exportLoading = true
    //     const params = {
    //       title: [
    //         '序号',
    //         '交易编号',
    //         '合同编号',
    //         '合同总价(元)',
    //         '结算总价(元)',
    //         '完成率(%)',
    //         '结算状态',
    //         '结算生成时间',
    //         '用户结算详情'
    //       ],
    //       key: [
    //         'tableNo',
    //         'tradeNo',
    //         'agreementNo',
    //         'agreementPrice',
    //         'settlePrice',
    //         'complateRate',
    //         'settleStatus',
    //         'settleTime',
    //         'settleDetail'
    //       ],
    //       data: tableData,
    //       autoWidth: true,
    //       filename: '交易结算列表'
    //     }
    //     excel.export_array_to_excel(params)
    //     this.exportLoading = false
    //   } else {
    //     this.$Message.info('表格数据不能为空！')
    //   }
    // },
    //以下五个方法是查询组件所运用的方法
    onMeasurementLoadData() {
      this.measurementTableLoading = false;
    },
    onMeasurementLoadDataPageInfo(tmpCurrent, tmpPageSize, total, totalPage) {
      this.current = tmpCurrent;
      this.pageSize = tmpPageSize;
      this.total = total;
    },
    topPanelQuery: function(name = "searchBarForm") {
      let _this = this;
      this.$refs[name].validate(valid => {
        if (valid) {
          _this.measurementAjaxData = _this.cloneSearch();
          _this.current = 1;
          setTimeout(() => {
            _this.getTableData();
          }, 100);
        } else {
          _this.$Message.error("请补充查询条件!");
        }
      });
    },
    getTableData() {
      this.$refs.measurementTable.onPageChange(this.current, this.pageSize);
    },
    goToDetail(params) {
      this.$router.push({
        name: "userMeasurement",
        query: {
          tradeNo: params.row.tradeNo,
          from: "measurment"
        }
      });
    },
    cloneSearch() {
      let clone = {};
      let tradeNo = this.searchBarForm.tradeNo;
      let controlType = this.searchBarForm.controlType;
      let settleStartDate = this.searchBarForm.settleStartDate;
      let settleEndDate = this.searchBarForm.settleEndDate;
      clone.tradeNo = tradeNo;
      clone.controlType = controlType;
      clone.settleStartDate = settleStartDate;
      clone.settleEndDate = settleEndDate;
      return clone;
    },
    changeHeight: function() {
      this.mainHeight = "height: " + (window.innerHeight - 140) + "px";
      this.tableHeight =
        window.innerHeight > 800 ? window.innerHeight - 365 : 500;
    }
  },
  created() {},
  watch: {},
  mounted() {
    this.changeHeight();
    this.getControlTypes();
    this.topPanelQuery();
    let that = this;
    window.onresize = () => {
      return (() => {
        that.changeHeight();
      })();
    };
  }
};
</script>

<style scoped>
.measurement {
  position: relative;
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
