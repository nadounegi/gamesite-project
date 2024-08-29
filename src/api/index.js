//API接続口の統合管理

import requests from './request.js';
// //获取导航栏分类列表 /game/getCategoryList
// export const reqCategoryList =()=>{
//     // リクエストを送信 返信結果はPromiseオブジェクト
//    return requests({url:'/game/getCategoryList',method:'GET'});
// }
//获取导航栏分类列表 /game/getCategoryList シンプルな書き方
export const reqCategoryList = () => requests({ url: '/api/game/getCategoryList', method: 'GET' });

//获取轮播图 /game/getSwiper
export const reqGetBannerList = () => requests({ url: '/api/lunbo', method: 'GET' });

//游戏商品搜索/获取游戏列表 請求方法:POST /api/gamelist 参数持ち data:params 空き対象を持つ
export const reqGetSearchInfo = (params) => requests({ url: '/api/gamelist', method: 'POST', data: params });
export const reqGameList = (params) => requests({url:'/api/gamelist',method:'POST',data:params});