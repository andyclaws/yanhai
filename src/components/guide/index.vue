<template>
  <div class="app-container">
    <Button type="primary" @click.prevent.stop="guide">{{ $t('guide.button') }}>Primary</Button>
  </div>
</template>

<script>
import Driver from 'driver.js' // import driver.js
import 'driver.js/dist/driver.min.css' // import driver.js css
import steps from './defineSteps'

export default {
  name: 'Guide',
  data () {
    return {
      driver: null
    }
  },
  mounted () {
    this.driver = new Driver()
  },
  methods: {
    guide () {
      this.driver.defineSteps(steps)
      this.driver.start()
    }
  }
}
</script>
