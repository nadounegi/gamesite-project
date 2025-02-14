<template>
    <div class="login-content">
      <div class="login-wrapper">
        <div class="left-img">
          <img src="/assets/images/bg2.png" alt="" />
        </div>
        <div class="right-login-form">
          <div class="form-wrapper">
            <h1>ログイン</h1>
            <div class="input-items">
              <span class="input-labels"> メールアドレス: </span>
              <input
                type="text"
                class="inputs"
                placeholder="メールアドレスを入力してください"
              />
            </div>
            <div class="input-items">
              <span class="input-labels"> PASSWORD: </span>
              <input
                type="password"
                class="inputs"
                placeholder="パスワードを入力してください"
              />
            </div>
            <button class="btn">ログイン</button>
            <div class="register-tips">
              <span>まだアカウントお持ちでませんか</span>
              <router-link to="/Register"><span>新規登録</span></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>

<script>
export default {}
</script>

  <style lang="less" scoped>
  /* 设置内外边距 字体 */
  * {
    margin: 0;
    padding: 0;
    font-family: "Aguazyuan", Courier, monospace;
  }

  .login-content {
    width: 100vw;
    height: 100vh;
    background-color: rgb(220, 250, 199);
    position: relative;

    .login-wrapper {
      width: 70vw;
      height: 80vh;
      background-color: #fff;
      border-radius: 40px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      display: flex;

      .left-img {
        flex: 1;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center; //写真を中央に配置

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 40px;
        }
      }
      .right-login-form {
        flex: 1;
        position: relative;
        margin-left: -114px;

        .form-wrapper {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);

          h1 {
            font-size: 30px;
            text-align: center;
          }
          .input-items {
            margin: 20px 0;

            .input-labels {
              display: inline-block;
              font-weight: 600;
              font-size: 20px;
              margin: 10px 0;
            }
            .inputs {
              width: 129%;
              height: 50px;
              border-radius: 10px;
              border: 1px solid #d2bfbf;
              padding: 20px;
              box-sizing: border-box;
              outline: none;
              transition: 0.5s;
            }
            .input:focus {
              border: 1px solid #dc7eec;
            }
          }
          .btn {
            width: 100%;
            height: 50px;
            background-color: rgba(128, 106, 196, 0.5);
            border: 0;
            border-radius: 10px;
            color: #fff;
            font-size: 25px;
            font-weight: 600;
            margin: 20px 57px;
            cursor: pointer;
          }

          .register-tips {
            text-align: center; /* 文本居中 */
            font-size: 15px;
            font-weight: 600;
            margin: 10px 0; /* 控制整体与上下元素的间距 */
            width: 353px;
            /* 确保子元素保持在一行 */
            display: flex;
            align-items: center;
            justify-content: center;

            span {
              margin: 0 5px; /* 控制子元素之间的水平间距 */
            }

            span:last-child {
              color: rgb(110, 87, 179); /* 设置“ログイン”的颜色 */
              cursor: pointer;
              text-decoration: underline; /* 增加下划线样式 */
            }
          }
        }
      }
    }
  }
  </style>
