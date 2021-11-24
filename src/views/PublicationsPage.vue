<template>
  <v-container >
    <nav-bar></nav-bar>
    <v-card v-if="!validSession">
        <v-img
            class="white--text align-end"
            src="https://www.fifplay.com/img/public/big-gaming-competition.jpg"
        >
          <v-card-title>Join in the GamingWorld Community</v-card-title>
        </v-img>

        <v-card-text class="text--primary">
          <div>Please Log-in or Sing-up in GamingWorld to access the tournaments.</div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              text
              @click="$router.push('/login')"
          >
            Log-in
          </v-btn>

          <v-btn
              color="primary"
              text
              @click="$router.push('/register')"
          >
            Sign-up
          </v-btn>
        </v-card-actions>
    </v-card>
    <v-row v-if="validSession" no-gutters>
      <v-col xs="12" sm="3">
        <v-card>
          <v-list>
            <v-list-item-title class="pl-3"><h2>Filter By</h2></v-list-item-title>
            <v-list-item >
              <v-list-item-content >
                <v-btn class="d-flex justify-start" text @click="getGeneralPublications(1)">General</v-btn>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-btn class="d-flex justify-start" text @click="getGeneralPublications(2)">Tip/Task</v-btn>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-btn class="d-flex justify-start" text @click="getGeneralPublications(3)">Tournament</v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col xs="12" sm="6">
        <v-form :key="testForm" v-model="isValidated">
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
                    <small>*indicates required field</small>
                    <v-container>
                      <v-row>
                        <v-col
                            cols="12"
                        >
                          <v-text-field
                              label="Title*"
                              v-model="newPublication.title"
                              :rules="validationRulesP"

                          ></v-text-field>
                        </v-col>

                        <v-col cols="12">
                          <v-textarea
                              solo
                              label="Content*"
                              v-model="newPublication.content"
                              :rules="validationRules1"
                          ></v-textarea>
                        </v-col>
                        <v-col cols="12">
                          <v-text-field
                              label="Image URL"
                              v-model="newPublication.urlToImage"
                          ></v-text-field>
                          <v-img v-if="newPublication.urlToImage!==''" :src="this.newPublication.urlToImage"></v-img>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="warning"
                        dark
                        @click="dialogP = false; onClear()"
                    >
                      Close
                    </v-btn>
                    <v-btn
                        color="primary"
                        :disabled="!isValidated"
                        @click="submitPublication(1)"
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
                      <small>*indicates required field</small>
                      <v-container>
                        <v-row>
                          <v-col
                              cols="12"
                          >
                            <v-text-field
                                label="Title*"
                                v-model="newPublication.title"
                                :rules="validationRulesP"
                            ></v-text-field>
                          </v-col>

                          <find-game rules="v => !!v || 'Title is required'" @gameSelected="currentFavoriteGameSelected = $event"></find-game>

                          <v-col cols="12">
                            <v-textarea
                                solo
                                label="Content*"
                                v-model="newPublication.content"
                                :rules="validationRules1"
                            ></v-textarea>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                                label="Image URL"
                                v-model="newPublication.urlToImage"
                            ></v-text-field>
                            <v-img v-if="newPublication.urlToImage!==''" :src="this.newPublication.urlToImage"></v-img>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                          color="warning"
                          dark
                          @click="dialogT = false; onClear()"
                      >
                        Close
                      </v-btn>
                      <v-btn
                          color="primary"
                          :disabled="!isValidated || currentFavoriteGameSelected===null"
                          @click="submitPublication(2)"
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
                      <small>*indicates required field</small>
                      <v-container>
                        <v-row>
                          <v-col
                              cols="12"
                          >
                            <v-text-field
                                label="Name*"
                                v-model="newPublication.title"
                                :rules="validationRulesTr"
                            ></v-text-field>
                          </v-col>

                          <v-col cols="12">
                            <v-text-field
                                label="Banner URL"
                                v-model="newPublication.urlToImage"
                            ></v-text-field>
                            <v-img :src="this.newPublication.urlToImage"></v-img>
                          </v-col>

                          <find-game @gameSelected="currentFavoriteGameSelected = $event"></find-game>


                          <v-col cols="12">
                            <v-textarea
                                solo
                                label="Tournament description*"
                                v-model="newPublication.content"
                                :rules="validationRules1"
                            ></v-textarea>
                          </v-col>

                          <v-col cols="12">
                            <v-text-field
                                label="Participant Limit*"
                                v-model="newPublication.participantLimit"
                                type="number"
                                :rules="[v => !!v || 'Number of participants is required', v => /^([0-9])+$/.test(v) || 'Number of participants must be integer']"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                                label="Prize Pool"
                                type="number"
                                v-model="newPublication.prizePool"

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
                                    label="Date*"
                                    :rules="[v => !!v || 'Date of the tournament is required']"

                                    prepend-icon="mdi-calendar"
                                    readonly
                                    clearable

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
                                    label="Hour*"
                                    :rules="[v => !!v || 'Hour of the tournament is required']"
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

                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                          color="warning"
                          dark
                          @click="dialogTr = false; onClear()"
                      >
                        Close
                      </v-btn>
                      <v-btn
                          :disabled="!isValidated || currentFavoriteGameSelected===null"
                          color="primary"
                          @click="submitPublication(3)"
                      >
                        Save
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-card-text>

          </v-card>
        <publications-content :publications="publications" :games="games" :users="users"></publications-content>
        </v-form>
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
import FindGame from "@/components/FindGame";
import SessionService from '../services/session.service'

