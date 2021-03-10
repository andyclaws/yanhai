<template>
  <div>
    <Form :label-width="50">
      <Row>
        <Col :span="24">
          <FormItem label="筛选">
            <Input v-if="showFilter"
                   v-model="filterValue"
                   placeholder="请输入筛选名称"
                   clearable style="width: 130px"/>
          </FormItem>
        </Col>
      </Row>
    </Form>
    <Tree class="my-tree"
          :data="data"
          :multiple="multiple"
          :show-checkbox="showCheckbox"
          :empty-text="emptyText"
          :load-data="loadData"
          :render="render"
          :children-key="childrenKey"
          :check-strictly="checkStrictly"
          :check-directly="checkDirectly"
          @on-select-change="onSelectChange"
          @on-check-change="onCheckChange"
          @on-toggle-expand="onToggleExpand"
          ref="myTree"></Tree>
  </div>
</template>

<script>
import { deepCopy } from '@/libs/util'
export default {
  name: 'my-tree',
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    },
    showFilter: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    loadData: {
      type: Function,
      default () {
        return ''
      }
    },
    render: {
      type: Function,
      default () {
        return ''
      }
    },
    childrenKey: {
      type: String,
      default: 'children'
    },
    checkStrictly: {
      type: Boolean,
      default: false
    },
    checkDirectly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      filterValue: '',
      data: []
    }
  },
  methods: {
    onSelectChange (selectNode, currentNode) {
      console.log(selectNode, currentNode)
    },
    onCheckChange (checkNode, currentNode) {
      console.log(checkNode, currentNode)
    },
    onToggleExpand (currentNode) {
      console.log(currentNode)
    },
    getCheckedNodes () {
      return this.$refs.myTree.getCheckedNodes()
    },
    getSelectedNodes () {
      return this.$refs.myTree.getSelectedNodes()
    },
    getCheckedAndIndeterminateNodes () {
      return this.$refs.myTree.getCheckedAndIndeterminateNodes()
    },
    filter (value, filterValue) {
      let result = deepCopy(value)
      let hasChild = false
      result = result.map((item) => {
        if (item && item[this.childrenKey]) {
          item[this.childrenKey] = this.filter(item[this.childrenKey], filterValue)
          hasChild = true
        }
        item.expand = true
        return item
      })
      if (!hasChild) {
        result = result.filter((item) => {
          return item && item.title ? item.title.indexOf(filterValue) !== -1 : false
        })
      }
      return result
    },
    clearEmpty (value, filterValue) {
      // return value
      let result = deepCopy(value)
      result = result.filter((item) => {
        if (item && item[this.childrenKey] && item.title.indexOf(filterValue) === -1) {
          return item[this.childrenKey].length !== 0
        } else {
          return true
        }
      })
      // todo 多层递归
      // result = result.map((item) => {
      //   if (item && item[this.childrenKey]) {
      //     item[this.childrenKey] = this.clearEmpty(item[this.childrenKey])
      //   }
      //   return item
      // })
      return result
    },
    initData () {
      this.data = deepCopy(this.value)
    }
  },
  watch: {
    filterValue (value) {
      this.data = value === '' ? this.value : this.clearEmpty(this.filter(this.value, value), value)
    },
    value (val) {
      console.log('change')
      this.initData()
    }
  },
  mounted () {
    this.initData()
  }
}
</script>

<style type="less">
  .my-tree ul li {
    margin: 0;
  }
</style>
