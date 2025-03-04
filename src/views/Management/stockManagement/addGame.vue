<template>
  <div>
    <el-form ref="Form" :model="gameForm" label-width="100px" >
    <el-form-item label="ゲーム名">
      <el-input v-model="gameForm.gameName"></el-input>
    </el-form-item>
    <el-form-item label="プラットフォーム" label-width="150px">
      <el-select v-model="gameForm.platform" v-if="platformList.length > 0">
        <el-option
          v-for="platform in platformList"
          :key="platform.platformId"
          :label="platform.platformType"
          :value="platform.platformId">
        </el-option>
      </el-select>
  </el-form-item>
  <el-form-item label="ジャンル">
  <el-select v-model="gameForm.genre" v-if="genreList.length > 0">
    <el-option
      v-for="genre in genreList"
      :key="genre.genreId"
      :label="genre.genreName"
      :value="genre.genreId"></el-option>
  </el-select>
</el-form-item>
<el-form-item label="開発元">
  <el-select v-model="gameForm.brand" v-if="brandList.length > 0">
    <el-option
      v-for="brand in brandList"
      :key="brand.brandId"
      :label="brand.brandName"
      :value="brand.brandId">
    </el-option>
  </el-select>
</el-form-item>
    <el-form-item label="価格">
      <el-input v-model="gameForm.price"></el-input>
    </el-form-item>
    <el-form-item label="在庫数">
      <el-input v-model="gameForm.stock"></el-input>
    </el-form-item>
    <el-form-item label="ゲーム紹介">
      <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 10}" v-model="gameForm.description"></el-input>
    </el-form-item>
       <!-- 画像アップロード -->
       <el-form-item label="ゲーム画像">
          <input type="file" @change="handleFileUpload" accept="image/*">
          <img v-if="imagePreview" :src="imagePreview" alt="画像プレビュー" style="max-width: 100px; margin-top: 10px;">
        </el-form-item>
  </el-form>
  <div slot="footer" class="form-footer">
        <el-button type="primary" @click="addGame">追加</el-button>
      </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { reqAddGame } from '@/api'
export default {
  name: 'addGame',
  data () {
    return {
      gameForm: {
        gameName: '',
        platform: '',
        genre: '',
        price: '',
        stock: '',
        description: '',
        image: null
      },
      imagePreview: null
    }
  },
  async created () {
    try {
      await this.fetchPlatform()
      console.log('platformList:', this.platformList)

      await this.fetchGenreList()
      console.log('genreList:', this.genreList)

      await this.fetchBrandList()
      console.log('brandList:', this.brandList)
    } catch (error) {
      console.error('ゲーム追加ページのデータ取得に失敗しました', error)
    }
  },
  computed: {
    ...mapState('game', ['platformList', 'genreList', 'brandList'])
  },
  methods: {
    handleFileUpload (event) {
      const file = event.target.files[0]
      if (file) {
        this.gameForm.image = file
        const reader = new FileReader()
        reader.onload = e => {
          this.imagePreview = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    ...mapActions('game', ['fetchPlatform', 'fetchGenreList', 'fetchBrandList']),
    async addGame () {
      console.log('送信データ:', this.gameForm)
      try {
        const response = await reqAddGame(this.gameForm)
        console.log('ゲーム追加結果:', response)
        if (response.data.code === 200) {
          alert('ゲーム追加成功')
        } else {
          alert('ゲーム追加失敗' + response.data.message)
        }
      } catch (error) {
        console.error('ゲーム追加失敗', error)
        alert('ゲーム追加失敗')
      }
    }
  }
}
</script>

<style>

</style>
