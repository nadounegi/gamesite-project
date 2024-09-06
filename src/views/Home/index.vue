<template>
    <div>
        <!-- TypeNav -->
        <TypeNav />
        <ListContainer/>
        <GameList :items="ps4ps5Games">
            <template #title>
                PS4・PS5
            </template>
        </GameList>
        <GameList :items="xboxGames">
            <template #title>
                Xbox
            </template>
        </GameList>
        <GameList :items="SwitchGames">
            <template #title>
                Nitendo Switch
            </template>
        </GameList>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
    name:'Home',
    created(){
        this.$store.dispatch('home/fetchGameList');
    },
    computed:{
        ...mapGetters('home',['goodsList']),
        //goodsListからPS4とPS5のゲームをフィルタリング
        ps4ps5Games(){
            if(!this.goodsList || this.goodsList.length === 0) return [];
            return this.$store.getters['home/goodsList'].filter(game =>
            game.attributes_summary.includes('PS4') || game.attributes_summary.includes('PS5'))
        },
        //goodsListからXboxのゲームをフィルタリング
        xboxGames(){
            if(!this.goodsList || this.goodsList.length === 0) return [];
            return this.$store.getters['home/goodsList'].filter(game =>
            game.attributes_summary.includes('Xbox') || 
            game.attributes_summary.includes('Xbox 360')|| 
            game.attributes_summary.includes('Xbox One') || 
            game.attributes_summary.includes('Xbox Series S') || 
            game.attributes_summary.includes('Xbox Series X'))
        },
        SwitchGames(){
            if(!this.goodsList || this.goodsList.length === 0) return [];
            return this.$store.getters['home/goodsList'].filter(game =>
            game.attributes_summary.includes('Nintendo Switch'))
        }
    },
}
</script>;
<style>

</style>
