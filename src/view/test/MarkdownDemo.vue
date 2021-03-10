<template>
  <div>
    <markdown-editor v-model="content" language="'zh_CN'"></markdown-editor>
  </div>
</template>

<script>
import MarkdownEditor from '_c/MarkdownEditor'
const content = `
**This is test**

* vue
* element
* webpack

`
export default {
  name: 'MarkdownDemo',
  components: {
    MarkdownEditor
  },
  data: function () {
    return {
      content: content
    }
  }
}
</script>

<style scoped>

</style>
