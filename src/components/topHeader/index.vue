<template>
  <div>
    <el-header class="header">
      <div class="left-header">
        <span>店舗管理システム</span>
        <img
          width="48"
          height="48"
          src="https://img.icons8.com/color/48/settings--v1.png"
          alt="settings--v1"
        />
      </div>
    </el-header>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.header {
  background-color: rgb(148, 176, 185);
  display: flex;
  justify-content: flex-end; /* アイコンとテキストを右端に配置 */
  align-items: center; /* 縦方向中央揃え */
  height: 60px;
  padding: 10px 20px;
}

.left-header {
  display: flex;
  flex-direction: row;
  align-items: center;
}

span {
  font-size: 15px;
  font-weight: bolder;
  margin-top: 5px;
  padding-right: 10px;
}
</style>
