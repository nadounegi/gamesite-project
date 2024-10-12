// API接続口の統合管理

import requests from './request.js'
// //获取导航栏分类列表 /game/getCategoryList
// export const reqCategoryList =()=>{
//     // リクエストを送信 返信結果はPromiseオブジェクト
//    return requests({url:'/game/getCategoryList',method:'GET'});
// }
// 获取导航栏分类列表 /game/getCategoryList シンプルな書き方

export function reqCategoryList () {
  return requests.get('/getCategoryList')
}
// 获取轮播图 /game/getSwiper
export function reqGetBannerList () {
  return requests.get('/lunbo')
}

export async function reqGameList(consoleName) {
  try{
    const response = await requests.get(`/gameList/console/${consoleName}`);
    return response;
  }catch(error){
    console.error(`Error fetching gameList for ${consoleName}:`,error);
    throw error;
  }
}
