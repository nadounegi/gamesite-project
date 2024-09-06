//API接続口の統合管理

import requests from './request.js';
// //获取导航栏分类列表 /game/getCategoryList
// export const reqCategoryList =()=>{
//     // リクエストを送信 返信結果はPromiseオブジェクト
//    return requests({url:'/game/getCategoryList',method:'GET'});
// }
//获取导航栏分类列表 /game/getCategoryList シンプルな書き方
export function reqCategoryList(){
    return requests.get('/game/getCategoryList');
}
//获取轮播图 /game/getSwiper
export function reqGetBannerList(){
    return requests.get('/lunbo');
}
//游戏商品搜索/获取游戏列表 請求方法:POST /api/gamelist 参数持ち data:params 空き対象を持つ
export function reqGetSearchInfo(params){
    return requests.post('/gamelist',params);
}

export function reqGameList(params){
    return requests.post('/gamelist',params);
}