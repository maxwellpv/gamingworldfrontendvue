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
                <v-row justify="space-around" class="ma-5">
                  <template v-if="profileType === 'gamer'">
                    <v-radio-group
                        v-model="profileData.gamingLevel"
                        row
                        mandatory
                        justify="space-around"
                        style="width: 100%"
                    >
                      <v-col align="center" sm="4">
                        <v-img src="@/assets/svg/medalla-de-bronce.svg" class="icon"></v-img>
                        <v-radio
                            label="Newbie"
                            value="1"
                        ></v-radio>
                      </v-col>
                      <v-col align="center" sm="4">
                        <v-img src="@/assets/svg/medalla-de-plata.svg" class="icon"></v-img>
                        <v-radio
                            label="Medium"
                            value="2"
                        ></v-radio>
                      </v-col>
                      <v-col align="center" sm="4">
                        <v-img src="@/assets/svg/medalla-de-oro.svg" class="icon"></v-img>
                        <v-radio
                            label="Advanced"
                            value="3"
                        ></v-radio>
                      </v-col>
                    </v-radio-group>
                  </template>
                </v-row>
              </v-container>
              <v-container v-if="profileType === 'gamer'" class="my-5" fluid>
                <h4>Achievements</h4>
                  <template>
                    <v-row justify="center" class="my-5">
                  <div
                      v-for="(tournamentExperience, i) in profileData.tournamentExperiences"
                      :key="i"
                      class="text-fields-row"
                  >
                    <v-row>
                      <v-col sm="6">
                        <v-text-field
                            class="my-2"
                            label="Tournament Name"
                            v-model="tournamentExperience.name"
                            :rules="[v => !!v || 'Item is required']"
                            required
                        ></v-text-field>
                      </v-col>
                      <v-col sm="4">
                        <v-text-field
                            class="my-2"
                            type="number"
                            v-model="tournamentExperience.position"
                            :rules="[v => !!v || 'Item is required']"
                            label="Select Position"
                            required
                        ></v-text-field>
                      </v-col>
                      <v-col sm="2">
                        <v-btn @click="removeTournament(i)" class="error">Remove</v-btn>
                      </v-col>
                    </v-row>
                  </div>
                    </v-row>
                    <v-row justify="center">
                      <v-btn @click="addTournament" class="ma-3 primary">+ Add</v-btn>
                    </v-row>
                </template>
              </v-container>
              <v-container fluid>
                <h4 v-if="profileType === 'gamer'">Videogames Experience</h4>

                  <template v-if="profileType === 'gamer'">
                    <v-row justify="space-around" class="ma-5">
                    <div
                        v-for="(gameExperience, i) in profileData.gameExperiences"
                        :key="i"
                        class="text-fields-row"
                    >
                      <v-row justify="center">
                        <v-col sm="6">
                          <v-text-field
                              class="my-2"
                              label="Game Name"
                              v-model="gameExperience.gameName"
                              required
                              :rules="[v => !!v || 'Item is required']"
                          ></v-text-field>
                        </v-col>
                        <v-col sm="4">
                          <v-text-field
                              type="number"
                              class="my-2"
                              v-model="gameExperience.time"
                              :rules="[v => !!v || 'Item is required']"
                              label="Select Time"
                              required
                          ></v-text-field>
                        </v-col>
                        <v-col sm="2">
                          <v-btn @click="removeGame(i)" class="error">Remove</v-btn>
                        </v-col>
                      </v-row>
                    </div>
                    </v-row>
                    <v-row justify="center">
                      <v-btn @click="addGame" class="ma-3 primary">+ Add</v-btn>
                    </v-row>
                  </template>
              </v-container>
              <v-container class="my-5" fluid>
                <h4 v-if="profileType === 'gamer'">Favorites Videogames</h4>
                <h4 v-else-if="profileType === 'streamer'">Favorite video games to stream </h4>
                  <v-row class="ma-5" fluid
                         justify="center">
                    <find-game @gameSelected="currentFavoriteGameSelected = $event"></find-game>
                    <v-btn @click="addFavoriteGame()" class="primary">+ Add</v-btn>
                  </v-row>
                  <v-row
                      class="ma-1"
                      v-for="(favoriteGame, i) in profileData.favoriteGames"
                      :key="i"
                      justify="space-around"
                  >
                      <span
                          class="mx-3"
                      >{{ favoriteGame.gameName }}</span>
                      <v-btn @click="removeFavoriteGame(i)" class="error">X</v-btn>
                  </v-row>

              </v-container>
              <v-container fluid>
                <h4 v-if="profileType === 'streamer'">Register Sponsor</h4>
                <template v-if="profileType === 'streamer'">
                  <v-row justify="space-around" class="ma-5">
                    <v-col
                        cols="12"
                        md="6"
                        v-for="(sponsor, i) in profileData.streamerSponsors"
                        :key="i"
                    >
                      <v-row class="ma-1">
                        <v-text-field
                            label="Brand"
                            v-model="sponsor.name"
                            :rules="[v => !!v || 'Item is required']"
                            required
                        ></v-text-field>
                        <v-btn @click="removeSponsor(i)" class="error" :disabled="$route.name === 'edit'">X</v-btn>
                      </v-row>
                    </v-col>
                    <v-col
                        cols="12" md="6"
                        align="center">
                      <v-btn @click="addSponsor" class="primary">+ Add</v-btn>
                    </v-col>
                  </v-row>
                </template>
              </v-container>
              <v-container fluid>
                <template v-if="profileType === 'streamer'">
                  <v-col
                      cols="12"
                      md="6"
                      v-for="(streamingCategory, i) in profileData.streamingCategories"
                      :key="i"
                      class="text-fields-row"
                  >
                    <v-row class="pa-2">
                      <v-text-field
                          v-model="streamingCategory.name"
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
                    <v-btn @click="addStreamingCategory" class="primary">+ Add</v-btn>
                  </v-col>
                </template>
              </v-container>
            </v-form>
          </v-card>
          <v-container>
            <h4 v-if="profileType === 'streamer'">Add streaming categories</h4>
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
      validForm: false,
      gamingLevels: [
          "Newbie",
          "Medium",
          "Advanced"
      ],
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
      currentFavoriteGameSelected: null,
      profileType: "",
    }
  },
  methods: {
    // Shows a new text field for tournament result
    addTournament () {
      this.profileData.tournamentExperiences.push(
          {
            name: "",
            position: 1
          }
      );
    },

    // Deletes the text field of tournament result
    removeTournament (index) {
      // Also deletes the position registered in that tournament
      this.profileData.tournamentExperiences.splice(index, 1);
    },

    // Shows a new text field for experience time
    addGame () {
      this.profileData.gameExperiences.push(
          {
            gameName: "",
            time: 1
          }
      );
    },

    // Deletes game experience text fields
    removeGame (index) {
      // Also deletes the experience time type registered
      this.profileData.gameExperiences.splice(index, 1);
    },
    addFavoriteGame()
    {
      this.profileData.favoriteGames.push(
          {
            gameName: this.currentFavoriteGameSelected
          }
      );
    },
    addSponsor()
    {
      this.profileData.streamerSponsors.push(
          {
            name: ""
          }
      );
    },
    removeSponsor(index)
    {
      this.profileData.streamerSponsors.splice(index, 1);
    },
    addStreamingCategory()
    {
      this.profileData.streamingCategories.push(
          {
            name: ""
          }
      );
    },
    removeStreamingCategory(index)
    {
      this.profileData.streamingCategories.splice(index, 1);
    },

    saveProfile() {
      if (!this.validForm)
        return;

      this.profileData.gamingLevel = parseInt(this.profileData.gamingLevel);

      if (this.$route.name === 'create')
      {
        ProfilesService.create(this.profileData).then(() => {
          this.$router.push({name: 'success'});
        });
      }
      else if (this.$route.name === 'edit')
      {
        console.log(this.profileData);
        ProfilesService.update(this.profileData.id, this.profileData).then(() => {
          //this.$router.push({name: 'success'});
        });
      }
    },
    goToMain()
    {
      this.$router.push('/news');
    },
    removeFavoriteGame(index)
    {
      this.profileData.favoriteGames.splice(index, 1);
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
          this.profileData = response.data;
          this.profileData.gamingLevel = (parseInt(this.gamingLevels.indexOf(this.profileData.gamingLevel)) + 1).toString();
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