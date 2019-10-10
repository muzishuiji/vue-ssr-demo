
<!--在组件中设置数据预取逻辑-->
<template>
  <div>
    <span v-if="!item">loading</span>
    <div v-if="item">
      <h2>{{item.title}}</h2>
      <p>{{item.description}}</p>
      <p>创建时间: {{item.create_time}}</p>
    </div>
  </div>
</template>
<script>
export default {
    data() {
      return {
        message: 'hello vue ssr'
      }
    },
    asyncData({ store,route }) {
      return store.dispatch('fetchItem', route.params.id)
    },
    computed: {
      item () {
        return this.$store.state.items[this.$route.params.id]
      }
    }
}
</script>