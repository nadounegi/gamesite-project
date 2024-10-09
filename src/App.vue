<template>
  <div id="app">
    <Header></Header>
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header/index.vue'
export default {
  name: '',
  components: {
    Header
  },
  mounted () {

  }
}
</script>

<style >

*{
  margin: 0;
  padding: 0;
}

</style>
