<template>
  <div class="rank">
    <div class="content">
      <h2>{{ title }}</h2>
      <ul v-if="gamesList.length">
        <li v-for="game in gamesList" :key="game.gameId">
          <div class="img-item">
            <div class="tab-pic">
              <img :src="game.url" />
            </div>
            <div class="tab-info">
              <div class="info-title">
                <a href="#">
                  {{ game.gameName }}
                </a>
                <h1>{{ game.brand.brandName }}</h1>
                <h1>{{ game.genre.genreName }}</h1>
              </div>
              <p class="info-price">定金:¥{{ game.price }}</p>
              <p class="stock">在庫残り{{ game.stock }}件</p>
            </div>
          </div>
        </li>
      </ul>
      <div v-if="!gamesList.length">
        ゲームが見つかりません
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameList",
  props: {
    title: {
      type: String,
      required: true,
    },
    gamesList: {
      type: Array,
      default: () => [],
      required: true,
    }
  }
};
</script>

<style lang="less" scoped>
.rank {
  width: 1200px;
  margin: 0 auto;

  .content {
    overflow: hidden;
    padding: 10px;

    ul {
      li {
        overflow: hidden;
        list-style: none;
        line-height: 18px;

        h2 {
          font-size: 20px;
          color: #333;
          margin: 10px 10px;
        }

        .img-item {
          border: 1px solid #e1251b;
          width: 269px;
          float: left;
          overflow: hidden;
          margin: 0 10px 10px;
          background: #fff;

          .tab-pic {
            width: 230px;
            height: 210px;
            overflow: hidden;
            text-align: center;
            margin: 5px auto 18px;

            a {
              img {
                width: 200px;
                height: 200px;
              }
            }
          }

          .tab-info {
            position: relative;
            bottom: 24px;
            background: #fafafa;

            .info-title {
              height: 68px;
              line-height: 23px;
              overflow: hidden;
              margin: 0 auto;
              padding-left: 10px;
              a {
                color: #333;
                text-decoration: none;
              }
            }
            p.stock {
              position: relative;
              top: 14px;
            }

            .info-price {
              position: relative;
              top: 17px;
              font-size: 20px;
              color: #e1251b;
              height: 35px;
              padding-left: 10px;
              display: block;
              line-height: 24px;
              margin: 0px auto 0;
            }
          }
        }
      }
    }
  }
}
</style>
