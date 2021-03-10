<template>
  <div class="sourceList" :style="mainHeight">
    <!--顶部搜索栏-->
    <Card class="searchBar">
      <Form
        ref="searchBarForm"
        :rules="ruleValidate"
        :model="searchBarForm"
        :label-width="100"
        style="width:100%;padding-left:25px;"
      >
        <Row>
          <i-col span="6">
            <FormItem label="业主名称" prop="userName">
              <Input v-model="searchBarForm.userName" placeholder="请输入业主名称" />
            </FormItem>
          </i-col>
          <i-col span="6">
            <FormItem label="机组名称" prop="medicalGroupName">
              <Input v-model="searchBarForm.medicalGroupName" placeholder="请输入机组名称" />
            </FormItem>
          </i-col>
          <i-col span="6">
            <FormItem label="机组编号" prop="medicalGroupNo">
              <Input v-model="searchBarForm.medicalGroupNo" placeholder="请输入机组编号" />
            </FormItem>
          </i-col>
          <i-col span="6">
            <FormItem label="联系人" prop="connector">
              <Input v-model="searchBarForm.connector" placeholder="请输入联系人" />
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="6">
            <FormItem label="机组类型" prop="medicalGroupType">
              <Select v-model="searchBarForm.medicalGroupType" placeholder="请选择机组类型">
                <Option
                  v-for="medicalItem in medicalGroupTypes"
                  :value="medicalItem.value"
                  :key="medicalItem.value"
                >{{ medicalItem.name }}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="6">
            <FormItem label="机组性质" prop="medicalGroupProperty">
              <Select v-model="searchBarForm.medicalGroupProperty" placeholder="请选择机组性质">
                <Option
                  v-for="proItem in medicalGroupProperties"
                  :value="proItem.value"
                  :key="proItem.value"
                >{{ proItem.name }}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="6">
            <FormItem label="是否在线" prop="isOnline">
              <Select v-model="searchBarForm.isOnline">
                <Option
                  v-for="onlineItem in isOnlineTypes"
                  :value="onlineItem.value"
                  :key="onlineItem.value"
                >{{ onlineItem.name }}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="6">
            <FormItem label="所属区域" prop="ownArea">
              <Select v-model="searchBarForm.ownArea">
                <Option
                  v-for="ownItem in ownAreas"
                  :value="ownItem.areaNo"
                  :key="ownItem.areaNo"
                >{{ ownItem.areaName }}</Option>
              </Select>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="6">
            <FormItem label="下调负荷裕度" prop="minLoad">
              <Select v-model="searchBarForm.minLoad">
                <Option
                  v-for="minItem in minLoads"
                  :value="minItem.value"
                  :key="minItem.value"
                >{{ minItem.name }}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="6">
            <FormItem label="上调负荷裕度" prop="maxLoad">
              <Select v-model="searchBarForm.maxLoad">
                <Option
                  v-for="maxItem in maxLoads"
                  :value="maxItem.value"
                  :key="maxItem.value"
                >{{ maxItem.name }}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="6">
            <FormItem label="接入时间" prop="startDate">
              <DatePicker
                type="date"
                :clearable="true"
                :value="searchBarForm.startDate"
                :options="selectDateDayOptions"
                @on-change="changeStartDate"
                format="yyyy-MM-dd"
                placeholder="默认上月"
                style="width: 100%"
              ></DatePicker>
            </FormItem>
          </i-col>
          <i-col span="6">
            <FormItem label="至" prop="endDate">
              <DatePicker
                type="date"
                :value="searchBarForm.endDate"
                :options="selectDateDayOptions"
                @on-change="changeEndDate"
                format="yyyy-MM-dd"
                :clearable="false"
                placeholder="默认前一天"
                style="width: 100%"
              ></DatePicker>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="22">
            <FormItem>
              <Button
                type="primary"
                class="margin-right-3"
                style="width:100px;float:right;"
                @click="topPanelQuery('searchBarForm')"
              >查询</Button>
            </FormItem>
          </i-col>
        </Row>
      </Form>
    </Card>
    <SourceCard :cardDatas="cardDatas" />
    <Page
      :current="current"
      :total="total"
      :page-size="pageSize"
      :page-size-opts="pageSizeOpts"
      size="small"
      :show-total="true"
      :show-elevator="true"
      :show-sizer="true"
      :transfer="false"
      style="margin-top: 20px;margin-bottom: 20px;text-align: center;"
      @on-change="onCardPageChange"
      @on-page-size-change="onCardPageSizeChange"
    />
  </div>
</template>

