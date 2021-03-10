<template>
  <div class="alarmSelectedMain" id="alarmSelectedMain">
    <div class="searchBar">
      <Form ref="searchBarForm" :rules="ruleValidate" :model="searchBarForm" :label-width="100">
        <Row>
          <i-col span="8">
            <FormItem label="机组名称" prop="medicalGroupName">
              <Input
                v-model="searchBarForm.medicalGroupName"
                placeholder="请输入机组名称"
                style="width: 160px;"
              />
            </FormItem>
          </i-col>
          <i-col span="8">
            <FormItem label="终端名称" prop="tmnlName">
              <Input v-model="searchBarForm.tmnlName" placeholder="请输入终端名称" style="width: 160px;" />
            </FormItem>
            <!-- <FormItem label="因子类型" prop="divideType">
              <Select
                v-model="searchBarForm.divideType"
                placeholder="请选择因子类型"
                style="width: 160px;"
              >
                <Option
                  v-for="item in divideTypes"
                  :value="item.value"
                  :key="item.value"
                >{{ item.name }}</Option>
              </Select>
            </FormItem>-->
          </i-col>
          <i-col span="8">
            <FormItem label="告警类型" prop="alarmType">
              <Select v-model="searchBarForm.alarmType" placeholder="请选择告警类型" style="width: 160px;">
                <Option
                  v-for="item in alarmTypes"
                  :value="item.value"
                  :key="item.value"
                >{{ item.name }}</Option>
              </Select>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="8">
            <FormItem label="开始时间" prop="startDate">
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
          <i-col span="8">
            <FormItem label="至" prop="endDate">
              <DatePicker
                type="date"
                :value="searchBarForm.endDate"
                :options="selectDateDayOptions"
                @on-change="changeEndDate"
                format="yyyy-MM-dd"
                :clearable="true"
                placeholder="未结束"
                style="width: 160px"
              ></DatePicker>
            </FormItem>
          </i-col>
          <i-col span="4">
            <FormItem class="searchBtnControl">
              <Button
                type="primary"
                class="margin-right-3"
                style="width:100px;margin-left:30px;"
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
    <div class="selectedResult">
      <div class="selectedResultBar">异常告警查询结果</div>
      <div class="selectedTables">
        <Tables
          ref="alarmSelectedTable"
          :height="tableHeight - 50"
          filename="异常告警查询结果"
          :loading="selectedResultLoading"
          :columns="selectedTable.columns"
          :axiosUrl="selectedTable.axiosUrl"
          :axiosData="selectedAjaxData"
          @on-load-data="onSelectedLoadData"
          @on-load-data-page-info="onSelectedLoadDataPageInfo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import "@/view/fictitiousPowerPlant/exceptionAlarm/exceptionAlarm.less";
import * as api from "@/api/fictitiousPowerPlant/common/mainview-data.js";
import { getLastMonthMaxDay, formatDate } from "@/libs/index";
import Tables from "_c/tables";

