<template>
  <div class="container">
    <div class="form-bar">

      <el-form ref="form" :model="sizeForm" label-width="127px" size="mini">
        <el-form-item label="商品名">
          <el-input
            v-model="sizeForm.name"
            placeholder="ゲーム名を入力してください"
            style="width: 50%; height: 40px"
          ></el-input>
        </el-form-item>

        <el-form-item label="プラットフォーム" style="width: 127px">
          <el-select
            v-model="sizeForm.platformType"
            placeholder="プラットフォームを選択してください"
            style="
              width: 100%;
              max-width: 500px;
              min-width: 380px;
              height: 40px;
            "
          >
            <el-option label="PS4" value="ps4"></el-option>
            <el-option label="PS5" value="ps5"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="ジャンル">
          <el-select
            v-model="sizeForm.genreName"
            placeholder="ゲーム類型を選択してください"
            style="width: 30%; height: 40px"
          >
            <el-option label="アクション" value="action"></el-option>
          </el-select>
        </el-form-item>
        <!-- ボタン部分 -->
        <div class="button-container">
          <el-button type="primary" round @click="openDialog"
            >ゲーム追加</el-button>
          <el-button type="primary" round @click="stockAdd">
            在庫管理
          </el-button>
        </div>
      </el-form>
    </div>
<el-dialog title="ゲーム追加" :visible.sync="dialogVisible" width="40%" >
  <el-form ref="dialogForm" :model="dialogForm" label-width="100px" >
    <el-form-item label="ゲーム名">
      <el-input v-model="dialogForm.gameName"></el-input>
    </el-form-item>
    <el-form-item label="プラットフォーム" label-width="150px">
      <el-select v-model="dialogForm.platform">
        <el-option label="PS4" value="ps4"></el-option>
        <el-option label="PS5" value="ps5"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="ジャンル">
      <el-select v-model="dialogForm.genre">
        <el-option label="アクション" value="action"></el-option>
        <el-option label="RPG" value="rpg"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="価格">
      <el-input v-model="dialogForm.price"></el-input>
    </el-form-item>
    <el-form-item label="在庫数">
      <el-input v-model="dialogForm.stock"></el-input>
    </el-form-item>
    <el-form-item label="ゲーム紹介">
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 10}" v-model="dialogForm.description"></el-input>
    </el-form-item>
       <!-- 画像アップロード -->
       <el-form-item label="ゲーム画像">
          <input type="file" @change="handleFileUpload" accept="image/*">
          <img v-if="imagePreview" :src="imagePreview" alt="画像プレビュー" style="max-width: 100px; margin-top: 10px;">
        </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">キャンセル</el-button>
        <el-button type="primary" @click="addGame">追加</el-button>
      </div>
</el-dialog>
    <div class="table-contents">
      <el-table
      v-if="safeGameList && safeGameList.length > 0"
      v-loading="loading"
      :data="safeGameList"
      border
      :span-method="mergeCells"
      style="width: 100%">
        <el-table-column prop="id" label="ゲーム番号" width="90">
          <template slot-scope="scope">
        <span>{{ scope.row.id + 1 }}</span>
        </template>
        </el-table-column>
        <el-table-column prop="url" label="写真" width="160">
          <template slot-scope="scope">
            <img :src = 'scope.row.url' width="160px" height="180px">
          </template>
        </el-table-column>
        <el-table-column prop="gameName" label="ゲーム名" width="120">
        </el-table-column>
        <el-table-column prop="platformType" label="プラットフォーム" width="80">
        <template slot-scope="scope">
        <span>{{ scope.row.platformType }}</span>
        </template>
        </el-table-column>
        <el-table-column prop="genreName" label="ゲーム類型" width="120">
        <template slot-scope="scope">
        <span>{{ scope.row.genreName }}</span>
        </template>
        </el-table-column>
        <el-table-column prop="stock" label="在庫数" width="80">
        </el-table-column>
        <el-table-column prop="price" label="価格" width="80"> </el-table-column>
          <!-- 游戏介绍の二列を結合 -->
        <el-table-column prop="description" label="ゲーム紹介" width="200">
          <span>{{ scope.row.description }}</span>
        </el-table-column>
        <!-- 操作列 -->
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
  </div>
</template>

