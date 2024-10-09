<template>
    <div>
        <!-- TypeNav -->
        <TypeNav />
        <ListContainer/>
        <!-- PS4 and PS5 Games -->
        <GameList :items="ps4ps5Games">
            <template #title>
                PS4・PS5
            </template>
        </GameList>
        <!-- Xbox Series X Games -->
        <GameList :items="xboxGames">
            <template #title>
                Xbox
            </template>
        </GameList>
        <!-- Nintendo Switch Games -->
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
        this.$store.dispatch('home/fetchgoodsList');
    },
    computed:{
        ...mapGetters('home',['ps4ps5Games','xboxGames','SwitchGames']),
    },
}
</script>;
<style>

</style>
