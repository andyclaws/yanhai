<template>
  <div class="medicalGroupArea">
    <Row
      :gutter="6"
      v-for="(arrayItems, arrayIndex) in cardDatas"
      :key="arrayIndex"
      style="margin-bottom:6px;"
    >
      <i-col span="8" v-for="(item, index) in arrayItems" :key="index">
        <Card class="medicalGroupInfo">
          <div class="infoHeader">
            <span>机组:&nbsp;{{item.unitNo}}</span>
            <div class="goToIcon" @click="gotoDetail">
              <img src="./images/u2509.png" />
            </div>
          </div>
          <div class="infoImage">
            <img src="./images/u16470.png" />
            <!-- <img :src="item.medicalImage" /> -->
          </div>
          <div class="infoMain">
            <div class="infoBody">
              <!-- <div class="medicalName">{{item.name}}</div> -->
              <div class="baseInfo">
                <div class="infoTitle">基本信息</div>
                <Row class="marginControl" :gutter="6">
                  <i-col span="12">
                    <span class="infoItem">机组名称:</span>
                    <span class="infoValue">{{item.unitName}}</span>
                  </i-col>
                  <i-col span="12">
                    <span class="infoItem">所属区域:</span>
                    <span class="infoValue">{{item.areaName}}</span>
                  </i-col>
                </Row>
                <Row class="marginControl" :gutter="6">
                  <i-col span="12">
                    <span class="infoItem">所属业主:</span>
                    <span class="infoValue">{{item.ownerName}}</span>
                  </i-col>
                  <i-col span="12">
                    <span class="infoItem">联系人:</span>
                    <span class="infoValue">{{item.contactName}}</span>
                  </i-col>
                </Row>
                <Row class="marginControl" :gutter="6">
                  <i-col span="12">
                    <span class="infoItem">机组类型:</span>
                    <span class="infoValue">{{item.unitType}}</span>
                  </i-col>
                  <i-col span="12">
                    <span class="infoItem">联系电话:</span>
                    <span class="infoValue">{{item.phoneNumber}}</span>
                  </i-col>
                </Row>
                <Row class="marginControl" :gutter="6">
                  <i-col span="12">
                    <span class="infoItem">机组性质:</span>
                    <span class="infoValue">{{item.unitAttr}}</span>
                  </i-col>
                  <i-col span="12">
                    <span class="infoItem">接入时间:</span>
                    <span class="infoValue">{{item.accessTime}}</span>
                  </i-col>
                </Row>
              </div>
              <div class="runTimeInfo">
                <div class="infoTitle">运行信息</div>
                <div class="onlineStatus">
                  在线状态：
                  <span class="isOnline" v-if="item.isOnline === '01'">在线</span>
                  <span class="isOutline" v-if="item.isOnline === '02'">离线</span>
                  <span class="isUnkonwn" v-if="item.isOnline === '03'">未知</span>
                </div>
                <Row class="marginControl" :gutter="6">
                  <i-col span="12">
                    <span class="infoItem">实时负荷:</span>
                    <span class="infoValue">{{item.pRt * 1000}}kW</span>
                  </i-col>
                  <i-col span="12">
                    <span class="infoItem">可上调裕度:</span>
                    <span class="infoValue">{{item.adjUplimit}}kW</span>
                  </i-col>
                </Row>
                <Row class="marginControl" :gutter="6">
                  <i-col span="12">
                    <span class="infoItem">今日能耗:</span>
                    <span class="infoValue">{{item.energyConsumptionToday}}kWh</span>
                  </i-col>
                  <i-col span="12">
                    <span class="infoItem">可下调裕度:</span>
                    <span class="infoValue">{{item.adjDownlimit}}kW</span>
                  </i-col>
                </Row>
              </div>
              <div class="statisInfo">
                <div class="infoTitle">统计信息</div>
                <Row class="marginControl" :gutter="6">
                  <i-col span="12">
                    <span class="infoItem">累计发电量:</span>
                    <span class="infoValue">{{item.genCapAll}}kWh</span>
                  </i-col>
                  <i-col span="12">
                    <span class="infoItem">累计发电次数:</span>
                    <span class="infoValue">{{item.genCntAll}}</span>
                  </i-col>
                </Row>
                <Row class="marginControl" :gutter="6">
                  <i-col span="12">
                    <span class="infoItem">结算金额:</span>
                    <span class="infoValue">{{item.settleAll}}元</span>
                  </i-col>
                </Row>
              </div>
            </div>
          </div>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script>
import '@/view/fictitiousPowerPlant/sourceList/sourceList.less'

export default {
  name: 'source-card',
  components: {},
  props: {
    cardDatas: Array
  },
  data () {
    return {
      unitNo: ''
    }
  },
  mounted () {},
  methods: {
    gotoDetail () {
      var _this = this
      console.log(666, _this.cardDatas)
      _this.cardDatas.forEach((itemArray, index) => {
        itemArray.forEach((value, i) => {
          _this.unitNo = value.unitNo
        })
      })
      console.log(_this.unitNo)
      // TODO
      this.$router.push({
        name: 'machineDetails',
        query: {
          unitNo: _this.unitNo
        }
      })
    }
  },
  watch: {}
}
</script>
