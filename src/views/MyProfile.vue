<template>
  <v-container>
    <nav-bar></nav-bar>
    <v-card>

      <v-container>
        <h4>General Level of Play </h4>
        <v-row justify="center" class="ma-5">
          <v-col align="center" sm="4">
            <v-img src="@/assets/svg/medalla-de-bronce.svg" class="icon"></v-img>
            <label>Noob</label>
          </v-col>
        </v-row>
      </v-container>

      <v-container>
        <h4>Achievements</h4>
        <v-list>
          <v-list-item v-for="item in items" :key="item.title">
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title v-text="item.place" align="end"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>

      <v-container>
       <h4>Videogames Experience</h4>
        <v-list>
          <v-list-item v-for="item in games" :key="item.title">
            <v-list-item-content>
              <v-list-item-title v-text="item.game"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-content>
              <v-list-item-title v-text="item.time" align="end"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>

      <v-container>
        <h4>Favorites Videogames</h4>
        <v-list>
          <v-list-item v-for="item in favouriteGames" :key="item.title">

            <v-list-item-content>
              <v-list-item-title v-text="item.popularGame"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-avatar>
              <v-img :src="item.logo"></v-img>
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
export default {
  name: "MyProfile",
  components: {NavBar},
  data(){
    return {
      items: [
        { title: 'Peruvian League of CSGO 2020', place: '3° Place' },
        { title: 'Peruvian League of CSGO 2019', place: '2° Place'  },
        { title: 'LightSpeed Cup', place: '3° Place'  },
      ],
      games:[
        { game: 'Counter Strike Global Offensive', time: '5 years' },
      ],
      favouriteGames: [
        { popularGame: 'CS: GO', logo: '@/assets/logos/CSGO_Logo.png' },
        { popularGame: 'Dota 2', logo: '@/assets/logos/DOTA2_Logo.png'  },
        { popularGame: 'League Of Legends', logo: '@/assets/logos/LOL_Logo.png'  },
      ],
      tasks:[
        { taskName: 'Aim Lab', timeToComplete: '30 minutes' },
        { taskName: 'Aim Lab', timeToComplete: '30 minutes' },
      ],
    }
  },
  methods:{
    showEditProfile() {
      this.$router.push('edit')
    },
  }
}
</script>

<style scoped>

</style>