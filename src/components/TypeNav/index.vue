<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委托 -->
      <div @mouseleave="leaveHandler" @click="goSearch">
        <h2 class="all" @mouseenter="changeShow">全部商品カテゴリー</h2>
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2">
              <!-- 一級分類 -->
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
              >
                <h3
                  @mouseenter="enterHandler(index)"
                  :class="{ active: currentIndex == index }"
                >
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                  >
                    {{ c1.categoryName }}
                  </a>
                </h3>
                <div
                  class="item-list clearfix"
                  :style="{
                    display: currentIndex == index ? 'block' : 'none',
                  }"
                >
                  <!-- 二級分類 -->
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                        >
                          {{ c2.categoryName }}
                        </a>
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                          >
                            {{ c3.categoryName }}
                          </a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a>ビデオゲーム</a>
        <a>PCゲーム</a>
        <a>中古</a>
      </nav>
    </div>
  </div>
</template>


<script>
import { mapState } from "vuex";
import throttle from "/node_modules/lodash/throttle.js";
export default {
  name: "TypeNav",
  data() {
    return {
      //マウスがどのカテゴリーに乗せるかを判断する
      currentIndex: -1,
      show: true,
    };
  },

  methods: {
    enterHandler: throttle(function (index) {
      this.currentIndex = index;
    }, 20),
    leaveHandler() {
      this.currentIndex = -1;
      if (this.$route.path != "/home") {
        //ホームページ以外のページに行くと、カテゴリーが消える
        this.show = false;
      }
    },
    changeShow() {
      if (this.$route.path != "/home") {
        this.show = true;
      }
    },
    goSearch(event) {
      let { categoryname, category1id, category2id, category3id } =
        event.target.dataset;
      let query = {};
      if (category3id) query.category3id = category3id; // 优先传递三级分类
      else if (category2id)
        query.category2id = category2id; // 如果没有三级分类，传递二级分类
      else if (category1id) query.category1id = category1id; // 如果没有二级分类，传递一级分类

      if (categoryname) query.categoryName = categoryname; // 分类名称

      this.$router.push({
        name: "search",
        query,
        params: this.$route.params,
      });
    },
  },
  mounted() {
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  created() {
    //这个一定要添，否则不出数据
    this.$store.dispatch("home/fetchCategoryList");
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #6125a1;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #6125a1;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        cursor: pointer;
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              cursor: pointer;
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 462px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 85px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }

            .fore {
              a {
                cursor: pointer;
              }
            }
          }
          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          //マウスが乗せたカテゴリーの色を変える
          background: rgb(184, 153, 232);
        }
      }
      .item.cur .item-list {
        display: block;
      }
    }
    //アニメーション様式
    //アニメーションの開始状態
    .sort-enter {
      height: 0;
    }
    //アニメーションの終了状態
    .sort-enter-to {
      height: 461px;
    }
    .sort-enter-active {
      transition: all 0.5s linear;
    }
    .sort-leave {
      height: 461px;
    }
    .sort-leave-to {
      height: 0px;
    }
    .sort-leave-active {
      transition: all 0.5s linear;
    }
  }
}
</style>
