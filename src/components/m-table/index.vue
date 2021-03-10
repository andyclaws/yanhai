<template>
  <div>
    <div class="buttonGroup">
      <slot name="toolButtons"></slot>
    </div>
    <Table
           :data="dataContent"
           :columns="columns"
           :size="size"
           :width="width"
           :height="height"
           :stripe="stripe"
           :border="border"
           :showHeader="showHeader"
           :highlightRow="highlightRow"
           :rowClassName="rowClassName"
           :context="context"
           :noDataText="noDataText"
           :noFilteredDataText="noFilteredDataText"
           :disabledHover="disabledHover"
           :loading="loading"
           @on-current-change="onCurrentChange"
           @on-select="onSelect"
           @on-select-cancel="onSelectCancel"
           @on-select-all="onSelectAll"
           @on-select-all-cancel="onSelectAllCancel"
           @on-selection-change="onSelectionChange"
           @on-sort-change="onSortChange"
           @on-filter-change="onFilterChange"
           @on-row-click="onRowClick"
           @on-row-dblclick="onRowDblclick"
           @on-expand="onExpand"></Table>
    <Page ref="paging" v-if="pagingOption.showPaging" :total="total" style="margin-top:5px;float: right"
          :show-total="pagingOption.showTotal"
          @on-change="getData"></Page>
  </div>
</template>

<script>
export default {
  name: 'data-table',
  data: function () {
    return {
      loading: false,
      current: 1,
      pageSize: 10,
      dataContent: [],
      total: 0,
      initPage: 1
    }
  },
  props: {
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    size: {
      default () {
        return !this.$IVIEW || this.$IVIEW.size === '' ? 'default' : this.$IVIEW.size
      }
    },
    width: {
      type: [Number, String]
    },
    stripe: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    highlightRow: {
      type: Boolean,
      default: false
    },
    rowClassName: {
      type: Function,
      default () {
        return ''
      }
    },
    context: {
      type: Object
    },
    noDataText: {
      type: String
    },
    noFilteredDataText: {
      type: String
    },
    disabledHover: {
      type: Boolean
    },
    height: {
      type: Number,
      default: 500
    },
    url: {
      type: String,
      require: true
    },
    pagingOption: {
      type: Object,
      default: function () {
        return {
          showPaging: true,
          showTotal: true
        }
      }
    },
    cols: {},
    checkBox: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    refresh () {
      this.getData(1)
    },

    getData (pageNum) {
      this.loading = true
      // this.$http.get(this.url, this.getPagingInfo(pageNum)).then(res => {
      //   this.dataContent = res.result.data
      //   this.total = res.result.total
      //   this.loading = false
      // })
      this.dataContent = [{
        remoteHost: 12
      }]
      this.total = 1
      this.loading = false
    },
    getPagingInfo (page) {
      const param = {
        current: page,
        pageSize: this.pageSize
      }
      return param
    },
    onSelect (selection) {
      this.$emit('onSelect', {
        selection: selection
      })
    }
  },
  mounted () {
    this.getData(this.initPage)
  },
  created () {
    if (this.checkBox) {
      this.cols.unshift({
        type: 'selection',
        width: 60,
        align: 'center'
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .margin(@border_width:10px) {
    margin-bottom: @border_width;
  }

  .buttonGroup {
    text-align: right;
    .margin(5px)
  }
</style>
