<template>
  <div>
    <TypeNav />
    <ListContainer />

    <!-- 显示每个平台的游戏列表 -->
    <div v-for="(games,platform) in platforms" :key="platform">
      <GameList :title="platform" :gameList="games"/>
    </div>

    <!-- 如果有错误，显示错误信息 -->
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters({
      ps4ps5Games: 'home/ps4ps5Games',
      xboxGames: 'home/xboxGames',
      SwitchGames: 'home/SwitchGames',
      error: 'home/error'
    }),
    platforms () {
      return {
        'PS4/PS5': this.ps4ps5Games,
        Xbox: this.xboxGames,
        Switch: this.SwitchGames
      }
    }
  },
  created () {
    const platformNames = ['PS4', 'PS5', 'Xbox Series X', 'Switch']
    platformNames.forEach((platform) => {
      this.$store.dispatch('home/fetchGameList', platform)
    })
    // 等待所有游戏列表数据获取完成
    Promise.all(fetchGameLists)
      .then(() => {
        console.log('所有游戏列表加载完成')

        // 打印不同平台的游戏数据，查看是否成功获取
        console.log(this.ps4ps5Games, 'PS4/PS5 游戏数据')
        console.log(this.xboxGames, 'Xbox 游戏数据')
        console.log(this.SwitchGames, 'Switch 游戏数据')
      })
      .catch(error => console.error('获取游戏列表时出错:', error))
  }

}
</script>
<style>
</style>
