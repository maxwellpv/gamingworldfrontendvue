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
              <h4 >Participant Limit: {{this.publication.participantLimit}}</h4>
              <h4 >Date: {{this.publication.tDate}} - Hour: {{this.publication.tHour}}</h4>
              <h4 >Prize Pool: {{this.publication.prizePool}} $</h4>
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
                        @click="dialog = false"
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
                      color="primary"
                      dark
                      v-bind="attrs"
                      v-on="on"
                      class="ml-2"
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
                        <v-card color="white" class="mr-2" min-height="400">
                            <v-list-item class="d-flex text-justify">
                              <v-list-item-content>
                                <v-list-item-title>Manuel Garcia <span class="float-right">40</span></v-list-item-title>
                                <v-list-item-title>Javier Merino <span class="float-right">22</span></v-list-item-title>
                                <v-list-item-title>Paolo Pinzas <span class="float-right">10</span></v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                        </v-card>
                      </v-col>
                      <v-col xs="12" sm="4">
                        <v-text-field
                            label="Search participant..." solo  background-color="white"></v-text-field>
                        <v-btn
                            block
                            dark
                            color="primary"
                            class="mt-n5"
                        >
                          <v-icon
                              dark
                              left
                          >
                            mdi-plus-circle
                          </v-icon>Add participant
                        </v-btn>
                        <div  class="mt-6">
                            <h3 class="white--text">
                              Extra Points
                            </h3>
                        </div>

                        <v-text-field
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
                      Cancel
                    </v-btn>
                    <v-btn
                        color="primary"
                        dark
                        @click="dialog2 = false"
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
                  <v-list-item class="d-flex text-justify">
                    <v-list-item-content>
                      <v-list-item-title>Manuel Garcia <span class="float-right">40</span></v-list-item-title>
                      <v-list-item-title>Javier Merino <span class="float-right">22</span></v-list-item-title>
                      <v-list-item-title>Paolo Pinzas <span class="float-right">10</span></v-list-item-title>
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
    publication: {},
    publicationId: {},
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
  }



}

</script>

<style scoped>

</style>