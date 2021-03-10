<template>
  <Layout style="height: 100%" class="main">
    <template>
      <Sider
        v-show="!singleFullScreen"
        hide-trigger
        collapsible
        :width="width"
        :collapsed-width="60"
        v-model="collapsed"
        class="left-sider"
        :style="{overflow: 'hidden'}"
      >
        <side-menu
          accordion
          ref="sideMenu"
          :min-width="256"
          :max-width="800"
          :draggable="true"
          :active-name="$route.name"
          :collapsed="collapsed"
          @on-resize-end="resize"
          @on-select="turnToPage"
          :menu-list="menuList"
        >
          <!-- 需要放在菜单上面的内容，如Logo，写在side-menu标签内部，如下 -->
          <div class="logo-con">
            <!--<img v-show="!collapsed" :src="maxLogo" key="max-logo"/>-->
            <!--<img v-show="collapsed" :src="minLogo" key="min-logo"/>-->
            <!-- <img :src="minLogo" key="min-logo" style="display: inline" /> -->
            <span class="logo-font" v-show="!collapsed">{{$t('projectName')}}</span>
          </div>
        </side-menu>
      </Sider>

      <Layout>
        <Header class="header-con" v-show="!singleFullScreen">
          <header-bar :collapsed="collapsed" @on-coll-change="handleCollapsedChange">
            <user :message-unread-count="unreadCount" :user-avator="userAvator" />
            <language
              v-if="$config.useI18n"
              @on-lang-change="setLocal"
              style="margin-right: 10px;"
              :lang="local"
              class="language-container"
            />
            <error-store
              v-if="$config.plugin['error-store'] && $config.plugin['error-store'].showInHeader"
              :has-read="hasReadErrorPage"
              :count="errorCount"
            ></error-store>
            <lock-screen style="margin-right: 10px;" class="lockScreen-container"></lock-screen>
            <fullscreen
              ref="fullscreen"
              v-model="isFullscreen"
              style="margin-right: 10px;"
              class="fullScreen-container"
            />
            <VersionInfo style="margin-right: 10px;" class="version-info-container" />
            <ExpAlarm style="margin-right: 10px;" class="exp-alarm-container" />
            <TradeNotice style="margin-right: 10px;" class="trade-notice-container" />
          </header-bar>
        </Header>
        <Content class="main-content-con">
          <Layout class="main-layout-con">
            <div class="tag-nav-wrapper" v-show="!singleFullScreen">
              <tags-nav
                :value="$route"
                @input="handleClick"
                :list="tagNavList"
                @on-close="handleCloseTag"
                @full-screen="fullScreenClick"
                class="tags-view-container"
              />
            </div>
            <Content class="content-wrapper">
              <!--<iframe-->
              <!--v-if="item.type === 'iframe'"-->
              <!--:src="item.iframeUrl"-->
              <!--width="100%" height="100%" frameborder="0" scrolling="yes">-->
              <!--</iframe>-->
              <keep-alive :include="cacheList">
                <router-view />
              </keep-alive>
              <ABackTop :height="100" :bottom="80" :right="50" container=".content-wrapper"></ABackTop>
            </Content>
          </Layout>
        </Content>
      </Layout>
    </template>
  </Layout>
</template>
<script>
import SideMenu from './components/side-menu'
import HeaderBar from './components/header-bar'
import TagsNav from './components/tags-nav'
import User from './components/user'
import ABackTop from './components/a-back-top'
import TradeNotice from './components/trade-notice'
import ExpAlarm from './components/exp-alarm'
import VersionInfo from './components/version-info'
import Fullscreen from './components/fullscreen'
import Language from './components/language'
import ErrorStore from './components/error-store'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { getNewTagList, routeEqual } from '@/libs/util'
import routers from '@/router/routers'
import minLogo from '@/assets/images/logo-min.png'
import maxLogo from '@/assets/images/logo.jpg'
import lockScreen from './components/lockscreen/lockscreen.vue'
import './main.less'

