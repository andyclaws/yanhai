<template>
  <span>
    <Input v-if="isInput"
      search
      enter-button
      :placeholder="placeholder"
      @on-search="showSelectBox"
      @on-focus="showSelectBox"/>
    <Button v-else type="primary" @click="showSelectBox">{{buttonText}}</Button>
    <Modals
      v-model="showBox"
      :draggable="draggable"
      :footer-hide="footerHide"
      title="操作对象"
      width="800"
      :styles="{top: '30px'}"
      @on-cancel="showBox = false"
    >
      <div>
        <Tabs type="card">
          <TabPane label="供电单位" icon="logo-buffer" v-if="showOrg">
            <div :style="boxStyle">
              <org @on-select = 'onSelect'></org>
            </div>
          </TabPane>
          <TabPane label="用户" icon="md-person" v-if="showCons">
            <div :style="boxStyle">
              <cons :select-more="consSelectMore" @on-select = 'onSelect'></cons>
            </div>
          </TabPane>
          <TabPane label="终端" icon="md-apps" v-if="showTmnl">
            <div :style="boxStyle">
              <tmnl :select-more="tmnlSelectMore" @on-select = 'onSelect'></tmnl>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </Modals>
  </span>
</template>

<script>
import Modals from '../modals'
import Org from './components/org'
import Cons from './components/cons'
import Tmnl from './components/tmnl'
import { contains } from '@/libs'

export default {
  name: 'commonSelectBox',
  components: {
    Modals,
    Org,
    Cons,
    Tmnl
  },
  props: {
    placeholder: {
      type: String,
      default () {
        return '请选择'
      }
    },
    consSelectMore: {
      type: Boolean,
      default: false
    },
    tmnlSelectMore: {
      type: Boolean,
      default: false
    },
    // 可选参数 ['org', 'cons', 'tmnl']
    showComponents: {
      type: Array,
      default () {
        return []
      }
    },
    isInput: {
      type: Boolean,
      default: true
    },
    buttonText: {
      type: String,
      default () {
        return '高级筛选'
      }
    }
  },
  data () {
    return {
      showBox: false,
      draggable: true,
      footerHide: true,
      showOrg: false,
      showCons: false,
      showTmnl: false,
      boxStyle: {
        height: '500px',
        overflowY: 'auto'
      }
    }
  },
  methods: {
    showSelectBox () {
      this.showBox = true
    },
    calculateHeight () {
      this.boxStyle.height = window.screen.height - 400 + 'px'
    },
    onSelect (data) {
      this.$emit('on-select', data)
      this.showBox = false
    },
    initShowComponents () {
      this.showOrg = contains(this.showComponents, 'org')
      this.showCons = contains(this.showComponents, 'cons')
      this.showTmnl = contains(this.showComponents, 'tmnl')
    }
  },
  mounted () {
    this.calculateHeight()
    this.initShowComponents()
  }
}
</script>

<style scoped>
</style>
