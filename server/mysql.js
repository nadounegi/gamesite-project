const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'muajo0824',
    database: 'nakameguro'
})
//データベース接続
connection.connect((err)=>{
    if(err){
        console.error('データベース接続エラー',err.stack);
        return;
    }
    console.log('データベース接続成功');
})

function getSql(sql,arr){
  return new Promise((resolve,reject)=>{
    connection.query(sql,arr,(error,results)=>{
        if(error){
            console.error('データ取得エラー',error);
            reject(error);
        }else{
            resolve(results);
        }
    })
  })
}

module.exports = getSql
