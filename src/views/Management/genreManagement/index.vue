<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="ゲーム類型">
    <el-input v-model="formInline.genreName" placeholder="ゲーム類型を入力してください" style="width: 200px;"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onAdd">添加</el-button>
  </el-form-item>
</el-form>
<el-table
      :data="genreList"
      border
      style="width: 350px; max-width: 100%;">
      <el-table-column
        prop="genreId"
        label="類型番号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="genreName"
        label="ゲーム類型"
        width="180">
      </el-table-column>
    </el-table>
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'genreManagement',
  computed: {
    ...mapState('game', ['genreList'])
  },
  data () {
    return {
      formInline: {
        genreName: ''
      }
    }
  },
  methods: {
    onAdd () {
      console.log('submit!')
    },
    ...mapActions('game', ['fetchGenreList'])
  },
  mounted () {
    this.fetchGenreList()
  }
}
</script>

<style lang="less" scoped>
.el-form{
  background-color: #d4ddeb;
}
.el-form--inline .el-form-item {
    display: inline-block;
    margin-top: 14px;
    margin-right: 10px;
    vertical-align: top;
}
.el-input__inner {
  max-width: 180px; /* 限制输入框的最大宽度 */
  box-sizing: border-box; /* 避免超出边框 */
}

</style>
