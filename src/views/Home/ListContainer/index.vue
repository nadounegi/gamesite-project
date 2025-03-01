<template>
  <!--列表-->
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <!-- エラーメッセージと状態を表示する -->
        <!--banner轮播-->
        <el-carousel :interval="4000" type="card" height="300px">
          <el-carousel-item  v-for="item in bannerList"
          :key="item.lunbo_no">
          <img :src="item.image_url" class="carousel-image" />
        </el-carousel-item>
        </el-carousel>
        <!-- <div class="swiper-container" id="mySwiper">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="item in bannerList"
              :key="item.lunbo_no"
            >
            <img :src="item.image_url" />

            </div>
          </div>
          <div class="swiper-pagination"></div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ListContainer',
  created () {
    this.fetchBannerList()
  },
  computed: {
    ...mapState({
      bannerList: (state) => state.home.bannerList
    })
  },
  methods: {
    ...mapActions('home', ['fetchBannerList'])
  }
}
</script>

<style lang="less" scoped>
.list-container {
  width: 1200px;
  margin: 0 auto;
}

.sortList {
  height: 464px;
  padding-left: 210px;
}

.center {
  box-sizing: border-box;
  width: 740px;
  height: 100%;
  padding: 5px;
  float: left;
}

/* 轮播图片样式 */
.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: contain; /* 让图片铺满卡片区域 */
  border-radius: 10px;
}

/* 调整卡片样式，避免错位 */
.el-carousel__item {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

</style>
