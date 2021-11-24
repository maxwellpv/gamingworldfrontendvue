<template>
  <v-container>
    <nav-bar></nav-bar>
    <v-row no-gutters>
      <v-col xs="12" sm="9">
        <v-card  class="mr-2">
          <v-img v-if="this.publication.urlToImage" height="350px" v-bind:src="this.publication.urlToImage"></v-img>
              <v-card-title>
                <span class="headline">{{this.publication.title}}</span>
              </v-card-title>
          <v-spacer></v-spacer>
          <v-card-text>
            {{this.publication.content}}
            <div v-if="this.publication.publicationType===3">
              <v-divider class="my-2"></v-divider>
              <h4 >Participant Limit: {{this.publication.tournament.participantLimit}}</h4>
              <h4 >Date: {{this.publication.tournament.tournamentDate}} - Hour: {{this.publication.tournament.tournamentHour}}</h4>
              <h4 >Prize Pool: {{this.publication.tournament.prizePool}}$</h4>
              <v-chip-group>

                <v-chip v-if="!compareDates() && this.publication.tournament.tournamentStatus" color="primary">Stand By</v-chip>
                <v-chip v-if="this.publication.tournament.tournamentStatus && compareDates()" color="green" text-color="white">Active</v-chip>
                <v-chip v-if="!this.publication.tournament.tournamentStatus" color="warning">Ended</v-chip>
              </v-chip-group>
            </div>
          </v-card-text>

          <v-card-actions>


            <template >
              <v-chip small v-if="this.publication.gameName!=null"
                      color="secondary" class="white--text">
                {{ this.publication.gameName }}
              </v-chip>
            </template>

            <v-spacer></v-spacer>
            <div v-if="publication.publicationType===3">
              <v-dialog
                  v-model="dialog"
                  persistent
                  max-width="300"
              >
                <template v-if="validButtons" v-slot:activator="{ on, attrs }">
                  <v-spacer></v-spacer>
              <v-btn
                  v-if="publication.tournament.tournamentStatus"
                  color="warning"
                  dark
                  v-bind="attrs"
                  v-on="on"
              >
                End Tournament
              </v-btn>
                </template>
                <v-card>
                  <v-card-title class="text-h5">
                    End tournament?
                  </v-card-title>
                  <v-card-text>This action cannot be undone. If you are sure press "Confirm". Otherwise press "Cancel" to exit</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="warning"
                        dark
                        @click="dialog = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn

                        color="primary"
                        dark
                        @click="endTournament(publication.tournament.id)"
                    >
                      Confirm
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-dialog
                  v-model="dialog2"
                  persistent
                  max-width="800"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      v-if="publication.tournament.tournamentStatus"
                      color="primary"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      class="ml-2 v-btn"
                      :disabled="participants.length<1"
                  >
                    Set Scores
                  </v-btn>
                </template>

                <v-card color="secondary">
                  <v-card-title class="text-h5 white--text" >
                    Register new match points
                  </v-card-title>
                  <v-container>
                    <v-row no-gutters>
                      <v-col xs="12" sm="8">
                        <v-card  color="white" class="mr-2" min-height="400">
                          <v-list-item class="d-flex text-justify" v-for="participant in participantsMatchPoints" v-bind:key="participant.user.username">
                            <v-list-item-content>
                              <v-list-item-title>{{participant.user.username}}<span class="float-right">{{participant.points}}</span></v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-card>
                      </v-col>
                      <v-col xs="12" sm="4">

                        <v-autocomplete
                            class=""
                            v-model="searchParticipant"
                            :items="participants"
                            item-text="user.username"
                            dense
                            solo
                            filled
                            label="Filled"
                            return-object
                        ></v-autocomplete>


                        <div  class="mt-6">
                            <h3 class="white--text">
                              Extra Points
                            </h3>
                        </div>

                        <v-text-field
                            type="number"
                            v-model="extraPoints"
                            label="Add extra points to the user..." solo  background-color="white"></v-text-field>

                        <v-btn
                            block
                            dark
                            color="primary"
                            class="mt-n5"
                            @click="this.addParticipant"
                        >
                          <v-icon
                              dark
                              left
                          >
                            mdi-plus-circle
                          </v-icon>Add participant
                        </v-btn>

                      </v-col>

                    </v-row>
                  </v-container>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="warning"
                        dark
                        @click="dialog2 = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                        color="primary"
                        dark
                        @click="dialog2 = false; addParticipantPoints()"
                    >
                      Confirm
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </div>
          </v-card-actions>
        </v-card>
      </v-col>


          <v-col xs="12" sm="3">
            <v-card >
              <v-card-title class="text-justify; mb-n6" >Participants</v-card-title>
              <template>
                  <v-list-item class="d-flex text-justify" v-for="participant in sortedArray" v-bind:key="participant.id">
                    <v-list-item-content>
                      <v-list-item-title>{{participant.user.username}}<span class="float-right">{{participant.points}}</span></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
              </template>
            </v-card>
          </v-col>

    </v-row>
  </v-container>
