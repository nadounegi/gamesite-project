<template>
  <div>
    <!-- 頭部 第一行 -->
    <header class="header">
      <div class="top">
        <div class="container">
          <div class="loginList">
            <p>ようこそ、ナットウゲームショップへ！</p>
            <router-link to="/login">ログイン</router-link>
            <router-link to="/Register">新規登録</router-link>
          </div>
          <div class="navList">
            <a href="#">注文履歴</a>
            <a href="#">マイカート</a>
            <a href="#">マイページ</a>
            <a href="#">店舗管理</a>
          </div>
        </div>
      </div>
      <!-- 頭部第二行 捜索区域 -->
      <div class="bottom">
        <h1 class="logoArea">
          <router-link to="/" class="logo">
            <img :src="logo" alt="" />
          </router-link>
        </h1>
        <div class="searchArea">
          <form action="#" class="searchForm">
            <input
              type="text"
              id="autocomplete"
              class="input-error input-xxlarge"
              v-model="keyword"
              placeholder="商品名、商品IDで検索"
            />
            <button
              class="sui-btn btn-xlarge btn-danger"
              type="button"
              @click="goSearch"
            >
              捜索
            </button>
          </form>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import logo from "@/components/Header/images/logo.png";
import { mapActions } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      logo,
      keyword: "",
    };
  },
  methods: {
  ...mapActions('search', ['getSearchResult']),
  goSearch() {
    if (this.keyword) {
      this.getSearchResult({
        keyword: this.keyword
      });
      this.$router.push({
        name: "search",
        params: { keyword: this.keyword }
      });
    }
  },
},

};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
        a {
          padding: 0 5px;
          text-decoration: none;
        }
      }

      .navList {
        float: right;

        a {
          padding: 0 10px;
          text-decoration: none;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 150px;
          margin: 1px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #3936eacc;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #3936eacc;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
