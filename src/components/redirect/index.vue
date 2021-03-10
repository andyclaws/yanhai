<script>
export default {
  beforeCreate () {
    console.log(this.$route)
    const name = this.$route.query.redirectName
    delete this.$route.query['redirectName']
    const query = this.$route.query
    const route = {
      name: name,
      query: query
    }
    console.log('route', route)
    this.$router.replace(route)
  },
  render: function (h) {
    return h() // avoid warning message
  }
}
</script>
