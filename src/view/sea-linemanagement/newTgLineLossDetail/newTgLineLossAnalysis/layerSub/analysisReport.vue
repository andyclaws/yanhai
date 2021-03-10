<template>
  <div class="analysis-report">
    <div class="flex-jcsb-ac title">
      <p>分析结果</p>
      <div class="flex-jcsb-ac">
        <!--<label>时间维度：<span style="color: red;">*</span></label>
        <RadioGroup v-model="dateType">
          <Radio label="日"></Radio>
          <Radio label="月"></Radio>
        </RadioGroup>
        <label>分析日期：</label>
        <DatePicker v-show="dateType === '日'" type="date" :value="analysisDate" @on-change="analysisDateChange" placeholder="请选择日期" style="width: 200px;margin-right: 5px;"></DatePicker>
        <DatePicker v-show="dateType === '月'" type="month" :value="analysisDate" @on-change="analysisDateChange" placeholder="请选择月份" style="width: 200px;margin-right: 5px;"></DatePicker>
        <Button type="primary" @click="analysisQuery">查询</Button>-->
      </div>
    </div>
    <div class="content">
      <div style="height: auto;">
        <p>结论：</p>
        <p class="content-detail">该台区下辖用户数<span>{{seaModelItem.tgHomeNum?seaModelItem.tgHomeNum:'--'}}</span>户，
          线损率<span>{{seaModelItem.lllr?seaModelItem.lllr:'--'}}%</span>，
          采集成功率<span>{{seaModelItem.readSuccRate?seaModelItem.readSuccRate:'--'}}%</span>，
          采集覆盖率<span>{{seaModelItem.coverMetRate?seaModelItem.coverMetRate:'--'}}%</span>。</p>
        <!-- <p class="content-detail">该台区下辖用户数<span>20</span>户，线损率<span>XXX</span>，采集成功率<span>XXX</span>，采集覆盖率<span>XXX</span>。</p>
        <p class="content-detail">台区健康评分=4/8*线损率+2/8*采集成功率+2/8*采集覆盖率。</p>
        <p class="content-detail">该台区健康评价分<span>78</span>分，在该台区经理的50个台区中，排名第<span>12</span>位。</p> -->
        <p class="content-detail">{{analysisHtml}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from '@/libs/api.request'
export default {
  name: 'analysisReport',
  components: {
    axios
  },
  props: ['seaModelItem'],
  data () {
    return {
      analysisResult: [
        { key: '1', value: '1.采集质量提升：采集成功率较低。' },
        { key: '2', value: '2.零电量用户：零电量5户，累计发生20次。' },
        { key: '3', value: '3.计量异常排查：倒走3户，计量失准2户。' }
      ],
      dateType: '日',
      analysisDate: '',
      analysisHtml: ''
    }
  },
  methods: {
    analysisDateChange (value) {
      this.analysisDate = value
    },
    analysisQuery () {
      axios.request({
        method: 'post',
        data: {
          analysisDate: this.analysisDate,
          tgId: this.seaModelItem.tgId
        },
        url: '/sea-lineLose/tgLineLoseDetail/analysisReport/analysisResult'
      }).then(res => {
        if (res.status === 200 && res.data.data) {
          this.analysisHtml = res.data.data.html
        } else {
          this.$Message.success('查询失败!')
        }
      })
    }
  }
}
</script>
<style lang="less">
.analysis-report{
  .title{
    height: 36px;
    line-height: 36px;
    padding: 0 10px;
    background: linear-gradient(180deg, rgba(252, 252, 252, 1) 0%, rgba(252, 252, 252, 1) 0%, rgba(246, 246, 246, 1) 100%, rgba(246, 246, 246, 1) 100%);
    box-sizing: border-box;
    border: 1px solid rgba(226, 226, 226, 1);
    border-radius: 4px;
    p{
      font-size: 16px;
      font-weight: 700;
    }
  }
  .content{
    margin-top: 10px;
    padding: 10px;
    height: 100%;
    border: 1px solid rgba(226, 226, 226, 1);
    p{
      color: #448c86;
    }
    .content-detail{
      margin-left: 15px;
      line-height: 30px;
      border-bottom: 1px solid rgba(226, 226, 226, 1);
      color: #666666;
      word-break: break-all;
      span{
        color: #448c86;
        font-weight: 700;
      }
    }
  }
}
</style>
