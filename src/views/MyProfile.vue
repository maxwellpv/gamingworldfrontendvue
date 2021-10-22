<template>
  <v-container>
    <nav-bar></nav-bar>
    <v-card>

      <v-container>
        <h4>General Level of Play </h4>
        <v-row justify="center" class="ma-5">
          <v-col align="center" sm="4">
            <v-img src="@/assets/svg/medalla-de-bronce.svg" class="icon"></v-img>
            <label>{{ profileData.gamingLevel }}</label>
          </v-col>
        </v-row>
      </v-container>

      <v-container>
        <h4>Achievements</h4>
        <v-list>
          <v-list-item v-for="achievement in tournaments" :key="achievement.id">
            <v-list-item-content>
              <v-list-item-title v-text="achievement.name"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title v-text="achievement.result" align="end"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>

      <v-container>
       <h4>Videogames Experience</h4>
        <v-list>
          <v-list-item v-for="experience in experiences" :key="experience.id">
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
          <v-list-item v-for="favorite in favoriteGames" :key="favorite.id">

            <v-list-item-content>
              <v-list-item-title v-text="favorite.gameName"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar>
              <v-img alt="Profile pic here"></v-img>
            </v-list-item-avatar>
          </v-list-item>
        </v-list>
      </v-container>

      <v-container>
       <h4>Task in progress</h4>
        <v-list>
          <v-list-item v-for="item in tasks" :key="item.title">
            <v-list-item-content>
              <v-list-item-title v-text="item.taskName"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title v-text="item.timeToComplete" align="end"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
    </v-card>
    <v-btn class="ma-3 primary" @click="showEditProfile">Edit </v-btn>
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
      profileData: null,
      favoriteGames: null,
      experiences: null,
      streamingCategories: null,
      streamerSponsors: null,
      tournaments: null,
      tasks:[
        { taskName: 'Aim Lab', timeToComplete: '30 minutes' },
        { taskName: 'Aim Lab', timeToComplete: '30 minutes' },
      ],
    }
  },
  methods:{
    showEditProfile() {
      this.$router.push({ path: `/profile/${this.$route.params.id}/edit/0` })
    },
    retrieveData() {
      ProfilesService.getProfileByUserId(this.$route.params.id).then((response) => {
        this.profileData = response[0].data[0];
        this.favoriteGames = response[1].data;
        this.experiences = response[2].data;
        this.streamingCategories = response[3].data;
        this.streamerSponsors = response[4].data;
        this.tournaments = response[5].data;
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