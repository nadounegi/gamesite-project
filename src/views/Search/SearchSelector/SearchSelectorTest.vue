<template>
  <div class="clearfix selector">
    <div class="type-wrap logo">
      <div class="fl key brand">ブランド</div>
      <div class="value logos">
        <ul class="logo-list">
          <li v-for="brand in brandmarkList" :key="brand.brand_id">{{brand.brand_name}}</li>
        </ul>
      </div>
      <div class="ext">
        <a href="javascript:void(0);" class="sui-btn">多选</a>
        <a href="javascript:void(0);">更多</a>
      </div>
    </div>
    <div class="type-wrap">
      <div class="fl key">機種</div>
      <div class="fl value">
        <ul class="type-list">
          <li v-for="platform in getGamePlatforms" :key="platform">
            <a>{{platform}}</a>
          </li>
        </ul>
      </div>
      <div class="fl ext"></div>
    </div>
    <div class="type-wrap">
      <div class="fl key">ジャンル</div>
      <div class="fl value">
        <ul class="type-list">
          <li v-for="genre in getGameGenre" :key="genre">
            <a>{{ genre }}</a>
          </li>
        </ul>
      </div>
      <div class="fl ext"></div>
    </div>
   
    <div class="type-wrap">
      <div class="fl key">价格</div>
      <div class="fl value">
        <ul class="type-list">
          <li v-for="priceRange in uniquePriceRanges" :key="priceRange">
            <a>{{priceRange}}</a>
          </li>
        </ul>
      </div>
      <div class="fl ext">
      </div>
    </div>

  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex';

export default {
data(){
  return{
    subCategories: [],
    categoryList:[]
  }
},
name: 'SearchSelector',
computed: {
  ...mapState("search", ["goodsList","brandmarkList","selectedCategories","attrsList"]),  
  getGamePlatforms(){
    return this.getUniqueValues('platform');
  },
  getGameGenre(){
    return this.getUniqueValues('genre');
  },
  uniquePriceRanges(){
    return this.calculatePriceRanges(this.goodsList.map(item => item.price));
  }
},
methods: {
  ...mapActions("search",["addCategory","removeCategory","clearCategories","getSearchResult"]),

  getUniqueValues(filed){
    if(!this.subCategories || this.subCategories.length === 0){
      return [];
    }
    const values = this.subCategories.map(category => category[filed]);
    return [...new Set(values)];
  },
  calculatePriceRanges(prices) {
    const ranges = [
      { label: "0-1000円", min: 0, max: 1000 },
      { label: "1000-3000円", min: 1000, max: 3000 },
      { label: "3000-5000円", min: 3000, max: 5000 },
      { label: "5000-7000円", min: 5000, max: 7000 },
      { label: "7000-10000円", min: 7000, max: 10000 },
      { label: "10000以上", min: 10000, max: Math.max(...prices) }
    ];

    const uniqueRanges = new Set();
    prices.forEach(price => {
      const range = ranges.find(r => price >= r.min && price < r.max);
      if (range) uniqueRanges.add(range.label);
    });

    return Array.from(uniqueRanges);
  },
  loadSubCategories(category1Id){
    this.subCategories = this.getChildren(category1Id);
    this.getGamePlatforms = this.getUniqueValues('platform');
    this.getGameGenre = this.getUniqueValues('genre');
    this.brandmarkList = this.getUniqueValues('brand');
  },
  getChildren(parentId){
    return this.categoryList.filter(
      (category) => category.parentId === parentId
    );
  },
 
},
mounted(){
  this.getSearchResult();
  const {category1Id} = this.$route.query;
  if(category1Id){
    this.loadSubCategories(category1Id);
  }
}
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
            margin: -1px -1px 0 0;
            width: 105px;
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
