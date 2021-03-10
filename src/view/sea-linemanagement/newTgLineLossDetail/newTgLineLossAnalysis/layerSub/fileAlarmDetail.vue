<template>
  <!--04：档案异常-->
  <div class="fileAlarmDetail">
    <card class="my-card">
      <Row>
        <Col span="8">
          <p>1.台区无考核计量点：<span @click="tableDetail('00150')">{{errorData.num00150}}</span></p>
        </Col>
        <Col span="8">
          <p>2.台区有多个考核计量点：<span @click="tableDetail('00151')">{{errorData.num00151}}</span></p>
        </Col>
        <Col span="8">
          <p>3.计量点异常：<span @click="tableDetail('00152')">{{errorData.num00152}}</span></p>
        </Col>
      </Row>
      <Row>
        <Col span="8">
          <p>4.倍率异常：<span @click="tableDetail('00153')">{{errorData.num00153}}</span></p>
        </Col>
        <Col span="8">
          <Button type="primary" @click="tableDetail('')">查询全部</Button>
        </Col>
      </Row>
    </card>
    <tables ref="tables" editable :columns="columns" :height="tableHeight - 50" :axiosUrl="axiosUrl" :axiosData="queryData" :filename="'档案异常明细表格'" />
  </div>
</template>
<script>
import Tables from '_c/tables'
import axios from '@/libs/api.request'
export default {
  name: 'fileAlarmDetail',
  props: ['queryData', 'axiosUrl'],
  components: {
    Tables,
    axios
  },
  data () {
    return {
      tableHeight: 500,
      columns: [
        {
          title: '台区管理单位',
          key: 'orgName',
          width: 150,
          sortable: true
        },
        {
          title: '台区名称',
          width: 150,
          key: 'tgName',
          sortable: true
        },
        {
          title: '台区编号',
          key: 'tgNo',
          width: 120,
          sortable: true
        },
        {
          title: '考核单元名称',
          key: 'checkUnitName',
          width: 150,
          sortable: true
        },
        {
          title: '台区经理',
          key: 'accountManagerName',
          width: 120,
          sortable: true
        },
        {
          title: '用户名称',
          width: 100,
          key: 'consName',
          sortable: true
        },
        {
          title: '用户编号',
          width: 100,
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
          key: 'consType',
          width: 140,
          sortable: true
        },
        {
          title: '电表条形码',
          key: 'meterBarcode',
          width: 150,
          sortable: true
        },
        {
          title: '电表资产号',
          key: 'assetNo',
          width: 150,
          sortable: true
        },
        {
          title: '电表倍率',
          key: 'mfactor',
          width: 150,
          sortable: true
        },
        {
          title: '正向有功起码',
          key: 'papRS',
          width: 150,
          sortable: true
        },
        {
          title: '正向有功止码',
          key: 'papRE',
          width: 150,
          sortable: true
        },
        {
          title: '正向有功电量',
          key: 'papE',
          width: 150,
          sortable: true
        },
        {
          title: '反向有功起码',
          key: 'rapRS',
          width: 150,
          sortable: true
        },
        {
          title: '反向有功止码',
          key: 'rapRE',
          width: 150,
          sortable: true
        },
        {
          title: '反向有功电量',
          key: 'rapE',
          width: 150,
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
        num00150: 0,
        num00151: 0,
        num00152: 0,
        num00153: 0
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
.fileAlarmDetail{
  .my-card{
    margin-bottom: 10px;
    height: 80px;
    line-height: 30px;
    padding: 0 40px;
    .ivu-card-body{
      display: block;
      justify-content: space-between;
    }
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
