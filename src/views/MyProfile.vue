<template>
  <v-container>
    <nav-bar></nav-bar>
    <v-card>

      <v-container>
        <h4>General Gaming Level </h4>
        <v-row justify="center" class="ma-5">
          <v-col align="center" sm="4">
            <v-img src="@/assets/gaming_levels/{{this.profileData.gamingLevel}}.svg" class="icon"></v-img>
            <label>{{ this.profileData.gamingLevel }}</label>
          </v-col>
        </v-row>
      </v-container>

      <v-container v-if="profileType === 1">
        <h4>Streaming Categories</h4>
        <v-list>
          <v-list-item v-for="(category, i) in profileData.streamingCategories" :key="i">
            <v-list-item-content>
              <v-list-item-title v-text="category.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>

      <v-container v-if="profileType === 1">
        <h4>Sponsors</h4>
        <v-list>
          <v-list-item v-for="(sponsor, i) in profileData.streamerSponsors" :key="i">
            <v-list-item-content>
              <v-list-item-title v-text="sponsor.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>

      <v-container>
        <h4>Achievements</h4>
        <v-list>
          <v-list-item v-for="(achievement, i) in profileData.tournamentExperiences" :key="i">
            <v-list-item-content>
              <v-list-item-title v-text="achievement.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title v-text="achievement.position" align="end"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>

      <v-container>
       <h4>Videogames Experience</h4>
        <v-list>
          <v-list-item v-for="(experience, i) in favoriteGames.gameExperiences" :key="i">
            <v-list-item-content>
              <v-list-item-title v-text="experience.gameName"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title v-text="experience.time" align="end"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>

      <v-container>
        <h4>Favorites Videogames</h4>
        <v-list>
          <v-list-item v-for="(favorite, i) in profileData.favoriteGames" :key="i">

            <v-list-item-content>
              <v-list-item-title v-text="favorite.gameName"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar>
              <v-img alt="Profile pic here"></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-list>
      </v-container>
    </v-card>
    <v-btn class="ma-3 primary" @click="showEditProfile">Edit</v-btn>
  </v-container>
</template>

<script>
import NavBar from "../components/NavBar";
import ProfilesService from "@/services/profiles.service";

export default {
  name: "MyProfile",
  components: {NavBar},
  data(){
    return {
      profileType: 0,
      profileData: null,
    }
  },
  methods:{
    showEditProfile() {
      this.$router.push({ path: `/profile/${this.$route.params.id}/edit/${this.$route.params.type}` })
    },
    retrieveData() {
      this.profileType = parseInt(this.$route.params.type);

        ProfilesService.getProfileByUserId(this.$route.params.id).then((response) => {
          console.log(response.data);
          this.profileData = response.data;

          this.profileType = this.profileData.isStreamer;
        });
    }
  },
  created() {
    this.retrieveData();
  }
}
</script>

<style scoped>

</style>