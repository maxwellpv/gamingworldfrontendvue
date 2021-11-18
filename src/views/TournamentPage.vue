<template>
  <v-container>
    <nav-bar></nav-bar>
    <v-row no-gutters>
      <v-col xs="12" sm="9">
        <v-card  class="mr-2">
          <v-img height="350px" v-bind:src="this.publication.urlToImage"></v-img>
          <v-container fluid>
            <v-layout>
              <v-flex xs12 align-end d-flex>
                <span class="headline">{{this.publication.title}}</span>
              </v-flex>
            </v-layout>
          </v-container>
          <v-spacer></v-spacer>

          <v-card-text>
            {{this.publication.content}}
            <div v-if="this.publication.publicationType===3">
              <v-divider class="my-2"></v-divider>
              <h4 >{{$t('Limit')}} {{this.publication.participantLimit}}</h4>
              <h4 >{{$t('Date')}} {{this.publication.tDate}} - {{$t('Hour')}} {{this.publication.tHour}}</h4>
              <h4 >{{$t('Prize-Pool')}} {{this.publication.prizePool}} $</h4>
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
            <div v-if="this.publication.publicationType===3">
              <v-dialog
                  v-model="dialog"
                  persistent
                  max-width="300"
              >
                <template v-slot:activator="{ on, attrs }">
              <v-btn
                  color="warning"
                  dark
                  v-bind="attrs"
                  v-on="on"
              >
                {{$t('End-Tournament')}}
              </v-btn>
                </template>
                <v-card>
                  <v-card-title class="text-h5">
                    {{$t('End-Question')}}
                  </v-card-title>
                  <v-card-text>{{$t('End-Text')}}</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="warning"
                        dark
                        @click="dialog = false"
                    >
                      {{$t('Cancel')}}
                    </v-btn>
                    <v-btn
                        color="primary"
                        dark
                        @click="dialog = false"
                    >
                      {{$t('Confirm')}}
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
                      color="primary"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      class="ml-2"
                  >
                    {{$t('Set-Scores')}}
                  </v-btn>
                </template>
                <v-card color="secondary">
                  <v-card-title class="text-h5 white--text" >
                    {{$t('Register-Points')}}
                  </v-card-title>
                  <v-container>
                    <v-row no-gutters>
                      <v-col xs="12" sm="8">
                        <v-card  color="white" class="mr-2" min-height="400">
                          <v-list-item class="d-flex text-justify" v-for="participant in participantsMatchPoints" v-bind:key="participant.name">
                            <v-list-item-content>
                              <v-list-item-title>{{participant.name}}<span class="float-right">{{participant.points}}</span></v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-card>
                      </v-col>
                      <v-col xs="12" sm="4">

                        <v-autocomplete
                            class=""
                            v-model="searchParticipant"
                            :items="participants"
                            item-text="name"
                            dense
                            solo
                            filled
                            label="Filled"
                            return-object
                        ></v-autocomplete>

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
                          </v-icon>{{$t('Add-Participant')}}
                        </v-btn>
                        <div  class="mt-6">
                            <h3 class="white--text">
                              {{$t('Extra-Points')}}
                            </h3>
                        </div>

                        <v-text-field
                            type="number"
                            v-model="extraPoints"
                            label="Add extra points to the user..." solo  background-color="white"></v-text-field>
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
                      {{$t('Cancel')}}
                    </v-btn>
                    <v-btn
                        color="primary"
                        dark
                        @click="dialog2 = false; addParticipantPoints()"
                    >
                      {{$t('Confirm')}}
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
              <v-card-title class="text-justify; mb-n6" >{{$t('Participants')}}</v-card-title>
              <template>
                  <v-list-item class="d-flex text-justify" v-for="participant in sortedArray" v-bind:key="participant.id">
                    <v-list-item-content>
                      <v-list-item-title>{{participant.name}}<span class="float-right">{{participant.points}}</span></v-list-item-title>
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
    publicationId: {},

    participants: [
      {id: 1, name: "Manuel Garcia", points: 0},
      {id: 2, name: "Javier Merino", points: 0},
      {id: 3, name: "Paolo Pinzas", points: 10},
    ],

    participantsMatchPoints: [
    ],
    dialog:false,
    dialog2:false

  }),

  created(){
    this.publicationId=this.$route.params.id
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
        tDate: publication.tDate,
        tHour: publication.tHour,
        publicatedAt: publication.publicatedAt,

      }
    },
    getPublicationById(id) {
      PublicationsService.getById(id)
          .then((response) => {
            this.publication = response.data;
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
          if(value.id == value2.id){
            value.points += value2.points;
          }
        } )
      } )
      this.searchParticipant= null;
      this.extraPoints = 0,
      this.participantsMatchPoints = [];
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

<i18n>
{
  "en": {
    "Limit": "Participant Limit: ",
    "Date": "Date: ",
    "Hour": "Hour: ",
    "Prize-Pool": "Prize Pool: ",
    "End-Tournament": "End Tournament",
    "End-Question": "End Tournament?",
    "End-Text": "This action cannot be undone. If you are sure press 'Confirm'. Otherwise press 'Cancel' to exit.",
    "Cancel": "Cancel",
    "Confirm": "Confirm",
    "Set-Scores": "Set Scores",
    "Register-Points": "Register new match points",
    "Add-Participant": "Add participant",
    "Extra-Points": "Extra Points",
    "Participants": "Participants"
  },

  "es": {
    "Limit": "Límite de Participantes: ",
    "Date": "Día: ",
    "Hour": "Hora: ",
    "Prize-Pool": "Botin a obtener: ",
    "End-Tournament": "Finalizar Torneo",
    "End-Question": "¿Finalizar Torneo?",
    "End-Text": "Esta acción no se puede deshacer. Si está seguro, presione 'Confirmar'. De lo contrario, presione 'Cancelar' para salir.",
    "Cancel": "Cancelar",
    "Confirm": "Confirmar",
    "Set-Scores": "Establecer Puntajes",
    "Register-Points": "Registrar puntajes",
    "Add-Participant": "Añadir participantes",
    "Extra-Points": "Puntos Extra",
    "Participants": "Participantes"
  }
}
</i18n>