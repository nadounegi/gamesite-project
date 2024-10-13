<template>
  <div class="rank">
    <div class="content">
      <h2>{{ title }}</h2>
      <ul v-if="gamesList.length">
        <li v-for="game in gamesList" :key="game.gameId" class="layout">
          <div class="img-item">
            <div class="tab-pic">
              <img :src="game.url" width="150px" height="200px"/>
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
      <div v-if="!gamesList.length">ゲームが見つかりません</div>
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
    },
  },
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
      display: flex;
      flex-wrap: wrap;  // 使元素在多行中排列
      padding: 0;
      
      li {
        list-style: none;
        margin: 10px;  // 设置每个列表项的间距
        width: calc(25% - 20px);  // 设置每个元素的宽度为25%，减去左右间距
        box-sizing: border-box;   // 包括内边距和边框在内计算宽度

        .img-item {
          border: 1px solid #e1251b;
          width: 100%;  // 设置图片项宽度为父容器的100%
          background: #fff;
          
          .tab-pic {
            width: 100%;  // 使图片容器占满整个img-item的宽度
            height: 210px;
            overflow: hidden;
            text-align: center;
            margin: 5px auto 18px;

            img {
              width: 100%;
              height: 100%;
              object-fit: contain;  // 保证图片保持其纵横比并完整显示
            }
          }

          .tab-info {
            background: #fafafa;
            padding: 10px;  // 增加内边距

            .info-title {
              overflow: hidden;
              margin: 0 auto;
              text-align: center;
              
              a {
                color: #333;
                text-decoration: none;
              }
            }

            .info-price {
              font-size: 20px;
              color: #e1251b;
              text-align: center;
            }

            p.stock {
              text-align: center;
              margin-top: 10px;
            }
          }
        }
      }
    }
  }
}

</style>
