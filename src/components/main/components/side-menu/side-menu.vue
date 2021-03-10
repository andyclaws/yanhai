<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <!--菜单-->

    <!--展开的菜单-->
    <template v-if="!collapsed">
      <Row>
        <Col :span="this.showSearch ? '0' : '17'" offset="2">
          <ButtonGroup shape="circle" :style="{minWidth: this.minWidth + 'px'}">
            <Button :type="this.tab === 1 ? 'primary' : 'default'" icon="md-menu" @click="() => this.tab = 1">
              {{$t('menu')}}
            </Button>
            <Button :type="this.tab === 2 ? 'primary' : 'default'" icon="md-cube" @click="() => this.tab = 2">
              {{$t('common')}}
            </Button>
            <Button :type="this.tab === 3 ? 'primary' : 'default'" icon="md-heart-outline" @click="() => this.tab = 3">
              {{$t('collection')}}
            </Button>
          </ButtonGroup>
        </Col>
        <Col span="3" offset="1">
          <Button type="primary" shape="circle"
                  :icon="this.showSearch ? 'md-arrow-round-forward' : 'md-search'" ghost
                  @click="() => this.showSearch = !this.showSearch"></Button>
        </Col>
        <Col :span="this.showSearch ? '16' : '0'">
          <Input search enter-button placeholder="Enter something..." />
        </Col>
      </Row>

      <Menu :style="heightStyle" v-show="this.tab === 1 && !this.showSearch" ref="menu" :active-name="activeName" :open-names="openedNames"
            :accordion="accordion" :theme="theme" width="auto" @on-select="handleSelect" class="sideMenuControl">
        <template v-for="item in menuList">
          <template v-if="item.children && item.children.length === 1">
            <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
            <menu-item v-else :name="getNameOrHref(item, true)" :key="`menu-${item.children[0].name}`">
              <common-icon :type="item.children[0].icon || ''"/>
              <span>{{ showTitle(item.children[0]) }}</span></menu-item>
          </template>
          <template v-else>
            <side-menu-item v-if="showChildren(item)" :key="`menu-${item.name}`" :parent-item="item"></side-menu-item>
            <menu-item v-else :name="getNameOrHref(item)" :key="`menu-${item.name}`">
              <common-icon :type="item.icon || ''"/>
              <span>{{ showTitle(item) }}</span></menu-item>
          </template>
        </template>
      </Menu>

      <div v-if="draggable"
           :style="triggerStyle"
           :class="`${prefix}-trigger-wrapper`"
           @mousedown="handleTriggerMousedown">
        <slot name="trigger">
          <side-menu-trigger></side-menu-trigger>
        </slot>
      </div>
    </template>

    <!--菜单收缩-->
    <div :style="heightStyle" class="menu-collapsed" v-show="collapsed" :list="menuList">
      <template v-for="item in menuList">
        <collapsed-menu v-if="item.children && item.children.length > 1" @on-click="handleSelect" hide-title
                        :root-icon-size="rootIconSize" :icon-size="iconSize" :theme="theme" :parent-item="item"
                        :key="`drop-menu-${item.name}`"></collapsed-menu>
        <Tooltip transfer v-else :content="showTitle(item.children && item.children[0] ? item.children[0] : item)"
                 placement="right" :key="`drop-menu-${item.name}`">
          <a @click="handleSelect(getNameOrHref(item, true))" class="drop-menu-a" :style="{textAlign: 'center'}">
            <common-icon :size="rootIconSize" :color="textColor"
                         :type="item.icon || (item.children && item.children[0].icon)"/>
          </a>
        </Tooltip>
      </template>
    </div>
  </div>
</template>
<script>
import SideMenuItem from './side-menu-item.vue'
import CollapsedMenu from './collapsed-menu.vue'
import SideMenuTrigger from './side-menu-trigger'
import { getUnion, off, on } from '@/libs/tools'
import mixin from './mixin'

export default {
  name: 'SideMenu',
  mixins: [mixin],
  components: {
    SideMenuItem,
    CollapsedMenu,
    SideMenuTrigger
  },
  props: {
    menuList: {
      type: Array,
      default () {
        return []
      }
    },
    collapsed: {
      type: Boolean
    },
    theme: {
      type: String,
      default: 'dark'
    },
    rootIconSize: {
      type: Number,
      default: 20
    },
    iconSize: {
      type: Number,
      default: 16
    },
    accordion: Boolean,
    activeName: {
      type: String,
      default: ''
    },
    openNames: {
      type: Array,
      default: () => []
    },
    // 是否可拖动修改宽度
    draggable: {
      type: Boolean,
      default: false
    },
    // 最小拖动宽度
    minWidth: {
      type: [String, Number],
      default: 256
    },
    maxWidth: {
      type: [String, Number],
      default: 500
    }
  },
  data () {
    const maxHeight = document.body.clientHeight - 90
    return {
      openedNames: [],
      canMove: false,
      wrapperWidth: 0,
      wrapperLeft: 0,
      width: 256,
      tab: 1,
      showSearch: false,
      maxHeight: maxHeight
    }
  },
  methods: {
    handleSelect (name) {
      this.$emit('on-select', name)
    },
    getOpenedNamesByActiveName (name) {
      return this.$route.matched.map(item => item.name).filter(item => item !== name)
    },
    updateOpenName (name) {
      if (name === this.$config.homeName) this.openedNames = []
      else this.openedNames = this.getOpenedNamesByActiveName(name)
    },
    handleTriggerMousedown (event) {
      this.canMove = true
      this.$emit('on-resize-start')
      // 防止鼠标选中抽屉中文字，造成拖动trigger触发浏览器原生拖动行为
      window.getSelection().removeAllRanges()
    },
    handleMousemove (event) {
      if (!this.canMove) return
      if (event.pageX < this.minWidth || event.pageX > this.maxWidth) return
      this.width = event.pageX
      this.$emit('on-resize', event)
    },
    handleMouseup (event) {
      this.canMove = false
      this.$emit('on-resize-end', this.width)
    }
  },
  computed: {
    textColor () {
      return this.theme === 'dark' ? '#fff' : '#495060'
    },
    placement () {
      return this.$attrs.placement
    },
    innerWidth () {
      const width = this.width
      return width <= 100 ? (this.wrapperWidth * width) / 100 : width
    },
    triggerStyle () {
      return {
        left: `${this.width}px`,
        position: 'fixed',
        zIndex: '99',
        height: '100%',
        border: '1px solid gray',
        boxShadow: 'rgb(255, 253, 253) 0 0 2px'
      }
    },
    heightStyle () {
      let style = { maxHeight: this.maxHeight + 'px', overflowY: 'auto' }
      return style
    }
  },
  watch: {
    activeName (name) {
      if (this.accordion) this.openedNames = this.getOpenedNamesByActiveName(name)
      else this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
    },
    openNames (newNames) {
      this.openedNames = newNames
    },
    openedNames () {
      this.$nextTick(() => {
        if (!this.collapsed) {
          this.$refs.menu.updateOpened()
        }
      })
    }
  },
  mounted () {
    this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
    on(document, 'mousemove', this.handleMousemove)
    on(document, 'mouseup', this.handleMouseup)
    const that = this
    window.onresize = () => {
      return (() => {
        window.clientHeight = document.body.clientHeight
        that.maxHeight = window.clientHeight - 90
      })()
    }
  },
  beforeDestroy () {
    off(document, 'mousemove', this.handleMousemove)
    off(document, 'mouseup', this.handleMouseup)
  }
}
</script>
<style lang="less">
  @import './side-menu.less';
</style>
