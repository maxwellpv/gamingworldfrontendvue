<template>
  <v-main>
    <v-container>
      <v-app-bar
          app color="indigo darken-1" dark>
        <v-app-bar-title class="white--text">User Type</v-app-bar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
    </v-container>
    <v-container class="spacing-playground pa-6">
      <v-row justify="center" align="center">
        <v-col cols="12"  sm="10" md="8" lg="7" xl="6">
          <v-card class="pa-10">
            <v-card-title class="justify-center">
              <h2 v-if="profileType === 'gamer'">AMATEUR GAMER</h2>
              <h2 v-else-if="profileType === 'streamer'">AMATEUR STREAMER</h2>
            </v-card-title>
            <v-form
                v-model="validForm"
                ref="form"
                @submit.prevent=""
            >
              <v-container fluid>
                <h4 v-if="profileType === 'gamer'">Gaming Level</h4>
                <h4 v-else-if="profileType === 'streamer'">Add streaming categories</h4>
                <v-row justify="space-around" class="ma-5">
                  <template v-if="profileType === 'gamer'">
                    <v-radio-group
                        v-model="gamerLevel"
                        row
                        mandatory
                        justify="space-around"
                        style="width: 100%"
                    >
                      <v-col align="center" sm="4">
                        <v-img src="@/assets/svg/medalla-de-bronce.svg" class="icon"></v-img>
                        <v-radio
                            label="Newbie"
                            value="Newbie"
                        ></v-radio>
                      </v-col>
                      <v-col align="center" sm="4">
                        <v-img src="@/assets/svg/medalla-de-plata.svg" class="icon"></v-img>
                        <v-radio
                            label="Medium"
                            value="Medium"
                        ></v-radio>
                      </v-col>
                      <v-col align="center" sm="4">
                        <v-img src="@/assets/svg/medalla-de-oro.svg" class="icon"></v-img>
                        <v-radio
                            label="Advanced"
                            value="Advanced"
                        ></v-radio>
                      </v-col>
                    </v-radio-group>
                  </template>
                  <template v-else-if="profileType === 'streamer'">
                    <v-col
                        cols="12"
                        md="6"
                        v-for="(selectedCategory, i) in selectedStreamingCategories"
                        :key="i"
                        class="text-fields-row"
                    >
                      <v-row class="pa-2">
                        <v-text-field
                            v-model="selectedStreamingCategories[i]"
                            :rules="[v => !!v || 'Item is required']"
                            label="Select Category"
                            required
                        ></v-text-field>
                        <v-btn v-if="i > 2" @click="removeStreamingCategory(i)" class="error" :disabled="this.$route.name === 'edit'">X</v-btn>
                      </v-row>
                    </v-col>
                    <v-col
                        cols="12" md="6"
                        align="center">
                      <v-btn @click="addStreamingCategory" class="primary" :disabled="$route.name === 'edit'">+ Add</v-btn>
                    </v-col>
                  </template>
                </v-row>
              </v-container>
              <v-container v-if="profileType === 'gamer'" class="my-5" fluid>
                <h4>Achievements</h4>
                  <template>
                    <v-row justify="center" class="my-5">
                  <div
                      v-for="(tournamentResultName, i) in tournamentsResultsNames"
                      :key="i"
                      class="text-fields-row"
                  >
                    <v-row>
                      <v-col sm="6">
                        <v-text-field
                            class="my-2"
                            :label="tournamentResultName.label"
                            v-model="tournamentResultName.value"
                            :rules="[v => !!v || 'Item is required']"
                            required
                        ></v-text-field>
                      </v-col>
                      <v-col sm="4">
                        <v-text-field
                            class="my-2"
                            type="number"
                            v-model="tournamentsResultsPositions[i]"
                            :rules="[v => !!v || 'Item is required']"
                            label="Select Position"
                            required
                        ></v-text-field>
                      </v-col>
                      <v-col sm="2">
                        <v-btn @click="removeTournament(i)" class="error" :disabled="$route.name === 'edit'">Remove</v-btn>
                      </v-col>
                    </v-row>
                  </div>
                    </v-row>
                    <v-row justify="center">
                      <v-btn @click="addTournament" class="ma-3 primary" :disabled="$route.name === 'edit'">+ Add</v-btn>
                    </v-row>
                </template>
              </v-container>
              <v-container fluid>
                <h4 v-if="profileType === 'gamer'">Videogames Experience</h4>
                <h4 v-else-if="profileType === 'streamer'">Register Sponsor</h4>

                  <template v-if="profileType === 'gamer'">
                    <v-row justify="space-around" class="ma-5">
                    <div
                        v-for="(gamesExperienceName, i) in gamesExperienceNames"
                        :key="i"
                        class="text-fields-row"
                        :rules="[v => !!v || 'Item is required']"
                    >
                      <v-row justify="center">
                        <v-col sm="6">
                          <v-text-field
                              class="my-2"
                              :label="gamesExperienceName.label"
                              v-model="gamesExperienceName.value"
                              required
                          ></v-text-field>
                        </v-col>
                        <v-col sm="4">
                          <v-text-field
                              type="number"
                              class="my-2"
                              v-model="gamesExperienceTimes[i]"
                              :rules="[v => !!v || 'Item is required']"
                              label="Select Time"
                              required
                          ></v-text-field>
                        </v-col>
                        <v-col sm="2">
                          <v-btn @click="removeGame(i)" class="error" :disabled="$route.name === 'edit'">Remove</v-btn>
                        </v-col>
                      </v-row>
                    </div>
                    </v-row>
                    <v-row justify="center">
                      <v-btn @click="addGame" class="ma-3 primary" :disabled="$route.name === 'edit'">+ Add</v-btn>
                    </v-row>
                  </template>
                  <template v-else-if="profileType === 'streamer'">
                    <v-row justify="space-around" class="ma-5">
                    <v-col
                        cols="12"
                        md="6"
                        v-for="(sponsor, i) in registeredSponsors"
                        :key="i"
                    >
                      <v-row class="ma-1">
                        <v-text-field
                            label="Brand"
                            :value="sponsor"
                            :v-model="sponsor"
                            :rules="[v => !!v || 'Item is required']"
                            required
                        ></v-text-field>
                        <v-btn @click="removeSponsor(i)" class="error" :disabled="$route.name === 'edit'">X</v-btn>
                      </v-row>
                    </v-col>
                    <v-col
                        cols="12" md="6"
                        align="center">
                      <v-btn @click="addSponsor" class="primary" :disabled="$route.name === 'edit'">+ Add</v-btn>
                    </v-col>
                    </v-row>
                  </template>
              </v-container>
              <v-container class="my-5" fluid>
                <h4 v-if="profileType === 'gamer'">Favorites Videogames</h4>
                <h4 v-else-if="profileType === 'streamer'">Favorite video games to stream </h4>
                  <v-row class="ma-5" fluid
                         justify="center">
                    <find-game @gameSelected="currentFavoriteGameSelected = $event"></find-game>
                    <v-btn @click="addFavoriteGame()" class="primary" :disabled="$route.name === 'edit'">+ Add</v-btn>
                  </v-row>
                  <v-row
                      class="ma-1"
                      v-for="(game, i) in selectedFavoriteGames"
                      :key="i"
                      justify="space-around"
                  >
                      <span
                          class="mx-3"
                      >{{ game }}</span>
                      <v-btn @click="removeFavoriteGame(i)" class="error" :disabled="$route.name === 'edit'">X</v-btn>
                  </v-row>

              </v-container>
            </v-form>
          </v-card>
          <v-container>
            <template v-if="$route.name === 'create'">
              <v-btn class="ma-3 primary" @click="saveProfile" :disabled="!validForm">Create</v-btn>
            </template>
            <template v-else-if="$route.name === 'edit'">
              <v-btn class="ma-3 primary" @click="saveProfile" :disabled="!validForm">Save</v-btn>
            </template>
            <v-btn class="ma-3 primary" @click="goToMain">Cancel </v-btn>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import GamesService from "@/services/games.service";
