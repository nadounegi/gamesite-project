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
// 获取游戏列表(分页)
export function reqGameListPage (size = 10, offset = 0) {
  return requests.get('/gameList', {
    params: { size, offset } // MySQL の `LIMIT` 仕様に合わせる
  })
}
// 获取游戏分类列表
export async function reqGenreList () {
  return requests.get('/genres')
}
// 添加游戏分类
export async function reqAddGenre (genreName) {
  return requests.post('/addGenre', null, { params: { genreName } })
}
// 获取游戏列表(全部)
export async function reqAllGamesList () {
  return requests.get('/gameList/all')
}
// 添加游戏
export async function reqAddGame (gameData) {
  try {
    const formData = new FormData()
    formData.append('gameName', gameData.gameName)
    formData.append('description', gameData.description)
    formData.append('price', String(gameData.price))
    formData.append('stock', String(gameData.stock))
    formData.append('platformId', String(gameData.platform))
    formData.append('genreId', String(gameData.genre))
    formData.append('brandId', String(gameData.brand))
    // 画像アップロード
    if (gameData.image) {
      formData.append('image', gameData.image)
    }
    const response = await requests.post('/gameList/addGames', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    console.log('API Response:', response)
    return response
  } catch (error) {
    console.error('API Call Error: ', error)
    throw error // 抛出错误，让前端 `catch`
  }
}
// 添加游戏平台
export async function reqAddPlatform (platformType) {
  return requests.post('/addPlatform', null, { params: { platformType } })
}
// 获取游戏平台列表
export async function reqPlatformList () {
  return requests.get('/platforms')
}
// 获取游戏厂商
export async function reqBrandList () {
  return requests.get('/brand')
}
// 添加游戏厂商
export async function reqAddBrand (brandName) {
  return requests.post('/addBrand', null, { params: { brandName } })
}
// 上传图片
export function reqUploadImage (formData) {
  return requests.post('/upload/image', formData)
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
