<template>
    <div>
        <Cascader :data="data" :not-found-text=message
                @on-change=chioce :render-format=getOrgName
                  :clearable=false
                  placeholder="请输入供电单位"
                  ref="org"
        ></Cascader>
    </div>
</template>

<script>
import { queryOrgList } from './org.js'

export default {
  name: 'org',
  data () {
    return {
      data: [],
      message: '获取数据..'
    }
  },
  props: {
    orgNo: String,
    orgName: String
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      queryOrgList({ orgNo: this.orgNo }).then(res => {
        this.data = res.data.data
      })
      if (this.data == []) {
        this.message = '获取数据为空'
      }
    },
    chioce (value, selectedData) {
      for (var i = value.length - 1; i >= 0; i--) {
        if (value[i] != 0) {
          this.$emit('update:orgNo', value[i])
          break
        }
      }
      // selectedData.map(o => {//遍历json
      //     console.log(o.label)
      // })
      for (var i = selectedData.length - 1; i >= 0; i--) {
        if (selectedData[i] != '全部') {
          this.$emit('update:orgName', selectedData[i].label)
          break
        }
      }
    },
    getOrgName (value, selectedData) {
      // console.log(value,selectedData)
      for (var i = value.length - 1; i >= 0; i--) {
        if (value[i] != '全部') {
          return value[i]
        }
      }
    }
  },
  watch: {
    orgNo (newVal, oldVal) {
      if (newVal == '') {
        console.log(this.$refs.org.on - clear())
      }
    }
  }
}
</script>

<style scoped>

</style>
