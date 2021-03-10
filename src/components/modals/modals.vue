<template>
  <Modal
    ref="modalsMain"
    v-model="insideValue"
    :title="title"
    :closable="closable"
    :mask-closable="maskClosable"
    :loading="loading"
    :scrollable="scrollable"
    :fullscreen="fullScreen"
    :draggable="draggable"
    :mask="mask"
    :ok-text="okText"
    :cancel-text="cancelText"
    :width="width"
    :footer-hide="footerHide"
    :styles="styles"
    :class-name="className"
    :z-index="zIndex"
    :transition-names="transitionNames"
    :transfer="transfer"
    @on-ok="onOk"
    @on-cancel="onCancel"
    @on-visible-change="onVisibleChange"
  >
    <slot name="header" slot="header" v-if="fullScreenAble">
      <b>{{title}}</b>
      <span style="float: right; padding: 3px 25px; font-size: 14px">
        <Icon v-if="!fullScreen" type="md-expand" style="cursor: pointer" @click="() => this.fullScreen = true"/>
        <Icon v-if="fullScreen" type="md-contract" style="cursor: pointer" @click="() => this.fullScreen = false"/>
      </span>
    </slot>
    <slot name="header" slot="header" v-if="!fullScreenAble"></slot>
    <slot name="footer" slot="footer"></slot>
    <slot name="close" slot="close"></slot>
    <slot></slot>
  </Modal>
</template>

<script>
export default {
  name: 'modals',
  props: {
    value: {
      type: Boolean,
      default () {
        return false
      }
    },
    title: {
      type: String
    },
    closable: {
      type: Boolean,
      default () {
        return true
      }
    },
    maskClosable: {
      type: Boolean,
      default () {
        return false
      }
    },
    loading: {
      type: Boolean,
      default () {
        return false
      }
    },
    scrollable: {
      type: Boolean,
      default () {
        return false
      }
    },
    fullscreen: {
      type: Boolean,
      default () {
        return false
      }
    },
    draggable: {
      type: Boolean,
      default () {
        return false
      }
    },
    mask: {
      type: Boolean,
      default () {
        return true
      }
    },
    okText: {
      type: String,
      default () {
        return '确定'
      }
    },
    cancelText: {
      type: String,
      default () {
        return '取消'
      }
    },
    width: {
      type: [Number, String],
      default () {
        return 520
      }
    },
    footerHide: {
      type: Boolean,
      default () {
        return false
      }
    },
    styles: {
      type: Object
    },
    className: {
      type: String
    },
    zIndex: {
      type: Number,
      default () {
        return 1000
      }
    },
    transitionNames: {
      type: Array,
      default () {
        return ['ease', 'fade']
      }
    },
    transfer: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  data () {
    return {
      fullScreen: false,
      fullScreenAble: false,
      insideValue: false
    }
  },
  methods: {
    onOk () {
      this.$emit('on-ok')
    },
    onCancel () {
      this.$emit('on-cancel')
    },
    onVisibleChange (val) {
      this.$emit('on-visible-change', val)
      if (!val) { this.$emit('on-cancel') }
    },
    handleData () {
      this.insideValue = this.value
      if (this.draggable) { this.fullScreenAble = false } else { this.fullScreenAble = this.fullscreen }
    }
  },
  watch: {
    value () {
      this.handleData()
    }
  }
}
</script>

<style scoped>

</style>
