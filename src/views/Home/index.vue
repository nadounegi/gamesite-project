<template>
  <div>
    <TypeNav />
    <ListContainer />
    
    <!-- 加载中的显示 -->
    <div v-if="loading">加载中...</div>

    <!-- 显示每个平台的游戏列表 -->
    <div v-else>
      <GameList :gamesList="ps4ps5Games" title="PS4・PS5"/>
      <GameList :gamesList="xboxGames" title="Xbox"/>
      <GameList :gamesList="SwitchGames" title="Switch"/>
    </div>

    <!-- 如果有错误，显示错误信息 -->
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapGetters({
      ps4ps5Games: "home/ps4ps5Games",
      xboxGames: "home/xboxGames",
      SwitchGames: "home/SwitchGames",
      loading: "home/loading",
      error: "home/error",
    }),
  },
  created() {
  const platformNames = ["PS4", "PS5", "Xbox Series X", "Switch"];
  const fetchGameLists = platformNames.map(platform => this.$store.dispatch("home/fetchGameList", platform));

  // 等待所有游戏列表数据获取完成
  Promise.all(fetchGameLists)
    .then(() => {
      console.log("所有游戏列表加载完成");

      // 打印不同平台的游戏数据，查看是否成功获取
      console.log(this.ps4ps5Games, "PS4/PS5 游戏数据");
      console.log(this.xboxGames, "Xbox 游戏数据");
      console.log(this.SwitchGames, "Switch 游戏数据");
    })
    .catch(error => console.error("获取游戏列表时出错:", error));
}

};
</script>
<style>
</style>
