<!-- eslint-disable vue/multi-word-component-names -->
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
import { reqGetBannerList } from '@/api/index.js'
import Swiper from 'swiper'
import 'swiper/css' // ✅ 最新 Swiper 版本使用这个
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default {
  data () {
    return {
      bannerList: []
    }
  },
  methods: {
    // 获取轮播图数据
    async fetchBannerList () {
      try {
        const result = await reqGetBannerList()
        if (result.code === 200 && Array.isArray(result.data)) {
          this.bannerList = result.data
          this.$nextTick(() => {
            this.initSwiper()
          })
        } else {
          this.$message.error('カルーセルデータ取得に失敗しました')
        }
      } catch (error) {
        console.error('カルーセル取得エラー：', error)
        this.$message.error('エラーが発生しました: ' + error.message)
      }
    },
    // 初始化 Swiper 轮播图
    initSwiper () {
      const mySwiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: true, // 无限循环
        pagination: { // 分页
          el: '.swiper-pagination',
          clickable: true
        },
        autoplay: {
          delay: 1500,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      })
      mySwiper.el.onmouseover = function () {
        mySwiper.autoplay.stop()
      }
      mySwiper.el.onmouseout = function () {
        mySwiper.autoplay.start()
      }
    }
  },
  mounted () {
    this.fetchBannerList()
  }
}
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