export default {
  name: "publications-page",
  components: {
    FindGame,
    NavBar,
    PremiumDialog,
    PublicationsContent
  },
  data: () => ({
    currentFavoriteGameSelected: null,
    dialogP: false,
    dialogT: false,
    dialogTr: false,
    imgTest: "",
    selectedPopularGames: Array(0),
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    dialogD: false,
    time: null,
    dialogH: false,
    modal2: false,
    publications: [],
    users: [],
    games: [],
    newPublication: {},
    isValidated: true,
    validSession: false,
    testForm: 1,
    validationRules1: [
      v => !!v || 'Content is required',
      v => (v && v.length >= 40) ||'Content must be at least 40 characters',
    ],
    validationRulesTr: [
      v => !!v || 'Name is required',
      v => (v && v.length >= 15) ||'Name must be at least 15 characters',
    ],
    validationRulesP: [
      v => !!v || 'Title is required',
      v => (v && v.length >= 15) ||'Title must be at least 15 characters',
    ],

  }),

  created(){
    if(SessionService.getSession().id != null)
      this.validSession = true;
    this.retrieveData();
  },


  methods: {

    submitPublication (pType) {
      this.newPublication.userId = SessionService.getSession().id;
      this.newPublication.createdAt= (new Date(Date.now()).toISOString());
      this.newPublication.publicationType=pType;
      this.newPublication.gameName = this.currentFavoriteGameSelected;
      this.newPublication.tournamentDate=this.date;
      this.newPublication.tournamentHour=this.time;
      let item = this.newPublication;
      let dto = this.getDisplayPublication(item);
      console.log(dto);
      console.log(item);
      PublicationsService.create(dto).then(e => this.publications.push(e.data));
      this.dialogTr = false
      this.dialogP = false
      this.dialogT = false

      this.onClear()


    },

    onClear() {
      this.newPublication={}
      this.date=""
      this.time=null
      this.isValidated=true
      this.testForm=this.testForm*-1
    },

    getDisplayPublication(publication) {
      return {
        publicationType: publication.publicationType,
        id: publication.id,
        userId: publication.userId,
        title: publication.title,
        content: publication.content,
        urlToImage: publication.urlToImage,
        gameName: publication.gameName,
        participantLimit: publication.participantLimit,
        prizePool: publication.prizePool,
        tournamentDate: publication.tournamentDate,
        tournamentHour: publication.tournamentHour,
        createdAt: publication.createdAt,
        tournament: publication.tournament

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

    getGeneralPublications(pType){
      PublicationsService.getByType(pType)
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

  },



};
</script>

<style scoped>

</style>