export default {
  name: 'Main',
  components: {
    SideMenu,
    HeaderBar,
    Language,
    TagsNav,
    TradeNotice,
    ExpAlarm,
    VersionInfo,
    Fullscreen,
    ErrorStore,
    User,
    ABackTop,
    lockScreen
  },
  data () {
    return {
      width: 256,
      // todo
      collapsed: false,
      minLogo,
      maxLogo,
      isFullscreen: false,
      singleFullScreen: false
    }
  },
  computed: {
    ...mapGetters(['errorCount']),
    tagNavList () {
      return this.$store.state.app.tagNavList
    },
    tagRouter () {
      return this.$store.state.app.tagRouter
    },
    userAvator () {
      return this.$store.state.auth.avator
    },
    cacheList () {
      const list = [
        'ParentView',
        ...(this.tagNavList.length
          ? this.tagNavList
            .filter(item => !(item.meta && item.meta.notCache))
            .map(item => item.name)
          : [])
      ]
      return list
    },
    menuList () {
      return this.$store.getters.menuList
    },
    local () {
      return this.$store.state.app.local
    },
    hasReadErrorPage () {
      return this.$store.state.app.hasReadErrorPage
    },
    unreadCount () {
      return this.$store.state.auth.unreadCount
    }
  },
  methods: {
    ...mapMutations([
      'setBreadCrumb',
      'setTagNavList',
      'addTag',
      'setLocal',
      'setHomeRoute',
      'closeTag'
    ]),
    ...mapActions(['handleLogin', 'getUnreadMessageCount']),
    turnToPage (route) {
      let { name, params, query } = {}
      if (typeof route === 'string') name = route
      else {
        name = route.name
        params = route.params
        query = route.query
      }
      console.log('route: ', route)
      // todo
      // if (name.indexOf('isTurnByHref_') > -1) {
      //   // window.open(name.split('_')[1])
      //   // return
      //
      //   const ifreameUrl = name.split('_')[1]
      //   const route = {
      //     path: `/myifream/urlPath?${ifreameUrl}`,
      //     query: {
      //       ifreameUrl: ifreameUrl,
      //       title: name.split('_')[2]
      //     }
      //   }
      //   this.$router.replace(route)
      //   return
      // }
      this.$router.push({
        name,
        params,
        query
      })
    },
    handleCollapsedChange (state) {
      this.collapsed = state
    },
    handleCloseTag (res, type, route) {
      if (type !== 'others') {
        if (type === 'all') {
          this.turnToPage(this.$config.homeName)
        } else {
          if (routeEqual(this.$route, route)) {
            this.closeTag(route)
          }
        }
      }
      this.setTagNavList(res)
    },
    handleClick (item) {
      this.turnToPage(item)
    },
    resize (width) {
      this.width = width
    },
    fullScreenChange (value) {
      if (!value) {
        this.singleFullScreen = false
      }
    },
    fullScreenClick (route) {
      this.$router.push({
        name: route.name,
        query: route.query
      })
      if (!this.isFullscreen) {
        this.$refs.fullscreen.handleFullscreen()
      }
      this.singleFullScreen = true
    }
  },
  watch: {
    $route (newRoute) {
      const { name, query, params, meta } = newRoute
      if (meta && meta.insideMenu === true) {
      } else {
        this.addTag({
          route: { name, query, params, meta },
          type: 'push'
        })
        this.setBreadCrumb(newRoute)
        this.setTagNavList(getNewTagList(this.tagNavList, newRoute))
        this.$refs.sideMenu.updateOpenName(newRoute.name)
      }
    },
    isFullscreen (value) {
      this.fullScreenChange(value)
    }
  },
  mounted () {
    /**
     * @description 初始化设置面包屑导航和标签导航
     */
    this.setTagNavList()
    this.setHomeRoute(routers)
    this.addTag({
      route: this.$store.state.app.homeRoute
    })
    this.setBreadCrumb(this.$route)
    // 设置初始语言
    this.setLocal(this.$i18n.locale)
    // 如果当前打开页面不在标签栏中，跳到homeName页
    if (!this.tagNavList.find(item => item.name === this.$route.name)) {
      this.$router.push({
        name: this.$config.homeName
      })
    }
    // 获取未读消息条数
    // this.getUnreadMessageCount()
  }
}
</script>
