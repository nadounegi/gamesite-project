<template>
  <div>
    <TypeNav />
    <ListContainer />
    <div v-if="loading">Loading...</div>
    <div v-else>
      <GameList :items="ps4ps5Games" title="PS4・PS5" />
      <GameList :items="xboxGames" title="Xbox" />
      <GameList :items="SwitchGames" title="Switch" />
    </div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapGetters({
      ps4ps5Games: "home/ps4ps5Games",
      xboxGames: "home/xboxGames",
      SwitchGames: "home/SwitchGames",
      loading: "home/loading",
      error: "home/error",
    }),
  },
  created() {
    this.$store.dispatch("home/fetchGameList", "PS4");
    this.$store.dispatch("home/fetchGameList", "PS5");
    this.$store.dispatch("home/fetchGameList", "Xbox Series X");
    this.$store.dispatch("home/fetchGameList", "Switch");
  },
};
</script>;
<style>
</style>
