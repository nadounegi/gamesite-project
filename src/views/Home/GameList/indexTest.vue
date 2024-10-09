<template>
  <div class="rank">
    <div class="content">
      <ul>
        <li>
          <h2><slot name="title"></slot></h2>
          <div class="img-item" v-for="item in items" :key="item.title">
            <p class="tab-pic">
              <a :href="item.link">
                <p>{{ item.image_url }}</p>
                <img :src="item.img_url" />
              </a>
            </p>
            <div class="tab-info">
              <div class="info-title">
                <a href="#">
                  {{ item.game_name }}
                </a>
                <h1>{{ getGameBrand(item.attributes_summary) }}</h1>
                <h1>{{ getGameType(item.attributes_summary) }}</h1>
              </div>
              <p class="info-price">定金:¥{{ item.price }}</p>
              <p class="stock">在庫残り{{ item.stock }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'goodsList',
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  methods: {
    getGameType (attributes_summary) {
      const match = attributes_summary.match(/ジャンル:([^,]+)/)
      return match ? match[1] : 'ジャンル情報なし'
    },
    getGameBrand (attributes_summary) {
      const match = attributes_summary.match(/ブランド:([^,]+)/)
      return match ? match[1] : 'ブランド情報なし'
    }

  }
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
