<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread 带有x的结构-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <!-- 選べれだカテゴリー、キーワード、ブランドおよび属性タグ-->
          <ul class="fl sui-tag">
            <!-- カテゴリータグ -->
            <li class="with-x" v-if="this.searchParams.categoryName">
              {{ this.searchParams.categoryName }}
              <i @click="removeCategory">×</i>
            </li>
            <!-- キーワードタグ -->
            <li class="with-x" v-if="this.searchParams.keyword">
              {{ this.searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- ブランドタグ -->
            <li class="with-x" v-if="this.searchParams.brandmark">
              {{ this.searchParams.brandmark }}
              <i @click="removeBrandMark">×</i>
            </li>
            <!-- 属性タグ -->
            <li
              class="with-x"
              v-for="(value, index) in searchParams.props"
              :key="value"
            >
              {{ value }}
              <i @click="removeProps(index)">×</i>
            </li>
          </ul>
        </div>

        <!--商品筛选组件-->
        <SearchSelector
          :setBrandmark="setBrandmark"
          :setSearchProps="setSearchProps"
        ></SearchSelector>

        <!-- 商品展示区 -->
        <div class="details clearfix">
          <!-- 排序栏 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 综合排序 -->
                <li :class="{ active: orderInfo[0] === '1' }">
                  <a href="javascript:;" @click="orderProduct('1')">
                    综合
                    <i
                      v-show="orderInfo[0] === '1'"
                      class="iconfont"
                      :class="orderInfo[1] === 'desc' ? 'icon-down' : 'icon-up'"
                    ></i>
                  </a>
                </li>
                <li :class="{ active: orderInfo[0] === '2' }">
                  <a href="javascript:;" @click="orderProduct('2')">
                    价格
                    <i
                      v-show="orderInfo[0] === '2'"
                      class="iconfont"
                      :class="orderInfo[1] === 'desc' ? 'icon-down' : 'icon-up'"
                    ></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="good in filterGoodsList"
                :key="good.game_id"
                :data-id="good.game_id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="#" target="_blank"
                      ><img :src="good.img_url" width="210px" height="80px"
                    /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <em>{{ good.game_name }}</em>
                    <p>{{ getGameBrand(good.attributes_summary) }}</p>
                    <p>{{ getGameType(good.attributes_summary) }}</p>
                  </div>
                  <div class="commit">
                    <i class="command"
                      >残り在庫数<span>{{ good.stock }}</span
                      >件</i
                    >
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import SearchSelector from "./SearchSelector/SearchSelector.vue";
import { mapGetters } from "vuex";

export default {
  name: "search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      //サーバーに渡すパラメータ
      searchParams: {
        category1Id: "", //一级分类的id
        category2Id: "", //二级分类的id
        category3Id: "", //三级分类的id
        categoryName: "", //商品的名字
        keyword: "", //用户搜索的关键字
        props: [], //商品属性的搜索条件
        brandmark: "", //品牌的搜索条件
        order: "1:desc", //排序的参数 【默认初始值:1:desc】
        minPrice: 0, //最小价格
        maxPrice: Number.MAX_VALUE, //最大价格
        pageNo: 1, //当前分页器的页码  【默认初始值:1】
        pageSize: 10, //代表当前一页显示几条数据 【默认初始值:10】
      },
    };
  },
  watch: {
    $route: {
      handler(toParams, fromParams) {
        this.updateParams();
        this.getData();
      },
      immediate: true,
    },
  },
  mounted() {
    console.log("当前的查询参数:", this.$route.params.keyword);
  },
  methods: {
    orderProduct(orderType) {
      let [orderField, type] = this.orderInfo;
      if (orderField === orderType) {
        type = type === "desc" ? "asc" : "desc";
      } else {
        type = "desc";
      }
      this.searchParams.order = orderType + ":" + type;
      this.getData();
    },
    removeProps(index) {
      this.searchParams.props.splice(index, 1);
      this.getData();
    },
    setSearchProps(value) {
      if (!this.searchParams.props.includes(value)) {
        this.searchParams.props.push(value);
        this.getData();
      }
    },
    removeBrandMark() {
      this.$delete(this.searchParams, "brandmark");
      this.getData();
    },
    setBrandmark(brandmark) {
      //更改品牌
      if (this.searchParams.brandmark != brandmark) {
        this.$set(this.searchParams, "brandmark", brandmark);
        this.getData();
      }
    },
    removeCategory() {
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
      this.searchParams.categoryName = "";

      this.$router.replace({
        name: "search",
        params: this.$route.params,
      });
      this.getData();
    },
    removeKeyword() {
      this.searchParams.keyword = "";
      this.$router.replace({
        name: "search",
        query: this.$route.query,
      });
      this.$bus.$emit("clearKeyword");
    },
    updateParams() {
      let { keyword } = this.$route.params; // 获取关键词
      let { category1Id, category2Id, category3Id, categoryName } =
        this.$route.query; // 获取分类信息

      this.searchParams = {
        ...this.searchParams,
        keyword,
        category1Id,
        category2Id,
        category3Id,
        categoryName,
      };
      console.log("当前的查询参数:", this.searchParams.categoryName); // 打印当前的查询参数，确认是否正确
      console.log("当前的关键词:", this.searchParams.keyword);
    },
    applyPriceFilter({ minPrice, maxPrice }) {
      //价格筛选
      this.searchParams.minPrice = minPrice;
      this.searchParams.maxPrice = maxPrice;
      this.getData();
    },

    getGameType(attributes_summary) {
      const match = attributes_summary.match(/ジャンル:([^,]+)/);
      return match ? match[1] : "ジャンル情報なし";
    },
    getGameBrand(attributes_summary) {
      const match = attributes_summary.match(/ブランド:([^,]+)/);
      return match ? match[1] : "ブランド情報なし";
    },
    /* 发送更新后的查询ajax请求 */
    getData(newPage = 1) {
      this.searchParams.pageNo = newPage;
      console.log("当前的查询参数:", this.searchParams); // 打印当前的查询参数，确认是否正确
      this.$store
        .dispatch("search/getSearchResult", this.searchParams)
        .then(() => {
          console.log("获取到的商品数据:", this.goodsList); // 打印商品列表，确认后端返回的数据是否正确
        });
    },
  },
  computed: {
    ...mapGetters("search", [
      "goodsList",
      "brandmarkList",
      "attrsList",
      "totalPage",
    ]),
    filterGoodsList() {
      return this.goodsList.filter((good) => {
        // 确保关键词匹配游戏名称或属性摘要
        const matchesKeyword =
          !this.searchParams.keyword ||
          good.game_name.includes(this.searchParams.keyword) ||
          good.attributes_summary.includes(this.searchParams.keyword);

        // 如果有分类信息，也确保分类匹配
        const matchesCategory =
          !this.searchParams.categoryName ||
          good.attributes_summary.includes(this.searchParams.categoryName);

        return matchesKeyword && matchesCategory;
      });
    },
    orderInfo() {
      return this.searchParams.order.split(":");
    },
  },
};
</script>
  
  <style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 220px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: 220px;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: 8px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                height: 74px;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
