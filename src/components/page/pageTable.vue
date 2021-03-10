<template>
  <div>
    <Table :data="orderList" :columns="columns" border max-height="600" stripe ref="selection" size="small"  @on-sort-change="sortChange"></Table>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total= total
              :current=current
              :page-size-opts="pagesizeopts"
              show-elevator show-total show-sizer
              @on-change="changePage"
              @on-page-size-change="pagesizechange"></Page>
      </div>
    </div>
  </div>
</template>
<script>
import expandRow from './rowMoreDate'
export default {
  name: 'pageTable',
  components: { expandRow },
  props: {
    orderList: {
      type: Array
    },
    columns: {
      type: Array
    },
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    order: {
      type: String
    },
    sortColumn: {
      type: String
    }
  },
  data () {
    return {
      params: '',
      pagesizeopts: [10, 20, 30, 40, 100]
    }
  },
  methods: {
    // 切换页面
    changePage (current) {
      this.$emit('selectTable', current)
    },
    pagesizechange: function (index) {
      this.$emit('pagesizechange', index)
    },
    sortChange (sortType) {
      this.$emit('update:sortColumn', this.toLine(sortType.key))
      this.$emit('update:order', sortType.order)
      this.$emit('selectTable', 1)
    },
    toLine (name) {
      return name.replace(/([A-Z])/g, '_$1').toUpperCase()
    }
  }
}
</script>
<style scoped>

</style>
