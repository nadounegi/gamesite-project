<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="nav-bar">
    <el-menu
      class="el-menu-vertical-demo">
      <el-menu-item>
        <router-link to="/management/homePage">
          <i class="el-icon-s-home"></i>
          <span>ホームページ</span>
        </router-link>
      </el-menu-item>

      <el-menu-item>
        <router-link to="/management/stock">
          <i class="el-icon-box"></i>
          <span> 在庫管理</span>
        </router-link>
      </el-menu-item>

      <el-menu-item>
        <router-link to="/management/platform">
          <i class="el-icon-office-building"></i>
          <span>開発元管理</span>
        </router-link>
      </el-menu-item>
      <el-menu-item>
        <router-link to="/management/genre">
          <i class="el-icon-film"></i>
          <span>ゲーム類型管理</span>
        </router-link>
      </el-menu-item>
      <el-menu-item>
        <router-link to="/management/admin">
          <i class="el-icon-user"></i>
          <span>管理者権限</span>
        </router-link>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isCollapse: true
    }
  }

}
</script>

<style>
.nav-bar{
  width: 200px;

}
.el-menu-vertical-demo{
  background-color: #96aeb4;
    width: 200px;
    min-height: 768px;
}
</style>
