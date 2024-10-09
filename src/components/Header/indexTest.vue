  <template>
    <!-- 商品分类导航 -->
    <div class="type-nav">
      <div class="container">
        <!-- イベントの委託 -->
        <div @mouseleave="leaveShow" @mouseenter="entershow">
          <h2 class="all">全部商品カテゴリー</h2>
          <transition>
            <div class="sort" v-show="isShow">
              <div class="all-sort-list2" @click="goSearch">
                <div
                  class="item"
                  v-for="(c1, index) in categoryList"
                  :key="c1.categoryId"
                  :class="{ cur: currentIndex == index }"
                >
                  <!-- mouseenterイベントを使って、マウスに乗せたカテゴリーの色を変える -->
                  <h3 @mouseenter="changeIndex(index)">
                    <!-- タグaを取得するため -->
                    <a
                      :data-categoryName="c1.categoryName"
                      :data-category1Id="c1.categoryId"
                      >{{ c1.categoryName }}</a
                    >
                  </h3>
                  <!-- 二級、三級分類 -->
                  <div
                    class="item-list clearfix"
                    :style="{ display: currentIndex == index ? 'block' : 'none' }"
                  >
                    <div
                      class="subitem"
                      v-for="c2 in c1.categoryChild"
                      :key="c2.categoryId"
                    >
                      <dl class="fore">
                        <dt>
                          <a
                            :data-categoryName="c2.categoryName"
                            :data-category2Id="c2.categoryId"
                            >{{ c2.categoryName }}</a
                          >
                        </dt>
                        <dd>
                          <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                            <a
                              :data-categoryName="c3.categoryName"
                              :data-category3Id="c3.categoryId"
                              >{{ c3.categoryName }}</a
                            >
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
          <a>ゲーム機＆コントローラー</a>
          <a>中古</a>
        </nav>
      </div>
    </div>
  </template>

<script>
import debounce from 'lodash/debounce'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'TypeNav',
  data () {
    return {
      // マウスがどのカテゴリーに乗せるかを判断する
      currentIndex: -1,
      isShow: true
    }
  },
  // コンポーネントが載せれると、サーバーにリクエストを送る
  mounted () {
    // コンポーネントが載せられると、isShowをfalseにする
    if (this.$route.path !== '/home') this.isShow = false
  },
  created () {
    this.fetchCategoryList()
  },
  computed: {
    ...mapGetters('home', ['categoryList']),
    // 防抖
    debouncedChangeIndex () {
      return debounce(this.changeIndex, 500)
    }
  },
  methods: {
    ...mapActions('search', ['addCategory', 'removeCategory', 'getSearchResult']),
    ...mapActions('home', ['fetchCategoryList']),
    // mouseenterイベントを使って,レスポンシブデータcurrentIndexを変更する
    // マウスに乗せたカテゴリーの色を変えるため
    changeIndex (index) {
      // indexは、マウスに乗せたカテゴリーのインデックス
      this.currentIndex = index
    },
    entershow () {
      this.isShow = true
    },
    // mouseleaveイベントを使って、レスポンシブデータcurrentIndexを変更する
    // マウスがカテゴリーから離れた時、カテゴリーの色を元に戻す
    leaveShow () {
      // searchコンポーネントの場合は、マウスがカテゴリーから離れた時、カテゴリーを隠す
      if (this.$route.path !== '/home') {
        this.isShow = false
      }
      this.currentIndex = -1
    },
    // カテゴリーをクリックすると、検索ページに飛ぶ
    goSearch (event) {
      const element = event.target
      const { categoryname, category1id, category2id, category3id } = element.dataset
      const selectCategory = {
        name: categoryname,
        id: category1id || category2id || category3id
      }

      this.addCategory(selectCategory)

      if (categoryname) {
        const location = {
          name: 'search',
          params: { keyword: categoryname },
          query: {}
        }
        // カテゴリーのidをクエリに追加する
        if (category1id) {
          location.query.category1Id = category1id
        } else if (category2id) {
          location.query.category2Id = category2id
        } else {
          location.query.category3Id = category3id
        }

        location.query.categoryName = categoryname
        this.$router.push(location)
      }
    },
    // マウスがカテゴリーに乗せると、カテゴリーの詳細を表示する
    entershow () {
      this.isShow = true
    }
  }
}
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