import ProfilesService from "@/services/profiles.service";
import FindGame from "@/components/FindGame";

export default {
  name: "ManageProfile",
  components: {FindGame},
  data: () => {
    return {
      // Whether gamer (0) or streamer (1)
      profileType: 0,
      searchQuery: "",
      validForm: true,
      editingProfileId: null,
      possibleGamingLevels:
      ["Newbie", "Medium", "Advanced"],
      currentFavoriteGameSelected: "",
      // --- FOR STREAMER PROFILES ---
      selectedStreamingCategories: [],
      streamingCategories: [
        "PC",
        "Mobile",
        "Console",
        "Battle Royale",
        "Multiplayer",
        "Campaign"
      ],
      registeredSponsors: [],
      // --- END OF STREAMER

      // For both type of profiles
      selectedFavoriteGames: [],
      gameList: null,

      // --- FOR GAMER PROFILES ---
      // Registers the type of gamer level "newbie | average | veteran"
      gamerLevel: "",
      // v-text-fields with the names of tournaments the gamer participated in
      tournamentsResultsNames: [],
      // Simple array with tournament results (an index of possibleResults array), each index must equal to the tournamentsResultsNames array (TODO: change to object)
      tournamentsResultsPositions: [],
      // List of possible results of a tournament
      possibleResults: [
        'Top 10 ',
        'Third place',
        'Second place',
        'First place'
      ],
      // v-text-fields with the names of games the gamer has experience on
      gamesExperienceNames: [],
      // Simple array with game experience times (value is an index of possibleTimes array) of each registered game experience
      gamesExperienceTimes: [],
      // List of possible time ranges for game experiences
      possibleTimes: [
        'Days',
        'Weeks',
        'Months',
        'Years'
      ],
     // --- END OF GAMER

      // --- EDIT ORIGINAL IDS ---
      sponsorsOriginalIds: [],
      streamingCategoriesOriginalIds: [],
      favoriteGamesOriginalIds: []
    }
  },
  methods: {
    // Shows a new text field for tournament result
    addTournament () {
      this.tournamentsResultsPositions.push(this.possibleResults[0]);
      this.tournamentsResultsNames.push({
        label: "Tournament Name",
        value: "",
        originalId: null
      })
    },

    // Deletes the text field of tournament result
    removeTournament (index) {
      // Also deletes the position registered in that tournament
      this.tournamentsResultsPositions.splice(index, 1);
      this.tournamentsResultsNames.splice(index, 1)
    },

    // Shows a new text field for experience time
    addGame () {
      this.gamesExperienceTimes.push(this.possibleTimes[0]);
      this.gamesExperienceNames.push({
        label: "Videogame Name",
        value: "",
        originalId: null
      })
    },

    // Deletes game experience text fields
    removeGame (index) {
      // Also deletes the experience time type registered
      this.gamesExperienceTimes.splice(index, 1);
      this.gamesExperienceNames.splice(index, 1)
    },
    addFavoriteGame()
    {
      if (this.currentFavoriteGameSelected !== "" && !this.selectedFavoriteGames.includes(this.currentFavoriteGameSelected, 0))
      {
        this.selectedFavoriteGames.push(this.currentFavoriteGameSelected);
      }
    },
    addSponsor()
    {
      this.registeredSponsors.push("");
    },
    removeSponsor(index)
    {
      this.registeredSponsors.splice(index, 1);
    },
    addStreamingCategory()
    {
      this.selectedStreamingCategories.push(0);
    },
    removeStreamingCategory(index)
    {
      // We must have at least 3 streaming categories
      if (index < 3)
        return;
      this.selectedStreamingCategories.splice(index, 1);
    },

    saveProfile() {
      if (!this.validForm)
        return;

        let favoriteGamesData = [];

        for (let i = 0; i < this.selectedFavoriteGames.length; ++i) {
            favoriteGamesData.push({
              id: this.$route.name === "edit" ? this.favoriteGamesOriginalIds[i] : undefined,
              userId: process.env.VUE_APP_CURRENT_USER_ID,
              gameName: this.selectedFavoriteGames[i]});
        }

        let experiencesData = [];

        for (let i = 0; i < this.gamesExperienceNames.length; ++i) {
            experiencesData.push({
              id: this.$route.name === "edit" ? parseInt(this.gamesExperienceNames[i].originalId) : undefined,
              userId: process.env.VUE_APP_CURRENT_USER_ID,
              gameName: this.gamesExperienceNames[i].value,
              time: parseInt(this.gamesExperienceTimes[i])
            });
        }

        let tournamentsData = [];
        for (let i = 0; i < this.tournamentsResultsNames.length; ++i) {
          tournamentsData.push({
            id: this.$route.name === "edit" ? parseInt(this.tournamentsResultsNames[i].originalId) : undefined,
            userId: process.env.VUE_APP_CURRENT_USER_ID,
            name: this.tournamentsResultsNames[i].value,
            date: "01-10-2021",
            position: parseInt(this.tournamentsResultsPositions[i])
          });
        }

      let streamerSponsorsData = [];
      let streamingCategoriesData = [];
        if (this.profileType === 'streamer')
        {
          for (let i = 0; i < this.selectedStreamingCategories.length; ++i) {
            streamingCategoriesData.push({
              id: this.$route.name === "edit" ? this.streamingCategoriesOriginalIds[i] : undefined,
              userId: process.env.VUE_APP_CURRENT_USER_ID,
              name: this.selectedStreamingCategories[i]
            });
          }

          for (let i = 0; i < this.registeredSponsors.length; ++i) {
            streamerSponsorsData.push({
              id: this.$route.name === "edit" ? this.sponsorsOriginalIds[i] : undefined,
              userId: process.env.VUE_APP_CURRENT_USER_ID,
              name: this.registeredSponsors[i]
            });
          }
        }

        console.log(experiencesData);
        console.log(tournamentsData);
      const profileData = {
        id: this.$route.name === "edit" ? this.editingProfileId : undefined,
        userId: this.$route.params.id,
        gamingLevel: this.possibleGamingLevels.indexOf(this.gamerLevel) + 1,
        isStreamer: this.profileType === 'streamer',
        favoriteGamesData,
        experiencesData,
        streamingCategoriesData,
        streamerSponsorsData,
        tournamentsData
      };
        if (this.$route.name === 'create')
        {
          ProfilesService.create(profileData).then(() => {
            this.$router.push({name: 'success'});
          });
        }
        else if (this.$route.name === 'edit')
        {
          ProfilesService.update(this.editingProfileId, profileData).then(() => {
            this.$router.push({name: 'success'});
          });
        }
    },
    goToMain()
    {
      this.$router.push('/news');
    },
    removeFavoriteGame(index)
    {
      this.selectedFavoriteGames.splice(index, 1);
    },

    // Needed to instantiate the profile registration
    retrieveData() {

      GamesService.getList().then((response) => {
        this.gameList = response.data;
      });

      this.profileType = this.$route.params.type;

      if (this.$route.name === "edit")
      {
        ProfilesService.getProfileByUserId(this.$route.params.id).then((response) => {
          console.log(response.data)
          this.editingProfileId = response.data.id;
          this.gamerLevel = response.data.gamingLevel;

          for (let i = 0; i < response.data.favoriteGames.length; ++i)
          {
            this.selectedFavoriteGames.push(response.data.favoriteGames[i].gameName);
          }

          for (let i = 0; i < response.data.gameExperiences.length; ++i)
          {
            this.addGame();
            this.gamesExperienceNames[i].originalId = response.data.gameExperiences[i].id;
            this.gamesExperienceNames[i].value = response.data.gameExperiences[i].gameName;
            this.gamesExperienceTimes[i] = response.data.gameExperiences[i].time;
          }

          if (this.$route.params.type === "streamer")
          {
            for (let i = 0; i < response.data.streamingCategories.length; ++i)
            {
              this.addStreamingCategory();
              this.selectedStreamingCategories[i] = response.data.streamingCategories[i].name;
            }
            for (let i = 0; i < response.data.streamerSponsors.length; ++i)
            {
              this.addSponsor();

              this.registeredSponsors[0] = response.data.streamerSponsors[i].name;
            }
          }

          for (let i = 0; i < response.data.tournamentExperiences.length; ++i)
          {
            this.addTournament();
            this.tournamentsResultsNames[i].originalId = response.data.tournamentExperiences[i].id;
            this.tournamentsResultsNames[i].value = response.data.tournamentExperiences[i].name;
            this.tournamentsResultsPositions[i] = parseInt(response.data.tournamentExperiences[i].position);
          }
        });
      }
    }
  },
  created() {
    this.retrieveData();
  }
}
</script>

<style>
.icon
{
  width: 48px;
  height: 48px;
}
.v-input--checkbox .v-input__slot
{
  flex-direction: column;
}
.v-input--radio-group.v-input--radio-group--row .v-radio {
  margin-right: 0;
  flex-direction: column;
}

.v-application--is-ltr .v-input--selection-controls__input {
  margin-right: 0;
}
.v-text-field
{
  padding-top: 0;
}

.v-select
{
  padding: 0 !important;
  width: 100% !important;
  flex-basis: 20px;
  flex-grow: 1;
}

.text-fields-row
{
  width: 85% !important;
}

.v-app-bar-title__content {
  min-width: 120px;
}

.v-select .dropdown-toggle {
  display: flex !important;
  flex-wrap: wrap;
}
</style>