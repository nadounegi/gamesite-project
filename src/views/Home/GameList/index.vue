<template>
  <div class="rank">
    <div class="content">
      <h2>ゲームリスト</h2>
      <ul v-if="allGamesList && allGamesList.length > 0">
        <li v-for="game in allGamesList" :key="game.gameId" class="layout">
          <div class="img-item">
            <div class="tab-pic">
              <img :src="game.url" width="150px" height="200px" />
            </div>
            <div class="tab-info">
              <div class="info-title">
                <a href="#">
                  {{ game.gameName }}
                </a>
                <h1>開発元:{{ game.brandName }}</h1>
                <h1>ゲーム類型:{{ game.genreName }}</h1>
                <h1>プラットフォーム:{{ game.platformType }}</h1>

              </div>
              <p class="info-price">定金:¥{{ game.price }}</p>
              <p class="stock">在庫残り{{ game.stock }}件</p>
            </div>
          </div>
        </li>
      </ul>
       <!-- 没有数据时显示 -->
       <div v-else>ゲームが見つかりません</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'GameList',
  created () {
    this.fetchAllGames()
  },
  computed: {
    ...mapState('game', ['allGamesList', 'loading', 'error']) // ✅ 直接使用 mapState

  },
  methods: {
    ...mapActions('game', ['fetchAllGames'])
  }
  // computed: {
  //   gamesList () {
  //     return this.$store.getters['game/allGamesList']
  //   },
  //   loading () {
  //     return this.$store.getters['game/isLoading']
  //   },
  //   error () {
  //     return this.$store.getters['game/error']
  //   }
  // },
  // created () {
  //   this.$store.dispatch('game/fetchAllGames')
  // }
}
</script>

<style lang="less" scoped>
.rank {
  width: 1200px;
  margin: 0 auto;

  .content {
    overflow: hidden;
    padding: 10px;

    ul {
      display: flex;
      flex-wrap: wrap; // 使元素在多行中排列
      padding: 0;

      li {
        list-style: none;
        margin: 10px; // 设置每个列表项的间距
        width: calc(25% - 20px); // 设置每个元素的宽度为25%，减去左右间距
        box-sizing: border-box; // 包括内边距和边框在内计算宽度

        .img-item {
          width: 100%;
          height: 400px;
          border-radius: 25px;
          background: #e7dfdf;
          box-shadow: 0 0 12px #555353;

          .tab-pic {
            width: 100%; // 使图片容器占满整个img-item的宽度
            height: 210px;
            overflow: hidden;
            text-align: center;
            margin: 5px auto 18px;
            position: relative;
            top: 10px;

            img {
              width: 100%;
              height: 100%;
              object-fit: contain; // 保证图片保持其纵横比并完整显示
            }
          }

          .tab-info {
            padding-left: 15px;
            padding-bottom: 12px;

            .info-title {
              overflow: hidden;
              margin: 0 auto;
              text-align: center;

              h1 {
                font-size: 12px;
                color: #333;
                padding-top: 8px;
                text-align: left;
              }
              a {
                color: #333;
                text-decoration: none;
              }
            }

            .info-price {
              font-size: 20px;
              color: #e1251b;
              text-align: left;
            }

            p.stock {
              text-align: left;
              margin-top: 10px;
            }
          }
        }
      }
    }
  }
}
</style>
