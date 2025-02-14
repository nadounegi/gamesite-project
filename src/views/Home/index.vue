<template>
  <div>
    <TypeNav />
    <ListContainer />
    <GameList />

    <!-- 如果发生错误，显示错误信息 -->
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script>

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home'

}
</script>

<style scoped>
/* 平台区块样式 */
.platform-section {
  margin: 20px 0;
}

/* 错误信息样式 */
.error-message {
  color: red;
  text-align: center;
  margin: 20px 0;
  font-size: 18px;
}
</style>
