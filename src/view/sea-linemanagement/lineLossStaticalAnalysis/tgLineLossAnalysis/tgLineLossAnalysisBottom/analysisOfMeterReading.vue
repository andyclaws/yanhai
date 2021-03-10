<template>
  <div class="analysis-of-meter-reading">
    <div class="demo-split">
      <Split v-model="split1">
        <div slot="left" class="demo-split-pane">
          <analysis-of-meter-reading-left></analysis-of-meter-reading-left>
        </div>
        <div slot="right" class="demo-split-pane">
          <analysis-of-meter-reading-right></analysis-of-meter-reading-right>
        </div>
      </Split>
    </div>
  </div>
</template>

<script>
import analysisOfMeterReadingLeft from './analysisOfMeterReading/analysisOfMeterReadingLeft.vue'
import analysisOfMeterReadingRight from './analysisOfMeterReading/analysisOfMeterReadingRight.vue'
export default {
  name: 'analysisOfMeterReading',
  data () {
    return {
      split1: 0.5
    }
  },
  components: {
    analysisOfMeterReadingLeft,
    analysisOfMeterReadingRight
  }
}
</script>

<style lang="less">
  .analysis-of-meter-reading .demo-split{
    height: 351.93px;
    border: 1px solid #dcdee2;
  }
  .analysis-of-meter-reading .demo-split-pane{
    padding: 10px;
  }
</style>