</template>

<script>

import NavBar from "../components/NavBar";
import PublicationsService from '../services/publications.service'
import TournamentsService from '../services/tournaments.service'
import SessionService from "../services/session.service";

export default {
  name: "TournamentPage",
  components: {
    NavBar
  },

  data: () => ({
    dialogCard: true,
    searchParticipant: null,
    extraPoints: 0,
    publication: {},
    publicationId: 0,

    participants: [
      // {id: 1, name: "Manuel Garcia", points: 0},
      // {id: 2, name: "Javier Merino", points: 0},
      // {id: 3, name: "Paolo Pinzas", points: 10},
    ],

    participantsMatchPoints: [
    ],
    dialog:false,
    dialog2:false,
    validButtons: false

  }),

  created(){

    this.publicationId = this.$route.params.id
    this.getPublicationById(this.publicationId)


  },


  methods: {
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
        tournament: publication.tournament,
        tournamentDate: publication.tournamentDate,
        tournamentHour: publication.tournamentHour,
        createdAt: publication.createdAt,
        tournamentId: publication.tournamentId,

      }
    },

    getTournamentParticipants(tournamentId){
      TournamentsService.getWithParticipantsById(tournamentId).then((response)=>{
        this.participants = response.data;
      })
    },
    async updateTournamentParticipantPoints(participantId, points){
      await TournamentsService.updateTournamentParticipantPoints(this.publication.tournament.id, participantId, points ).then;
    },

    getPublicationById(id) {
      PublicationsService.getById(id)
          .then((response) => {
            this.publication = response.data;
            this.getTournamentParticipants(this.publication.tournament.id)
            if(SessionService.getSession().id != null && SessionService.getSession().id === this.publication.userId )
              this.validButtons = true;
          })
          .catch(e => {
            console.log(e);
          })
    },

    addParticipant(){

      if(this.searchParticipant!= null){
        let temp = {...this.searchParticipant}

        temp.points = 0;

        if( !this.participantsMatchPoints.some(e => e.id === temp.id) ){
          temp.points = parseInt(temp.points) + parseInt(this.extraPoints);
          this.participantsMatchPoints.push(temp);
        }
        this.extraPoints=0;
        this.searchParticipant= null;
      }
    },

    addParticipantPoints(){
      this.participants.forEach( (value) => {
        this.participantsMatchPoints.forEach( (value2) => {
          if(value.id === value2.id){
            value.points += value2.points;
            this.updateTournamentParticipantPoints(value.id, value.points);
          }
        } )
      } )
      this.searchParticipant= null;
      this.extraPoints = 0;
      this.participantsMatchPoints = [];
    },

    endTournament(tournamentId){
      TournamentsService.endTournament(tournamentId).then(data => this.publication.tournament.tournamentStatus = data.tournamentStatus);
      this.dialog = false;
    },

    compareDates(){
      let date1 = new Date();
      let tournamentDate = this.publication.tournament.tournamentDate+" "+this.publication.tournament.tournamentHour;
      let tDate = new Date(tournamentDate);
      return (date1 > tDate);
    }

  },




  computed: {
    sortedArray: function() {
      function compare(a, b) {
        if (new Date(a.points) > new Date(b.points))
          return -1;
        if (new Date(a.points) < new Date(b.points))
          return 1;
        return 0;
      }

      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.participants.sort(compare);
    }
  }



}

</script>

<style scoped>

</style>