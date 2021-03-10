<template>
  <div id="home" class="pd20">
    tinyMce的使用
    <tinymce ref="richText" v-model="content" @on-upload-complete="onEditorUploadComplete"></tinymce>
    <div>
      <Button type="primary" @click="get">保存</Button>
      <Button type="primary" @click="set">设置</Button>
    </div>
  </div>
</template>

<script>
import tinymce from '_c/tinymce-editor'
// this.$refs.richText.setContent//getContent 两个方法 获取与设置
export default {
  name: 'Dashboard',
  components: {
    tinymce
  },
  data () {
    return {
      content: '欢迎来到首页'
    }
  },
  watch: {

  },
  computed: {
  },
  methods: {
    onEditorUploadComplete (res) {
      // if (res.code === 0) {
      //   this.$message({
      //     type: 'success',
      //     message: '上传成功'
      //   })
      // } else {
      //   this.$message({
      //     type: 'error',
      //     message: res.msg
      //   })
      // }
    },
    set () {
      this.$refs.richText.setContent('设置内容')
    },
    get () {
      console.log(this.$refs.richText.getContent())
      this.content = this.$refs.richText.getContent()
    }
  },
  created () {

  },
  mounted () {

  }
}
</script>

<style lang="less" scoped>
</style>
