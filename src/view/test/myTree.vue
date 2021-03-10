<template>
  <div>
    <CheckboxGroup v-model="social">
      <ul>
      <li v-for="item in this.data">
        <!--<Button type="text" icon="md-arrow-dropright" @click="item.expand = true"></Button>-->
        <!--<Button type="text" icon="md-arrow-dropdown" @click="item.expand = false"></Button>-->
        <!--<Icon size="16" v-if="item.children && item.children.length > 0 && !item.expand" type="md-arrow-dropright"-->
              <!--@click="item.expand = true"/>-->
        <!--<Icon size="16" v-if="item.chsildren && item.children.length > 0 && item.expand" type="md-arrow-dropdown"-->
              <!--@click="item.expand = false"/>-->
        <Checkbox :label="item.value">
          <span>{{item.name}}</span>
        </Checkbox>
        <ul v-if="item.children && item.children.length > 0">
        <li style="padding-left: 20px" v-if="item.children && item.children.length > 0" v-for="item1 in item.children">
          <Checkbox :label="item1.value">
            <span>{{item1.name}}</span>
          </Checkbox>
        </li>
        </ul>
      </li>
      </ul>
    </CheckboxGroup>
  </div>
</template>

<script>
export default {
  name: 'myTree',
  props: {
    data: {
      Type: Array,
      default: () => []
    }
  },
  data: function () {
    return {
      social: []
    }
  }
}
</script>

<style scoped>

</style>
