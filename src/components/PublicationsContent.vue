<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-row >
          <template v-for="(publication) in publications">
            <v-col :sm="12" :key="publication.title">
              <v-card >
                <v-img height="350px" v-bind:src="publication.urlToImage"></v-img>
                <v-container fluid>
                  <v-layout>
                    <v-flex xs12 align-end d-flex>
                      <span class="headline">{{publication.title}}</span>
                    </v-flex>
                  </v-layout>
                </v-container>
                <v-card-text>
                  {{publication.content}}
                </v-card-text>
              </v-card>
            </v-col>
          </template>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>

</template>

<script>

import PublicationsService from '../services/publications.service'
import GamesService from '../services/games.servive'
import UsersService from '../services/users.service'

export default {
  name: "publications",
  data: ()=>({
    publications: [],
    games: [],
    users: []
  }),

  created(){
    this.retrieveData()
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
}
</script>

<style scoped>

</style>