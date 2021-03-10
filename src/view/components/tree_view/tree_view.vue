<template>
  <div>
    <Button @click="initTree">测试</Button>
    <Trees
      ref="zTrees"
      :search-able="searchAble"
      :setting="setting"
      :zNodes="zNodes"
      :treeId="treeId"
      :key-id="keyId"></Trees>
  </div>
</template>
<script>

import Trees from '_c/trees'
import config from '@/config'

export default {
  name: 'ztree',
  components: {
    Trees
  },
  data () {
    return {
      searchAble: true,
      treeId: 'treeDemo',
      keyId: 'key',
      perCount: 200,
      perTime: 100,
      setting: {
        async: {
          enable: true,
          url: this.getUrl
        },
        view: {
          removeHoverDom: this.removeHoverDom,
          expandSpeed: ''
        },
        check: {
          enable: true
        },
        data: {
          simpleData: {
            enable: true
          }
        },
        callback: {
          onClick: this.zTreeOnClick,
          onCheck: this.zTreeOnCheck,
          beforeExpand: this.beforeExpand,
          onAsyncSuccess: this.onAsyncSuccess,
          onAsyncError: this.onAsyncError
        },
        edit: {
          enable: true
        }
      },
      zNodes: [
        { id: 1, pId: 0, name: '父节点1', count: 1000, isParent: true },
        { id: 2, pId: 0, name: '父节点2', isParent: true }
      ],
      selectNodes: []
    }
  },
  methods: {
    // tree获取动态数据
    getUrl (treeId, treeNode) {
      let curCount = (treeNode.children) ? treeNode.children.length : 0
      let getCount = (curCount + this.perCount) > treeNode.count ? (treeNode.count - curCount) : this.perCount
      let param = 'id=' + treeNode.id + '_' + (treeNode.times++) + '&count=' + getCount
      let baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
      return baseUrl + 'asyncData/getNodesForBigData?' + param
    },
    // 删除
    removeHoverDom (treeId, treeNode) {
      $('#addBtn_' + treeNode.tId).unbind().remove()
      this.zTreeOnCheck()
    },
    // 点击事件
    zTreeOnClick (event, treeId, treeNode) {
      // callBack
      if (treeNode.callBack) {
        // 召测返回结果
        console.log(treeNode.tId + ', ' + treeNode.name)
      }
    },
    // check选中事件
    zTreeOnCheck () {
      this.selectNodes = $.fn.zTree.getZTreeObj(this.treeId).getCheckedNodes(true)
    },
    // 初始化树
    initTree () {
      this.$refs.zTrees.init()
    },
    // 展开之前
    beforeExpand (treeId, treeNode) {
      if (treeNode.loaded === undefined) {
        if (!treeNode.isAjaxing) {
          treeNode.times = 1
          this.ajaxGetNodes(treeNode, 'refresh')
          return true
        } else {
          console.log('zTree 正在下载数据中，请稍后展开节点。。。')
          return false
        }
      }
    },
    // 异步请求成功
    onAsyncSuccess (event, treeId, treeNode, msg) {
      if (!msg || msg.length === 0) {
        return
      }
      let zTree = $.fn.zTree.getZTreeObj(this.treeId)
      let totalCount = treeNode.count
      if (treeNode.children.length < totalCount) {
        setTimeout(this.ajaxGetNodes(treeNode), this.perTime)
      } else {
        treeNode.loaded = true
        this.zNodes = this.zNodes.concat(treeNode.children)
        treeNode.icon = ''
        zTree.updateNode(treeNode)
        zTree.selectNode(treeNode.children[0])
        // todo
        setTimeout(this.miss, 1 * 1000)
      }
    },
    // 异步请求失败
    onAsyncError (event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) {
      let zTree = $.fn.zTree.getZTreeObj(this.treeId)
      console.log('异步获取数据出现异常。')
      treeNode.icon = ''
      zTree.updateNode(treeNode)
    },
    // ajax加载树
    ajaxGetNodes (treeNode, reloadType) {
      let zTree = $.fn.zTree.getZTreeObj(this.treeId)
      if (reloadType === 'refresh') {
        treeNode.icon = require('@/components/trees/img/loading.gif')
        zTree.updateNode(treeNode)
      }
      zTree.reAsyncChildNodes(treeNode, reloadType, true)
    },
    miss () {
      let zTree = $.fn.zTree.getZTreeObj(this.treeId)
      let node = zTree.getNodeByParam('id', 2)

      if (node) {
        let sObj = $('#' + node.tId + '_span')
        sObj.after(`  <b style="color: blue; cursor: pointer">[1325条已返回]</b>`)
        node.callBack = true
      }
    },
    showDetail (id) {
      console.log(id)
    }
  },
  mounted () {
    this.initTree()
  }
}
</script>
<style>

</style>
