<template>
  <div>
    <div style="text-align: right">
      <Button
        :type="showRefreshText ? 'primary' : 'text'"
        :loading="orgLoadingData"
        icon="md-refresh"
        @click="initData">
        <span v-if="showRefreshText">
          <span v-if="!orgLoadingData">{{$t('refresh')}}</span>
          <span v-else>{{$t('loading')}}...</span>
        </span>
      </Button>
    </div>
    <Tree
      :data="orgListData"
      :load-data="loadData"
      :render="renderContent"
    ></Tree>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
export default {
  name: 'org',
  props: {
    showRefreshText: {
      type: Boolean,
      default: true
    }
  },
  // data () {
  //   return {
  //     loadingData: false
  //   }
  // },
  methods: {
    ...mapMutations([
    ]),
    ...mapActions([
      'initOrgListData',
      'loadOrgListData'
    ]),
    initData () {
      this.loadingData = true
      this.initOrgListData().then(() => {
        this.loadingData = false
      })
    },
    loadData (item, callback) {
      this.loadOrgListData(item).then(res => {
        callback(res)
      })
    },
    renderContent (h, { root, node, data }) {
      // todo 根据不同级别图标展示不一样
      let icon_class = 'miss'
      return h('span', {
        style: {
          display: 'inline-block',
          width: '100%'
        }
      }, [
        h('span', [
          h('span', {
            'class': ['sea-tree-icon', icon_class]
          }),
          h('span', {
            'class': ['cursor-point'],
            on: {
              click: () => {
                this.click(data)
              }
            }
          }, data.orgName)
        ])
      ])
    },
    click (data) {
      this.$emit('on-select', data)
    }
  },
  computed: {
    ...mapGetters([
      'orgHasData',
      'orgListData',
      'orgLoadingData'
    ])
  },
  mounted () {
    if (!this.orgHasData) {
      this.initData()
    }
  }
}
</script>

<style>
  .sea-tree-icon {
    /*todo 基本样式*/
    display: inline-block;
    width: 12px;
    height: 12px;
    background: #024337;
    border-radius: 50%;
    margin-right: 4px;
  }

  .cursor-point {
    cursor: pointer;
  }

</style>
