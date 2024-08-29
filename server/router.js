const express = require('express')
const router = express.Router()
const axios = require('axios')
//データベース接続
const getSql = require('./mysql.js')

router.use(express.json())

// カテゴリリスト
router.get('/api/game/getCategoryList', async (req, res) => {
  res.setHeader('Cache-Control','no-cache');
  try{
    // カテゴリリストを取得
    const allCategories = await getSql('SELECT category_id,category_name,parent_id,level FROM category_mst',[]);

    const categoryMap = {};
    //カテゴリーを辞書に保存、キーはcategory_id,値はカテゴリ対象
    const categoryList = allCategories.map(category =>({
      id: category.category_id,
      name: category.category_name,
      parentId: category.parent_id,
      level: category.level
    }));
    res.json({
      code:200,
      message:"カテゴリーリスト取得成功",
      data: categoryList,
      ok:true
    });
  }catch(error){
    console.error('データ取得エラー:', error);
    res.status(500).json({message:"エラーが発生しました。"});
  }
});


//輪播図
router.get('/api/lunbo', (req, res) => {
  getSql('select * from lunbo_tb', [])
  .then(result => {
    if (result.length > 0) {
      res.send({
        status: 200,
        data: result
      });
    } else {
      res.send({
        status: 404,
        message: 'データが見つかりません'
      });
    }
  }).catch(error => {
    console.error('データ取得エラー:', error);
    res.status(500).json({message: 'データ取得エラー'});
  });
});

//ゲーム商品リスト
router.post('/api/gamelist',async(req,res)=>{
  // リクエストパラメータを取得
  const {category1Id,category2Id,category3Id,brandmark} = req.body;
  let goodsSql = `
  SELECT
      g.game_name,
      g.price,
      g.stock,
      g.image_url,
      GROUP_CONCAT(CONCAT(am.attr_name, ':', av.VALUE) SEPARATOR ', ') AS attributes_summary
  FROM
      game_tb g
  JOIN
      attribute_values_mst av ON g.game_id = av.game_id
  JOIN
      attributes_mst am ON av.attribute_id = am.attribute_id
  WHERE
      g.delete_ku = '0'
  GROUP BY
      g.game_name,g.price,g.stock,g.image_url;`
  ;

  let params = [];
 try{
  const goodsResult = await getSql(goodsSql,params);
  const brandResult = await getSql("SELECT brand_id,brand_name FROM brands_mst",[]);
  const attrResult = await getSql("SELECT attribute_id,attr_name FROM attributes_mst",[]);

  if(goodsResult && goodsResult.length > 0){
    res.send({
      code:200,
      message:"取得成功",
      data:{
        brandmarkList:brandResult,
        attrsList:attrResult,
        goodsList:goodsResult
      },
      ok:true
    });
  }else{
    res.send({
      code:404,
      meesage:"ゲーム商品は見つかりません",
      data:{
        brandmarkList:brandResult || [],
        attrsList: attrResult || [],
        goodsList: []
      },
      ok:false
    });
  }
 }catch(error){
  console.error('データ取得エラー',error),
  res.status(500).send({
    code:500,message:"データ取得エラー",
    ok:false
  })
}
});

//商品検索
router.post('/api/gamelist', async(req, res) => {
  // リクエストパラメータを取得
  const { category1Id, category2Id, category3Id, keyword, props, brandmark, order, pageNo = 1, pageSize = 10 } = req.body;
  // 基本的なSQL検索クエリ
  let goodsSql = `
  SELECT 
      g.game_name,
      g.description,
      g.price,
      g.stock,
      g.image_url,
      GROUP_CONCAT(CONCAT(am.attr_name, ':', av.VALUE) SEPARATOR ', ') AS attributes_summary
  FROM 
      game_tb g
  JOIN 
      attribute_values_mst av ON g.game_id = av.game_id
  JOIN 
      attributes_mst am ON av.attribute_id = am.attribute_id
  WHERE 
      g.delete_ku = '0'`;

  let params = [];

  // 検索条件を追加
  if (category1Id) {
    goodsSql += " AND category1_id = ?";
    params.push(category1Id);
  }
  if (category2Id) {
    goodsSql += " AND category2_id = ?";
    params.push(category2Id);
  }
  if (category3Id) {
    goodsSql += " AND category3_id = ?";
    params.push(category3Id);
  }
  if (keyword) {
    const keywords = keyword.split(' ');
    keywords.forEach((word,index) =>{
      goodsSql += " AND g.game_name LIKE ? OR g.description LIKE ?";
      params.push(`%${word}%`,`%${word}%`);
    });
  }

  // ORDER BY句の追加（昇順、降順）
  if (order === '1') {
    goodsSql += " ORDER BY g.game_id ASC";  // 総合順番
  } else if (order === '2') {
    goodsSql += " ORDER BY g.price ASC";  // 価格昇順
  } else if (order === '3') {
    goodsSql += " ORDER BY g.price DESC";  // 価格降順
  } else if (order === '4') {
    goodsSql += " ORDER BY g.game_id DESC";  // 総合降順
  }

  // GROUP BY句とLIMIT句の追加
  goodsSql += " GROUP BY g.game_id LIMIT ?, ?";
  params.push((pageNo - 1) * pageSize, pageSize);

  try{
    const goodsResult = await getSql(goodsSql, params);
    const brandResult = await getSql("SELECT brand_id,brand_name FROM brands_mst",[]);
    const attrResult = await getSql("SELECT attribute_id,attr_name FROM attributes_mst",[]);

    if(goodsResult && goodsResult.length>0){
      const totalResult = await getSql("SELECT COUNT(*) as count FROM game_tb WHERE delete_ku = '0'");
      const total = totalResult[0].count;
      const totalPages = Math.ceil(total / pageSize);

      res.send({
        code: 200,
        message:"検索成功",
        data:{
          brandmarkList:brandResult,
          attrsList:attrResult,
          goodsList:goodsResult,
          total:total,
          pageSize:pageSize,
          pageNo:pageNo,
          totalPages:totalPages
        },
        ok:true
      });
    }else{
      res.send({
        code:404,
        meesage:"該当ゲームが見つかりません",
        data:{
          brandmarkList:brandResult || [],
          attrsList:attrResult || [],
          goodsList:[],
          total:0,
          pageSize:pageSize,
          pageNo:pageNo,
          totalPages:0
        },
        ok:false
      });
    }
  } catch(error){
    console.error('データ取得エラー:', error);
    res.status(500).send({
      code:500,
      message:"データ取得エラー",
      ok:false
    });
  }
});
      
module.exports = router
