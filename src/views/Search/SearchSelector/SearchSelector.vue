<template>
  <div class="clearfix selector">
    <div class="type-wrap logo">
      <div class="fl key brand">ブランド</div>
      <div class="value logos">
        <ul class="logo-list">
          <li
            v-for="(brandmark, index) in brandmarkList"
            :key="brandmark.brand_id"
            @click="setBrandmark(`${brandmark.brand_id}:${brandmark.brand_name}`)">
            {{ brandmark.brand_name }}
          </li>
        </ul>
      </div>
      <div class="ext">
        <a href="javascript:void(0);" class="sui-btn">多选</a>
        <a href="javascript:void(0);">更多</a>
      </div>
    </div>
    <div
      class="type-wrap"
      v-for="(attr, index) in attrsList"
      :key="attr.attribute_id"
    >
      <div class="fl key">{{ attr.attr_name }}</div>
      <div class="fl value">
        <ul
          class="type-list"
          @click="addPropsItem($event, attr.attribute_id, attr.attr_name)"
        >
          <li v-for="(attrValue, index) in attr.attrValueList" :key="index">
            {{ attrValue }}
          </li>
        </ul>
      </div>
      <div class="fl ext"></div>
    </div>
    <div class="type-wrap">
      <div class="fl key">価格</div>
      <div class="fl value">
        <ul class="type-list">
          <li
            v-for="price in calculatePriceRanges([
              1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000,
            ])"
            :key="price.label"
          >
            <a
              href="javascript:void(0);"
              @click="handlePriceClick(price.min, price.max)"
            >
              {{ price.label }}</a
            >
          </li>
        </ul>
      </div>
      <div class="fl ext"></div>
    </div>
  </div>
</template>
  
  <script>
import { mapGetters } from "vuex";

export default {
  name: "SearchSelector",
  computed: {
    ...mapGetters("search", ["brandmarkList", "attrsList"]),
  },
  props: {
    setBrandmark: Function,
    setSearchProps: Function,
    applyPriceFilter: Function,
  },
  methods: {
    addPropsItem(event, attribute_id, attr_name) {
      if (event.target.nodeName.toUpperCase() === "LI") {
        this.setSearchProps(
          `${attribute_id}:${event.target.textContent} : ${attr_name}`
        );
      }
    },
    getUniqueValues(filed) {
      if (!this.subCategories || this.subCategories.length === 0) {
        return [];
      }
      const values = this.subCategories.map((category) => category[filed]);
      return [...new Set(values)];
    },
    calculatePriceRanges() {
      return [
        { label: "0-1000円", min: 0, max: 1000 },
        { label: "1000-3000円", min: 1000, max: 3000 },
        { label: "3000-5000円", min: 3000, max: 5000 },
        { label: "5000-7000円", min: 5000, max: 7000 },
        { label: "7000-10000円", min: 7000, max: 10000 },
        { label: "10000以上", min: 10000, max: Number.MAX_VALUE },
      ];
    },
    handlePriceClick(minPrice, maxPrice) {
      this.$emit("applyPriceFilter", { minPrice, maxPrice });
    },
  },
  loadSubCategories(category1Id) {
    this.subCategories = this.getChildren(category1Id);
    this.getGamePlatforms = this.getUniqueValues("platform");
    this.getGameGenre = this.getUniqueValues("genre");
    this.brandmarkList = this.getUniqueValues("brand");
  },
  getChildren(parentId) {
    return this.categoryList.filter(
      (category) => category.parentId === parentId
    );
  },
};
</script>
  
  <style lang="less" scoped>
.selector {
  border: 1px solid #ddd;
  margin-bottom: 5px;
  overflow: hidden;

  .logo {
    border-top: 0;
    margin: 0;
    position: relative;
    overflow: hidden;

    .key {
      padding-bottom: 87px !important;
    }
  }

  .type-wrap {
    margin: 0;
    position: relative;
    border-top: 1px solid #ddd;
    overflow: hidden;

    .key {
      width: 100px;
      background: #f1f1f1;
      line-height: 26px;
      text-align: right;
      padding: 10px 10px 0 15px;
      float: left;
    }

    .value {
      overflow: hidden;
      padding: 10px 0 0 15px;
      color: #333;
      margin-left: 120px;
      padding-right: 90px;

      .logo-list {
        li {
          float: left;
          border: 1px solid #e4e4e4;
          margin: -1px -1px 0 8px;
          width: 135px;
          height: 52px;
          text-align: center;
          line-height: 52px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
          color: #e1251b;
          font-style: italic;
          font-size: 14px;

          img {
            max-width: 100%;
            vertical-align: middle;
          }
        }
      }

      .type-list {
        li {
          float: left;
          display: block;
          margin-right: 30px;
          line-height: 26px;

          a {
            text-decoration: none;
            color: #666;
          }
        }
      }
    }

    .ext {
      position: absolute;
      top: 10px;
      right: 10px;

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
        padding: 0 10px;
        background: #fff;
        border: 1px solid #d5d5d5;
      }

      a {
        color: #666;
      }
    }
  }
}
</style>
