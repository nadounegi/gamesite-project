// axiosに対するカプセル
import axios from 'axios'
// nProgressのインポート  ローディングバーの表示
import nProgress from 'nprogress'
// start ローディングバーの開始 done ローディングバーの終了
// nprogressのcssをインポート
import 'nprogress/nprogress.css'

// ベースURLの設定
const requests = axios.create({
  // ベースURLの設定
  baseURL: 'http://localhost:8080',
  // タイムアウトの設定
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json' // 设置请求头
  }
})
// インタラプターの設定
requests.interceptors.request.use((config) => {
  // config 配置対象、最も重要な属性はヘッダーheaders
  // ローディングばー起動
  nProgress.start()
  return config
})

// 响应拦截器
requests.interceptors.response.use((res) => {
  // 成功的回調函数：服務器相応数据回来后，响应拦截器可以検測到，然后进行一些处理
  // ローディングばー終了
  nProgress.done()
  return res.data
}, (error) => {
  // 失敗的回調函数
  return Promise.reject(new Error('请求失败'))
})

// エクスポート
export default requests
