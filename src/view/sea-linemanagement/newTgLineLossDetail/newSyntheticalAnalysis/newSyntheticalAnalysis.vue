<template>
  <div class="new-synthetical-analysis">
    <line-loss-model-defend></line-loss-model-defend>
    <div class="menu-bottom">
      <div class="buttonBoxDiv buttonBoxImgMenuBackground" @click="linkBoxFlag=!linkBoxFlag">
        <img class="buttonBoxImgMenu" src="../../images/u48802.png" alt="菜单"></img>
      </div>
      <div class="linkBox" v-show="linkBoxFlag">
        <div @click="linkBoxFlag=!linkBoxFlag" class="comprehensive selected">
          <div>
            <img src="../../images/u48815.png"/>
          </div>
          线损模型维护
        </div>
        <div class="tg-line-loss" @click="changeMenu">
          <div>
            <img src="../../images/u48824.png"/>
          </div>
          台区线损分析
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import lineLossModelDefend from './lineLossModelDefend.vue'
export default {
  name: 'newSyntheticalAnalysis',
  components: {
    lineLossModelDefend
  },
  data () {
    return {
      linkBoxFlag: false
    }
  },
  methods: {
    changeMenu () {
      this.linkBoxFlag = false
      this.$router.push({ path: 'newTgLineLossAnalysis' })
    }
  }
}
</script>

<style lang="less">
@import url('../newTgLineLossAnalysis/newTgLineLossAnalysis');
.new-synthetical-analysis{
  width: 100%;
  height: 100%;
  .menu-bottom{
    position: fixed;
    right: 3%;
    bottom: 10%;
    z-index: 1000;
  }
}
</style>
