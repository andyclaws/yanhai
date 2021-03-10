<template>
  <div>
    <Row>
      <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
        <i-col :span="24/cardRowNum" v-for="(item,index) in cardList" :key="index">
          <Card shadow style="margin:5px;">
            <p slot="title" style="font-weight:bold;color:#1EAFAA;">
              <Checkbox :label="index" v-if="checkable===true">&nbsp;</Checkbox>
              <Icon :type="titleIcon" @click="changeAllShow(index)" />
              {{item.title}}
            </p>
            <a
              href="#"
              slot="extra"
              @click.prevent="clickTitle(item.method,item)"
              v-if="item.method!=null&&item.method!=''"
            >
              {{item.eventName}}
              <Icon :type="item.icon" />
            </a>
            <CellGroup>
              <Row>
                <i-col :span="24/cellRowNum" v-for="(citem,cindex) in item.cellList" :key="cindex">
                  <Cell
                    :to="citem.to==null?null:({path:citem.to,query:cellParam(citem.key,item.data)})"
                    style="margin-left:10px;"
                    v-show="cindex<=4*cellRowNum+1||allShow"
                  >
                    <span style="font-weight:bold;font-size:10px;">{{citem.title+" :"}}</span>
                    <span slot="extra" style="font-size:8px;color:#009999;">
                      <Tooltip
                        v-if="detailExtraLength(citem.extra)"
                        placement="top"
                        theme="light"
                        max-width="500"
                      >
                        <span v-html="subExtra(citem.extra)"></span>
                        <span slot="content">{{detailExtra(citem.extra)}}</span>
                      </Tooltip>
                      <span v-else v-html="subExtra(citem.extra)"></span>
                    </span>
                  </Cell>
                </i-col>
              </Row>
            </CellGroup>
          </Card>
        </i-col>
      </CheckboxGroup>
    </Row>
  </div>
</template>

<script>
export default {
  name: 'CommonCard',
  props: {
    cardList: Array,
    checkable: false,
    cardRowNum: {
      type: Number,
      default: 2
    },
    cellRowNum: {
      type: Number,
      default: 2
    }
  },
  mounted () {
    this.checkAllGroup = []
  },
  methods: {
    /**
     * 截取cell里extra内容
     */
    subExtra (str) {
      if (str == null || str === 'null') {
        return ''
      } else {
        let pattern = new RegExp(/^\w{1,}$/)
        let s = str.substr(str.lastIndexOf('/>') + 2)
        let s20 = s.length > 20 ? s.substr(0, 20) + '...' : s.substr(0, 20)
        let s10 = s.length > 10 ? s.substr(0, 10) + '...' : s.substr(0, 10)
        return (
          str.substr(0, str.lastIndexOf('/>') + 2) +
          (pattern.test(s) ? s20 : s10)
        )
      }
    },
    /**
     * 截取tip内容
     */
    detailExtra (str) {
      if (str == null || str === 'null') {
        return ''
      } else {
        return str.indexOf('/>') > 0
          ? str.substr(str.lastIndexOf('/>') + 2)
          : str
      }
    },
    /**
     * 判断数字长度20，汉字长度10，是否展示tip
     */
    detailExtraLength (str) {
      if (str == null || str === 'null') {
        return false
      } else {
        let s = str.substr(str.lastIndexOf('/>') + 2)
        let pattern = new RegExp(/^\w{1,}$/)
        if (pattern.test(s)) {
          return s.length > 20 // 数字截取20位
        } else {
          return s.length > 10 // 汉字截取10位
        }
      }
    },
    cellParam (key, data) {
      if (data != null && key != null) {
        data.key = key
      }
      return data
    },
    clickTitle (method, item) {
      this.$emit(method, item)
    },
    changeAllShow (index) {
      this.allShow = !this.allShow
      this.currRow = parseInt(index / 2)
      if (this.titleIcon === 'ios-arrow-down') {
        this.titleIcon = 'ios-arrow-up'
      } else {
        this.titleIcon = 'ios-arrow-down'
      }
    },
    checkAllGroupChange (v) {
      this.$emit('checkboxGroupChange', v)
    },
    clearCheck () {
      this.checkAllGroup = []
    }
  },
  data () {
    return {
      currRow: 0,
      allShow: false,
      titleIcon: 'ios-arrow-down',
      checkAllGroup: []
    }
  },
  watch: {
    cardList: {
      deep: true,
      immediate: true,
      handler: function (newVal, oldVal) {
        this.cardList = newVal
        this.checkGroup = []
      }
    },
    checkable: {
      deep: true,
      immediate: true,
      handler: function (newVal, oldVal) {
        this.checkable = newVal
      }
    },
    cardRowNum: {
      deep: true,
      immediate: true,
      handler: function (newVal, oldVal) {
        if (newVal != null) {
          this.cardRowNum = newVal
        }
      }
    },
    cellRowNum: {
      deep: true,
      immediate: true,
      handler: function (newVal, oldVal) {
        if (newVal != null) {
          this.cellRowNum = newVal
        }
      }
    }
  }
}
</script>

<style scoped>
.ivu-cell {
  padding: 0px;
}
.ivu-cell:hover {
  background-color: white;
}
</style>
