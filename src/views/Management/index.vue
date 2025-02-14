<template>
  <div>
    <topHeader></topHeader>
    <navBar></navBar>

    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import navBar from '@/components/navBar/index.vue'
import topHeader from '@/components/topHeader/index.vue'
export default {
  name: 'ManagementPage',
  components: {
    navBar,
    topHeader
  }
}
</script>

<style lang="less" scoped>
.content {
    margin-left: 198px;
    margin-top: -767px;
}
</style>
