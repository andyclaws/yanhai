<template>
  <!--05：疑似窃电-->
  <div class="stealingElecDetail">
    <card class="my-card">
      <p>1.零线与火线电流超差：<span @click="tableDetail('0011E')">{{errorData.num0011E}}</span></p>
    </card>
    <tables ref="tables" :height="tableHeight - 50" editable :columns="columns" :axiosUrl="axiosUrl" :axiosData="queryData" :filename="'疑似窃电户明细表格'" />
  </div>
</template>
<script>
import tables from '_c/tables'
import axios from '@/libs/api.request'
export default {
  name: 'stealingElecDetail',
  props: ['queryData', 'axiosUrl'],
  components: {
    tables,
    axios
  },
  data () {
    return {
      tableHeight: 500,
      columns: [
        {
          title: '台区管理单位',
          width: 120,
          key: 'orgName',
          sortable: true
        },
        {
          title: '台区名称',
          width: 120,
          key: 'tgName',
          sortable: true
        },
        {
          title: '台区编号',
          width: 120,
          key: 'tgNo',
          sortable: true
        },
        {
          title: '考核单元名称',
          width: 120,
          key: 'checkUnitName',
          sortable: true
        },
        {
          title: '台区经理',
          width: 120,
          key: 'accountManagerName',
          sortable: true
        },
        {
          title: '用户名称',
          width: 120,
          key: 'consName',
          sortable: true
        },
        {
          title: '用户编号',
          width: 120,
          key: 'consNo',
          sortable: true
        },
        {
          title: '异常类型',
          key: 'abnormalName',
          width: 150,
          sortable: true
        },
        {
          title: '异常发生次数',
          key: 'abnormalCnt',
          width: 150,
          sortable: true
        },
        {
          title: '用户类型',
          width: 120,
          key: 'consType',
          sortable: true
        },
        {
          title: '电表条形码',
          width: 120,
          key: 'meterBarcode',
          sortable: true
        },
        {
          title: '电表资产号',
          width: 120,
          key: 'assetNo',
          sortable: true
        },
        {
          title: '电表倍率',
          width: 120,
          key: 'mfactor',
          sortable: true
        },
        {
          title: '正向有功起码',
          width: 120,
          key: 'papRS',
          sortable: true
        },
        {
          title: '正向有功止码',
          width: 120,
          key: 'papRE',
          sortable: true
        },
        {
          title: '正向有功电量',
          width: 120,
          key: 'papE',
          sortable: true
        },
        {
          title: '反向有功起码',
          width: 120,
          key: 'rapRS',
          sortable: true
        },
        {
          title: '反向有功止码',
          width: 120,
          key: 'rapRE',
          sortable: true
        },
        {
          title: '反向有功电量',
          width: 120,
          key: 'rapE',
          sortable: true
        },
        {
          title: '数据日期',
          key: 'dataDate',
          width: 150,
          sortable: true
        }
      ],
      errorData: {
        num0011E: 0
      }
    }
  },
  methods: {
    tableDetail (num) {
      this.queryData['alarmCode'] = num
      this.$nextTick(() => {
        this.$refs.tables.queryTableData()
      })
    },
    tgExDetailCount () {
      if (Object.keys(this.queryData).length < 1) {
        return
      }
      axios.request({
        method: 'post',
        data: this.queryData,
        url: '/sea-lineLose/tgLineLoseDetail/tgExDetailCount'
      }).then(res => {
        if (res.status === 200 && res.data.data) {
          for (let k in this.errorData) {
            this.errorData[k] = 0
          }
          for (let i in res.data.data) {
            this.errorData[i] = res.data.data[i]
          }
        } else {
          this.$Message.success('查询失败!')
        }
      })
    },
    changeHeight () {
      this.tableHeight = window.innerHeight > 800 ? window.innerHeight - 300 : 500
    }
  },
  mounted () {
    let that = this
    window.onresize = () => {
      return (() => {
        that.changeHeight()
      })()
    }
  }
}
</script>
<style lang="less">
.stealingElecDetail{
  .my-card{
    margin-bottom: 20px;
    height: 60px;
    line-height: 60px;
    padding-left: 20px;
    p{
      font-size: 16px;
      color: #666666;
      span{
        text-decoration:underline;
        color:#FF0000;
        cursor: pointer;
      }
    }
  }
}
</style>
