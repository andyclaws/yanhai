<template>
  <div>
    <input v-if="searchAble" type="text" :id="keyId" v-model="searchValue" clearable/>
    <div :style="myStyle">
      <ul :id="treeId" class="ztree"></ul>
    </div>
  </div>
</template>

<script>
import { fuzzySearch } from './fuzzysearch'
export default {
  name: 'trees',
  props: {
    myStyle: {
      type: Object
    },
    treeId: {
      type: String,
      default: 'treeDemo'
    },
    keyId: {
      type: String,
      default: 'key'
    },
    searchAble: {
      type: Boolean,
      default: true
    },
    setting: {},
    zNodes: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      searchValue: ''
    }
  },
  methods: {
    init (zNodes) {
      $.fn.zTree.init($('#' + this.treeId + ''), this.setting, zNodes || this.zNodes)
      if (this.searchAble) { fuzzySearch('treeDemo', '#' + this.keyId, null, true) }
    }
  }
}
</script>

<style lang="less">
@import "less/bootstrapStyle";
</style>
