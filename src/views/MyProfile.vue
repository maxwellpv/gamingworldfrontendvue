<template>
  <v-container>
    <nav-bar></nav-bar>
    <v-card>

      <v-container v-if="profileType === 0">
        <h4>General Level of Play </h4>
        <v-row justify="center" class="ma-5">
          <v-col align="center" sm="4">
            <v-img src="@/assets/svg/medalla-de-bronce.svg" class="icon"></v-img>
            <label>{{ profileData.gamingLevel }}</label>
          </v-col>
        </v-row>
      </v-container>

      <v-container v-if="profileType === 0">
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

      <v-container v-else-if="profileType === 1">
        <h4>Streaming Categories</h4>
        <v-list>
          <v-list-item v-for="category in streamingCategories" :key="category.id">
            <v-list-item-content>
              <v-list-item-title v-text="category.gameName"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>

      <v-container v-if="profileType === 0">
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

      <v-container v-if="profileType === 1">
        <h4>Sponsors</h4>
        <v-list>
          <v-list-item v-for="sponsor in streamerSponsors" :key="sponsor.id">
            <v-list-item-content>
              <v-list-item-title v-text="sponsor.name"></v-list-item-title>
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

      <v-container v-if="profileType === 0">
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
      profileType: 0,
      profileData: [],
      favoriteGames: [],
      experiences: [],
      streamingCategories: [],
      streamerSponsors: [],
      tournaments: [],
      tasks:[
        { taskName: 'Aim Lab', timeToComplete: '30 minutes' },
        { taskName: 'Aim Lab', timeToComplete: '30 minutes' },
      ],
    }
  },
  methods:{
    showEditProfile() {
      this.$router.push({ path: `/profile/${this.$route.params.id}/edit/${this.$route.params.type}` })
    },
    retrieveData() {
      this.profileType = parseInt(this.$route.params.type);

        ProfilesService.getProfileByUserId(this.$route.params.id).then((response) => {
          this.editingProfileId = response[0].data[0].id;
          this.gamerLevel = response[0].data[0].gamingLevel;
          console.log(response);

          for (let i = 0; i < response[1].data.length; ++i)
          {
            this.favoriteGames.push(response[1].data[i]);
          }

          for (let i = 0; i < response[2].data.length; ++i)
          {
            this.experiences.push(response[2].data[i]);
          }

          if (this.$route.params.type === "1")
          {
            for (let i = 0; i < response[3].data.length; ++i)
            {
              this.streamingCategories.push(response[3].data[i]);
            }
            for (let i = 0; i < response[4].data.length; ++i)
            {
              this.streamerSponsors.push(response[4].data[i]);
            }
          }

          for (let i = 0; i < response[5].data.length; ++i)
          {
            this.tournaments.push(response[5].data[i]);
          }
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