<template>
  <!--01：计量异常-->
  <div class="meteringAlarm">
    <card class="my-card">
      <Row>
        <Col span="6">
          <p>1.电能表停走：<span @click="tableDetail('00107')">{{errorData.num00107}}</span></p>
        </Col>
        <Col span="6">
          <p>2.电能表倒走：<span @click="tableDetail('00106')">{{errorData.num00106}}</span></p>
        </Col>
        <Col span="6">
          <p>3.电能表飞走：<span @click="tableDetail('00104')">{{errorData.num00104}}</span></p>
        </Col>
        <Col span="6">
          <p>4.电能表示值不平（费率不平衡）：<span @click="tableDetail('00103')">{{errorData.num00103}}</span></p>
        </Col>
      </Row>
      <Row>
        <Col span="6">
          <p>5.反向有功示值大于0（反向电量异常）：<span @click="tableDetail('00105')">{{errorData.num00105}}</span></p>
        </Col>
        <Col span="6">
          <p>6.时钟超差（电能表时钟异常）：<span @click="tableDetail('00108')">{{errorData.num00108}}</span></p>
        </Col>
        <Col span="6">
          <p>7.终端时钟异常：<span @click="tableDetail('00124')">{{errorData.num00124}}</span></p>
        </Col>
        <Col span="6">
          <Button type="primary" @click="tableDetail('')">查询全部</Button>
        </Col>
      </Row>
    </card>
    <tables ref="tables" editable :columns="columns" :height="tableHeight - 70" :axiosUrl="axiosUrl" :axiosData="queryData" :filename="'计量异常明细表格'" />
  </div>
</template>
<script>
import Tables from '_c/tables'
import axios from '@/libs/api.request'
export default {
  name: 'meteringAlarm',
  props: ['queryData', 'axiosUrl'],
  components: {
    Tables,
    axios
  },
  data () {
    return {
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
        num00107: 0,
        num00106: 0,
        num00104: 0,
        num00103: 0,
        num00105: 0,
        num00108: 0,
        num00124: 0
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
.meteringAlarm{
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
