<template>
  <div>
    <h3>文章列表:</h3>
    <div class="list" v-for="(item, index) in list" :key="item.id">
      <router-link class="list-item" :to="{path: '/item/'+ item.id}">{{index+1}}. {{ item.title }}</router-link>
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
    asyncData({store, route}) {
      return store.dispatch('fetchList')
    },
    computed: {
      list() {
        return this.$store.state.list
      }
    }
}
</script>
<style lang="css">
  .list{
    margin: 8px 0;
  }
  .list-item {
    text-decoration: none;
  }
</style>