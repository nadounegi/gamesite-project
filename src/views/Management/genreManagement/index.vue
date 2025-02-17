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
      <el-table-column label="操作" width="420" header-align="center" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              plain
              @click="updateGenre(scope.row)"
            >编辑</el-button>

            <el-button
              size="mini"
              type="danger"
              plain
              @click="deleteGenre(scope.row.genreId)"
            >删除</el-button>
          </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
import { findAll, addGenre, deleteGenre, updateGenre } from '@/api/index.js'
export default {
  data () {
    return {
      formInline: {
        genreName: ''
      },
      genre: {
        genreName: ''
      },
      genreList: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    // ゲーム類型追加
    onAdd () {
      if (!this.formInline.genreName.trim()) {
        this.$message.warning('ゲーム類型を入力してください')
        return
      }

      this.genre.genreName = this.formInline.genreName // 値を代入

      addGenre(this.genre).then(({ data }) => {
        if (data.code === 200) {
          this.$message.success('追加成功')
          this.formInline.genreName = ''
          this.init()
        } else {
          this.$message.error(data.msg)
        }
      }).catch(error => {
        this.$message.error('エラーが発生しました:' + error.$message)
      })
    },
    // ゲーム類型リスト表示
    init () {
      findAll().then((result) => {
        console.log(result)
        if (result.data.code === 200) {
          this.genreList = result.data.data
        }
      })
    },
    // ゲーム類型削除
    deleteGenre (genreId) {
      this.$confirm('削除するの？', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGenre(genreId).then((result) => {
          if (result.data.code === 1) {
            this.$message({
              message: '削除成功',
              type: 'success'
            })
          } else {
            this.$message.error(result.data.msg)
          }
          // ゲーム類型表示
          this.init()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '削除取消ました'
        })
      })
    },
    updateGenre (genre) {
      this.$prompt('新しいゲーム類型名を入力してください', '編集', {
        confirmButtonText: '保存',
        cancelButtonText: 'キャンセル',
        inputValue: genre.genreName
      }).then(({ value }) => {
        if (!value.trim()) {
          this.$message.warning('ゲーム類型名を空にできません')
          return
        }

        const updatedGenre = { ...genre, genreName: value }
        updateGenre(updatedGenre).then(({ data }) => {
          if (data.code === 1) {
            this.$message.success('編集成功')
            this.init()
          } else {
            this.$message.error(data.msg)
          }
        }).catch(error => {
          this.$message.error('エラーが発生しました:' + error.message)
        })
      }).catch(() => {
        this.$message.info('編集をキャンセルしました')
      })
    }
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
