import CommonIcon from '_c/common-icon'
import { showTitle } from '@/libs/util'

export default {
  data () {
    return {
      prefix: 'side-menu'
    }
  },
  components: {
    CommonIcon
  },
  methods: {
    showTitle (item) {
      return showTitle(item, this)
    },
    showChildren (item) {
      return item.children && (item.children.length > 1 || (item.meta && item.meta.showAlways))
    },
    getNameOrHref (item, children0) {
      // return item.href ?
      //   `isTurnByHref_${item.href}_${item.meta.title}`
      //   : (children0 ?
      //     item.children[0].href ? `isTurnByHref_${item.children[0].href}_${item.children[0].meta.title}` : item.children[0].name : item.name)
      return children0 ? item.children[0].name : item.name
    }
  }
}
