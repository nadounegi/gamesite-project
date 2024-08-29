<template>
  <div :class="['carousel', {'carousel--active': menuActive}]" style="margin: 0 auto;">
    <div class="carousel__images">
      <div
        class="carousel__img"
        v-for="(item, index) in lunboList"
        :key="index"
        :style="{ backgroundImage: 'url(' + item.image_url + ')' }"
        :class="{ active: activeIndex === index }"
      >
        <div>
          <h1 class="carousel__title">{{ item.title }}</h1>
        </div>
      </div>
    </div>
    <div class="carousel__navigation">
      <div
        class="carousel__nav-button"
        v-for="(item, index) in lunboList"
        :key="index"
        @mouseover="setActiveIndex(index)"
      >
        <img :src="item.image_url" :alt="item.title" class="carousel__nav-img">
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: ['menuActive'],
  computed: {
    ...mapGetters('lunbo', ['lunboList'])
  },
  created () {
    this.getLunboList();
  },
  data () {
    return {
      activeIndex: 0
    };
  },
  methods: {
    ...mapActions('lunbo', ['getLunboList']),
    setActiveIndex (index) {
      this.activeIndex = index;
    }
  }
};
</script>
<style>

/* レスポンシブ ページ */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html, body {
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel {
  width: 74vw;
  max-width: 86vw;
  height: 97vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  left: 12px;
  top: 177px;
}

.carousel__images {
  width: 99%;
  height: 80vh;
  max-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.carousel__img {
  position: absolute;
  top: 0;
  left: 0;
  width: 91%;
  height: 93%;
  background-size: cover;
  background-position: center;
  display: none;
}

/* 这个.img.active不能删 */
.carousel__img.active {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
}

.carousel__title {
  z-index: 1;
  color: white;
  position: relative;
  top: -143px;
  font-size: 40px;
  animation: h1Animation 0.4s ease-out;
  z-index: 1;
}

@keyframes h1Animation {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
}

.carousel__navigation {
  width: 93%;
  height: 120px;
  margin-top: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  overflow-x: auto;
  padding: 10px;
  bottom: 147px;
  right: 15px;
  position: relative;
  overflow: hidden;
}

.carousel__nav-button {
  width: 178px;
  height: 100px;
  position: relative;
  border: 4px solid transparent;
  box-sizing: border-box;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  color: white;
  overflow: hidden;
  user-select: none;
  margin: 0 5px;
  cursor: pointer;
}

.carousel__nav-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.carousel__nav-button:hover {
  border: 4px solid #005A9E;
}

@keyframes imgAnimation {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.carousel__nav-button > * {
  transition: all 0.2s ease-out;
}

.carousel__nav-button > h1 {
  margin-left: 10px;
  opacity: 1;
}

.carousel__nav-button > img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  transform: scale(1);
  transition: transform 0.3s ease-out;
}

.carousel__nav-button:hover > img {
  transform: scale(1.1);
}

@media only screen and (max-width:1536px){

  .carousel {
    width: 74vw;
    max-width: 86vw;
    height: 97vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    left: 42px;
    top: 177px;
    }

  .carousel__images {
    width: 99%;
    height: 80vh;
    max-height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .carousel__img {
    position: absolute;
    top: 0;
    left: 0;
    width: 91%;
    height: 93%;
    background-size: cover;
    background-position: center;
    display: none;
  }
  /* 这个.img.active不能删 */
  .carousel__img.active {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 20px;
  }

  .carousel__title {
    z-index: 1;
    color: white;
    position: relative;
    top: -143px;
    font-size: 40px;
    animation: h1Animation 0.4s ease-out;
    z-index: 1;
  }

  @keyframes h1Animation {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  .carousel__navigation {
    width: 66vw;
    height: 120px;
    margin-top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    overflow-x: auto;
    padding: 10px;
    bottom: 161px;
    right: 48px;
    position: relative;
  }

  .carousel__nav-button {
    width: 178px;
    height: 100px;
    position: relative;
    border: 4px solid transparent;
    box-sizing: border-box;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    color: white;
    overflow: hidden;
    user-select: none;
    margin: 0 5px;
    cursor: pointer;
  }

  .carousel__nav-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .carousel__nav-button:hover {
    border: 4px solid #005A9E;
  }

  @keyframes imgAnimation {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .carousel__nav-button > * {
    transition: all 0.2s ease-out;
  }

  .carousel__nav-button > h1 {
    margin-left: 10px;
    opacity: 1;
  }

  .carousel__nav-button > img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transform: scale(1);
    transition: transform 0.3s ease-out;
  }

  .carousel__nav-button:hover > img {
    transform: scale(1.1);
  }

}
@media only screen and (max-width:1024px){

  .carousel {
    width: 79vw;
    max-width: 86vw;
    height: 77vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    left: 12px;
    top: 183px;
  }

  .carousel__images {
    width: 77%;
    height: 80vh;
    max-height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
  }

  .carousel__img {
    position: absolute;
    top: 0;
    left: 0;
    width: 91%;
    height: 93%;
    background-size: cover;
    background-position: center;
    display: none;
  }
  /* 这个.img.active不能删 */
  .carousel__img.active {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 20px;
  }

  .carousel__title {
    z-index: 1;
    color: white;
    position: relative;
    top: -94px;
    font-size: 30px;
    animation: h1Animation 0.4s ease-out;
    z-index: 1;
  }

  @keyframes h1Animation {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  .carousel__navigation {
    width: 51.8vw;
    height: 120px;
    margin-top: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    overflow-x: auto;
    padding: 10px;
    bottom: 144px;
    right: 27px;
    position: relative;
  }

  .carousel__nav-button {
    width: 178px;
    height: 100px;
    position: relative;
    border: 4px solid transparent;
    box-sizing: border-box;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    color: white;
    overflow: hidden;
    user-select: none;
    margin: 0 -19px;
    cursor: pointer;
  }

  .carousel__nav-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .carousel__nav-button:hover {
    border: 4px solid #005A9E;
  }

  @keyframes imgAnimation {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .carousel__nav-button > * {
    transition: all 0.2s ease-out;
  }

  .carousel__nav-button > h1 {
    margin-left: 10px;
    opacity: 1;
  }

  .carousel__nav-button > img {
    width: 62%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transform: scale(1);
    transition: transform 0.3s ease-out;
  }

  .carousel__nav-button:hover > img {
    transform: scale(1.1);
  }

}

</style>
