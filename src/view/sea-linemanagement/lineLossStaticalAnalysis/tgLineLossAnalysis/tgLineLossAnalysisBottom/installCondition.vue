<template>
  <div class="install-condition">
    <div class="demo-split">
      <Split v-model="split1">
        <div slot="left" class="demo-split-pane">
          <install-condition-left></install-condition-left>
        </div>
        <div slot="right" class="demo-split-pane">
          <install-condition-right></install-condition-right>
        </div>
      </Split>
    </div>
  </div>
</template>

<script>
import installConditionLeft from './installCondition/installConditionLeft.vue'
import installConditionRight from './installCondition/installConditionRight.vue'
export default {
  name: 'installCondition',
  data () {
    return {
      split1: 0.5
    }
  },
  components: {
    installConditionLeft,
    installConditionRight
  }
}
</script>

<style lang="less">
  .install-condition .demo-split{
    height: 351.93px;
    border: 1px solid #dcdee2;
  }
  .install-condition .demo-split-pane{
    padding: 10px;
  }
</style>
