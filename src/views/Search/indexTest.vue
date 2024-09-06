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
          <ul class="fl sui-tag">
            <li
              v-for="category in selectedCategories"
              :key="category.id"
              class="with-x"
            >
              {{ category.name }}
              <i>×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li class="active">
                  <a href="#">综合</a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li>
                  <a href="#">价格⬆</a>
                </li>
                <li>
                  <a href="#">价格⬇</a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="item in filteredGoodsList"
                :key="item.game_name"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="#" target="_blank"
                      ><img :src="item.image_url" width="210px" height="80px"
                    /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <em>{{ item.game_name }}</em>
                    <p @click="goSearch">
                      {{ getGameBrand(item.attributes_summary) }}
                    </p>
                    <p>{{ getGameType(item.attributes_summary) }}</p>
                  </div>
                  <div class="commit">
                    <i class="command"
                      >残り在庫数<span>{{ item.stock }}</span
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
import { mapGetters, mapActions } from "vuex";

export default {
  name: "search",
  components: {
    SearchSelector,
  },
  computed: {
    ...mapGetters("search", [
      "selectedCategories",
      "goodsList",
      "attrsList",
      "categoryList",
    ]),
    filteredGoodsList() {
      console.log("Selected Categories:", this.selectedCategories);
      if (this.selectedCategories.length === 0) {
        return this.goodsList;
      }
      return this.goodsList.filter((item) => {
        return this.selectedCategories.every((category) => {//every() 方法用于检测数组所有元素是否都符合指定条件
          return item.attributes_summary.includes(category.name);//includes() 方法用于判断一个字符串是否包含在另一个字符串中
        });
      });
    },
  },
  watch: {
    "$route.query": "processRouteParams",
  },
  methods: {
    ...mapActions("search", [
      "getSearchResult",
      "removeCategory",
      "fetchCategoryList",
      "clearCategories",
      "addCategory",
    ]),

    async goSearch() {
      if (this.keyword) {
        await this.getSearchResult({
          category1Id: this.query.category1Id,
          keyword: this.keyword,
        });
        this.$router.push({
          name: "search",
          params: { keyword: this.keyword },
          query: { category1Id: this.$route.query.category1Id },
        });
      }
    },
    async processRouteParams() {
      const { category1Id, category2Id, category3Id } = this.$route.query;
      console.log(("Route params:", { category1Id, category2Id, category3Id }));
      try {
        if (!this.categoryList || this.categoryList.length === 0) {
          console.warn("Category list not loaded");
          await this.fetchCategoryList();
        }

        if (category1Id && !category2Id && !category3Id) {
          this.updateCategoriesForLevel1(category1Id);
        } else if (category2Id && !category3Id) {
          this.updateCategoriesForLevel2(category2Id);
        } else if (category3Id) {
          this.updateCategoriesForLevel3(category3Id);
        }
      } catch (error) {
        console.error("Failed to process route params", error);
      }
    },
    updateCategoriesForLevel1(category1Id) {
      // 使用 category1Id 查找该一级分类下的所有二级分类
      const secondLevelCategories = this.categoryList.filter(
        (category) => category.parentId === category1Id
      );

      //清空当前的选择
      this.clearCategories();

      //将查到的二级分类添加到 selectedCategories 中
      secondLevelCategories.forEach((category) => {
        this.addCategory({
          name: category.name,
          id: category.id,
          level: 2,
        });
      });
      //获取二级分类下的三级分类
      secondLevelCategories.forEach((category2) => {
        const thirdLevelCategories = this.categoryList.filter(
          (category) => category.parentId === category2.id
        );
        thirdLevelCategories.forEach((category3) => {
          this.addCategory({
            name: category3.name,
            id: category3.id,
            level: 3,
          });
        });
      });
      this.getSearchResult();
    },

    updateCategoriesForLevel2(category2Id) {
      const thirdLevelCategories = this.categoryList.filter(
        (category) => category.parentId === category2Id
      );
      this.clearCategories();

      thirdLevelCategories.forEach((category) => {
        this.addCategory({
          name: category.name,
          id: category.id,
          level: 3,
        });
      });
      this.getSearchResult();
    },
    async updateCategoriesForLevel3(category3Id) {
      console.log("Category list:", this.categoryList);
      console.log("Searching for category with ID:", category3Id);

      const selectedCategory = this.categoryList.find(
        (category) => category.id === parseInt(category3Id)
      );

      if (!selectedCategory) {
        console.error("Category not found", category3Id);
        return;
      }

      console.log("Selected Category:", selectedCategory);

      this.clearCategories();

      // 显式传递name属性
      this.addCategory({
        name: selectedCategory.name,
        id: selectedCategory.id,
        level: 3,
      });

      // 获取并显示该三级分类所属的二级分类
      const parentCategory2 = this.categoryList.find(
        (category) => category.id === selectedCategory.parentId
      );

      if (parentCategory2) {
        this.addCategory({
          name: parentCategory2.name,
          id: parentCategory2.id,
          level: 2,
        });

        // 获取并显示该二级分类所属的一级分类
        const parentCategory1 = this.categoryList.find(
          (category) => category.id === parentCategory2.parentId
        );

        if (parentCategory1) {
          this.addCategory({
            name: parentCategory1.name,
            id: parentCategory1.id,
            level: 1,
          });
        }
      }
      this.getSearchResult();
    },

    getGameType(attributes_summary) {
      const match = attributes_summary.match(/ジャンル:([^,]+)/);
      return match ? match[1] : "ジャンル情報なし";
    },
    getGameBrand(attributes_summary) {
      const match = attributes_summary.match(/ブランド:([^,]+)/);
      return match ? match[1] : "ブランド情報なし";
    },
    async handleAddCategory(category) {
      this.addCategory(category);

      const keyword = this.selectedCategories.map((c) => c.name).join("");
      console.log("search keyword", keyword);

      await this.getSearchResult({
        keyword: keyword,
      });
    },
  },
  mounted() {
    // 如果 `categoryList` 是异步加载的，请确保它加载完后再调用 `processRouteParams`
    this.fetchCategoryList().then(() => {
      if (!this.categoryList || this.categoryList.length === 0) {
        console.error("Category list not loaded");
      } else {
        this.processRouteParams();
      }
    });
    this.getSearchResult({});
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