<script>
import * as api from "@/api/fictitiousPowerPlant/common/mainview-data.js";
import * as sourcelist from "@/api/fictitiousPowerPlant/sourcelist/mainview-data.js";
import { formatDate, arrToMap } from "@/libs/index";
import "@/view/fictitiousPowerPlant/sourceList/sourceList.less";
import SourceCard from "./sourceCard.vue";

export default {
  name: "source-list",
  components: {
    SourceCard,
  },
  props: {},
  data() {
    return {
      mainHeight: "height: 820px;",
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
        userName: "",
        startDate: "",
        endDate: "",
        medicalGroupName: "",
        medicalGroupNo: "",
        connector: "",
        medicalGroupType: "",
        medicalGroupProperty: "",
        isOnline: "",
        ownArea: "",
        minLoad: "",
        maxLoad: "",
      },
      medicalGroupTypes: [{ value: "all", name: "全部" }],
      unitTypeMaps: {},
      medicalGroupProperties: [{ value: "all", name: "全部" }],
      unitPropertiesMaps: {},
      isOnlineTypes: [{ value: "all", name: "全部" }],
      isOnlineMaps: {},
      ownAreas: [{ areaNo: "all", areaName: "全部" }],
      ownAreasMaps: {},
      minLoads: [{ value: "all", name: "全部" }],
      maxLoads: [{ value: "all", name: "全部" }],
      ruleValidate: {
        // startDate: [
        //   { required: true, message: '接入开始时间不能为空', trigger: 'blur' }
        // ],
        // endDate: [
        //   { required: true, message: '接入结束时间不能为空', trigger: 'blur' }
        // ]
      },
      cardDatas: [],
      current: 1,
      total: 0,
      pageSizeOpts: [3, 6, 9],
      pageSize: 3,
      loading: false,
      cardAjaxData: {},
    };
  },
  mounted() {
    this.changeHeight();
    this.getUnitTypes();
    this.getUnitProperties();
    this.getMinLoads();
    this.getMaxLoads();
    this.getIsOnline();
    this.getAreaList();
    let that = this;
    setTimeout(that.topPanelQuery(), 50);
    window.onresize = () => {
      return (() => {
        that.changeHeight();
      })();
    };
  },
  methods: {
    changeStartDate(date) {
      this.searchBarForm.startDate = date;
    },
    changeEndDate(date) {
      this.searchBarForm.endDate = date;
    },
    topPanelQuery: function (name = "searchBarForm") {
      let _this = this;
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (_this.loading) {
            return;
          }
          _this.loading = true;
          _this.cardAjaxData = _this.cloneSearch();
          _this.current = 1;
          _this.cardAjaxData.currPage = 1;
          _this.cardAjaxData.pageSize = _this.pageSize;
          _this.getFormatCardData();
        } else {
          _this.$Message.error("请补充查询条件!");
        }
      });
    },
    getFormatCardData() {
      var _this = this;
      this.cardDatas = [];
      sourcelist
        .getSourceList(_this.cardAjaxData)
        .then((res) => {
          let list = res.data.data.list;
          _this.total = res.data.data.totalCount;
          if (typeof list !== "undefined" && list !== null && list.length > 0) {
            let arr = [];
            for (let index = 0; index < list.length; index++) {
              if (index === _this.pageSize) {
                break;
              }
              if (_this.unitTypeMaps.size !== undefined) {
                list[index].unitType = _this.unitTypeMaps.get(
                  list[index].unitType
                );
              }
              if (_this.unitPropertiesMaps.size !== undefined) {
                list[index].unitAttr = _this.unitPropertiesMaps.get(
                  list[index].unitAttr
                );
              }
              if (_this.ownAreasMaps.size !== undefined) {
                list[index].areaName = _this.ownAreasMaps.get(
                  list[index].areaNo
                );
              }
              if (_this.isOnlineMaps.size !== undefined) {
                list[index].isOnline =
                  _this.isOnlineMaps.get(list[index].isOnline) === "是"
                    ? "01"
                    : _this.isOnlineMaps.get(list[index].isOnline) === "否"
                    ? "02"
                    : "03";
              }
              if (index !== 0 && index % 3 === 0) {
                _this.cardDatas.push(arr);
                arr = [];
              }
              arr.push(list[index]);
            }
            if (arr.length > 0) {
              _this.cardDatas.push(arr);
            }
          }
          _this.loading = false;
        })
        .catch((err) => {
          _this.$Message.error("查询失败！");
          _this.loading = false;
        });
    },
    onCardPageChange(current) {
      this.current = current;
      if (this.cardAjaxData !== {}) {
        this.cardAjaxData.currPage = current;
        this.cardAjaxData.pageSize = this.pageSize;
        this.getFormatCardData();
      } else {
        this.topPanelQuery();
      }
    },
    onCardPageSizeChange(size) {
      this.pageSize = size;
    },
    getUnitTypes() {
      let _this = this;
      api
        .getDropDownDatas({
          type: "UNIT_TYPE",
        })
        .then((res) => {
          let list = res.data.data;
          if (typeof list !== "undefined" && list !== null && list.length > 0) {
            _this.medicalGroupTypes = _this.medicalGroupTypes.concat(list);
          }
          _this.unitTypeMaps = arrToMap(list);
        })
        .catch((err) => {
          _this.$Message.error("下拉框查询失败！");
        });
    },
    getUnitProperties() {
      let _this = this;
      api
        .getDropDownDatas({
          type: "UNIT_ATTR",
        })
        .then((res) => {
          let list = res.data.data;
          if (typeof list !== "undefined" && list !== null && list.length > 0) {
            _this.medicalGroupProperties = _this.medicalGroupProperties.concat(
              list
            );
          }
          _this.unitPropertiesMaps = arrToMap(list);
        })
        .catch((err) => {
          _this.$Message.error("下拉框查询失败！");
        });
    },
    getMinLoads() {
      let _this = this;
      api
        .getDropDownDatas({
          type: "ADJ_DOWN_LIMIT",
        })
        .then((res) => {
          let list = res.data.data;
          if (typeof list !== "undefined" && list !== null && list.length > 0) {
            _this.minLoads = _this.minLoads.concat(list);
          }
        })
        .catch((err) => {
          _this.$Message.error("下拉框查询失败！");
        });
    },
    getMaxLoads() {
      let _this = this;
      api
        .getDropDownDatas({
          type: "ADJ_UP_LIMIT",
        })
        .then((res) => {
          let list = res.data.data;
          if (typeof list !== "undefined" && list !== null && list.length > 0) {
            _this.maxLoads = _this.maxLoads.concat(list);
          }
        })
        .catch((err) => {
          _this.$Message.error("下拉框查询失败！");
        });
    },
    getIsOnline() {
      let _this = this;
      api
        .getDropDownDatas({
          type: "IS_ONLINE",
        })
        .then((res) => {
          let list = res.data.data;
          if (typeof list !== "undefined" && list !== null && list.length > 0) {
            _this.isOnlineTypes = _this.isOnlineTypes.concat(list);
          }
          _this.isOnlineMaps = arrToMap(list);
        })
        .catch((err) => {
          _this.$Message.error("下拉框查询失败！");
        });
    },
    getAreaList() {
      let _this = this;
      sourcelist
        .getAreaList({})
        .then((res) => {
          let list = res.data.data;
          if (typeof list !== "undefined" && list !== null && list.length > 0) {
            _this.ownAreas = _this.ownAreas.concat(list);
          }
          _this.ownAreasMaps = arrToMap(list, "areaNo", "areaName");
        })
        .catch((err) => {
          _this.$Message.error("下拉框查询失败！");
        });
    },
    cloneSearch() {
      let clone = {};
      let userName = this.searchBarForm.userName;
      let startDate = this.searchBarForm.startDate;
      let endDate = this.searchBarForm.endDate;
      let medicalGroupName = this.searchBarForm.medicalGroupName;
      let medicalGroupNo = this.searchBarForm.medicalGroupNo;
      let connector = this.searchBarForm.connector;
      let medicalGroupType = this.searchBarForm.medicalGroupType;
      let medicalGroupProperty = this.searchBarForm.medicalGroupProperty;
      let isOnline = this.searchBarForm.isOnline;
      let ownArea = this.searchBarForm.ownArea;
      let minLoad = this.searchBarForm.minLoad;
      let maxLoad = this.searchBarForm.maxLoad;
      clone.ownerName = userName;
      clone.accessStartTime = startDate;
      clone.accessEndTime = endDate;
      clone.unitName = medicalGroupName;
      clone.unitNo = medicalGroupNo;
      clone.contactName = connector;
      clone.unitType = medicalGroupType;
      clone.unitAttr = medicalGroupProperty;
      clone.isOnline = isOnline;
      clone.areaNo = ownArea;
      clone.adjDownlimit = minLoad;
      clone.adjUplimit = maxLoad;
      return clone;
    },
    changeHeight: function () {
      this.mainHeight = "height: " + (window.innerHeight - 140) + "px";
    },
  },
  watch: {},
  beforeDestroy() {},
};
</script>
