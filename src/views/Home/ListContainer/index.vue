<template>
  <!--列表-->
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <!-- エラーメッセージと状態を表示する -->
        <!--banner轮播-->
        <div class="swiper-container" id="mySwiper">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="item in bannerList"
              :key="item.lunbo_no"
            >
            <img :src="item.imageUrl" />

            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>
          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
export default {
  name: "ListContainer",
  components: {
    Swiper,
  },
  created() {
    this.$store.dispatch("home/fetchBannerList").then(()=>{
    }).catch(error => {
      console.error("获取轮播图数据失败", error);
    })
    // this.$store.dispatch("home/fetchBannerList");
    // console.log("bannerList", this.bannerList);
  },
  computed: {
    ...mapState({
      bannerList: (state) => state.home.bannerList,
    })
    // ...mapGetters({
    //   bannerList: "home/bannerList",
    // }),
  },
  // watch: {
  //   bannerList () {
  //     // 能在这里直接初始化Swiper类的实例吗?
  //     // 不能在当前状态直接初始化Swiper类的实例,因为这里只能保证数据发生变化了[服务器数据回来了],
  //     // 但是你不能保证v-for遍历的结构完事了.
  //     this.$nextTick(() => {
  //       // 初始化Swiper类的实例
  //       const mySwiper = new Swiper(document.querySelector('.swiper-container'), {
  //         // 设置轮播图防线
  //         direction: 'horizontal',
  //         // 开启循环模式
  //         loop: true,
  //         // 如果需要分页器
  //         pagination: {
  //           el: '.swiper-pagination',
  //           // 分页器类型
  //           type: 'bullets',
  //           // 点击分页器，切换轮播
  //           clickable: true
  //         },
  //         // 自动轮播
  //         autoplay: {
  //           delay: 1000,
  //           // 新版本的写法：目前是5版本
  //           // pauseOnMouseEnter: true,
  //           // 如果设置为true，当切换到最后一个slide时停止自动切换
  //           stopOnLastSlide: true,
  //           // 用户操作swiper之后，是否禁止autoplay
  //           disableOnInteraction: false
  //         },
  //         // 如果需要前进后退按钮
  //         navigation: {
  //           nextEl: '.swiper-button-next',
  //           prevEl: '.swiper-button-prev'
  //         }
  //         // 切换效果
  //         // effect: "cube",
  //       })

  //       // 1:swiper插件,对外暴露一个Swiper构造函数
  //       // 2:Swiper构造函数需要传递参数 1、结构总根节点CSS选择器|根节点真实DOM节点  2、轮播图配置项
  //       // 鼠标进入停止轮播
  //       mySwiper.el.onmouseover = function () {
  //         mySwiper.autoplay.stop()
  //       }
  //       // 鼠标离开开始轮播
  //       mySwiper.el.onmouseout = function () {
  //         mySwiper.autoplay.start()
  //       }
  //     })
  //   }
  // },
  mounted() {
    this.$store.dispatch("home/fetchBannerList").then(() => {
      this.$nextTick(() => {
        const mySwiper = new Swiper(".swiper-container", {
          direction: "horizontal", //设置轮播图方向 水平方向
          loop: true, //开启循环模式
          pagination: {
            el: ".swiper-pagination", //设置分页器
            clickable: true, //点击分页器切换轮播
          },
          autoplay: {
            delay: 1500,
            disableOnInteraction: false, //用户操作swiper之后是否禁止autoplay
          },
          navigation: {
            nextEl: ".swiper-button-next", //前进按钮
            prevEl: ".swiper-button-prev", //后退按钮
          },
        });
        mySwiper.el.onmouseover = function(){//鼠标进入停止轮播
          mySwiper.autoplay.stop();          
        }
        mySwiper.el.onmouseout = function(){//鼠标离开开始轮播
          mySwiper.autoplay.start()
        }
      });
    });
  },
};
</script>

<style lang="less" scoped>
.list-container {
  width: 1200px;
  margin: 0 auto;

  .sortList {
    height: 464px;
    padding-left: 210px;

    .center {
      box-sizing: border-box;
      width: 740px;
      height: 100%;
      padding: 5px;
      float: left;

      .swiper-container {
        width: 100%;
        height: 100%;

        .swiper-slide {
          display: flex;
          justify-content: center;
          align-items: center;
          object-fit: cover;
        }
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