<script>
import { reqAddGame, reqUploadImage } from '@/api'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'stockManagement',
  computed: {
    ...mapState('game', ['gameList']),
    safeGameList () {
      return Array.isArray(this.gameList) ? this.gameList : []
    }
  },
  watch: {
    gameList (newList) {
      console.log('gameList 更新:', newList)
    }
  },
  data () {
    return {
      gameList: [],
      dialogVisible: false, // 控制对话框显示
      sizeForm: {
        name: '',
        platformType: '',
        genreName: ''
      },
      dialogForm: {
        gameName: '',
        platformType: '',
        genreName: '',
        price: '',
        stock: '',
        description: '',
        url: null
      }

    }
  },
  methods: {
    // **打开对话框**
    openDialog () {
      this.dialogVisible = true
    },
    async addGame () {
      if (!this.dialogForm.gameName || !this.dialogForm.platformType || !this.dialogForm.genreName || !this.dialogForm.price || this.dialogForm.stock || this.dialogForm.description || this.dialogForm.url) {
        alert('すべての項目を入力してください')
        return
      }

      let imageUrl = ''
      if (this.dialogForm.file) {
        const imageForm = new FormData()
        imageForm.append('file', this.dialogForm.file)

        try {
          const uploadResponse = await reqUploadImage(imageForm) // 写真アップロード
          if (uploadResponse.code === 1) {
            // eslint-disable-next-line no-const-assign
            imageUrl = uploadResponse.imageUrl // backend return 写真URL
          } else {
            this.$message.error('画像のアップロードに失敗しました')
            return
          }
        } catch (error) {
          this.$message.error('画像のアップロード失敗')
          return
        }
      }

      const formData = {
        gameName: this.dialogForm.gameName,
        description: this.dialogForm.description,
        price: this.dialogForm.price,
        stock: this.dialogForm.stock,
        platformId: this.dialogForm.platformType,
        genreId: this.dialogForm.genreName,
        brandId: 1,
        url: imageUrl // 存储上传后的图片 URL
      }

      // APIへリクエスト送信
      reqAddGame(formData)
        .then(response => {
          if (response.code === 200) {
            this.$message.success(response.message)
          }
        })
      // 清空表单数据并关闭对话框
      this.dialogForm = { gameName: '', platformType: '', genreName: '' }
      this.dialogVisible = false

      this.$message.success('ゲームが追加されました！')
    },
    stockAdd () {
      console.log('在庫管理')
    },
    handleClick (row) {
      console.log(row)
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleSizeChange (size) {
      this.$store.commit('game/setPageSize', size)
      this.fetchGameList()
    },
    handleCurrentChange (page) {
      if (page < 1) page = 1
      this.$store.commit('game/setCurrentPage', page)
      this.fetchGameList()
    },
    async handleFileUpload (event) {
      const file = event.target.files[0]
      if (!file) return

      this.dialogForm.file = file
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.imagePreview = reader.result
      }
    },
    ...mapActions('game', ['fetchGameList']),
    mergeCells ({ row, column, rowIndex, columnIndex }) {
      console.log('mergeCells params:', { row, column, rowIndex, columnIndex })

      // 如果 row 或 column 未定义，返回 [1, 1]
      if (!row || !column) {
        console.warn('Row or column is undefined in mergeCells:', { row, column })
        return [1, 1]
      }

      if (columnIndex === 6) {
        return [1, 2] // 合并第6列
      } else if (columnIndex === 7) {
        return [0, 0] // 隐藏第7列
      }
      return [1, 1]
    }

  },
  mounted () {
    this.fetchGameList()
  }
}
</script>

<style lang="less" scoped>
.container {
  display: flex;
  width: 100%;
  height: 100vh;
  padding: 20px;
  flex-direction: column;
}

.form-bar {
  width: calc(100% - -2px);
  max-width: none; /* 取消最大宽度限制 */
  padding: 0;
  background-color: #d4ddeb;
  margin-top: -21px;
  margin-left: -17px;
}

.el-form-item {
  width: 100%;
  margin-top: 15px; /* 控制间距 */
}

.el-form-item__label {
  width: 137px;
}

.el-input,
.el-select {
  width: 100%; /* 让所有输入框宽度一致 */
}
.button-container {
  display: flex;
  justify-content: center;
  margin-bottom: 14px;
}
.el-table-column{
  text-align: center;
}
</style>