export default {
  name: "alarmSelected",
  components: {
    Tables,
  },
  props: {
    tableHeight: {
      default: 500,
      type: Number,
    },
  },
  data() {
    return {
      selectDateDayOptions: {
        shortcuts: [
          {
            text: "今天",
            value() {
              return formatDate("", 0);
            },
          },
          {
            text: "昨日",
            value() {
              return formatDate("", -1);
            },
          },
          {
            text: "上周",
            value() {
              return formatDate("", -7);
            },
          },
        ],
      },
      searchBarForm: {
        tmnlName: "",
        startDate: getLastMonthMaxDay(),
        endDate: "",
        medicalGroupName: "",
        alarmType: "",
      },
      alarmTypes: [{ value: "all", name: "全部" }],
      ruleValidate: {
        startDate: [
          { required: true, message: "开始日期不能为空", trigger: "blur" },
        ],
      },
      selectedResultLoading: false,
      selectedTable: {
        columns: [
          {
            title: "编号",
            key: "tableNo",
            width: 100,
            sortable: true,
            align: "center",
            render: (h, params) => {
              return h("span", this.showTableIndex(params));
            },
          },
          {
            title: "机组编号",
            key: "unitNo",
            width: 200,
            align: "center",
          },
          {
            title: "机组名称",
            key: "unitName",
            width: 200,
            align: "center",
          },
          // {
          //   title: "业主编号",
          //   key: "userNo",
          //   width: 100,
          //   align: "center"
          // },
          {
            title: "所属业主",
            key: "ownerName",
            width: 100,
            align: "center",
          },
          // {
          //   title: "因子类型",
          //   key: "subdeviceType",
          //   width: 100,
          //   align: "center"
          // },
          {
            title: "终端编号",
            key: "tmnlNo",
            width: 100,
            align: "center",
          },
          {
            title: "终端名称",
            key: "tmnlName",
            width: 100,
            align: "center",
          },
          {
            title: "告警类型",
            key: "alarmType",
            width: 100,
            align: "center",
          },
          {
            title: "告警开始时间",
            key: "alarmBeginTime",
            width: 200,
            align: "center",
          },
          {
            title: "告警结束时间",
            key: "alarmEndTime",
            width: 200,
            align: "center",
          },
          {
            title: "告警持续时间",
            key: "alarmDuration",
            width: 200,
            align: "center",
          },
          {
            title: "告警内容",
            key: "alarmRemark",
            width: 200,
            align: "center",
          },
          {
            title: "联系人",
            key: "contactName",
            width: 100,
            align: "center",
          },
          {
            title: "联系电话",
            key: "phoneNumber",
            width: 200,
            align: "center",
          },
        ],
        axiosUrl: "isc/alarmQuery",
      },
      selectedAjaxData: {},
      current: 1,
      pageSize: 25,
      total: 0,
      exportLoading: false,
    };
  },
  methods: {
    changeStartDate(date) {
      this.searchBarForm.startDate = date;
    },
    changeEndDate(date) {
      this.searchBarForm.endDate = date;
    },
    showTableIndex(params) {
      return (
        (this.current > 0 ? this.current - 1 : this.current) * this.pageSize +
        params.index +
        1
      );
    },
    // exportExcel() {
    //   let tableData = this.$refs.selectedTable._data.insideTableData;
    //   if (tableData.length) {
    //     this.exportLoading = true;
    //     const params = {
    //       title: [
    //         "编号",
    //         "机组编号",
    //         "机组名称",
    //         "业主编号",
    //         "所属业主",
    //         "因子类型",
    //         "告警类型",
    //         "告警开始时间",
    //         "告警结束时间",
    //         "告警持续时间",
    //         "告警内容",
    //         "联系人",
    //         "联系电话"
    //       ],
    //       key: [
    //         "tableNo",
    //         "medicalGroupNo",
    //         "medicalGroupName",
    //         "userNo",
    //         "ownUser",
    //         "divideType",
    //         "alarmType",
    //         "alarmStartTime",
    //         "alarmEndTime",
    //         "alarmLastTime",
    //         "alarmContent",
    //         "connector",
    //         "connectPhone"
    //       ],
    //       data: tableData,
    //       autoWidth: true,
    //       filename: "异常告警查询结果"
    //     };
    //     excel.export_array_to_excel(params);
    //     this.exportLoading = false;
    //   } else {
    //     this.$Message.info("表格数据不能为空！");
    //   }
    // },
    onSelectedLoadData() {
      this.selectedResultLoading = false;
    },
    onSelectedLoadDataPageInfo(tmpCurrent, tmpPageSize, total, totalPage) {
      this.current = tmpCurrent;
      this.pageSize = tmpPageSize;
      this.total = total;
    },
    topPanelQuery: function (name = "searchBarForm") {
      let _this = this;
      this.$refs[name].validate((valid) => {
        if (valid) {
          _this.selectedAjaxData = _this.cloneSearch();
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
      this.$refs.alarmSelectedTable.onPageChange(this.current, this.pageSize);
    },
    cloneSearch() {
      let clone = {};
      // let subdeviceType = this.searchBarForm.divideType;
      let tmnlName = this.searchBarForm.tmnlName;
      let alarmBeginTime = this.searchBarForm.startDate;
      let alarmEndTime = this.searchBarForm.endDate;
      let unitName = this.searchBarForm.medicalGroupName;
      let alarmType = this.searchBarForm.alarmType;
      // clone.subdeviceType = subdeviceType;
      clone.tmnlName = tmnlName;
      clone.alarmBeginTime = alarmBeginTime;
      clone.alarmEndTime = alarmEndTime;
      clone.unitName = unitName;
      clone.alarmType = alarmType;
      return clone;
    },
  },
  created() {},
  watch: {},
  mounted() {
    let _this = this;
    _this.$nextTick(() => {
      _this.topPanelQuery();
    });
    api
      .getDropDownDatas({
        type: "YCGJ_GJCX_GJLX",
      })
      .then((res) => {
        let list = res.data.data;
        if (typeof list !== "undefined" && list !== null && list.length > 0) {
          _this.alarmTypes = _this.alarmTypes.concat(list);
        }
      })
      .catch(() => {
        _this.$Message.error("下拉框查询失败！");
      });
    // api
    //   .getDropDownDatas({
    //     type: "SUB_DEVICE_TYPE1"
    //   })
    //   .then(res => {
    //     let list = res.data.data;
    //     if (typeof list !== "undefined" && list !== null && list.length > 0) {
    //       _this.divideTypes = _this.divideTypes.concat(list);
    //     }
    //   })
    //   .catch(err => {
    //     _this.$Message.error("下拉框查询失败！");
    //   });
  },
};
</script>

<style scoped>
.alarmSelectedMain {
  position: relative;
  height: calc(100% - 50px);
}
.alarmSelectedMain .searchBar {
  min-height: 94px;
  background: #fcfcfc;
  border: 1px solid rgba(215, 215, 215, 1);
  border-radius: 4px;
  padding: 0.5% 5px 0.5% 5px;
  margin-bottom: 5px;
  position: relative;
  height: 13%;
}
.alarmSelectedMain .selectedResultBar {
  font-weight: 650;
  font-size: 16px;
  color: #009999;
  line-height: 40px;
  padding-left: 12px;
  margin-bottom: 0;
}

.alarmSelectedMain .selectedResult {
  /* height: calc(87% - 5px); */
  height: calc(87% - 20px);
  position: relative;
}
</style>
