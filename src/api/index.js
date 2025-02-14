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

export function reqGameListPage (size = 10, offset = 0) {
  return requests.get('/gameList', {
    params: { size, offset } // MySQL の `LIMIT` 仕様に合わせる
  })
}

export async function reqGenreList () {
  return requests.get('/genres/all')
}
export async function reqAddGenre (genreName) {
  return requests.post('/genres', null, { params: { genreName } })
}

export async function reqGameList () {
  return requests.get('/gameList')
}

export async function reqAddGame (gameData) {
  return requests.post('/games', gameData, {
    headers: { 'Content-Type': 'application/json' }
  })
}

export function reqUploadImage (formData) {
  return requests.post('/upload', formData)
}

// 検索機能 キーワード検索ナヴィゲーションバーの検索機能
export async function reqGetSearchInfo (searchParams) {
  return requests({
    url: '/searchResult',
    method: 'post',
    data: searchParams,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export function registerUser (userInfo) {
  return requests.post('/user/register', userInfo)
}
