<template>
  <!--03：配变异常-->
  <div class="distributionTransformerAlarm">
    <card class="my-card">
      <Row>
        <Col span="6">
          <p>1.过载：<span @click="tableDetail('00115')">{{errorData.num00115}}</span></p>
        </Col>
        <Col span="6">
          <p>2.A相过载：<span @click="tableDetail('00130')">{{errorData.num00130}}</span></p>
        </Col>
        <Col span="6">
          <p>3.B相过载：<span @click="tableDetail('00131')">{{errorData.num00131}}</span></p>
        </Col>
        <Col span="6">
          <p>4.C相过载：<span @click="tableDetail('00132')">{{errorData.num00132}}</span></p>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <p>5.单相过载(过流)：<span @click="tableDetail('00113')">{{errorData.num00113}}</span></p>
        </Col>
        <Col span="6">
          <p>6.A相轻载：<span @click="tableDetail('00136')">{{errorData.num00136}}</span></p>
        </Col>
        <Col span="6">
          <p>7.B相轻载：<span @click="tableDetail('00137')">{{errorData.num00137}}</span></p>
        </Col>
        <Col span="6">
          <p>8.C相轻载：<span @click="tableDetail('00138')">{{errorData.num00138}}</span></p>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <p>9.电压三相不平衡：<span @click="tableDetail('00118')">{{errorData.num00118}}</span></p>
        </Col>
        <Col span="6">
          <p>10.电流三相不平衡：<span @click="tableDetail('00112')">{{errorData.num00112}}</span></p>
        </Col>
        <Col span="6">
          <Button type="primary" @click="tableDetail('')">查询全部</Button>
        </Col>
      </Row>
    </card>
    <tables ref="tables" editable :height="tableHeight - 80" :columns="columns" :axiosUrl="axiosUrl" :axiosData="queryData" :filename="'配变异常表格'" />
  </div>
</template>
<script>
import Tables from '_c/tables'
import axios from '@/libs/api.request'
export default {
  name: 'distributionTransformerAlarm',
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
        num00115: 0,
        num00130: 0,
        num00131: 0,
        num00132: 0,
        num00113: 0,
        num00136: 0,
        num00137: 0,
        num00138: 0,
        num00118: 0,
        num00112: 0
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
.distributionTransformerAlarm{
  .my-card{
    margin-bottom: 10px;
    height: 100px;
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
