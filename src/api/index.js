import requests from './request.js'

export function reqGameByCase ({ page = 1, size = 10 } = {}) {
  return requests({
    url: '/gamesList',
    method: 'get',
    params: { page, size }
  })
}

export function reqAddGame (gameData) {
  return requests({
    url: '/games',
    method: 'post',
    data: gameData,
    headers: { 'Content-Type': 'application/json' }
  })
}

export function reqUploadImage (formData) {
  return requests({
    url: '/upload',
    method: 'post',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

export function reqPlatformList () {
  return requests({
    url: '/platforms',
    method: 'get'
  })
}

export function reqGenreList () {
  return requests({
    url: '/genres',
    method: 'get'
  })
}

export function reqBrandList () {
  return requests({
    url: '/brands',
    method: 'get'
  })
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
// 获取导航栏分类列表 /game/getCategoryList シンプルな書き方
export function reqCategoryList () {
  return requests.get('/getCategoryList')
}

// 获取轮播图 /game/getSwiper
export function reqGetBannerList () {
  return requests.get('/lunbo')
}

export async function reqGameList () {
  return requests.get('/gameList')
}

export function findAll () {
  return requests({
    url: '/genres',
    method: 'get'
  })
}
export function addGenre (genre) {
  return requests({
    url: '/genres',
    method: 'post',
    data: genre
  })
}
export function deleteGenre (genreId) {
  return requests({
    url: '/genres/' + genreId,
    method: 'delete'
  })
}
export function updateGenre (genre) {
  return requests({
    url: '/genres',
    method: 'put',
    params: {
      genreId: genre.genreId,
      genreName: genre.genreName
    }
  })
}
