<template>
  <!--列表-->
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <!-- エラーメッセージと状態を表示する -->
        <div v-if="isBannerLoading">Loading banners</div>
        <div v-if="bannerError">{{ bannerError }}</div>
        <div v-else>
          <!--banner轮播-->
          <div class="swiper-container" id="mySwiper">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide"
                v-for="item in bannerList"
                :key="item.lunbo_no"
              >
                <img :src="item.image_url" />
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
  </div>
</template>


<script>
import { mapState, mapActions } from "vuex";
import Swiper from "swiper";
export default {
  name: "ListContainer",
  components: {
    Swiper,
  },
  computed: {
    ...mapState("home", {
      bannerList: (state) => state.bannerList,
      isBannerLoading:state => state.isBannerLoading,
      bannerError:state => state.bannerError
    }),
  },
  watch: {
    bannerList: {
      handler(newValue) {
        if (newValue.length > 0) {  // 确保bannerList中有数据时才初始化Swiper
          this.$nextTick(() => {
            new Swiper('#mySwiper', {
              loop: true,
              autoplay: {
                delay: 2500,
                stopOnLastSlide: false,
                disableOnInteraction: true,
              },
              pagination: {
                el: '.swiper-pagination',
                clickable: true
              },
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
            });
          });
        }
      },
      immediate: true // 立即触发，防止初始加载时没有初始化
    }
  },
  created() {
    this.fetchBannerList();
  },
  // updated(){

  //     // 初始化swiper
  //     var mySwiper =  new Swiper('#mySwiper', {
  //       loop: true, // 循环模式选项
  //       autoplay: {
  //         delay: 2500,//1秒切换一次
  //         stopOnLastSlide: false,//最后一个slide停止自动播放
  //         disableOnInteraction: true,//用户操作swiper之后，是否禁止autoplay。默认为true：停止。
  //       },

  //       // 如果需要分页器
  //       pagination: {
  //         el: '.swiper-pagination',
  //         clickable :true
  //       },
  //       // 如果需要前进后退按钮
  //       navigation: {
  //         nextEl: '.swiper-button-next',
  //         prevEl: '.swiper-button-prev',
  //       },
  //     });
  // },
  mounted() {
    this.$store
      .dispatch("home/fetchBannerList")
      .then(() => {
      })
      .catch((error) => {
        console.error("Failed to fetch banner list:", error);
      });
  },
  methods: {
    ...mapActions("home", ["fetchBannerList"]),
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
