<template>
  <v-container>
    <nav-bar></nav-bar>
    <v-card>

      <v-container>
        <h4>General Gaming Level </h4>
        <v-row justify="center" class="ma-5">
          <v-col align="center" sm="4">
            <v-img v-if="profileData.gamingLevel === 'Newbie'" src="@/assets/gaming_levels/Newbie.svg" class="icon"></v-img>
            <v-img v-if="profileData.gamingLevel === 'Medium'" src="@/assets/gaming_levels/Medium.svg" class="icon"></v-img>
            <v-img v-if="profileData.gamingLevel === 'Advanced'" src="@/assets/gaming_levels/Advanced.svg" class="icon"></v-img>
            <h2>{{ this.profileData.gamingLevel }}</h2>
          </v-col>
        </v-row>
      </v-container>

      <v-container>
        <h4>Streaming Categories</h4>
        <v-list>
          <h5 v-if="profileData.streamingCategories.length === 0">
            Ninguna entrada.
          </h5>
          <v-list-item v-for="(category, i) in profileData.streamingCategories" :key="i">
            <v-list-item-content>
              <v-list-item-title v-text="category.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>

      <v-container>
        <h4>Sponsors</h4>
        <v-list>
          <h5 v-if="profileData.streamerSponsors.length === 0">
            Ninguna entrada.
          </h5>
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
          <h5 v-if="profileData.tournamentExperiences.length === 0">
            Ninguna entrada.
          </h5>
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
          <h5 v-if="profileData.gameExperiences.length === 0">
            Ninguna entrada.
          </h5>
          <v-list-item v-for="(experience, i) in profileData.gameExperiences" :key="i">
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
          <h5 v-if="profileData.favoriteGames.length === 0">
            Ninguna entrada.
          </h5>
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
      profileData: {
        id: null,
        userId: null,
        gamingLevel: null,
        isStreamer: null,
        gameExperiences: [],
        streamingCategories: [],
        streamerSponsors: [],
        tournamentExperiences: [],
        favoriteGames: []
      },
      gamingLevelImg: "",
    }
  },
  methods:{
    showEditProfile() {
      this.$router.push({ path: `/profile/edit/${this.profileData.userId}` })
    },
    retrieveData() {
        ProfilesService.getProfileByUserId(this.$route.params.id).then((response) => {
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