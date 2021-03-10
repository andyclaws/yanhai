<template>
  <div class="miss-tree">
    <!--<div style="text-align: right">-->
      <!--<Button-->
        <!--:type="showRefreshText ? 'primary' : 'text'"-->
        <!--:loading="loadingData"-->
        <!--icon="md-refresh"-->
        <!--@click="initData">-->
        <!--<span v-if="showRefreshText">-->
          <!--<span v-if="!loadingData">{{$t('refresh')}}</span>-->
          <!--<span v-else>{{$t('loading')}}...</span>-->
        <!--</span>-->
      <!--</Button>-->
    <!--</div>-->
    <Tree
      ref="menuTree"
      :show-checkbox="showCheckbox"
      :data="data"
      :render="renderContent"
      :check-strictly="checkStrictly"
      @on-check-change="checkChange"
    ></Tree>
  </div>
</template>

<script>
import { menuTree } from '@/api/system/permission/menu-manage/menu-manage'
export default {
  name: 'Menu',
  props: {
    showRefreshText: {
      type: Boolean,
      default: true
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    checkStrictly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      menuType: 1,
      roleAttrId: null,
      loadingData: false,
      data: [],
      selected: []
    }
  },
  methods: {
    initData (type, roleAttrId) {
      this.menuType = type
      this.roleAttrId = roleAttrId === null || roleAttrId === undefined ? null : roleAttrId
      this.loadingData = true
      let data = {
        type: this.menuType,
        roleAttrId: this.roleAttrId
      }
      menuTree(data).then(res => {
        const data = res.data
        if (data.code === 200 && data.data) {
          this.data = data.data
          if (this.selected.length > 0) {
            this.data = this.checked(this.data, this.selected)
          }
        }
      }).catch(err => {
        console.log(err)
      })
      this.loadingData = false
    },
    showChecked (select) {
      this.selected = select
      this.initData(3)
    },
    checked (data, select) {
      // console.log('miss', data, select)
      let _this = this
      data.forEach(item => {
        select.forEach(s => {
          if (item.menuId === s) {
            item.checked = true
          }
        })
        if (item.children && item.children.length > 0) {
          _this.checked(item.children, select)
        }
      })
      return data
    },
    renderContent (h, { root, node, data }) {
      let icon_class = 'miss'
      let _this = this
      return h('span', {
        style: {
          display: 'inline-block',
          width: '100%'
        }
      }, [
        h('span', [
          h('span', {
            'class': [icon_class]
          }),
          h('span', {
            'class': ['cursor-point'],
            on: {
              click: () => {
                _this.click(data)
              }
            }
          }, data.name)
        ])
      ])
    },
    click (data) {
      this.$emit('on-select', data)
    },
    checkChange () {
      this.$emit('on-checkChange', this.$refs.menuTree.getCheckedNodes(), this.$refs.menuTree.getCheckedAndIndeterminateNodes())
    }
  }
}
</script>

<style>
  .cursor-point {
    cursor: pointer;
  }
</style>
