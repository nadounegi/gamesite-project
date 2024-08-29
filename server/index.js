const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path');
const port = 8081
app.use(cors())
//ルター接続口
const router = require('./router.js')

app.use('/',router)
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

app.use(express.json());


app.listen(port,() =>{
    console.log(`サーバーがポート${port}で起動しました`);
})
