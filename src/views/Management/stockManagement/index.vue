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
          <el-button type="primary" round @click="dialogFormVisible = true"
            >ゲーム追加</el-button>
          <el-button type="primary" round @click="stockAdd">
            在庫管理
          </el-button>
        </div>
      </el-form>
    </div>
<el-dialog title="ゲーム追加" :visible.sync="dialogFormVisible" width="40%" >
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
      <el-table v-if="gameList.length > 0"
        :data="gameList" border v-loading="loading"
        :span-method="mergeCells"
        style="width: 100%;">
  <el-table-column prop="id" label="ゲーム番号" width="90">
    <template slot-scope="scope">
      <span>{{ scope.$index + 1 }}</span>
    </template>
  </el-table-column>

  <el-table-column prop="url" label="写真" width="160">
    <template slot-scope="scope">
      <img :src="scope.row.url"  class="game-image">
    </template>
  </el-table-column>

  <el-table-column prop="gameName" label="ゲーム名" width="120">
    <template slot-scope="scope">
      <span>{{ scope.row.gameName }}</span>
    </template>
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
    <template slot-scope="scope">
      <span>{{ scope.row.stock }}</span>
    </template>
  </el-table-column>

  <el-table-column prop="price" label="価格" width="80">
    <template slot-scope="scope">
      <span>{{ scope.row.price }}</span>
    </template>
  </el-table-column>

  <el-table-column prop="description" label="ゲーム紹介" width="250">
    <template slot-scope="scope">
      <span class="description-text">{{ scope.row.description }}</span>
    </template>
  </el-table-column>
  <el-table-column label="操作">
  <template slot-scope="scope">
    <div class="operation-buttons">
      <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
      <el-button type="text" size="small">編集</el-button>
    </div>
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
import { mapState, mapActions } from 'vuex'

export default {
  name: 'stockManagement',
  data () {
    return {
      dialogFormVisible: false, // 控制对话框显示
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
  computed: {
    ...mapState('game', ['gameList', 'loading', 'total', 'currentPage', 'pageSize']) // 映射 Vuex 数据

  },
  methods: {
    ...mapActions('game', ['fetchGameList']),
    handleSizeChange (size) {
      this.$store.commit('game/setPageSize', size)
      this.fetchGameList()
    },
    addGame () {
      this.$store.dispatch('game/addGame', this.dialogForm)
      this.dialogVisible = false
    },
    mergeCells ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 9) {
        return [1, 2]
      }
    }
  },
  mounted () {
    console.log('组件加载完成，开始获取游戏列表')
    this.fetchGameList()
  },
  watch: {
    gameList (gameList) {
      console.log('Vuex gameList 更新:', gameList)
    }
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
.el-table {
  width: 100%;
  min-width: 1200px; /* 适当调整 */
}
.el-table .el-table-row {
  height: 120px; /* 让行高与图片大小一致 */
}
.form-bar,
.table-contents {
  width: 100%;
  max-width: 100%;
  padding: 0;
  margin: 0 auto; /* 确保居中 */
}

.el-table__body-wrapper {
  width: auto !important;
  overflow-x: hidden; /* 防止额外滚动条 */
}

.el-table-column
.el-table__cell {
  text-align: center;
  padding: 0;
  line-height: 100px; /* 行高等于最小高度 */
  white-space: normal; /* 换行 */
  word-wrap: break-word; /* 换行 */
  word-break: break-word; /* 换行 */
  max-width: 250px; /* 最大宽度 */
}

.el-table-column{
  text-align: center;
}

.game-image{
  width: 100px;  /* 统一宽度 */
  height: 150px; /* 统一高度，避免图片过高 */
  object-fit: contain; /* 图片不变形 */
  display: block;
  margin: 0 auto; /* 图片居中 */
}

.description-text {
  display: block;
  white-space: normal;
  word-wrap: break-word;
  word-break: break-word;
  max-width: 250px;
}
</style>
