<template>
  <v-container>
    <nav-bar></nav-bar>
    <v-row no-gutters>
      <v-col xs="12" sm="3">
        <v-card>
          <v-list>
            <v-list-item-title class="pl-3"><h2>Filter By</h2></v-list-item-title>
            <v-list-item >
              <v-list-item-content >
                <v-btn class="d-flex justify-start" text @click="getGeneralPublications('videogames')">General</v-btn>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-btn class="d-flex justify-start" text @click="searchArticles('steam')">Tip/Task</v-btn>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-btn class="d-flex justify-start" text @click="searchArticles('twitch')">Tournament</v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col xs="12" sm="6">
          <v-card class="mx-3">
            <v-card-text>
              <v-dialog
                  v-model="dialogP"
                  persistent
                  max-width="600px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn width="100%" rounded class="text-none"
                      v-bind="attrs"
                      v-on="on"
                  >
                  Publish something!
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">New Publication</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col
                            cols="12"
                        >
                          <v-text-field
                              label="Title*"
                              v-model="newpublication.title"
                              required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                          <v-textarea
                              solo
                              label="Content"
                              v-model="newpublication.content"
                          ></v-textarea>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                              label="Image URL"
                              v-model="newpublication.urlToImage"
                          ></v-text-field>
                          <v-img v-if="newpublication.urlToImage!=''" :src="this.newpublication.urlToImage"></v-img>
                        </v-col>
                        <v-file-input
                            accept="image/*"
                            label="File input"
                        ></v-file-input>
                      </v-row>
                    </v-container>
                    <small>*indicates required field</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="warning"
                        dark
                        @click="dialogP = false"
                    >
                      Close
                    </v-btn>
                    <v-btn
                        color="primary"
                        dark
                        @click="save(1)"
                    >
                      Save
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-divider class="ma-2"></v-divider>
              <div class="d-flex justify-space-around">
                <v-dialog
                    v-model="dialogT"
                    persistent
                    max-width="600px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn width="50%" text
                           v-bind="attrs"
                           v-on="on"
                    >
                        <v-icon>mdi-gamepad</v-icon>
                        Tip/Task
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">New Tip / Task</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col
                              cols="12"
                          >
                            <v-text-field
                                label="Title*"
                                v-model="newpublication.title"
                                required
                            ></v-text-field>
                          </v-col>

                          <v-row justify="space-around" width class="ma-5" fluid>
                            <div
                                v-for="(game, i) in popularGames"
                                :key="i"
                                class=""
                            >
                              <v-col align="center">
                                <v-img src="game.imageURL"></v-img>
                                <v-checkbox color="blue" id="game.id" :label="game.name" v-model="selectedPopularGames[i]"></v-checkbox>
                              </v-col>
                            </div>
                          </v-row>

                          <v-col cols="12">
                            <v-textarea
                                solo
                                label="Content"
                                v-model="newpublication.content"
                            ></v-textarea>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                                label="Image URL"
                                v-model="newpublication.urlToImage"
                            ></v-text-field>
                            <v-img v-if="newpublication.urlToImage!=''" :src="this.newpublication.urlToImage"></v-img>
                          </v-col>
                          <v-file-input
                              accept="image/*"
                              label="File input"
                          ></v-file-input>
                        </v-row>
                      </v-container>
                      <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                          color="warning"
                          dark
                          @click="dialogT = false"
                      >
                        Close
                      </v-btn>
                      <v-btn
                          color="primary"
                          dark
                          @click="save(2)"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-dialog
                    v-model="dialogTr"
                    persistent
                    max-width="600px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn width="50%" text
                           v-bind="attrs"
                           v-on="on"
                    >
                      <v-icon>mdi-medal</v-icon>
                      Tournament
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="text-h5">New Tournament</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col
                              cols="12"
                          >
                            <v-text-field
                                label="Name*"
                                v-model="newpublication.title"
                                required
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12">
                            <v-text-field
                                label="Banner URL"
                                v-model="newpublication.urlToImage"
                            ></v-text-field>
                            <v-img :src="this.newpublication.urlToImage"></v-img>
                          </v-col>
                          <v-col cols="12">
                            <v-file-input
                                accept="image/*"
                                label="File input"
                            ></v-file-input>
                          </v-col>


                          <v-row justify="space-around" width class="ma-5" fluid>
                            <div
                                v-for="(game, i) in popularGames"
                                :key="i"
                                class=""
                            >
                              <v-col align="center">
                                <v-img src="game.imageURL"></v-img>
                                <v-checkbox color="blue" id="game.id" :label="game.name" v-model="selectedPopularGames[i]"></v-checkbox>
                              </v-col>
                            </div>
                          </v-row>

                          <v-col cols="12">
                            <v-textarea
                                solo
                                label="Tournament description"
                                v-model="newpublication.content"
                            ></v-textarea>
                          </v-col>

                          <v-col cols="12">
                            <v-text-field
                                label="Participant Limit"
                                v-model="newpublication.participantLimit"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                                label="Prize Pool"
                                v-model="newpublication.prizePool"
                            ></v-text-field>
                          </v-col>

                          <v-col
                              cols="12"
                              sm="6"
                              md="4"
                          >
                            <v-menu
                                ref="dateD"
                                v-model="dialogD"
                                :close-on-content-click="false"
                                :return-value.sync="date"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="date"
                                    label="Date"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                  v-model="date"
                                  no-title
                                  scrollable
                              >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="dialogD = false"
                                >
                                  Cancel
                                </v-btn>
                                <v-btn
                                    text
                                    color="primary"
                                    @click="$refs.dateD.save(date)"
                                >
                                  OK
                                </v-btn>
                              </v-date-picker>
                            </v-menu>
                          </v-col>
                          <v-spacer></v-spacer>
                          <v-col
                              cols="11"
                              sm="5"
                          >
                            <v-menu
                                ref="timeD"
                                v-model="dialogH"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                :return-value.sync="time"
                                transition="scale-transition"
                                offset-y
                                max-width="290px"
                                min-width="290px"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="time"
                                    label="Hour"
                                    prepend-icon="mdi-clock-time-four-outline"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                              </template>
                              <v-time-picker
                                  v-if="dialogH"
                                  v-model="time"
                                  full-width
                                  @click:minute="$refs.timeD.save(time)"
                              ></v-time-picker>
                            </v-menu>
                          </v-col>
                        </v-row>
                      </v-container>
                      <small>*indicates required field</small>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                          color="warning"
                          dark
                          @click="dialogTr = false"
                      >
                        Close
                      </v-btn>
                      <v-btn
                          color="primary"
                          dark
                          @click="save(3)"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-card-text>

          </v-card>
        <publications-content></publications-content>

      </v-col>
      <v-col xs="12" sm="3">
        <premium-dialog></premium-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>



