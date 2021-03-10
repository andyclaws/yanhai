<template>
  <div class="miss-card" @mouseover="mouseOver = true" @mouseout="mouseOver = false">
    <Card :id="uuid">
      <div class="miss-card-toolBox" v-show="mouseOver">
        <Icon class="miss-card-toolBox-button" size="18" type="md-crop" @click="saveToPic" />
        <Icon class="miss-card-toolBox-button" size="18" type="md-download" @click="saveToPdf" />
        <Icon class="miss-card-toolBox-button" size="18" type="md-expand" @click="fullScreenClick"/>
        <Tooltip v-if="help !== ''" :content="help">
          <Icon class="miss-card-toolBox-button" size="18" type="md-help" />
        </Tooltip>
      </div>
      <slot></slot>
    </Card>
    <Modal class="miss-card-fullScreen"
           :value="expand"
           :title="title"
           fullscreen
           footer-hide
           @on-cancel="cancelFullScreen">
      <div style="text-align: right">
        <Tooltip :content="'保存图片'">
          <Icon class="miss-card-toolBox-button" size="25" type="md-crop" @click="saveToPic" />
          <Icon class="miss-card-toolBox-button" size="25" type="md-download" @click="saveToPdf" />
        </Tooltip>
      </div>
      <slot></slot>
    </Modal>
  </div>
</template>

<script>
import { getUUID } from '@/libs'
import { savePic, savePdf } from '@/libs/exportUtil'
export default {
  name: 'index',
  props: {
    title: {
      type: String,
      default: ' '
    },
    help: {
      type: String,
      default: ''
    },
    exportFileName: {
      type: String,
      default: '用电信息采集系统数据'
    }
  },
  data () {
    return {
      mouseOver: false,
      expand: false,
      uuid: ''
    }
  },
  methods: {
    saveToPic () {
      this.$emit('on-save')
      this.showMsg('正在为您保存图片，请您耐心等待！')
      setTimeout(() => {
        let param = {
          id: this.uuid,
          exportFileName: this.exportFileName
        }
        savePic(param)
        this.$emit('on-saveEnd')
      }, 400)
    },
    saveToPdf () {
      this.$emit('on-save')
      this.showMsg('正在为您保存PDF，请您耐心等待！')
      setTimeout(() => {
        let param = {
          id: this.uuid,
          exportFileName: this.exportFileName
        }
        savePdf(param)
        this.$emit('on-saveEnd')
      }, 400)
    },
    showMsg (msg = '正在为您保存，请您耐心等待！') {
      this.$Message.info({
        duration: 3,
        content: msg
      })
    },
    initUuid () {
      this.uuid = getUUID().replace(/-/g, '')
      this.uuid = 'C' + this.uuid.substr(this.uuid.length - 12)
    },
    fullScreenClick () {
      this.expand = true
      this.$emit('on-fullScreen', true)
    },
    cancelFullScreen () {
      this.expand = false
      this.$emit('on-fullScreen', false)
    }
  },
  mounted () {
    this.initUuid()
  }
}
</script>

<style lang="less">
@import "index";
</style>
