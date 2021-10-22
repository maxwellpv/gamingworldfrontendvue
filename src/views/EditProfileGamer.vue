<template>
  <v-container>
    <nav-bar></nav-bar>
    <v-card>
      <v-form id="streamerProfile" method="post" action="" lazy-validation
      >
        <v-container class="my-5" fluid>
          <h4>General Level of Play </h4>
          <v-row justify="center" class="ma-5">
            <v-col align="center" sm="4">
              <v-img src="@/assets/svg/medalla-de-bronce.svg" class="icon"></v-img>
              <v-radio class="justify-center ma-2" color="blue" name="gamer-level" value="Noob" v-model="gamerLevel"></v-radio>
              <label>Noob</label>
            </v-col>
            <v-col align="center" sm="4">
              <v-img src="@/assets/svg/medalla-de-plata.svg" class="icon"></v-img>
              <v-radio class="justify-center ma-2" color="blue" name="gamer-level" value="Medium" v-model="gamerLevel"></v-radio>
              <label>Medium</label>
            </v-col>
            <v-col align="center" sm="4">
              <v-img src="@/assets/svg/medalla-de-oro.svg" class="icon"></v-img>
              <v-radio class="justify-center ma-2" color="blue" name="gamer-level" value="Advanced" v-model="gamerLevel"></v-radio>
              <label>Advanced</label>
            </v-col>
          </v-row>
        </v-container>
        <v-container class="my-5" fluid>
          <h4>Achievements</h4>
          <v-row justify="center" class="my-5">
            <div v-for="(tournamentResultName, i) in tournamentsResultsNames" :key="i" class="text-fields-row">
              <v-row>
                <v-col sm="6">
                  <v-text-field class="my-2" :label="tournamentResultName.label" v-model="tournamentResultName.value"></v-text-field>
                </v-col>
                <v-col sm="4">
                  <v-select class="my-2" v-model="tournamentsResultsPositions[i]" :items="possibleResults" :rules="[v => !!v || 'Item is required']" label="Select Position" required></v-select>
                </v-col>
                <v-col sm="2">
                  <v-btn @click="removeTournament(i)" class="error">Remove</v-btn>
                </v-col>

              </v-row>
            </div>
          </v-row>
          <v-row justify="center">
            <v-btn @click="addTournament" class="ma-3 primary">+ Add Achievement</v-btn>
          </v-row>

        </v-container>
        <v-container class="my-5" fluid>
          <h4>Videogames Experience</h4>
          <v-row justify="center" class="my-5">
            <div v-for="(gamesExperienceName, i) in gamesExperienceNames" :key="i" class="text-fields-row">
              <v-row justify="center">
                <v-col sm="6">
                  <v-text-field class="my-2" :label="gamesExperienceName.label" v-model="gamesExperienceName.value"></v-text-field>
                </v-col>
                <v-col sm="4">
                  <v-select class="my-2" v-model="gamesExperienceTimes[i]" :items="possibleTimes" :rules="[v => !!v || 'Item is required']" label="Select Time" required></v-select>
                </v-col>
                <v-col sm="2">
                  <v-btn @click="removeGame(i)" class="error">Remove</v-btn>
                </v-col>

              </v-row>
            </div>
          </v-row>
          <v-row justify="center">
            <v-btn @click="addGame" class="ma-3 primary">+ Add Expereince</v-btn>
          </v-row>

        </v-container>
        <v-container class="my-5" fluid>
          <h4>Favorites Videogames</h4>
          <v-row justify="space-around" width class="my-5" fluid>
            <div v-for="(game, i) in popularGames" :key="i" class="">
              <v-col align="center" >
                  <v-img :src="game.imageURL"></v-img>
                <v-checkbox color="blue" :id="game.id" :label="game.name" v-model="selectedPopularGames[i]"></v-checkbox>
              </v-col>
            </div>
          </v-row>
        </v-container>
        <v-container class="my-5" fluid>
          <h4>Task in progress</h4>
          <v-row justify="center" class="my-5">
            <div v-for="(taskName, i) in taskName" :key="i" class="text-fields-row">
              <v-row justify="center">
                <v-col sm="6">
                  <v-text-field class="my-2" :label="taskName.label" v-model="taskName.value"></v-text-field>
                </v-col>
                <v-col sm="4">
                  <v-select class="my-2" v-model="taskTime[i]" :items="possibleTime" :rules="[v => !!v || 'Item is required']" label="Select Time To Complete" required></v-select>
                </v-col>
                <v-col sm="2">
                  <v-btn @click="removeTask(i)" class="error">Remove</v-btn>
                </v-col>

              </v-row>
            </div>
          </v-row>
          <v-row justify="center">
            <v-btn @click="addTask" class="ma-3 primary">+ Add Task</v-btn>
          </v-row>

        </v-container>
      </v-form>
    </v-card>
    <v-btn class="ma-3 primary" @click="showNewsContent">Save and Return to news </v-btn>
    <v-btn class="ma-3 primary" @click="showMyProfile">Cancel </v-btn>
  </v-container>
</template>

<script>
import NavBar from "../components/NavBar";

export default {
  name: "EditProfileGamer",
  components: {NavBar},
  data: () => {
    return {
      gamerLevel: "",
      tournamentsResultsNames: [],
      tournamentsResultsPositions: [],
      possibleResults: [
        'Top 10 ',
        '3° place',
        '2° place',
        '1° place'
      ],
      gamesExperienceNames: [],
      gamesExperienceTimes: [],
      possibleTimes: [
        'Days',
        'Weeks',
        'Months',
        'Years'
      ],
      taskName: [],
      taskTime: [],
      possibleTime: [
        '30 Minutes',
        '1 Hour',
        '2 Hours',
        '5 Hours'
      ],
      selectedPopularGames: [],
      popularGames: [
        {
          id: 0,
          name: "CS: GO",
          imageURL: "@/assets/logos/CSGO_Logo.png"
        },
        {
          id: 1,
          name: "LoL",
          imageURL: "@/assets/logos/LOL_Logo.png"
        },
        {
          id: 2,
          name: "Fortnite",
          imageURL: "@/assets/logos/FORTNITE_Logo.png"
        },
        {
          id: 3,
          name: "Dota 2",
          imageURL: "@/assets/logos/DOTA2_Logo.png"
        },
        {
          id: 4,
          name: "Valorant",
          imageURL: "@/assets/logos/VALORANT_Logo.png"
        }
      ]
    }
  },
  methods: {
    addTournament () {
      this.tournamentsResultsPositions.push(this.possibleResults[0]);
      this.tournamentsResultsNames.push({
        label: "Tournament Name",
        value: "",
      })
    },

    removeTournament (index) {
      this.tournamentsResultsPositions.splice(index, 1);
      this.tournamentsResultsNames.splice(index, 1)
    },

    addGame () {
      this.gamesExperienceTimes.push(this.possibleTimes[0]);
      this.gamesExperienceNames.push({
        label: "Videogame Name",
        value: "",
      })
    },

    removeGame (index) {
      this.gamesExperienceTimes.splice(index, 1);
      this.gamesExperienceNames.splice(index, 1)
    },

    addTask () {
      this.taskTime.push(this.possibleTime[0]);
      this.taskName.push({
        label: "Task Name",
        value: "",
      })
    },

    removeTask (index) {
      this.taskTime.splice(index, 1);
      this.taskName.splice(index, 1)
    },

    showMyProfile() {
      this.$router.push('myprofile')
    },

    showNewsContent() {
      this.$router.push('news')
    }
  }
}
</script>

<style scoped>

</style>