import NavBar from "../components/NavBar";
import PremiumDialog from "../components/PremiumDialog";
import PublicationsContent from "../components/PublicationsContent";
import PublicationsService from '../services/publications.service'
import GamesService from '../services/games.service'
import UsersService from '../services/users.service'

export default {
  name: "publications-page",
  components: {
    NavBar,
    PremiumDialog,
    PublicationsContent
  },
  data: () => ({
    dialogP: false,
    dialogT: false,
    dialogTr: false,
    imgtest: "",
    selectedPopularGames: Array(0),
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    dialogD: false,
    time: null,
    dialogH: false,
    modal2: false,
    publications: [],
    users: [],
    games: [],
    newpublication: {},

    popularGames: [
      {
        id: 0,
        name: "CS: GO",
        imageURL: ""
      },
      {
        id: 1,
        name: "LoL",
        imageURL: ""
      },
      {
        id: 2,
        name: "Fortnite",
        imageURL: ""
      },
      {
        id: 3,
        name: "CoD: Warzone",
        imageURL: ""
      },
      {
        id: 4,
        name: "Valorant",
        imageURL: ""
      }
    ]
  }),

  created(){
    this.retrieveData()
  },

  methods: {

    save (pType) {
      this.newpublication.publicationType=pType;
      this.newpublication.tDate=this.date;
      this.newpublication.tHour=this.time;
      let item = this.newpublication;
      let dto = this.getDisplayPublication(item);
      this.hasSaved = true
      PublicationsService.create(dto).catch(e => console.log(e));
      this.dialogTr = false
      this.dialogP = false
      this.dialogT = false
      this.publications.push(dto)


    },
    getDisplayPublication(publication) {
      return {
        publicationType: publication.publicationType,
        id: publication.id,
        userId: publication.userId,
        title: publication.title,
        content: publication.content,
        urlToImage: publication.urlToImage,
        gameId: publication.gameId,
        participantLimit: publication.participantLimit,
        prizePool: publication.prizePool,
        tDate: publication.tDate,
        tHour: publication.tHour
      }
    },

    getDisplayGame(game) {
      return {
        id: game.id,
        name: game.name,
      }
    },

    getDisplayUser(user) {
      return {
        id: user.id,
        username: user.username,
      }
    },

    getGeneralPublications(){
      PublicationsService.getByType(1)
          .then((response)=>{
            this.publications = response.data.map(this.getDisplayPublication);
          })
          .catch(e=>{
            console.log(e);
          })
    },

    retrieveData(){
      PublicationsService.getAll()
          .then((response)=>{
            this.publications = response.data.map(this.getDisplayPublication);
          })
          .catch(e=>{
            console.log(e);
          })
      GamesService.getAll()
          .then((response)=>{
            this.games = response.data.map(this.getDisplayGame);
          })
          .catch(e=>{
            console.log(e);
          })
      UsersService.getAll()
          .then((response)=>{
            this.users = response.data.map(this.getDisplayUser);
          })
          .catch(e=>{
            console.log(e);
          })
    },



  }
};
</script>

<style scoped>

</style>