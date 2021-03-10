<!--<template>-->
  <!--<div class="spqDetail">-->
    <!--<Tables-->
        <!--class="detail"-->
        <!--ref="tables"-->
        <!--height="370"-->
        <!--v-model="tableData"-->
        <!--:columns="columns"-->
        <!--:current="current"-->
        <!--:total="spqTotalCount"-->
        <!--:pageSizeOpts="pageSizeOpts"-->
        <!--:pageSize="pageSize"-->
        <!--:bottomTools="bottomTools"-->
        <!--@on-change="pageChange"-->
        <!--@on-page-change="pageChange"-->
      <!--&gt;-->
    <!--</Tables>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
<!--import Tables from '_c/tables'-->
<!--import axios from 'axios'-->
<!--export default {-->
  <!--name: 'spqDetail',-->
  <!--components: {-->
    <!--Tables,-->
    <!--axios-->
  <!--},-->
  <!--props: {-->
    <!--spqDetailData: {-->
      <!--type: Array,-->
      <!--default () {-->
        <!--return []-->
      <!--}-->
    <!--},-->
    <!--spqTotalCount: {-->
      <!--type: Number,-->
      <!--default: 0-->
    <!--},-->
    <!--spqTgStatus: {-->
      <!--type: String,-->
      <!--default: ''-->
    <!--},-->
    <!--tgNo: {-->
      <!--type: String,-->
      <!--default: ''-->
    <!--}-->
  <!--},-->
  <!--data () {-->
    <!--return {-->
      <!--tableData: [],-->
      <!--columns: [-->
        <!--{-->
          <!--title: '用户编号',-->
          <!--width: 120,-->
          <!--key: 'consNo'-->
        <!--},-->
        <!--{-->
          <!--title: '用户名称',-->
          <!--width: 120,-->
          <!--key: 'consName'-->
        <!--},-->
        <!--{-->
          <!--title: '用户类型',-->
          <!--width: 120,-->
          <!--key: 'consType'-->
        <!--},-->
        <!--{-->
          <!--title: '终端地址',-->
          <!--width: 120,-->
          <!--key: 'tmnlAddr'-->
        <!--},-->
        <!--{-->
          <!--title: '总分表标识',-->
          <!--width: 120,-->
          <!--key: 'calcMode'-->
        <!--},-->
        <!--{-->
          <!--title: '数据时间',-->
          <!--width: 120,-->
          <!--key: 'statDate'-->
        <!--},-->
        <!--{-->
          <!--title: '起码值(正向)',-->
          <!--width: 120,-->
          <!--key: 'papRS'-->
        <!--},-->
        <!--{-->
          <!--title: '止码值(正向)',-->
          <!--width: 120,-->
          <!--key: 'papRE'-->
        <!--},-->
        <!--{-->
          <!--title: '电量值(正向)',-->
          <!--width: 120,-->
          <!--key: 'rapS'-->
        <!--},-->
        <!--{-->
          <!--title: '起码值(反向)',-->
          <!--width: 120,-->
          <!--key: 'rapRS'-->
        <!--},-->
        <!--{-->
          <!--title: '止码值(反向)',-->
          <!--width: 120,-->
          <!--key: 'rapRE'-->
        <!--},-->
        <!--{-->
          <!--title: '电量值(反向)',-->
          <!--width: 120,-->
          <!--key: 'rapE'-->
        <!--},-->
        <!--{-->
          <!--title: '售电量',-->
          <!--width: 120,-->
          <!--key: 'spq'-->
        <!--},-->
        <!--{-->
          <!--title: '修复售电量',-->
          <!--width: 120,-->
          <!--key: 'spqRepair'-->
        <!--},-->
        <!--{-->
          <!--title: '主用途类型',-->
          <!--width: 120,-->
          <!--key: 'usageTypeName'-->
        <!--},-->
        <!--{-->
          <!--title: '综合倍率',-->
          <!--width: 120,-->
          <!--key: 'tfactory'-->
        <!--},-->
        <!--{-->
          <!--title: '电表资产号',-->
          <!--width: 120,-->
          <!--key: 'assetNo'-->
        <!--},-->
        <!--{-->
          <!--title: '测量点号',-->
          <!--width: 120,-->
          <!--key: 'mpSn'-->
        <!--},-->
        <!--{-->
          <!--title: '条形码',-->
          <!--width: 120,-->
          <!--key: 'barCode'-->
        <!--}-->
      <!--],-->
      <!--current: 1,-->
      <!--pageSizeOpts: [2, 10, 20, 30, 40, 100],-->
      <!--pageSize: 2,-->
      <!--bottomTools: ['page', 'export']-->
    <!--}-->
  <!--},-->
  <!--watch: {-->
    <!--spqDetailData () {-->
      <!--this.tableData = this.spqDetailData-->
    <!--}-->
  <!--},-->
  <!--methods: {-->
    <!--pageChange (current, pageSize) {-->
      <!--this.current = current-->
      <!--this.pageSize = pageSize-->
      <!--let url = '/sea-lineLose/custManagerAssess/querySpqDetail'-->
      <!--axios.post(url, {-->
        <!--'date': '',-->
        <!--'limit': this.pageSize,-->
        <!--'page': this.current,-->
        <!--'tgNo': this.tgNo,-->
        <!--'tgStatus': this.spqTgStatus-->
      <!--}).then(response => {-->
        <!--this.tableData = response.data.data.list[0]-->
      <!--}).catch(error => {-->
        <!--console.log(error)-->
      <!--})-->
    <!--}-->
  <!--}-->
<!--}-->
<!--</script>-->
<!--<style lang="less">-->

<!--</style>-->
