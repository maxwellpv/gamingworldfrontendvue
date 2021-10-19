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
                <v-spacer></v-spacer>

                <v-card-text>
                  {{publication.content}}
                  <div v-if="publication.publicationType==3">
                    <v-divider class="my-2"></v-divider>
                    <h4 >Participant Limit: {{publication.participantLimit}}</h4>
                    <h4 >Date: {{publication.tDate}} - Hour: {{publication.tHour}}</h4>
                    <h4 >Prize Pool: {{publication.prizePool}} $</h4>
                  </div>
                </v-card-text>

                <v-card-actions>
                  <template v-for="game in games">
                    <v-chip :key="game.id" v-if="publication.gameId!=null && game.id == publication.gameId" small
                            color="secondary" class="white--text">
                      {{ game.name }}
                    </v-chip>
                  </template>
                  <v-spacer></v-spacer>
                  <template v-for="user in users">
                    <v-chip :key="user.id" v-if="publication.userId!=null && user.id == publication.userId" small
                            color="secondary" class="white--text">
                      {{ user.username }}
                    </v-chip>
                  </template>
                </v-card-actions>
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
}
</script>

<style scoped>

</style>