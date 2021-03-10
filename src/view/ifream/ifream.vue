<template>
  <div style="width: 100%; height: 100%">
    <iframe
      :src="iframeUrl" ref="iframe"
      width="100%" height="100%" frameborder="0" scrolling="yes">
    </iframe>
  </div>
</template>

<script>
export default {
  name: 'ifream',
  data: function () {
    return {
      iframeUrl: this.getUrlPath()
    }
  },
  watch: {
    $route: function () {
      this.iframeUrl = this.getUrlPath()
    }
  },
  computed: {
    src () {
      return this.$route.query.ifreameUrl
    }
  },
  methods: {
    // 加载浏览器窗口变化自适应
    resize () {
      window.onresize = () => {
        this.iframeInit()
      }
    },
    // iframe窗口初始化
    iframeInit () {
      const iframe = this.$refs.iframe
      const clientHeight =
          document.documentElement.clientHeight - (screen > 1 ? 200 : 130)
      if (!iframe) return
      iframe.style.height = `${clientHeight}px`
      if (iframe.attachEvent) {
        iframe.attachEvent('onload', () => {
          this.hide()
        })
      } else {
        iframe.onload = () => {
          this.hide()
        }
      }
    },
    getUrlPath: function () {
      // 获取 iframe src 路径
      let url = this.$route.query.ifreameUrl
      console.log('$route$route$route$route$route', this.$route)
      return this.$route.meta.href
    }
  }
}
</script>

<style scoped>

</style>
