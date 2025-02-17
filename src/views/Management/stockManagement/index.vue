<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <div class="form-bar">

      <el-form ref="form" :model="sizeForm" label-width="127px" size="mini">
        <el-form-item label="商品名">
          <el-input
            v-model="sizeForm.gameName"
            placeholder="ゲーム名を入力してください"
            style="width: 50%; height: 40px"
          ></el-input>
        </el-form-item>

        <el-form-item label="プラットフォーム" style="width: 127px">
          <el-select
            v-model="sizeForm.platformId"
            placeholder="プラットフォームを選択してください"
            style="
              width: 100%;
              max-width: 500px;
              min-width: 380px;
              height: 40px;
            "
          >
            <el-option
            v-for="platform in platformList"
            :key="platform.platformId"
             :label="platform.platformType"
             :value="platform.platformId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="ジャンル">
          <el-select
            v-model="sizeForm.genreId"
            placeholder="ゲーム類型を選択してください"
            style="width: 30%; height: 40px"
          >
            <el-option
            v-for="genre in genreList"
            :key="genre.genreId"
            :label="genre.genreName"
            :value="genre.genreId">
          </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="開発元">
          <el-select
            v-model="sizeForm.brandId"
            placeholder="開発元を選択してください"
            style="width: 30%; height: 40px"
          >
            <el-option
            v-for="brand in brandList"
            :key="brand.brandId"
            :label="brand.brandName"
            :value="brand.brandId"></el-option>
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
      <el-select v-model="dialogForm.platformId">
        <el-option
        v-for="platform in platformList"
        :key="platform.platformId"
        :label="platform.platformType"
        :value="platform.platformId">
      </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="ジャンル">
      <el-select v-model="dialogForm.genreId">
        <el-option
        v-for="genre in genreList"
        :key="genre.genreId"
        :label="genre.genreName"
        :value="genre.genreId">
      </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="開発元" label-width="150px">
      <el-select v-model="dialogForm.brandId">
        <el-option
        v-for="brand in brandList"
        :key="brand.brandId"
        :label="brand.brandName"
        :value="brand.brandId">
      </el-option>
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
   <input type="file" @change="handleFileUpload" accept="image/*">
   <img v-if="dialogForm.url" :src="dialogForm.url" alt="画像プレビュー" style="max-width: 100px; margin-top: 10px;">
  </el-form>
  <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">キャンセル</el-button>
        <el-button type="primary" @click="addGame">追加</el-button>
      </div>
</el-dialog>
    <div class="table-contents">
      <el-table
      :data="tableData"
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
        <el-table-column prop="platformId" label="プラットフォーム" width="80">
        <template slot-scope="scope">
        <span>{{ getPlatformName(scope.row.platformId) }}</span>
        </template>
        </el-table-column>
        <el-table-column prop="genreId" label="ゲーム類型" width="120">
        <template slot-scope="scope">
        <span>{{ getGenreName(scope.row.genreId) }}</span>
        </template>
        </el-table-column>
        <el-table-column prop="brandId" label="開発元" width="120">
        <template slot-scope="scope">
        <span>{{ getBrandName(scope.row.brandId) }}</span>
        </template>
        </el-table-column>
        <el-table-column prop="stock" label="在庫数" width="80">
        </el-table-column>
        <el-table-column prop="price" label="価格" width="80"> </el-table-column>
          <!-- 游戏介绍 -->
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
import { reqAddGame, reqUploadImage, reqGameByCase, reqPlatformList, reqBrandList, reqGenreList } from '@/api/index.js'

export default {
  data () {
    return {
      platformList: [],
      genreList: [],
      brandList: [],
      tableData: [],
      dialogVisible: false, // 控制对话框显示
      sizeForm: {
        gameName: '',
        platformId: '',
        genreId: '',
        brandId: ''
      },
      dialogForm: {
        gameName: '',
        platformId: '',
        genreId: '',
        brandId: '',
        price: '',
        stock: '',
        description: '',
        url: null
      },
      uploadUrl: '/upload',
      imageUrl: ''
    }
  },
  methods: {
    getPlatformName (platformId) {
      const platform = this.platformList.find(p => p.platformId === platformId)
      return platform ? platform.platformType : '不明'
    },
    getGenreName (genreId) {
      const genre = this.genreList.find(g => g.genreId === genreId)
      return genre ? genre.genreName : '不明'
    },
    getBrandName (brandId) {
      const brand = this.brandList.find(b => b.brandId === brandId)
      return brand ? brand.brandName : '不明'
    },
    async fetchGameList () {
      try {
        const response = await reqGameByCase({ page: 1, size: 10 })
        if (response.code === 200) {
          this.tableData = response.data?.data || []
        } else {
          this.$message.error('ゲームリストの取得に失敗しました')
        }
      } catch (error) {
        console.error('ゲームリスト取得エラー:', error)
        this.$message.error('エラーが発生しました:' + error.message)
      }
    },
    async fetchPlatformList () {
      try {
        const response = await reqPlatformList()
        if (response.code === 200) {
          this.platformList = response.data?.data || []
        } else {
          this.$message.error('プラットフォームリストの取得に失敗しました')
        }
      } catch (error) {
        this.$message.error('エラーが発生しました:' + error.message)
      }
    },
    async fetchGenreList () {
      try {
        const response = await reqGenreList()
        if (response.code === 200) {
          this.genreList = response.data?.data || []
        } else {
          this.$message.error('ジャンルリストの取得に失敗しました')
        }
      } catch (error) {
        this.$message.error('エラーが発生しました：' + error.message)
      }
    },
    async fetchBrandList () {
      try {
        const response = await reqBrandList()
        if (response.code === 200) {
          this.brandList = response.data?.data || []
        } else {
          this.$message.error('開発元リストの取得に失敗しました')
        }
      } catch (error) {
        this.$message.error('エラーが発生しました:' + error.message)
      }
    },
    openDialog () {
      this.dialogForm = {
        gameName: '',
        platformId: '',
        genreId: '',
        brandId: '',
        price: '',
        stock: '',
        description: '',
        url: null
      }
      this.dialogVisible = true
    },
    async addGame () {
      if (!this.dialogForm.gameName || !this.dialogForm.platformId || !this.dialogForm.genreId || !this.dialogForm.brandId || !this.dialogForm.price || !this.dialogForm.stock || !this.dialogForm.description) {
        this.$message.error('すべての項目を入力してください')
        return
      }
      try {
        const response = await reqAddGame(this.dialogForm)
        if (response.code === 200) {
          this.$message.success('ゲームが追加されました')
          this.dialogVisible = false
          await this.fetchGameList()
        } else {
          this.$message.error(response.message || 'ゲーム追加に失敗しました')
        }
      } catch (error) {
        this.$message.error('エラーが発生しました' + error.message)
      }
    },
    async handleFileUpload (event) {
      const file = event.target.files[0]
      if (!file) return

      const formData = new FormData()
      formData.append('file', file)

      try {
        const response = await reqUploadImage(formData)
        if (response.code === 200) {
          this.dialogForm.url = response.imageUrl
          this.$message.success('画像がアップロードされました')
        } else {
          this.$message.error('画像のアップロードに失敗しました')
        }
      } catch (error) {
        this.$message.error('エラーが発生しました' + error.message)
      }
    }
  },
  async mounted () {
    await Promise.all([
      this.fetchPlatformList(),
      this.fetchBrandList(),
      this.fetchGenreList(),
      this.fetchGameList()
    ])
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
